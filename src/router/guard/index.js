import { useAppStoreWithOut } from '@/store/modules/app.js'
import { useUserStoreWithOut } from '@/store/modules/user.js'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting.js'
import { AxiosCanceler } from '@/utils/http/axiosCancel.js'
import { ElMessageBox, ElNotification } from 'element-plus'
import { warn } from '@/utils/log.js'
import { unref } from 'vue'
import { setRouteChange } from '@/logics/mitt/routeChange.js'
import { createPermissionGuard } from './permissionGuard.js'
import { createStateGuard } from './stateGuard.js'
import nProgress from 'nprogress'
import projectSetting from '@/settings/projectSetting.js'
import { createParamMenuGuard } from './paramMenuGuard.js'

// Don't change the order of creation
export const setupRouterGuard = (router) => {
  createPageGuard(router)
  createPageLoadingGuard(router)
  createHttpGuard(router)
  createScrollGuard(router)
  createMessageGuard(router)
  createProgressGuard(router)
  createPermissionGuard(router)
  createParamMenuGuard(router) // must after createPermissionGuard (menu has been built.)
  createStateGuard(router)
}

/**
 * Hooks for handling page state
 */
const createPageGuard = (router) => {
  const loadedPageMap = new Map()

  router.beforeEach(async (to) => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    to.meta.loaded = !!loadedPageMap.get(to.path)
    // Notify routing changes
    setRouteChange(to)

    return true
  })

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true)
  })
}

// Used to handle page loading status
const createPageLoadingGuard = (router) => {
  const userStore = useUserStoreWithOut()
  const appStore = useAppStoreWithOut()
  const { getOpenPageLoading } = useTransitionSetting()
  router.beforeEach(async (to) => {
    if (!userStore.getToken) {
      return true
    }
    if (to.meta.loaded) {
      return true
    }

    if (unref(getOpenPageLoading)) {
      appStore.setPageLoadingAction(true)
      return true
    }

    return true
  })
  router.afterEach(async () => {
    if (unref(getOpenPageLoading)) {
      // TODO Looking for a better way
      // The timer simulates the loading time to prevent flashing too fast,
      setTimeout(() => {
        appStore.setPageLoading(false)
      }, 220)
    }
    return true
  })
}

/**
 * The interface used to close the current page to complete the request when the route is switched
 * @param router
 */
const createHttpGuard = (router) => {
  const { removeAllHttpPending } = projectSetting
  let axiosCanceler
  if (removeAllHttpPending) {
    axiosCanceler = new AxiosCanceler()
  }
  router.beforeEach(async () => {
    // Switching the route will delete the previous request
    axiosCanceler?.removeAllPending()
    return true
  })
}

// Routing switch back to the top
const createScrollGuard = (router) => {
  const isHash = (href) => {
    return /^#/.test(href)
  }

  const body = document.body

  router.afterEach(async (to) => {
    // scroll top
    isHash(to)?.href && body.scrollTo(0, 0)
    return true
  })
}

/**
 * Used to close the message instance when the route is switched
 * @param router
 */
export const createMessageGuard = (router) => {
  const { closeMessageOnSwitch } = projectSetting

  router.beforeEach(async () => {
    try {
      if (closeMessageOnSwitch) {
        ElMessageBox.destroyAll()
        ElNotification.destroy()
      }
    } catch (error) {
      warn('message guard error:' + error)
    }
    return true
  })
}

export const createProgressGuard = (router) => {
  const { getOpenNProgress } = useTransitionSetting()
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true
    }
    unref(getOpenNProgress) && nProgress.start()
    return true
  })

  router.afterEach(async () => {
    unref(getOpenNProgress) && nProgress.done()
    return true
  })
}