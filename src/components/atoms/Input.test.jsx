/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import Input from './Input.jsx'

describe('Input', () => {
	it('renders with correct type attribute', () => {
		const { container } = render(<Input type="email" />)
		const input = container.querySelector('input')
		expect(input).toHaveAttribute('type', 'email')
	})
})