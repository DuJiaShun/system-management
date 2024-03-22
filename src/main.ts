import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { pinia } from '@/store'

import 'normalize.css/normalize.css' // css样式重置表 保证跨浏览器样式一致性
import '@/style/index.scss'

import './permission' // 路由守卫

const app = createApp(App)
app.use(pinia).use(router).mount('#app')
