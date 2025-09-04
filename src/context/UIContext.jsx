/**
 * @file UI Context for theme, db, language, and accessibility flags.
 */
import React, { createContext, useContext, useState } from 'react'
import DB from "@nan0web/db-browser"
import Theme from '../Theme.js'

const UIContext = createContext({
	theme: Theme,
	lang: 'en',
	db: new DB(),
	/** Respect reduced motion for a11y */
	reducedMotion: false,
	/**
	 * Set theme function – will be overridden by UIProvider.
	 * If called before UIProvider is mounted, logs a warning.
	 *
	 * @param {Function|Object} updater - New theme or updater function.
	 */
	setTheme: (updater) => {
		// Real implementation is supplied by UIProvider.
		// This placeholder logs a warning to help debugging.
		console.warn('setTheme called outside of UIProvider – no effect.')
	},
})

/**
 * Hook to access UI context.
 * @returns {Object} context
 */
export const useUI = () => useContext(UIContext)

/**
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {Object} [props.value] - Additional context values (theme, reducedMotion, etc.)
 */
export function UIProvider({ children, value = {} }) {
	const [theme, setTheme] = useState(() => value.theme || Theme)

	const context = {
		theme,
		lang: 'en',
		...value,
		setTheme,
	}

	return <UIContext.Provider value={context}>{children}</UIContext.Provider>
}