import { describe, it } from 'node:test'
import assert from "node:assert"
import Element from './Element.js'

describe('Element', () => {
	it('parses simple block', () => {
		const block = { Button: ['Click me'], $variant: 'primary' }
		const el = Element.from(block)
		assert.equal(el.type, 'Button')
		assert.deepEqual(el.content, ['Click me'])
		assert.deepStrictEqual(el.props, { variant: 'primary' })
	})

	it('handles true content', () => {
		const block = { Icon: true, $name: 'home' }
		const el = Element.from(block)
		assert.deepStrictEqual(el.content, [])
		assert.equal(el.props.name, 'home')
	})

	it('extracts props correctly', () => {
		const block = { div: ['Hello'], $className: 'text-lg', $onClick: () => { } }
		const el = Element.from(block)
		assert.equal(el.props.className, 'text-lg')
		assert.equal(typeof el.props.onClick, "function")
	})

	it('returns child elements', () => {
		const block = {
			Card: [
				{ Typography: ['Title'] },
				{ Button: ['Action'] },
			]
		}
		const el = Element.from(block)
		const children = el.getChildElements()
		assert.equal(children.length, 2)
		assert.equal(children[0].type, 'Typography')
		assert.equal(children[1].type, 'Button')
	})
})
