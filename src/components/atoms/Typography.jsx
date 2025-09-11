import React from 'react'
import PropTypes from 'prop-types'
import { useUI } from '../../context/UIContext.jsx'

const variantMap = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
	body: 'p',
	small: 'small',
	caption: 'span',
}

export default function Typography({ variant = 'body', children, ...props }) {
	const { theme } = useUI()
	const config = theme.atoms.Typography
	const Component = variantMap[variant] || 'p'
	const style = {
		fontSize: config.variants[variant]?.fontSize || config.variants.body.fontSize,
		fontWeight: config.variants[variant]?.fontWeight || config.variants.body.fontWeight,
		...props.style,
	}

	return (
		<Component style={style} {...props}>
			{children}
		</Component>
	)
}

Typography.propTypes = {
	variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'small', 'caption']),
	children: PropTypes.node.isRequired,
	style: PropTypes.object,
}