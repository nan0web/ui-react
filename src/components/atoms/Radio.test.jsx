/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import Radio from './Radio.jsx'
import { UIProvider } from '../../context/UIContext.jsx'
import UIContextValue from '../../context/UIContextValue.jsx'

const mockContext = new UIContextValue({})

describe('Radio', () => {
	it('renders unchecked by default', () => {
		render(
			<UIProvider value={mockContext}>
				<Radio name="test" />
			</UIProvider>
		)
		const radio = screen.getByRole('radio')
		expect(radio).not.toBeChecked()
	})

	it('renders checked when checked=true', () => {
		render(
			<UIProvider value={mockContext}>
				<Radio name="test" checked />
			</UIProvider>
		)
		const radio = screen.getByRole('radio')
		expect(radio).toBeChecked()
	})

	it('calls onChange on click', () => {
		const handleChange = vi.fn()
		render(
			<UIProvider value={mockContext}>
				<Radio name="test" onChange={handleChange} />
			</UIProvider>
		)
		const radio = screen.getByRole('radio')
		fireEvent.click(radio)
		expect(handleChange).toHaveBeenCalledTimes(1)
	})

	it('applies name and value props', () => {
		render(
			<UIProvider value={mockContext}>
				<Radio name="group" value="option1" checked />
			</UIProvider>
		)
		const radio = screen.getByRole('radio')
		expect(radio).toHaveAttribute('name', 'group')
		expect(radio).toHaveAttribute('value', 'option1')
	})

	it('uses theme styles for checked state', () => {
		const themeContext = new UIContextValue({
			theme: {
				atoms: {
					Radio: { size: '18px', checkedColor: 'blue' }
				}
			}
		})
		render(
			<UIProvider value={themeContext}>
				<Radio checked />
			</UIProvider>
		)
		const radio = screen.getByRole('radio')
		expect(radio).toHaveStyle({ 
			width: '18px', 
			height: '18px', 
			backgroundColor: 'blue',
			borderRadius: '50%'
		})
	})
})