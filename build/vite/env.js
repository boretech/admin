// Read all environment variable configuration files to process.env
export const generateEnv = (env) => Object.keys(env).reduce((acc, item) => {
  const valueString = env[item].replace(/\\n/g, '\n')
  let realValue = valueString === 'true' ? true : valueString === 'false' ? false : valueString

  if (item === 'VITE_PORT') {
    realValue = realValue ? +realValue : null
  }

  if (item === 'VITE_PROXY' && realValue) {
    try {
      realValue = JSON.parse(realValue.replace(/'/g, '"'))
    } catch (e) {
      realValue = null
    }
  }

  acc[item] = realValue

  if (typeof realValue === 'string') {
    process.env[item] = realValue
  } else if (typeof realValue === 'object') {
    process.env[item] = JSON.stringify(realValue)
  }

  return acc
}, {})
