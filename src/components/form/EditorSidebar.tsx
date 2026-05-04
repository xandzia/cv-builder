import { useRef, useCallback } from 'react'
import type { SectionId } from '../../config/cvSections'
import { SECTIONS } from '../../config/cvSections'
import { useI18n } from '../../hooks/useI18n'
import LanguageSwitcher from './LanguageSwitcher'

interface Props {
  activeSection: SectionId | null
  onSectionChange: (section: SectionId) => void
  accentColor: string
}

/** Desktop vertical sidebar nav */
export function DesktopSidebar({ activeSection, onSectionChange, accentColor }: Props) {
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([])
  const { t } = useI18n()

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    let next: number
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      next = (index + 1) % SECTIONS.length
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      next = (index - 1 + SECTIONS.length) % SECTIONS.length
    } else {
      return
    }
    buttonsRef.current[next]?.focus()
    onSectionChange(SECTIONS[next].id)
  }, [onSectionChange])

  return (
    <nav className="flex flex-col w-[180px] shrink-0 bg-white border-r border-cv-border py-2 justify-between" aria-label="CV sections">
      <div>
        {SECTIONS.map(({ id, labelKey, icon: Icon }, index) => {
          const isActive = activeSection === id
          const label = t(labelKey)
          return (
            <button
              key={id}
              ref={(el) => { buttonsRef.current[index] = el }}
              type="button"
              onClick={() => onSectionChange(id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-current={isActive ? 'true' : undefined}
              tabIndex={isActive ? 0 : -1}
              className="flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors text-left w-full"
              style={{
                backgroundColor: isActive ? accentColor + '14' : undefined,
                color: isActive ? accentColor : '#4b5563',
                borderRight: isActive ? `3px solid ${accentColor}` : '3px solid transparent',
                fontWeight: isActive ? 600 : 400,
              }}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              <span>{label}</span>
            </button>
          )
        })}
      </div>
      <div className="px-4 pb-2">
        <LanguageSwitcher />
      </div>
    </nav>
  )
}

/** Mobile horizontal scrollable tab bar */
export function MobileTabs({ activeSection, onSectionChange, accentColor }: Props) {
  const { t } = useI18n()

  return (
    <nav className="md:hidden sticky top-[57px] z-20 bg-white border-b border-cv-border" aria-label="CV sections">
      <div className="flex justify-around px-1 py-1.5">
        {SECTIONS.map(({ id, labelKey, icon: Icon }) => {
          const isActive = activeSection === id
          const label = t(labelKey)
          return (
            <button
              key={id}
              type="button"
              title={label}
              aria-label={label}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => onSectionChange(id)}
              className="flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer transition-colors"
              style={{
                backgroundColor: isActive ? accentColor + '14' : undefined,
                color: isActive ? accentColor : '#6b7280',
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
            </button>
          )
        })}
      </div>
    </nav>
  )
}
