import test from 'node:test'
import assert from 'node:assert'
import Select from './Select.js'
import Input from './Input.js'

test('Select theme inherits from Input', () => {
	assert.equal(Select.borderRadius, Input.borderRadius)
	assert.equal(Select.borderWidth, Input.borderWidth)
	assert.equal(Select.borderColor, Input.borderColor)
	assert.equal(Select.fontSize, Input.fontSize)
	assert.equal(Select.paddingX, Input.paddingX)
	assert.equal(Select.paddingY, Input.paddingY)
	assert.equal(Select.fontFamily, Input.fontFamily)
})
