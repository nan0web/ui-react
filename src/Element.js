import { Element } from "@nan0web/ui-core"

export default class ReactElement extends Element {
	/**
	 * @param {any} input
	 * @returns {ReactElement}
	 */
	static from(input) {
		if (input instanceof ReactElement) return input
		return new ReactElement(input)
	}
}
