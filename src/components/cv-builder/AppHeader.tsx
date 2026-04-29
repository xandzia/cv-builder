import { Undo2, Redo2 } from 'lucide-react'
import { useI18n } from '../../hooks/useI18n'
import LanguageSwitcher from '../form/LanguageSwitcher'

interface Props {
  onExportPdf: () => void
  exporting: boolean
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
}

export default function AppHeader({ onExportPdf, exporting, onUndo, onRedo, canUndo, canRedo }: Props) {
  const { t } = useI18n()

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-cv-border shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-gray-800 tracking-tight">
            <span className="text-accent">CV</span> Builder
          </h1>
          <LanguageSwitcher />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-default transition-colors cursor-pointer"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 size={16} />
          </button>
          <button
            type="button"
            onClick={onRedo}
            disabled={!canRedo}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-default transition-colors cursor-pointer"
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 size={16} />
          </button>
          <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block" />
          <button
            onClick={onExportPdf}
            disabled={exporting}
            className="px-5 py-2 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-dark disabled:opacity-50 transition-colors shadow-sm cursor-pointer disabled:cursor-wait"
          >
            {exporting ? t('app.generatingPdf') : t('app.downloadPdf')}
          </button>
        </div>
      </div>
    </header>
  )
}
