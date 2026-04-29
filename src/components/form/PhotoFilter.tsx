import type { PhotoFilterType } from '../../types/cv'
import { useI18n } from '../../hooks/useI18n'
import type { Translations } from '../../i18n/types'

export type { PhotoFilterType }

const FILTERS: { value: PhotoFilterType; labelKey: keyof Translations }[] = [
  { value: 'none', labelKey: 'style.filterOriginal' },
  { value: 'grayscale', labelKey: 'style.filterBW' },
  { value: 'accent', labelKey: 'style.filterTinted' },
]

interface Props {
  value: PhotoFilterType
  onChange: (filter: PhotoFilterType) => void
  accentColor: string
}

export default function PhotoFilter({ value, onChange, accentColor }: Props) {
  const { t } = useI18n()

  return (
    <div className="bg-white rounded-lg border border-gray-200 px-4 py-3">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2" id="photo-filter-label">
        {t('style.photoFilter')}
      </div>
      <div className="flex gap-2" role="radiogroup" aria-labelledby="photo-filter-label">
        {FILTERS.map(({ value: v, labelKey }) => (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={value === v}
            onClick={() => onChange(v)}
            className={`px-3 py-1.5 text-xs rounded-md cursor-pointer transition-colors ${
              value === v
                ? 'text-white font-medium'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={value === v ? { backgroundColor: accentColor } : undefined}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>
    </div>
  )
}
