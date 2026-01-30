import AppCore from '@nan0web/core'
import { Element as CoreElement, Theme } from '@nan0web/ui-core'
import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import UIContextValue from './context/UIContextValue.jsx'

// List of void elements
const voidElements = new Set([
	'area',
	'base',
	'br',
	'col',
	'embed',
	'hr',
	'img',
	'input',
	'keygen',
	'link',
	'menuitem',
	'meta',
	'param',
	'source',
	'track',
	'wbr',
])

// Elements that have only <li> children, so in document we can omit li.
const listElements = new Set(['ul', 'ol'])

const componentCache = new Map()
const lazyAppLoaders = new Map() // Cache for lazy app loaders to prevent re-loading

/**
 *
 * @param {Object} param0
 * @param {string} [param0.variant="info"]
 * @param {string | Array} [param0.children=[]]
 * @returns
 */
const Alert = ({ variant = 'info', children = [] }) => (
	<div className={['alert', 'alert-' + variant].join(' ')}>{children}</div>
)

/**
 * Helper to resolve async imports safely.
 * @param {Function} loadable
 */
async function resolveAsyncImport(loadable) {
	try {
		const module = await loadable()
		if (module.default && typeof module.default === 'function') {
			return { default: module.default }
		}
		if (typeof module === 'function') {
			return { default: module }
		}
		if (module) {
			return { default: () => React.createElement(module) }
		}
		throw new Error('Module does not contain a valid component')
	} catch (/** @type {any} */ e) {
		return {
			default: () => (
				<Alert variant="danger">Error loading component: {e.message || String(e)}</Alert>
			),
		}
	}
}

/**
 * Resolve a Loadable (sync import, async import or component) to a React component.
 * @param {Function} loadable
 * @returns {React.ComponentType}
 */
function resolveComponent(loadable) {
	if (componentCache.has(loadable)) {
		return componentCache.get(loadable)
	}
	let resolved = loadable
	if (typeof loadable === 'function' && loadable.toString().includes('import(')) {
		resolved = lazy(() => resolveAsyncImport(loadable))
	} else if (typeof loadable === 'function') {
		resolved = loadable
	}
	// Wrapper for data-test → data-testid
	if (
		typeof resolved === 'function' &&
		!(resolved.prototype && resolved.prototype.isReactComponent)
	) {
		const original = resolved
		const Wrapper = (props) => {
			const child = original(props)
			if (React.isValidElement(child) && child.props?.['data-test']) {
				return React.cloneElement(child, { 'data-testid': child.props['data-test'] })
			}
			return child
		}
		/** @type {any} */ Wrapper.displayName = `Wrapped(${/** @type {any} */ (original).displayName ?? original.name ?? 'Component'})`
		resolved = /** @type {any} */ (Wrapper)
	}
	componentCache.set(loadable, resolved)
	return /** @type {any} */ (resolved)
}

/**
 * Parse string to function more robustly, handling common patterns.
 * @param {string} str - Function string like '() => console.log("hi")'
 * @returns {Function|null}
 */
function parseFunctionString(str) {
	if (typeof str !== 'string') return null
	// Trim whitespace
	str = str.trim()
	// Match arrow functions: () => ..., (arg) => ..., arg => ...
	const arrowMatch = str.match(/^\s*\(([^)]*)\)\s*=>\s*(.+)$/)
	if (arrowMatch) {
		const [, params, body] = arrowMatch
		try {
			// Wrap in IIFE to return the function
			const fnBody = `return (${params || ''}) => ${body}`
			const fn = new Function(fnBody)()
			if (typeof fn === 'function') return fn
		} catch (e) {
			console.warn('Failed to parse arrow function:', str, e)
		}
	}
	// Match function expressions: function() { ... }
	const funcMatch = str.match(/^\s*function\s*\(([^)]*)\)\s*\{(.+)\}$/)
	if (funcMatch) {
		const [, params, body] = funcMatch
		try {
			const fn = new Function(params || '', body)
			if (typeof fn === 'function') return fn
		} catch (e) {
			console.warn('Failed to parse function expression:', str, e)
		}
	}
	// Fallback: simple eval for basic cases (use cautiously)
	try {
		const fn = eval(`(${str})`)
		if (typeof fn === 'function') return fn
	} catch (e) {
		console.warn('Failed to eval function string:', str, e)
	}
	return null
}

