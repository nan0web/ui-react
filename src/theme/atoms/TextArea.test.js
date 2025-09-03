import test from 'node:test'
import assert from 'node:assert'
import TextArea from './TextArea.js'
import Input from './Input.js'

test('TextArea theme inherits from Input', () => {
	assert.equal(TextArea.borderRadius, Input.borderRadius)
	assert.equal(TextArea.borderWidth, Input.borderWidth)
	assert.equal(TextArea.borderColor, Input.borderColor)
	assert.equal(TextArea.fontSize, Input.fontSize)
	assert.equal(TextArea.paddingX, Input.paddingX)
	assert.equal(TextArea.paddingY, Input.paddingY)
	assert.equal(TextArea.fontFamily, Input.fontFamily)
})

test('TextArea theme has own height property', () => {
	assert.ok(TextArea.height)
})
