import { toggleClass } from './util/index.js'

/**
 * Change the status of the project's color weakness mode
 * @param colorWeak
 */
export const updateColorWeak = (colorWeak) => {
  toggleClass(colorWeak, 'color-weak', document.documentElement)
}