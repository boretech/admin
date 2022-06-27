/**
 * Makes the first character of a string uppercase
 */
export const upperFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1)

export default (expandedParentClass = '', x = false) => {
  const sizeProperty = x ? 'width' : 'height'
  const offsetProperty = `offset${upperFirst(sizeProperty)}`

  const afterLeave = (el) => {
    if (expandedParentClass && el._parent) {
      el._parent.classList.remove(expandedParentClass);
    }
    resetStyles(el);
  }

  const resetStyles = (el) => {
    const size = el._initialStyle[sizeProperty]
    el.style.overflow = el._initialStyle.overflow
    if (size != null) el.style[sizeProperty] = size
    Reflect.deleteProperty(el, '_initialStyle')
  }

  return {
    beforeEnter(el) {
      el._parent = el.parentNode
      el._initialStyle = {
        transition: el.style.transition,
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty],
      }
    },

    enter(el) {
      const initialStyle = el._initialStyle

      el.style.setProperty('transition', 'none', 'important')
      el.style.overflow = 'hidden'
      // const offset = `${el[offsetProperty]}px`;

      // el.style[sizeProperty] = '0';

      void el.offsetHeight // force reflow

      el.style.transition = initialStyle.transition

      if (expandedParentClass && el._parent) {
        el._parent.classList.add(expandedParentClass)
      }

      requestAnimationFrame(() => {
        // el.style[sizeProperty] = offset;
      })
    },

    afterEnter: resetStyles,
    enterCancelled: resetStyles,

    leave(el) {
      el._initialStyle = {
        transition: '',
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty],
      }

      el.style.overflow = 'hidden'
      el.style[sizeProperty] = `${el[offsetProperty]}px`
      /* eslint-disable-next-line */
      void el.offsetHeight // force reflow

      requestAnimationFrame(() => (el.style[sizeProperty] = '0'))
    },

    afterLeave,
    leaveCancelled: afterLeave,
  }
}