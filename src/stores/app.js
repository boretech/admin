import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    darkMode: 'dark',
    layout: 'DefaultLayout',
    appTitle: import.meta.env.VITE_APP_NAME
  }),
  getters: {
    getLayout (state) {
      return state.layout
    },
    getAppTitle (state) {
      return state.appTitle
    }
  },
  actions: {

  }
})
