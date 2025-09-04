/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import Badge from './Badge.jsx'

describe('Badge', () => {
	it('renders children correctly', () => {
		const { getByText } = render(<Badge>Test Badge</Badge>)
		expect(getByText('Test Badge')).toBeInTheDocument()
	})

	it('applies variant background with white text', () => {
		const { getByText } = render(<Badge variant="danger">Danger</Badge>)
		const span = getByText('Danger')
		const style = span.getAttribute('style')
		expect(style).toContain('background-color: #dc3545')
		expect(style).toContain('color: #fff')
	})
})