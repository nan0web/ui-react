import React from 'react'
import { createRoot } from 'react-dom/client'
import DB from '@nan0web/db-browser'
import DemoApp from './DemoApp.jsx'

async function main() {
	const db = new DB()
	await db.connect()

	const root = createRoot(document.getElementById('app')) // ✅ id="app", а не "root"
	root.render(<DemoApp db={db} documentPath="/playground/index.json" />)
}

main().catch(console.error)
