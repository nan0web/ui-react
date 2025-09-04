import React from 'react'
import PropTypes from 'prop-types'
import { NightTheme, Theme } from '@nan0web/ui-core'
import { useUI } from '../../context/UIContext.jsx'

/**
 * Simple switcher to toggle between light and night (dark) theme.
 *
 * @param {Object} props
 * @param {string} [props.label='Theme'] - Button label.
 */
export default function ThemeSwitcher({ label = 'Theme' }) {
	const { setTheme } = useUI() || {}

	const toggle = () => {
		if (!setTheme) return
		setTheme(prev => (prev === Theme ? NightTheme : Theme))
	}

	return (
		<button onClick={toggle} style={{ margin: '0.5rem' }}>
			{label}
		</button>
	)
}

ThemeSwitcher.propTypes = {
	label: PropTypes.string,
}