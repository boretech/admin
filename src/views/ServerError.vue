<template>
  <div class="w-full h-full flex flex-col items-center justify-center overflow-hidden">
    <i-ep-circle-close-filled class="text-[128px] icon-color" />
    <div class="text-9xl font-bold mt-10 font-color">
      500
    </div>
    <div class="text-4xl mt-10 mb-20 font-color">
      服务器出现了亿点点问题...
    </div>
    <router-link :to="`/redirect/${encodeURIComponent('/dashboard/test')}`">
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
