import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'

import './styles/reset.scss' // 引入重置样式
import 'element-plus/dist/index.css' // 引入element-plus样式

const app = createApp(App)

// 全局注册@iconify/vue图标库
import { IconifyIconOffline, IconifyIconOnline, FontIcon } from '@/components/icon'
app.component('IconifyIconOffline', IconifyIconOffline)
app.component('IconifyIconOnline', IconifyIconOnline)
app.component('FontIcon', FontIcon)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
