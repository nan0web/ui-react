import { AppCore } from '@nan0web/core'

/**
 * Simple App: рендериться стандартно з content (без динаміки).
 * run() повертає об'єкт з content для ясності.
 *
 * @example
 * new SimpleApp({ uri }).run() → { content: [ { h2: [...] }, { Button: [...] } ] }
 */
export default class SimpleApp extends AppCore {
	/**
	 * @param {Object} input
	 * @param {import('@nan0web/db-browser').default} input.db
	 * @param {string} [input.title='Demo']
	 * @param {string} [input.uri='index.html']
	 * @param {string} [input.locale='en']
	 */
	constructor(input) {
		super(input)
		const { title = 'Demo', uri = "index.html" } = input
		this.title = title
		this.uri = uri
	}

	/**
	 * @override
	 * @returns {Promise<Object>} — { type: 'standard', content: [...] }
	 */
	async run() {
		// Simulate async delay (~3 seconds) for testing purposes
		await new Promise(resolve => setTimeout(resolve, 3000))

		return {
			type: 'standard',
			content: [
				{
					Typography: [`Simple App: ${this.title}`],
					$variant: 'h2',
					$className: 'text-xl font-semibold mb-2'
				},
				{
					p: [`URI: ${this.uri}. Стандартний рендеринг без стану.`],
					$className: 'mb-4'
				},
				{
					Button: ['Клік для наміру'],
					$variant: 'secondary',
					$onClick: '() => console.log("Simple click!")'
				}
			]
		}
	}

	static from(input) {
		if (input instanceof SimpleApp) return input
		return new SimpleApp(input)
	}
}