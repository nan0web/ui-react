import React from 'react'
import PropTypes from 'prop-types'
import Typography from '../components/atoms/Typography.jsx'

/**
 * Renderer for Typography component
 * 
 * @param {object} block - Component block definition
 * @returns {JSX.Element} Rendered typography
 */
export default function renderTypography(block) {
	const { type, props = {}, data } = block
	return <Typography {...props} data={data} />
}

renderTypography.propTypes = {
	block: PropTypes.shape({
		type: PropTypes.string.isRequired,
		props: PropTypes.object,
		data: PropTypes.any,
	}).isRequired,
}