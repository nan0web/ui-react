/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import Card from './Card.jsx'

describe('Card', () => {
	it('renders children correctly', () => {
		const { getByText } = render(<Card><p>Card content</p></Card>)
		expect(getByText('Card content')).toBeInTheDocument()
	})
})
