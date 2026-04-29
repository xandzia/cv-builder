import { useRef, useMemo, memo } from 'react'
import type { PersonalInfo } from '../../types/cv'
import { validatePersonalInfo } from '../../utils/validation'
import { useFormValidation } from '../../hooks/useFormValidation'
import { usePhotoCrop } from '../../hooks/usePhotoCrop'
import { useI18n } from '../../hooks/useI18n'
import FormSection from './FormSection'
import Input from './Input'
import TextArea from './TextArea'
import PhotoCropModal from './PhotoCropModal'

interface Props {
  data: PersonalInfo
  onChange: (data: PersonalInfo) => void
}

export default memo(function PersonalInfoForm({ data, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const { t } = useI18n()
  const errors = useMemo(() => validatePersonalInfo(data), [data])
  const { visibleErrors, markTouched } = useFormValidation(errors)
  const { cropState, startCrop, updateCrop, applyCrop, cancelCrop } = usePhotoCrop()

  const update = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value })
  }

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      startCrop(reader.result as string)
    }
    reader.readAsDataURL(file)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleApplyCrop = async () => {
    const cropped = await applyCrop()
    if (cropped) {
      onChange({ ...data, photo: cropped })
    }
    cancelCrop()
  }

  const removePhoto = () => {
    onChange({ ...data, photo: '' })
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <FormSection title={t('personal.title')}>
      {/* Photo upload */}
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full bg-gray-100 border-2 border-dashed border-cv-border flex items-center justify-center overflow-hidden shrink-0 cursor-pointer"
          onClick={() => fileRef.current?.click()}
        >
          {data.photo ? (
            <img src={data.photo} alt="Photo" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400 text-xs text-center leading-tight">{t('personal.photo')}</span>
          )}
        </div>
        <div className="flex-1 space-y-1">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handlePhoto}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="text-xs text-accent hover:underline cursor-pointer"
          >
            {data.photo ? t('personal.changePhoto') : t('personal.uploadPhoto')}
          </button>
          {data.photo && (
            <button
              type="button"
              onClick={removePhoto}
              className="block text-xs text-red-500 hover:underline cursor-pointer"
            >
              {t('personal.removePhoto')}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          label={t('personal.fullName')}
          required
          value={data.fullName}
          onChange={(e) => update('fullName', e.currentTarget.value)}
          onBlur={() => markTouched('fullName')}
          error={visibleErrors.fullName}
          placeholder="John Doe"
        />
        <Input
          label={t('personal.jobTitle')}
          required
          value={data.jobTitle}
          onChange={(e) => update('jobTitle', e.currentTarget.value)}
          onBlur={() => markTouched('jobTitle')}
          error={visibleErrors.jobTitle}
          placeholder="Frontend Developer"
        />
        <Input label={t('personal.location')} value={data.location} onChange={(e) => update('location', e.currentTarget.value)} placeholder="Vienna, Austria" />
        <Input
          label={t('personal.email')}
          type="email"
          value={data.email}
          onChange={(e) => update('email', e.currentTarget.value)}
          onBlur={() => markTouched('email')}
          error={visibleErrors.email}
          placeholder="email@example.com"
        />
        <Input label={t('personal.phone')} value={data.phone} onChange={(e) => update('phone', e.currentTarget.value)} placeholder="+43 660 123 4567" />
        <Input label={t('personal.linkedin')} value={data.linkedin} onChange={(e) => update('linkedin', e.currentTarget.value)} placeholder="linkedin.com/in/..." />
        <Input label={t('personal.github')} value={data.github} onChange={(e) => update('github', e.currentTarget.value)} placeholder="github.com/..." />
        <Input label={t('personal.portfolio')} value={data.portfolio} onChange={(e) => update('portfolio', e.currentTarget.value)} placeholder="yoursite.dev" />
      </div>
      <TextArea
        label={t('personal.summary')}
        value={data.summary}
        onChange={(e) => update('summary', e.currentTarget.value)}
        placeholder="A brief professional summary..."
        rows={6}
      />

      {/* Photo Crop Modal */}
      {cropState && (
        <PhotoCropModal
          cropState={cropState}
          onUpdateCrop={updateCrop}
          onApply={handleApplyCrop}
          onCancel={cancelCrop}
        />
      )}
    </FormSection>
  )
})
