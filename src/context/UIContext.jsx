/**
 * @file UI Context for theme, db, language, and accessibility flags.
 */
import React, { createContext, useContext, useState } from 'react'
import Theme from '../Theme.js'
import UIContextValue from './UIContextValue.jsx'

const UIContext = createContext(new UIContextValue())

/**
 * Hook to access UI context.
 * @returns {Object} context
 */
export const useUI = () => useContext(UIContext)

/**
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {Partial<UIContextValue>} props.value - Additional context values (theme, reducedMotion, etc.)
 */
export function UIProvider({ children, value: initValue = {} }) {
	const [theme, setTheme] = useState(() => initValue.theme || Theme)
	const value = UIContextValue.from({ initValue, theme, setTheme })
	return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}
