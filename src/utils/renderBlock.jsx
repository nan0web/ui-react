import React from 'react'

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

	// One key - component type
	const [type, value] = Object.entries(block)[0]

	// If type is a component, use renderers or components
	const Component = renderers[type] || components[type] || type

	// If value is an array, process each element
	/** @type {React.ReactNode[]} */
	let children = []

	if (Array.isArray(value)) {
		children = value.map((item, index) =>
			typeof item === 'object' && item !== null
				? renderBlock(item, `${key}-${index}`, context) // nested block
				: item // ✅ plain text
		)
	} else if (typeof value === 'string' || typeof value === 'number') {
		children = [value]
	} else {
		children = []
	}

	// Props: fields starting with $
	const props = {}
	for (const [k, v] of Object.entries(block)) {
		if (k.startsWith('$')) {
			props[k.slice(1)] = v
		}
	}

	// Return React element
	return React.createElement(Component, { key, ...props }, children)
}