// import {t} =

import { pageEnum, pageNameEnum } from "@/settings/enum/page"
import { Layout } from '@/components/Layout'

const { HOME } = pageEnum
const { PAGE_NOT_FOUND_NAME, REDIRECT_NAME } = pageNameEnum

export const rootRoute = {
  path: '/',
  name: 'Root',
  redirect: HOME,
  meta: {
    title: 'Root'
  }
}

export const loginRoute = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/system/Login.vue'),
  meta: {
    title: t('routes.basic.login')
  }
}

export const pageNotFoundRoute = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: Layout,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: () => import('@/views/system/Exception.vue'),
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ]
}

export const redirectRoute = {
  path: '/redirect',
  component: Layout,
  name: 'RedirectTo',
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('@/views/system/Redirect.vue'),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    }
  ]
}

export const errorLogRoute = {
  path: '/error-log',
  name: 'ErrorLog',
  component: Layout,
  redirect: '/error-log/list',
  meta: {
    title: 'ErrorLog',
    hideBreadcrumb: true,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'list',
      name: 'ErrorLogList',
      component: () => import('@/views/system/ErrorLog.vue'),
      meta: {
        title: t('routes.basic.errorLogList'),
        hideBreadcrumb: true,
        currentActiveMenu: '/error-log',
      },
    },
  ]
}

export const staticRoutes = [
  rootRoute,
  loginRoute,
  redirectRoute,
  errorLogRoute
]