import vue from '@vitejs/plugin-vue'
import { setUnplugin } from './unplugin.js'
import { setMkcert } from './mkcert.js'
import {setSvgIcons} from './svgIcons.js'

export const createVitePlugins = (env, isProduction) => [
  vue(),
  ...setUnplugin(),
  ...setMkcert(env, isProduction),
  ...setSvgIcons()
]
