import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    darkMode: 'dark',
    layout: 'DefaultLayout'
  }),
  getters: {
    getLayout(state) {
      return state.layout
    }
  },
  actions: {

  }
})
