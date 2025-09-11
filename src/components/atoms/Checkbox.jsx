import React from 'react'
import PropTypes from 'prop-types'
import { useUI } from '../../context/UIContext.jsx'

export default function Checkbox({ checked, onChange, ...props }) {
	const { theme } = useUI()
	const config = theme.atoms.Checkbox
	const style = {
		width: config.size,
		height: config.size,
		border: `${config.borderWidth} solid ${config.borderColor}`,
		borderRadius: config.borderRadius,
		backgroundColor: config.backgroundColor,
		appearance: 'none',
		position: 'relative',
		cursor: 'pointer',
		...props.style,
	}

	const checkedStyle = checked ? {
		backgroundColor: config.checkedColor,
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