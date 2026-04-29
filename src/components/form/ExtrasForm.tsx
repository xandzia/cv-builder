import { memo } from 'react'
import { useI18n } from '../../hooks/useI18n'
import FormSection from './FormSection'

interface Props {
  certifications: string[]
  interests: string[]
  onCertificationsChange: (data: string[]) => void
  onInterestsChange: (data: string[]) => void
}

export default memo(function ExtrasForm({
  certifications,
  interests,
  onCertificationsChange,
  onInterestsChange,
}: Props) {
  const { t } = useI18n()

  return (
    <FormSection title={t('extras.title')}>
      <label className="block">
        <span className="block text-xs font-medium text-gray-500 mb-1">
          {t('extras.certifications')}
        </span>
        <textarea
          className="w-full rounded-md border border-cv-border px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-y min-h-[60px]"
          value={certifications.join('\n')}
          onChange={(e) =>
            onCertificationsChange(
              e.currentTarget.value
                .split('\n')
                .filter((l) => l.trim() !== '' || e.currentTarget.value.endsWith('\n'))
            )
          }
          rows={3}
        />
      </label>
      <label className="block">
        <span className="block text-xs font-medium text-gray-500 mb-1">
          {t('extras.interests')}
        </span>
        <input
          className="w-full rounded-md border border-cv-border px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
          value={interests.join(', ')}
          onChange={(e) =>
            onInterestsChange(
              e.currentTarget.value
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
        />
      </label>
    </FormSection>
  )
})
