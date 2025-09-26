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

import React, { useEffect, useState, StrictMode, useCallback } from 'react'
import DB from "@nan0web/db-browser"
import { UIProvider, useUI } from './context/UIContext.jsx'
import UIContextValue from "./context/UIContextValue.jsx"
import components from './components/index.jsx'
import renderers from './renderers/index.jsx'
import Document from './models/Document.js'
import Element from './Element.jsx'
import { LogConsole } from '@nan0web/log'
import { createT } from "@nan0web/i18n"

/**
 * Main UIReact component for rendering structured documents
 *
 * @param {Object} props
 * @param {DB} props.db - Database instance for content
 * @param {string} [props.uri=""] - Path to document
 * @param {Partial<Document>} [props.content={}] - Document in case of server side rendering
 * @param {Partial<UIContextValue>} [props.context] - Additional context (apps, lang, etc)
 * @param {Console | LogConsole} [props.console] - Console for output
 */
export default function UIReact({ db, uri = '', content = {}, context = {}, console = window.console || new LogConsole() }) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(/** @type {Error | null} */(null))
	const [vocab, setVocab] = useState({})
	const [document, setDocument] = useState(new Document())
	const t = useCallback(createT(vocab), [vocab])

	useEffect(() => {
		const loadDocument = async () => {
			try {
				setLoading(true)
				if (typeof window !== 'undefined') {
					// @ts-ignore
					window.nan0 ??= {}
				}
				let doc
				const href = uri || "/index.html"
				if (href) {
					const url = href.replace(/\.html$/, ".json")
					console.debug("UIReact: Loading document from", url)
					const data = await db.fetch(url)
					if (typeof window !== 'undefined') {
						// @ts-ignore
						window.nan0.data = data
					}
					console.debug("UIReact: Loaded data", data)
					doc = Document.from(data)
				} else {
					doc = Document.from(content)
				}
				if (doc.t.size) {
					setVocab(doc.t)
				}
				if (typeof window !== 'undefined') {
					// @ts-ignore
					window.nan0.doc = doc
				}
				setDocument(doc)
				setError(null)
				console.debug("UIReact: Document loaded successfully", doc)
			} catch (/** @type {any} */ err) {
				console.error('UIReact: Failed to load document:', err)
				console.debug(err.stack)
				setError(/** @type {Error} */(err))
			} finally {
				setLoading(false)
			}
		}

		loadDocument()
	}, [uri])

	// Create context with all necessary tools
	const mergedContext = UIContextValue.from({
		components,
		renderers,
		console,
		apps: context.apps ?? new Map(),
		lang: document.$lang ?? 'en',
		db,
		t,
		...context,
	})

	console.debug("UIReact: Rendering with context", mergedContext)

	// Display error state if needed
	if (error) {
		console.debug("UIReact: Rendering error state", error)
		return (
			<div className="ui-error" role="alert">
				Failed to load document: {error.message || String(error)}
			</div>
		)
	}

	// Loading state
	if (loading) {
		console.debug("UIReact: Rendering loading state")
		return <div className="ui-loading">Loading...</div>
	}

	console.debug("UIReact: Rendering document content", document.$content)

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
