import type { TemplateId } from '../../types/templates'
import { TEMPLATES } from '../../types/templates'
import { useI18n } from '../../hooks/useI18n'

interface Props {
  value: TemplateId
  onChange: (template: TemplateId) => void
  accentColor: string
}

export default function TemplatePicker({ value, onChange, accentColor }: Props) {
  const { t } = useI18n()

  return (
    <div className="bg-white rounded-lg border border-gray-200 px-4 py-3">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        {t('style.template')}
      </div>
      <div className="flex gap-2">
        {TEMPLATES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`flex-1 px-2 py-2 text-xs rounded-md cursor-pointer transition-colors text-center ${
              value === id
                ? 'text-white font-medium'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={value === id ? { backgroundColor: accentColor } : undefined}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
