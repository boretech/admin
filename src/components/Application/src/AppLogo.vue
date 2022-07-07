<template>
  <div
    class="p-[10px] flex items-center flex-nowrap cursor-pointer"
    @click="$router.replace({path: `/redirect/${encodeURIComponent('/')}`})"
  >
    <icon
      icon="logo"
      :size="32"
    />
    <div
      v-if="showTitle"
      class="title ml-2 font-bold whitespace-nowrap"
    >
      {{ appTitle }}
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { computed } from 'vue'
import { layoutEnum } from '@/settings/enums'

defineOptions({
  name: 'AppLogo'
})

const appStore = useAppStore()

const appTitle = computed(() => appStore.getAppTitle)

const layout = computed(() => appStore.getLayout)

const menuCollapse = computed(() => appStore.menuCollapse)

const showTitle = computed(() => {
  if (layout.value === layoutEnum.DefaultLayout) {
    return !menuCollapse.value
  }

  return false
})

</script>

<style lang="scss" scoped>
.title {
  color: var(--el-text-color);
}
</style>
