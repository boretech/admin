import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import defineOptions from 'unplugin-vue-define-options/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

import mkcert from 'vite-plugin-mkcert'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export const setupUnplugin = () => [
  defineOptions(),
  AutoImport({
    imports: [
      'vue',
      'vue-router'
    ],
    resolvers: [ElementPlusResolver()]
  }),
  Components({
    resolvers: [
      ElementPlusResolver({
        importStyle: 'sass'
      }),
      IconsResolver()
    ]
  }),
  createStyleImportPlugin({
    resolves: [ElementPlusResolve()]
  }),
  Icons({ autoInstall: true })
]

export const setupMkcert = (env, mode) => {
  const { VITE_HTTPS } = env
  if (mode !== 'production' && VITE_HTTPS) {
    return [
      mkcert({
        // cert source default with 'coding.net'
        source: 'coding'
      })
    ]
  } else {
    return []
  }
}

export const setupSvgIcons = () => [
  createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
    symbolId: 'i-[dir]-[name]',
    customDomId: 'svg_icons_dom'
  })
]

export const setupPlugins = (env, mode) => [
  vue(),
  ...setupUnplugin(),
  ...setupMkcert(env, mode),
  ...setupSvgIcons()
]
