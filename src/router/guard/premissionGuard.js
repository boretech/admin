import { usePermissionStoreWithOut } from '@/store/modules/permission.js'

import { PageEnum } from '@/enums/pageEnum.js'
import { useUserStoreWithOut } from '@/store/modules/user.js'

import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic.js'

import { RootRoute } from '@/router/routes/index.js'

const LOGIN_PATH = PageEnum.BASE_LOGIN

const ROOT_PATH = RootRoute.path

const whitePathList = [LOGIN_PATH]

export const createPermissionGuard = (router) => {
  const userStore = useUserStoreWithOut()
  const permissionStore = usePermissionStoreWithOut()
  router.beforeEach(async (to, from, next) => {
    if (
      from.path === ROOT_PATH &&
      to.path === PageEnum.BASE_HOME &&
      userStore.getUserInfo.homePath &&
      userStore.getUserInfo.homePath !== PageEnum.BASE_HOME
    ) {
      next(userStore.getUserInfo.homePath)
      return
    }

    const token = userStore.getToken

    // Whitelist can be directly entered
    if (whitePathList.includes(to.path)) {
      if (to.path === LOGIN_PATH && token) {
        const isSessionTimeout = userStore.getSessionTimeout
        try {
          await userStore.afterLoginAction()
          if (!isSessionTimeout) {
            next((to.query?.redirect) || '/')
            return
          }
        } catch { }
      }
      next()
      return
    }

    // token does not exist
    if (!token) {
      // You can access without permission. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next()
        return
      }

      // redirect login page
      const redirectData = {
        path: LOGIN_PATH,
        replace: true,
      }

      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        }
      }
      next(redirectData)
      return
    }

    // Jump to the 404 page after processing the login
    if (
      from.path === LOGIN_PATH &&
      to.name === PAGE_NOT_FOUND_ROUTE.name &&
      to.fullPath !== (userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
    ) {
      next(userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
      return
    }

    // get userinfo while last fetch time is empty
    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction()
      } catch (err) {
        next()
        return
      }
    }

    if (permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    const routes = await permissionStore.buildRoutesAction()

    routes.forEach((route) => {
      router.addRoute(route)
    });

    router.addRoute(PAGE_NOT_FOUND_ROUTE)

    permissionStore.setDynamicAddedRoute(true)

    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      const redirectPath = (from.query.redirect || to.path)
      const redirect = decodeURIComponent(redirectPath)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      next(nextData)
    }
  })
}