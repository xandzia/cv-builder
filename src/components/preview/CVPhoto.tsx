import { memo } from 'react'
import type { PhotoFilterType } from '../../types/cv'

interface Props {
  photo: string
  accent: string
  photoFilter: PhotoFilterType
}

export default memo(function CVPhoto({ photo, accent, photoFilter }: Props) {
  if (!photo) {
    return <div style={{ height: '24px' }} />
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '28px 0 20px' }}>
      <div
        style={{
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: `2px solid ${accent}`,
          position: 'relative',
        }}
      >
        <img
          src={photo}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: photoFilter !== 'none' ? 'grayscale(1)' : 'none',
          }}
        />
        {photoFilter === 'accent' && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: accent,
              opacity: 0.35,
              mixBlendMode: 'color' as const,
              borderRadius: '50%',
            }}
          />
        )}
      </div>
    </div>
  )
})
