import { i18n } from '@/locales/setupI18n.js'

const getKey = (namespace, key) => {
  if (!namespace) {
    return key
  }
  if (key.startsWith(namespace)) {
    return key
  }
  return `${namespace}.${key}`
}

export const useI18n = (namespace) => {
  const normalFn = {
    t: (key) => getKey(namespace, key)
  };

  if (!i18n) {
    return normalFn
  }

  const { t, ...methods } = i18n.global

  const tFn = (key, ...arg) => {
    if (!key) return ''
    if (!key.includes('.') && !namespace) return key
    return t(getKey(namespace, key), ...arg)
  }

  return {
    ...methods,
    t: tFn,
  }
}

// Why write this function？
// Mainly to configure the vscode i18nn ally plugin. This function is only used for routing and menus. Please use useI18n for other places

export const t = (key) => key