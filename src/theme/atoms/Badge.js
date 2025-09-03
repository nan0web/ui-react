// src/components/atoms/Badge.js
import { tokens } from "../../tokens.js"

export default class Badge {
	/** @type {string} */
	static borderRadius = tokens.radius.full
	/** @type {string} */
	static fontSize = tokens.font.size.sm
	/** @type {string} */
	static paddingX = tokens.space.sm
	/** @type {string} */
	static paddingY = tokens.space.xs
	/** @type {string} */
	static fontWeight = tokens.font.weight.bold
	/** @type {string} */
	static backgroundColor = tokens.color.primary
	/** @type {string} */
	static color = tokens.color.text
}