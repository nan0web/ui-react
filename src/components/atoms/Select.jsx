import React from 'react'
import PropTypes from 'prop-types'
import { useUI } from '../../context/UIContext.jsx'

export default function Select({ options = [], ...props }) {
	const { theme } = useUI()
	const {
		borderRadius = '4px',
		borderWidth = '1px',
		borderColor = '#cccccc',
		fontSize = '14px',
		paddingX = '12px',
		paddingY = '8px',
		fontFamily = 'sans-serif',
	} = theme.atoms?.Select ?? {}
	
	const style = {
		borderRadius,
		borderWidth,
		borderColor,
		fontSize,
		paddingLeft: paddingX,
		paddingRight: paddingX,
		paddingTop: paddingY,
		paddingBottom: paddingY,
		fontFamily,
		...props.style,
	}

	return (
		<select style={style} {...props}>
			{options.map((option, i) => (
				<option key={i} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	)
}

Select.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	),
	style: PropTypes.object,
}