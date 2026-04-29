import { memo } from 'react'
import { TEXT_MED } from '../../utils/color'
import { SidebarSectionTitle } from './CVSectionTitle'

interface Props {
  interests: string[]
  accent: string
}

export default memo(function CVInterestsPreview({ interests, accent }: Props) {
  const filtered = interests.filter(Boolean)
  if (filtered.length === 0) return null

  return (
    <div>
      <SidebarSectionTitle accent={accent}>Interests</SidebarSectionTitle>
      <div>
        {filtered.map((interest, i) => (
          <div
            key={i}
            style={{
              marginBottom: '4px',
              borderRadius: '4px',
              backgroundColor: `${accent}07`,
            }}
          >
            <div style={{ height: '6px', overflow: 'hidden' }} />
            <div style={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '11px', lineHeight: 1, color: TEXT_MED }}>
              {interest}
            </div>
            <div style={{ height: '6px', overflow: 'hidden' }} />
          </div>
        ))}
      </div>
    </div>
  )
})
