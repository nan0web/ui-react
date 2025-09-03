import test from 'node:test'
import assert from 'node:assert'
import Button from './Button.js'
import Input from './Input.js'

test('Button theme inherits from Input', () => {
	assert.equal(Button.borderRadius, Input.borderRadius)
	assert.equal(Button.borderWidth, Input.borderWidth)
	assert.equal(Button.fontSize, Input.fontSize)
	assert.equal(Button.paddingX, Input.paddingX)
	assert.equal(Button.paddingY, Input.paddingY)
})

test('Button theme has own properties', () => {
	assert.ok(Button.borderColor)
	assert.ok(Button.color)
	assert.ok(Button.background)
	assert.ok(Button.hoverBackground)
	assert.ok(Button.shadow)
})
