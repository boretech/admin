import { defHttp } from '@/utils/http/index.js'

const Api = {
  AREA_RECORD: '/cascader/getAreaRecord'
}

export const areaRecord = (data) => defHttp.post({ url: Api.AREA_RECORD, data })