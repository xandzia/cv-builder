import type { Locale, Translations } from './types'
import { en } from './en'
import { uk } from './uk'
import { de } from './de'
import { ru } from './ru'

export type { Locale, Translations }

const locales: Record<Locale, Translations> = { en, uk, de, ru }

export function getTranslations(locale: Locale): Translations {
  return locales[locale]
}

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  uk: 'UK',
  de: 'DE',
  ru: 'RU',
}
