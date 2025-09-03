// src/components/organisms/Modal.js
import { tokens } from "../../tokens.js"

export default class Modal {
	/** @type {string} */
	static overlayBackground = "rgba(0, 0, 0, 0.5)"
	/** @type {string} */
	static borderRadius = tokens.radius.lg
	/** @type {string} */
	static boxShadow = tokens.shadow.lg
	/** @type {string} */
	static padding = tokens.space.xl
	/** @type {string} */
	static backgroundColor = tokens.color.background
}