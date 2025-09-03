/**
 * @file UI Context for theme, db, lang, etc.
 */

import React, { createContext, useContext } from 'react'
import Theme from '../Theme.jsx'

const UIContext = createContext({
	theme: Theme,
	lang: 'en',
	db: null,
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
 * @param {Object} [props.value] - Additional context values
 */
export function UIProvider({ children, value = {} }) {
	const context = {
		theme: Theme,
		lang: 'en',
		...value,
	}

	return <UIContext.Provider value={context}>{children}</UIContext.Provider>
}
