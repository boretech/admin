<template>
  <el-container :class="prefixCls" v-bind="lockEvents">
    <layout-features />
    <layout-header fixed v-if="getShowFullHeaderRef" />
    <el-container :class="[layoutClass]">
      <layout-side-bar v-if="getShowSidebar || getIsMobile" />
      <el-container :class="`${prefixCls}-main`">
        <layout-multiple-header />
        <layout-content />
        <layout-footer />
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent, computed, unref } from 'vue'
import { ElContainer } from 'element-plus'
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'
import LayoutHeader from './header/index.vue'
import LayoutContent from './content/index.vue'
import LayoutSideBar from './sider/index.vue'
import LayoutMultipleHeader from './header/MultipleHeader.vue'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useDesign } from '@/hooks/web/useDesign'
import { useLockPage } from '@/hooks/web/useLockPage'
import { useAppInject } from '@/hooks/web/useAppInject'
export default defineComponent({
  name: 'DefaultLayout',
  components: {
    LayoutFeatures: createAsyncComponent(() => import('@/layouts/default/feature/index.vue')),
    LayoutFooter: createAsyncComponent(() => import('@/layouts/default/footer/index.vue')),
    LayoutHeader,
    LayoutContent,
    LayoutSideBar,
    LayoutMultipleHeader,
    ElContainer,
  },
  setup() {
    const { prefixCls } = useDesign('default-layout')
    const { getIsMobile } = useAppInject()
    const { getShowFullHeaderRef } = useHeaderSetting()
    const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting()
    // Create a lock screen monitor
    const lockEvents = useLockPage()
    const layoutClass = computed(() => {
      let cls = ['ant-layout']
      if (unref(getIsMixSidebar) || unref(getShowMenu)) {
        cls.push('ant-layout-has-sider')
      }
      return cls
    })
    return {
      getShowFullHeaderRef,
      getShowSidebar,
      prefixCls,
      getIsMobile,
      getIsMixSidebar,
      layoutClass,
      lockEvents,
    }
  },
})
</script>

<style lang="sass">
  @prefix-cls: ~'@{namespace}-default-layout';
  .@{prefix-cls} {
    display: flex;
    width: 100%;
    min-height: 100%;
    background-color: @content-bg;
    flex-direction: column;
    > .ant-layout {
      min-height: 100%;
    }
    &-main {
      width: 100%;
      margin-left: 1px;
    }
  }
</style>