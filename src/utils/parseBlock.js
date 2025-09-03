import Element from '../Element.js'

/**
 * Parses a block into an element with type, content and props
 *
 * @param {Object} block - The block to parse
 * @returns {Object} - Parsed element with type, content and props
 */
export function parseBlock(block) {
	const tagEntries = Element.extractTags(block)
	if (tagEntries.length === 0) {
		throw new Error('No tag found in block')
	}
	const [tag, content] = tagEntries[0]
	const props = Element.extractProps(block)

	// Simple tag (div, h2, input...)
	if (typeof content === 'string' || Array.isArray(content)) {
		return { [tag]: content, ...props }
	}

	// Object with nested content (button, form...)
	return { [tag]: content, ...props }
}
