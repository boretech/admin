import { defHttp } from '/@/utils/http/index.js'

const Api = {
  TREE_OPTIONS_LIST: '/tree/getDemoOptions',
}

/**
 * @description: Get sample options value
 */
export const treeOptionsListApi = (params) => defHttp.get({ url: Api.TREE_OPTIONS_LIST, params })