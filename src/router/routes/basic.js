import Layout from '@/layout/index.vue'

export const basicRoutes = [
  {
    path: '/',
    name: 'Root',
    component: Layout,
    meta: {
      title: import.meta.env.VITE_APP_NAME
    },
    children: [
      {
        path: '404',
        name: 'PageNotFound',
        component: () => import('@/views/PageNotFound.vue'),
        meta: {
          title: '页面未找到'
        }
      },
      {
        path: '401',
        name: 'Forbidden',
        component: () => import('@/views/Forbidden.vue'),
        meta: {
          title: '无访问权限'
        }
      },
      {
        path: '500',
        name: 'ServerError',
        component: () => import('@/views/ServerError.vue'),
        meta: {
          title: '服务器错误'
        }
      }
    ]
  },
  {
    path: '/redirect/:path(.*)',
    name: 'Redirect',
    component: () => import('@/views/Redirect.vue'),
    meta: {
      title: '正在跳转'
    }
  }
]
