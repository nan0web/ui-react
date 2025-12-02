# @nan0web/ui-react

## Minimal, functional React component library for **nan0web** projects  

- **Zero‑dependency** (except React & PropTypes)  
- Pure JavaScript with **JSDoc** typings – no TypeScript source needed  
- Built‑in **Theme**, **UIContext**, **AppCore** integration, and **renderers** for dynamic UI blocks  

> The library is not a UI “framework”. It provides **intent‑driven** building blocks that let you compose *applications* (apps) and *renderers* in a declarative, data‑first way.

---

## Installation

```bash
pnpm add @nan0web/ui-react
# peer dependencies
pnpm add react react-dom @nan0web/db-browser @nan0web/ui-core
```

---

## Quick start – render a static document

```tsx
import React from "react"
import ReactDOM from "react-dom/client"
import { UIReact } from "@nan0web/ui-react"
import DB from "@nan0web/db-browser"

const db = new DB({ host: window.location.origin })

ReactDOM.createRoot(document.getElementById("app")).render(
	<React.StrictMode>
		<UIReact db={db} uri="/playground/index.json" />
	</React.StrictMode>
)
```

`/playground/index.json` can contain a **document model**:

```json
{
  "$content": [
    {
      "Typography": ["Hello, world!"],
      "$variant": "h1"
    }
  ]
}
```

The document is loaded, translated (if a `$lang` file exists) and rendered through the **Element** system.

---

## Register custom components & renderers

You can extend the UI by providing your own components or renderers via `UIRoot` (or directly to `UIReact`).

```tsx
import React from "react"
import { UIRoot } from "@nan0web/ui-react"
import DB from "@nan0web/db-browser"
import MyButton from "./MyButton.jsx"
import renderMyBlock from "./renderMyBlock.jsx"

const db = new DB({ host: window.location.origin })
const customComponents = new Map([["MyButton", MyButton]])
const customRenderers   = new Map([["myBlock", renderMyBlock]])

ReactDOM.createRoot(document.getElementById("app")).render(
	<React.StrictMode>
		<UIRoot
			db={db}
			components={customComponents}
			renderers={customRenderers}
		/>
	</React.StrictMode>
)
```

`renderMyBlock.jsx` example:

```tsx
import React from "react"
import MyButton from "./MyButton.jsx"

export default function renderMyBlock({ element, context }) {
	return <MyButton {...element.props}>Custom block</MyButton>
}
```

Now a document can reference the custom block:

```json
{
  "$content": [
    { "myBlock": [], "$className": "mt-4" }
  ]
}
```

---

## Building an **App** (interactive piece)

An *App* is a class extending `AppCore`. It registers itself in the UI context and can expose a `run()` method that returns UI data.

### Example: `SimpleApp`

```js
// src/apps/demo/SimpleApp.js
import { AppCore } from "@nan0web/core"

/**
 * SimpleApp – static content, no renderer.
 */
export default class SimpleApp extends AppCore {
	constructor(input) {
		super(input)
		const { title = "Demo", uri = "index.html" } = input
		this.title = title
		this.uri   = uri
	}

	async run() {
		return {
			type: "standard",
			content: [
				{
					Typography: [`Simple App: ${this.title}`],
					$variant: "h2"
				},
				{
					Button: ["Click me"],
					$variant: "secondary",
					$onClick: "action:doSomething"
				}
			]
		}
	}
}
```

### Example: `CustomRendererApp`

```js
// src/apps/demo/CustomRendererApp.jsx
import React, { useState } from "react"
import { AppCore } from "@nan0web/core"
import Button from "../components/atoms/Button.jsx"
import Typography from "../components/atoms/Typography.jsx"

export default class CustomRendererApp extends AppCore {
	constructor(input) {
		super(input)
		const { title = "Demo", uri = "index.html" } = input
		this.title = title
		this.uri   = uri
	}

	async run() {
		const base = {
			$content: [
				{ h3: [`Custom Renderer: ${this.title}`] },
				{ p: ["Press the button to increment a counter"] }
			]
		}
		const Renderer = ({ result, context }) => {
			const [cnt, setCnt] = useState(0)
			const { theme } = context || {}
			return (
				<div style={{ padding: "1rem", border: "1px solid #ccc" }}>
					<Typography variant="h4">{result.$title || "Interactive"} – {cnt}</Typography>
					<Button onClick={() => setCnt(cnt + 1)}>+1</Button>
				</div>
			)
		}
		Renderer.displayName = "CustomRendererAppRenderer"
		return { ...base, Renderer }
	}
}
```

