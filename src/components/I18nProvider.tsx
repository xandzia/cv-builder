import { useState, type ReactNode } from 'react'
import type { Locale } from '../i18n'
import { I18nContext, useI18nValue } from '../hooks/useI18n'

function loadLocale(): Locale {
  try {
    const raw = localStorage.getItem('cv-builder-locale')
    if (raw === 'uk' || raw === 'de' || raw === 'ru') return raw
  } catch { /* ignore */ }
  return 'en'
}

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(loadLocale)

  const setLocale = (loc: Locale) => {
    setLocaleState(loc)
    try { localStorage.setItem('cv-builder-locale', loc) } catch { /* ignore */ }
  }

  const value = useI18nValue(locale, setLocale)

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}
