import { describe, it, expect } from 'vitest'
import { nextId } from '../id'

describe('nextId', () => {
  it('returns a string', () => {
    expect(typeof nextId()).toBe('string')
  })

  it('returns incrementing values', () => {
    const a = nextId()
    const b = nextId()
    expect(Number(b)).toBeGreaterThan(Number(a))
  })

  it('produces no duplicates across 100 calls', () => {
    const ids = new Set<string>()
    for (let i = 0; i < 100; i++) {
      ids.add(nextId())
    }
    expect(ids.size).toBe(100)
  })
})
