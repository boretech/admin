import compressPlugin from 'vite-plugin-compression'

export const configCompressPlugin = (compress, deleteOriginFile = false) => {
  const compressList = compress.split(',')

  let plugin = []

  if (compressList.includes('gzip')) {
    plugin = compressPlugin({
      ext: '.gz',
      deleteOriginFile,
    })
  }

  if (compressList.includes('brotli')) {
    plugin = compressPlugin({
      ext: '.br',
      algorithm: 'brotliCompress',
      deleteOriginFile,
    })
  }

  return plugin
}