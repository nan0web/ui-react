/**
 * UIReact – top‑level component that loads a document, resolves translations,
 * builds the UI context and renders the document content using the nan0 element system.
 */

import React, { useEffect, useState, StrictMode, useCallback } from 'react'
import DB from '@nan0web/db-browser'
import { UIContext } from './context/UIContext.jsx'
import UIContextValue from './context/UIContextValue.jsx'
import components from './components/index.jsx'
import renderers from './renderers/index.jsx'
import Document from './models/Document.js'
import Element from './Element.jsx'
import { LogConsole } from '@nan0web/log'
import { createT } from '@nan0web/i18n'

/**
 * @param {Object} props
 * @param {DB} props.db                             database instance
 * @param {string} [props.uri='']                   document URI (e.g. “uk/index”)
 * @param {Partial<UIContextValue>} [props.context] extra context (apps, actions,…)
 * @param {Console|LogConsole} [props.console]      logger (default: window.console)
 */
export default function UIReact({
	db,
	uri = '',
	context = {},
	console = typeof window !== 'undefined' ? window.console : new LogConsole(),
}) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(/** @type {Error|null} */ (null))
	const [document, setDocument] = useState(new Document())
	const [vocab, setVocab] = useState(new Map())

	// Translation helper bound to the current vocabulary map.
	const t = useCallback(createT(vocab), [vocab])

	// -------------------------------------------------------------------------
	// Load document + optional language map
	// -------------------------------------------------------------------------
	useEffect(() => {
		const load = async () => {
			try {
				setLoading(true)

				// Ensure the fetched path ends with `.json`
				const norm = db.resolveSync(db.dirname(uri), db.basename(uri, true))
				const url = norm || "index"

				console.debug('UIReact: fetching document', url)

				const data = await db.fetch(url)
				const doc = Document.from(data)
				setDocument(doc)

				// Load translation map if a language is declared.
				const lang = doc.$lang ?? 'en'
				try {
					const langData = await db.fetch(`${lang}/_/t`)
					if (langData && typeof langData === 'object') {
						setVocab(new Map(Object.entries(langData)))
					}
				} catch (_) {
					/* ignore missing translation file */
				}

				setError(null)
			} catch (/** @type {any} */ err) {
				console.error('UIReact: document load error', err)
				setError(err)
			} finally {
				setLoading(false)
			}
		}
		load()
	}, [uri, db, console])

	// -------------------------------------------------------------------------
	// Build merged UI context (components, renderers, apps, actions, …)
	// -------------------------------------------------------------------------
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

	// -------------------------------------------------------------------------
	// Render states
	// -------------------------------------------------------------------------
	if (error) {
		return (
			<div className="ui-error" role="alert">
				{t("Failed to load document")}: {error.message || String(error)}
			</div>
		)
	}

	if (loading) {
		return <div className="ui-loading">Loading…</div>
	}

	return (
		<StrictMode>
			<UIContext.Provider value={mergedContext}>
				<div className="ui-react-root" role="main">
					{document.$content.map((block, i) => Element.render(block, i, mergedContext))}
				</div>
			</UIContext.Provider>
		</StrictMode>
	)
}
