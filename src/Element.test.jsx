/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import ReactElement from './Element.jsx'
import UIContextValue from './context/UIContextValue.jsx'
import { UIProvider, UIContext } from './context/UIContext.jsx'
import React, { useContext } from 'react'
import { NoConsole } from '@nan0web/log'

// Mock console
const mockConsole = new NoConsole()

// Моки компонентів для тестування
function MockTypography({ children }) {
	return <p data-testid="typography">{children}</p>
}

function MockInput({ type, value, onChange, ...props }) {
	return <input type={type} value={value} onChange={onChange} {...props} data-testid="input" />
}

function MockButton({ children, ...props }) {
	return <button {...props} data-testid="button">{children}</button>
}

// Mock renderer for interactive with proper context
function MockRenderInteractive({ element, context }) {
	const { useState, useCallback } = React
	const uiContext = useContext(UIContext)
	const { t = (k) => k, lang = 'en' } = uiContext || {}
	const [inputData, setInputData] = useState({})
	const [result, setResult] = useState(null)
	const [isComputing, setIsComputing] = useState(false)

	const { requiresInput = {}, compute, $content: baseContent = [] } = element

	const handleInputChange = useCallback((fieldName, value) => {
		setInputData(prev => ({ ...prev, [fieldName]: value }))
	}, [])

	const handleSubmit = useCallback(async (e) => {
		e.preventDefault()
		setIsComputing(true)
		try {
			const computed = await compute(inputData)
			setResult(computed)
		} catch (err) {
			console.error('Compute error:', err)
			setResult({ error: err.message })
		} finally {
			setIsComputing(false)
		}
	}, [inputData, compute])

	const renderField = (field) => {
		const { name, type = 'text', label, defaultValue = '', min, ...fieldProps } = field
		const value = inputData[name] ?? defaultValue

		return (
			<div key={`field-${name}`} style={{ marginBottom: '0.5rem' }}>
				<label htmlFor={name}>{label}</label>
				<input
					id={name}
					type={type}
					value={value}
					onChange={(e) => handleInputChange(name, e.target.value)}
					min={min}
					{...fieldProps}
					data-testid={`input-${name}`}
				/>
			</div>
		)
	}

	return (
		<div data-testid="interactive-renderer" style={{ padding: '1rem', border: '1px solid #ccc' }}>
			{/* Base content */}
			{baseContent.map((block, i) => (
				<MockTypography key={`base-${i}`}>
					{Array.isArray(block.Typography) ? block.Typography[0] : 'Base'}
				</MockTypography>
			))}

			{/* Form */}
			{requiresInput.fields && (
				<form onSubmit={handleSubmit} data-testid="interactive-form" style={{ margin: '1rem 0' }}>
					<div>Provide Input</div>
					{requiresInput.fields.map((field, i) => renderField(field))}
					<MockButton type="submit" disabled={isComputing}>
						{isComputing ? 'Computing...' : 'Compute'}
					</MockButton>
				</form>
			)}

			{/* Result */}
			{result && (
				<div data-testid="result" style={{ marginTop: '1rem', padding: '1rem', background: '#f0f8ff' }}>
					<div>{result.$title || 'Result'}</div>
					<div>{result.message || JSON.stringify(result)}</div>
					{result.updatedContent?.map((block, i) => (
						<MockTypography key={`result-${i}`}>
							{Array.isArray(block.p) ? block.p[0] : 'Result block'}
						</MockTypography>
					))}
					{result.error && <div style={{ color: 'red' }}>Error: {result.error}</div>}
				</div>
			)}
		</div>
	)
}

