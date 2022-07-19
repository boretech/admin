import Layout from '@/layout/index.vue'

export const promotionRoute = {
  path: '/promotion',
  name: 'Promotion',
  component: Layout,
  redirect: '/promotion/icons',
  meta: {
    title: '功能'
  },
  children: [
    {
      path: 'icons',
      name: 'Icons',
      component: () => import('@/views/promotion/Icons.vue'),
      meta: {
        title: '图标'
      }
    }
  ]
}

