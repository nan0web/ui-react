import React from 'react'
import PropTypes from 'prop-types'
import { useUI } from '../../context/UIContext.jsx'

export default function Input({ type = 'text', ...props }) {
	const { theme } = useUI()
	const config = theme.atoms.Input
	const style = {
		borderRadius: config.borderRadius,
		borderWidth: config.borderWidth,
		borderColor: config.borderColor,
		fontSize: config.fontSize,
		paddingLeft: config.paddingX,
		paddingRight: config.paddingX,
		paddingTop: config.paddingY,
		paddingBottom: config.paddingY,
		fontFamily: config.fontFamily,
		...props.style,
	}

	return (
		<input type={type} style={style} {...props} />
	)
}

Input.propTypes = {
	type: PropTypes.string,
	style: PropTypes.object,
}