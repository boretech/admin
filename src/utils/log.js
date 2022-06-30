const projectName = import.meta.env.VITE_APP_NAME

export const warn = (message) => {
  console.warn(`[${projectName} warn]: ${message}`)
}

export const error = (message) => {
  throw new Error(`[${projectName} error]: ${message}`)
}