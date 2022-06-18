import { createI18n } from 'vue-i18n'
import { setHtmlPageLang, setLoadLocalePool } from './helper.js'
import { localeSetting } from '@/settings/localeSetting.js'
import { useLocaleStoreWithOut } from '@/store/modules/locale.js'

const { fallback, availableLocales } = localeSetting

const createI18nOptions = async () => {
  const localeStore = useLocaleStoreWithOut()
  const locale = localeStore.getLocale
  const defaultLocal = await import(`./lang/${locale}.js`)
  const message = defaultLocal.default?.message ?? {}

  setHtmlPageLang(locale)

  setLoadLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale)
  })

  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    messages: {
      [locale]: message,
    },
    availableLocales: availableLocales,
    sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  }
}

// setup i18n instance with glob
export const setupI18n = async (app) => {
  const options = await createI18nOptions()
  i18n = createI18n(options)
  app.use(i18n)
}