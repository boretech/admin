import { setupPermissionDirective } from './permission.js'
import { setupLoadingDirective } from './loading.js'

export const setupGlobDirectives = (app) => {
  setupPermissionDirective(app)
  setupLoadingDirective(app)
}