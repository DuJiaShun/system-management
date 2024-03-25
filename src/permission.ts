import router from './router'
import { useUserStore } from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 关闭右侧图标

const whiteList = ['/login'] // 路由白名单

router.beforeEach((to, from) => {
  NProgress.start()
  // document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      return '/' // next 可能会出现调用多次的情况 return 则必定不会
    } else {
      // 要判断一下是否有用户信息和路由信息
      // 判断是否有路由
      // const hasGetRoutes = store.getters.allRoutes.length !== 0
      return true
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
