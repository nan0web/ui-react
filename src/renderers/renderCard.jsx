import React from 'react'
import PropTypes from 'prop-types'
import Card from '../components/molecules/Card.jsx'

/**
 * Renderer for Card component
 * 
 * @param {object} block - Component block definition
 * @returns {JSX.Element} Rendered card
 */
export default function renderCard(block) {
	const { type, props = {}, data } = block
	return <Card {...props} data={data} />
}

renderCard.propTypes = {
	block: PropTypes.shape({
		type: PropTypes.string.isRequired,
		props: PropTypes.object,
		data: PropTypes.any,
	}).isRequired,
}