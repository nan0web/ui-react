import React from 'react'
import { processI18n } from "@nan0web/ui-core"
import Element from '../Element.js'

export function renderBlock(block, key, context = {}) {
	const element = Element.from(block)
	const { type, content, props } = element
	const { data = {}, actions = {}, t, components, renderers } = context

	// Custom renderer
	const Renderer = renderers.get?.(type)
	if (Renderer) {
		return Renderer({ element, key, context })
	}

	// Standard component
	const Component = components.get?.(type)
	if (Component) {
		let children = processI18n(content, t, data)
		if (Array.isArray(children)) {
			children = children.map((child, i) =>
				renderBlock(child, `${key}-${i}`, context)
			)
		}
		return <Component key={key} {...props}>{children}</Component>
	}

	// HTML tag fallback
	let children = processI18n(content, t, data)
	if (Array.isArray(children)) {
		children = children.map((child, i) =>
			renderBlock(child, `${key}-${i}`, context)
		)
	}
	return React.createElement(type, { key, ...props }, children)
}
