/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import TextArea from './TextArea.jsx'

describe('TextArea', () => {
	it('renders textarea element', () => {
		const { container } = render(<TextArea />)
		expect(container.querySelector('textarea')).toBeInTheDocument()
	})
})