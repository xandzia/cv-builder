import { memo } from 'react'
import type { WorkExperience } from '../../types/cv'
import { useListManager } from '../../hooks/useListManager'
import { useSortable } from '../../hooks/useSortable'
import { useI18n } from '../../hooks/useI18n'
import FormSection from './FormSection'
import Input from './Input'
import DragHandle from './DragHandle'

interface Props {
  data: WorkExperience[]
  onChange: (data: WorkExperience[]) => void
}

export default memo(function ExperienceForm({ data, onChange }: Props) {
  const { updateItem, addItem, removeItem, reorder } = useListManager(data, onChange)
  const { dragOverIndex, getDragProps } = useSortable(reorder)
  const { t } = useI18n()

  const update = (index: number, field: keyof WorkExperience, value: unknown) => {
    if (field === 'isCurrent' && value === true) {
      const updated = [...data]
      updated[index] = { ...updated[index], isCurrent: true, endDate: '' }
      onChange(updated)
    } else {
      updateItem(index, field, value)
    }
  }

  const updateBullets = (index: number, value: string) => {
    const bullets = value.split('\n').filter((b) => b.trim() !== '' || value.endsWith('\n'))
    update(index, 'bullets', bullets.length === 0 ? [''] : bullets)
  }

  return (
    <FormSection title={t('experience.title')}>
      {data.map((item, i) => (
        <div
          key={item.id}
          {...getDragProps(i)}
          className="space-y-2 p-3 bg-gray-50 rounded-md border border-cv-border relative transition-colors"
          style={{ borderColor: dragOverIndex === i ? '#5b6abf' : undefined }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <DragHandle />
              <span className="text-xs font-semibold text-accent">#{i + 1}</span>
            </div>
            {data.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="text-xs text-red-500 hover:text-red-700 transition-colors"
              >
                {t('experience.remove')}
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input label={t('experience.position')} value={item.position} onChange={(e) => update(i, 'position', e.currentTarget.value)} />
            <Input label={t('experience.company')} value={item.company} onChange={(e) => update(i, 'company', e.currentTarget.value)} />
            <Input label={t('experience.location')} value={item.location} onChange={(e) => update(i, 'location', e.currentTarget.value)} />
            <div />
            <Input label={t('experience.startDate')} type="month" value={item.startDate} onChange={(e) => update(i, 'startDate', e.currentTarget.value)} />
            {!item.isCurrent && (
              <Input label={t('experience.endDate')} type="month" value={item.endDate} onChange={(e) => update(i, 'endDate', e.currentTarget.value)} />
            )}
          </div>
          <label className="flex items-center gap-2 text-xs text-gray-600">
            <input
              type="checkbox"
              checked={item.isCurrent}
              onChange={(e) => update(i, 'isCurrent', e.currentTarget.checked)}
              className="rounded border-cv-border text-accent focus:ring-accent"
            />
            {t('experience.current')}
          </label>
          <label className="block">
            <span className="block text-xs font-medium text-gray-500 mb-1">{t('experience.description')}</span>
            <textarea
              className="w-full rounded-md border border-cv-border px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-y min-h-[80px]"
              value={item.bullets.join('\n')}
              onChange={(e) => updateBullets(i, e.currentTarget.value)}
              rows={4}
            />
          </label>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addItem({
          position: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          isCurrent: false,
          bullets: [''],
        })}
        className="w-full py-2 text-sm font-medium text-accent border border-dashed border-accent rounded-md hover:bg-accent-light transition-colors"
      >
        {t('experience.add')}
      </button>
    </FormSection>
  )
})
