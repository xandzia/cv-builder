import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCVData } from '../useCVData'

describe('useCVData', () => {
  it('initializes with empty personal info', () => {
    const { result } = renderHook(() => useCVData())
    expect(result.current.cv.personal.fullName).toBe('')
    expect(result.current.cv.personal.jobTitle).toBe('')
  })

  it('initializes with default accent color', () => {
    const { result } = renderHook(() => useCVData())
    expect(result.current.accentColor).toBe('#5b6abf')
  })

  it('initializes with photo filter "none"', () => {
    const { result } = renderHook(() => useCVData())
    expect(result.current.photoFilter).toBe('none')
  })

  it('update("personal", ...) merges personal data', () => {
    const { result } = renderHook(() => useCVData())

    act(() => {
      result.current.update('personal', {
        ...result.current.cv.personal,
        fullName: 'New Name',
      })
    })

    expect(result.current.cv.personal.fullName).toBe('New Name')
  })

  it('setAccentColor updates the accent color', () => {
    const { result } = renderHook(() => useCVData())

    act(() => {
      result.current.setAccentColor('#ff0000')
    })

    expect(result.current.accentColor).toBe('#ff0000')
  })

  it('setPhotoFilter updates the photo filter', () => {
    const { result } = renderHook(() => useCVData())

    act(() => {
      result.current.setPhotoFilter('grayscale')
    })

    expect(result.current.photoFilter).toBe('grayscale')
  })

  it('fillSample fills all fields with demo data', () => {
    const { result } = renderHook(() => useCVData())

    act(() => {
      result.current.fillSample()
    })

    expect(result.current.cv.personal.fullName).toBe('John Doe')
    expect(result.current.cv.personal.jobTitle).toBe('Frontend Developer')
    expect(result.current.cv.experience.length).toBeGreaterThan(0)
    expect(result.current.cv.skillGroups.length).toBeGreaterThan(0)
    expect(result.current.cv.projects.length).toBeGreaterThan(0)
    expect(result.current.cv.languages.length).toBeGreaterThan(0)
    expect(result.current.cv.certifications.length).toBeGreaterThan(0)
    expect(result.current.cv.interests.length).toBeGreaterThan(0)
  })

  it('clearAll resets all fields to empty', () => {
    const { result } = renderHook(() => useCVData())

    // Fill first, then clear
    act(() => { result.current.fillSample() })
    act(() => { result.current.clearAll() })

    expect(result.current.cv.personal.fullName).toBe('')
    expect(result.current.cv.personal.jobTitle).toBe('')
    expect(result.current.cv.experience).toHaveLength(0)
    expect(result.current.cv.skillGroups).toHaveLength(0)
    expect(result.current.cv.projects).toHaveLength(0)
    expect(result.current.cv.languages).toHaveLength(0)
  })

  it('initializes with default template "two-column"', () => {
    const { result } = renderHook(() => useCVData())
    expect(result.current.template).toBe('two-column')
  })

  it('setTemplate changes the template', () => {
    const { result } = renderHook(() => useCVData())

    act(() => {
      result.current.setTemplate('minimal')
    })

    expect(result.current.template).toBe('minimal')
  })

  it('canUndo is false initially', () => {
    const { result } = renderHook(() => useCVData())
    expect(result.current.canUndo).toBe(false)
  })

  it('canRedo is false initially', () => {
    const { result } = renderHook(() => useCVData())
    expect(result.current.canRedo).toBe(false)
  })

  it('undo works after fillSample', () => {
    const { result } = renderHook(() => useCVData())

    act(() => { result.current.fillSample() })
    expect(result.current.cv.personal.fullName).toBe('John Doe')

    act(() => { result.current.undo() })
    expect(result.current.cv.personal.fullName).toBe('')
  })
})
