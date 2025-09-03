import React from 'react'
import PropTypes from 'prop-types'
import Theme from '../../Theme.js'

export default function Button({ children, variant = 'primary', size = 'md', ...props }) {
	const config = Theme.atoms.Button
	const style = {
		borderRadius: config.borderRadius,
		borderWidth: config.borderWidth,
		borderColor: config.borderColor,
		fontSize: config.fontSize,
		paddingLeft: config.paddingX,
		paddingRight: config.paddingX,
		paddingTop: config.paddingY,
		paddingBottom: config.paddingY,
		color: config.color,
		background: config.background,
		boxShadow: config.shadow,
		cursor: 'pointer',
		...props.style,
	}

	return (
		<button style={style} {...props}>
			{children}
		</button>
	)
}

Button.propTypes = {
	children: PropTypes.node.isRequired,
	variant: PropTypes.string,
	size: PropTypes.string,
	style: PropTypes.object,
}