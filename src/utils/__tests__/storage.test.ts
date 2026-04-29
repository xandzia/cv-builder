import { describe, it, expect, vi, beforeEach } from 'vitest'
import { loadState, saveState } from '../storage'
import type { AppState } from '../storage'
import { defaultCV } from '../../data/defaultCV'

const validState: AppState = {
  cv: defaultCV,
  accentColor: '#5b6abf',
  photoFilter: 'none',
}

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('loadState', () => {
    it('returns null when nothing stored', () => {
      expect(loadState()).toBeNull()
    })

    it('returns parsed state from localStorage', () => {
      localStorage.setItem('cv-builder-state', JSON.stringify(validState))
      const result = loadState()
      expect(result).not.toBeNull()
      expect(result!.accentColor).toBe('#5b6abf')
      expect(result!.cv.personal).toBeDefined()
    })

    it('returns null for invalid JSON', () => {
      localStorage.setItem('cv-builder-state', '{broken json')
      expect(loadState()).toBeNull()
    })
  })

  describe('saveState', () => {
    it('saves state to localStorage', () => {
      saveState(validState)
      const raw = localStorage.getItem('cv-builder-state')
      expect(raw).not.toBeNull()
      const parsed = JSON.parse(raw!)
      expect(parsed.accentColor).toBe('#5b6abf')
    })

    it('handles quota exceeded gracefully', () => {
      const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new DOMException('quota exceeded')
      })
      expect(() => saveState(validState)).not.toThrow()
      setItem.mockRestore()
    })
  })
})
