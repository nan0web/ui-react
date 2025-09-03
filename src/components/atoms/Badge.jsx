import React from 'react'
import PropTypes from 'prop-types'
import Theme from '../../Theme.js'

export default function Badge({ children, variant = 'primary', ...props }) {
	const config = Theme.atoms.Badge
	const style = {
		borderRadius: config.borderRadius,
		fontSize: config.fontSize,
		paddingLeft: config.paddingX,
		paddingRight: config.paddingX,
		paddingTop: config.paddingY,
		paddingBottom: config.paddingY,
		fontWeight: config.fontWeight,
		backgroundColor: config.backgroundColor,
		color: config.color,
		display: 'inline-block',
		...props.style,
	}

	return (
		<span style={style} {...props}>
			{children}
		</span>
	)
}

Badge.propTypes = {
	children: PropTypes.node.isRequired,
	variant: PropTypes.string,
	style: PropTypes.object,
}