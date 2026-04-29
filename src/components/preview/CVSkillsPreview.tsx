import { memo } from 'react'
import { TEXT_DARK } from '../../utils/color'
import type { SkillGroup } from '../../types/cv'
import { SidebarSectionTitle } from './CVSectionTitle'

interface Props {
  skillGroups: SkillGroup[]
  accent: string
}

export default memo(function CVSkillsPreview({ skillGroups, accent }: Props) {
  if (!skillGroups.some((g) => g.skills.length > 0)) return null

  return (
    <div style={{ marginBottom: '18px' }}>
      <SidebarSectionTitle accent={accent}>Tech Stack</SidebarSectionTitle>
      {skillGroups.map(
        (group, i) =>
          group.skills.length > 0 && (
            <div key={i} style={{ marginBottom: '8px' }}>
              <div style={{ fontWeight: 600, fontSize: '12px', color: TEXT_DARK, marginBottom: '4px' }}>
                {group.label}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {group.skills.map((skill, j) => (
                  <span
                    key={j}
                    style={{
                      display: 'inline-block',
                      padding: '3.5px 7px',
                      fontSize: '10.5px',
                      lineHeight: 1,
                      backgroundColor: `${accent}0F`,
                      color: accent,
                      borderRadius: '3px',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  )
})
