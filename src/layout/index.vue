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
import { useAppStore } from '@/store'
const appStore = useAppStore()

const classObj = computed(() => {
  return {
    hideSidebar: !appStore.sidebar.opened,
    openSidebar: appStore.sidebar.opened,
    withoutAnimation: appStore.sidebar.withoutAnimation
    // mobile: this.device === 'mobile'
  }
})

function handleClickOutside() {}
</script>

<style lang="scss" scoped></style>
