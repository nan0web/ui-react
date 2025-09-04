/**
 * @file Main UIReact component.
 */

import { useEffect, useState, StrictMode } from 'react'
import DB from "@nan0web/db-browser"
import { UIProvider, useUI } from './context/UIContext.jsx'
import components from './components/index.jsx'
import renderers from './renderers/index.jsx'
import Document from './models/Document.js'
import Element from './Element.jsx'

/**
 * @component
 * @param {Object} props
 * @param {DB} props.db
 * @param {string} [props.documentPath="index.json"]
 * @param {Object} [props.context] - Additional context (theme, reducedMotion, etc)
 */
export default function UIReact({ db, documentPath = 'index.json', context = {} }) {
	/** @type {[any[], React.Dispatch<React.SetStateAction<any[]>>]} */
	// @ts-ignore @todo fix if you able to
	const [content, setContent] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const load = async () => {
			console.log("loading...")
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

	if (loading) return <div className="ui-loading">Loading...</div>

	/** @type {import('./Element.jsx').UIContext} */
	const mergedContext = {
		components,
		renderers,
		...context,
	}

	return (
		<StrictMode>
			<UIProvider value={mergedContext}>
				<div className="ui-react-root" role="main">
					{content.map((block, i) => Element.render(block, i, mergedContext))}
				</div>
			</UIProvider>
		</StrictMode>
	)
}

// Re-export for plugins
export { components, renderers, Element, useUI }
