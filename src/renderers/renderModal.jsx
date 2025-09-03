import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../components/organisms/Modal.jsx'

/**
 * Renderer for Modal component
 * 
 * @param {object} block - Component block definition
 * @returns {JSX.Element} Rendered modal
 */
export default function renderModal(block) {
	const { type, props = {}, data } = block
	return <Modal {...props} data={data} />
}

renderModal.propTypes = {
	block: PropTypes.shape({
		type: PropTypes.string.isRequired,
		props: PropTypes.object,
		data: PropTypes.any,
	}).isRequired,
}