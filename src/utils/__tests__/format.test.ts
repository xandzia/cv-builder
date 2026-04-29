import { describe, it, expect } from 'vitest'
import { formatDate, toHref } from '../format'

describe('formatDate', () => {
  it('returns empty string for empty input', () => {
    expect(formatDate('')).toBe('')
  })

  it('returns 4-char year as-is', () => {
    expect(formatDate('2022')).toBe('2022')
  })

  it('formats YYYY-MM to MM/YYYY', () => {
    expect(formatDate('2022-03')).toBe('03/2022')
  })

  it('formats December correctly', () => {
    expect(formatDate('2022-12')).toBe('12/2022')
  })

  it('formats January correctly', () => {
    expect(formatDate('2023-01')).toBe('01/2023')
  })
})

describe('toHref', () => {
  it('returns empty string for empty input', () => {
    expect(toHref('')).toBe('')
  })

  it('returns https URLs as-is', () => {
    expect(toHref('https://example.com')).toBe('https://example.com')
  })

  it('returns http URLs as-is', () => {
    expect(toHref('http://example.com')).toBe('http://example.com')
  })

  it('converts email to mailto link', () => {
    expect(toHref('user@mail.com')).toBe('mailto:user@mail.com')
  })

  it('prepends https to bare domains', () => {
    expect(toHref('example.com')).toBe('https://example.com')
  })

  it('prepends https to domains with paths', () => {
    expect(toHref('github.com/user')).toBe('https://github.com/user')
  })
})
