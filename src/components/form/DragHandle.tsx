import { GripVertical } from 'lucide-react'

export default function DragHandle() {
  return (
    <span className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-500 flex-shrink-0" title="Drag to reorder">
      <GripVertical size={14} />
    </span>
  )
}
