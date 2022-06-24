import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import DefineOptions from 'unplugin-vue-define-options'

export default defineConfig({
  plugins: [
    Vue(),
    DefineOptions(),
    WindiCSS()
  ]
})