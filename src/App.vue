<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { useLocaleStore } from '@/store'
defineOptions({
  name: 'App'
})

const localeStore = useLocaleStore()

const locale = localeStore.getLocale.ElLocale

// const locale = computed(() => )

</script>