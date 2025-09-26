import React from 'react'
import PropTypes from 'prop-types'
import { useUI } from '../../context/UIContext.jsx'

export default function Input({ type = 'text', ...props }) {
	const { theme } = useUI()
	const {
		borderRadius = '4px',
		borderWidth = '1px',
		borderColor = '#cccccc',
		fontSize = '14px',
		paddingX = '12px',
		paddingY = '8px',
		fontFamily = 'sans-serif',
	} = theme.atoms?.Input ?? {}
	
	const style = {
		borderRadius,
		borderWidth,
		borderColor,
		fontSize,
		paddingLeft: paddingX,
		paddingRight: paddingX,
		paddingTop: paddingY,
		paddingBottom: paddingY,
		fontFamily,
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