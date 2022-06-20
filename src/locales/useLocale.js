import { unref, computed } from 'vue'
import { i18n } from './setupI18n.js'
import { useLocaleStoreWithOut } from '@/store/modules/locale.js'
import { loadLocalePool, setHtmlPageLang } from './helper.js'

const setI18nLanguage = (locale) => {
  const localeStore = useLocaleStoreWithOut()

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }
  localeStore.setLocaleInfo({ locale })
  setHtmlPageLang(locale)
}

export const useLocale = () => {
  const localeStore = useLocaleStoreWithOut()
  const getLocale = computed(() => localeStore.getLocale)
  const getShowLocalePicker = computed(() => localeStore.getShowPicker)

  const getAntdLocale = computed(() => i18n.global.getLocaleMessage(unref(getLocale))?.antdLocale || {})

  // Switching the language will change the locale of useI18n
  // And submit to configuration modification
  const changeLocale = async (locale) => {
    const globalI18n = i18n.global
    const currentLocale = unref(globalI18n.locale)
    if (currentLocale === locale) {
      return locale
    }

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale)
      return locale
    }
    const langModule = ((await import(`./lang/${locale}.js`))).default
    if (!langModule) return

    const { message } = langModule

    globalI18n.setLocaleMessage(locale, message)
    loadLocalePool.push(locale)

    setI18nLanguage(locale)
    return locale
  }

  return {
    getLocale,
    getShowLocalePicker,
    changeLocale,
    getAntdLocale,
  }
}