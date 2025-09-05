import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { UIReact } from './main.jsx'

describe('UIReact', () => {
	it('renders loading state initially', () => {
		// Mock DB that simulates loading
		const mockDb = {
			fetch: () => new Promise(() => {}),
		}

		const { getByText } = render(<UIReact db={mockDb} />)
		expect(getByText('Loading...')).toBeInTheDocument()
	})

	it('renders error when document fails to load', async () => {
		const mockDb = {
			fetch: () => Promise.reject(new Error('Test error')),
		}

		const { findByText } = render(<UIReact db={mockDb} documentPath="error.json" />)
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

		const { findByText } = render(<UIReact db={mockDb} documentPath="test.json" />)
		expect(await findByText('Test content')).toBeInTheDocument()
	})
})
