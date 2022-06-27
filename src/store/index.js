import { createPinia } from 'pinia'

export * from './modules'

export const setupStore = (app) => {
  app.use(createPinia())
}
