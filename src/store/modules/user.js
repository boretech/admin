import { h } from 'vue'
import { defineStore } from 'pinia'
import { store } from '@/store/index.js'
import { PageEnum } from '@/enums/pageEnum.js'
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum.js'
import { getAuthCache, setAuthCache } from '@/utils/auth/index.js'
import { doLogout, getUserInfo, loginApi } from '@/api/sys/user.js'
import { useI18n } from '@/hooks/web/useI18n.js'
import { useMessage } from '@/hooks/web/useMessage.js'
import { router } from '@/router/index.js'
import { usePermissionStore } from '@/store/modules/permission.js'
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic.js'
import { isArray } from '@/utils/is.js'

export const useUserStore = defineStore({
  id: 'app-user',
  state: () => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo() {
      return this.userInfo || getAuthCache(USER_INFO_KEY) || {}
    },
    getToken() {
      return this.token || getAuthCache(TOKEN_KEY)
    },
    getRoleList() {
      return this.roleList.length > 0 ? this.roleList : getAuthCache(ROLES_KEY)
    },
    getSessionTimeout() {
      return !!this.sessionTimeout
    },
    getLastUpdateTime() {
      return this.lastUpdateTime
    },
  },
  actions: {
    setToken(info) {
      this.token = info ? info : '' // for null or undefined value
      setAuthCache(TOKEN_KEY, info)
    },
    setRoleList(roleList) {
      this.roleList = roleList
      setAuthCache(ROLES_KEY, roleList)
    },
    setUserInfo(info) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      setAuthCache(USER_INFO_KEY, info)
    },
    setSessionTimeout(flag) {
      this.sessionTimeout = flag
    },
    resetState() {
      this.userInfo = null
      this.token = ''
      this.roleList = []
      this.sessionTimeout = false
    },
    /**
     * @description: login
     */
    async login(params) {
      try {
        const { goHome = true, mode, ...loginParams } = params
        const data = await loginApi(loginParams, mode)
        const { token } = data

        // save token
        this.setToken(token)
        return this.afterLoginAction(goHome)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLoginAction(goHome) {
      if (!this.getToken) return null
      // get user info
      const userInfo = await this.getUserInfoAction()

      const sessionTimeout = this.sessionTimeout
      if (sessionTimeout) {
        this.setSessionTimeout(false)
      } else {
        const permissionStore = usePermissionStore()
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction()
          routes.forEach((route) => {
            router.addRoute(route)
          })
          router.addRoute(PAGE_NOT_FOUND_ROUTE)
          permissionStore.setDynamicAddedRoute(true)
        }
        goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME))
      }
      return userInfo
    },
    async getUserInfoAction() {
      if (!this.getToken) return null
      const userInfo = await getUserInfo()
      const { roles = [] } = userInfo
      if (isArray(roles)) {
        const roleList = roles.map((item) => item.value)
        this.setRoleList(roleList)
      } else {
        userInfo.roles = []
        this.setRoleList([])
      }
      this.setUserInfo(userInfo)
      return userInfo
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await doLogout()
        } catch {
          console.log('注销Token失败')
        }
      }
      this.setToken(undefined)
      this.setSessionTimeout(false)
      this.setUserInfo(null)
      goLogin && router.push(PageEnum.BASE_LOGIN)
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage()
      const { t } = useI18n()
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true)
        },
      })
    },
  },
})

// Need to be used outside the setup
export const useUserStoreWithOut = () => useUserStore(store)