import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'

import './tailwind.css'
// temporary keep here
// import 'element-plus/dist/index.css'

const app = createApp(App)

const setup = async () => {
  // TODO: setup store

  // TODO: init App config

  // TODO: register global components

  // TODO: setup language await

  // TODO: setup router
  setupRouter(app)

  // TODO: setup router guard

  // TODO: setup global directives?

  // TODO: setup error handling


  app.mount('#app')
}

setup()