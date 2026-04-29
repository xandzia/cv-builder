import { useState, useRef, useCallback } from 'react'

export function useDraggable(formWidth = 460, initialX = 196, initialY = 70) {
  const [panelPos, setPanelPos] = useState({ x: initialX, y: initialY })
  const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null)

  const onDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: panelPos.x,
      originY: panelPos.y,
    }

    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return
      const dx = ev.clientX - dragRef.current.startX
      const dy = ev.clientY - dragRef.current.startY
      const newX = dragRef.current.originX + dx
      const newY = dragRef.current.originY + dy
      const maxX = window.innerWidth - formWidth
      const maxY = window.innerHeight - 40
      setPanelPos({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      })
    }

    const onUp = () => {
      dragRef.current = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [panelPos, formWidth])

  return { panelPos, onDragStart }
}
