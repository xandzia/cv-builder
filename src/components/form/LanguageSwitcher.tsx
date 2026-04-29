import { useI18n } from '../../hooks/useI18n'
import { LOCALE_LABELS, type Locale } from '../../i18n'

const LOCALES = Object.keys(LOCALE_LABELS) as Locale[]

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  return (
    <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5">
      {LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => setLocale(loc)}
          className={`px-2 py-1 text-xs font-medium rounded-md cursor-pointer transition-colors ${
            locale === loc
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {LOCALE_LABELS[loc]}
        </button>
      ))}
    </div>
  )
}
