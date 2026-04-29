import { useRef, useCallback, useEffect, useState } from 'react'
import { useI18n } from '../../hooks/useI18n'

interface CropState {
  dataUrl: string
  x: number
  y: number
  size: number
  imgWidth: number
  imgHeight: number
}

interface Props {
  cropState: CropState
  onUpdateCrop: (x: number, y: number, size: number) => void
  onApply: () => void
  onCancel: () => void
}

const PREVIEW_SIZE = 300

export default function PhotoCropModal({ cropState, onUpdateCrop, onApply, onCancel }: Props) {
  const { t } = useI18n()
  const containerRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef<{ mx: number; my: number; ox: number; oy: number } | null>(null)

  // Scale to fit the image into preview area
  const scale = Math.min(PREVIEW_SIZE / cropState.imgWidth, PREVIEW_SIZE / cropState.imgHeight)
  const displayW = cropState.imgWidth * scale
  const displayH = cropState.imgHeight * scale

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setDragging(true)
    dragStart.current = {
      mx: e.clientX, my: e.clientY,
      ox: cropState.x, oy: cropState.y,
    }
  }, [cropState.x, cropState.y])

  useEffect(() => {
    if (!dragging) return
    const onMove = (e: MouseEvent) => {
      if (!dragStart.current) return
      const dx = (e.clientX - dragStart.current.mx) / scale
      const dy = (e.clientY - dragStart.current.my) / scale
      const newX = Math.max(0, Math.min(dragStart.current.ox + dx, cropState.imgWidth - cropState.size))
      const newY = Math.max(0, Math.min(dragStart.current.oy + dy, cropState.imgHeight - cropState.size))
      onUpdateCrop(newX, newY, cropState.size)
    }
    const onUp = () => {
      setDragging(false)
      dragStart.current = null
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [dragging, scale, cropState.imgWidth, cropState.imgHeight, cropState.size, onUpdateCrop])

  const handleSizeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value)
    const maxSize = Math.min(cropState.imgWidth, cropState.imgHeight)
    const size = Math.max(50, Math.min(newSize, maxSize))
    const x = Math.min(cropState.x, cropState.imgWidth - size)
    const y = Math.min(cropState.y, cropState.imgHeight - size)
    onUpdateCrop(Math.max(0, x), Math.max(0, y), size)
  }, [cropState, onUpdateCrop])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50" onClick={onCancel}>
      <div className="bg-white rounded-xl shadow-xl p-5 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-sm font-semibold text-gray-800 mb-3">{t('crop.title')}</h3>

        <div
          ref={containerRef}
          className="relative mx-auto overflow-hidden bg-gray-200 rounded-lg"
          style={{ width: displayW, height: displayH }}
        >
          <img
            src={cropState.dataUrl}
            alt=""
            style={{ width: displayW, height: displayH, display: 'block', opacity: 0.4 }}
            draggable={false}
          />
          {/* Crop selection overlay */}
          <div
            onMouseDown={handleMouseDown}
            style={{
              position: 'absolute',
              left: cropState.x * scale,
              top: cropState.y * scale,
              width: cropState.size * scale,
              height: cropState.size * scale,
              border: '2px dashed #5b6abf',
              borderRadius: '50%',
              cursor: 'move',
              backgroundImage: `url(${cropState.dataUrl})`,
              backgroundSize: `${displayW}px ${displayH}px`,
              backgroundPosition: `-${cropState.x * scale}px -${cropState.y * scale}px`,
            }}
          />
        </div>

        <div className="mt-3">
          <label className="text-xs text-gray-500">
            {t('crop.size')}
            <input
              type="range"
              min={50}
              max={Math.min(cropState.imgWidth, cropState.imgHeight)}
              value={cropState.size}
              onChange={handleSizeChange}
              className="w-full mt-1"
            />
          </label>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {t('crop.cancel')}
          </button>
          <button
            type="button"
            onClick={onApply}
            className="flex-1 py-2 text-sm text-white bg-accent rounded-lg hover:bg-accent-dark transition-colors cursor-pointer font-medium"
          >
            {t('crop.apply')}
          </button>
        </div>
      </div>
    </div>
  )
}
