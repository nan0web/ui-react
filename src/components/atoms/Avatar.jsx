import React from 'react'
import PropTypes from 'prop-types'
import Theme from '../../Theme.js'

export default function Avatar({ src, alt, size = 'md', ...props }) {
	const config = Theme.atoms.Avatar
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
