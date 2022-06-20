import { Persistent } from '@/utils/cache/persistent.js'
import { CacheTypeEnum, TOKEN_KEY } from '@/enums/cacheEnum.js'
import projectSetting from '@/settings/projectSetting.js'

const { permissionCacheType } = projectSetting
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL

export const getToken = () => getAuthCache(TOKEN_KEY)

export const getAuthCache = (key) => {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession
  return fn(key)
}

export const setAuthCache = (key, value) => {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession
  return fn(key, value, true)
}

export const clearAuthCache = (immediate = true) => {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession
  return fn(immediate)
}