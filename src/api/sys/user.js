import { defHttp } from '@/utils/http/index.js'

const Api = {
  Login: '/login',
  Logout: '/logout',
  GetUserInfo: '/getUserInfo',
  GetPermCode: '/getPermCode',
  TestRetry: '/testRetry',
}

/**
 * @description: user login api
 */
export const loginApi = (params, mode = 'modal') => defHttp.post(
  {
    url: Api.Login,
    params,
  },
  {
    errorMessageMode: mode,
  },
)

/**
 * @description: getUserInfo
 */
export const getUserInfo = () => defHttp.get({ url: Api.GetUserInfo }, { errorMessageMode: 'none' })

export const getPermCode = () => defHttp.get({ url: Api.GetPermCode })

export const doLogout = () => defHttp.get({ url: Api.Logout })

export const testRetry = () =>
  defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  )