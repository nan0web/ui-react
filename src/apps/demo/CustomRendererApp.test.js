import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import CustomRendererApp from './CustomRendererApp.js'

const mockInput = { title: 'Test', uri: '/test' }

describe('CustomRendererApp (UI-Agnostic)', () => {
	it('run() returns agnostic data without JSX', async () => {
		const app = new CustomRendererApp(mockInput)
		const result = await app.run()

		assert.strictEqual(result.type, 'interactive')
		assert.ok(result.requiresInput)
		assert.strictEqual(result.requiresInput.fields.length, 1)
		assert.strictEqual(result.requiresInput.fields[0].name, 'count')
		assert.ok(typeof result.compute === 'function')
		assert.ok(Array.isArray(result.$content))
		assert.ok(result.$content[0].Typography)

		// Verify no JSX
		assert.strictEqual(result.Renderer, undefined)
	})

	it('compute function processes input correctly', async () => {
		const app = new CustomRendererApp(mockInput)
		const result = await app.run()
		const computed = result.compute({ count: 5 })

		assert.strictEqual(computed.$title, 'Result: 10')
		assert.strictEqual(computed.message, 'Computed from 5 → 10')
		assert.ok(Array.isArray(computed.updatedContent))
	})

	it('from() creates instance correctly', () => {
		const app = CustomRendererApp.from(mockInput)
		assert.ok(app instanceof CustomRendererApp)
		assert.strictEqual(app.title, 'Test')
	})
})