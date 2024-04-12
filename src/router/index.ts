import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: { title: '工作台', icon: 'work-table', affix: true, keepAlive: true, alwaysShow: false }
      }
    ]
  },
  // 捕获所有路由
  { path: '/:catchAll(.*)', redirect: '/404' }
]
const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes: constantRoutes
})

export function resetRouter() {
  router.replace({ path: '/login' })
}

export default router
