import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCVData } from '../useCVData'

describe('useCVData', () => {
  it('initializes with empty personal info', () => {
    const { result } = renderHook(() => useCVData())
    expect(result.current.cv.personal.fullName).toBe('')
    expect(result.current.cv.personal.jobTitle).toBe('')
    expect(result.current.cv.personal.email).toBe('')
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
    // Other fields stay unchanged
    expect(result.current.cv.personal.jobTitle).toBe('')
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

  it('update preserves other CV sections', () => {
    const { result } = renderHook(() => useCVData())

    act(() => {
      result.current.update('personal', {
        ...result.current.cv.personal,
        fullName: 'Test',
      })
    })

    expect(result.current.cv.personal.fullName).toBe('Test')
    // Languages stay the same
    expect(result.current.cv.languages).toHaveLength(1)
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
})
