import type { PersonalInfo } from '../types/cv'

export interface ValidationErrors {
  [field: string]: string | undefined
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validatePersonalInfo(data: PersonalInfo): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!data.fullName.trim()) {
    errors.fullName = 'Full name is required'
  }

  if (!data.jobTitle.trim()) {
    errors.jobTitle = 'Job title is required'
  }

  if (data.email && !EMAIL_RE.test(data.email)) {
    errors.email = 'Invalid email format'
  }

  return errors
}
