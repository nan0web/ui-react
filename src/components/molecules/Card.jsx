import React from 'react'
import PropTypes from 'prop-types'
import Theme from '../../Theme.js'

export default function Card({ children, ...props }) {
	const config = Theme.molecules.Card
	const style = {
		borderRadius: config.borderRadius,
		boxShadow: config.boxShadow,
		padding: config.padding,
		backgroundColor: config.backgroundColor,
		border: `1px solid ${config.borderColor}`,
		...props.style,
	}

	return (
		<div style={style} {...props}>
			{children}
		</div>
	)
}

Card.propTypes = {
	children: PropTypes.node.isRequired,
	style: PropTypes.object,
}