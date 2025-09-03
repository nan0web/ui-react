export default class Document {
	/** @type {Array<object>} */
	$content = []

	/**
	 * @param {object} [input]
	 * @param {Array<object>} [input.$content=[]]
	 */
	constructor(input = {}) {
		const { $content = [] } = input
		this.$content = $content
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
