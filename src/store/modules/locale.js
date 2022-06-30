import { defineStore } from 'pinia'

import { store } from '@/store'
import { LOCALE_KEY } from '@/settings/enum/cache'
import {} from '@/utils/storage'
import { localeSetting } from '@/settings'

const localStorage = createLocalStorage() || null

const LocaleSetting = localStorage.get(LOCALE_KEY) || localeSetting

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    localeInfo: LocaleSetting
  }),
  getters: {
    getShowPicker() {
      return !!this.localeInfo?.showPicker
    },
    getLocale() {
      return this.localeInfo?.locale || 'zh_CN'
    }
  },
  actions: {
    setLocaleInfo(info) {
      this.localeInfo = { ...this.localeInfo, ...info }
      localStorage.set(LOCALE_KEY, this.localeInfo)
    },
    initLocale() {
      this.setLocaleInfo(localeSetting)
    }
  }
})

export const setupLocaleStore = () => useLocaleStore(store)