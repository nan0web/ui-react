// src/components/atoms/Button.js
import Input from "./Input.js"
import { tokens } from "../../tokens.js"

class Button {
	/** @type {string} */
	static borderRadius = Input.borderRadius        // наслідує
	/** @type {string} */
	static borderWidth = Input.borderWidth          // наслідує
	/** @type {string} */
	static borderColor = tokens.color.primary
	/** @type {string} */
	static fontSize = Input.fontSize                 // наслідує
	/** @type {string} */
	static paddingX = Input.paddingX                // наслідує
	/** @type {string} */
	static paddingY = Input.paddingY                // наслідує
	/** @type {string} */
	static color = tokens.color.text
	/** @type {string} */
	static background = tokens.color.primary
	/** @type {string} */
	static hoverBackground = "color-mix(in srgb, var(--color-primary) 80%, black)"
	/** @type {string} */
	static shadow = tokens.shadow.sm
}

export default Button