import { getStorageShortName } from '@/utils/env.js'
import { createStorage as create, CreateStorageParams } from './storageCache.js'
import { enableStorageEncryption, DEFAULT_CACHE_TIME } from '@/settings/encryptionSetting.js'

const createOptions = (storage, options = {}) => ({
  // No encryption in debug mode
  hasEncrypt: enableStorageEncryption,
  storage,
  prefixKey: getStorageShortName(),
  ...options,
})

export const WebStorage = create(createOptions(sessionStorage))

export const createStorage = (storage = sessionStorage, options = {}) => create(createOptions(storage, options))

export const createSessionStorage = (options = {}) => createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME })

export const createLocalStorage = (options = {}) => createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME })

export default WebStorage