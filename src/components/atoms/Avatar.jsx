import React from 'react'
import PropTypes from 'prop-types'
import { useUI } from '../../context/UIContext.jsx'

export default function Avatar({ src, alt, size = 'md', ...props }) {
	const { theme } = useUI()
	const config = theme.atoms.Avatar
	const style = {
		width: config.size,
		height: config.size,
		borderRadius: config.borderRadius,
		border: config.border,
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