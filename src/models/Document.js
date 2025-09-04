import Navigation from "./Navigation.js"

export default class Document {
	/** @type {Array<object>} */
	$content = []
	/** @type {Navigation} */
	nav

	/**
	 * @param {object} [input]
	 * @param {Array<object>} [input.$content=[]]
	 * @param {any} [input.nav={}]
	 */
	constructor(input = {}) {
		const { $content = [], nav = {} } = input
		this.$content = $content
		this.nav = Navigation.from(nav)
	}

	/**
	 * @param {object} input
	 * @returns {Document}
	 */
	static from(input) {
		if (input instanceof Document) return input
		return new Document(input)
	}

	/**
	 * @param {string} type
	 * @returns {Array<object>}
	 */
	getBlocksByType(type) {
		return this.$content.filter(block => block[type] !== undefined)
	}
}
