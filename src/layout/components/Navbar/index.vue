<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="appStore.sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleClick"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Navbar' })
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import { useAppStore } from '@/store'
const appStore = useAppStore()
function toggleClick() {
  appStore.toggleSideBar()
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
}
</style>
