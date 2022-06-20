
import { createLocalStorage, createSessionStorage } from '@/utils/cache/index.js'
import { Memory } from './memory.js'
import {
  TOKEN_KEY,
  USER_INFO_KEY,
  LOCK_INFO_KEY,
  APP_LOCAL_CACHE_KEY,
  APP_SESSION_CACHE_KEY,
} from '@/enums/cacheEnum.js'
import { DEFAULT_CACHE_TIME } from '@/settings/encryptionSetting.js'
import { toRaw } from 'vue'
import { pick, omit } from 'lodash-es'

const ls = createLocalStorage()
const ss = createSessionStorage()

const localMemory = new Memory(DEFAULT_CACHE_TIME)
const sessionMemory = new Memory(DEFAULT_CACHE_TIME)

const initPersistentMemory = () => {
  const localCache = ls.get(APP_LOCAL_CACHE_KEY)
  const sessionCache = ss.get(APP_SESSION_CACHE_KEY)
  localCache && localMemory.resetCache(localCache)
  sessionCache && sessionMemory.resetCache(sessionCache)
}

export class Persistent {
  getLocal(key) {
    return localMemory.get(key)?.value
  }

  setLocal(key, value, immediate = false) {
    localMemory.set(key, toRaw(value))
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache)
  }

  removeLocal(key, immediate = false) {
    localMemory.remove(key)
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache)
  }

  clearLocal(immediate = false) {
    localMemory.clear()
    immediate && ls.clear()
  }

  getSession(key) {
    return sessionMemory.get(key)?.value
  }

  setSession(key, value, immediate = false) {
    sessionMemory.set(key, toRaw(value))
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache)
  }

  removeSession(key, immediate = false) {
    sessionMemory.remove(key)
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache)
  }
  clearSession(immediate = false) {
    sessionMemory.clear()
    immediate && ss.clear()
  }

  clearAll(immediate = false) {
    sessionMemory.clear()
    localMemory.clear()
    if (immediate) {
      ls.clear()
      ss.clear()
    }
  }
}

window.addEventListener('beforeunload', () => {
  // TOKEN_KEY 在登录或注销时已经写入到storage了，此处为了解决同时打开多个窗口时token不同步的问题
  // LOCK_INFO_KEY 在锁屏和解锁时写入，此处也不应修改
  ls.set(APP_LOCAL_CACHE_KEY, {
    ...omit(localMemory.getCache, LOCK_INFO_KEY),
    ...pick(ls.get(APP_LOCAL_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY, LOCK_INFO_KEY]),
  })
  ss.set(APP_SESSION_CACHE_KEY, {
    ...omit(sessionMemory.getCache, LOCK_INFO_KEY),
    ...pick(ss.get(APP_SESSION_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY, LOCK_INFO_KEY]),
  })
})

const storageChange = (e) => {
  const { key, newValue, oldValue } = e

  if (!key) {
    Persistent.clearAll()
    return
  }

  if (!!newValue && !!oldValue) {
    if (APP_LOCAL_CACHE_KEY === key) {
      Persistent.clearLocal()
    }
    if (APP_SESSION_CACHE_KEY === key) {
      Persistent.clearSession()
    }
  }
}

window.addEventListener('storage', storageChange)

initPersistentMemory()