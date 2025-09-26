import { AppCore } from '@nan0web/core'
import DB from '@nan0web/db-browser'

/**
 * @type {Map<string, Function>}
 */
// @ts-ignore
const apps = new Map([
	['NavigationApp', async () => await import('../navigation/App.js')],
	['ThemeSwitcherApp', async () => await import('../theme-switcher/App.js')]
])

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
	 * @param {string} [input.currentPath='home']
	 * @param {string} [input.locale='en']
	 */
	constructor({
		db,
		theme,
		setTheme,
		navigate,
		currentPath = 'home',
		locale = 'en'
	}) {
		super({ db, locale })
		this.theme = theme
		this.setTheme = setTheme
		this.navigate = navigate
		this.currentPath = currentPath

		// Fix Map type compatibility by using consistent return types
		this.apps = apps
	}

	/**
	 * @override
	 * @returns {Promise<Object>}
	 */
	async run() {
		// Register applications within the system
		this.data = {
			currentPath: this.currentPath,
			apps: this.apps
		}

		return {
			$content: [
				{
					div: [
						{
							App: "NavigationApp",
							$currentPath: this.currentPath,
							$navigate: "action:navigate"
						},
						{
							App: "DemoPage",
							$currentPath: this.currentPath
						}
					],
					$style: "display: flex; height: 100vh;"
				}
			]
		}
	}

	/**
	 * @param {string} path
	 */
	handleNavigation(path) {
		this.currentPath = path
		this.navigate(path)
	}

	static from(input) {
		if (input instanceof DemoApp) return input
		return new DemoApp(input)
	}
}
