import { computed } from 'vue'

import { useAppStore } from '@/store/modules/app.js'

export const useTransitionSetting = () => {
  const appStore = useAppStore()

  const getEnableTransition = computed(() => appStore.getTransitionSetting?.enable)

  const getOpenNProgress = computed(() => appStore.getTransitionSetting?.openNProgress)

  const getOpenPageLoading = computed(() => !!appStore.getTransitionSetting?.openPageLoading)

  const getBasicTransition = computed(() => appStore.getTransitionSetting?.basicTransition)

  const setTransitionSetting = (transitionSetting) => {
    appStore.setProjectConfig({ transitionSetting })
  }

  return {
    setTransitionSetting,
    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
  }
}