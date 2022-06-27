<template>
  <section class="full-loading" :class="{ absolute, [theme]: !!theme }"
    :style="[background ? `background-color: ${background}` : '']" v-show="loading">
    <!-- <Spin v-bind="$attrs" :tip="tip" :size="size" :spinning="loading" /> -->
  </section>
</template>

<script>
import { defineComponent } from 'vue'
// import { Spin } from 'ant-design-vue'
import { SizeEnum } from '@/enums/sizeEnum.js'
export default defineComponent({
  name: 'Loading',
  components: { Spin },
  props: {
    tip: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: SizeEnum.LARGE,
      validator: (v) => {
        return [SizeEnum.DEFAULT, SizeEnum.SMALL, SizeEnum.LARGE].includes(v)
      },
    },
    absolute: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
    },
    theme: {
      type: String,
    },
  },
})
</script>

<style lang="sass" scoped>
  .full-loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgb(240 242 245 / 40%);
    &.absolute {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 300;
    }
  }
  html[data-theme='dark'] {
    .full-loading:not(.light) {
      background-color: @modal-mask-bg;
    }
  }
  .full-loading.dark {
    background-color: @modal-mask-bg;
  }
</style>