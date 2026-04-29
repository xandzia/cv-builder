import type { SectionVisibility } from '../../types/cv'
import { useI18n } from '../../hooks/useI18n'
import type { Translations } from '../../i18n/types'

const TOGGLE_ITEMS: { key: keyof SectionVisibility; labelKey: keyof Translations }[] = [
  { key: 'summary', labelKey: 'visibility.summary' },
  { key: 'contact', labelKey: 'visibility.contact' },
  { key: 'skills', labelKey: 'visibility.skills' },
  { key: 'experience', labelKey: 'visibility.experience' },
  { key: 'projects', labelKey: 'visibility.projects' },
  { key: 'education', labelKey: 'visibility.education' },
  { key: 'languages', labelKey: 'visibility.languages' },
  { key: 'certifications', labelKey: 'visibility.certifications' },
  { key: 'interests', labelKey: 'visibility.interests' },
]

interface Props {
  visibility: SectionVisibility
  onToggle: (key: keyof SectionVisibility) => void
}

export default function SectionVisibilityToggles({ visibility, onToggle }: Props) {
  const { t } = useI18n()

  return (
    <div className="bg-white rounded-lg border border-gray-200 px-4 py-3">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        {t('style.sectionVisibility')}
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {TOGGLE_ITEMS.map(({ key, labelKey }) => (
          <label key={key} className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={visibility[key]}
              onChange={() => onToggle(key)}
              className="rounded border-cv-border text-accent focus:ring-accent"
            />
            {t(labelKey)}
          </label>
        ))}
      </div>
    </div>
  )
}
