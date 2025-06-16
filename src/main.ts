import { createApp, type Directive } from 'vue'
import { setupStore } from '@/stores'

import App from './App.vue'
import router from './router'

// 全局引入 ElementPlus
import ElementPlus from 'element-plus'
import { MotionPlugin } from '@vueuse/motion'

import './styles/reset.scss' // 引入重置样式
import './styles/index.scss' // 引入全局样式
import 'element-plus/dist/index.css' // 引入element-plus样式

import { getPlatformConfig } from './config'
import { injectResponsiveStorage } from '@/utils/responsive'

const app = createApp(App)

// 注册自定义指令
import * as directives from '@/directives'
Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

// 全局注册@iconify/vue图标库
import { IconifyIconOffline, IconifyIconOnline, FontIcon } from '@/components/icon'
app.component('IconifyIconOffline', IconifyIconOffline)
app.component('IconifyIconOnline', IconifyIconOnline)
app.component('FontIcon', FontIcon)

// 全局注册 vue-tippy
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import VueTippy from 'vue-tippy'
app.use(VueTippy)

getPlatformConfig(app).then(async (config) => {
  setupStore(app)
  app.use(router)

  injectResponsiveStorage(app, config)
  app.use(ElementPlus)
  app.use(MotionPlugin)
  app.mount('#app')
})
