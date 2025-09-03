import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { renderBlock } from './renderBlock.jsx'
import components from '../components/index.jsx'
import renderers from '../renderers/index.jsx'

describe('renderBlock', () => {
	const testContext = { components, renderers }

	it('renders text content', () => {
		const block = { span: 'Hello' }
		const result = renderBlock(block, 'test', testContext)
		const { getByText } = render(result)
		expect(getByText('Hello')).toBeInTheDocument()
	})

	it('renders with props', () => {
		const block = { button: 'Click', $onClick: () => { } }
		const result = renderBlock(block, 'test', testContext)
		const { container } = render(result)
		expect(container.querySelector('button')).toBeInTheDocument()
	})

	it('renders nested elements', () => {
		const block = {
			div: [
				"Outer",
				{ span: "Inner" }
			]
		}
		const dom = render(renderBlock(block, 'test', testContext))
		expect(dom.getByText('Outer')).toBeInTheDocument()
		expect(dom.getByText('Inner')).toBeInTheDocument()
	})
})
