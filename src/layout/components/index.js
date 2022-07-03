import DefaultLayout from './DefaultLayout.vue'
import LeftMixedLayout from './LeftMixedLayout.vue'
import TopLayout from './TopLayout.vue'
import TopMixedLayout from './TopMixedLayout.vue'

export {
  DefaultLayout,
  LeftMixedLayout,
  TopLayout,
  TopMixedLayout
}

const layouts = {
  DefaultLayout,
  LeftMixedLayout,
  TopLayout,
  TopMixedLayout
}

// console.log(layouts)

export const getLayout = (key = 'DefaultLayout') => layouts[key]
