// src/components/atoms/Avatar.js
import { tokens } from "../../tokens.js"

export default class Avatar {
	/** @type {string} */
	static size = "2.5rem"
	/** @type {string} */
	static borderRadius = tokens.radius.full
	/** @type {string} */
	static border = `${tokens.border.width.sm} solid ${tokens.border.color.default}`
}