import { defHttp } from '/@/utils/http/index.js'
import { useGlobSetting } from '@/hooks/setting/index.js'

const { uploadUrl = '' } = useGlobSetting()

/**
 * @description: Upload interface
 */
export const uploadApi = (
  params,
  onUploadProgress = (progressEvent) => { },
) => defHttp.uploadFile(
  {
    url: uploadUrl,
    onUploadProgress,
  },
  params,
)