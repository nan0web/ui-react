import React from 'react'
import Element from '../Element.js'

// List of void elements </>
const voidElements = new Set([
	'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
	'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'
])

// Elements that have only <li> children, so in document we can omit li.
const listElements = new Set(['ul', 'ol'])

/**
 * Renders a block into a React element
 *
 * @param {Object} block - The block to render
 * @param {string | number} key - React key
 * @param {Object} context - Rendering context with components and renderers
 * @returns {JSX.Element} - Rendered React element
 */
export function renderBlock(block, key, context) {
	const { components, renderers } = context

	// Extract tag and content
	const [type, value] = Element.extractTags(block)[0] ?? ["div", ""]

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
	const rawProps = Element.extractProps(block)
	const props = {}

	for (const [name, value] of Object.entries(rawProps)) {
		if (name.startsWith('on')) {
			// If it is action
			if (typeof value === 'string' && context?.app?.actions?.[value]) {
				props[name] = context.app.actions[value]
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
						const tagEntries = Element.extractTags(item)
						if (tagEntries.length && tagEntries[0][0].toLowerCase() === 'li') {
							return renderBlock(item, `${key}-${i}`, context)
						}
					}
					// Otherwise wrap in <li>
					const li = { li: Array.isArray(item) ? item : [item] }
					return renderBlock(li, `${key}-${i}`, context)
				})
			} else {
				children = value.map((item, i) =>
					typeof item === 'object' && item !== null
						? renderBlock(item, `${key}-${i}`, context)
						: item
				)
			}
		} else if (typeof value === 'string' || typeof value === 'number') {
			// For list elements with string/number content, wrap in <li>
			if (listElements.has(type.toLowerCase())) {
				const li = { li: value }
				children = [renderBlock(li, `${key}-0`, context)]
			} else {
				children = [value]
			}
		}
	}

	// For void elements, ensure children is null
	if (isVoidElement) {
		return React.createElement(Component, propsWithKey, null)
	}
	return React.createElement(Component, propsWithKey, children)
}
