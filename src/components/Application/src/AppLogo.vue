<template>
  <div class="p-[10px] flex items-center">
    <icon
      icon="logo"
      :size="32"
    />
    <div class="title ml-2 font-bold">
      {{ appTitle }}
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { computed } from 'vue'

defineOptions({
  name: 'AppLogo'
})

const appStore = useAppStore()

const appTitle = computed(() => appStore.getAppTitle)

</script>

<style lang="scss" scoped>
.title {
  color: var(--el-text-color);
}
</style>
