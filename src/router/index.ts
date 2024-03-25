import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: { title: '主页', icon: 'star', affix: true, keepAlive: true, alwaysShow: false }
      }
    ]
  },
  // 兜底路由
  { path: '/:catchAll(.*)', redirect: '/404' }
]

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes: constantRoutes
})

export default router
