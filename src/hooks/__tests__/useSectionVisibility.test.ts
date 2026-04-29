import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSectionVisibility } from '../useSectionVisibility'

describe('useSectionVisibility', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('initializes with all sections visible', () => {
    const { result } = renderHook(() => useSectionVisibility())
    const { visibility } = result.current

    expect(visibility.experience).toBe(true)
    expect(visibility.projects).toBe(true)
    expect(visibility.education).toBe(true)
    expect(visibility.skills).toBe(true)
    expect(visibility.languages).toBe(true)
    expect(visibility.certifications).toBe(true)
    expect(visibility.interests).toBe(true)
    expect(visibility.contact).toBe(true)
    expect(visibility.summary).toBe(true)
  })

  it('toggle flips a section visibility', () => {
    const { result } = renderHook(() => useSectionVisibility())

    act(() => {
      result.current.toggle('experience')
    })

    expect(result.current.visibility.experience).toBe(false)
    // Other sections unchanged
    expect(result.current.visibility.projects).toBe(true)
  })

  it('toggle twice restores original value', () => {
    const { result } = renderHook(() => useSectionVisibility())

    act(() => { result.current.toggle('skills') })
    expect(result.current.visibility.skills).toBe(false)

    act(() => { result.current.toggle('skills') })
    expect(result.current.visibility.skills).toBe(true)
  })

  it('persists visibility to localStorage', () => {
    const { result } = renderHook(() => useSectionVisibility())

    act(() => {
      result.current.toggle('languages')
    })

    const stored = JSON.parse(localStorage.getItem('cv-builder-visibility')!)
    expect(stored.languages).toBe(false)
  })

  it('restores visibility from localStorage', () => {
    localStorage.setItem('cv-builder-visibility', JSON.stringify({
      experience: false,
      contact: false,
    }))

    const { result } = renderHook(() => useSectionVisibility())
    expect(result.current.visibility.experience).toBe(false)
    expect(result.current.visibility.contact).toBe(false)
    // Others remain default true
    expect(result.current.visibility.skills).toBe(true)
  })
})
