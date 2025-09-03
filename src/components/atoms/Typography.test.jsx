/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import Typography from './Typography.jsx'

describe('Typography', () => {
	it('renders h1 variant correctly', () => {
		const { container } = render(<Typography variant="h1">Heading 1</Typography>)
		expect(container.querySelector('h1')).toBeInTheDocument()
	})

	it('renders body variant correctly', () => {
		const { container } = render(<Typography variant="body">Body text</Typography>)
		expect(container.querySelector('p')).toBeInTheDocument()
	})
})