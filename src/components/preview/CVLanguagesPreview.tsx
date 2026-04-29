import { memo } from 'react'
import { TEXT_DARK } from '../../utils/color'
import type { Language } from '../../types/cv'
import { SidebarSectionTitle } from './CVSectionTitle'

interface Props {
  languages: Language[]
  accent: string
  accentLight: string
}

export default memo(function CVLanguagesPreview({ languages, accent, accentLight }: Props) {
  if (languages.length === 0 || !languages.some((l) => l.language)) return null

  return (
    <div style={{ marginBottom: '18px' }}>
      <SidebarSectionTitle accent={accent}>Languages</SidebarSectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {languages.map(
          (item) =>
            item.language && (
              <div key={item.id}>
                <span style={{ fontWeight: 600, fontSize: '13px', color: TEXT_DARK }}>
                  {item.language}
                </span>
                {item.level && (
                  <span style={{ fontSize: '11.5px', color: accentLight, fontStyle: 'italic', marginLeft: '5px' }}>
                    — {item.level}
                  </span>
                )}
              </div>
            )
        )}
      </div>
    </div>
  )
})
