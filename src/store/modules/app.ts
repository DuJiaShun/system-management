import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  // 控制侧边栏
  const sidebarStatus = useStorage('sidebarStatus', 1)
  console.log(sidebarStatus, 'sidebarStatus')
  const sidebar = reactive({
    opened: true,
    withoutAnimation: false
  })
  function toggleSideBar() {
    sidebar.opened = !sidebar.opened
    sidebar.withoutAnimation = false
    useStorage('sidebarStatus', 0)
    if (sidebar.opened) {
      useStorage('sidebarStatus', 1)
    } else {
      useStorage('sidebarStatus', 0)
    }
  }

  return { sidebar, toggleSideBar }
})