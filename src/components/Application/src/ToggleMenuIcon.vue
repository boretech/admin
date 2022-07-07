<template>
  <div
    class="flex items-center h-full cursor-pointer"
    @click="appStore.toggleMenuCollapse()"
  >
    <icon
      v-if="menuCollapse"
      icon="ep:expand"
      size="22"
    />
    <icon
      v-else
      icon="ep:fold"
      size="22"
    />
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const menuCollapse = computed(() => appStore.getMenuCollapse)

</script>
