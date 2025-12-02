import React from "react"
import ReactDOM from "react-dom/client"
import { LogConsole } from "@nan0web/log"
import CustomExample from "./CustomExample.jsx"

/**
 * Entry point for the playground.
 * Renders the custom example that demonstrates registered apps,
 * components and renderers. Тепер підтримує interactive apps з формами.
 */

const console = new LogConsole({ prefix: "Playground:" })
ReactDOM.createRoot(document.getElementById("app")).render(
	<React.StrictMode>
		<CustomExample />
	</React.StrictMode>
)
