// @nan0web/ui-react/src/UIRoot.jsx
import React, { useState, useEffect } from "react"
import DB from "@nan0web/db-browser"
import { NightTheme, Theme } from "@nan0web/ui-core"
import { LogConsole } from "@nan0web/log"
import UIReact from "./UIReact.jsx"
import { UIProvider } from "./context/UIContext.jsx"
import UIContextValue from "./context/UIContextValue.jsx"

/**
 * UIRoot — root container for the @nan0web/ui-react system.
 * Manages:
 * - URI sync from browser location
 * - Theme state (localStorage + prefers-color-scheme)
 * - SPA navigation via pushState
 *
 * Accepts custom components, renderers, apps, and actions to fully override default behavior.
 *
 * @param {Object} props
 * @param {DB} [props.db] - Optional DB instance
 * @param {Map<string, React.Component>} [props.components] - Custom or override components
 * @param {Map<string, Function>} [props.renderers] - Custom or override renderers
 * @param {Map<string, Function>} [props.apps] - Lazy-loaded app modules
 * @param {Record<string, Function>} [props.actions] - Global action handlers
 * @param {Console} [props.console] - Logger instance
 * @param {boolean} [props.devMode=true] - Enable debug logging
 */
export function UIRoot({
	db,
	components: overrideComponents = new Map(),
	renderers: overrideRenderers = new Map(),
	apps: overrideApps = new Map(),
	actions: overrideActions = {},
	console: externalConsole = console,
	devMode = true
}) {
	// Initialize URI from current path
	const [uri, setUri] = useState(getPath())

	// Initialize theme: from localStorage → OS preference → default
	const [theme, setTheme] = useState(getInitialTheme())

	// Use external console or disable logs in production-like mode
	const finalConsole = devMode ? externalConsole : createNoOpConsole()

	finalConsole.debug("UIRoot initialized", { uri, hasDb: !!db })

	// Initialize DB if not provided
	const opts = { host: window.location.origin }
	if (devMode) opts.console = finalConsole
	const finalDb = db || new DB(opts)

	// Subscribe to browser navigation (back/forward)
	useEffect(() => {
		const handler = () => {
			finalConsole.debug("Location change detected, updating URI")
			setUri(getPath())
		}
		window.addEventListener('popstate', handler)
		return () => window.removeEventListener('popstate', handler)
	}, [])

	// Persist theme changes to localStorage
	useEffect(() => {
		setThemeInStorage(theme)
	}, [theme])

	// Handle internal link clicks to enable SPA navigation
	useEffect(() => {
		const handleClick = (e) => {
			const link = e.target.closest("a[href]")
			if (!link) return
			const href = link.getAttribute("href")
			finalConsole.debug("Navigation link intercepted", href)

			// Skip special links
			if (
				!href ||
				href.startsWith('#') ||
				href.startsWith('mailto:') ||
				href.startsWith('tel:') ||
				href.startsWith('https://') ||
				href.startsWith('http://')
			) return

			e.preventDefault()
			window.history.pushState({}, '', href)
			// Trigger UI update
			window.dispatchEvent(new PopStateEvent('popstate'))
		}

		document.addEventListener("click", handleClick)
		return () => document.removeEventListener("click", handleClick)
	}, [])

	// Merge default and custom context values
	const mergedContext = {
		components: new Map([...components, ...overrideComponents]),
		renderers: new Map([...renderers, ...overrideRenderers]),
		apps: new Map([...apps, ...overrideApps]),
		actions: { ...actions, ...overrideActions },
		console: finalConsole
	}

	finalConsole.debug("UIRoot: Merged context", {
		components: Array.from(mergedContext.components.keys()),
		renderers: Array.from(mergedContext.renderers.keys()),
		apps: Array.from(mergedContext.apps.keys()),
		actions: Object.keys(mergedContext.actions)
	})

	return (
		<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<UIProvider value={{ theme, setTheme, db: finalDb, ...mergedContext }}>
				<UIReact
					db={finalDb}
					uri={uri}
					context={mergedContext}
					console={finalConsole}
				/>
			</UIProvider>
		</div>
	)
}

// --- Utilities ---

/**
 * Extract path and convert .html → .json for document fetching
 * @returns {string}
 */
function getPath() {
	const path = window.location.pathname
	if (path === '/' || path.endsWith('/index.html')) {
		return '/playground/index.json'
	}
	return path.replace(/\.html$/, '.json')
}

/**
 * Get initial theme from localStorage or OS preference
 * @returns {object} Theme object
 */
function getInitialTheme() {
	const saved = localStorage.getItem('theme')
	if (saved === 'night') return NightTheme
	if (saved === 'light') return Theme

	const mql = typeof window !== 'undefined' && window.matchMedia
		? window.matchMedia('(prefers-color-scheme: dark)')
		: { matches: false }

	return mql.matches ? NightTheme : Theme
}

/**
 * Persist theme selection to localStorage
 * @param {object} theme
 */
function setThemeInStorage(theme) {
	localStorage.setItem('theme', theme === NightTheme ? 'night' : 'light')
}

/**
 * Create silent console when devMode is off
 * Implements the full shape of Console, including non-standard methods
 * to avoid runtime errors in strict environments or tooling assumptions.
 *
 * @returns {object} No-op console object
 */
function createNoOpConsole() {
	const noOp = () => { }

	return {
		// Standard methods
		debug: noOp,
		info: noOp,
		warn: noOp,
		error: noOp,
		assert: noOp,
		clear: noOp,
		count: noOp,
		countReset: noOp,
		dir: noOp,
		dirxml: noOp,
		group: noOp,
		groupCollapsed: noOp,
		groupEnd: noOp,
		log: noOp,
		table: noOp,
		time: noOp,
		timeEnd: noOp,
		timeLog: noOp,
		trace: noOp,

		// Non-standard / devtools-specific (required by some TS merges)
		timeStamp: noOp,
		profile: noOp,
		profileEnd: noOp,

		// This one is tricky: `Console` as property — it’s usually a constructor
		// But here, we just satisfy shape without side effects
		Console: undefined, // ← not a function; avoids callability assumptions

		// Optional: if environment expects it as a namespace
		// But setting to `noOp` causes `Console.Console is not a constructor`
		// So keep it `undefined` or `{}` if needed.
	}
}

// --- Default Registries (from src/index.jsx) ---

import defaultComponents from './components/index.jsx'
import defaultRenderers from './renderers/index.jsx'

/**
 * @type {Map<string, React.Component>}
 */
const components = defaultComponents

/**
 * @type {Map<string, Function>}
 */
const renderers = defaultRenderers

/**
 * @type {Map<string, Function>}
 */
const apps = new Map() // Extend as needed

/**
 * @type {Record<string, Function>}
 */
const actions = {}

// Export for reuse in custom setups
export { components, renderers, apps, actions }
