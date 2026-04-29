import { useCallback, useState } from 'react'

function toFileName(value: string): string {
  return value.replace(/\s+/g, '').replace(/[^a-zA-Z0-9_-]/g, '')
}

/** Convert all external <img> inside an element to inline base64 to avoid CORS issues */
async function inlineExternalImages(root: HTMLElement): Promise<() => void> {
  const images = root.querySelectorAll('img')
  const originals: { img: HTMLImageElement; src: string }[] = []

  await Promise.all(
    Array.from(images).map(async (img) => {
      const src = img.src
      if (!src || src.startsWith('data:') || src.startsWith(window.location.origin)) return

      try {
        const resp = await fetch(src, { mode: 'cors' })
        const blob = await resp.blob()
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(blob)
        })
        originals.push({ img, src })
        img.src = dataUrl
      } catch {
        // If fetch fails, leave the image as-is
      }
    }),
  )

  // Return a cleanup function that restores original src attributes
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

      // Inline external images as base64 before capture
      restore = await inlineExternalImages(element)

      const { toPng } = await import('html-to-image')
      const { jsPDF } = await import('jspdf')

      const dataUrl = await toPng(element, {
        pixelRatio: 2,
        cacheBust: true,
        skipFonts: true,
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
