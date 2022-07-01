import { resolve } from 'path'
import { readFileSync } from 'fs'
import { defineConfig, loadEnv } from 'vite'
import dayjs from 'dayjs'

import { generateEnv } from './build/vite/env.js'
import { setupPlugins } from './build/vite/plugins.js'
import { setupProxy } from './build/vite/proxy.js'

const pkg = JSON.parse(readFileSync(resolve('./package.json'), 'utf-8'))
const { name, version, dependencies, devDependencies } = pkg

const AppInfo = {
  pkg: { name, version, dependencies, devDependencies },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export default defineConfig(({ command, mode }) => {
  process.env.NODE_ENV = mode
  const root = process.cwd()
  const env = generateEnv(loadEnv(mode, root))
  const { VITE_PORT, VITE_BASE, VITE_PROXY, VITE_DROP_CONSOLE, VITE_HTTPS, VITE_OPEN, VITE_OUTPUT } = env
  console.log(env)
  return {
    root,
    base: VITE_BASE || '/',
    define: {
      APP_INFO: JSON.stringify(AppInfo)
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(process.cwd(), 'src')
        }
      ]
    },
    plugins: setupPlugins(env, mode),
    server: {
      https: VITE_HTTPS,
      host: true,
      open: VITE_OPEN,
      port: VITE_PORT || 3000,
      proxy: setupProxy(VITE_PROXY, mode)
    },
    esbuild: {
      pure: mode === 'production' ? (VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []) : []
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: VITE_OUTPUT || 'dist',
      chunkSizeWarningLimit: 2000,
      commonjsOptions: {
        include: [
          'node_modules/crypto-js'
        ]
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@use "@/style/theme.scss" as *;`
        }
      }
    },
    optimizeDeps: {
      include: []
    }
  }
})
