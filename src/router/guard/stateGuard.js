import { useAppStore } from '@/store/modules/app.js'
import { useMultipleTabStore } from '@/store/modules/multipleTab.js'
import { useUserStore } from '@/store/modules/user.js'
import { usePermissionStore } from '@/store/modules/permission.js'
import { PageEnum } from '@/enums/pageEnum.js'
import { removeTabChangeListener } from '@/logics/mitt/routeChange.js'

export const createStateGuard = (router) => {
  router.afterEach((to) => {
    // Just enter the login page and clear the authentication information
    if (to.path === PageEnum.BASE_LOGIN) {
      const tabStore = useMultipleTabStore()
      const userStore = useUserStore()
      const appStore = useAppStore()
      const permissionStore = usePermissionStore()
      appStore.resetAllState()
      permissionStore.resetState()
      tabStore.resetState()
      userStore.resetState()
      removeTabChangeListener()
    }
  })
}