import test from 'node:test'
import assert from 'node:assert'
import Card from '../molecules/Card.js'

test('Card theme properties are defined', () => {
	assert.ok(Card.borderRadius)
	assert.ok(Card.boxShadow)
	assert.ok(Card.padding)
	assert.ok(Card.backgroundColor)
	assert.ok(Card.borderColor)
})
