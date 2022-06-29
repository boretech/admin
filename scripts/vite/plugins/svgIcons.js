import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export const setSvgIcons = () => [
  createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
    symbolId: 'i-[name]',
    customDomId: 'svg_icons_dom'
  })
]