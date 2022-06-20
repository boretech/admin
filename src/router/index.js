import { createRouter, createWebHashHistory } from 'vue-router'
import { basicRoutes } from './routes/index.js'

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST = []
const getRouteNames = (array) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || [])
  })
getRouteNames(basicRoutes)

// app router
// 创建一个可以被 Vue 应用程序使用的路由实例
export const router = createRouter({
  // 创建一个 hash 历史记录。
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  // 应该添加到路由的初始路由列表。
  routes: basicRoutes,
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// reset router
export const resetRouter = () => {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

// config router
// 配置路由器
export const setupRouter = (app) => {
  app.use(router)
}