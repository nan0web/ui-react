import React from 'react'
import PropTypes from 'prop-types'
import Button from '../components/atoms/Button.jsx'

/**
 * Renderer for Button component
 * 
 * @param {object} block - Component block definition
 * @returns {JSX.Element} Rendered button
 */
export default function renderButton(block) {
	const { type, props = {}, data } = block
	return <Button {...props} data={data} />
}

renderButton.propTypes = {
	block: PropTypes.shape({
		type: PropTypes.string.isRequired,
		props: PropTypes.object,
		data: PropTypes.any,
	}).isRequired,
}