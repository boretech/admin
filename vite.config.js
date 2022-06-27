import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import DefineOptions from 'unplugin-vue-define-options/vite'
import Mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [
    Vue(),
    DefineOptions(),
    WindiCSS(),
    Mkcert()
  ],
  server: {
    open: true,
    https: true
  },
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: () => '/src/'
      }
    ]
  }
})