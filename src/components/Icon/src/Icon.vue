<template>
  <svg-icon v-if="isSvgIcon" :class="[$attrs.class]" :icon="name" :size="size" :spin="spin" :color="color" />
  <Icon v-else :class="[spin && 'iconify-spin']" :icon="name" :width="size" :height="size" :color="color" />
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { computed } from 'vue';

defineOptions({
  name: 'Icon'
})

const props = defineProps({
  name: {
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

const isSvgIcon = computed(() => props.name.split(':').length < 2)

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