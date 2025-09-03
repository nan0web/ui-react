import React from 'react'
import PropTypes from 'prop-types'
import Input from '../components/atoms/Input.jsx'

/**
 * Renderer for Input component
 * 
 * @param {object} block - Component block definition
 * @returns {JSX.Element} Rendered input
 */
export default function renderInput(block) {
	const { type, props = {}, data } = block
	return <Input {...props} data={data} />
}

renderInput.propTypes = {
	block: PropTypes.shape({
		type: PropTypes.string.isRequired,
		props: PropTypes.object,
		data: PropTypes.any,
	}).isRequired,
}