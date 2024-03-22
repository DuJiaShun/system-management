import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: { title: '主页' }
  },
  // 兜底路由
  { path: '/:catchAll(.*)', redirect: '/404' }
]

const router = createRouter({
  history: createWebHistory(), // createWebHashHistory(),
  routes: constantRoutes
})

export default router
