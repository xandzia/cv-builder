import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCVData } from '../useCVData'
import { defaultCV } from '../../data/defaultCV'

describe('useCVData', () => {
  it('initializes with defaultCV', () => {
    const { result } = renderHook(() => useCVData())
    expect(result.current.cv.personal.fullName).toBe(defaultCV.personal.fullName)
    expect(result.current.cv.personal.jobTitle).toBe(defaultCV.personal.jobTitle)
    expect(result.current.cv.experience).toHaveLength(defaultCV.experience.length)
    expect(result.current.cv.languages).toHaveLength(defaultCV.languages.length)
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
    expect(result.current.cv.personal.jobTitle).toBe(defaultCV.personal.jobTitle)
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
      result.current.update('languages', [])
    })

    expect(result.current.cv.languages).toHaveLength(0)
    expect(result.current.cv.experience).toHaveLength(defaultCV.experience.length)
    expect(result.current.cv.personal.fullName).toBe(defaultCV.personal.fullName)
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