export default class ReactElement extends CoreElement {
	/**
	 * @param {any} input Input data
	 * @param {string|number} key Key prop.
	 * @param {UIContextValue} context
	 * @returns {JSX.Element | null}
	 */
	static render(input, key, context) {
		if (!input) {
			return <Alert variant="danger">Provide UI input to render</Alert>
		}
		const {
			renderers = new Map(),
			components = new Map(),
			apps = new Map(),
			actions = {},
			console = window.console,
		} = context
		// Extract tag and content
		let type,
			value,
			rawProps = {}
		if (input instanceof ReactElement) {
			type = input.type
			value = input.content
			rawProps = input.props
		} else {
			rawProps = ReactElement.extractProps(input)
			const tags = ReactElement.extractTags(input)
			const arr = tags[0] ?? ['div', input.$content ?? input.content ?? '']
			type = arr[0]
			value = arr[1]
		}
		if ('App' === type) {
			const name = input[type] ?? ''
			if (!name) {
				return <Alert variant="danger">App name must be provided [ App: name ]</Alert>
			}
			const importFn = apps.get(name)
			if (!importFn) {
				const keys = Array.from(apps.keys())
				return (
					<Alert variant="danger">
						<p>
							App not found <b>{name}</b>.
						</p>
						<p>Available apps ({keys.length}):</p>
						<ul>
							{keys.map((app, key) => (
								<li key={key}>{app}</li>
							))}
						</ul>
					</Alert>
				)
			}

			const cacheKey = `${name}|hasRenderer:true`

			if (!lazyAppLoaders.has(cacheKey)) {
				lazyAppLoaders.set(
					cacheKey,
					lazy(async () => {
						try {
							let module
							// Check if it's a class (e.g. AppCore subclass) or a loader function
							// Classes start with 'class ' in their string representation in modern JS
							const isLoader =
								typeof importFn === 'function' &&
								!importFn.prototype?.run &&
								!importFn.toString().startsWith('class ')

							if (isLoader) {
								module = await importFn()
							} else {
								module = { default: importFn }
							}

							let AppComponent = null

							// Prioritize explicit renderer or default export
							if (module.default && typeof module.default === 'function') {
								AppComponent = module.default
							} else if (module.Renderer && typeof module.Renderer === 'function') {
								AppComponent = module.Renderer
							} else if (typeof module === 'function') {
								AppComponent = module
							} else if (module.defaultRenderer && typeof module.defaultRenderer === 'function') {
								AppComponent = module.defaultRenderer
							}

							let returnDefault = null
							if (
								AppComponent &&
								typeof AppComponent === 'function' &&
								AppComponent.prototype.run
							) {
								// Treat as AppCore subclass => create AppRenderer
								const uri = window.location.pathname
								const props = {
									db: context.db.extract('apps/' + name),
									theme: context.theme || Theme,
									setTheme: context.setTheme || (() => { }),
									navigate:
										context.actions.navigate ||
										((path) => {
											window.history.pushState({}, '', path)
											window.dispatchEvent(new PopStateEvent('popstate'))
										}),
									locale: context.lang || 'en',
									uri,
									element: input,
									context,
									...rawProps,
								}

								/** @type {AppCore} */
								const appInstance = AppComponent.from
									? AppComponent.from(props)
									: new AppComponent(props)

								// Create AppRenderer to handle state management and async run()
								const AppRenderer = (rendererProps) => {
									const [appState, setAppState] = useState(/** @type {any} */(null))
									const [loading, setLoading] = useState(true)
									const [error, setError] = useState(/** @type {any} */(''))

									useEffect(() => {
										const loadApp = async () => {
											try {
												const result = await appInstance.run()
												setAppState(result)
											} catch (/** @type {any} */ err) {
												console.error(`App ${name} run error:`, err)
												setError(err)
											} finally {
												setLoading(false)
											}
										}
										loadApp()
									}, [])

									const refresh = useCallback(async () => {
										setLoading(true)
										try {
											const newResult = await appInstance.run()
											setAppState(newResult)
										} catch (/** @type {any} */ err) {
											console.error('Error refreshing app:', err)
											setError(err)
										} finally {
											setLoading(false)
										}
									}, [])

									if (loading) {
										return (
											<span
												style={{ fontStyle: 'italic', opacity: 0.6 }}
												data-testid={`loading-${name}`}
											>
												Loading app: {name}...
											</span>
										)
									}

									if (error || !appState) {
										return (
											<Alert variant="danger">
												Failed to load/run app {name}: {error?.message || 'Unknown error'}
											</Alert>
										)
									}

									/**
									 * @type {{ actions: object, requiresInput?: boolean, compute?: function, Renderer?: any, content?: any, $content?: any, data?: object }}
									 */
									const appData = {
										...appState,
										actions: {
											...appInstance.actions,
											refresh,
										},
									}

									if (
										appData.requiresInput &&
										typeof appData.compute === 'function' &&
										renderers.has('interactive')
									) {
										const InteractiveRenderer = renderers.get('interactive')
										return (
											<InteractiveRenderer
												element={appData}
												context={rendererProps.context}
												key={rendererProps.key}
											/>
										)
									} else if (
										appData.Renderer &&
										(typeof appData.Renderer === 'function' || typeof appData.Renderer === 'object')
									) {
										const RendererComp = /** @type {any} */ (appData.Renderer)
										return <RendererComp result={appData} context={rendererProps.context} />
									} else {
										const content = appData.$content || appData.content
										const contentBlocks = Array.isArray(content) ? content : [appData]
										return contentBlocks.map((block, index) =>
											ReactElement.render(block, `${rendererProps.key}-${index}`, {
												...rendererProps.context,
												data: appData.data || {},
												actions: appData.actions,
												t: appInstance.t,
											}),
										)
									}
								}

								AppRenderer.displayName = `AppRenderer(${name})`

								returnDefault = { default: AppRenderer }
							} else {
								// Assume it's a pure React component
								returnDefault = { default: AppComponent }
							}

							if (!returnDefault) {
								throw new Error(`App ${name} does not export a valid component or AppCore class`)
							}

							return returnDefault
						} catch (/** @type {any} */ err) {
							console.error(`Failed to load/run app ${name}:`, err)
							return {
								default: () => (
									<Alert variant="danger">
										Failed to load/run app {name}: {err.message || String(err)}
									</Alert>
								),
							}
						}
					}),
				)
			}

			const AppLoader = lazyAppLoaders.get(cacheKey)
			const db = context.db.extract('apps/' + name)
			return (
				<Suspense
					key={`${name}-${key}`}
					fallback={
						<span style={{ fontStyle: 'italic', opacity: 0.6 }} data-testid={`loading-${name}`}>
							Loading app: {name}...
						</span>
					}
				>
					<AppLoader db={db} context={context} key={key} />
				</Suspense>
			)
		}
		if (renderers.has(type)) {
			const Renderer = resolveComponent(renderers.get(type))
			const RendererComp = /** @type {any} */ (Renderer)
			return <RendererComp element={input} context={context} key={key} {...rawProps} />
		}
		// Determine if it's a void element
		const isVoidElement = voidElements.has(type.toLowerCase())
		// Resolve component – may be a Loadable
		let Component = null
		if (components.has(type)) {
			const loadable = components.get(type)
			Component = resolveComponent(loadable)
		} else {
			Component = type
		}
		// Extract props (fields starting with $)
		const props = {}
		for (const [propName, value] of Object.entries(rawProps)) {
			if (propName.startsWith('on')) {
				if (typeof value === 'string' && actions[value]) {
					props[propName] = actions[value]
					continue
				}
				if (typeof value === 'function') {
					props[propName] = value
					continue
				}
				const parsedFn = parseFunctionString(value)
				if (parsedFn) {
					props[propName] = parsedFn
					console.debug(`Parsed on${propName} function from string:`, value)
					continue
				}
				console.warn(`on${propName} is a string but could not be parsed to function:`, value)
			}
			if (propName === 'data-test') {
				props['data-testid'] = value
			} else {
				props[propName] = value
			}
		}
		const propsWithKey = { key, ...props }
		// Handle children only for non-void elements
		let children = null
		if (!isVoidElement) {
			if (Array.isArray(value)) {
				if (listElements.has(type.toLowerCase())) {
					children = value.map((item, i) => {
						if (typeof item === 'object' && item !== null) {
							const tagEntries = ReactElement.extractTags(item)
							if (tagEntries.length && tagEntries[0][0].toLowerCase() === 'li') {
								return ReactElement.render(item, `${key}-${i}`, context)
							}
						}
						const li = { li: Array.isArray(item) ? item : [item] }
						return ReactElement.render(li, `${key}-${i}`, context)
					})
				} else {
					children = value.map((item, i) =>
						typeof item === 'object' && item !== null
							? ReactElement.render(item, `${key}-${i}`, context)
							: item,
					)
				}
			} else if (typeof value === 'string' || typeof value === 'number') {
				if (listElements.has(type.toLowerCase())) {
					const li = { li: value }
					children = [ReactElement.render(li, `${key}-0`, context)]
				} else {
					children = [value]
				}
			}
		}
		if (!Component) {
			console.error('Component not found:', type)
			return <Alert variant="warning">Unknown element: {type}</Alert>
		}
		if (isVoidElement) {
			return React.createElement(Component, propsWithKey, null)
		}
		return React.createElement(Component, propsWithKey, children)
	}

	/**
	 * @param {any} input
	 * @returns {ReactElement}
	 */
	static from(input) {
		/** @type {any} */
		const element = input instanceof ReactElement ? input : new ReactElement(input)
		return element
	}
}
