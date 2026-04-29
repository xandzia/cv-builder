import { memo } from 'react'
import type { PersonalInfo } from '../../types/cv'

function HoneycombPattern({
  width,
  height,
  hexSize = 18,
  stroke = 'rgba(255,255,255,0.12)',
  strokeWidth = 1,
  style,
}: {
  width: number
  height: number
  hexSize?: number
  stroke?: string
  strokeWidth?: number
  style?: React.CSSProperties
}) {
  const s = hexSize
  const h = s * Math.sqrt(3)
  const paths: string[] = []

  const cols = Math.ceil(width / h) + 2
  const rows = Math.ceil(height / (s * 1.5)) + 2

  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      const cx = col * h + (row % 2 !== 0 ? h / 2 : 0)
      const cy = row * s * 1.5
      const pts = []
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 180) * (60 * i - 30)
        pts.push(`${cx + s * Math.cos(angle)},${cy + s * Math.sin(angle)}`)
      }
      paths.push(`M${pts.join('L')}Z`)
    }
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <path d={paths.join(' ')} fill="none" stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  )
}

interface Props {
  personal: PersonalInfo
  accent: string
  showSummary?: boolean
}

export default memo(function CVHeaderBanner({ personal, accent, showSummary = true }: Props) {
  return (
    <div
      style={{
        backgroundColor: accent,
        color: 'white',
        padding: '16px 24px 12px',
        borderRadius: '0 6px 0 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <HoneycombPattern
        width={320}
        height={200}
        hexSize={22}
        stroke="rgba(255,255,255,0.03)"
        strokeWidth={1}
        style={{ top: -20, right: -30 }}
      />
      <h1
        style={{
          fontSize: '26px',
          fontWeight: 700,
          margin: 0,
          color: 'white',
          letterSpacing: '-0.3px',
        }}
      >
        {personal.fullName || 'Your Name'}
      </h1>
      <p
        style={{
          fontSize: '14px',
          fontWeight: 500,
          margin: '2px 0 0',
          color: 'rgba(255,255,255,0.85)',
        }}
      >
        {personal.jobTitle || 'Job Title'}
      </p>
      {showSummary && personal.summary && (
        <p
          style={{
            fontSize: '11px',
            margin: '6px 0 0',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.45,
          }}
        >
          {personal.summary}
        </p>
      )}
    </div>
  )
})
