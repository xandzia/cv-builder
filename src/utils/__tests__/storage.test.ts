import { describe, it, expect, vi, beforeEach } from 'vitest'
import { loadState, saveState, importJSON } from '../storage'
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
      expect(result!.cv.personal.fullName).toBe(defaultCV.personal.fullName)
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

  describe('importJSON', () => {
    it('resolves with valid AppState from file', async () => {
      const blob = new Blob([JSON.stringify(validState)], { type: 'application/json' })
      const file = new File([blob], 'cv.json', { type: 'application/json' })

      const result = await importJSON(file)
      expect(result.accentColor).toBe('#5b6abf')
      expect(result.cv.personal.fullName).toBe(defaultCV.personal.fullName)
    })

    it('rejects for invalid JSON', async () => {
      const file = new File(['not json'], 'bad.json')
      await expect(importJSON(file)).rejects.toThrow('Invalid JSON file')
    })

    it('rejects for valid JSON without cv.personal', async () => {
      const file = new File([JSON.stringify({ foo: 'bar' })], 'bad.json')
      await expect(importJSON(file)).rejects.toThrow('Invalid CV data file')
    })
  })
})
