import React from 'react'
import PropTypes from 'prop-types'
import { useUI } from '../../context/UIContext.jsx'

export default function Avatar({ src, alt, ...props }) {
	const { theme } = useUI()
	const {
		size = "40px",
		borderRadius = "50%",
		border = "none",
	} = theme.atoms?.Avatar ?? {}
	const style = {
		width: size,
		height: size,
		borderRadius,
		border,
		...props.style,
	}

	return (
		<img src={src} alt={alt} style={style} {...props} />
	)
}

Avatar.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
	size: PropTypes.string,
	style: PropTypes.object,
}
