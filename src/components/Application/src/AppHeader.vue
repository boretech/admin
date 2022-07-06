<template>
  <div class="w-full h-full">
    <div class="h-full flex items-center">
      <toggle-menu-icon class="mr-2" />
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item
          :to="{ path: '/' }"
        >
          <icon
            class="mr-1"
            icon="ep:menu"
          />
          <span>homepage</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>promotion management</el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import ToggleMenuIcon from './ToggleMenuIcon.vue'
</script>
