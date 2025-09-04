import React from 'react'
import PropTypes from 'prop-types'
import Theme from '../../Theme.js'

/**
 * Badge component with Bootstrap‑like variant colors and white text.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.variant='primary'] - One of: primary, secondary, success, warning, danger, info, light, dark
 * @param {Object} [props.style] - Additional inline styles
 */
export default function Badge({ children, variant = 'primary', ...props }) {
	const config = Theme.atoms.Badge

	const variantBackground = {
		primary:   '#0d6efd',
		secondary: '#6c757d',
		success:   '#198754',
		warning:   '#ffc107',
		danger:    '#dc3545',
		info:      '#0dcaf0',
		light:     '#f8f9fa',
		dark:      '#212529',
	}[variant] ?? config.backgroundColor

	const style = {
		borderRadius: config.borderRadius,
		fontSize: config.fontSize,
		paddingLeft: config.paddingX,
		paddingRight: config.paddingX,
		paddingTop: config.paddingY,
		paddingBottom: config.paddingY,
		fontWeight: config.fontWeight,
		backgroundColor: variantBackground,
		color: '#fff',
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
	variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark']),
	style: PropTypes.object,
}