import { createContext, useContext } from '@/hooks/core/useContext.js'

const key = Symbol()

export const createAppProviderContext = (context) => createContext(context, key)

export const useAppProviderContext = () => useContext(key)