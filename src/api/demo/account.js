import { defHttp } from '@/utils/http/index.js'

const Api = {
  ACCOUNT_INFO: '/account/getAccountInfo',
  SESSION_TIMEOUT: '/user/sessionTimeout',
  TOKEN_EXPIRED: '/user/tokenExpired',
}

// Get personal center-basic settings

export const accountInfoApi = () => defHttp.get({ url: Api.ACCOUNT_INFO })

export const sessionTimeoutApi = () => defHttp.post({ url: Api.SESSION_TIMEOUT })

export const tokenExpiredApi = () => defHttp.post({ url: Api.TOKEN_EXPIRED })