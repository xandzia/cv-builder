import { memo } from 'react'
import type { Project } from '../../types/cv'
import { useListManager } from '../../hooks/useListManager'
import { useSortable } from '../../hooks/useSortable'
import { useI18n } from '../../hooks/useI18n'
import FormSection from './FormSection'
import Input from './Input'
import DragHandle from './DragHandle'

interface Props {
  data: Project[]
  onChange: (data: Project[]) => void
}

export default memo(function ProjectsForm({ data, onChange }: Props) {
  const { updateItem, addItem, removeItem, reorder } = useListManager(data, onChange)
  const { dragOverIndex, getDragProps } = useSortable(reorder)
  const { t } = useI18n()

  const updateBullets = (index: number, value: string) => {
    const bullets = value.split('\n').filter((b) => b.trim() !== '' || value.endsWith('\n'))
    updateItem(index, 'bullets', bullets.length === 0 ? [''] : bullets)
  }

  return (
    <FormSection title={t('projects.title')}>
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
              <button type="button" onClick={() => removeItem(i)} className="text-xs text-red-500 hover:text-red-700 transition-colors">
                {t('experience.remove')}
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input label={t('projects.name')} value={item.name} onChange={(e) => updateItem(i, 'name', e.currentTarget.value)} />
            <Input label={t('projects.techStack')} value={item.techStack} onChange={(e) => updateItem(i, 'techStack', e.currentTarget.value)} />
            <div className="col-span-2">
              <Input label={t('projects.link')} value={item.link} onChange={(e) => updateItem(i, 'link', e.currentTarget.value)} placeholder="github.com/..." />
            </div>
          </div>
          <label className="block">
            <span className="block text-xs font-medium text-gray-500 mb-1">{t('projects.description')}</span>
            <textarea
              className="w-full rounded-md border border-cv-border px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-y min-h-[60px]"
              value={item.bullets.join('\n')}
              onChange={(e) => updateBullets(i, e.currentTarget.value)}
              rows={3}
            />
          </label>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addItem({ name: '', techStack: '', link: '', bullets: [''] })}
        className="w-full py-2 text-sm font-medium text-accent border border-dashed border-accent rounded-md hover:bg-accent-light transition-colors"
      >
        {t('projects.add')}
      </button>
    </FormSection>
  )
})
