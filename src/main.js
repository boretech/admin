import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupStore } from './store'
import { setupGlobalComponents } from './utils'

import './tailwind.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import 'virtual:svg-icons-register'

const app = createApp(App)

const setup = async () => {
  // TODO: init App config

  // TODO: setup language await

  // TODO: setup router
  setupRouter(app)

  // TODO: setup store
  setupStore(app)

  // TODO: register global components
  setupGlobalComponents(app)

  // TODO: setup global directives?

  // TODO: setup error handling


  app.mount('#app')
}

setup()