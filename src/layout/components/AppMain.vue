<template>
  <section class="app-main">
    <router-view #default="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <!-- <keep-alive :include="cachedViews"> -->
          <component :is="Component" :key="route.path"/>
        <!-- </keep-alive> -->
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts" setup>
defineOptions({ name: 'AppMain' })
// const cachedViews = computed(() => useTagsViewStore().cachedViews)
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - $navbarHeight);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: $navbarHeight;
}
.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - $navbarHeight - $tagsViewHeight);
  }
  .fixed-header + .app-main {
    padding-top: calc($navbarHeight + $tagsViewHeight);
  }
}
</style>