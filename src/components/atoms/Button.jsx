import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUI } from '../../context/UIContext.jsx'

/**
 * Lighten or darken a hex colour.
 *
 * @param {string} hex – colour in #rrggbb format.
 * @param {number} amount – positive to lighten, negative to darken (0‑255).
 * @returns {string} Adjusted colour in #rrggbb.
 */
function adjustHex(hex, amount) {
	const num = parseInt(hex.replace('#', ''), 16)
	const r = Math.min(255, Math.max(0, (num >> 16) + amount))
	const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount))
	const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount))
	return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

/**
 * Button component with Bootstrap‑like variants, optional outline,
 * animation that respects the a11y “reduced motion” flag and dark theme.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.variant='primary']
 *        One of: primary, secondary, success, warning, danger,
 *        info, light, dark, link
 * @param {boolean} [props.outline=false] If `true` use outline variant.
 * @param {string} [props.size='md'] 'md' (default) or 'sm'.
 * @param {Object} [props.style] additional inline styles.
 * @param {boolean} [props.disabled] disables the button.
 * @param {function} [props.onKeyDown] optional keyDown handler.
 * @param {function} [props.onKeyUp] optional keyUp handler.
 */
export default function Button({
	children,
	variant = 'primary',
	outline = false,
	size = 'md',
	...props
}) {
	const { theme, reducedMotion } = useUI()
	const config = theme.atoms.Button ?? {
		outline: {},
		solid: {},
		size: {},
		animation: {},
		background: "",
		shadow: "",
		color: "",
		borderRadius: "",
		borderWidth: "",
		borderColor: "",
		fontSize: "",
		paddingLeft: "",
		paddingRight: "",
		paddingTop: "",
		paddingBottom: "",
		paddingX: "",
		paddingY: "",
	}

	const isOutline = Boolean(outline)
	const baseName = variant.toLowerCase()

	const variantStyle = isOutline
		? config.outline[baseName] ?? {}
		: config.solid[baseName] ?? {}

	const sizeStyle = size === 'sm' ? config.size?.sm ?? {} : {}

	const [hover, setHover] = useState(false)
	const [active, setActive] = useState(false)
	const [focus, setFocus] = useState(false)

	const baseBg = variantStyle.background || config.background
	const hoverBg = baseBg.startsWith('#')
		? adjustHex(baseBg, config.animation.hoverAdjust)
		: baseBg
	const activeBg = baseBg.startsWith('#')
		? adjustHex(baseBg, config.animation.activeAdjust)
		: baseBg

	const background = props.disabled
		? variantStyle.background || config.background
		: active
			? activeBg
			: hover
				? hoverBg
				: baseBg

	const style = {
		borderRadius: config.borderRadius,
		borderWidth: config.borderWidth,
		borderColor: variantStyle.border ?? config.borderColor,
		fontSize: sizeStyle.fontSize ?? config.fontSize,
		paddingLeft: sizeStyle.paddingX ?? config.paddingX,
		paddingRight: sizeStyle.paddingX ?? config.paddingX,
		paddingTop: sizeStyle.paddingY ?? config.paddingY,
		paddingBottom: sizeStyle.paddingY ?? config.paddingY,
		color: variantStyle.color ?? config.color,
		background,
		boxShadow: config.shadow,
		cursor: props.disabled ? 'not-allowed' : 'pointer',
		opacity: props.disabled ? config.animation.disabledOpacity : 1,
		transition: reducedMotion ? 'none' : config.animation.transition,
		transform: active
			? `scale(${config.animation.activeScale})`
			: focus
				? `scale(${config.animation.focusScale})`
				: 'scale(1)',
		...props.style,
	}

	/* keyboard handling – mimic click animation on Enter */
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') setActive(true)
		if (props.onKeyDown) props.onKeyDown(e)
	}
	const handleKeyUp = (e) => {
		if (e.key === 'Enter') {
			setActive(false)
			setFocus(false)
		}
		if (props.onKeyUp) props.onKeyUp(e)
	}

	return (
		<button
			style={style}
			{...props}
			disabled={props.disabled}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => {
				setHover(false)
				setActive(false)
			}}
			onMouseDown={() => setActive(true)}
			onMouseUp={() => setActive(false)}
			onFocus={() => setFocus(true)}
			onBlur={() => setFocus(false)}
			onKeyDown={handleKeyDown}
			onKeyUp={handleKeyUp}
		>
			{children}
		</button>
	)
}

Button.propTypes = {
	children: PropTypes.node.isRequired,
	variant: PropTypes.oneOf([
		'primary',
		'secondary',
		'success',
		'warning',
		'danger',
		'info',
		'light',
		'dark',
		'link',
	]),
	outline: PropTypes.bool,
	size: PropTypes.oneOf(['md', 'sm']),
	style: PropTypes.object,
	disabled: PropTypes.bool,
	onKeyDown: PropTypes.func,
	onKeyUp: PropTypes.func,
}
