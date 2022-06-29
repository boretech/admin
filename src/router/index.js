import { createRouter, createWebHashHistory } from 'vue-router'
import { staticRoutes } from './routes'

const getRoutesName = (routes) => routes.reduce((acc, item) => {
  acc = acc.concat(item.name)
  acc = acc.concat(getRoutesName(item.children || []))
  return acc
}, [])

const staticRoutesList = getRoutesName(staticRoutes)

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE),
  routes: staticRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = () => {
  router.getRoutes().forEach(route => {
    const { name } = route
    if (name && !staticRoutesList.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app) => {
  app.use(router)
}

export default setupRouter