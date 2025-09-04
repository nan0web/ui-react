import React, { useState, useEffect } from 'react'
import DB from '@nan0web/db-browser'
import { NightTheme, Theme } from '@nan0web/ui-core'
import UIReact from '../src/main.jsx'
import ThemeSwitcher from '../src/components/atoms/ThemeSwitcher.jsx'

/**
 * @component
 * @param {Object} props
 * @param {DB} props.db
 */
export default function DemoApp({ db }) {
	const [currentPath, setCurrentPath] = useState('/playground/index.json')
	const [isNight, setIsNight] = useState(false)

	// Convert URL pathname → JSON document path
	const getPathFromUrl = () => {
		const pathname = window.location.pathname
		if (pathname === '/' || pathname === '/index.html') return '/playground/index.json'
		return pathname.replace('.html', '.json')
	}

	// Initialise path + listen to history changes
	useEffect(() => {
		setCurrentPath(getPathFromUrl())
		const handlePopState = () => setCurrentPath(getPathFromUrl())
		window.addEventListener('popstate', handlePopState)
		return () => window.removeEventListener('popstate', handlePopState)
	}, [])

	// Navigation handler
	const handleNavigation = (path) => (e) => {
		e.preventDefault()
		const htmlPath = path.replace('.json', '.html')
		window.history.pushState({}, '', htmlPath)
		setCurrentPath(path)
	}

	// Theme toggle (light / night)
	const toggleNight = () => setIsNight((v) => !v)

	const navLinks = [
		{ path: '/playground/index.json', label: 'Home' },
		{ path: '/playground/avatars.json', label: 'Avatar' },
		{ path: '/playground/badges.json', label: 'Badge' },
		{ path: '/playground/buttons.json', label: 'Button' },
		{ path: '/playground/inputs.json', label: 'Input' },
		{ path: '/playground/checkboxes.json', label: 'Checkbox' },
		{ path: '/playground/radios.json', label: 'Radio' },
		{ path: '/playground/selects.json', label: 'Select' },
		{ path: '/playground/textareas.json', label: 'TextArea' },
		{ path: '/playground/typography.json', label: 'Typography' },
		{ path: '/playground/cards.json', label: 'Card' },
		{ path: '/playground/modals.json', label: 'Modal' },
	]

	return (
		<div className="demo-app">
			<header style={{ padding: '1rem', background: '#f5f5f5' }}>
				<h1>Demo App</h1>
				<nav>
					<ul
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							listStyle: 'none',
							gap: '1rem',
							padding: 0,
							margin: '0.5rem 0',
						}}
					>
						{navLinks.map((link) => (
							<li key={link.path}>
								<a
									href={link.path.replace('.json', '.html')}
									onClick={handleNavigation(link.path)}
									style={{
										textDecoration: currentPath === link.path ? 'underline' : 'none',
										fontWeight: currentPath === link.path ? 'bold' : 'normal',
										cursor: 'pointer',
									}}
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</nav>
				{/* Theme toggle button */}
				<ThemeSwitcher label={isNight ? 'Light Theme' : 'Night Theme'} />
			</header>
			<main>
				<UIReact
					db={db}
					documentPath={currentPath}
					context={{
						theme: isNight ? NightTheme : Theme,
						reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
					}}
				/>
			</main>
		</div>
	)
}
