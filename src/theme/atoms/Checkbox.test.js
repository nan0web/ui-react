import test from 'node:test'
import assert from 'node:assert'
import Checkbox from './Checkbox.js'

test('Checkbox theme properties are defined', () => {
	assert.ok(Checkbox.size)
	assert.ok(Checkbox.borderColor)
	assert.ok(Checkbox.borderRadius)
	assert.ok(Checkbox.borderWidth)
	assert.ok(Checkbox.backgroundColor)
	assert.ok(Checkbox.checkedColor)
})
