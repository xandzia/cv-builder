import { memo } from 'react'
import { TEXT_DARK, TEXT_MED, TEXT_LIGHT } from '../../utils/color'
import { formatDate } from '../../utils/format'
import type { WorkExperience } from '../../types/cv'
import { MainSectionTitle } from './CVSectionTitle'
import { BulletList } from './CVBulletList'

interface Props {
  experience: WorkExperience[]
  accent: string
}

export default memo(function CVExperienceSection({ experience, accent }: Props) {
  if (experience.length === 0 || !experience.some((e) => e.position || e.company)) return null

  return (
    <div style={{ marginBottom: '14px' }}>
      <MainSectionTitle accent={accent}>Work Experience</MainSectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {experience.map(
          (item) =>
            (item.position || item.company) && (
              <div key={item.id}>
                <div style={{ fontWeight: 700, fontSize: '14px', color: TEXT_DARK }}>
                  {item.position}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontSize: '12px', color: TEXT_MED }}>
                    {item.company}
                    {item.location && `, ${item.location}`}
                  </div>
                  <span style={{ fontSize: '10.5px', color: TEXT_LIGHT, whiteSpace: 'nowrap', fontStyle: 'italic' }}>
                    {formatDate(item.startDate)}
                    {(item.endDate || item.isCurrent) &&
                      ` - ${item.isCurrent ? 'Present' : formatDate(item.endDate)}`}
                  </span>
                </div>
                <BulletList accent={accent} items={item.bullets} />
              </div>
            )
        )}
      </div>
    </div>
  )
})
