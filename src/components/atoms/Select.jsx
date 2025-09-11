import React from 'react'
import PropTypes from 'prop-types'
import { useUI } from '../../context/UIContext.jsx'

export default function Select({ options = [], ...props }) {
	const { theme } = useUI()
	const config = theme.atoms.Select
	const style = {
		borderRadius: config.borderRadius,
		borderWidth: config.borderWidth,
		borderColor: config.borderColor,
		fontSize: config.fontSize,
		paddingLeft: config.paddingX,
		paddingRight: config.paddingX,
		paddingTop: config.paddingY,
		paddingBottom: config.paddingY,
		fontFamily: config.fontFamily,
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