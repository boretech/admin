<template>
  <component :is="getLayout(currentLayout)">
    <router-view />
  </component>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { generateColors } from '@element-plus/colors'
import { computed } from 'vue'
import { getLayout } from './components'

const appStore = useAppStore()

const currentLayout = computed(() => appStore.getLayout)

defineOptions({
  name: 'Layout'
})

const elPrimaryColor = ref('#409eff')

const elHeaderColor = ref('#999')

const changeColor = () => {
  elPrimaryColor.value = '#f00'
  console.log(generateColors('#ff0'))
  console.log(elPrimaryColor.value)
  document.documentElement.style.setProperty('--el-color-primary', '#f00');
}

</script>

<style lang="scss" scoped>
.text {
  color: var(--el-color-primary);
}

.el-header {
  background-color: v-bind(elHeaderColor);
  --el-header-height: auto;
  max-height: 60px;
}

.box {
  width: 100px;
  height: 100px;
}
</style>

<style lang="scss">
:root,
html.dark {
  --el-color-primary: v-bind(elPrimaryColor);
}
</style>
