<template>
  <!-- <el-button type="primary" @click="toggleDark()">切换主题</el-button> -->
  <el-switch class="theme-switch" v-model="isDark" inline-prompt :active-icon="ThemeIconSunny" :inactive-icon="ThemeIconMoon" />
  <div class="text-base text-black dark:text-white">测试文字颜色</div>
  <i-ep-apple class="icon" />
  <i-ep-apple class="icon" />
  <i-ep-apple class="icon" />
  <i-ep-apple class="icon" />
  <i-ep-apple class="icon" />
  <i-ep-apple class="icon" />
  <i-ep-apple class="icon" />
  <i-ep-apple class="icon" />

  <icon />
</template>

<script setup>
import {ThemeIconMoon, ThemeIconSunny} from '@/components/Icon'
defineOptions({
  name: 'Home'
})

const isDark = useDark()

// const toggleDark = useToggle(isDark)

</script>

<style lang="scss" scoped>
.theme-switch {
  --el-switch-on-color: #393a3c;
  --el-switch-off-color: #393a3c;
}

.icon {
  color: yellow;
}
</style>