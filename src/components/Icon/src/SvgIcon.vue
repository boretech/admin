<template>
  <svg
    class="svg"
    :class="[$attrs.class, spin && 'animate-spin']"
    :width="size"
    :height="size"
    :fill="color"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup>
defineOptions({
  name: 'SvgIcon'
})

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 16
  },
  color: {
    type: String,
    default: ''
  },
  spin: {
    type: Boolean,
    default: false
  }
})

const symbolId = computed(() => `#i-${props.icon}`)
</script>

<style lang="scss" scoped>
.svg {
  // object-fit: contain;

  &-icon-spin {
    animation: svg-spin 1s infinite linear;
  }
}

@keyframes svg-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
