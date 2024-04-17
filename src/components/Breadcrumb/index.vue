<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Breadcrumb' })
import { compile } from 'path-to-regexp'
const levelList = ref()
const route = useRoute()
const router = useRouter()
watch(route, newRoute => {
  if (newRoute.path.startsWith('/redirect/')) return
  getBreadcrumb()
})
onBeforeMount(() => {
  getBreadcrumb()
})
function getBreadcrumb() {
  // 只显示带有 meta.title 的路由
  let matched: any[] = route.matched.filter(item => item.meta && item.meta.title)
  levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}

function handleLink(item: any) {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  router.push(pathCompile(path))
}

function pathCompile(path: string) {
  const { params } = route
  let toPath = compile(path)
  return toPath(params)
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
