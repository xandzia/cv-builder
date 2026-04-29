import { memo } from 'react'
import { TEXT_MED } from '../../utils/color'
import { MainSectionTitle } from './CVSectionTitle'

interface Props {
  certifications: string[]
  accent: string
}

export default memo(function CVCertificationsSection({ certifications, accent }: Props) {
  const filtered = certifications.filter(Boolean)
  if (filtered.length === 0) return null

  return (
    <div>
      <MainSectionTitle accent={accent}>Certifications</MainSectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {filtered.map((cert, i) => (
          <div key={i} style={{ fontSize: '12px', color: TEXT_MED }}>
            {cert}
          </div>
        ))}
      </div>
    </div>
  )
})
