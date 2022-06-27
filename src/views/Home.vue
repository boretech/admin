<template>
  <ElButton type="primary" @click="changeTheme">切换主题</ElButton>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'
import {} from 'vue'

defineOptions({
  name: 'Home'
})
// const name = 'Home'

// defineExpose({
//   name: 'Test'
// })

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
})

const changeTheme = () => {
  useToggle(isDark)
  console.log(isDark)
}

</script>