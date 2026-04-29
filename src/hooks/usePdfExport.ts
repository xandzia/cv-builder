import { useCallback, useState } from 'react'

function toFileName(value: string): string {
  return value.replace(/\s+/g, '').replace(/[^a-zA-Z0-9_-]/g, '')
}

/**
 * Before PDF capture, handle external images:
 * - Try to convert to base64 via fetch
 * - If CORS blocks the fetch, temporarily blank the src so html-to-image doesn't fail
 * - Returns a restore function to put original src values back
 */
async function prepareImages(root: HTMLElement): Promise<() => void> {
  const images = root.querySelectorAll('img')
  const originals: { img: HTMLImageElement; src: string }[] = []

  await Promise.all(
    Array.from(images).map(async (img) => {
      const src = img.src
      if (!src || src.startsWith('data:')) return

      // Same-origin images are fine
      try {
        const url = new URL(src)
        if (url.origin === window.location.origin) return
      } catch {
        return
      }

      originals.push({ img, src })

      try {
        const resp = await fetch(src, { mode: 'cors' })
        const blob = await resp.blob()
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(blob)
        })
        img.src = dataUrl
      } catch {
        // CORS blocked — replace with transparent 1x1 pixel so html-to-image doesn't choke
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      }
    }),
  )

  return () => {
    for (const { img, src } of originals) {
      img.src = src
    }
  }
}

export function usePdfExport() {
  const [exporting, setExporting] = useState(false)

  const exportPdf = useCallback(async (fullName: string, jobTitle: string) => {
    setExporting(true)
    let restore: (() => void) | null = null
    try {
      const element = document.getElementById('cv-preview')
      if (!element) throw new Error('CV preview element not found')

      const namePart = toFileName(fullName) || 'cv'
      const titlePart = toFileName(jobTitle)
      const pdfName = titlePart ? `${namePart}_${titlePart}_cv.pdf` : `${namePart}_cv.pdf`

      restore = await prepareImages(element)

      const { toPng } = await import('html-to-image')
      const { jsPDF } = await import('jspdf')

      const dataUrl = await toPng(element, {
        pixelRatio: 3,
      })

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297)
      pdf.save(pdfName)
    } catch (err) {
      console.error('PDF export failed:', err)
    } finally {
      restore?.()
      setExporting(false)
    }
  }, [])

  return { exportPdf, exporting }
}
