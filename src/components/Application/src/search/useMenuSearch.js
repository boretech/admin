import { ref, onBeforeMount, unref, Ref, nextTick } from 'vue'
import { cloneDeep } from 'lodash-es'
import { getMenus } from '@/router/menus/index.js'
import { filter, forEach } from '@/utils/helper/treeHelper.js'
import { useGo } from '@/hooks/web/usePage.js'
import { useScrollTo } from '@/hooks/event/useScrollTo.js'
import { onKeyStroke, useDebounceFn } from '@vueuse/core'
import { useI18n } from '@/hooks/web/useI18n.js'

// Translate special characters
const transform = (c) => {
  const code = ['$', '(', ')', '*', '+', '.', '[', ']', '?', '\\', '^', '{', '}', '|']
  return code.includes(c) ? `\\${c}` : c
}

const createSearchReg = (key) => {
  const keys = [...key].map((item) => transform(item))
  const str = ['', ...keys, ''].join('.*')
  return new RegExp(str)
}

export const useMenuSearch = (refs, scrollWrap, emit) => {
  const searchResult = ref([])
  const keyword = ref('')
  const activeIndex = ref(-1)

  let menuList = []

  const { t } = useI18n()
  const go = useGo()
  const handleSearch = useDebounceFn(search, 200)

  onBeforeMount(async () => {
    const list = await getMenus()
    menuList = cloneDeep(list)
    forEach(menuList, (item) => {
      item.name = t(item.name)
    })
  })

  const search = (e) => {
    e?.stopPropagation()
    const key = e.target.value
    keyword.value = key.trim()
    if (!key) {
      searchResult.value = []
      return
    }
    const reg = createSearchReg(unref(keyword))
    const filterMenu = filter(menuList, (item) => {
      return reg.test(item.name) && !item.hideMenu
    })
    searchResult.value = handlerSearchResult(filterMenu, reg)
    activeIndex.value = 0
  }

  const handlerSearchResult = (filterMenu, reg, parent) => {
    let res = []
    filterMenu.forEach((item) => {
      const { name, path, icon, children, hideMenu, meta } = item
      if (!hideMenu && reg.test(name) && (!children?.length || meta?.hideChildrenInMenu)) {
        ret.push({
          name: parent?.name ? `${parent.name} > ${name}` : name,
          path,
          icon,
        })
      }
      if (!meta?.hideChildrenInMenu && Array.isArray(children) && children.length) {
        ret.push(...handlerSearchResult(children, reg, item))
      }
    })
    return res
  }

  // Activate when the mouse moves to a certain line
  const handleMouseenter = (e) => {
    const index = e.target.dataset.index
    activeIndex.value = Number(index)
  }

  // Arrow key up
  const handleUp = () => {
    if (!searchResult.value.length) return
    activeIndex.value--
    if (activeIndex.value < 0) {
      activeIndex.value = searchResult.value.length - 1
    }
    handleScroll()
  }

  // Arrow key down
  const handleDown = () => {
    if (!searchResult.value.length) return
    activeIndex.value++
    if (activeIndex.value > searchResult.value.length - 1) {
      activeIndex.value = 0
    }
    handleScroll()
  }

  // When the keyboard up and down keys move to an invisible place
  // the scroll bar needs to scroll automatically
  const handleScroll = () => {
    const refList = unref(refs)
    if (!refList || !Array.isArray(refList) || refList.length === 0 || !unref(scrollWrap)) {
      return
    }

    const index = unref(activeIndex)
    const currentRef = refList[index]
    if (!currentRef) {
      return
    }
    const wrapEl = unref(scrollWrap)
    if (!wrapEl) {
      return
    }
    const scrollHeight = currentRef.offsetTop + currentRef.offsetHeight
    const wrapHeight = wrapEl.offsetHeight
    const { start } = useScrollTo({
      el: wrapEl,
      duration: 100,
      to: scrollHeight - wrapHeight,
    })
    start()
  }

  // enter keyboard event
  const handleEnter = async () => {
    if (!searchResult.value.length) {
      return
    }
    const result = unref(searchResult)
    const index = unref(activeIndex)
    if (result.length === 0 || index < 0) {
      return
    }
    const to = result[index]
    handleClose()
    await nextTick()
    go(to.path)
  }

  // close search modal
  const handleClose = () => {
    searchResult.value = []
    emit('close')
  }

  // enter search
  onKeyStroke('Enter', handleEnter)
  // Monitor keyboard arrow keys
  onKeyStroke('ArrowUp', handleUp)
  onKeyStroke('ArrowDown', handleDown)
  // esc close
  onKeyStroke('Escape', handleClose)

  return { handleSearch, searchResult, keyword, activeIndex, handleMouseenter, handleEnter }
}