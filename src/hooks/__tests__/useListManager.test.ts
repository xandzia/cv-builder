import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useListManager } from '../useListManager'

interface TestItem {
  id: string
  name: string
  value: number
}

describe('useListManager', () => {
  const makeItems = (): TestItem[] => [
    { id: '1', name: 'first', value: 10 },
    { id: '2', name: 'second', value: 20 },
  ]

  describe('addItem', () => {
    it('adds an item with a generated id', () => {
      const onChange = vi.fn()
      const { result } = renderHook(() =>
        useListManager(makeItems(), onChange),
      )

      act(() => {
        result.current.addItem({ name: 'third', value: 30 })
      })

      expect(onChange).toHaveBeenCalledOnce()
      const newItems = onChange.mock.calls[0][0] as TestItem[]
      expect(newItems).toHaveLength(3)
      expect(newItems[2].name).toBe('third')
      expect(newItems[2].value).toBe(30)
      expect(newItems[2].id).toBeTruthy()
    })

    it('preserves existing items', () => {
      const onChange = vi.fn()
      const items = makeItems()
      const { result } = renderHook(() => useListManager(items, onChange))

      act(() => {
        result.current.addItem({ name: 'third', value: 30 })
      })

      const newItems = onChange.mock.calls[0][0] as TestItem[]
      expect(newItems[0]).toEqual(items[0])
      expect(newItems[1]).toEqual(items[1])
    })
  })

  describe('removeItem', () => {
    it('removes by index', () => {
      const onChange = vi.fn()
      const { result } = renderHook(() =>
        useListManager(makeItems(), onChange),
      )

      act(() => {
        result.current.removeItem(0)
      })

      const newItems = onChange.mock.calls[0][0] as TestItem[]
      expect(newItems).toHaveLength(1)
      expect(newItems[0].name).toBe('second')
    })

    it('removes from single-item list', () => {
      const onChange = vi.fn()
      const { result } = renderHook(() =>
        useListManager([{ id: '1', name: 'only', value: 1 }], onChange),
      )

      act(() => {
        result.current.removeItem(0)
      })

      const newItems = onChange.mock.calls[0][0] as TestItem[]
      expect(newItems).toHaveLength(0)
    })
  })

  describe('updateItem', () => {
    it('updates a single field', () => {
      const onChange = vi.fn()
      const { result } = renderHook(() =>
        useListManager(makeItems(), onChange),
      )

      act(() => {
        result.current.updateItem(1, 'name', 'updated')
      })

      const newItems = onChange.mock.calls[0][0] as TestItem[]
      expect(newItems[1].name).toBe('updated')
      expect(newItems[1].value).toBe(20)
      expect(newItems[1].id).toBe('2')
    })

    it('does not affect other items', () => {
      const onChange = vi.fn()
      const items = makeItems()
      const { result } = renderHook(() => useListManager(items, onChange))

      act(() => {
        result.current.updateItem(1, 'name', 'updated')
      })

      const newItems = onChange.mock.calls[0][0] as TestItem[]
      expect(newItems[0]).toEqual(items[0])
    })
  })

  describe('reorder', () => {
    it('moves an item forward', () => {
      const onChange = vi.fn()
      const items: TestItem[] = [
        { id: '1', name: 'first', value: 10 },
        { id: '2', name: 'second', value: 20 },
        { id: '3', name: 'third', value: 30 },
      ]
      const { result } = renderHook(() => useListManager(items, onChange))

      act(() => {
        result.current.reorder(0, 2)
      })

      const newItems = onChange.mock.calls[0][0] as TestItem[]
      expect(newItems.map((i) => i.name)).toEqual(['second', 'third', 'first'])
    })

    it('moves an item backward', () => {
      const onChange = vi.fn()
      const items: TestItem[] = [
        { id: '1', name: 'first', value: 10 },
        { id: '2', name: 'second', value: 20 },
        { id: '3', name: 'third', value: 30 },
      ]
      const { result } = renderHook(() => useListManager(items, onChange))

      act(() => {
        result.current.reorder(2, 0)
      })

      const newItems = onChange.mock.calls[0][0] as TestItem[]
      expect(newItems.map((i) => i.name)).toEqual(['third', 'first', 'second'])
    })

    it('preserves all items after reorder', () => {
      const onChange = vi.fn()
      const items = makeItems()
      const { result } = renderHook(() => useListManager(items, onChange))

      act(() => {
        result.current.reorder(0, 1)
      })

      const newItems = onChange.mock.calls[0][0] as TestItem[]
      expect(newItems).toHaveLength(2)
      expect(newItems.map((i) => i.id).sort()).toEqual(['1', '2'])
    })
  })
})
