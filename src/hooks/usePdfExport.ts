import { useCallback, useState } from 'react'
import { slugify } from '../utils/slugify'

export function usePdfExport() {
  const [exporting, setExporting] = useState(false)

  const exportPdf = useCallback(async (fileName: string) => {
    setExporting(true)
    try {
      const element = document.getElementById('cv-preview')
      if (!element) throw new Error('CV preview element not found')

      const pdfName = `${slugify(fileName) || 'cv'}-cv.pdf`

      // Use html-to-image (SVG foreignObject) for pixel-perfect CSS rendering
      const { toPng } = await import('html-to-image')
      const { jsPDF } = await import('jspdf')

      // Render the element as a PNG using SVG foreignObject approach
      // This preserves CSS rendering exactly as the browser shows it
      const dataUrl = await toPng(element, {
        pixelRatio: 2,
        cacheBust: true,
      })

      // Create a single-page PDF sized exactly to A4
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const pageWidth = 210 // A4 mm
      const pageHeight = 297 // A4 mm

      pdf.addImage(dataUrl, 'PNG', 0, 0, pageWidth, pageHeight)
      pdf.save(pdfName)
    } finally {
      setExporting(false)
    }
  }, [])

  return { exportPdf, exporting }
}
