import { AppCore } from '@nan0web/core'
import DB from '@nan0web/db-browser'

const NAV_ITEMS = [
	{ href: 'home', title: 'navigation.home' },
	{ href: 'avatar', title: 'navigation.avatar' },
	{ href: 'badge', title: 'navigation.badge' },
	{ href: 'button', title: 'navigation.button' },
	{ href: 'input', title: 'navigation.input' }
	// Додай інші точки
]

export default class NavigationApp extends AppCore {
	/**
	 * @param {Object} input
	 * @param {DB} input.db
	 * @param {Function} input.navigate
	 * @param {string} [input.currentPath='home']
	 * @param {string} [input.locale='en']
	 */
	constructor({ db, navigate, currentPath = 'home', locale = 'en' }) {
		super({ db, locale })
		this.navigate = navigate
		this.currentPath = currentPath
	}

	/**
	 * @override
	 * @returns {Promise<Object>}
	 */
	async run() {
		await this.bootstrapI18n('/apps/navigation/i18n/{{locale}}.json')

		this.actions = {
			navigate: (path) => {
				this.currentPath = path
				this.navigate(path)
			}
		}

		return {
			$content: [
				{
					Typography: [
						{ "$t": "navigation.title" }
					],
					$variant: "h2",
					$style: "margin-bottom: 1rem;"
				},
				{
					Navigation: NAV_ITEMS.map(item => ({
						$href: item.href,
						$title: { "$t": item.title },
						$active: this.currentPath === item.href
					})),
					$variant: "default"
				},
				{
					App: "ThemeSwitcher",
					$style: "margin-top: 1rem;"
				}
			]
		}
	}

	static from(input) {
		if (input instanceof NavigationApp) return input
		return new NavigationApp(input)
	}
}
