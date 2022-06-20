import { upperFirst } from 'lodash-es'

export const getBoundingClientRect = (element) => {
  if (!element || !element.getBoundingClientRect) {
    return 0
  }
  return element.getBoundingClientRect()
}

const trim = (string) => (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')

/* istanbul ignore next */
export const hasClass = (el, cls) => {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

/* istanbul ignore next */
export const addClass = (el, cls) => {
  if (!el) return
  let curClass = el.className
  const classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

/* istanbul ignore next */
export const removeClass = (el, cls) => {
  if (!el || !cls) return
  const classes = cls.split(' ')
  let curClass = ' ' + el.className + ' '

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}
/**
 * Get the left and top offset of the current element
 * left: the distance between the leftmost element and the left side of the document
 * top: the distance from the top of the element to the top of the document
 * right: the distance from the far right of the element to the right of the document
 * bottom: the distance from the bottom of the element to the bottom of the document
 * rightIncludeBody: the distance between the leftmost element and the right side of the document
 * bottomIncludeBody: the distance from the bottom of the element to the bottom of the document
 *
 * @description:
 */
export const getViewportOffset = (element) => {
  const doc = document.documentElement

  const docScrollLeft = doc.scrollLeft
  const docScrollTop = doc.scrollTop
  const docClientLeft = doc.clientLeft
  const docClientTop = doc.clientTop

  const pageXOffset = window.pageXOffset
  const pageYOffset = window.pageYOffset

  const box = getBoundingClientRect(element)

  const { left: retLeft, top: rectTop, width: rectWidth, height: rectHeight } = box

  const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0)
  const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0)
  const offsetLeft = retLeft + pageXOffset
  const offsetTop = rectTop + pageYOffset

  const left = offsetLeft - scrollLeft
  const top = offsetTop - scrollTop

  const clientWidth = window.document.documentElement.clientWidth
  const clientHeight = window.document.documentElement.clientHeight

  return {
    left: left,
    top: top,
    right: clientWidth - rectWidth - left,
    bottom: clientHeight - rectHeight - top,
    rightIncludeBody: clientWidth - left,
    bottomIncludeBody: clientHeight - top,
  }
}

export const hackCss = (attr, value) => {
  const prefix = ['webkit', 'Moz', 'ms', 'OT']

  let styleObj = {}
  prefix.forEach((item) => {
    styleObj[`${item}${upperFirst(attr)}`] = value
  })
  return {
    ...styleObj,
    [attr]: value,
  }
}

/* istanbul ignore next */
export const on = (
  element,
  event,
  handler,
) => {
  if (element && event && handler) {
    element.addEventListener(event, handler, false)
  }
}

/* istanbul ignore next */
export const off = (
  element,
  event,
  handler,
) => {
  if (element && event && handler) {
    element.removeEventListener(event, handler, false)
  }
}

/* istanbul ignore next */
export const once = (el, event, fn) => {
  const listener = (this, ...args) => {
    if (fn) {
      fn.apply(this, args)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

export const useRafThrottle = (fn) => {
  let locked = false
  // @ts-ignore
  return (...args) => {
    if (locked) return
    locked = true
    window.requestAnimationFrame(() => {
      // @ts-ignore
      fn.apply(this, args)
      locked = false
    })
  }
}