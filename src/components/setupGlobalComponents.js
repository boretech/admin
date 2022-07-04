import { Icon } from './Icon'

const components = [
  { name: 'Icon', component: Icon }
]

export const setupGlobalComponents = (app) => {
  components.forEach(item => {
    const { name, component } = item
    app.component(name, component)
  })
}
