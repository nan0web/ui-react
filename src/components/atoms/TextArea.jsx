import React from 'react'
import PropTypes from 'prop-types'
import { useUI } from '../../context/UIContext.jsx'

export default function TextArea({ ...props }) {
	const { theme } = useUI()
	const {
		borderRadius = '4px',
		borderWidth = '1px',
		borderColor = '#cccccc',
		fontSize = '14px',
		paddingX = '12px',
		paddingY = '8px',
		fontFamily = 'sans-serif',
		height = '100px',
	} = theme.atoms?.TextArea ?? {}
	
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
		height,
		...props.style,
	}

	return (
		<textarea style={style} {...props} />
	)
}

TextArea.propTypes = {
	style: PropTypes.object,
}