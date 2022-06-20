import { isFunction } from '@/utils/is.js'

/**
 * @description:  Get slot to prevent empty error
 */
export const getSlot = (slots, slot = 'default', data) => {
  if (!slots || !Reflect.has(slots, slot)) {
    return null
  }
  if (!isFunction(slots[slot])) {
    console.error(`${slot} is not a function!`)
    return null
  }
  const slotFn = slots[slot]
  if (!slotFn) return null
  return slotFn(data)
}

/**
 * extends slots
 * @param slots
 * @param excludeKeys
 */
export const extendSlots = (slots, excludeKeys = []) => {
  const slotKeys = Object.keys(slots)
  const res = {}
  slotKeys.map((key) => {
    if (excludeKeys.includes(key)) {
      return null
    }
    res[key] = () => getSlot(slots, key)
  })
  return res
}