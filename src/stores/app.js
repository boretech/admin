import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    darkMode: 'dark',
    layout: 'DefaultLayout',
    menuCollapse: true,
    appTitle: import.meta.env.VITE_APP_NAME
  }),
  getters: {
    getLayout (state) {
      return state.layout
    },
    getAppTitle (state) {
      return state.appTitle
    },
    getMenuCollapse (state) {
      console.log(state.menuCollapse)
      return state.menuCollapse
    }
  },
  actions: {
    toggleMenuCollapse (state) {
      state.menuCollapse = !state.menuCollapse
    }
  }
})
