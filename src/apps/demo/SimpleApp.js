import AppCore, { AppResult } from '@nan0web/core'

export default class SimpleApp extends AppCore {
	/**
	 *
	 * @returns {Promise<AppResult>}
	 */
	async run() {
		// Simulate minimal async delay (e.g., real fetch/API) — reduced for faster debugging
		await new Promise((resolve) => setTimeout(resolve, 10))
		return new AppResult({
			content: ['SimpleApp: ' + this.title, 'Standard rendering'],
		})
	}
}
