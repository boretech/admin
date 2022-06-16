import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
// import vueJsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import WindiCSS from 'vite-plugin-windicss'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import purgeIcons from 'vite-plugin-purge-icons'
import VitePluginCertificate from 'vite-plugin-mkcert';

// element-plus related plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// config methods
import { configHtmlPlugin } from './html.js'
import { configMockPlugin } from './mock.js'
import { configVisualizer } from './visualizer.js'
import { configThemePlugin } from './theme.js'
import { configCompressPlugin } from './compress.js'
import { configPwaPlugin } from './pwa.js'

export const createVitePlugins = (viteEnv, isBuild) => {
  const {
    VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv

  let vitePlugins = [
    vue(),
    // make setup syntax support name attribute
    /**
     * <script setup name="App">...</script>
     */
    vueSetupExtend(),
    // vite-plugin-mkcert
    VitePluginCertificate({
      source: 'coding',
    }),
    // vite-plugin-windicss
    WindiCSS(),
    // vite-plugin-svg-icons
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      svgoOptions: isBuild,
      // default
      symbolId: 'i-[dir]-[name]',
    }),
    // vite-plugin-purge-icons
    purgeIcons(),
    // element-plus related plugins
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ]

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizer())

  // vite-plugin-theme
  // TODO: vite-plugin-theme
  vitePlugins.push(configThemePlugin(isBuild))

  // vite-plugin-mock
  // TODO: vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  if (isBuild) {
    // @vitejs/plugin-legacy
    VITE_LEGACY && vitePlugins.push(legacy())

    // vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // vite-plugin-compression
    vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE))

    // vite-plugin-pwa
    // TODO: real PWA
    vitePlugins.push(configPwaPlugin(viteEnv))
  }

  return vitePlugins
}