<template>
  <div :class="classObj" class="app-wrapper">
    <div class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <app-main />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Layout' })
import AppMain from './components/AppMain.vue'
import { useAppStore } from '@/store'
const appStore = useAppStore()

const classObj = computed(() => {
  return {
    // hideSidebar: !appStore.sidebar.opened,
    openSidebar: appStore.sidebar.opened
    // withoutAnimation: appStore.sidebar.withoutAnimation
    // mobile: this.device === 'mobile'
  }
})

function handleClickOutside() {}
</script>

<style lang="scss" scoped>
// @import '@/styles/variables.scss';

.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  .openSidebar {
  position: fixed;
  top: 0;
}
}


// .drawer-bg {
//   background: #000;
//   opacity: 0.3;
//   width: 100%;
//   top: 0;
//   height: 100%;
//   position: absolute;
//   z-index: 999;
// }

// .fixed-header {
//   position: fixed;
//   top: 0;
//   right: 0;
//   z-index: 9;
//   width: calc(100% - #{$sideBarWidth});
//   transition: width 0.28s;
// }

// .hideSidebar .fixed-header {
//   width: calc(100% - 54px);
// }

// .mobile .fixed-header {
//   width: 100%;
// }
</style>
