import { describe, it, expect } from 'vitest'
import { slugify } from '../slugify'

describe('slugify', () => {
  it('converts name to lowercase kebab-case', () => {
    expect(slugify('Anna Stepashko')).toBe('anna-stepashko')
  })

  it('strips special characters', () => {
    expect(slugify('Héllo Wörld!')).toBe('h-llo-w-rld')
  })

  it('returns empty string for empty input', () => {
    expect(slugify('')).toBe('')
  })

  it('returns already-slugified input unchanged', () => {
    expect(slugify('anna-stepashko')).toBe('anna-stepashko')
  })

  it('collapses multiple separators', () => {
    expect(slugify('Hello   World')).toBe('hello-world')
  })

  it('removes leading and trailing hyphens', () => {
    expect(slugify('--hello--')).toBe('hello')
  })
})
