import { memo } from 'react'
import type { Language } from '../../types/cv'
import { useListManager } from '../../hooks/useListManager'
import { useSortable } from '../../hooks/useSortable'
import { useI18n } from '../../hooks/useI18n'
import FormSection from './FormSection'
import Input from './Input'
import DragHandle from './DragHandle'

interface Props {
  data: Language[]
  onChange: (data: Language[]) => void
}

export default memo(function LanguagesForm({ data, onChange }: Props) {
  const { updateItem, addItem, removeItem, reorder } = useListManager(data, onChange)
  const { dragOverIndex, getDragProps } = useSortable(reorder)
  const { t } = useI18n()

  return (
    <FormSection title={t('languages.title')}>
      {data.map((item, i) => (
        <div
          key={item.id}
          {...getDragProps(i)}
          className="flex gap-2 items-end transition-colors rounded-md"
          style={{ borderBottom: dragOverIndex === i ? '2px solid #5b6abf' : '2px solid transparent' }}
        >
          <DragHandle />
          <div className="flex-1">
            <Input label={t('languages.language')} value={item.language} onChange={(e) => updateItem(i, 'language', e.currentTarget.value)} />
          </div>
          <div className="flex-1">
            <Input label={t('languages.level')} value={item.level} onChange={(e) => updateItem(i, 'level', e.currentTarget.value)} placeholder="Native, C1, B2..." />
          </div>
          {data.length > 1 && (
            <button type="button" onClick={() => removeItem(i)} className="pb-2 text-xs text-red-500 hover:text-red-700 transition-colors">
              ✕
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addItem({ language: '', level: '' })}
        className="w-full py-2 text-sm font-medium text-accent border border-dashed border-accent rounded-md hover:bg-accent-light transition-colors"
      >
        {t('languages.add')}
      </button>
    </FormSection>
  )
})
