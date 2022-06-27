import { watch, unref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n.js'
import { useTitle as usePageTitle } from '@vueuse/core'
import { useGlobSetting } from '@/hooks/setting/index.js'
import { useRouter } from 'vue-router'
import { useLocaleStore } from '@/store/modules/locale.js'

import { REDIRECT_NAME } from '@/router/constant.js'

/**
 * Listening to page changes and dynamically changing site titles
 */
export const useTitle = () => {
  const { title } = useGlobSetting()
  const { t } = useI18n()
  const { currentRoute } = useRouter()
  const localeStore = useLocaleStore()

  const pageTitle = usePageTitle()

  watch(
    [() => currentRoute.value.path, () => localeStore.getLocale],
    () => {
      const route = unref(currentRoute)

      if (route.name === REDIRECT_NAME) {
        return
      }

      const tTitle = t(route?.meta?.title)
      pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`
    },
    { immediate: true },
  )
}