/**
 * @file Main UIReact component.
 */

import { useEffect, useState } from 'react'
import { UIProvider, useUI } from './context/UIContext.jsx'
import { renderBlock } from './utils/renderBlock.jsx'
import components from './components/index.js'
import renderers from './renderers/index.js'
import Document from './document/Document.js'
import Element from './Element.js'

/**
 * @component
 * @param {Object} props
 * @param {import('@nan0web/db-browser')} props.db
 * @param {string} [props.documentPath="index.json"]
 * @param {Object} [props.context] - Additional context (theme, etc)
 */
export default function UIReact({ db, documentPath = 'index.json', context = {} }) {
	const [content, setContent] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const load = async () => {
			try {
				setLoading(true)
				const data = await db.fetch(documentPath)
				const doc = Document.from(data)
				setContent(doc.$content)
			} catch (error) {
				console.error('UIReact: Failed to load document:', error)
			} finally {
				setLoading(false)
			}
		}
		load()
	}, [db, documentPath])

	if (loading) {
		return <div className="ui-loading">Loading...</div>
	}

	const mergedContext = { db, components, renderers, ...context }

	return (
		<UIProvider value={mergedContext}>
			<div className="ui-react-root" role="main">
				{content.map((block, i) =>
					renderBlock(block, i, mergedContext)
				)}
			</div>
		</UIProvider>
	)
}

// Re-export for plugins
export { components, renderers, Element, useUI }
