import { defHttp } from '/@/utils/http/index.js'

const Api = {
  GetMenuList: '/getMenuList',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => defHttp.get({ url: Api.GetMenuList })