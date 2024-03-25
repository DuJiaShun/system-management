import { App } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue' // svg component


console.log(11);

export default (app: App) => {
  app.component('svg-icon', SvgIcon)
}