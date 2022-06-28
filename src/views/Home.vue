<template>
  <!-- <el-button type="primary" @click="toggleDark()">切换主题</el-button> -->
  <el-switch class="theme-switch" v-model="isDark" inline-prompt :active-icon="Moon" :inactive-icon="Sunny" />
  <div class="text-base text-black dark:text-white">测试文字颜色</div>
</template>

<script setup>
import { Sunny, Moon } from '@element-plus/icons-vue'
defineOptions({
  name: 'Home'
})
// const name = 'Home'

// defineExpose({
//   name: 'Test'
// })

const isDark = useDark()

// const toggleDark = useToggle(isDark)

</script>

<style lang="scss" scoped>
.theme-switch {
  --el-switch-on-color: #393a3c;
  --el-switch-off-color: #393a3c;
}
</style>