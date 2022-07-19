import Layout from '@/layout/index.vue'

const RootRoute = {
  path: '/',
  name: 'Root',
  component: Layout,
  redirect: '/dashboard',
  meta: {
    title: import.meta.env.VITE_APP_NAME,
    menu: false
  }
}

const LoginRoute = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/Login.vue'),
  meta: {
    title: '登录',
    menu: false
  }
}

const UnauthorizedRoute = {
  path: '/401',
  name: 'Unauthorized',
  component: Layout,
  meta: {
    title: '无权访问',
    menu: false
  },
  children: [
    {
      path: '',
      name: 'Unauthorized',
      component: () => import('@/views/Unauthorized.vue'),
      meta: {
        title: '无权访问',
        menu: false
      }
    }
  ]
}

const InternalServerErrorRoute = {
  path: '/500',
  name: 'InternalServerError',
  component: Layout,
  meta: {
    title: '服务器内部错误',
    menu: false
  },
  children: [
    {
      path: '/500',
      name: 'InternalServerError',
      component: () => import('@/views/InternalServerError.vue'),
      meta: {
        title: '服务器内部错误',
        menu: false
      }
    }
  ]
}

const NotFoundRoute = {
  path: '/:path(.*)*',
  name: 'NotFound',
  component: Layout,
  meta: {
    title: '未找到',
    menu: false
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
      meta: {
        title: '未找到',
        menu: false
      }
    }
  ]
}

const DashboardRoute = {
  path: '/dashboard',
  name: 'Dashboard',
  component: Layout,
  meta: {
    title: 'Dashboard',
    menu: true
  },
  children: [
    {
      path: '',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard/Dashboard.vue'),
      meta: {
        title: '工作台',
        menu: true
      }
    },
    {
      path: 'databoard',
      name: 'Databoard',
      component: () => import('@/views/Dashboard/Databoard.vue'),
      meta: {
        title: '数据分析',
        menu: true
      }
    }
  ]
}

const RedirectRoute = {
  path: '/redirect',
  name: 'Redirect',
  component: Layout,
  meta: {
    title: '正在跳转',
    menu: false
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'Redirect',
      component: () => import('@/views/Redirect.vue'),
      meta: {
        title: '正在跳转',
        menu: false
      }
    }
  ]
}

export const basicRoutes = [
  LoginRoute,
  RootRoute,
  DashboardRoute,
  RedirectRoute,
  InternalServerErrorRoute,
  UnauthorizedRoute,
  NotFoundRoute
]

// export const staticRoute = {
//   path: '/',
//   name: 'Root',
//   component: Layout,
//   redirect: '/dashboard',
//   meta: {
//     title: import.meta.env.VITE_APP_NAME
//   },
//   children: [
//     {
//       path: '404',
//       name: 'PageNotFound',
//       component: () => import('@/views/PageNotFound.vue'),
//       meta: {
//         title: '页面未找到'
//       }
//     },
//     {
//       path: '401',
//       name: 'Unauthorized',
//       component: () => import('@/views/Forbidden.vue'),
//       meta: {
//         title: '无访问权限'
//       }
//     },
//     {
//       path: '500',
//       name: 'ServerError',
//       component: () => import('@/views/ServerError.vue'),
//       meta: {
//         title: '服务器错误'
//       }
//     },
//     {
//       path: 'dashboard',
//       name: 'Dashboard',
//       component: () => import('@/views/Dashboard.vue')
//     }
//   ]
// }

// export const basicRoutes = [
//   {
//     path: '/',
//     name: 'Root',
//     component: Layout,
//     redirect: '/dashboard',
//     meta: {
//       title: import.meta.env.VITE_APP_NAME
//     },
//     children: [
//       {
//         path: '404',
//         name: 'PageNotFound',
//         component: () => import('@/views/PageNotFound.vue'),
//         meta: {
//           title: '页面未找到'
//         }
//       },
//       {
//         path: '401',
//         name: 'Unauthorized',
//         component: () => import('@/views/Forbidden.vue'),
//         meta: {
//           title: '无访问权限'
//         }
//       },
//       {
//         path: '500',
//         name: 'ServerError',
//         component: () => import('@/views/ServerError.vue'),
//         meta: {
//           title: '服务器错误'
//         }
//       },
//       {
//         path: 'dashboard',
//         name: 'Dashboard',
//         component: () => import('@/views/Dashboard.vue')
//       }
//     ]
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: () => import('@/views/Login.vue'),
//     meta: {
//       title: '登录'
//     }
//   },
//   {
//     path: '/redirect/:path(.*)',
//     name: 'Redirect',
//     component: () => import('@/views/Redirect.vue'),
//     meta: {
//       title: '正在跳转'
//     }
//   },
//   {
//     path: '/:path(.*)*',
//     name: 'NoSuchPage',
//     redirect: `/redirect/${encodeURIComponent('/404')}`
//   }
// ]
