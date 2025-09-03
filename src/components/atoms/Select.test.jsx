/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import Select from './Select.jsx'

describe('Select', () => {
	const options = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
	]

	it('renders all provided options', () => {
		const { getByRole } = render(<Select options={options} />)
		const select = getByRole('combobox')
		expect(select.querySelectorAll('option')).toHaveLength(2)
	})
})