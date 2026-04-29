import { memo } from 'react'
import { TEXT_DARK, TEXT_MED, TEXT_LIGHT } from '../../utils/color'
import type { Education } from '../../types/cv'
import { MainSectionTitle } from './CVSectionTitle'

interface Props {
  education: Education[]
  accent: string
}

export default memo(function CVEducationSection({ education, accent }: Props) {
  const filled = education.filter((e) => e.degree || e.institution)
  if (filled.length === 0) return null

  return (
    <div style={{ marginBottom: '14px' }}>
      <MainSectionTitle accent={accent}>Education</MainSectionTitle>
      {filled.map((item) => (
        <div key={item.id} style={{ marginBottom: filled.length > 1 ? '8px' : 0 }}>
          <div style={{ fontWeight: 700, fontSize: '14px', color: TEXT_DARK }}>
            {item.degree}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: '12px', color: TEXT_MED }}>{item.institution}</span>
            <span style={{ fontSize: '10.5px', color: TEXT_LIGHT, fontStyle: 'italic' }}>
              {item.startDate}
              {item.endDate && ` - ${item.endDate}`}
            </span>
          </div>
          {item.description && (
            <p style={{ margin: '3px 0 0', color: TEXT_MED, fontSize: '12px' }}>
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )
})
