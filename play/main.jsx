import React from 'react'
import { createRoot } from 'react-dom/client'
import { UIRoot } from '../src/UIRoot.jsx'

import DemoApp from '../src/apps/demo/App.js'
import SimpleApp from '../src/apps/demo/SimpleApp.js'
import CustomRendererApp from '../src/apps/demo/CustomRendererApp.js'

function App() {
	// Register DemoApp for playground
	const apps = new Map([
		['DemoApp', async () => ({ default: DemoApp })],
		['SimpleApp', async () => ({ default: SimpleApp })],
		['CustomRendererApp', async () => ({ default: CustomRendererApp })],
	])

	return <UIRoot apps={apps} />
}

const container = document.getElementById('root')
if (container) {
	const root = createRoot(container)
	root.render(<App />)
}
