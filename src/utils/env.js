import { warn } from '@/utils/log.js'
import pkg from '../../package.json' assert {type: "json"}
import { getConfigFileName } from '../../build/getConfigFileName.js'

export const getCommonStoragePrefix = () => {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig()
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}`.toUpperCase()
}

// Generate cache key according to version
export const getStorageShortName = () => `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase()

export const getAppEnvConfig = () => {
  const ENV_NAME = getConfigFileName(import.meta.env)

  const ENV = import.meta.env.DEV
    ? // Get the global configuration (the configuration will be extracted independently when packaging)
    (import.meta.env)
    : window[ENV_NAME]

  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  } = ENV

  if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
    );
  }

  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  }
}

/**
 * @description: Development mode
 */
export const devMode = 'development'

/**
 * @description: Production mode
 */
export const prodMode = 'production'

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export const getEnv = () => import.meta.env.MODE

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export const isDevMode = () => import.meta.env.DEV

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export const isProdMode = () => import.meta.env.PROD
