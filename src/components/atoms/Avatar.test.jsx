/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import Avatar from './Avatar.jsx'

describe('Avatar', () => {
	it('renders with correct src and alt attributes', () => {
		const { getByRole } = render(<Avatar src="avatar.jpg" alt="User Avatar" />)
		const img = getByRole('img')
		expect(img).toHaveAttribute('src', 'avatar.jpg')
		expect(img).toHaveAttribute('alt', 'User Avatar')
	})
})