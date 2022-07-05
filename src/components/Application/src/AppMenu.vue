<template>
  <el-scrollbar>
    <el-menu
      mode="vertical"
      :collapse="menuCollapse"
    >
      <el-sub-menu index="1">
        <template #title>
          <icon
            icon="ep:menu"
          />
          <span
            v-show="!menuCollapse"
            class="ml-2"
          >Dashboard</span>
        </template>
        <el-menu-item>工作台</el-menu-item>
        <el-menu-item>分析数据</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <el-button
      type="primary"
      @click="appStore.toggleMenuCollapse()"
    >
      {{ menuCollapse ? '收起' : '展开' }}
    </el-button>
  </el-scrollbar>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { computed, onMounted } from 'vue'
const appStore = useAppStore()
// console.log(appStore)
const menuCollapse = computed(() => appStore.getMenuCollapse)
console.log(menuCollapse.value)

onMounted(() => {
  console.log(menuCollapse.value)
  // console.log(menuCollapse)
})

</script>
