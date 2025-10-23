import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUI } from '../../context/UIContext.jsx'

export default function Button({ children, variant = 'primary', outline = false, size = 'md', ...props }) {
	const { theme, reducedMotion } = useUI()
	const baseConfig = {
		sizes: {
			sm: { fontSize: '0.875rem', padding: '0.25rem 0.5rem' },
			md: { fontSize: '1rem', padding: '0.5rem 1rem' },
		},
		variants: {
			primary: { backgroundColor: '#0d6efd', color: '#ffffff' },
			secondary: { backgroundColor: '#6c757d', color: '#ffffff' },
			success: { backgroundColor: '#198754', color: '#ffffff' },
			warning: { backgroundColor: '#ffc107', color: '#000000' },
			danger: { backgroundColor: '#dc3545', color: '#ffffff' },
			info: { backgroundColor: '#0dcaf0', color: '#000000' },
			link: { backgroundColor: 'transparent', color: '#0d6efd', textDecoration: 'underline' },
		},
		outlines: {
			primary: { backgroundColor: 'transparent', color: '#0d6efd', border: '1px solid #0d6efd' },
			secondary: { backgroundColor: 'transparent', color: '#6c757d', border: '1px solid #6c757d' },
			success: { backgroundColor: 'transparent', color: '#198754', border: '1px solid #198754' },
			warning: { backgroundColor: 'transparent', color: '#ffc107', border: '1px solid #ffc107' },
			danger: { backgroundColor: 'transparent', color: '#dc3545', border: '1px solid #dc3545' },
			info: { backgroundColor: 'transparent', color: '#0dcaf0', border: '1px solid #0dcaf0' },
		},
		shared: {
			borderRadius: '0.375rem',
			fontWeight: '500',
			cursor: 'pointer',
			transition: 'all 0.15s ease-in-out',
			border: 'none',
		},
		disabled: {
			opacity: 0.65,
			cursor: 'not-allowed',
		},
	}

	const isOutline = Boolean(outline)
	const isLink = variant === 'link'
	const baseName = variant.toLowerCase()
	const sizeStyle = baseConfig.sizes[size] ?? baseConfig.sizes.md
	const variantStyle = isLink
		? baseConfig.variants.link
		: isOutline
			? baseConfig.outlines[baseName]
			: baseConfig.variants[baseName] ?? baseConfig.variants.primary

	const [isHovered, setIsHovered] = useState(false)
	const [isActive, setIsActive] = useState(false)
	const [isFocused, setIsFocused] = useState(false)

	const style = {
		...sizeStyle,
		...baseConfig.shared,
		...variantStyle,
		opacity: props.disabled ? baseConfig.disabled.opacity : 1,
		cursor: props.disabled ? baseConfig.disabled.cursor : 'pointer',
		transform: isActive ? 'scale(0.98)' : isFocused ? 'scale(1.02)' : 'scale(1)',
		transition: reducedMotion ? 'none' : baseConfig.shared.transition,
		...props.style,
	}

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !props.disabled) setIsActive(true)
		props.onKeyDown?.(e)
	}

	const handleKeyUp = (e) => {
		if (e.key === 'Enter') {
			setIsActive(false)
			setIsFocused(false)
		}
		props.onKeyUp?.(e)
	}

	return (
		<button
			{...props}
			style={style}
			disabled={props.disabled}
			onMouseEnter={() => !props.disabled && setIsHovered(true)}
			onMouseLeave={() => {
				setIsHovered(false)
				setIsActive(false)
			}}
			onMouseDown={() => !props.disabled && setIsActive(true)}
			onMouseUp={() => setIsActive(false)}
			onFocus={() => !props.disabled && setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			onKeyDown={handleKeyDown}
			onKeyUp={handleKeyUp}
		>
			{children}
		</button>
	)
}

Button.propTypes = {
	children: PropTypes.node.isRequired,
	variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'link']),
	outline: PropTypes.bool,
	size: PropTypes.oneOf(['md', 'sm']),
	style: PropTypes.object,
	disabled: PropTypes.bool,
	onKeyDown: PropTypes.func,
	onKeyUp: PropTypes.func,
}

Button.defaultProps = {
	style: {},
}