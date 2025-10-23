import React from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { NoConsole } from '@nan0web/log'
import UIReact from './UIReact.jsx'

// Mock console globally for tests
const mockConsole = new NoConsole()
console = mockConsole

// Enhanced Mock DB implementation for testing
class MockDB {
  constructor(predefined = new Map()) {
    this.predefined = predefined
    this.connected = false
    // Bind methods to instance to ensure they are copied in spread
    this.dirname = this.dirname.bind(this)
    this.basename = this.basename.bind(this)
    this.resolveSync = this.resolveSync.bind(this)
    this.fetch = this.fetch.bind(this)
    this.connect = this.connect.bind(this)
  }

  async connect() {
    this.connected = true
  }

  dirname(uri) {
    if (uri === '.' || uri === '') return '.'
    const parts = uri.split('/').filter(Boolean)
    if (parts.length === 0) return '.'
    parts.pop()
    return parts.length ? '/' + parts.join('/') : '.'
  }

  basename(uri, noExt = false) {
    const base = uri.split('/').pop() || ''
    if (noExt && base.includes('.')) {
      return base.split('.').slice(0, -1).join('.')
    }
    return base
  }

  resolveSync(...args) {
    const path = args.join('/')
    return path.startsWith('.') || path.startsWith('/') ? path : './' + path
  }

  keyForUri(uri) {
    const normalized = uri.replace(/^\.\//, '').replace(/\/+$/, '')
    return normalized.endsWith('.json') ? normalized : normalized + '.json'
  }

  async fetch(uri) {
    if (!this.connected) throw new Error('DB not connected')
    const key = this.keyForUri(uri)
    if (!this.predefined.has(key)) throw new Error(`Not found: ${uri}`)
    return this.predefined.get(key)
  }
}

describe('UIReact', () => {
  let mockDb

  beforeEach(async () => {
    mockConsole.clear()
    mockDb = new MockDB()
    await mockDb.connect()
  })

  it('renders loading state initially', async () => {
    // Make fetch hang to keep loading state
    const hangingDb = {
      ...mockDb,
      fetch: () => new Promise(() => {})
    }

    render(<UIReact db={hangingDb} uri="test.json" console={mockConsole} />)

    // Loading should render immediately since useState(true) and useEffect is async
    expect(screen.getByText('Loading…')).toBeInTheDocument()
  })

  it('renders error when document fails to load', async () => {
    const errorDb = {
      ...mockDb,
      fetch: () => Promise.reject(new Error('Test error'))
    }

    render(<UIReact db={errorDb} uri="error.json" console={mockConsole} />)

    await waitFor(() => {
      expect(screen.getByText(/Failed to load document/)).toBeInTheDocument()
      expect(screen.getByText(/Test error/)).toBeInTheDocument()
    })
  })

  it('renders document content after loading', async () => {
    const mockDocumentData = {
      $content: [{ Typography: ['Test content'] }],
      $lang: 'en'
    }

    const testDb = new MockDB(new Map([['test.json', mockDocumentData]]))
    await testDb.connect()

    render(<UIReact db={testDb} uri="test.json" console={mockConsole} />)

    await waitFor(() => {
      expect(screen.getByText('Test content')).toBeInTheDocument()
    }, { timeout: 1000 })
  })
})