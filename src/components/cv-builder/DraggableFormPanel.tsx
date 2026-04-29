import { GripVertical, X } from 'lucide-react'
import type { SectionId } from '../../config/cvSections'
import { SECTIONS } from '../../config/cvSections'
import { useI18n } from '../../hooks/useI18n'

interface Props {
  activeSection: SectionId
  panelPos: { x: number; y: number }
  width: number
  onDragStart: (e: React.MouseEvent) => void
  onResizeStart: (e: React.MouseEvent) => void
  onClose: () => void
  children: React.ReactNode
}

export default function DraggableFormPanel({ activeSection, panelPos, width, onDragStart, onResizeStart, onClose, children }: Props) {
  const { t } = useI18n()
  const section = SECTIONS.find((s) => s.id === activeSection)
  const title = section ? t(section.labelKey) : activeSection

  return (
    <div
      className="hidden md:block fixed z-50"
      role="dialog"
      aria-label="Edit section"
      style={{
        left: panelPos.x,
        top: panelPos.y,
        width,
        maxHeight: 'calc(100vh - 32px)',
      }}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 flex flex-col max-h-[inherit] relative">
        {/* Drag handle + close */}
        <div
          onMouseDown={onDragStart}
          className="flex items-center gap-2 px-4 py-2 cursor-grab active:cursor-grabbing border-b border-gray-100 shrink-0 select-none rounded-t-xl"
        >
          <GripVertical size={16} className="text-gray-400" />
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide flex-1">
            {title}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-0.5 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
            onMouseDown={(e) => e.stopPropagation()}
            aria-label="Close panel"
          >
            <X size={14} className="text-gray-400" />
          </button>
        </div>
        {/* Form content */}
        <div className="p-4 overflow-y-auto">
          {children}
        </div>
        {/* Resize handle */}
        <div
          onMouseDown={onResizeStart}
          className="absolute top-0 right-0 w-1 h-full cursor-ew-resize hover:bg-accent/20 transition-colors"
          style={{ borderRadius: '0 12px 12px 0' }}
        />
      </div>
    </div>
  )
}
