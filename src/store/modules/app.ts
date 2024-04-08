export const useAppStore = defineStore('app', () => {
  const sidebarStatus = useStorage('sidebarStatus', 1)
  const sidebar = reactive({
    opened: sidebarStatus.value.toString() ? !!sidebarStatus.value : true,
    withoutAnimation: false
  })
  // 控制侧边栏
  function toggleSideBar() {
    sidebar.opened = !sidebar.opened
    sidebar.withoutAnimation = false
    if (sidebar.opened) {
      sidebarStatus.value = 1
    } else {
      sidebarStatus.value = 0
    }
  }
  // 关闭侧边栏
  function closeSideBar({ withoutAnimation }: { withoutAnimation: boolean }) {
    sidebarStatus.value = 0
    sidebar.opened = false
    sidebar.withoutAnimation = withoutAnimation
  }

  // 桌面或移动端
  const device = ref('desktop')
  function toggleDevice(params: string) {
    device.value = params
  }

  return { sidebar, toggleSideBar, closeSideBar, device, toggleDevice }
})
