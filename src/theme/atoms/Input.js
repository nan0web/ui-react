// src/components/atoms/Input.js
import { tokens } from "../../tokens.js"

export default class Input {
	/** @type {string} */
	static borderRadius = tokens.radius.md
	/** @type {string} */
	static borderWidth = tokens.border.width.md
	/** @type {string} */
	static borderColor = tokens.border.color.default
	/** @type {string} */
	static fontSize = tokens.font.size.base
	/** @type {string} */
	static paddingX = tokens.space.lg
	/** @type {string} */
	static paddingY = tokens.space.md
	/** @type {string} */
	static fontFamily = tokens.font.family
}