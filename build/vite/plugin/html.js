import { createHtmlPlugin } from 'vite-plugin-html'
import pkg from '../../../package.json'

export const configHtmlPlugin = (env, isBuild) => {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env
  const path = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`
  const getAppConfigSrc = () => `${path || '/'}_app.config.js?v=${pkg.version}-${new Date().getTime()}`

  return createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: {
        title: VITE_GLOB_APP_TITLE,
      },
      // Embed the generated app.config.js file
      tags: isBuild ? [
        {
          tag: 'script',
          attrs: {
            src: getAppConfigSrc(),
          },
        },
      ] : [],
    },
  })
}