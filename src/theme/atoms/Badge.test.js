import test from 'node:test'
import assert from 'node:assert'
import Badge from './Badge.js'

test('Badge theme properties are defined', () => {
	assert.ok(Badge.borderRadius)
	assert.ok(Badge.fontSize)
	assert.ok(Badge.paddingX)
	assert.ok(Badge.paddingY)
	assert.ok(Badge.fontWeight)
	assert.ok(Badge.backgroundColor)
	assert.ok(Badge.color)
})
