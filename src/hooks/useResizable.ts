import { useState, useRef, useCallback } from 'react'

const MIN_WIDTH = 320
const MAX_WIDTH = 700
const DEFAULT_WIDTH = 460

export function useResizable() {
  const [formWidth, setFormWidth] = useState(DEFAULT_WIDTH)
  const resizeRef = useRef<{ startX: number; startWidth: number } | null>(null)

  const onResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    resizeRef.current = { startX: e.clientX, startWidth: formWidth }

    const onMove = (ev: MouseEvent) => {
      if (!resizeRef.current) return
      const dx = ev.clientX - resizeRef.current.startX
      const newWidth = resizeRef.current.startWidth + dx
      setFormWidth(Math.max(MIN_WIDTH, Math.min(newWidth, MAX_WIDTH)))
    }

    const onUp = () => {
      resizeRef.current = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [formWidth])

  return { formWidth, onResizeStart }
}
