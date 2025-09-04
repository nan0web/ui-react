/**
 * @file UI Context for theme, db, language, and accessibility flags.
 */

import React, { createContext, useContext, useState } from 'react'
import Theme from '../Theme.js'
import { NightTheme } from '@nan0web/ui-core'

const UIContext = createContext({
	theme: Theme,
	lang: 'en',
	db: null,
	/** Respect reduced motion for a11y */
	reducedMotion: false,
	setTheme: () => {}, // placeholder
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