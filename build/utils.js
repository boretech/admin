import { readdirSync, statSync, unlinkSync, rmdirSync } from 'fs'
import { resolve } from 'path'

export const emptyDir = (path) => {
  const files = readdirSync(resolve(process.cwd(), path))
  files.forEach(file => {
    const filePath = resolve(process.cwd(), path, file)
    const stat = statSync(filePath)
    if (stat.isDirectory()) {
      emptyDir(filePath)
      rmdirSync(filePath)
    } else {
      unlinkSync(filePath)
    }
  })
}
