import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UIReact } from './index.jsx'
import { NoConsole } from '@nan0web/log'

console = new NoConsole()

describe('UIReact', () => {
	it('renders loading state initially', () => {
		// Mock DB that simulates loading
		const mockDb = {
			fetch: () => new Promise(() => {}),
		}

		const { container } = render(<UIReact db={mockDb} uri="test.json" console={console} />)
		screen.debug()
		// Check if the loading element exists in the container
		expect(container.querySelector('.ui-loading')).toBeTruthy()
	})

	it('renders error when document fails to load', async () => {
		const mockDb = {
			fetch: () => Promise.reject(new Error('Test error')),
		}

		const { findByText } = render(<UIReact db={mockDb} uri="error.json" console={console} />)
		expect(await findByText(/Failed to load document/)).toBeInTheDocument()
	})

	it('renders document content after loading', async () => {
		const mockDocumentData = {
			$content: [{ Typography: 'Test content' }],
			$lang: 'en'
		}

		const mockDb = {
			fetch: () => Promise.resolve(mockDocumentData),
		}

		const { findByText } = render(<UIReact db={mockDb} uri="test.json" console={console} />)
		expect(await findByText('Test content')).toBeInTheDocument()
	})
})
