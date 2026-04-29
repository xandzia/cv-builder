import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SidebarSectionTitle, MainSectionTitle } from '../CVSectionTitle'

describe('SidebarSectionTitle', () => {
  it('renders text content', () => {
    render(<SidebarSectionTitle accent="#5b6abf">Skills</SidebarSectionTitle>)
    expect(screen.getByText('Skills')).toBeInTheDocument()
  })

  it('applies accent color', () => {
    render(<SidebarSectionTitle accent="#ff0000">Skills</SidebarSectionTitle>)
    const heading = screen.getByText('Skills')
    // jsdom normalizes hex to rgb
    expect(heading.style.color).toBe('rgb(255, 0, 0)')
  })

  it('renders as h3', () => {
    render(<SidebarSectionTitle accent="#5b6abf">Languages</SidebarSectionTitle>)
    const heading = screen.getByText('Languages')
    expect(heading.tagName).toBe('H3')
  })

  it('applies uppercase text transform', () => {
    render(<SidebarSectionTitle accent="#5b6abf">Test</SidebarSectionTitle>)
    const heading = screen.getByText('Test')
    expect(heading.style.textTransform).toBe('uppercase')
  })
})

describe('MainSectionTitle', () => {
  it('renders text content', () => {
    render(<MainSectionTitle accent="#5b6abf">Experience</MainSectionTitle>)
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })

  it('applies accent color to heading', () => {
    render(<MainSectionTitle accent="#336699">Experience</MainSectionTitle>)
    const heading = screen.getByText('Experience')
    // jsdom normalizes hex to rgb
    expect(heading.style.color).toBe('rgb(51, 102, 153)')
  })

  it('has a bottom border with accent color', () => {
    render(<MainSectionTitle accent="#5b6abf">Projects</MainSectionTitle>)
    const heading = screen.getByText('Projects')
    // jsdom normalizes #5b6abf38 (hex + alpha) to rgba
    expect(heading.style.borderBottom).toContain('solid')
    expect(heading.style.borderBottom).toContain('rgba(91, 106, 191')
  })

  it('renders as h3', () => {
    render(<MainSectionTitle accent="#5b6abf">Education</MainSectionTitle>)
    const heading = screen.getByText('Education')
    expect(heading.tagName).toBe('H3')
  })
})
