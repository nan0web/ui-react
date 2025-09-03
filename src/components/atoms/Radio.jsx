import React from 'react'
import PropTypes from 'prop-types'
import Theme from '../../Theme.js'

export default function Radio({ checked, onChange, ...props }) {
	const config = Theme.atoms.Radio
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