import React from 'react'
import PropTypes from 'prop-types'
import Card from '../components/molecules/Card.jsx'

/**
 * Renderer for Card component
 *
 * @param {object} block - Component block definition
 * @returns {JSX.Element} Rendered card
 */
export default function renderCard({ element, ...props }) {
	const children = element.Card || element.content || []
	return <Card {...props}>{children}</Card>
}

renderCard.propTypes = {
	element: PropTypes.object.isRequired,
}
