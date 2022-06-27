import defineOptions from 'unplugin-vue-define-options/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

export const setUnplugin = () => [
  defineOptions(),
  AutoImport({
    imports: [
      'vue',
      'vue-router',
      {
        'axios': [
          ['default', 'axios']
        ],
        '@vueuse/core': [
          'useDark',
          'useToggle',
          'useCssVar'
        ]
      }
    ],
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [
      ElementPlusResolver({
        importStyle: "sass",
      }),
      IconsResolver(),
    ],
  }),
  createStyleImportPlugin({
    resolves: [ElementPlusResolve()]
  }),
  Icons({ autoInstall: true }),
]