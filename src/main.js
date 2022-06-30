import { createApp } from 'vue'
import App from './App.vue'
import { setupGlobalComponents } from './components/setupGlobalComponents'
import { setupI18n } from './locale'
import { setupRouter } from './router'
import { setupStore } from './store'

import './tailwind.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import 'virtual:svg-icons-register'

const app = createApp(App)

const setup = async () => {
  // TODO: init App config

  // TODO: register global components
  setupGlobalComponents(app)

  // TODO: setup language await
  await setupI18n(app)

  // TODO: setup router
  setupRouter(app)

  // TODO: setup router guard

  // TODO: setup store
  setupStore(app)

  // TODO: setup global directives?

  // TODO: setup error handling


  app.mount('#app')
}

setup()