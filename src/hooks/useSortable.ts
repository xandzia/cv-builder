import { useState, useCallback, useRef } from 'react'

export function useSortable(onReorder: (from: number, to: number) => void) {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const dragIndex = useRef<number | null>(null)

  const onDragStart = useCallback((index: number) => (e: React.DragEvent) => {
    dragIndex.current = index
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(index))
  }, [])

  const onDragOver = useCallback((index: number) => (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverIndex(index)
  }, [])

  const onDrop = useCallback((index: number) => (e: React.DragEvent) => {
    e.preventDefault()
    const fromIndex = dragIndex.current
    if (fromIndex !== null && fromIndex !== index) {
      onReorder(fromIndex, index)
    }
    dragIndex.current = null
    setDragOverIndex(null)
  }, [onReorder])

  const onDragEnd = useCallback(() => {
    dragIndex.current = null
    setDragOverIndex(null)
  }, [])

  return {
    dragOverIndex,
    getDragProps: (index: number) => ({
      draggable: true,
      onDragStart: onDragStart(index),
      onDragOver: onDragOver(index),
      onDrop: onDrop(index),
      onDragEnd,
    }),
  }
}
