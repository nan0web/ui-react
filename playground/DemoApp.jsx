import React, { useState, useEffect } from 'react'
import DB from '@nan0web/db-browser'
import { NightTheme, Theme } from '@nan0web/ui-core'
import UIReact from '../src/UIReact.jsx'
import { useUI } from '../src/context/UIContext.jsx'

/**
 * @component
 * @param {Object} props
 * @param {DB} props.db
 */
export default function DemoApp({ db }) {
	const [currentPath, setCurrentPath] = useState('/playground/index.json')
	const [sharedData, setSharedData] = useState({ theme: { current: 'light' } })  // Load from _.yaml

	// Convert URL pathname → JSON document path
	const getPathFromUrl = () => {
		const pathname = window.location.pathname
		if (pathname === '/' || pathname === '/index.html') return '/playground/index.json'
		return pathname.replace('.html', '.json')
	}

	// Load shared data (nav, theme) from _.yaml
	useEffect(() => {
		async function loadShared() {
			try {
				const data = await db.fetch('/playground/_.yaml')
				if (data) {
					setSharedData(data)
					// Set initial theme from data
					const initialTheme = data.theme?.current === 'night' ? NightTheme : Theme
					setCurrentTheme(initialTheme)
					// Also set in localStorage for persistence
					localStorage.setItem('theme', data.theme?.current || 'light')
				}
			} catch (err) {
				console.error('Failed to load shared data', err)
			}
		}
		loadShared()
	}, [db])

	const [currentTheme, setCurrentTheme] = useState(Theme)

	const setThemeFromData = (newThemeName) => {
		const newTheme = newThemeName === 'night' ? NightTheme : Theme
		setCurrentTheme(newTheme)
		// Update shared data
		setSharedData(prev => ({ ...prev, theme: { current: newThemeName } }))
		// Save to localStorage
		localStorage.setItem('theme', newThemeName)
		// Optionally save to db for persistence across sessions (for demo, just state/local)
		db.saveDocument('/playground/_.yaml', sharedData).catch(console.error)
	}

	// Listen to theme changes from ThemeSwitcher
	useEffect(() => {
		const originalSetTheme = useUI()?.setTheme
		if (originalSetTheme) {
			const handleThemeChange = (newTheme) => {
				const newThemeName = newTheme === NightTheme ? 'night' : 'light'
				setThemeFromData(newThemeName)
				originalSetTheme(newTheme)
			}
			// The context is updated via props, so no need to override
		}
	}, [useUI])

	// Initialise path + listen to history changes
	useEffect(() => {
		setCurrentPath(getPathFromUrl())
		const handlePopState = () => {
			console.log("POPState", getPathFromUrl())
			setCurrentPath(getPathFromUrl())
		}
		window.addEventListener('popstate', handlePopState)
		return () => window.removeEventListener('popstate', handlePopState)
	}, [])

	console.log("DemoApp")

	// Navigation handler
	const handleNavigation = (path) => (e) => {
		e.preventDefault()
		const htmlPath = path.replace('.json', '.html')
		window.history.pushState({}, '', htmlPath)
		setCurrentPath(path)
	}

	// Load nav from shared data
	const navLinks = sharedData.nav?.map(item => ({
		path: item.href.replace('.html', '.json'),
		label: item.title
	})) || []

	return (
		<div className="demo-app">
			<header style={{ padding: '1rem', background: '#f5f5f5' }}>
				<h1>Demo App</h1>
				<nav>
					<ul
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							listStyle: 'none',
							gap: '1rem',
							padding: 0,
							margin: '0.5rem 0',
						}}
					>
						{navLinks.map((link) => (
							<li key={link.path}>
								<a
									href={link.path.replace('.json', '.html')}
									onClick={handleNavigation(link.path)}
									style={{
										textDecoration: currentPath === link.path ? 'underline' : 'none',
										fontWeight: currentPath === link.path ? 'bold' : 'normal',
										cursor: 'pointer',
									}}
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</nav>
				{/* Theme info from data */}
				<p>Current theme from data: {sharedData.theme?.current}</p>
			</header>
			<main>
				<UIReact
					db={db}
					documentPath={currentPath}
					context={{
						theme: currentTheme,
						setTheme: setThemeFromData,  // Pass setter that updates data
						reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
					}}
				/>
			</main>
		</div>
	)
}