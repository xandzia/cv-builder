import { useI18n } from '../../hooks/useI18n'

const PALETTE = [
  { hex: '#5b6abf', label: 'Purple' },
  { hex: '#4338ca', label: 'Indigo' },
  { hex: '#2563eb', label: 'Blue' },
  { hex: '#0d9488', label: 'Teal' },
  { hex: '#047857', label: 'Emerald' },
  { hex: '#16a34a', label: 'Green' },
  { hex: '#ea580c', label: 'Orange' },
  { hex: '#dc2626', label: 'Red' },
  { hex: '#db2777', label: 'Pink' },
  { hex: '#475569', label: 'Slate' },
] as const

interface Props {
  value: string
  onChange: (color: string) => void
}

export default function ColorPicker({ value, onChange }: Props) {
  const { t } = useI18n()

  return (
    <div className="bg-white rounded-lg border border-gray-200 px-4 py-3">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2" id="color-picker-label">
        {t('style.accentColor')}
      </div>
      <div className="flex gap-2 flex-wrap" role="radiogroup" aria-labelledby="color-picker-label">
        {PALETTE.map(({ hex, label }) => (
          <button
            key={hex}
            type="button"
            role="radio"
            aria-checked={value === hex}
            aria-label={label}
            title={label}
            onClick={() => onChange(hex)}
            className="w-7 h-7 rounded-full cursor-pointer transition-transform hover:scale-110 shrink-0"
            style={{
              backgroundColor: hex,
              outline: value === hex ? `2px solid ${hex}` : '2px solid transparent',
              outlineOffset: '2px',
            }}
          />
        ))}
      </div>
    </div>
  )
}
