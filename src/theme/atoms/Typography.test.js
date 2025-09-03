import test from 'node:test'
import assert from 'node:assert'
import Typography from './Typography.js'

test('Typography theme variants are defined', () => {
	assert.ok(Typography.variants)
	assert.ok(Typography.variants.h1)
	assert.ok(Typography.variants.h2)
	assert.ok(Typography.variants.h3)
	assert.ok(Typography.variants.h4)
	assert.ok(Typography.variants.h5)
	assert.ok(Typography.variants.h6)
	assert.ok(Typography.variants.body)
	assert.ok(Typography.variants.small)
	assert.ok(Typography.variants.caption)
})
