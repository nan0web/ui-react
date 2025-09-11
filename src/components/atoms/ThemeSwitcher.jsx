import React from 'react'
import PropTypes from 'prop-types'
import { NightTheme, Theme } from '@nan0web/ui-core'
import { useUI } from '../../context/UIContext.jsx'

/**
 * Simple switcher to toggle between light and night (dark) theme.
 *
 * @param {Object} props
 * @param {string} [props.label='Theme'] - Button label.
 * @param {Object} [props.style] - Additional styles.
 * @param {Function} [props.onClick] - Additional click handler.
 */
export default function ThemeSwitcher({ label = 'Theme', style, onClick }) {
	const { theme, setTheme } = useUI() || {}

	console.debug("ThemeSwitcher rendered with label:", label)
	console.debug("Current theme in ThemeSwitcher:", theme)

	const toggle = () => {
		if (!setTheme) {
			console.debug("No setTheme function in context")
			return
		}
		console.debug("ThemeSwitcher: Toggle theme requested")
		const newTheme = theme === Theme ? NightTheme : Theme
		console.debug("ThemeSwitcher: Switching theme from", theme, "to", newTheme)
		setTheme(newTheme)
		if (onClick) {
			console.debug("ThemeSwitcher: Calling additional onClick handler")
			onClick()
		}
	}

	return (
		<button onClick={toggle} style={{ margin: '0.5rem', ...style }}>
			{label}
		</button>
	)
}

ThemeSwitcher.propTypes = {
	label: PropTypes.string,
	style: PropTypes.object,
	onClick: PropTypes.func,
}