import React from 'react'
import PropTypes from 'prop-types'
import { useUI } from '../../context/UIContext.jsx'

export default function Checkbox({ checked = false, onChange, disabled = false, ...props }) {
	const { theme } = useUI()
	const themeDefaults = theme?.atoms?.Checkbox || {}
	const defaults = {
		size: '16px',
		borderWidth: '1px',
		borderColor: '#cccccc',
		borderRadius: '3px',
		backgroundColor: '#ffffff',
		checkedColor: '#0d6efd',
		cursor: 'pointer',
		...themeDefaults
	}
	
	const style = {
		width: defaults.size,
		height: defaults.size,
		border: `${defaults.borderWidth} solid ${defaults.borderColor}`,
		borderRadius: defaults.borderRadius,
		backgroundColor: checked ? defaults.checkedColor : defaults.backgroundColor,
		appearance: 'none',
		position: 'relative',
		cursor: disabled ? 'not-allowed' : defaults.cursor,
		opacity: disabled ? 0.5 : 1,
		...props.style,
	}

	return React.createElement('input', {
		type: 'checkbox',
		checked,
		onChange,
		style,
		disabled,
		...props
	})
}

Checkbox.propTypes = {
	checked: PropTypes.bool,
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	style: PropTypes.object,
}