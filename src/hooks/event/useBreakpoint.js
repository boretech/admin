import { ref, computed, ComputedRef, unref } from 'vue'
import { useEventListener } from '@/hooks/event/useEventListener.js'
import { screenMap, sizeEnum, screenEnum } from '@/enums/breakpointEnum.js'

let globalScreenRef, globalWidthRef, globalRealWidthRef

export const useBreakpoint = () => ({
  screenRef: computed(() => unref(globalScreenRef)),
  widthRef: globalWidthRef,
  screenEnum,
  realWidthRef: globalRealWidthRef,
})

// Just call it once
export const createBreakpointListen = (fn) => {
  const screenRef = ref < sizeEnum > (sizeEnum.XL)
  const realWidthRef = ref(window.innerWidth)

  const getWindowWidth = () => {
    const width = document.body.clientWidth
    const xs = screenMap.get(sizeEnum.XS) || null
    const sm = screenMap.get(sizeEnum.SM) || null
    const md = screenMap.get(sizeEnum.MD) || null
    const lg = screenMap.get(sizeEnum.LG) || null
    const xl = screenMap.get(sizeEnum.XL) || null
    if (width < xs) {
      screenRef.value = sizeEnum.XS
    } else if (width < sm) {
      screenRef.value = sizeEnum.SM
    } else if (width < md) {
      screenRef.value = sizeEnum.MD
    } else if (width < lg) {
      screenRef.value = sizeEnum.LG
    } else if (width < xl) {
      screenRef.value = sizeEnum.XL
    } else {
      screenRef.value = sizeEnum.XXL
    }
    realWidthRef.value = width
  }

  useEventListener({
    el: window,
    name: 'resize',

    listener: () => {
      getWindowWidth()
      resizeFn()
    },
    // wait: 100,
  })

  getWindowWidth()
  globalScreenRef = computed(() => unref(screenRef))
  globalWidthRef = computed(() => screenMap.get(unref(screenRef) || null) || null)
  globalRealWidthRef = computed(() => unref(realWidthRef))

  const resizeFn = () => {
    fn?.({
      screen: globalScreenRef,
      width: globalWidthRef,
      realWidth: globalRealWidthRef,
      screenEnum,
      screenMap,
      sizeEnum,
    })
  }

  resizeFn()

  return {
    screenRef: globalScreenRef,
    screenEnum,
    widthRef: globalWidthRef,
    realWidthRef: globalRealWidthRef,
  }
}