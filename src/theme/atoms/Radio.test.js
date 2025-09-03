import test from 'node:test'
import assert from 'node:assert'
import Radio from './Radio.js'

test('Radio theme properties are defined', () => {
	assert.ok(Radio.size)
	assert.ok(Radio.borderColor)
	assert.ok(Radio.borderRadius)
	assert.ok(Radio.borderWidth)
	assert.ok(Radio.backgroundColor)
	assert.ok(Radio.checkedColor)
})