### Register apps in a **DemoApp** (registry)

```js
// src/apps/demo/App.js
import { AppCore } from "@nan0web/core"

export default class DemoApp extends AppCore {
	constructor({ db, theme, setTheme, navigate, uri = "index.html", locale = "en" }) {
		super({ db, locale })
		this.theme     = theme
		this.setTheme  = setTheme
		this.navigate  = navigate
		this.uri       = uri

		this.apps = new Map([
			["SimpleApp", async () => {
				const mod = await import("./SimpleApp.js")
				return mod.default.from({ title: "Simple", uri: this.uri, db })
			}],
			["CustomRendererApp", async () => {
				const mod = await import("./CustomRendererApp.jsx")
				return mod.default.from({ title: "Custom", uri: this.uri, db })
			}]
		])
	}

	async run() {
		return {
			content: [
				{
					div: [
						{ App: "SimpleApp", $uri: this.uri },
						{ App: "CustomRendererApp", $title: "Interactive Demo", $uri: this.uri }
					],
					$style: "display:flex;flex-direction:column;gap:2rem"
				}
			]
		}
	}
}
```

Now the demo app can be rendered anywhere:

```tsx
import DemoApp from "./src/apps/demo/App.js"

<UIReact
	db={db}
	documentPath="/playground/index.json"
	context={{
		theme,
		setTheme,
		reducedMotion: false
	}}
/>
```

---

## Theme switching

`ThemeSwitcher` component toggles between **Theme** (light) and **NightTheme** (dark).

```tsx
import ThemeSwitcher from "@nan0web/ui-react/src/components/atoms/ThemeSwitcher.jsx"

<ThemeSwitcher label="Toggle theme" />
```

The component reads `theme` and `setTheme` from the UI context. When the button is clicked it updates the theme and persists the choice in `localStorage`.

---

## Testing

All components, renderers, and apps ship **with tests** written with `node:test` (for pure JS) or `vitest` (for React). Run the full suite with:

```bash
npm test          # runs both node:test and vitest
npm run test:jsx  # only the React tests
npm run test:js   # only the node:test files
```

Each test lives next to its source (`*.test.jsx` or `*.test.js`). The CI checks for **100 % coverage** of exported functions/classes.

---

## Building & preview (Vite)

The package ships a **Vite plugin** (`nan0webVitePlugin`) that:

1. Serves static assets from `public/`.
2. Builds a **static site** from the DB‑FS sources (`data/` → `dist/`).
3. Provides a middleware for on‑the‑fly JSON serving.

```bash
npm run dev      # start Vite dev server with hot reload
npm run build    # production build (runs the plugin automatically)
npm run preview  # preview the built site
```

The Vite config is already preset in `vite.config.js`; you can customize `input` / `output` DB instances if needed.

---

## Exported entry points

| Export | Description |
|--------|-------------|
| `components` | Map of built‑in atom, molecule, organism components |
| `renderers`  | Map of default renderers (`table`, `form`, `avatar`, …) |
| `UIReact`    | Top‑level component that loads a document and renders it |
| `UIRoot`     | SPA‑ready wrapper that handles navigation, theme, and custom registries |
| `UIProvider` / `useUI` | React context helpers |
| `UIContextValue` | Immutable value object used by the context |
| `Theme`      | Default light theme (imported from `@nan0web/ui-core`) |
| `tokens`     | Design tokens (spacing, colors, etc.) from `@nan0web/ui-core` |
| `Element`    | Core renderer that turns JSON blocks into React elements |

---

## License

ISC – see the `LICENSE` file in the repository.

---

## Contribution

All changes must be covered by **unit tests** and follow the **nan0coding** conventions (tab indentation, JSDoc, no TypeScript source files). See `src/__tests__/` for examples.

Happy building! 🎨🛠️
