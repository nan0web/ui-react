import React from 'react'
import PropTypes from 'prop-types'
import Input from '../components/atoms/Input.jsx'

/**
 * Renderer for Input component
 *
 * @param {object} block - Component block definition
 * @returns {JSX.Element} Rendered input
 */
export default function renderInput({ element, ...props }) {
	return <Input {...props} />
}

renderInput.propTypes = {
	element: PropTypes.object.isRequired,
}
