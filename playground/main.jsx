import React, { useState, useEffect } from "react"
import DB from "@nan0web/db-browser"
import { NightTheme, Theme } from "@nan0web/ui-core"
import UIReact from "../src/UIReact.jsx"
import { UIProvider } from "../src/context/UIContext.jsx"
import ThemeSwitcher from "../src/components/atoms/ThemeSwitcher.jsx"
import ReactDOM from "react-dom/client"
import { LogConsole } from "@nan0web/log"

/**
 * @file Playground entry point.
 * Uses pure system principles: no internal UI state, only URL + DB.
 * Component renamed to Root to avoid conflict with AppCore.
 */

const getPath = () => {
	const path = window.location.pathname
	console.debug("Current path:", path)
	if (path === '/' || path.endsWith('/index.html')) {
		return '/playground/index.json'
	}
	return path.replace(/\.html$/, '.json')
}

const getInitialTheme = () => {
	const saved = localStorage.getItem('theme')
	console.debug("Retrieved saved theme:", saved)
	if (saved === 'night') return NightTheme
	if (saved === 'light') return Theme
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? NightTheme : Theme
}

const setThemeInStorage = (theme) => {
	console.debug("Saving theme to storage:", theme)
	localStorage.setItem('theme', theme === NightTheme ? 'night' : 'light')
}

// 🔁 Змінено з `App` на `Root`
function Root() {
	const [uri, setUri] = useState(getPath())
	const [theme, setTheme] = useState(getInitialTheme()) // Додаємо стан теми

	console.debug("Root component initialized with uri:", uri, "and theme:", theme)

	useEffect(() => {
		const handler = () => {
			console.debug("Location changed, updating uri")
			setUri(getPath())
		}
		window.addEventListener('popstate', handler)
		return () => window.removeEventListener('popstate', handler)
	}, [])

	useEffect(() => {
		console.debug("Theme changed, updating storage:", theme)
		setThemeInStorage(theme)
	}, [theme])

	const handleThemeSwitch = () => {
		console.debug("Theme switch requested")
		setTheme(t => {
			const newTheme = t === Theme ? NightTheme : Theme
			console.debug("Switching theme from", t, "to", newTheme)
			return newTheme
		})
	}

	const opts = { host: window.location.origin }
	// @todo change true to dev mode.
	if (true) opts.console = new LogConsole({ prefix: "DB:" })
	const db = new DB(opts)

	return (
		<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<UIProvider value={{ theme, setTheme, db }}>
				<UIReact db={db} uri={uri} />
				<ThemeSwitcher
					style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }}
					onClick={handleThemeSwitch}
				/>
			</UIProvider>
		</div>
	)
}

// Handle navigation clicks
document.addEventListener("click", (e) => {
	const a = e.target.closest("a[href]")
	if (!a) return
	const href = a.getAttribute("href")
	console.debug("Navigation link clicked:", href)
	if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('https://')) return
	e.preventDefault()
	window.history.pushState({}, '', href)
	// Dispatch a custom event to trigger URI update
	window.dispatchEvent(new PopStateEvent('popstate', { state: {} }))
})

ReactDOM.createRoot(document.getElementById("app")).render(<Root />)
