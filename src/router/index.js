import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})