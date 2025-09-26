import React from 'react'
import PropTypes from 'prop-types'
import { useUI } from '../../context/UIContext.jsx'

export default function Radio({ checked, onChange, ...props }) {
	const { theme } = useUI()
	const {
		size = '16px',
		borderWidth = '1px',
		borderColor = '#cccccc',
		borderRadius = '50%',
		backgroundColor = '#ffffff',
		checkedColor = '#0d6efd',
	} = theme.atoms?.Radio ?? {}
	
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
			type="radio"
			checked={checked}
			onChange={onChange}
			style={checkedStyle}
			{...props}
		/>
	)
}

Radio.propTypes = {
	checked: PropTypes.bool,
	onChange: PropTypes.func,
	style: PropTypes.object,
}