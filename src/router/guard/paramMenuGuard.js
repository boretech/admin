import { configureDynamicParamsMenu } from '../helper/menuHelper.js'
import { PermissionModeEnum } from '@/enums/appEnum.js'
import { useAppStoreWithOut } from '@/store/modules/app.js'
import { usePermissionStoreWithOut } from '@/store/modules/permission.js'

export const createParamMenuGuard = (router) => {
  const permissionStore = usePermissionStoreWithOut()
  router.beforeEach(async (to, _, next) => {
    // filter no name route
    if (!to.name) {
      next()
      return
    }

    // menu has been built.
    if (!permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    let menus = []
    if (isBackMode()) {
      menus = permissionStore.getBackMenuList
    } else if (isRouteMappingMode()) {
      menus = permissionStore.getFrontMenuList
    }
    menus.forEach((item) => configureDynamicParamsMenu(item, to.params))

    next()
  })
}

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