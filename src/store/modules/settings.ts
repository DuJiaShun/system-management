import defaultSettings from '@/settings'
const { tagsView, fixedHeader, sidebarLogo } = defaultSettings

export const useSetStore = defineStore('settings', () => {
  return { tagsView, fixedHeader, sidebarLogo }
})
