import { basicRoutes } from './basic'

const modules = import.meta.globEager('./modules/**/*.js')

const staticRoutes = Object.keys(modules)
  .reduce((acc, item) => {
    const module = modules[item]
    const routes = Object.keys(module).reduce((acc, item) => {
      if (typeof module[item] !== 'object') {
        return acc
      }

      if (Array.isArray(module[item])) {
        return acc.concat(module[item])
      } else {
        return acc.concat([module[item]])
      }
    }, [])
    return acc.concat(routes)
  }, [])

  console.log(basicRoutes)

export default [
  ...basicRoutes,
  ...staticRoutes
]
