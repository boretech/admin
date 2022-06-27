<template>
  <ElConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ElConfigProvider>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'
import { AppProvider } from '@/components/Application/index.js'
import { useTitle } from '@/hooks/web/useTitle.js'
import { useLocale } from '@/locales/useLocale.js'
import 'dayjs/locale/zh-cn'
// support Multi-language
const { getAntdLocale } = useLocale()
// Listening to page changes and dynamically changing site titles
useTitle()
</script>