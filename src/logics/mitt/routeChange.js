/**
 * Used to monitor routing changes to change the status of menus and tabs. There is no need to monitor the route, because the route status change is affected by the page rendering time, which will be slow
 */

import mitt from '@/utils/mitt.js'
import { getRawRoute } from '@/utils/index.js'

const emitter = mitt()

const key = Symbol()

let lastChangeTab

export const setRouteChange = (lastChangeRoute) => {
  const r = getRawRoute(lastChangeRoute)
  emitter.emit(key, r)
  lastChangeTab = r
}

export const listenerRouteChange = (
  callback,
  immediate = true,
) => {
  emitter.on(key, callback)
  immediate && lastChangeTab && callback(lastChangeTab)
}

export const removeTabChangeListener = () => {
  emitter.clear()
}