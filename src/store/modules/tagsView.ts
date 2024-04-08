import { TagView } from '@/layout/components/TagsView/type'
import { ITEM_RENDER_EVT } from 'element-plus/es/components/virtual-list/src/defaults'

export const useTagsViewStore = defineStore('tagsView', () => {
  const visitedViews = ref<TagView[]>([]) // 已访问的页面
  // 添加路由到已访问列表中
  function addVisitedView(view: TagView) {
    // 如果已存在 不再次添加
    if (visitedViews.value.some(v => v.path === view.path)) return
    // affix = true 的路由添加在已访问列表的开头
    if (view.affix) {
      visitedViews.value.unshift(view)
    } else {
      visitedViews.value.push(view)
    }
  }

  const cachedViews = ref<string[]>([]) // 缓存的页面
  // 添加缓存视图到缓存视图列表中
  function addCachedView(view: TagView) {
    const viewName = view.name
    // 缓存页面列表中已存在 则不再添加
    if (cachedViews.value.includes(viewName)) return
    // keepAlive = true
    if (view.keepAlive) {
      cachedViews.value.push(viewName)
    }
  }

  // 添加标签页
  function addView(view: TagView) {
    addVisitedView(view)
    addCachedView(view)
  }

  // 删除标签页
  function delView(view: TagView) {
    return new Promise(async resolve => {
      const delVisited = await delVisitedView(view)
      delCachedView(view)
      resolve({
        visitedViews: [...visitedViews.value],
        delVisitedIndex: delVisited,
        cachedViews: [...cachedViews.value]
      })
    })
  }

  // 删除指定页面
  function delVisitedView(view: TagView) {
    return new Promise(resolve => {
      for (const [i, v] of visitedViews.value.entries()) {
        // 找到与指定视图路径匹配的视图，在已访问视图列表中删除该视图
        if (v.path === view.path) {
          visitedViews.value.splice(i, 1)
          resolve(i)
          break
        }
      }
    })
  }
  // 删除指定缓存页面
  function delCachedView(view: TagView) {}

  function updateVisitedView(view: TagView) {
    for (let v of visitedViews.value) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
  return { visitedViews, addVisitedView, cachedViews, addCachedView, addView, delView, updateVisitedView }
})
