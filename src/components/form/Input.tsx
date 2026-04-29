import { useId, type InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export default function Input({ label, error, className = '', ...rest }: Props) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-500 mb-1">
        {label}
        {rest.required && <span className="text-red-400 ml-0.5">*</span>}
      </span>
      <input
        id={id}
        aria-required={rest.required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-md border px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-1 outline-none transition-colors ${
          error
            ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
            : 'border-cv-border focus:border-accent focus:ring-accent'
        } ${className}`}
        {...rest}
      />
      {error && (
        <span id={errorId} className="block text-xs text-red-500 mt-0.5" role="alert">
          {error}
        </span>
      )}
    </label>
  )
}
