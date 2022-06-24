import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export const setupRouter = (app) => {
  app.use(router)
}

export default setupRouter