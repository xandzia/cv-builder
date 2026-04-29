import { useEffect } from 'react'
import { useI18n } from '../../hooks/useI18n'
import { useCVData } from '../../hooks/useCVData'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useDraggable } from '../../hooks/useDraggable'
import { usePreviewScale } from '../../hooks/usePreviewScale'
import { usePdfExport } from '../../hooks/usePdfExport'
import { useSectionVisibility } from '../../hooks/useSectionVisibility'
import { useResizable } from '../../hooks/useResizable'
import { DesktopSidebar, MobileTabs } from '../form/EditorSidebar'
import CVPreview from '../preview/CVPreview'
import AppHeader from './AppHeader'
import DraggableFormPanel from './DraggableFormPanel'
import SectionFormRenderer from './SectionFormRenderer'

export default function CVBuilderPage() {
  const {
    cv, update, accentColor, setAccentColor, photoFilter, setPhotoFilter,
    template, setTemplate,
    fillSample, clearAll,
    undo, redo, canUndo, canRedo,
  } = useCVData()
  const { activeSection, formOpen, handleSectionChange, closeForm } = useActiveSection()
  const { formWidth, onResizeStart } = useResizable()
  const { panelPos, onDragStart } = useDraggable(formWidth)
  const { desktopPreviewRef, mobilePreviewRef, desktopScale, mobileScale, A4_WIDTH, A4_HEIGHT } = usePreviewScale()
  const { exportPdf, exporting } = usePdfExport()
  const { visibility, toggle: toggleVisibility } = useSectionVisibility()
  const { t } = useI18n()

  // Ctrl+Z / Ctrl+Shift+Z keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault()
        if (e.shiftKey) {
          redo()
        } else {
          undo()
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault()
        redo()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [undo, redo])

  const formRenderer = (
    <SectionFormRenderer
      activeSection={activeSection}
      cv={cv}
      update={update}
      accentColor={accentColor}
      setAccentColor={setAccentColor}
      photoFilter={photoFilter}
      setPhotoFilter={setPhotoFilter}
      visibility={visibility}
      onToggleVisibility={toggleVisibility}
      template={template}
      setTemplate={setTemplate}
    />
  )

  return (
    <div className="min-h-screen bg-slate-100">
      <a
        href="#cv-preview"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
      >
        {t('app.skipToPreview')}
      </a>
      <AppHeader
        onExportPdf={() => exportPdf(cv.personal.fullName, cv.personal.jobTitle)}
        exporting={exporting}
        onFillSample={fillSample}
        onClearAll={clearAll}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />

      {/* ===== DESKTOP (md+) ===== */}
      <div className="hidden md:flex h-[calc(100vh-57px)]">
        <DesktopSidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          accentColor={accentColor}
        />

        <div ref={desktopPreviewRef} className="flex-1 relative flex items-center justify-center overflow-hidden">
          <div
            style={{
              transform: `scale(${desktopScale})`,
              transformOrigin: 'center center',
            }}
          >
            <div className="shadow-xl rounded-sm border border-gray-200 bg-white">
              <CVPreview data={cv} accentColor={accentColor} photoFilter={photoFilter} visibility={visibility} template={template} />
            </div>
          </div>
        </div>
      </div>

      {/* Form panel — draggable, fixed, above everything (desktop only) */}
      {formOpen && activeSection && (
        <DraggableFormPanel
          activeSection={activeSection}
          panelPos={panelPos}
          width={formWidth}
          onDragStart={onDragStart}
          onResizeStart={onResizeStart}
          onClose={closeForm}
        >
          {formRenderer}
        </DraggableFormPanel>
      )}

      {/* ===== MOBILE (<md) ===== */}
      <div className="md:hidden">
        <MobileTabs
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          accentColor={accentColor}
        />

        <div className="p-4">
          {formRenderer}
        </div>

        <div ref={mobilePreviewRef} className="px-4 pb-6">
          <p className="text-xs text-gray-400 text-center mb-2">Preview</p>
          <div
            className="overflow-hidden mx-auto"
            style={{
              width: A4_WIDTH * mobileScale,
              height: A4_HEIGHT * mobileScale,
            }}
          >
            <div
              style={{
                transform: `scale(${mobileScale})`,
                transformOrigin: 'top left',
              }}
            >
              <div className="shadow-xl rounded-sm border border-gray-200 bg-white">
                <CVPreview data={cv} accentColor={accentColor} photoFilter={photoFilter} visibility={visibility} template={template} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
