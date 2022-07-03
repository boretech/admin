<template>
  <div class="w-full h-full flex flex-col items-center justify-center overflow-hidden">
    <i-ep-warning-filled class="text-[128px] icon-color" />
    <div class="text-9xl font-bold mt-10 font-color">
      404
    </div>
    <div class="text-4xl mt-10 mb-20 font-color">
      糟糕，您访问的页面好像不存在...
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
  color: var(--el-color-warning);
}
.font-color {
  color: var(--el-text-color-primary);
}
</style>
