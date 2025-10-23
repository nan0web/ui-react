import { AppCore } from '@nan0web/core'
import DB from '@nan0web/db-browser'

/**
 * Demonstration application registry - main UI structure
 *
 * @example
 * const app = new DemoApp({ db, theme, setTheme })
 * const result = await app.run()
 */
export default class DemoApp extends AppCore {
	/**
	 * @param {Object} input
	 * @param {DB} input.db
	 * @param {Object} input.theme
	 * @param {Function} input.setTheme
	 * @param {Function} input.navigate
	 * @param {string} [input.uri='index.html']
	 * @param {string} [input.locale='en']
	 */
	constructor({
		db,
		theme,
		setTheme,
		navigate,
		uri = 'index.html',
		locale = 'en'
	}) {
		super({ db, locale })
		this.theme = theme
		this.setTheme = setTheme
		this.navigate = navigate
		this.uri = uri

		/**
		 * @type {Map<string, () => Promise<AppCore>>}
		 */
		this.apps = new Map(
			/** @type {Array<[string, () => Promise<AppCore>]>} */(
				[
					['SimpleApp', async () => {
						const mod = await import('./SimpleApp.js')
						return mod.default.from({ title: 'Simple', uri: this.uri, db, locale })
					}],
					['CustomRendererApp', async () => {
						const mod = await import('./CustomRendererApp.js')
						return mod.default.from({ title: 'Custom', uri: this.uri, db, locale })
					}],
					['NavigationApp', async () => {
						const mod = await import('../navigation/App.js')
						const app = mod.default.from({ db, locale })
						app.title = 'Navigation'
						app.uri = this.uri
						return app
					}],
					['ThemeSwitcherApp', async () => {
						const mod = await import('../theme-switcher/App.js')
						return mod.default.from({ title: 'Theme', uri: this.uri, db, locale })
					}],
				])
		)
	}

	/**
	 * @override
	 * @returns {Promise<Object>}
	 */
	async run() {
		// Register applications within the system
		this.data = {
			uri: this.uri,
			apps: this.apps
		}

		return {
			content: [
				{
					div: [
						{
							App: "SimpleApp",
							$uri: this.uri,
							$navigate: "action:navigate"
						},
						{
							App: "CustomRendererApp",
							$title: "Interactive Demo",
							$uri: this.uri
						}
					],
					$style: "display: flex; flex-direction: column; gap: 2rem;"
				},
				{
					Typography: ["Apps Demo: Simple and Interactive"],
					$variant: "h2",
					$className: "mb-4"
				}
			]
		}
	}

	/**
	 * @param {string} path
	 */
	handleNavigation(path) {
		this.uri = path
		this.navigate(path)
	}

	/**
	 * @param {any} input
	 * @returns {DemoApp}
	 */
	static from(input) {
		if (input instanceof DemoApp) return input
		return new DemoApp(input)
	}
}
