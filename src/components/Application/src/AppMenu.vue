<template>
  <app-logo />
  <el-scrollbar>
    <el-menu
      class="border-0"
      mode="vertical"
      :collapse="menuCollapse"
      :collapse-transition="false"
    >
      <el-sub-menu index="1">
        <template #title>
          <icon icon="ep:menu" />
          <span
            v-if="!menuCollapse"
            class="ml-2"
          >Dashboard</span>
        </template>
        <el-menu-item>工作台</el-menu-item>
        <el-menu-item>分析数据</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <!-- <el-button
      type="primary"
      @click="appStore.toggleMenuCollapse()"
    >
      {{ menuCollapse ? '收起' : '展开' }}
    </el-button> -->
  </el-scrollbar>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { computed, onMounted } from 'vue'
import AppLogo from './AppLogo.vue'
const appStore = useAppStore()
// console.log(appStore)
const menuCollapse = computed(() => appStore.getMenuCollapse)
// console.log(menuCollapse.value)

onMounted(() => {
  // console.log(menuCollapse.value)
  // console.log(menuCollapse)
})

</script>

<style lang="scss">
.el-menu--collapse .el-sub-menu .el-sub-menu__title {
  justify-content: center;
}
</style>
