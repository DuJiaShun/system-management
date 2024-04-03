<template>
  <div :class="{ show: show }" class="search">
    <svg-icon class-name="search-icon" icon-class="search" @click.stop="click" />
    <el-select
      ref="searchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="search-select"
      @change="change"
    >
      <el-option v-for="item in options" :key="item.path" :value="item" :label="item.title.join(' > ')" />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Search' })
import Fuse from 'fuse.js'
import { resolve } from 'path-browserify'
import { usePerStore } from '@/store'
import { RouteRecordRaw } from 'vue-router'
let search = ref('')
// 搜索池
let searchPool = ref(filterRoutes(usePerStore().routes))
// watch 的对象一定是响应式的
watch(searchPool, newValue => {
  initFuse(newValue)
})
// 过滤路由
function filterRoutes(routes: RouteRecordRaw[], prefixTitle: string[] = []) {
  let res: any[] = []
  for (const router of routes) {
    // 跳过隐藏的路由
    if (router.meta?.hidden) {
      continue
    }
    const data = {
      path: resolve('/', router.path),
      title: [...prefixTitle]
    }
    // 筛选含有 title 的路由
    if (router.meta && router.meta.title) {
      data.title = [...data.title, router.meta.title as string]
      // 需要排除重定向到父路由的子路由
      if (router.redirect !== 'noRedirect') {
        res.push(data)
      }
    }
    // 递归子路由
    if (router.children) {
      const tempRoutes = filterRoutes(router.children, data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}

// 初始化Fuse工具
let fuse: any = null
function initFuse(list: any) {
  fuse = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    // maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'path', weight: 0.3 }
    ]
  })
}

// 搜索框的显示和关闭
const searchSelect = ref() // 实例化
let show = ref(false)
watch(show, newValue => {
  if (newValue) {
    document.body.addEventListener('click', close)
  } else {
    document.body.removeEventListener('click', close)
  }
})
function click() {
  show.value = !show.value
  if (show.value) {
    searchSelect.value && searchSelect.value.focus()
  }
}
let options = ref([])
function close() {
  searchSelect.value && searchSelect.value.blur()
  options.value = []
  show.value = false
}

function change() {}
// 远程搜索
function querySearch(query: string) {
  if (query !== '') {
    options.value = fuse.search(query)
  } else {
    options.value = []
  }
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
  }
  .search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    :deep(.el-select__wrapper) {
      border: 0;
      padding-left: 0;
      padding-right: 0;
      border-radius: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
    }
  }
}
.show {
  .search-select {
    width: 210px;
    margin-left: 10px;
  }
}
</style>
