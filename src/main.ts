import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './styles/reset.scss' // 引入重置样式
import 'element-plus/dist/index.css' // 引入element-plus样式

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
