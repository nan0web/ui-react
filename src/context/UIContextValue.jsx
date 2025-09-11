import AppCore from "@nan0web/core"
import { Theme } from "@nan0web/ui-core"
import DB from "@nan0web/db-browser"

/**
 * Tiny context UI for all components.
 */
class UIContextValue {
	/**
	 * @param {Object} [input]
	 * @param {typeof Theme} [input.theme]
	 * @param {string} [input.lang]
	 * @param {DB} [input.db]
	 * @param {boolean} [input.reducedMotion]
	 * @param {object} [input.data]
	 * @param {Function} [input.setTheme]
	 * @param {Function} [input.t]
	 * @param {Function} [input.renderFn]
	 * @param {Map<string, () => Promise<{default: typeof AppCore}>>} [input.apps]
	 * @param {Map<string, React.Component>} [input.components]
	 * @param {Map<string, React.Component>} [input.renderers]
	 * @param {Record<string, Function>} [input.actions] - UI actions
	 */
	constructor(input = {}) {
		const {
			theme = Theme,
			lang = 'en',
			db = new DB(),
			reducedMotion = false,
			setTheme = () => { },
			t = k => k,
			data = {},
			renderFn = () => null,
			components = new Map(),
			renderers = new Map(),
			apps = new Map(),
			actions = {},
			...rest
		} = input

		this.theme = theme
		this.lang = lang
		this.db = db
		this.reducedMotion = Boolean(reducedMotion)
		this.setTheme = this.#proxy("setTheme", typeof setTheme === 'function' ? setTheme : () => { })
		this.renderFn = renderFn
		this.components = components instanceof Map
			? components
			: new Map(Array.isArray(components) ? components : Object.entries(components))
		this.renderers = renderers instanceof Map
			? renderers
			: new Map(Array.isArray(renderers) ? renderers : Object.entries(renderers))
		this.apps = apps instanceof Map
			? apps
			: new Map(Array.isArray(apps) ? apps : Object.entries(apps))
		Object.values(actions).forEach((fn) => {
			if ("function" !== typeof fn) {
				throw new TypeError("All actions must be functions")
			}
		})
		this.apps.forEach((fn) => {
			if ("function" !== typeof fn) {
				throw new TypeError("All apps must be lazy functions")
			}
		})
		this.actions = actions
		this.data = data

		// assign the rest without changes
		Object.assign(this, rest)
	}

	#proxy(target, fn) {
		return (...args) => {
			console.debug(target, ...args)
			return fn(...args)
		}
	}

	/**
	 * Extend current context and returns new context value.
	 * @param {Object} overrides
	 * @returns {UIContextValue}
	 */
	extend(overrides = {}) {
		console.debug("UIContextValue.extend", overrides)
		return new UIContextValue({
			...this,
			...overrides,
		})
	}

	/**
	 * @param {any} input
	 * @returns {UIContextValue}
	 */
	static from(input) {
		if (input instanceof UIContextValue) return input
		console.debug("UIContextValue.from", input)
		return new UIContextValue(input)
	}
}

export default UIContextValue