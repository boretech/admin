import Icon from '@/components/Icon'

const globalComponents = [
  { name: 'Icon', component: Icon }
]

export const setupGlobalComponents = (app) => {
  globalComponents.forEach(item => {
    const { name, component } = item
    app.component(name, component)
  })
}