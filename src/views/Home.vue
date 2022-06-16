<template>
  <el-button type="primary">一个按钮</el-button>
  <img :src="logo" />
</template>

<script>
export default {
  name: 'Home'
}
</script>

<script setup>
import logo from '@/assets/logo.svg'
</script>