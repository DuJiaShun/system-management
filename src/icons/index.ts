import { App } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue' // svg component

export default (app: App) => {
  app.component('svg-icon', SvgIcon)
}