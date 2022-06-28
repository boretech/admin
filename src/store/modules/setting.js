import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    darkMode: 'dark'
  }),
  getters: {
    getDarkMode() {
      return this.darkMode
    }
  },
  actions: {
    toggleDarkMode() {
      if (this.darkMode === 'dark') {
        localStorage.setItem('APP_DARK_MODE', 'light')
        this.darkMode = 'light'
      } else {
        localStorage.setItem('APP_DARK_MODE', 'dark')
        this.darkMode = 'dark'
      }
    }
  }
})