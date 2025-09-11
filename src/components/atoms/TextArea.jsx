import React from 'react'
import PropTypes from 'prop-types'
import { useUI } from '../../context/UIContext.jsx'

export default function TextArea({ ...props }) {
	const { theme } = useUI()
	const config = theme.atoms.TextArea
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
		height: config.height,
		...props.style,
	}

	return (
		<textarea style={style} {...props} />
	)
}

TextArea.propTypes = {
	style: PropTypes.object,
}