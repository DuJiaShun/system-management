<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
      >
        <sidebar-item v-for="route in perStore.routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Sidebar' })
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.module.scss'
import { useAppStore, usePerStore, useSetStore } from '@/store'
import Logo from './Logo.vue'
const route = useRoute()
const appStore = useAppStore()
const perStore = usePerStore()
const setStore = useSetStore()

const showLogo = computed(() => {
  return setStore.sidebarLogo
})
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) meta.activeMenu
  return path
})
const isCollapse = computed(() => {
  return !appStore.sidebar.opened
})
</script>

<style lang="scss" scoped></style>
