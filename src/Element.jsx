import { Element } from "@nan0web/ui-core"
import React from 'react'

/**
 * @typedef {Object} UIContext
 * @property {Map<string, React.Component>} [components]
 * @property {Map<string, React.Component>} [renderers]
 * @property {Object} [data] - App data
 * @property {Object<string, Function>} [actions] - UI actions
 * @property {Function} [t] - i18n translator
 */

// List of void elements </>
const voidElements = new Set([
	'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
	'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'
])

// Elements that have only <li> children, so in document we can omit li.
const listElements = new Set(['ul', 'ol'])

export default class ReactElement extends Element {
	/**
	 * @param {any} input
	 * @param {string|number} key
	 * @param {UIContext} context
	 * @returns {JSX.Element | null}
	 */
	static render(input, key, context) {
		const {
			components = new Map(),
			renderers = new Map(),
		} = context

		// Extract tag and content
		let type, value, rawProps = {}
		if (input instanceof ReactElement) {
			type = input.type
			value = input.content
			rawProps = input.props
		}
		else {
			rawProps = ReactElement.extractProps(input)
			const arr = ReactElement.extractTags(input)[0] ?? ["div", ""]
			type = arr[0]
			value = arr[1]
		}

		// Determine if it's a void element
		const isVoidElement = voidElements.has(type.toLowerCase())

		// Resolve component - search for component by PascalCase name in components map
		let Component = null
		if (renderers?.has(type)) {
			Component = renderers.get(type)
		} else if (components?.has(type)) {
			Component = components.get(type)
		} else {
			Component = type
		}

		// Extract props (fields starting with $)
		const props = {}

		for (const [name, value] of Object.entries(rawProps)) {
			if (name.startsWith('on')) {
				// If it is action
				if (typeof value === 'string' && context.actions?.[value]) {
					props[name] = context.actions[value]
					continue
				}
				// It is a function
				if (typeof value === 'function') {
					props[name] = value
					continue
				}
				// If value is string but, let's test if it is a valid function
				if (typeof value === 'string' && /^\s*\(.+?\)\s*=>/.test(value)) {
					try {
						/* eslint no-new-func: "off" */
						const fn = new Function(`return ${value}`)()
						if (typeof fn === 'function') {
							props[name] = fn
							continue
						}
					} catch (_) {
						/* ignore */
					}
				}
				// if nothing happened leave value as it is.
				props[name] = value
				continue
			}
			props[name] = value
		}

		const propsWithKey = { key, ...props }

		// Handle children only for non-void elements
		let children = null

		if (!isVoidElement) {
			if (Array.isArray(value)) {
				// For list elements (ul, ol), wrap direct children in <li>
				if (listElements.has(type.toLowerCase())) {
					// Wrap into <li> if it is a list element
					children = value.map((item, i) => {
						// If item is already an li element, render as is
						if (typeof item === 'object' && item !== null) {
							const tagEntries = ReactElement.extractTags(item)
							if (tagEntries.length && tagEntries[0][0].toLowerCase() === 'li') {
								return ReactElement.render(item, `${key}-${i}`, context)
							}
						}
						// Otherwise wrap in <li>
						const li = { li: Array.isArray(item) ? item : [item] }
						return ReactElement.render(li, `${key}-${i}`, context)
					})
				} else {
					children = value.map((item, i) =>
						typeof item === 'object' && item !== null
							? ReactElement.render(item, `${key}-${i}`, context)
							: item
					)
				}
			} else if (typeof value === 'string' || typeof value === 'number') {
				// For list elements with string/number content, wrap in <li>
				if (listElements.has(type.toLowerCase())) {
					const li = { li: value }
					children = [ReactElement.render(li, `${key}-0`, context)]
				} else {
					children = [value]
				}
			}
		}

		if (!Component) {
			console.error("Component not found")
			return null
		}

		// For void elements, ensure children is null
		if (isVoidElement) {
			return React.createElement(Component, propsWithKey, null)
		}

		return React.createElement(Component, propsWithKey, children)
	}

	/**
	 * @param {any} input
	 * @returns {ReactElement}
	 */
	static from(input) {
		if (input instanceof ReactElement) return input
		return new ReactElement(input)
	}
}
