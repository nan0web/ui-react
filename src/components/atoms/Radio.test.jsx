/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import Radio from './Radio.jsx'

describe('Radio', () => {
	it('renders checked state correctly', () => {
		const { container } = render(<Radio checked={true} readOnly />)
		const input = container.querySelector('input')
		expect(input).toBeChecked()
	})

	it('renders unchecked state correctly', () => {
		const { container } = render(<Radio checked={false} readOnly />)
		const input = container.querySelector('input')
		expect(input).not.toBeChecked()
	})
})
