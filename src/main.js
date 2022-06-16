import { createApp } from 'vue'
import router from './router'

import 'virtual:windi.css'
import 'virtual:windi-devtools'

import 'element-plus/dist/index.css'

import App from './App.vue'

const app = createApp(App)



app.use(router).mount('#app')