import { useReducer, useCallback, useRef, useState } from 'react'

const MAX_HISTORY = 50

interface UndoRedoState<T> {
  past: T[]
  present: T
  future: T[]
}

type Action<T> =
  | { type: 'PUSH'; value: T }
  | { type: 'SET_PRESENT'; value: T }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'RESET'; value: T }

function reducer<T>(state: UndoRedoState<T>, action: Action<T>): UndoRedoState<T> {
  switch (action.type) {
    case 'SET_PRESENT':
      return { ...state, present: action.value }
    case 'PUSH':
      return {
        past: [...state.past, state.present].slice(-MAX_HISTORY),
        present: action.value,
        future: [],
      }
    case 'UNDO':
      if (state.past.length === 0) return state
      return {
        past: state.past.slice(0, -1),
        present: state.past[state.past.length - 1],
        future: [state.present, ...state.future],
      }
    case 'REDO':
      if (state.future.length === 0) return state
      return {
        past: [...state.past, state.present],
        present: state.future[0],
        future: state.future.slice(1),
      }
    case 'RESET':
      return { past: [], present: action.value, future: [] }
    default:
      return state
  }
}

export function useUndoRedo<T>(initialValue: T) {
  const [state, dispatch] = useReducer(reducer<T>, {
    past: [],
    present: initialValue,
    future: [],
  })

  // Live value tracks the most recent value (updates immediately, before debounce fires)
  const [liveValue, setLiveValue] = useState<T>(initialValue)

  const debounceTimer = useRef<ReturnType<typeof setTimeout>>(null)

  const set = useCallback((value: T) => {
    // Immediately update live value for UI responsiveness
    setLiveValue(value)

    // Debounce the history push
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      dispatch({ type: 'PUSH', value })
    }, 500)
  }, [])

  const setImmediate = useCallback((value: T) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    setLiveValue(value)
    dispatch({ type: 'PUSH', value })
  }, [])

  const undo = useCallback(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    dispatch({ type: 'UNDO' })
    // liveValue will be synced in the effect below
  }, [])

  const redo = useCallback(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    dispatch({ type: 'REDO' })
  }, [])

  const reset = useCallback((value: T) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    setLiveValue(value)
    dispatch({ type: 'RESET', value })
  }, [])

  // Sync liveValue when undo/redo changes state.present (derived state pattern)
  const [prevPresent, setPrevPresent] = useState<T>(state.present)
  if (prevPresent !== state.present) {
    setPrevPresent(state.present)
    if (liveValue !== state.present) {
      setLiveValue(state.present)
    }
  }

  return {
    value: liveValue,
    historyValue: state.present,
    set,
    setImmediate,
    undo,
    redo,
    reset,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
  }
}
