import axios from 'axios'
import { isFunction } from '@/utils/is.js'

let pendingMap = new Map()

// export const getPendingUrl = (config) => [config.method, config.url].join('&')
// switch to like this:
export const getPendingUrl = (config) => `${config.method}&${config.url}`

export class AxiosCanceler {
  addPending(config) {
    this.removePending(config)
    const url = getPendingUrl(config)
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
      if (!pendingMap.has(url)) {
        pendingMap.set(url, cancel)
      }
    })
  }
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel()
    })
    pendingMap.clear()
  }
  removePending(config) {
    const url = getPendingUrl(config)
    if (pendingMap.has(url)) {
      // If there is a current request identifier in pending,
      // the current request needs to be cancelled and removed
      const cancel = pendingMap.get(url)
      cancel && cancel(url)
      pendingMap.delete(url)
    }
  }
  reset() {
    pendingMap = new Map()
  }
}