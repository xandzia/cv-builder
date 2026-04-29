import { useMemo, memo } from 'react'
import type { CVData, PhotoFilterType, SectionVisibility } from '../../types/cv'
import type { TemplateId } from '../../types/templates'
import { deriveColors, TEXT_DARK } from '../../utils/color'
import TwoColumnPreview from './templates/TwoColumnPreview'
import SingleColumnPreview from './templates/SingleColumnPreview'
import MinimalPreview from './templates/MinimalPreview'

interface Props {
  data: CVData
  accentColor: string
  photoFilter: PhotoFilterType
  visibility?: SectionVisibility
  template?: TemplateId
}

const DEFAULT_VISIBILITY: SectionVisibility = {
  experience: true,
  projects: true,
  education: true,
  skills: true,
  languages: true,
  certifications: true,
  interests: true,
  contact: true,
  summary: true,
}

export default memo(function CVPreview({ data, accentColor, photoFilter, visibility = DEFAULT_VISIBILITY, template = 'two-column' }: Props) {
  const colors = useMemo(() => deriveColors(accentColor), [accentColor])

  const templateProps = { data, photoFilter, colors, visibility }

  return (
    <div
      className="cv-preview"
      id="cv-preview"
      style={{
        display: 'flex',
        fontSize: '13px',
        lineHeight: 1.5,
        color: TEXT_DARK,
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: 'hidden',
        height: '297mm',
        maxHeight: '297mm',
        padding: '10px',
        boxSizing: 'border-box' as const,
        backgroundColor: 'white',
      }}
    >
      {template === 'two-column' && <TwoColumnPreview {...templateProps} />}
      {template === 'single-column' && <SingleColumnPreview {...templateProps} />}
      {template === 'minimal' && <MinimalPreview {...templateProps} />}
    </div>
  )
})
