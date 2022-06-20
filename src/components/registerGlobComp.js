import { Button } from './Button/index.js'
import { ElInput, ElContainer } from 'element-plus'

export const registerGlobComp = (app) => {
  app.use(ElInput).use(Button).use(ElContainer)
}