import { resolve } from 'path'
import dayjs from 'dayjs'
import { loadEnv } from 'vite'

import pkg from './package.json'
import { wrapperEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/vite/plugin'


const root = process.cwd()
const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg,
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}
const pathResolve = (dir) => resolve(root, '.', dir)


export default ({ command, mode }) => {
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv
  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
      ]
    },
    server: {
      open: false, // set true auto open browser
      https: true,
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: 'dist',
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    optimizeDeps: {
      include: [
        'element-plus/lib/locale/lang/zh-cn',
        'element-plus/lib/locale/lang/en',
      ]
    }
  }
}



// defineConfig({
//   plugins: [
//     WindiCSS(),
//     AutoImport({
//       resolvers: [ElementPlusResolver()],
//       symbolId: 'i-[name]',
//       customDomId: 'vite-svg-icons',
//     }),
//     Components({
//       resolvers: [ElementPlusResolver()],
//     }),
//     createSvgIconsPlugin({
//       iconsDir: resolve(process.cwd(), './src/assets/icons'),
//     }),
//     Vue()
//   ],
//   resolve: {
//     alias: {
//       '@': resolve(process.cwd(), 'src'),
//     },
//   }
// })