import { PROJ_CFG_KEY } from '@/enums/cacheEnum.js'
import projectSetting from '@/settings/projectSetting.js'

import { updateHeaderBgColor, updateSidebarBgColor } from '@/logics/theme/updateBackground.js'
import { updateColorWeak } from '@/logics/theme/updateColorWeak.js'
import { updateGrayMode } from '@/logics/theme/updateGrayMode.js'
import { updateDarkTheme } from '@/logics/theme/dark.js'
import { changeTheme } from '@/logics/theme/index.js'

import { useAppStore } from '@/store/modules/app.js'
import { useLocaleStore } from '@/store/modules/locale.js'

import { getCommonStoragePrefix, getStorageShortName } from '@/utils/env.js'

import { primaryColor } from '../../build/config/themeConfig.js'
import { Persistent } from '@/utils/cache/persistent.js'
import { deepMerge } from '@/utils/index.js'
import { ThemeEnum } from '@/enums/appEnum.js'

// Initial project configuration
export const initAppConfigStore = () => {
  const localeStore = useLocaleStore()
  const appStore = useAppStore()
  let projCfg = Persistent.getLocal(PROJ_CFG_KEY)
  projCfg = deepMerge(projectSetting, projCfg || {})
  const darkMode = appStore.getDarkMode
  const {
    colorWeak,
    grayMode,
    themeColor,

    headerSetting: { bgColor: headerBgColor } = {},
    menuSetting: { bgColor } = {},
  } = projCfg
  try {
    if (themeColor && themeColor !== primaryColor) {
      changeTheme(themeColor)
    }

    grayMode && updateGrayMode(grayMode)
    colorWeak && updateColorWeak(colorWeak)
  } catch (error) {
    console.log(error)
  }
  appStore.setProjectConfig(projCfg)

  // init dark mode
  updateDarkTheme(darkMode)
  if (darkMode === ThemeEnum.DARK) {
    updateHeaderBgColor()
    updateSidebarBgColor()
  } else {
    headerBgColor && updateHeaderBgColor(headerBgColor)
    bgColor && updateSidebarBgColor(bgColor)
  }
  // init store
  localeStore.initLocale()

  setTimeout(() => {
    clearObsoleteStorage()
  }, 16)
}

/**
 * As the version continues to iterate, there will be more and more cache keys stored in localStorage.
 * This method is used to delete useless keys
 */
export const clearObsoleteStorage = () => {
  const commonPrefix = getCommonStoragePrefix()
  const shortPrefix = getStorageShortName()

  [localStorage, sessionStorage].forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key)
      }
    })
  })
}