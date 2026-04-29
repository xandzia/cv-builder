import { memo } from 'react'
import type { Education } from '../../types/cv'
import { useListManager } from '../../hooks/useListManager'
import { useSortable } from '../../hooks/useSortable'
import { useI18n } from '../../hooks/useI18n'
import FormSection from './FormSection'
import Input from './Input'
import TextArea from './TextArea'
import DragHandle from './DragHandle'

interface Props {
  data: Education[]
  onChange: (data: Education[]) => void
}

export default memo(function EducationForm({ data, onChange }: Props) {
  const { updateItem, addItem, removeItem, reorder } = useListManager(data, onChange)
  const { dragOverIndex, getDragProps } = useSortable(reorder)
  const { t } = useI18n()

  return (
    <FormSection title={t('education.title')}>
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
                className="text-xs text-red-500 hover:text-red-700 transition-colors cursor-pointer"
              >
                {t('education.remove')}
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <Input label={t('education.degree')} value={item.degree} onChange={(e) => updateItem(i, 'degree', e.currentTarget.value)} />
            </div>
            <Input label={t('education.institution')} value={item.institution} onChange={(e) => updateItem(i, 'institution', e.currentTarget.value)} />
            <div className="grid grid-cols-2 gap-2">
              <Input label={t('education.start')} value={item.startDate} onChange={(e) => updateItem(i, 'startDate', e.currentTarget.value)} placeholder="2016" />
              <Input label={t('education.end')} value={item.endDate} onChange={(e) => updateItem(i, 'endDate', e.currentTarget.value)} placeholder="2020" />
            </div>
          </div>
          <TextArea
            label={t('education.description')}
            value={item.description}
            onChange={(e) => updateItem(i, 'description', e.currentTarget.value)}
            rows={2}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => addItem({
          degree: '',
          institution: '',
          startDate: '',
          endDate: '',
          description: '',
        })}
        className="w-full py-2 text-sm font-medium text-accent border border-dashed border-accent rounded-md hover:bg-accent-light transition-colors cursor-pointer"
      >
        {t('education.add')}
      </button>
    </FormSection>
  )
})
