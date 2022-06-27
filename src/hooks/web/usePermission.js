import { useAppStore } from '@/store/modules/app.js'
import { usePermissionStore } from '@/store/modules/permission.js'
import { useUserStore } from '@/store/modules/user.js'

import { useTabs } from './useTabs.js'

import { router, resetRouter } from '@/router/index.js'
// import { RootRoute } from '@/router/routes';

import projectSetting from '@/settings/projectSetting.js'
import { PermissionModeEnum } from '@/enums/appEnum.js'

import { intersection } from 'lodash-es'
import { isArray } from '@/utils/is.js'
import { useMultipleTabStore } from '@/store/modules/multipleTab.js'

// User permissions related operations
export const usePermission = () => {
  const userStore = useUserStore()
  const appStore = useAppStore()
  const permissionStore = usePermissionStore()
  const { closeAll } = useTabs(router)

  /**
   * Change permission mode
   */
  const togglePermissionMode = async () => {
    appStore.setProjectConfig({
      permissionMode:
        projectSetting.permissionMode === PermissionModeEnum.BACK
          ? PermissionModeEnum.ROUTE_MAPPING
          : PermissionModeEnum.BACK,
    })
    location.reload()
  }

  /**
   * Reset and regain authority resource information
   * 重置和重新获得权限资源信息
   * @param id
   */
  const resume = async () => {
    const tabStore = useMultipleTabStore()
    tabStore.clearCacheTabs()
    resetRouter()
    const routes = await permissionStore.buildRoutesAction()
    routes.forEach((route) => {
      router.addRoute(route)
    })
    permissionStore.setLastBuildMenuTime()
    closeAll()
  }

  /**
   * Determine whether there is permission
   */
  const hasPermission = (value, def = true) => {
    // Visible by default
    if (!value) {
      return def
    }

    const permMode = projectSetting.permissionMode

    if ([PermissionModeEnum.ROUTE_MAPPING, PermissionModeEnum.ROLE].includes(permMode)) {
      if (!isArray(value)) {
        return userStore.getRoleList?.includes(value)
      }
      return (intersection(value, userStore.getRoleList)).length > 0
    }

    if (PermissionModeEnum.BACK === permMode) {
      const allCodeList = permissionStore.getPermCodeList
      if (!isArray(value)) {
        return allCodeList.includes(value)
      }
      return (intersection(value, allCodeList)).length > 0
    }
    return true
  }

  /**
   * Change roles
   * @param roles
   */
  const changeRole = async (roles) => {
    if (projectSetting.permissionMode !== PermissionModeEnum.ROUTE_MAPPING) {
      throw new Error(
        'Please switch PermissionModeEnum to ROUTE_MAPPING mode in the configuration to operate!',
      )
    }

    if (!isArray(roles)) {
      roles = [roles]
    }
    userStore.setRoleList(roles)
    await resume()
  }

  /**
   * refresh menu data
   */
  const refreshMenu = async () => {
    resume()
  }

  return { changeRole, hasPermission, togglePermissionMode, refreshMenu }
}
