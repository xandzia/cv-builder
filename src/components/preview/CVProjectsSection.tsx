import { memo } from 'react'
import { TEXT_DARK, TEXT_LIGHT } from '../../utils/color'
import { toHref } from '../../utils/format'
import type { Project } from '../../types/cv'
import { MainSectionTitle } from './CVSectionTitle'
import { BulletList } from './CVBulletList'

interface Props {
  projects: Project[]
  accent: string
  accentLight: string
}

export default memo(function CVProjectsSection({ projects, accent, accentLight }: Props) {
  if (projects.length === 0 || !projects.some((p) => p.name)) return null

  return (
    <div style={{ marginBottom: '14px' }}>
      <MainSectionTitle accent={accent}>Projects</MainSectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {projects.map(
          (item) =>
            item.name && (
              <div key={item.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: TEXT_DARK }}>
                      {item.name}
                    </span>
                    {item.techStack && (
                      <span style={{ color: TEXT_LIGHT, fontStyle: 'italic', fontSize: '11.5px' }}>
                        {' '}&mdash; {item.techStack}
                      </span>
                    )}
                  </div>
                  {item.link && (
                    <a
                      href={toHref(item.link)}
                      style={{ fontSize: '10.5px', color: accentLight, whiteSpace: 'nowrap', marginLeft: '8px', textDecoration: 'none' }}
                    >
                      {item.link}
                    </a>
                  )}
                </div>
                <BulletList accent={accent} items={item.bullets} />
              </div>
            )
        )}
      </div>
    </div>
  )
})
