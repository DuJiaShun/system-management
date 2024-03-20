import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";

const app = createApp(App)

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus).use(router)

app.mount('#app')
