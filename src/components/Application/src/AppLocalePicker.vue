<template>
  <dropdown placement="bottom" :trigger="['click']" :dropMenuList="localeList" :selectedKeys="selectedKeys"
    @menu-event="handleMenuEvent" overlayClassName="app-locale-picker-overlay">
    <span class="cursor-pointer flex items-center">
      <icon icon="ion:language" />
      <span v-if="showText" class="ml-1">{{ getLocaleText }}</span>
    </span>
  </dropdown>
</template>
<script setup>
import { ref, watchEffect, unref, computed } from 'vue'
import { Dropdown } from '@/components/Dropdown.vue'
import { Icon } from '@/components/Icon.vue'
import { useLocale } from '@/locales/useLocale.js'
import { localeList } from '@/settings/localeSetting.js'

const props = defineProps({
  /**
   * Whether to display text
   */
  showText: { type: Boolean, default: true },
  /**
   * Whether to refresh the interface when changing
   */
  reload: { type: Boolean },
})

const selectedKeys = ref([])
const { changeLocale, getLocale } = useLocale()
const getLocaleText = computed(() => {
  const key = selectedKeys.value[0]
  if (!key) {
    return ''
  }
  return localeList.find((item) => item.event === key)?.text
})

watchEffect(() => {
  selectedKeys.value = [unref(getLocale)]
})

const toggleLocale = async (lang) => {
  await changeLocale(lang)
  selectedKeys.value = [lang]
  props.reload && location.reload()
}

const handleMenuEvent = (menu) => {
  if (unref(getLocale) === menu.event) {
    return
  }
  toggleLocale(menu.event)
}
</script>

<style lang="sass">
.app-locale-picker-overlay {
  .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>