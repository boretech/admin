import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupStore } from './store'

import './tailwind.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
// import './style/theme.scss'
// temporary keep here
// import 'element-plus/dist/index.css'

const app = createApp(App)

const setup = async () => {
  // TODO: init App config

  // TODO: setup language await

  // TODO: setup router
  setupRouter(app)

  // TODO: setup store
  setupStore(app)

  // TODO: setup router guard

  // TODO: register global components

  // TODO: setup global directives?

  // TODO: setup error handling


  app.mount('#app')
}

setup()