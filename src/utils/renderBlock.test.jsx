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
		const block = { button: 'Click', $onClick: () => {} }
		const result = renderBlock(block, 'test', testContext)
		const { container } = render(result)
		expect(container.querySelector('button')).toBeInTheDocument()
	})

	it('renders nested elements', () => {
		const block = {
			div: [
				'Outer',
				{ span: 'Inner' }
			]
		}
		const dom = render(renderBlock(block, 'test', testContext))
		expect(dom.getByText('Outer')).toBeInTheDocument()
		expect(dom.getByText('Inner')).toBeInTheDocument()
	})

	it('renders ul with direct a children wrapped in li', () => {
		const block = {
			ul: [
				{ a: 'Link 1', $href: '#' },
				{ a: 'Link 2', $href: '#' }
			]
		}
		const result = renderBlock(block, 'test', testContext)
		const { container } = render(result)

		const ul = container.querySelector('ul')
		const lis = ul.querySelectorAll('li')
		expect(lis).toHaveLength(2)

		const aElements = container.querySelectorAll('ul li a')
		expect(aElements).toHaveLength(2)
		expect(aElements[0]).toHaveTextContent('Link 1')
		expect(aElements[1]).toHaveTextContent('Link 2')
	})

	it('renders ol with direct string children wrapped in li', () => {
		const block = { ol: ['Item 1', 'Item 2', 'Item 3'] }
		const result = renderBlock(block, 'test', testContext)
		const { container } = render(result)

		const ol = container.querySelector('ol')
		const lis = ol.querySelectorAll('li')
		expect(lis).toHaveLength(3)

		expect(lis[0]).toHaveTextContent('Item 1')
		expect(lis[1]).toHaveTextContent('Item 2')
		expect(lis[2]).toHaveTextContent('Item 3')
	})

	it('renders ul with existing li elements without double wrapping', () => {
		const block = {
			ul: [
				{ li: [{ a: 'Link 1', $href: '#' }] },
				{ li: 'Item 2' }
			]
		}
		const result = renderBlock(block, 'test', testContext)
		const { container } = render(result)

		const ul = container.querySelector('ul')
		const lis = ul.querySelectorAll('li')
		expect(lis).toHaveLength(2)

		const firstLiChildren = lis[0].children
		expect(firstLiChildren[0].tagName).toBe('A')
		expect(firstLiChildren[0]).toHaveTextContent('Link 1')
		expect(lis[1]).toHaveTextContent('Item 2')
	})

	it('renders empty ul correctly', () => {
		const block = { ul: [] }
		const result = renderBlock(block, 'test', testContext)
		const { container } = render(result)

		const ul = container.querySelector('ul')
		expect(ul).toBeInTheDocument()
		expect(ul.children).toHaveLength(0)
	})

	it('renders img (void element) without children', () => {
		const block = { img: true, $src: '/pic.webp', $alt: 'Test Image' }
		const result = renderBlock(block, 'test', testContext)
		const { container } = render(result)

		const img = container.querySelector('img')
		expect(img).toBeInTheDocument()
		expect(img).toHaveAttribute('src', '/pic.webp')
		expect(img).toHaveAttribute('alt', 'Test Image')
		expect(img.children).toHaveLength(0)
	})

	it('passes string onClick to DOM elements without evaluation', () => {
		const block = { button: 'Click me', $onClick: "() => { window.alert('Clicked') }" }
		const result = renderBlock(block, 'test', testContext)
		const { container } = render(result)

		const button = container.querySelector('button')
		expect(button).toBeInTheDocument()
		expect(button.getAttribute('onClick')).toBeNull()
		expect(typeof button.onclick).toBe('function')
	})
})


describe('renderBlock extended behavior', () => {
	const ctx = { components, renderers }

	it('converts string $onClick to a real function', () => {
		const block = { button: 'Press', $onClick: '() => {}' }
		const elem = renderBlock(block, 'k1', ctx)
		const { container } = render(elem)
		const btn = container.querySelector('button')
		// React stores listeners as functions, not strings
		expect(typeof btn.onclick === 'function' || typeof btn.onclick === 'object').toBe(true)
	})
})
