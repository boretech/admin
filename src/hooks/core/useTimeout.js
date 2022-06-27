import { ref, watch } from 'vue'
import { tryOnUnmounted } from '@vueuse/core'
import { isFunction } from '@/utils/is.js'

export const useTimeoutFn = (handle, wait, native = false) => {
  if (!isFunction(handle)) {
    throw new Error('handle is not Function!')
  }

  const { readyRef, stop, start } = useTimeoutRef(wait)
  if (native) {
    handle()
  } else {
    watch(
      readyRef,
      (maturity) => {
        maturity && handle()
      },
      { immediate: false },
    )
  }
  return { readyRef, stop, start }
}

export const useTimeoutRef = (wait) => {
  const readyRef = ref(false)

  let timer
  const stop = () => {
    readyRef.value = false
    timer && window.clearTimeout(timer)
  }
  const start = () => {
    stop()
    timer = setTimeout(() => {
      readyRef.value = true
    }, wait)
  }

  start()

  tryOnUnmounted(stop)

  return { readyRef, stop, start }
}