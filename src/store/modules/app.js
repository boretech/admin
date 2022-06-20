import { defineStore } from 'pinia'
import { store } from '@/store/index.js'

import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '@/enums/cacheEnum.js'
import { Persistent } from '@/utils/cache/persistent.js'
import { darkMode } from '@/settings/designSetting.js'
import { resetRouter } from '@/router/index.js'
import { deepMerge } from '@/utils/index.js'

let timeId

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    beforeMiniInfo: {},
  }),
  getters: {
    getPageLoading() {
      return this.pageLoading
    },
    getDarkMode() {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode
    },

    getBeforeMiniInfo() {
      return this.beforeMiniInfo
    },

    getProjectConfig() {
      return this.projectConfig || {}
    },

    getHeaderSetting() {
      return this.getProjectConfig.headerSetting
    },
    getMenuSetting() {
      return this.getProjectConfig.menuSetting
    },
    getTransitionSetting() {
      return this.getProjectConfig.transitionSetting
    },
    getMultiTabsSetting() {
      return this.getProjectConfig.multiTabsSetting
    },
  },
  actions: {
    setPageLoading(loading) {
      this.pageLoading = loading
    },

    setDarkMode(mode) {
      this.darkMode = mode
      localStorage.setItem(APP_DARK_MODE_KEY_, mode)
    },

    setBeforeMiniInfo(state) {
      this.beforeMiniInfo = state
    },

    setProjectConfig(config) {
      this.projectConfig = deepMerge(this.projectConfig || {}, config)
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig)
    },

    async resetAllState() {
      resetRouter()
      Persistent.clearAll()
    },
    async setPageLoadingAction(loading) {
      if (loading) {
        clearTimeout(timeId)
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading)
        }, 50)
      } else {
        this.setPageLoading(loading)
        clearTimeout(timeId)
      }
    },
  },
});

// Need to be used outside the setup
export const useAppStoreWithOut = () => useAppStore(store)