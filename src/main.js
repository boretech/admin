import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
// import 'element-plus/dist/index.css'
import 'virtual:windi-utilities.css';
import 'virtual:windi-devtools'
import 'virtual:svg-icons-register';

import { createApp } from 'vue'
import router from './router'

import App from './App.vue'

const app = createApp(App)



app.use(router).mount('#app')