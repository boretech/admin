<template>
  <Scrollbar ref="scrollbarRef" class="scroll-container" v-bind="$attrs">
    <slot></slot>
  </Scrollbar>
</template>

<script>
import { defineComponent, ref, unref, nextTick } from 'vue'
import { Scrollbar, ScrollbarType } from '@/components/Scrollbar/index.js'
import { useScrollTo } from '@/hooks/event/useScrollTo.js'
export default defineComponent({
  name: 'ScrollContainer',
  components: { Scrollbar },
  setup() {
    const scrollbarRef = ref(null)
    /**
     * Scroll to the specified position
     */
    const scrollTo = (to, duration = 500) => {
      const scrollbar = unref(scrollbarRef)
      if (!scrollbar) {
        return
      }
      nextTick(() => {
        const wrap = unref(scrollbar.wrap)
        if (!wrap) {
          return
        }
        const { start } = useScrollTo({
          el: wrap,
          to,
          duration,
        });
        start()
      })
    }
    const getScrollWrap = () => {
      const scrollbar = unref(scrollbarRef)
      if (!scrollbar) {
        return null
      }
      return scrollbar.wrap
    }
    /**
     * Scroll to the bottom
     */
    const scrollBottom = () => {
      const scrollbar = unref(scrollbarRef)
      if (!scrollbar) {
        return
      }
      nextTick(() => {
        const wrap = unref(scrollbar.wrap)
        if (!wrap) {
          return
        }
        const scrollHeight = wrap.scrollHeight
        const { start } = useScrollTo({
          el: wrap,
          to: scrollHeight,
        })
        start()
      })
    }
    return {
      scrollbarRef,
      scrollTo,
      scrollBottom,
      getScrollWrap,
    }
  },
})
</script>

<style lang="sass">
.scroll-container {
  width: 100%;
  height: 100%;

  .scrollbar__wrap {
    margin-bottom: 18px !important;
    overflow-x: hidden;
  }

  .scrollbar__view {
    box-sizing: border-box;
  }
}
</style>