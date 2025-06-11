import { createApp } from 'vue'
import { setupStore } from '@/stores'

import App from './App.vue'
import router from './router'

// 全局引入 ElementPlus
import ElementPlus from 'element-plus'
import { MotionPlugin } from '@vueuse/motion'

import './styles/reset.scss' // 引入重置样式
import './styles/index.scss' // 引入全局样式
import 'element-plus/dist/index.css' // 引入element-plus样式

const app = createApp(App)

// 全局注册@iconify/vue图标库
import { IconifyIconOffline, IconifyIconOnline, FontIcon } from '@/components/icon'
app.component('IconifyIconOffline', IconifyIconOffline)
app.component('IconifyIconOnline', IconifyIconOnline)
app.component('FontIcon', FontIcon)

app.config.globalProperties.$config = 123
app.config.globalProperties.$storage = 456
app.config.globalProperties.$echarts = 789

setupStore(app)
app.use(router)
app.use(ElementPlus)
app.use(MotionPlugin)
app.mount('#app')
