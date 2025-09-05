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
		apps: context.apps ?? [],
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
						renderBlock(block, idx, mergedContext)
					))}
				</div>
			</UIProvider>
		</StrictMode>
	)
}

/**
 * Core block rendering function
 *
 * @param {Object} block - Document block with type and content
 * @param {number} key - React key
 * @param {UIContextValue} context - Current UI context
 * @returns {JSX.Element|null}
 */
function renderBlock(block, key, context) {
	// Check for app entry - a block with App property
	if (block.App) {
		return <AppBlock key={key} appKey={block.App} block={block} context={context} />
	}

	// Regular element rendering
	return Element.render(block, key, context)
}

/**
 * Application block - renders isolated application
 * @param {object} input
 * @param {string} input.appKey
 * @param {object} input.block
 * @param {UIContextValue} input.context
 */
function AppBlock({ appKey, block, context }) {
	const [state, setState] = useState({
		db: context.db.extract(`apps/${appKey}/`),
		loading: true,
		error: /** @type {Error | null} */ (null),
		app: /** @type {any} */ (null),
	})

	// Initialize application
	useEffect(() => {
		async function initApp() {
			try {
				// Check if app is registered
				const appCreator = context.apps.get(appKey)
				if (!appCreator) {
					throw new Error(`Application "${appKey}" is not registered`)
				}

				// Connect to isolated database
				await state.db.connect()

				// Load application configuration
				const config = await state.db.fetch('main.json')
				if (!config) {
					throw new Error('main.json not found in application directory')
				}

				// Create new application instance
				const { default: App } = await appCreator()
				const app = App.from({
					db: state.db,
					locale: context.lang || 'uk',
					data: config,
					props: {
						renderFn: (blk, key, ctx) => {
							return Element.render(blk, key, { ...ctx, ...context });
						},
						...Element.extractProps(block, true),
					}
				})

				// Run initialization if available
				if (app.run && typeof app.run === 'function') {
					await app.run()
				}

				setState(prev => ({
					...prev,
					app,
					loading: false,
				}))
			} catch (/** @type {any} */ err) {
				setState(prev => ({
					...prev,
					error: /** @type {Error} */ (err),
					loading: false,
				}))
			}
		}

		initApp()
	}, [appKey])

	// Loading state
	if (state.loading) {
		return (
			<div className="app-loading" key={`loader-${appKey}`}>
				Loading "{appKey}"...
			</div>
		)
	}

	// Error state
	if (state.error) {
		return (
			<div className="app-error" key={`error-${appKey}`} role="alert">
				Error in "{appKey}": {state.error?.message || String(state.error)}
			</div>
		)
	}

	if (!state.app) {
		return (
			<div className="app-error" key={`error-${appKey}`} role="alert">
				Error in "{appKey}": Could not create an App
			</div>
		)
	}

	if (!Array.isArray(state.app.data?.$content) || !state.app.data.$content.length) {
		return (
			<div className="app-error" key={`error-${appKey}`} role="alert">
				Error in "{appKey}": Empty $content in application data
			</div>
		)
	}

	// Render application content
	return (
		<div className={`app-container app-${appKey}`} key={`app-${appKey}`}>
			{state.app.data.$content.map((blk, idx) =>
				state.app.renderFn(blk, idx, {
					data: state.app.data,
					actions: state.app.actions,
					t: state.app.t,
				})
			)}
		</div>
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
	renderBlock,
}
