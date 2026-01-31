import React from 'react'
import PropTypes from 'prop-types'
import { useUI } from '../../context/UIContext.jsx'

export default function Radio({ checked = false, onChange, disabled = false, ...props }) {
	const { theme } = useUI()
	const themeDefaults = theme?.atoms?.Radio || {}
	const defaults = {
		size: '16px',
		borderWidth: '1px',
		borderColor: '#cccccc',
		borderRadius: '50%',
		backgroundColor: '#ffffff',
		checkedColor: '#0d6efd',
		cursor: 'pointer',
		...themeDefaults,
	}

	const style = {
		width: defaults.size,
		height: defaults.size,
		border: `${defaults.borderWidth} solid ${defaults.borderColor}`,
		borderRadius: defaults.borderRadius,
		backgroundColor: checked ? defaults.checkedColor : defaults.backgroundColor,
		appearance: 'none',
		position: 'relative',
		cursor: disabled ? 'not-allowed' : defaults.cursor,
		opacity: disabled ? 0.5 : 1,
		...props.style,
	}

	return (
		<span style={{ position: 'relative', display: 'inline-block', width: defaults.size, height: defaults.size }}>
			<input
				type="radio"
				checked={checked}
				onChange={onChange}
				style={style}
				disabled={disabled}
				{...props}
			/>
			{checked && (
				<span
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: '50%',
						height: '50%',
						borderRadius: '50%',
						backgroundColor: 'white',
						pointerEvents: 'none',
					}}
				/>
			)}
		</span>
	)
}

Radio.propTypes = {
	checked: PropTypes.bool,
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	style: PropTypes.object,
}
