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
})