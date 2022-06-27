import { toggleClass } from './util/index.js'

/**
 * Change project gray mode status
 * @param gray
 */
export const updateGrayMode = (gray) => {
  toggleClass(gray, 'gray-mode', document.documentElement)
}