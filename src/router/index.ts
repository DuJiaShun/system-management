import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  }
]

const router = createRouter({
  history: createWebHistory(), // createWebHashHistory(),
  routes: constantRoutes
})

export default router
