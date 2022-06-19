import { resolve, join } from 'path'
import fs from 'fs-extra'
import inquirer from 'inquirer'
import colors from 'picocolors'
import pkg from '../../../package.json' assert {type: 'json'}

async function generateIcon() {
  const dir = resolve(process.cwd(), 'node_modules/@iconify/json')

  const raw = await fs.readJSON(join(dir, 'collections.json'))

  const collections = Object.entries(raw).map(([id, v]) => ({
    ...v,
    id,
  }))

  const choices = collections.map((item) => ({ key: item.id, value: item.id, name: item.name }))

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'useType',
        choices: [
          { key: 'local', value: 'local', name: 'Local' },
          { key: 'onLine', value: 'onLine', name: 'OnLine' },
        ],
        message: 'How to use icons?',
      },
      {
        type: 'list',
        name: 'iconSet',
        choices: choices,
        message: 'Select the icon set that needs to be generated?',
      },
      {
        type: 'input',
        name: 'output',
        message: 'Where to save the icons?',
        default: 'src/components/Icon/data',
      },
    ])
    .then(async (answers) => {
      const { iconSet, output, useType } = answers
      const outputDir = resolve(process.cwd(), output)
      fs.ensureDir(outputDir)
      const genCollections = collections.filter((item) => [iconSet].includes(item.id))
      let prefixSet = []
      for (const info of genCollections) {
        const data = await fs.readJSON(join(dir, 'json', `${info.id}.json`))
        if (data) {
          const { prefix } = data
          const isLocal = useType === 'local'
          const icons = Object.keys(data.icons).map(
            (item) => `${isLocal ? prefix + ':' : ''}${item}`,
          )

          fs.writeFileSync(
            join(output, `icons.data.js`),
            `export default ${isLocal ? JSON.stringify(icons) : JSON.stringify({ prefix, icons })}`,
          )
          prefixSet.push(prefix)
        }
      }
      fs.emptyDir(join(process.cwd(), 'node_modules/.vite'))
      console.log(
        `✨ ${colors.cyan(`[${pkg.name}]`)}` + ' - Icon generated successfully:' + `[${prefixSet}]`,
      )
    })
}

generateIcon()