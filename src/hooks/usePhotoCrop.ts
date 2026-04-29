import { useState, useRef, useCallback } from 'react'

interface CropState {
  dataUrl: string
  x: number
  y: number
  size: number
  imgWidth: number
  imgHeight: number
}

export function usePhotoCrop() {
  const [cropState, setCropState] = useState<CropState | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startCrop = useCallback((dataUrl: string) => {
    const img = new Image()
    img.onload = () => {
      const minDim = Math.min(img.width, img.height)
      setCropState({
        dataUrl,
        x: (img.width - minDim) / 2,
        y: (img.height - minDim) / 2,
        size: minDim,
        imgWidth: img.width,
        imgHeight: img.height,
      })
    }
    img.src = dataUrl
  }, [])

  const updateCrop = useCallback((x: number, y: number, size: number) => {
    setCropState((prev) => prev ? { ...prev, x, y, size } : null)
  }, [])

  const applyCrop = useCallback((): Promise<string> => {
    return new Promise((resolve) => {
      if (!cropState) { resolve(''); return }
      const canvas = document.createElement('canvas')
      canvas.width = 300
      canvas.height = 300
      const ctx = canvas.getContext('2d')!
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, cropState.x, cropState.y, cropState.size, cropState.size, 0, 0, 300, 300)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.src = cropState.dataUrl
    })
  }, [cropState])

  const cancelCrop = useCallback(() => {
    setCropState(null)
  }, [])

  return { cropState, startCrop, updateCrop, applyCrop, cancelCrop, canvasRef }
}
