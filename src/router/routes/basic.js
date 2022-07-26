import Layout from "@/layout/index.vue";

const RootRoute = {
  path: "/",
  name: "Root",
  component: Layout,
  redirect: "/dashboard",
  meta: {
    title: import.meta.env.VITE_APP_NAME,
  },
};

const LoginRoute = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/Login.vue"),
  meta: {
    title: "登录",
  },
};

const UnauthorizedRoute = {
  path: "/401",
  name: "Unauthorized",
  component: Layout,
  meta: {
    title: "无权访问",
  },
  children: [
    {
      path: "/401",
      name: "Unauthorized",
      component: () => import("@/views/Unauthorized.vue"),
      meta: {
        title: "无权访问",
      },
    },
  ],
};

const InternalServerErrorRoute = {
  path: "/500",
  name: "InternalServerError",
  component: Layout,
  meta: {
    title: "服务器内部错误",
  },
  children: [
    {
      path: "/500",
      name: "InternalServerError",
      component: () => import("@/views/InternalServerError.vue"),
      meta: {
        title: "服务器内部错误",
      },
    },
  ],
};

const NotFoundRoute = {
  path: "/:path(.*)*",
  name: "NotFound",
  component: Layout,
  meta: {
    title: "未找到",
  },
  children: [
    {
      path: "/:path(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
      meta: {
        title: "未找到",
      },
    },
  ],
};

const DashboardRoute = {
  path: "/dashboard",
  name: "Dashboard",
  component: Layout,
  meta: {
    title: "欢迎",
  },
  children: [
    {
      path: "",
      name: "Dashboard",
      component: () => import("@/views/Dashboard.vue"),
      meta: {
        title: "欢迎",
      },
    },
    // {
    //   path: "/Input",
    //   name: "Input",
    //   component: () => import("@/views/Input.vue"),
    //   meta: {
    //     title: "你好",
    //   },
    // },
  ],
};
const InputRoute = {
  path: "/input",
  name: "Input",
  component: Layout,
  meta: {
    title: "欢迎",
  },
  children: [
    {
      path: "/Input",
      name: "Input",
      component: () => import("@/views/Input.vue"),
      meta: {
        title: "欢迎",
      },
    },
  ],
};
const StatisticalRoute = {
  path: "/statistical",
  name: "Statistical",
  component: Layout,
  meta: {
    title: "欢迎",
  },
  children: [
    {
      path: "/Statistical",
      name: "Statistical",
      component: () => import("@/views/Statistical.vue"),
      meta: {
        title: "欢迎",
      },
    },
  ],
};

const RedirectRoute = {
  path: "/redirect",
  name: "Redirect",
  component: Layout,
  meta: {
    title: "正在跳转",
  },
  children: [
    {
      path: "/redirect/:path(.*)",
      name: "Redirect",
      component: () => import("@/views/Redirect.vue"),
      meta: {
        title: "正在跳转",
      },
    },
  ],
};

export const basicRoutes = [
  LoginRoute,
  RootRoute,
  DashboardRoute,
  RedirectRoute,
  InternalServerErrorRoute,
  UnauthorizedRoute,
  NotFoundRoute,
  InputRoute,
  StatisticalRoute,
];

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
