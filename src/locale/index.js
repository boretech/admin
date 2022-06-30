// import { zhCn } from "element-plus/es/locale"
import { createI18n } from "vue-i18n"
import { localeSetting } from '@/settings'

const createI18nOptions = async () => {
  return
}

export const setupI18n = async (app) => {
  const options = await createI18nOptions()
  app.use(createI18n)
}