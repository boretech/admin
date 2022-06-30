import { localeEnum } from './enum/locale'

export const localeSetting = {
  showPicker: true,
  locale: localeEnum.ZH_CN,
  fallback: localeEnum.ZH_CN,
  availableLocales: [localeEnum.ZH_CN, localeEnum.EN_US]
}

export const localeList = [
  {
    text: '简体中文',
    event: localeEnum.ZH_CN
  },
  {
    text: 'English',
    event: localeEnum.EN_US
  }
]