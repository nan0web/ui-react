import { parseTable } from '../parsers/parseTable.js'

export function extractProps(block, keep$ = false) {
	return Object.fromEntries(
		Object.entries(block)
			.filter(([k]) => k.startsWith('$'))
			.map(([k, v]) => [keep$ ? k : k.slice(1), v])
	)
}

export function extractTags(block) {
	return Object.fromEntries(
		Object.entries(block).filter(([k]) => !k.startsWith('$'))
	)
}

export function parseBlock(block) {
	const tag = Object.keys(block).find(k => !k.startsWith('$'))
	const content = block[tag]
	const props = Object.fromEntries(
		Object.entries(block)
			.filter(([k]) => k.startsWith('$'))
			.map(([k, v]) => [k.slice(1), v])
	)

	// Спеціальні парсери
	if (tag === 'table') {
		return parseTable(block)
	}

	// Простий тег (div, h2, input...)
	if (typeof content === 'string' || Array.isArray(content)) {
		return { [tag]: content, ...props }
	}

	// Об’єкт зі вкладеннями (button, form...)
	return { [tag]: content, ...props }
}
