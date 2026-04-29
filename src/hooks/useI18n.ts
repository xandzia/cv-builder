import { createContext, useContext, useCallback } from 'react'
import type { Locale, Translations } from '../i18n/types'
import { getTranslations } from '../i18n'

export interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: keyof Translations) => string
}

export const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
})

export function useI18n(): I18nContextValue {
  return useContext(I18nContext)
}

export function useI18nValue(locale: Locale, setLocale: (locale: Locale) => void): I18nContextValue {
  const translations = getTranslations(locale)
  const t = useCallback((key: keyof Translations) => translations[key] ?? key, [translations])
  return { locale, setLocale, t }
}
