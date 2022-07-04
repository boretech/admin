<template>
  <div class="w-full h-full flex flex-col items-center justify-center overflow-hidden">
    <i-ep-remove-filled class="text-[128px] icon-color" />
    <div class="text-9xl font-bold mt-10 font-color">
      401
    </div>
    <div class="text-4xl mt-10 mb-20 font-color">
      抱歉，您没有访问此页面的权限
    </div>
    <router-link :to="`/redirect/${encodeURIComponent('/dashboard')}`">
      <el-button type="primary">
        返回首页
      </el-button>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.icon-color {
  color: var(--el-color-error);
}
.font-color {
  color: var(--el-text-color-primary);
}
</style>
