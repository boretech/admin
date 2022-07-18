<template>
  <app-logo />
  <el-scrollbar>
    <el-menu
      class="border-0"
      mode="vertical"
      :collapse="menuCollapse"
      :collapse-transition="false"
      @select="getIndex"
    >
      <el-sub-menu index="1">
        <template #title>
          <icon icon="ep:menu" />
          <span
            v-if="!menuCollapse"
            class="ml-2"
          >Dashboard</span>
        </template>
        <el-menu-item index="1-1">工作台</el-menu-item>
        <el-menu-item index="1-2">分析数据</el-menu-item>
        <el-menu-item route=true index="/input">项目上传</el-menu-item>

        
      </el-sub-menu>
    </el-menu>
    <!-- <el-button
      type="primary"
      @click="appStore.toggleMenuCollapse()"
    >
      {{ menuCollapse ? '收起' : '展开' }}
    </el-button> -->
  </el-scrollbar>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { computed, onMounted } from 'vue'
import AppLogo from './AppLogo.vue'
import { useRoute ,useRouter } from 'vue-router';
const router = useRouter()
const appStore = useAppStore()
// console.log(appStore)
const menuCollapse = computed(() => appStore.getMenuCollapse)
// console.log(menuCollapse.value)

function getIndex(index){
  console.log(index);
  router.push({
    path:index,
  })


}

onMounted(() => {
  // console.log(menuCollapse.value)
  // console.log(menuCollapse)
})

</script>

<style lang="scss">
.el-menu--collapse .el-sub-menu .el-sub-menu__title {
  justify-content: center;
}
</style>
