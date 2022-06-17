const httpsRE = /^https:\/\//

export const createProxy = (list = []) => {
  let res = {}
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target)
    res[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      // https require secure = false
      ...(isHttps ? { secure: false } : {})
    }
  }
  return res
}