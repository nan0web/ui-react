/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import Checkbox from './Checkbox.jsx'

describe('Checkbox', () => {
	it('renders checked state correctly', () => {
		const { container } = render(<Checkbox checked={true} readOnly />)
		const input = container.querySelector('input')
		expect(input).toBeChecked()
	})

	it('renders unchecked state correctly', () => {
		const { container } = render(<Checkbox checked={false} readOnly />)
		const input = container.querySelector('input')
		expect(input).not.toBeChecked()
	})
})
