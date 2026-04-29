import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useUndoRedo } from '../useUndoRedo'

describe('useUndoRedo', () => {
  it('initializes with the given value', () => {
    const { result } = renderHook(() => useUndoRedo('initial'))
    expect(result.current.value).toBe('initial')
    expect(result.current.canUndo).toBe(false)
    expect(result.current.canRedo).toBe(false)
  })

  it('set updates liveValue immediately', () => {
    const { result } = renderHook(() => useUndoRedo('a'))

    act(() => {
      result.current.set('b')
    })

    expect(result.current.value).toBe('b')
  })

  it('setImmediate pushes to history immediately', () => {
    const { result } = renderHook(() => useUndoRedo('a'))

    act(() => {
      result.current.setImmediate('b')
    })

    expect(result.current.value).toBe('b')
    expect(result.current.canUndo).toBe(true)
  })

  it('undo reverts to previous value after setImmediate', () => {
    const { result } = renderHook(() => useUndoRedo('a'))

    act(() => {
      result.current.setImmediate('b')
    })

    act(() => {
      result.current.undo()
    })

    expect(result.current.value).toBe('a')
    expect(result.current.canUndo).toBe(false)
    expect(result.current.canRedo).toBe(true)
  })

  it('redo restores undone value', () => {
    const { result } = renderHook(() => useUndoRedo('a'))

    act(() => {
      result.current.setImmediate('b')
    })

    act(() => {
      result.current.undo()
    })

    act(() => {
      result.current.redo()
    })

    expect(result.current.value).toBe('b')
    expect(result.current.canRedo).toBe(false)
  })

  it('undo does nothing when no history', () => {
    const { result } = renderHook(() => useUndoRedo('a'))

    act(() => {
      result.current.undo()
    })

    expect(result.current.value).toBe('a')
  })

  it('redo does nothing when no future', () => {
    const { result } = renderHook(() => useUndoRedo('a'))

    act(() => {
      result.current.redo()
    })

    expect(result.current.value).toBe('a')
  })

  it('new setImmediate after undo clears future', () => {
    const { result } = renderHook(() => useUndoRedo('a'))

    act(() => { result.current.setImmediate('b') })
    act(() => { result.current.setImmediate('c') })
    act(() => { result.current.undo() })
    expect(result.current.canRedo).toBe(true)

    act(() => { result.current.setImmediate('d') })
    expect(result.current.canRedo).toBe(false)
    expect(result.current.value).toBe('d')
  })

  it('reset clears all history', () => {
    const { result } = renderHook(() => useUndoRedo('a'))

    act(() => { result.current.setImmediate('b') })
    act(() => { result.current.setImmediate('c') })

    act(() => { result.current.reset('fresh') })

    expect(result.current.value).toBe('fresh')
    expect(result.current.canUndo).toBe(false)
    expect(result.current.canRedo).toBe(false)
  })

  it('set pushes to history after debounce', () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useUndoRedo('a'))

    act(() => {
      result.current.set('b')
    })

    // Before debounce fires, no history yet
    expect(result.current.canUndo).toBe(false)

    // Advance timer past debounce (500ms)
    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(result.current.canUndo).toBe(true)
    vi.useRealTimers()
  })

  it('debounced set coalesces rapid changes', () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useUndoRedo('a'))

    act(() => {
      result.current.set('b')
      result.current.set('c')
      result.current.set('d')
    })

    expect(result.current.value).toBe('d')

    act(() => {
      vi.advanceTimersByTime(500)
    })

    // Only one history entry
    expect(result.current.canUndo).toBe(true)
    act(() => { result.current.undo() })
    expect(result.current.value).toBe('a')
    expect(result.current.canUndo).toBe(false)

    vi.useRealTimers()
  })

  it('supports multiple sequential undo/redo', () => {
    const { result } = renderHook(() => useUndoRedo(1))

    act(() => { result.current.setImmediate(2) })
    act(() => { result.current.setImmediate(3) })
    act(() => { result.current.setImmediate(4) })

    act(() => { result.current.undo() })
    expect(result.current.value).toBe(3)

    act(() => { result.current.undo() })
    expect(result.current.value).toBe(2)

    act(() => { result.current.redo() })
    expect(result.current.value).toBe(3)

    act(() => { result.current.redo() })
    expect(result.current.value).toBe(4)
  })

  it('works with object values', () => {
    const { result } = renderHook(() => useUndoRedo({ name: 'a', count: 1 }))

    act(() => { result.current.setImmediate({ name: 'b', count: 2 }) })
    expect(result.current.value).toEqual({ name: 'b', count: 2 })

    act(() => { result.current.undo() })
    expect(result.current.value).toEqual({ name: 'a', count: 1 })
  })
})
