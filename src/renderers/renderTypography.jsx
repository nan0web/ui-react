import React from 'react'
import PropTypes from 'prop-types'
import Typography from '../components/atoms/Typography.jsx'

/**
 * Renderer for Typography component
 *
 * @param {object} block - Component block definition
 * @returns {JSX.Element} Rendered typography
 */
export default function renderTypography({ element, ...props }) {
	// Extract children: either from the 'Typography' key, 'content', or default to empty
	const children = element.Typography || element.content || []

	// Pass through normalized props (like variant) and children
	return <Typography {...props}>{children}</Typography>
}

renderTypography.propTypes = {
	element: PropTypes.object.isRequired,
}
