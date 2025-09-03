/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import Button from './Button.jsx'

describe('Button', () => {
	it('renders children correctly', () => {
		render(<Button>Click me</Button>)
		expect(screen.getByText('Click me')).toBeInTheDocument()
	})
})