import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useActiveSection } from '../useActiveSection'

describe('useActiveSection', () => {
  it('initializes with "personal" active and form open', () => {
    const { result } = renderHook(() => useActiveSection())
    expect(result.current.activeSection).toBe('personal')
    expect(result.current.formOpen).toBe(true)
  })

  it('handleSectionChange updates section and opens form', () => {
    const { result } = renderHook(() => useActiveSection())

    act(() => {
      result.current.handleSectionChange('skills')
    })

    expect(result.current.activeSection).toBe('skills')
    expect(result.current.formOpen).toBe(true)
  })

  it('closeForm sets section to null and form to closed', () => {
    const { result } = renderHook(() => useActiveSection())

    act(() => {
      result.current.closeForm()
    })

    expect(result.current.activeSection).toBeNull()
    expect(result.current.formOpen).toBe(false)
  })

  it('reopens form after close when a new section is selected', () => {
    const { result } = renderHook(() => useActiveSection())

    act(() => {
      result.current.closeForm()
    })
    expect(result.current.formOpen).toBe(false)

    act(() => {
      result.current.handleSectionChange('experience')
    })
    expect(result.current.activeSection).toBe('experience')
    expect(result.current.formOpen).toBe(true)
  })

  it('switches between sections', () => {
    const { result } = renderHook(() => useActiveSection())

    act(() => {
      result.current.handleSectionChange('skills')
    })
    expect(result.current.activeSection).toBe('skills')

    act(() => {
      result.current.handleSectionChange('education')
    })
    expect(result.current.activeSection).toBe('education')
  })
})
