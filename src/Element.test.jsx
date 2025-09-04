import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ReactElement from './Element.jsx'

describe('ReactElement', () => {
	it('parses simple block', () => {
		const block = { Button: ['Click me'], $variant: 'primary' }
		const el = ReactElement.from(block)
		expect(el.type).toBe('Button')
		expect(el.content).toEqual(['Click me'])
		expect(el.props).toEqual({ variant: 'primary' })
	})

	it('handles true content', () => {
		const block = { Icon: true, $name: 'home' }
		const el = ReactElement.from(block)
		expect(el.content).toEqual([])
		expect(el.props.name).toBe('home')
	})

	it('extracts props correctly', () => {
		const block = { div: ['Hello'], $className: 'text-lg', $onClick: () => { } }
		const el = ReactElement.from(block)
		expect(el.props.className).toBe('text-lg')
		expect(typeof el.props.onClick).toBe('function')
	})

	it('returns child elements', () => {
		const block = {
			Card: [
				{ Typography: ['Title'] },
				{ Button: ['Action'] },
			]
		}
		const el = ReactElement.from(block)
		const children = el.getChildElements()
		expect(children.length).toBe(2)
		expect(children[0].type).toBe('Typography')
		expect(children[1].type).toBe('Button')
	})

	it('renders with renderBlock', () => {
		const block = { span: ['Test child'] }
		const el = ReactElement.from(block)
		render(ReactElement.render(el, 0, {}))
		expect(screen.getByText('Test child')).toBeInTheDocument()
	})
})
