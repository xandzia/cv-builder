import { nextId } from '../utils/id'

export function useListManager<T extends { id: string }>(
  items: T[],
  onChange: (items: T[]) => void,
) {
  const updateItem = (index: number, field: keyof T, value: unknown) => {
    const updated = [...items]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const addItem = (template: Omit<T, 'id'>) => {
    onChange([...items, { ...template, id: nextId() } as T])
  }

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index))
  }

  const reorder = (fromIndex: number, toIndex: number) => {
    const updated = [...items]
    const [moved] = updated.splice(fromIndex, 1)
    updated.splice(toIndex, 0, moved)
    onChange(updated)
  }

  return { updateItem, addItem, removeItem, reorder }
}
