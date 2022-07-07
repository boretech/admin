import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router'
import { createPinia } from 'pinia'
import { setupGlobalComponents } from '@/components/setupGlobalComponents'

import 'virtual:svg-icons-register'
import './styles/tailwind.css'
// import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/custom.scss'

const app = createApp(App)

setupGlobalComponents(app)

// console.log(import.meta.env.VITE_APP_NAME)

app
  .use(router)
  .use(createPinia())
  .mount('#app')
