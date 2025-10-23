/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import PlaygroundExample from '../CustomExample.jsx'
import { UIProvider } from '../src/context/UIContext.jsx'
import UIContextValue from '../src/context/UIContextValue.jsx'

describe('Custom Renderer Integration', () => {
	it('should integrate custom HelloWorld component and renderer', async () => {
		// Мокуємо DB
		const mockDB = {
			fetch: vi.fn((path) => {
				if (path === '/playground/index.json') {
					return Promise.resolve({
						$content: [
							{ hello: true, $data: { name: 'Alice' } }
						]
					})
				}
				return Promise.resolve(null)
			})
		}

		// Створюємо контекст
		const customContext = new UIContextValue({
			db: mockDB,
			theme: {
				atoms: {
					Button: {
						backgroundColor: '#0d6efd'
					}
				}
			}
		})

		render(
			<UIProvider value={customContext}>
				<PlaygroundExample />
			</UIProvider>
		)

		// Перевіряємо, чи відтворюється компонент через кастомний рендерер
		const helloElement = await screen.findByText('👋 Hello, Alice!')
		expect(helloElement).toBeInTheDocument()
		expect(helloElement).toHaveStyle({ backgroundColor: '#0d6efd' })
	})

	it('should properly integrate custom renderers with UIContext', async () => {
		const mockDB = {
			fetch: vi.fn((path) => {
				if (path === '/playground/index.json') {
					return Promise.resolve({
						$content: [
							{ hello: true, $data: { name: 'Custom Renderer Test' } }
						]
					})
				}
				return Promise.resolve(null)
			})
		}

		const customContext = new UIContextValue({
			db: mockDB,
			theme: {
				atoms: {
					Button: {
						backgroundColor: '#ff6b6b'
					}
				}
			}
		})

		render(
			<UIProvider value={customContext}>
				<PlaygroundExample />
			</UIProvider>
		)

		const helloElement = await screen.findByText('👋 Hello, Custom Renderer Test!')
		expect(helloElement).toBeInTheDocument()
		expect(helloElement).toHaveStyle({ backgroundColor: '#ff6b6b' })
	})
})
