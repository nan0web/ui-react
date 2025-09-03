// src/components/molecules/Card.js
import { tokens } from "../../tokens.js"

export default class Card {
	/** @type {string} */
	static borderRadius = tokens.radius.lg
	/** @type {string} */
	static boxShadow = tokens.shadow.md
	/** @type {string} */
	static padding = tokens.space.lg
	/** @type {string} */
	static backgroundColor = tokens.color.background
	/** @type {string} */
	static borderColor = tokens.border.color.muted
}