import { AppCore } from '@nan0web/core'
import DB from '@nan0web/db'
import { Theme, NightTheme } from '@nan0web/ui-core'

/**
 * Theme switcher application - pure action without UI dependencies
 *
 * @example
 * const app = new ThemeSwitcherApp({ db, theme, setTheme })
 * const result = await app.run()
 */
export default class ThemeSwitcherApp extends AppCore {
	/**
	 * @param {Object} input
	 * @param {DB} input.db
	 * @param {Object} input.theme
	 * @param {Function} input.setTheme
	 * @param {string} [input.locale='en']
	 */
	constructor({ db, theme, setTheme, locale = 'en' }) {
		super({ db, locale })
		this.currentTheme = theme
		this.setTheme = setTheme
	}

	/**
	 * @override
	 * @returns {Promise<Object>}
	 */
	async run() {
		await this.bootstrapI18n('i18n/{{locale}}.json')

		this.actions = {
			themeToggle: () => {
				this.currentTheme = this.currentTheme === Theme ? NightTheme : Theme
				this.setTheme(this.currentTheme)
			}
		}

		return this.data
	}

	/**
	 * @param {Object} input
	 * @returns {ThemeSwitcherApp}
	 */
	static from(input) {
		if (input instanceof ThemeSwitcherApp) return input
		return new ThemeSwitcherApp(input)
	}
}
