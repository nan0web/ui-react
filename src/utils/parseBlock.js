import { Element } from '../index.js'

export function parseBlock(block) {
	const tagEntries = Element.extractTags(block)
	if (tagEntries.length === 0) {
		throw new Error('No tag found in block')
	}
	const [tag, content] = tagEntries[0]
	const props = Element.extractProps(block)

	// Простий тег (div, h2, input...)
	if (typeof content === 'string' || Array.isArray(content)) {
		return { [tag]: content, ...props }
	}

	// Об’єкт зі вкладеннями (button, form...)
	return { [tag]: content, ...props }
}
