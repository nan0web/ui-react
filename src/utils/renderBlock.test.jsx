/**
 * @vitest-environment happy-dom
 */
import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { renderBlock } from './renderBlock.jsx'

describe('renderBlock', () => {
	it('renders text content', () => {
		const block = { span: ['Hello'] }
		const result = renderBlock(block, 'test')
		const { getByText } = render(result)
		expect(getByText('Hello')).toBeInTheDocument()
	})

	it('renders with props', () => {
		const block = { button: ['Click'], $onClick: () => { } }
		const result = renderBlock(block, 'test')
		const { container } = render(result)
		expect(container.querySelector('button')).toBeInTheDocument()
	})

	it('renders nested elements', () => {
		const block = {
			div: [
				"Outer",
				{ span: ["Inner"] }
			]
		}
		const { getByText } = render(renderBlock(block, 'test'))
		expect(getByText('Outer')).toBeInTheDocument()
		expect(getByText('Inner')).toBeInTheDocument()
	})
})
