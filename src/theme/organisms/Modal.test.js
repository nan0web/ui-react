import test from 'node:test'
import assert from 'node:assert'
import Modal from '../organisms/Modal.js'

test('Modal theme properties are defined', () => {
	assert.ok(Modal.overlayBackground)
	assert.ok(Modal.borderRadius)
	assert.ok(Modal.boxShadow)
	assert.ok(Modal.padding)
	assert.ok(Modal.backgroundColor)
})
