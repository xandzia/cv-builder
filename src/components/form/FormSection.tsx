import type { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export default function FormSection({ title, children, defaultOpen = true }: Props) {
  return (
    <details open={defaultOpen} className="group border border-cv-border rounded-lg bg-white">
      <summary className="cursor-pointer select-none px-5 py-3 font-semibold text-gray-800 hover:bg-gray-50 rounded-lg transition-colors">
        <span className="ml-1">{title}</span>
      </summary>
      <div className="px-5 pb-5 pt-2 space-y-3 border-t border-cv-border">{children}</div>
    </details>
  )
}
