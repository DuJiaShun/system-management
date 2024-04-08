import { getRoutesList } from '@/api/menu'
import Layout from '@/layout/index.vue'
import router, { constantRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'

export const usePerStore = defineStore('permission', () => {
  // 所有路由
  let routes = ref<RouteRecordRaw[]>([])
  function concatRoutes(asyncRoutes: any) {
    routes.value = constantRoutes.concat(asyncRoutes)
  }
  // 动态添加路由
  function addroutes() {
    toRaw(accessedRoutes.value).forEach(i => {
      router.addRoute(i)
    })
  }
  // 获取动态路由
  let accessedRoutes = ref<any[]>([])
  function loadRoutesList() {
    return new Promise<void>((resolve, reject) => {
      getRoutesList()
        .then(({ data }) => {
          const routes = formateRoutes(data)
          accessedRoutes.value = routes
          concatRoutes(routes)
          addroutes()
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  // 格式化路由
  let Module = import.meta.glob('@/views/**/*.vue')
  function formateRoutes(data: any[]) {
    return data.map(item => {
      let src = `/src/views/${item.component}.vue`
      item.component = item.component === 'Layout' ? Layout : Module[src]
      if (item.children && item.children.length > 0) {
        formateRoutes(item.children)
      }
      return item
    })
  }
  return { routes, accessedRoutes, loadRoutesList }
})
