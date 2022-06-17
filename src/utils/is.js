const toString = Object.prototype.toString;

export const is = (val, type) => toString.call(val) === `[object ${type}]`

export const isDef = (val) => typeof val !== 'undefined'

export const isUnDef = (val) => !isDef(val)

export const isObject = (val) => val !== null && is(val, 'Object')

export const isDate = (val) => is(val, 'Date')

export const isNull = (val) => val === null

export const isNullAndUnDef = (val) => isUnDef(val) && isNull(val)

export const isNullOrUnDef = (val) => isUnDef(val) || isNull(val)

export const isNumber = (val) => is(val, 'Number')

export const isString = (val) => is(val, 'String')

export const isFunction = (val) => typeof val === 'function'

export const isBoolean = (val) => is(val, 'Boolean')

export const isRegExp = (val) => is(val, 'RegExp')

export const isArray = (val) => val && Array.isArray(val)

export const isWindow = (val) => typeof window !== 'undefined' && is(val, 'Window')

export const isElement = (val) => isObject(val) && !!val.tagName

export const isMap = (val) => is(val, 'Map')

export const isPromise = (val) => is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)

export const isEmpty = (val) => {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

export const isUrl = (path) =>
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/.test(path)