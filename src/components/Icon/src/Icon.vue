<template>
  <svg-icon
    v-if="isSvgIcon"
    :class="[$attrs.class]"
    :icon="icon"
    :size="size"
    :spin="spin"
    :color="color"
  />
  <iconify-vue
    v-else
    :class="[$attrs.class, spin && 'iconify-spin']"
    :icon="icon"
    :width="size"
    :height="size"
    :spin="spin"
    :color="color"
  />
</template>

<script setup>
import { Icon as IconifyVue } from '@iconify/vue'

defineOptions({
  name: 'Icon'
})

const props = defineProps({
  icon: {
    type: String,
    required: true,
    default: ''
  },
  size: {
    type: [Number, String],
    default: 16
  },
  spin: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: ''
  }
})

const isSvgIcon = computed(() => props.icon.split(':').length < 2)
</script>

<style lang="scss" scoped>
.iconify-spin {
  animation: spin 1s infinite linear;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
