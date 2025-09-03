import test from 'node:test'
import assert from 'node:assert'
import Input from './Input.js'

test('Input theme properties are defined', () => {
	assert.ok(Input.borderRadius)
	assert.ok(Input.borderWidth)
	assert.ok(Input.borderColor)
	assert.ok(Input.fontSize)
	assert.ok(Input.paddingX)
	assert.ok(Input.paddingY)
	assert.ok(Input.fontFamily)
})
