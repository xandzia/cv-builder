import type { CVData, PhotoFilterType } from '../types/cv'

const STORAGE_KEY = 'cv-builder-state'

export interface AppState {
  cv: CVData
  accentColor: string
  photoFilter: PhotoFilterType
}

export function loadState(): AppState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AppState
  } catch {
    return null
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // quota exceeded or unavailable — silently ignore
  }
}
