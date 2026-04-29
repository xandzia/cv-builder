import { describe, it, expect } from 'vitest'
import { validatePersonalInfo } from '../validation'
import type { PersonalInfo } from '../../types/cv'

function makePersonal(overrides: Partial<PersonalInfo> = {}): PersonalInfo {
  return {
    fullName: 'Anna Stepashko',
    jobTitle: 'Frontend Developer',
    location: 'Kyiv, Ukraine',
    email: 'anna@example.com',
    phone: '+380991234567',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: '',
    photo: '',
    ...overrides,
  }
}

describe('validatePersonalInfo', () => {
  it('returns no errors for valid data', () => {
    const errors = validatePersonalInfo(makePersonal())
    expect(Object.keys(errors)).toHaveLength(0)
  })

  it('returns error when fullName is empty', () => {
    const errors = validatePersonalInfo(makePersonal({ fullName: '' }))
    expect(errors.fullName).toBeDefined()
  })

  it('returns error when fullName is whitespace only', () => {
    const errors = validatePersonalInfo(makePersonal({ fullName: '   ' }))
    expect(errors.fullName).toBeDefined()
  })

  it('returns error when jobTitle is empty', () => {
    const errors = validatePersonalInfo(makePersonal({ jobTitle: '' }))
    expect(errors.jobTitle).toBeDefined()
  })

  it('returns error when jobTitle is whitespace only', () => {
    const errors = validatePersonalInfo(makePersonal({ jobTitle: '  \t  ' }))
    expect(errors.jobTitle).toBeDefined()
  })

  it('returns error for invalid email format', () => {
    const errors = validatePersonalInfo(makePersonal({ email: 'not-an-email' }))
    expect(errors.email).toBeDefined()
  })

  it('returns error for email missing domain', () => {
    const errors = validatePersonalInfo(makePersonal({ email: 'user@' }))
    expect(errors.email).toBeDefined()
  })

  it('allows empty email (optional field)', () => {
    const errors = validatePersonalInfo(makePersonal({ email: '' }))
    expect(errors.email).toBeUndefined()
  })

  it('accepts valid email formats', () => {
    const validEmails = ['user@mail.com', 'a.b@c.co', 'test+tag@example.org']
    for (const email of validEmails) {
      const errors = validatePersonalInfo(makePersonal({ email }))
      expect(errors.email).toBeUndefined()
    }
  })

  it('returns multiple errors at once', () => {
    const errors = validatePersonalInfo(makePersonal({
      fullName: '',
      jobTitle: '',
      email: 'bad',
    }))
    expect(errors.fullName).toBeDefined()
    expect(errors.jobTitle).toBeDefined()
    expect(errors.email).toBeDefined()
  })
})
