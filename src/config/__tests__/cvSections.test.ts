import { describe, it, expect } from 'vitest'
import { SECTIONS } from '../cvSections'
import type { SectionId } from '../cvSections'

describe('SECTIONS config', () => {
  it('has 8 entries', () => {
    expect(SECTIONS).toHaveLength(8)
  })

  it('each entry has id, labelKey, and icon', () => {
    for (const section of SECTIONS) {
      expect(section).toHaveProperty('id')
      expect(section).toHaveProperty('labelKey')
      expect(section).toHaveProperty('icon')
      expect(typeof section.id).toBe('string')
      expect(typeof section.labelKey).toBe('string')
      expect(section.icon).toBeTruthy()
    }
  })

  it('contains all SectionId values', () => {
    const expectedIds: SectionId[] = [
      'style',
      'personal',
      'skills',
      'experience',
      'projects',
      'education',
      'languages',
      'extras',
    ]
    const ids = SECTIONS.map((s) => s.id)
    expect(ids).toEqual(expectedIds)
  })

  it('has unique ids', () => {
    const ids = SECTIONS.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has non-empty labelKeys', () => {
    for (const section of SECTIONS) {
      expect(section.labelKey.length).toBeGreaterThan(0)
    }
  })
})
