import { describe, it, expect } from 'vitest'
import { getTranslations, LOCALE_LABELS } from '../index'
import type { Locale, Translations } from '../types'
import { en } from '../en'
import { uk } from '../uk'
import { de } from '../de'
import { ru } from '../ru'

const ALL_LOCALES: Locale[] = ['en', 'uk', 'de', 'ru']
const ALL_TRANSLATIONS: Record<Locale, Translations> = { en, uk, de, ru }

describe('i18n', () => {
  it('getTranslations returns correct locale object', () => {
    expect(getTranslations('en')).toBe(en)
    expect(getTranslations('uk')).toBe(uk)
    expect(getTranslations('de')).toBe(de)
    expect(getTranslations('ru')).toBe(ru)
  })

  it('LOCALE_LABELS has entries for all locales', () => {
    for (const locale of ALL_LOCALES) {
      expect(LOCALE_LABELS[locale]).toBeDefined()
      expect(LOCALE_LABELS[locale].length).toBeGreaterThan(0)
    }
  })

  it('all locales have the same set of keys as English', () => {
    const enKeys = Object.keys(en).sort()

    for (const locale of ALL_LOCALES) {
      const localeKeys = Object.keys(ALL_TRANSLATIONS[locale]).sort()
      expect(localeKeys).toEqual(enKeys)
    }
  })

  it('no translation value is empty string', () => {
    for (const locale of ALL_LOCALES) {
      const translations = ALL_TRANSLATIONS[locale]
      for (const [key, value] of Object.entries(translations)) {
        expect(value.length, `${locale}.${key} is empty`).toBeGreaterThan(0)
      }
    }
  })

  it('all locales have non-empty labels in LOCALE_LABELS', () => {
    for (const locale of ALL_LOCALES) {
      expect(LOCALE_LABELS[locale]).toMatch(/^[A-Z]{2}$/)
    }
  })

  describe('English translations', () => {
    it('has correct app title', () => {
      expect(en['app.title']).toBe('CV Builder')
    })

    it('has all section keys', () => {
      expect(en['section.style']).toBe('Style')
      expect(en['section.personal']).toBe('Personal')
      expect(en['section.experience']).toBe('Experience')
    })
  })

  describe('Ukrainian translations', () => {
    it('has correct app title', () => {
      expect(uk['app.title']).toBe('CV Конструктор')
    })
  })

  describe('German translations', () => {
    it('has correct app title', () => {
      expect(de['app.title']).toBe('CV Builder')
    })
  })

  describe('Russian translations', () => {
    it('has correct app title', () => {
      expect(ru['app.title']).toBe('CV Конструктор')
    })

    it('has correct section labels', () => {
      expect(ru['section.personal']).toBe('Личное')
      expect(ru['section.experience']).toBe('Опыт')
      expect(ru['section.education']).toBe('Образование')
    })
  })
})
