import { useState, useCallback, useEffect, useRef } from 'react'
import type { CVData, PhotoFilterType } from '../types/cv'
import type { TemplateId } from '../types/templates'
import { emptyCV, sampleCV } from '../data/defaultCV'
import { loadState, saveState } from '../utils/storage'
import { useUndoRedo } from './useUndoRedo'

interface CVState {
  cv: CVData
  accentColor: string
  photoFilter: PhotoFilterType
}

const defaultState: CVState = {
  cv: emptyCV,
  accentColor: '#5b6abf',
  photoFilter: 'none',
}

function loadInitialState(): CVState {
  const stored = loadState()
  if (stored) return { cv: stored.cv, accentColor: stored.accentColor, photoFilter: stored.photoFilter }
  return defaultState
}

function loadTemplate(): TemplateId {
  try {
    const raw = localStorage.getItem('cv-builder-template')
    if (raw === 'single-column' || raw === 'minimal') return raw
  } catch { /* ignore */ }
  return 'two-column'
}

export function useCVData() {
  const { value, historyValue, set, setImmediate, undo, redo, canUndo, canRedo } =
    useUndoRedo<CVState>(loadInitialState())

  const [template, setTemplateState] = useState<TemplateId>(loadTemplate)

  const setTemplate = useCallback((t: TemplateId) => {
    setTemplateState(t)
    try { localStorage.setItem('cv-builder-template', t) } catch { /* ignore */ }
  }, [])

  // Debounced save to localStorage
  const saveTimer = useRef<ReturnType<typeof setTimeout>>(null)
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      saveState({ cv: historyValue.cv, accentColor: historyValue.accentColor, photoFilter: historyValue.photoFilter })
    }, 300)
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [historyValue])

  const update = useCallback(<K extends keyof CVData>(key: K, val: CVData[K]) => {
    set({ ...value, cv: { ...value.cv, [key]: val } })
  }, [set, value])

  const setAccentColor = useCallback((color: string) => {
    set({ ...value, accentColor: color })
  }, [set, value])

  const setPhotoFilter = useCallback((filter: PhotoFilterType) => {
    set({ ...value, photoFilter: filter })
  }, [set, value])

  const fillSample = useCallback(() => {
    setImmediate({ ...value, cv: sampleCV })
  }, [setImmediate, value])

  const clearAll = useCallback(() => {
    setImmediate({ ...value, cv: emptyCV })
  }, [setImmediate, value])

  return {
    cv: value.cv,
    update,
    accentColor: value.accentColor,
    setAccentColor,
    photoFilter: value.photoFilter,
    setPhotoFilter,
    template,
    setTemplate,
    fillSample,
    clearAll,
    undo,
    redo,
    canUndo,
    canRedo,
  }
}
