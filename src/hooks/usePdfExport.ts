import { useCallback, useState } from 'react'

function toFileName(value: string): string {
  return value.replace(/\s+/g, '').replace(/[^a-zA-Z0-9_-]/g, '')
}

export function usePdfExport() {
  const [exporting, setExporting] = useState(false)

  const exportPdf = useCallback(async (fullName: string, jobTitle: string) => {
    setExporting(true)
    try {
      const element = document.getElementById('cv-preview')
      if (!element) throw new Error('CV preview element not found')

      const namePart = toFileName(fullName) || 'cv'
      const titlePart = toFileName(jobTitle)
      const pdfName = titlePart ? `${namePart}_${titlePart}_cv.pdf` : `${namePart}_cv.pdf`

      const { toPng } = await import('html-to-image')
      const { jsPDF } = await import('jspdf')

      const dataUrl = await toPng(element, {
        pixelRatio: 2,
        cacheBust: true,
        skipFonts: true,
        fetchRequestInit: { mode: 'cors' } as RequestInit,
        filter: (node: HTMLElement) => {
          // Skip images that might cause CORS issues during export
          if (node.tagName === 'IMG') {
            const src = (node as HTMLImageElement).src
            if (src && !src.startsWith('data:') && !src.startsWith(window.location.origin)) {
              return false
            }
          }
          return true
        },
      })

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const pageWidth = 210
      const pageHeight = 297

      pdf.addImage(dataUrl, 'PNG', 0, 0, pageWidth, pageHeight)
      pdf.save(pdfName)
    } catch (err) {
      console.error('PDF export failed:', err)
    } finally {
      setExporting(false)
    }
  }, [])

  return { exportPdf, exporting }
}
