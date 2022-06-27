import { getThemeColors, generateColors } from '../../../build/config/themeConfig.js'

import { replaceStyleVariables } from 'vite-plugin-theme/es/client'
import { mixLighten, mixDarken, tinycolor } from 'vite-plugin-theme/es/colorUtils'

export const changeTheme = async (color) => {
  const colors = generateColors({
    mixDarken,
    mixLighten,
    tinycolor,
    color,
  })

  return await replaceStyleVariables({
    colorVariables: [...getThemeColors(color), ...colors],
  })
}