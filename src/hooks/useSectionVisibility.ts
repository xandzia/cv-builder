import { useState, useCallback } from 'react'
import type { SectionVisibility } from '../types/cv'

const DEFAULT_VISIBILITY: SectionVisibility = {
  experience: true,
  projects: true,
  education: true,
  skills: true,
  languages: true,
  certifications: true,
  interests: true,
  contact: true,
  summary: true,
}

export function useSectionVisibility() {
  const [visibility, setVisibility] = useState<SectionVisibility>(() => {
    try {
      const raw = localStorage.getItem('cv-builder-visibility')
      if (raw) return { ...DEFAULT_VISIBILITY, ...JSON.parse(raw) }
    } catch { /* ignore */ }
    return DEFAULT_VISIBILITY
  })

  const toggle = useCallback((key: keyof SectionVisibility) => {
    setVisibility((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      try { localStorage.setItem('cv-builder-visibility', JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }, [])

  return { visibility, toggle }
}
