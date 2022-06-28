import { defineStore } from 'pinia'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

const langSet = {
  'zh-cn': zhCn,
  'en': en
}

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: 'zh-cn',
    ElLocale: zhCn
  }),
  getters: {
    getLocale() {
      return {
        locale: this.locale,
        ElLocale: this.ElLocale
      }
    }
  },
  actions: {
    changeLocale(locale) {
      this.locale = locale
      this.ElLocale = langSet[locale]
    }
  }
})