// Тестування окремих функцій класу ReactElement
describe('ReactElement internal functions', () => {
	it('should correctly extract props', () => {
		const input = { div: ['Hello'], $className: 'text-lg', $onClick: '() => alert()' }
		const props = ReactElement.extractProps(input)
		expect(props.className).toBe('text-lg')
		expect(props.onClick).toBe('() => alert()')
	})

	it('should correctly extract tags', () => {
		const input = { div: ['Hello'], $className: 'text-lg' }
		const tags = ReactElement.extractTags(input)
		expect(tags).toEqual([['div', ['Hello']]])
	})

	it('should create ReactElement instance from input', () => {
		const input = { Button: ['Click me'], $variant: 'primary' }
		const el = ReactElement.from(input)
		expect(el).toBeInstanceOf(ReactElement)
		expect(el.type).toBe('Button')
		expect(el.content).toEqual(['Click me'])
		expect(el.props).toEqual({ variant: 'primary' })
	})
})

// Тестування рендерингу App з requiresInput та compute
describe('ReactElement rendering with App and interactive renderer', () => {
	const mockApps = new Map()
	const mockRenderers = new Map([['interactive', MockRenderInteractive]])
	const mockComponents = new Map([
		['Typography', MockTypography],
		['Input', MockInput],
		['Button', MockButton]
	])

	const ctx = new UIContextValue({
		console: mockConsole,
		apps: mockApps,
		renderers: mockRenderers,
		components: mockComponents,
		db: { extract: () => ({}) }
	})

	// Stable compute spy
	const computeSpy = vi.fn(async (input) => ({
		$title: `Result: ${parseInt(input.count || 0) * 2}`,
		message: `Computed from ${input.count}`,
		updatedContent: [{ p: ['Dynamic text'] }]
	}))

	const mockAppLoader = vi.fn(() => {
		const mockAppResult = {
			requiresInput: {
				fields: [
					{ name: 'count', type: 'number', label: 'Count', defaultValue: 0, min: 0 }
				]
			},
			compute: computeSpy,
			$content: [
				{ Typography: ['Interactive App Base'] }
			]
		}

		const AppRenderer = ({ context }) => {
			const [appState] = React.useState(mockAppResult)
			return (
				<MockRenderInteractive element={appState} context={context} />
			)
		}

		AppRenderer.displayName = 'MockAppRenderer'
		return { default: AppRenderer }
	})

	beforeEach(() => {
		vi.clearAllMocks()
		computeSpy.mockClear()
		mockApps.clear()
		mockApps.set('TestApp', mockAppLoader)
	})

	it('should handle mock app with requiresInput and compute', async () => {
		render(
			<UIProvider value={ctx}>
				{ReactElement.render({ App: 'TestApp' }, 'test-app', ctx)}
			</UIProvider>
		)

		// Wait for the interactive renderer to appear
		await waitFor(() => {
			expect(screen.getByTestId('interactive-renderer')).toBeInTheDocument()
		}, { timeout: 5000 })

		// Check base content
		expect(screen.getByTestId('typography')).toHaveTextContent('Interactive App Base')

		// Check form appears
		expect(screen.getByTestId('interactive-form')).toBeInTheDocument()
		expect(screen.getByTestId('input-count')).toBeInTheDocument()

		// Verify compute not called yet
		expect(computeSpy).not.toHaveBeenCalled()
	})

	it('should compute on form submit', async () => {
		render(
			<UIProvider value={ctx}>
				{ReactElement.render({ App: 'TestApp' }, 'test-app', ctx)}
			</UIProvider>
		)

		await waitFor(() => {
			expect(screen.getByTestId('interactive-renderer')).toBeInTheDocument()
		})

		// Fill input and submit
		const input = screen.getByTestId('input-count')
		fireEvent.change(input, { target: { value: '5' } })

		const submitBtn = screen.getByRole('button', { name: /compute/i })
		fireEvent.click(submitBtn)

		await waitFor(() => {
			expect(screen.getByTestId('result')).toBeInTheDocument()
			expect(screen.getByText('Result: 10')).toBeInTheDocument()
			expect(screen.getByText('Computed from 5')).toBeInTheDocument()
			expect(screen.getByText('Dynamic text')).toBeInTheDocument()
			expect(computeSpy).toHaveBeenCalledWith({ count: '5' })
		})
	})
})