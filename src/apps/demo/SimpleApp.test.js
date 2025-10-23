import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import SimpleApp from './SimpleApp.js'

const mockInput = { title: 'Test', uri: '/test' }

describe('SimpleApp', () => {
	it('run() returns standard data structure', async () => {
		const app = new SimpleApp(mockInput)
		const result = await app.run()

		assert.strictEqual(result.type, 'standard')
		assert.ok(Array.isArray(result.$content))
		assert.ok(result.$content[0].Typography)
		assert.ok(result.$content[2].Button)
	})

	it('simulates async delay', async () => {
		const start = Date.now()
		const app = new SimpleApp(mockInput)
		await app.run()
		const end = Date.now()
		assert.ok(end - start >= 3000 - 100)  // ~3s з толерантністю
	})

	it('from() creates instance', () => {
		const app = SimpleApp.from(mockInput)
		assert.ok(app instanceof SimpleApp)
		assert.strictEqual(app.uri, '/test')
	})
})