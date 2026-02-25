import React from 'react'
import { createRoot } from 'react-dom/client'
import { UIProvider, components, renderers } from '../src/index.jsx'
import Playground from './Playground.jsx'
import DB from '@nan0web/db-browser'
import 'bootstrap/scss/bootstrap.scss'

const db = new DB({ host: window.location.origin, console })
const apps = new Map()

const container = document.getElementById('root') || document.getElementById('app')
const root = createRoot(container)

root.render(
	<UIProvider value={{ components, renderers, apps }}>
		<Playground db={db} />
	</UIProvider>,
)
