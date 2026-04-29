interface TitleProps {
  children: React.ReactNode
  accent: string
}

export function SidebarSectionTitle({ children, accent }: TitleProps) {
  return (
    <h3
      style={{
        fontSize: '14px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '1.2px',
        color: accent,
        margin: '0 0 7px 0',
      }}
    >
      {children}
    </h3>
  )
}

export function MainSectionTitle({ children, accent }: TitleProps) {
  return (
    <div style={{ marginBottom: '7px' }}>
      <h3
        style={{
          fontSize: '14px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          color: accent,
          margin: 0,
          paddingBottom: '4px',
          borderBottom: `1px solid ${accent}38`,
        }}
      >
        {children}
      </h3>
    </div>
  )
}
