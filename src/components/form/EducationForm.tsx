import { memo } from 'react'
import type { Education } from '../../types/cv'
import { useI18n } from '../../hooks/useI18n'
import FormSection from './FormSection'
import Input from './Input'
import TextArea from './TextArea'

interface Props {
  data: Education
  onChange: (data: Education) => void
}

export default memo(function EducationForm({ data, onChange }: Props) {
  const { t } = useI18n()

  const update = (field: keyof Education, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <FormSection title={t('education.title')}>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <Input label={t('education.degree')} value={data.degree} onChange={(e) => update('degree', e.currentTarget.value)} />
        </div>
        <Input label={t('education.institution')} value={data.institution} onChange={(e) => update('institution', e.currentTarget.value)} />
        <div className="grid grid-cols-2 gap-2">
          <Input label={t('education.start')} value={data.startDate} onChange={(e) => update('startDate', e.currentTarget.value)} placeholder="2016" />
          <Input label={t('education.end')} value={data.endDate} onChange={(e) => update('endDate', e.currentTarget.value)} placeholder="2020" />
        </div>
      </div>
      <TextArea
        label={t('education.description')}
        value={data.description}
        onChange={(e) => update('description', e.currentTarget.value)}
        rows={2}
      />
    </FormSection>
  )
})
