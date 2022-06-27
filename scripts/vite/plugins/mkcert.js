import mkcert from 'vite-plugin-mkcert'

export const setMkcert = (env, isProduction) => {
  const { VITE_HTTPS } = env
  if (!isProduction && VITE_HTTPS) {
    return [
      mkcert({
        // cert source default with 'coding.net'
        source: 'coding'
      })
    ]
  } else {
    return []
  }
}