import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore, usePerStore } from '@/store'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 关闭右侧图标

const whiteList = ['/login'] // 路由白名单

router.beforeEach(async (to, from) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      return '/' // next 可能会出现调用多次的情况 return 则必定不会
    } else {
      const userStore = useUserStore()
      const perStore = usePerStore()
      const hasUserinfo = !!userStore.userinfo
      const hasSideMenu = perStore.accessedRoutes && perStore.accessedRoutes.length !== 0
      // 要判断一下是否有用户信息和路由信息
      if (hasUserinfo && hasSideMenu) {
        return true
      } else {
        try {
          // 获取用户信息
          await userStore.loadUserinfo()
          await perStore.loadRoutesList()
          // 动态路由页面刷新时重定向到当前页面 避免被404拦截
          return to.redirectedFrom ? { ...to.redirectedFrom, replace: true } : { ...to, replace: true }
        } catch (error) {
          console.log(error)
          // 删除token并转到登录页面重新登录
          await userStore.resetToken()
          return `/login?redirect=${to.path}`
        }
      }
    }
  } else {
    // 没有token但是在白名单里的 可以直接访问 否则就重定向到登录页
    if (whiteList.indexOf(to.path) !== -1) {
      return true
    } else {
      return `/login?redirect=${to.path}`
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
