import { defHttp } from '@/utils/http/index.js'

const Api = {
  OPTIONS_LIST: '/select/getDemoOptions'
}

/**
 * @description: Get sample options value
 */
export const optionsListApi = (params) => defHttp.get({ url: Api.OPTIONS_LIST, params })