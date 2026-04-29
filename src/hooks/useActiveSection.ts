import { useState, useCallback } from 'react'
import type { SectionId } from '../config/cvSections'

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SectionId | null>('personal')
  const [formOpen, setFormOpen] = useState(true)

  const handleSectionChange = useCallback((section: SectionId) => {
    setActiveSection(section)
    setFormOpen(true)
  }, [])

  const closeForm = useCallback(() => {
    setFormOpen(false)
    setActiveSection(null)
  }, [])

  return { activeSection, formOpen, handleSectionChange, closeForm }
}
