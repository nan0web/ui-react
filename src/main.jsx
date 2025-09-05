/**
 * Unified interface component for managing:
 * - UI elements via components & renderers
 * - Applications through isolated containers
 *
 * This creates a true resonant experience where:
 * - Every app remains isolated in its reality
 * - No hidden registry layer between components and apps
 * - The separation is made explicit through type and path
 */

import React, { useEffect, useState, StrictMode } from 'react'
import DB from "@nan0web/db-browser"
import { UIProvider, useUI } from './context/UIContext.jsx'
import UIContextValue from "./context/UIContextValue.jsx"
import components from './components/index.jsx'
import renderers from './renderers/index.jsx'
import Document from './models/Document.js'
import Element from './Element.jsx'

/**
 * Main UIReact component for rendering structured documents
 *
 * @param {Object} props
 * @param {DB} props.db - Database instance for content
 * @param {string} [props.documentPath="index.json"] - Path to document
 * @param {Partial<UIContextValue>} [props.context] - Additional context (apps, lang, etc)
 */
export function UIReact({ db, documentPath = 'index.json', context = {} }) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(/** @type {Error | null} */(null))
	const [document, setDocument] = useState(new Document())

	useEffect(() => {
		const loadDocument = async () => {
			try {
				setLoading(true)
				const uri = documentPath.replace(/\.html$/, ".json")
				const data = await db.fetch(uri)
				const doc = Document.from(data)
				setDocument(doc)
				setError(null)
			} catch (/** @type {any} */ err) {
				console.error('UIReact: Failed to load document:', err)
				setError(/** @type {Error} */(err))
			} finally {
				setLoading(false)
			}
		}

		loadDocument()
	}, [db, documentPath])

	// Create context with all necessary tools
	const mergedContext = UIContextValue.from({
		components,
		renderers,
		apps: context.apps ?? new Map(),
		lang: document.$lang ?? 'en',
		db,
		...context,
	})

	// Display error state if needed
	if (error) {
		return (
			<div className="ui-error" role="alert">
				Failed to load document: {error.message || String(error)}
			</div>
		)
	}

	// Loading state
	if (loading) {
		return <div className="ui-loading">Loading...</div>
	}

	return (
		<StrictMode>
			<UIProvider value={mergedContext}>
				<div className="ui-react-root" role="main">
					{document.$content.map((block, idx) => (
						Element.render(block, idx, mergedContext)
					))}
				</div>
			</UIProvider>
		</StrictMode>
	)
}

// Export core functionality for extensions
export {
	components,
	renderers,
	Element,
	useUI,
	UIProvider,
	UIContextValue,
}