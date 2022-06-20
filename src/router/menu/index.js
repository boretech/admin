import { pathToRegexp } from 'path-to-regexp'
import { useAppStoreWithOut } from '@/store/modules/app.js'
import { usePermissionStore } from '@/store/modules/permission.js'
import { transformMenuModule, getAllParentPath } from '@/router/helper/menuHelper.js'
import { filter } from '@/utils/helper/treeHelper.js'
import { isUrl } from '@/utils/is.js'
import { router } from '@/router/index.js'
import { PermissionModeEnum } from '@/enums/appEnum.js'

const modules = import.meta.globEager('./modules/**/*.js')

const menuModules = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  menuModules.push(...modList)
})

// ===========================
// ==========Helper===========
// ===========================

const getPermissionMode = () => {
  const appStore = useAppStoreWithOut()
  return appStore.getProjectConfig.permissionMode
}

const isBackMode = () => {
  return getPermissionMode() === PermissionModeEnum.BACK
}

const isRouteMappingMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING
}

const isRoleMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROLE
}

let staticMenus = []

  (() => {
    menuModules.sort((a, b) => {
      return (a.orderNo || 0) - (b.orderNo || 0)
    })

    for (const menu of menuModules) {
      staticMenus.push(transformMenuModule(menu))
    }
  })()

const getAsyncMenus = async () => {
  const permissionStore = usePermissionStore()
  if (isBackMode()) {
    return permissionStore.getBackMenuList.filter((item) => !item.meta?.hideMenu && !item.hideMenu)
  }
  if (isRouteMappingMode()) {
    return permissionStore.getFrontMenuList.filter((item) => !item.hideMenu)
  }
  return staticMenus
}

export const getMenus = async () => {
  const menus = await getAsyncMenus()
  if (isRoleMode()) {
    const routes = router.getRoutes()
    return filter(menus, basicFilter(routes))
  }
  return menus
}

export const getCurrentParentPath = async (currentPath) => {
  const menus = await getAsyncMenus()
  const allParentPath = await getAllParentPath(menus, currentPath)
  return allParentPath?.[0]
}

// Get the level 1 menu, delete children
export const getShallowMenus = async () => {
  const menus = await getAsyncMenus()
  const shallowMenuList = menus.map((item) => ({ ...item, children: undefined }))
  if (isRoleMode()) {
    const routes = router.getRoutes()
    return shallowMenuList.filter(basicFilter(routes))
  }
  return shallowMenuList
}

// Get the children of the menu
export const getChildrenMenus = async (parentPath) => {
  const menus = await getMenus()
  const parent = menus.find((item) => item.path === parentPath)
  if (!parent || !parent.children || !!parent?.meta?.hideChildrenInMenu) {
    return []
  }
  if (isRoleMode()) {
    const routes = router.getRoutes()
    return filter(parent.children, basicFilter(routes))
  }
  return parent.children
}

const basicFilter = (routes) => {
  return (menu) => {
    const matchRoute = routes.find((route) => {
      if (isUrl(menu.path)) return true

      if (route.meta?.carryParam) {
        return pathToRegexp(route.path).test(menu.path)
      }
      const isSame = route.path === menu.path
      if (!isSame) return false

      if (route.meta?.ignoreAuth) return true

      return isSame || pathToRegexp(route.path).test(menu.path)
    })

    if (!matchRoute) return false
    menu.icon = (menu.icon || matchRoute.meta.icon)
    menu.meta = matchRoute.meta
    return true
  }
}