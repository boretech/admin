import { withInstall } from '@/utils/index.js'
import collapseContainer from './src/collapse/CollapseContainer.vue'
import scrollContainer from './src/ScrollContainer.vue'
import lazyContainer from './src/LazyContainer.vue'

export const CollapseContainer = withInstall(collapseContainer)
export const ScrollContainer = withInstall(scrollContainer)
export const LazyContainer = withInstall(lazyContainer)
