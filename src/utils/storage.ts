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
    const state = JSON.parse(raw) as AppState
    // Migrate education from single object to array
    if (state.cv && !Array.isArray(state.cv.education)) {
      const edu = state.cv.education as Record<string, string>
      state.cv.education = (edu.degree || edu.institution)
        ? [{ id: '1', ...edu } as CVData['education'][number]]
        : []
    }
    return state
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
