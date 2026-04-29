import { TEXT_MED } from '../../utils/color'

export function Bullet({ accent }: { accent: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '6px',
        height: '6px',
        border: `1.2px solid ${accent}66`,
        backgroundColor: 'white',
        borderRadius: '1px',
        flexShrink: 0,
        marginTop: '6px',
      }}
    />
  )
}

export function BulletList({ items, accent, fontSize = '12px' }: { items: string[]; accent: string; fontSize?: string }) {
  const filtered = items.filter(Boolean)
  if (filtered.length === 0) return null
  return (
    <div style={{ margin: '3px 0 0', display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {filtered.map((text, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <Bullet accent={accent} />
          <span style={{ color: TEXT_MED, fontSize, lineHeight: 1.5, flex: 1 }}>{text}</span>
        </div>
      ))}
    </div>
  )
}
