<template>
  <div>
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.module.scss'
defineOptions({ name: 'Sidebar' })
const route = useRoute()
console.log(useRouter().getRoutes());

const permission_routes = useRouter().getRoutes()
const activeMenu:string = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const isCollapse:boolean = computed(() => {
  return false
})
</script>

<style lang="scss" scoped></style>
