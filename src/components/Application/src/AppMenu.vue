<template>
  <el-scrollbar>
    <el-menu
      class="border-0"
      :collapse="menuCollapse"
    >
      <el-sub-menu index="1">
        <template #title>
          <icon icon="ep:menu" />
          <span class="ml-2">Dashboard</span>
        </template>
        <el-menu-item>工作台</el-menu-item>
        <el-menu-item>分析数据</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { computed } from 'vue'
const appStore = useAppStore()
console.log(appStore)
const menuCollapse = computed(() => appStore.gteMenuCollapse)

</script>
