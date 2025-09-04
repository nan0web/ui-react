/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Button from './Button.jsx'

describe('Button', () => {
	it('renders children correctly', () => {
		render(<Button>Click me</Button>)
		expect(screen.getByText('Click me')).toBeInTheDocument()
	})

	it('applies solid primary variant with white text', () => {
		render(<Button variant="primary">Primary</Button>)
		const btn = screen.getByText('Primary')
		const style = btn.getAttribute('style')
		expect(style).toContain('background: #0d6efd')
		expect(style).toContain('color: #fff')
	})

	it('applies outline danger variant with transparent background', () => {
		render(
			<Button variant="danger" outline>
				Outline danger
			</Button>
		)
		const btn = screen.getByText('Outline danger')
		const style = btn.getAttribute('style')
		expect(style).toContain('background: transparent')
		expect(style).toContain('color: #dc3545')
	})

	it('applies link variant (no background, primary color)', () => {
		render(<Button variant="link">Link</Button>)
		const btn = screen.getByText('Link')
		const style = btn.getAttribute('style')
		expect(style).toContain('background: transparent')
		expect(style).toContain('color: #0d6efd')
	})

	it('applies small size adjustments', () => {
		render(<Button size="sm">Small</Button>)
		const btn = screen.getByText('Small')
		const style = btn.getAttribute('style')
		expect(style).toContain('font-size: 0.875rem')
		expect(style).toContain('padding: 0.25rem 0.5rem')
	})

	it('styles disabled button with reduced opacity and not‑allowed cursor', () => {
		render(<Button disabled>Disabled</Button>)
		const btn = screen.getByText('Disabled')
		const style = btn.getAttribute('style')
		expect(style).toContain('opacity: 0.65')
		expect(style).toContain('cursor: not-allowed')
	})

	it('keyboard interaction – Enter triggers active style and reverts', () => {
		render(<Button>Enter Test</Button>)
		const btn = screen.getByText('Enter Test')
		const initialStyle = btn.getAttribute('style')

		act(() => {
			btn.focus()
			fireEvent.keyDown(btn, { key: 'Enter' })
		})
		const activeStyle = btn.getAttribute('style')
		expect(activeStyle).not.toBe(initialStyle)

		act(() => {
			fireEvent.keyUp(btn, { key: 'Enter' })
		})
		const afterStyle = btn.getAttribute('style')
		expect(afterStyle).toBe(initialStyle)
	})
})