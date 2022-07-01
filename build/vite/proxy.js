export const setupProxy = (viteProxy, mode) => {
  if (mode !== 'development' || !Object.keys(viteProxy).length) {
    return []
  }

  const httpsReg = /^https:\/\//

  return Object.keys(viteProxy).reduce((acc, item) => {
    const target = viteProxy[item]
    const isHttps = httpsReg.test(target)
    acc[item] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: path => path.replace(item, ''),
      ...(isHttps ? { secure: false } : {})
    }
    return acc
  }, {})
}
