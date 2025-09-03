import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '../components/atoms/Avatar.jsx'

/**
 * Renderer for Avatar component
 * 
 * @param {object} block - Component block definition
 * @returns {JSX.Element} Rendered avatar
 */
export default function renderAvatar(block) {
	const { type, props = {}, data } = block
	return <Avatar {...props} data={data} />
}

renderAvatar.propTypes = {
	block: PropTypes.shape({
		type: PropTypes.string.isRequired,
		props: PropTypes.object,
		data: PropTypes.any,
	}).isRequired,
}