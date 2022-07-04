<template>
  <el-container class="w-screen h-screen overflow-hidden">
    <el-aside
      class="flex flex-col"
      width="210px"
    >
      <app-logo />
      <app-menu />
    </el-aside>
    <el-container>
      <el-header>
        <div class="text">
          测试
        </div>
        <div class="box" />
        <el-button
          type="primary"
          @click="changeColor"
        >
          改变主题颜色
        </el-button>
      </el-header>
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { AppLogo, AppMenu } from '@/components/Application'

const changeColor = () => { }
</script>
