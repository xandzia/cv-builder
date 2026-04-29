import type { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
}

export default function FormSection({ title, children }: Props) {
  return (
    <div className="border border-cv-border rounded-lg bg-white">
      <div className="px-5 py-3 font-semibold text-gray-800">
        {title}
      </div>
      <div className="px-5 pb-5 pt-2 space-y-3 border-t border-cv-border">{children}</div>
    </div>
  )
}
