import { warn } from './log'

export const getEnv = () => import.meta.env.MODE

export const isDevMode = () => import.meta.env.DEV

export const isProdMode = () => import.meta.env.PROD
