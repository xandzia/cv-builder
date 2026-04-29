import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BulletList } from '../CVBulletList'

describe('BulletList', () => {
  const accent = '#5b6abf'

  it('renders bullets with correct text', () => {
    render(<BulletList items={['First item', 'Second item']} accent={accent} />)
    expect(screen.getByText('First item')).toBeInTheDocument()
    expect(screen.getByText('Second item')).toBeInTheDocument()
  })

  it('filters out empty strings', () => {
    render(<BulletList items={['Visible', '', '  ']} accent={accent} />)
    expect(screen.getByText('Visible')).toBeInTheDocument()
    // Empty strings are filtered by .filter(Boolean), but '  ' (whitespace) is truthy
  })

  it('returns null for an all-empty array', () => {
    const { container } = render(<BulletList items={['', '']} accent={accent} />)
    expect(container.innerHTML).toBe('')
  })

  it('returns null for an empty array', () => {
    const { container } = render(<BulletList items={[]} accent={accent} />)
    expect(container.innerHTML).toBe('')
  })

  it('accepts custom fontSize', () => {
    render(<BulletList items={['Test']} accent={accent} fontSize="10px" />)
    const text = screen.getByText('Test')
    expect(text.style.fontSize).toBe('10px')
  })
})
