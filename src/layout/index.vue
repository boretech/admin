<template>
  <el-container class="w-[100vw] h-[100vh] overflow-hidden ">
    <el-header><div>测试</div></el-header>
    <app-main />
  </el-container>
</template>

<script setup>
import AppMain from '@/components/AppMain.vue'

defineOptions({
  name: 'Layout'
})

const elHeaderColor = ref('#999')

</script>

<style lang="scss">
.el-header {
  background-color: v-bind(elHeaderColor);
  --el-header-height: auto;
  max-height: 60px;
}
</style>
