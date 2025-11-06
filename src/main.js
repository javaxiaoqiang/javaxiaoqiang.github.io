import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './locales'
import pinia from './stores'

// 导入全局样式
import './assets/main.css'

// 创建应用实例
const app = createApp(App)

// 使用插件
app.use(router)
app.use(i18n)
app.use(pinia)

// 挂载应用
app.mount('#app')
