<template>
  <div class="tags-view-container">
    <el-scrollbar class="tags-view-scroll" :vertical="false" @wheel.prevent="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :to="{ path: tag.path, query: tag.query }"
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : ''"
      >
        {{ tag.title }}
        <i-ep-close class="el-icon-close" v-if="!tag.affix" @click.prevent.stop="closeTag(tag)" />
      </router-link>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'TagsView' })
import { RouteRecordRaw } from 'vue-router'
import { resolve } from 'path-browserify'
import { usePerStore, useTagsViewStore } from '@/store'
import { TagView } from './type'
const router = useRouter()
const route = useRoute()
const perStore = usePerStore()
const tagsViewStore = useTagsViewStore()
const { visitedViews } = storeToRefs(tagsViewStore)

onMounted(() => {
  initTags()
})
const affixTags = ref<TagView[]>([])
function initTags() {
  const tags: TagView[] = filterAffixTags(perStore.routes)
  affixTags.value = tags
  for (const tag of tags) {
    // 必须要有name
    if (tag.name) tagsViewStore.addVisitedView(tag)
  }
}
// 过滤固定在开头的路由
function filterAffixTags(routes: RouteRecordRaw[], basePath = '/') {
  let tags: TagView[] = []
  routes.forEach((route: RouteRecordRaw) => {
    const tagPath = resolve(basePath, route.path)
    if (route.meta?.affix) {
      tags.push({
        path: tagPath,
        fullPath: tagPath,
        name: route.name as string,
        title: route.meta?.title as string,
        affix: route.meta?.affix as boolean,
        keepAlive: route.meta?.keepAlive as boolean
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, basePath + route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

watch(
  route,
  () => {
    addTags()
  },
  { immediate: true }
)

// 添加标签页
function addTags() {
  if (route.meta.title) {
    tagsViewStore.addView({
      name: route.name as string,
      title: route.meta.title as string,
      path: route.path,
      fullPath: route.fullPath,
      affix: route.meta?.affix as boolean,
      keepAlive: route.meta?.keepAlive as boolean
    })
  }
}

// 关闭标签页
function closeTag(view: TagView) {
  tagsViewStore.delView(view).then((res: any) => {
    // 判断是否是当前已激活的页面 则顺延激活下一个页面
    if (isActive(view)) {
      toNextView(res.visitedViews, res.delVisitedIndex, view)
    }
  })
}

// 判断当前标签页是否激活
function isActive(tag: TagView) {
  return tag.path === route.path
}

// 激活下一个页面
function toNextView(visitedViews: TagView[], nextIndex: number, view?: TagView) {
  // 如果右侧有页面则激活右侧的 否则激活左侧的
  let nextView: TagView = visitedViews.length > nextIndex ? visitedViews[nextIndex] : visitedViews[nextIndex - 1]
  router.push(nextView.fullPath)
}
function handleScroll() {}
</script>

<style lang="scss" scoped>
.tags-view-container {
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  .tags-view-scroll {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        border-color: #42b983;
        color: #fff;
      }
      .el-icon-close {
        border-radius: 50%;
        vertical-align: -2px;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        &:hover {
          background-color: #b4bccc;
        }
      }
    }
  }
}
</style>
