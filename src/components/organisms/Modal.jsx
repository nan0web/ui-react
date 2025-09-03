import React from 'react'
import PropTypes from 'prop-types'
import Theme from '../../Theme.js'

export default function Modal({ isOpen, onClose, children, ...props }) {
	if (!isOpen) return null

	const config = Theme.organisms.Modal
	const overlayStyle = {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: config.overlayBackground,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1000,
	}

	const modalStyle = {
		borderRadius: config.borderRadius,
		boxShadow: config.boxShadow,
		padding: config.padding,
		backgroundColor: config.backgroundColor,
		position: 'relative',
		...props.style,
	}

	return (
		<div style={overlayStyle} onClick={onClose}>
			<div style={modalStyle} onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	style: PropTypes.object,
}