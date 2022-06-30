import { pageNotFoundRoute, staticRoutes } from './basic'

const modules = import.meta.globEager('./modules/**/*.js')

const routesList = Object.keys(modules).reduce((acc, key) => {
  const mod = modules[key].default || {}
  return acc.concat(Array.isArray(mod) ? mod : [mod])
}, [])

export { staticRoutes }

export const asyncRoutes = [pageNotFoundRoute, ...routesList]
