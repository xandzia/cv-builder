import { memo } from 'react'
import { TEXT_DARK, TEXT_MED, TEXT_LIGHT } from '../../utils/color'
import type { Education } from '../../types/cv'
import { MainSectionTitle } from './CVSectionTitle'

interface Props {
  education: Education
  accent: string
}

export default memo(function CVEducationSection({ education, accent }: Props) {
  if (!education.degree && !education.institution) return null

  return (
    <div style={{ marginBottom: '14px' }}>
      <MainSectionTitle accent={accent}>Education</MainSectionTitle>
      <div style={{ fontWeight: 700, fontSize: '14px', color: TEXT_DARK }}>
        {education.degree}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: '12px', color: TEXT_MED }}>{education.institution}</span>
        <span style={{ fontSize: '10.5px', color: TEXT_LIGHT, fontStyle: 'italic' }}>
          {education.startDate}
          {education.endDate && ` - ${education.endDate}`}
        </span>
      </div>
      {education.description && (
        <p style={{ margin: '3px 0 0', color: TEXT_MED, fontSize: '12px' }}>
          {education.description}
        </p>
      )}
    </div>
  )
})
