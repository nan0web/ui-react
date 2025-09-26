import Navigation from "./Navigation.js"

export default class Document {
	/**
	 * Content configuration for the document page.
	 * @type {Array<Object>}
	 */
	$content = []
	/** @type {string} */
	$lang = "en"
	/** @type {Navigation} */
	nav = new Navigation()
	/** @type {Map<string, string>} */
	t = new Map()

	/**
	 * @param {object} [input]
	 * @param {Array<object>} [input.$content=[]]
	 * @param {string} [input.$lang="en"]
	 * @param {any} [input.nav=new Navigation()]
	 * @param {any} [input.t=new Map()]
	 */
	constructor(input = {}) {
		const {
			$content = this.$content,
			$lang = this.$lang,
			nav = this.nav,
			t = this.t,
		} = input
		this.$content = Array.from($content)
		this.$lang = String($lang)
		this.nav = Navigation.from(nav)
		this.t = new Map(Array.isArray(t) ? t : Object.entries(t))
	}

	/**
	 * @param {string} type
	 * @returns {Array<object>}
	 */
	getBlocksByType(type) {
		return this.$content.filter(block => block[type] !== undefined)
	}

	/**
	 * @param {object} input
	 * @returns {Document}
	 */
	static from(input) {
		if (input instanceof Document) return input
		return new Document(input)
	}
}
