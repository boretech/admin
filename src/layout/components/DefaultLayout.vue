<template>
  <el-container class="w-screen h-screen overflow-hidden">
    <el-aside
      class="flex flex-col transition-all menu-bg"
      :style="{ width: menuCollapse ? '64px' : '210px' }"
    >
      <app-menu />
    </el-aside>
    <el-container>
      <el-header class="header-bg">
        <app-header />
      </el-header>
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { AppMenu, AppHeader } from '@/components/Application'
import { computed } from 'vue'

const appStore = useAppStore()
// const changeColor = () => { }

const menuCollapse = computed(() => appStore.getMenuCollapse)

const menuBgColor = ref('#1d1d1d')
const headerBgColor = ref('#191919')

</script>

<style lang="scss" scoped>
.menu-bg {
  background-color: v-bind(menuBgColor);
}

.header-bg {
  background-color: v-bind(headerBgColor);
}
</style>
