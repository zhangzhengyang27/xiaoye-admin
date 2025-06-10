import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入重置样式
import './style/reset.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
