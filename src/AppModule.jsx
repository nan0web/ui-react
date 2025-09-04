import DB from "@nan0web/db-browser"
import Element from "./Element.jsx"

export default class AppModule {
	/** @type {string} */
	uri

	/** @type {Object} */
	config

	/** @type {Object} */
	data = {}

	/** @type {DB} */
	db

	/** @type {Object} */
	ui

	/**
	 * @param {string} uri - e.g., "app/currency-calculator"
	 * @param {DB} db
	 */
	constructor(uri, db) {
		this.uri = uri
		this.db = db
	}

	async load() {
		console.error("LOAD MUST BE FIXED")
		this.config = await this.db.fetch(`${this.uri}/config.json`)
		this.ui = await this.db.fetch(`${this.uri}/main.json`)
		this.data = await this.db.extract(`${this.uri}/data`) || {}
	}

	async run(action) {
		if (action === 'convert') {
			const result = await this.convert(this.data.value, this.data.from, 'USD')
			this.data.result = result
			await this.db.saveDocument(`${this.uri}/data`, this.data)
		}
	}

	async convert(value, from, to) {
		// stub
		return (value / 40).toFixed(2) + ' ' + to
	}

	/**
	 * @returns {JSX.Element | null}
	 */
	render(key, context) {
		return Element.render(this.ui, key, {
			...context,
			app: this,
			bind: (field) => (ev) => {
				this.data[field] = ev.target.value
			}
		})
	}
}
