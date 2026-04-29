import { useState, useRef, useEffect, useCallback } from 'react'

const A4_WIDTH = 794
const A4_HEIGHT = 1123

export function usePreviewScale() {
  const desktopPreviewRef = useRef<HTMLDivElement>(null)
  const mobilePreviewRef = useRef<HTMLDivElement>(null)
  const [desktopScale, setDesktopScale] = useState(0.6)
  const [mobileScale, setMobileScale] = useState(0.4)

  const updateScales = useCallback(() => {
    if (desktopPreviewRef.current) {
      const rect = desktopPreviewRef.current.getBoundingClientRect()
      const padX = 40
      const padY = 40
      const scaleX = (rect.width - padX) / A4_WIDTH
      const scaleY = (rect.height - padY) / A4_HEIGHT
      setDesktopScale(Math.min(scaleX, scaleY, 1))
    }
    if (mobilePreviewRef.current) {
      const w = mobilePreviewRef.current.offsetWidth - 32
      setMobileScale(Math.min(w / A4_WIDTH, 0.6))
    }
  }, [])

  useEffect(() => {
    updateScales()
    window.addEventListener('resize', updateScales)
    return () => window.removeEventListener('resize', updateScales)
  }, [updateScales])

  return { desktopPreviewRef, mobilePreviewRef, desktopScale, mobileScale, A4_WIDTH, A4_HEIGHT }
}
