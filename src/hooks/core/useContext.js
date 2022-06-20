import {
  provide,
  inject,
  reactive,
  readonly as defineReadonly,
} from 'vue'

export const createContext = (
  context,
  key = Symbol(),
  options = {},
) => {
  const { readonly = true, createProvider = false, native = false } = options

  const state = reactive(context)
  const provideData = readonly ? defineReadonly(state) : state
  !createProvider && provide(key, native ? context : provideData)

  return {
    state,
  }
}

export const useContext = (
  key = Symbol(),
  defaultValue,
) => inject(key, defaultValue || {})
