import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    darkMode: 'dark',
    layout: 'DefaultLayout',
    menuCollapse: false,
    appTitle: import.meta.env.VITE_APP_NAME
  }),
  getters: {
    getLayout () {
      return this.layout
    },
    getAppTitle () {
      return this.appTitle
    },
    getMenuCollapse () {
      return this.menuCollapse
    }
  },
  actions: {
    toggleMenuCollapse () {
      this.menuCollapse = !this.menuCollapse
    }
  }
})
