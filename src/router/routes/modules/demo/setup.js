import { LAYOUT } from '@/router/constant.js'
import { t } from '@/hooks/web/useI18n.js'

const setup = {
  path: '/setup',
  name: 'SetupDemo',
  component: LAYOUT,
  redirect: '/setup/index',
  meta: {
    orderNo: 90000,
    hideChildrenInMenu: true,
    icon: 'whh:paintroll',
    title: t('routes.demo.setup.page'),
  },
  children: [
    {
      path: 'index',
      name: 'SetupDemoPage',
      component: () => import('@/views/demo/setup/index.vue'),
      meta: {
        title: t('routes.demo.setup.page'),
        icon: 'whh:paintroll',
        hideMenu: true,
      },
    },
  ],
}

export default setup