/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import Modal from './Modal.jsx'

describe('Modal', () => {
	it('does not render when isOpen is false', () => {
		const { container } = render(<Modal isOpen={false} onClose={() => {}} />)
		expect(container.firstChild).toBeNull()
	})

	it('renders children when isOpen is true', () => {
		const { getByText } = render(
			<Modal isOpen={true} onClose={() => {}}>
				<p>Modal content</p>
			</Modal>
		)
		expect(getByText('Modal content')).toBeInTheDocument()
	})
})
