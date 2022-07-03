<template>
  <el-container>
    <el-aside width="210px"></el-aside>
    <el-container>
      <el-header>
        <div class="text">测试</div>
        <div class="box"></div>
        <el-button type="primary" @click="changeColor">改变主题颜色</el-button>
      </el-header>
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import AppMain from '@/components/AppMain.vue'
const changeColor = () => { }
</script>
