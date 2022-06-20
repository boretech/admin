import { defHttp } from '/@/utils/http/index.js'

const Api = {
  // The address does not exist
  Error: '/error',
}

/**
 * @description: Trigger ajax error
 */

export const fireErrorApi = () => defHttp.get({ url: Api.Error })