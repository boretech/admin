import { readFileSync } from 'fs'
import { resolve } from 'path'

import { defineConfig, loadEnv } from 'vite'
import dayjs from 'dayjs'
import { createVitePlugins } from './scripts/vite/plugins/index.js'
import { createViteProxy } from './scripts/vite/proxy.js'
import { generateEnv } from './scripts/vite/env.js'

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'))

const { name, version, dependencies, devDependencies } = pkg

const APPInfo = {
  pkg: { name, version, dependencies, devDependencies },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export default defineConfig(async ({ command, mode }) => {
  const root = process.cwd()
  const env = generateEnv(loadEnv(mode, root))
  const { VITE_PORT, VITE_BASE, VITE_PROXY, VITE_DROP_CONSOLE, VITE_HTTPS, VITE_OPEN_BROWSER, VITE_OUTPUT } = env
  const isProduction = command === 'build'

  return {
    root,
    base: VITE_BASE,
    resolve: {
      alias: {
        '@/': `${resolve(root, 'src')}/`
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(APPInfo)
    },
    server: {
      https: VITE_HTTPS,
      host: true,
      open: VITE_OPEN_BROWSER,
      port: VITE_PORT,
      proxy: createViteProxy(VITE_PROXY)
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: VITE_OUTPUT,
      chunkSizeWarningLimit: 2000,
    },
    esbuild: {
      pure: isProduction ? (VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []) : []
    },
    css: {
      preprocessorOptions: {
        scss: {}
      }
    },
    plugins: createVitePlugins(env, isProduction),
    optimizeDeps: {
      include: []
    }
  }
})
