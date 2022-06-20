import { defHttp } from '/@/utils/http/index.js'

const Api = {
  DEMO_LIST: '/table/getDemoList',
}

/**
 * @description: Get sample list value
 */

export const demoListApi = (params) =>
  defHttp.get({
    url: Api.DEMO_LIST,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  })