import { useState, useMemo, useCallback } from 'react'
import type { ValidationErrors } from '../utils/validation'

export function useFormValidation(errors: ValidationErrors) {
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const markTouched = useCallback((field: string) => {
    setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }))
  }, [])

  const visibleErrors = useMemo(() => {
    const result: ValidationErrors = {}
    for (const key of Object.keys(errors)) {
      if (touched[key]) {
        result[key] = errors[key]
      }
    }
    return result
  }, [errors, touched])

  return { visibleErrors, markTouched }
}
