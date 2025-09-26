import React from 'react'
import PropTypes from 'prop-types'
import { useUI } from '../../context/UIContext.jsx'

export default function Checkbox({ checked, onChange, ...props }) {
	const { theme } = useUI()
	const {
		size = '16px',
		borderWidth = '1px',
		borderColor = '#cccccc',
		borderRadius = '3px',
		backgroundColor = '#ffffff',
		checkedColor = '#0d6efd',
	} = theme.atoms?.Checkbox ?? {}
	
	const style = {
		width: size,
		height: size,
		border: `${borderWidth} solid ${borderColor}`,
		borderRadius,
		backgroundColor,
		appearance: 'none',
		position: 'relative',
		cursor: 'pointer',
		...props.style,
	}

	const checkedStyle = checked ? {
		backgroundColor: checkedColor,
		...style,
	} : style

	return (
		<input
			type="checkbox"
			checked={checked}
			onChange={onChange}
			style={checkedStyle}
			{...props}
		/>
	)
}

Checkbox.propTypes = {
	checked: PropTypes.bool,
	onChange: PropTypes.func,
	style: PropTypes.object,
}