import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFormValidation } from '../useFormValidation'

describe('useFormValidation', () => {
  it('returns no visible errors initially', () => {
    const errors = { fullName: 'Required', email: 'Invalid' }
    const { result } = renderHook(() => useFormValidation(errors))
    expect(result.current.visibleErrors).toEqual({})
  })

  it('shows error for a field after it is touched', () => {
    const errors = { fullName: 'Required' }
    const { result } = renderHook(() => useFormValidation(errors))

    act(() => {
      result.current.markTouched('fullName')
    })

    expect(result.current.visibleErrors.fullName).toBe('Required')
  })

  it('does not show errors for untouched fields', () => {
    const errors = { fullName: 'Required', email: 'Invalid' }
    const { result } = renderHook(() => useFormValidation(errors))

    act(() => {
      result.current.markTouched('fullName')
    })

    expect(result.current.visibleErrors.fullName).toBe('Required')
    expect(result.current.visibleErrors.email).toBeUndefined()
  })

  it('updates visible errors when errors object changes', () => {
    let errors = { fullName: 'Required' }
    const { result, rerender } = renderHook(() => useFormValidation(errors))

    act(() => {
      result.current.markTouched('fullName')
    })
    expect(result.current.visibleErrors.fullName).toBe('Required')

    // Fix the error
    errors = {}
    rerender()
    expect(result.current.visibleErrors.fullName).toBeUndefined()
  })

  it('markTouched is idempotent', () => {
    const errors = { fullName: 'Required' }
    const { result } = renderHook(() => useFormValidation(errors))

    act(() => {
      result.current.markTouched('fullName')
      result.current.markTouched('fullName')
      result.current.markTouched('fullName')
    })

    expect(result.current.visibleErrors.fullName).toBe('Required')
  })
})
