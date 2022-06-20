<template>
  <el-button v-bind="getBindValue" :class="getButtonClass" @click="onClick">
    <template #default="data">
      <icon :icon="preIcon" v-if="preIcon" :size="iconSize" />
      <slot v-bind="data || {}" />
      <icon :icon="postIcon" v-if="postIcon" :size="iconSize" />
    </template>
  </el-button>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AButton',
  inheritAttrs: false,
});
</script>

<script setup>
import { computed, unref } from 'vue'
import Icon from '@/components/Icon/src/Icon.vue'
import { buttonProps } from './props.js'
import { useAttrs } from '@/hooks/core/useAttrs.js'
const props = defineProps(buttonProps)
// get component class
const attrs = useAttrs({ excludeDefaultKeys: false });
const getButtonClass = computed(() => {
  const { color, disabled } = props
  return [
    {
      [`ant-btn-${color}`]: !!color,
      [`is-disabled`]: disabled,
    },
  ]
})
// get inherit binding value
const getBindValue = computed(() => ({ ...unref(attrs), ...props }))
</script>