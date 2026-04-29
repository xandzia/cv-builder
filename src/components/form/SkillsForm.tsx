import { memo, useCallback } from 'react'
import type { SkillGroup } from '../../types/cv'
import { useSortable } from '../../hooks/useSortable'
import { useI18n } from '../../hooks/useI18n'
import FormSection from './FormSection'
import DragHandle from './DragHandle'

interface Props {
  data: SkillGroup[]
  onChange: (data: SkillGroup[]) => void
}

export default memo(function SkillsForm({ data, onChange }: Props) {
  const { t } = useI18n()

  const updateGroup = (index: number, field: keyof SkillGroup, value: string | string[]) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const addGroup = () => {
    onChange([...data, { label: '', skills: [] }])
  }

  const removeGroup = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const reorder = useCallback((from: number, to: number) => {
    const updated = [...data]
    const [moved] = updated.splice(from, 1)
    updated.splice(to, 0, moved)
    onChange(updated)
  }, [data, onChange])

  const { dragOverIndex, getDragProps } = useSortable(reorder)

  return (
    <FormSection title={t('skills.title')}>
      {data.map((group, i) => (
        <div
          key={i}
          {...getDragProps(i)}
          className="transition-colors rounded-md mb-3"
          style={{ borderBottom: dragOverIndex === i ? '2px solid #5b6abf' : '2px solid transparent' }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <DragHandle />
            <input
              className="flex-1 text-xs font-medium text-gray-700 bg-transparent border-b border-transparent focus:border-accent outline-none py-0.5 placeholder:text-gray-400"
              value={group.label}
              onChange={(e) => updateGroup(i, 'label', e.currentTarget.value)}
              placeholder={t('skills.groupName')}
            />
            <button
              type="button"
              onClick={() => removeGroup(i)}
              className="text-[10px] text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              {t('skills.remove')}
            </button>
          </div>
          <input
            className="w-full rounded-md border border-cv-border px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
            value={group.skills.join(', ')}
            onChange={(e) => updateGroup(i, 'skills', e.currentTarget.value.split(',').map((s) => s.trim()).filter(Boolean))}
            placeholder="Skill 1, Skill 2, Skill 3"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addGroup}
        className="w-full py-2 text-sm text-accent hover:bg-accent/5 rounded-lg transition-colors cursor-pointer border border-dashed border-accent/30"
      >
        {t('skills.add')}
      </button>
    </FormSection>
  )
})
