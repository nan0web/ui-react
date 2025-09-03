// src/components/atoms/Radio.js
import { tokens } from "../../tokens.js"

export default class Radio {
	/** @type {string} */
	static size = "1.25rem"
	/** @type {string} */
	static borderColor = tokens.border.color.default
	/** @type {string} */
	static borderRadius = tokens.radius.full
	/** @type {string} */
	static borderWidth = tokens.border.width.sm
	/** @type {string} */
	static backgroundColor = tokens.color.background
	/** @type {string} */
	static checkedColor = tokens.color.primary
}