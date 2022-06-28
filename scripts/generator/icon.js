import { resolve, join } from 'path'
import { readFileSync, statSync, mkdirSync, writeFileSync } from 'fs'
import inquirer from 'inquirer'
import chalk from 'chalk'

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'))

const generateIcon = async () => {
  const dir = resolve(process.cwd(), 'node_modules/@iconify/json')
  const raw = JSON.parse(readFileSync(join(dir, 'collections.json'), 'utf8'))

  const collections = Object.entries(raw).map(([id, v]) => ({
    id,
    ...v
  }))

  const choices = collections.map(({ id, name }) => ({ key: id, value: id, name }))

  inquirer.prompt([
    {
      type: 'list',
      name: 'useType',
      choices: [
        { key: 'local', value: 'local', name: 'Local' },
        { key: 'onLine', value: 'onLine', name: 'OnLine' },
      ],
      message: 'Where to get icons from?',
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
      message: 'Input the icon set that needs to be generated?',
      default: 'src/components/Icon/src',
    },
  ]).then(async (res) => {
    const { iconSet, useType, output } = answers
    const outputDir = resolve(process.cwd(), output)

    try {
      const stat = statSync(resolve(process.cwd(), output))
      if (!stat.isDirectory()) {
        mkdirSync(resolve(process.cwd(), output))
      }
    } catch (err) {
      mkdirSync(resolve(process.cwd(), output))
    }

    const genCollections = collections.filter((item) => [iconSet].includes(item.id))
    const prefixSet = []

    for (const info of genCollections) {
      const data = readFileSync(join(dir, 'json', `${info.id}.json`))
      if (data) {
        const { prefix } = data
        const isLocal = useType === 'local'
        const icons = Object.keys(data.icons).map(item => `${isLocal ? `${prefix}:` : ''}${item}`)

        writeFileSync(join(process.cwd(), output, `icons.data.js`)`export default ${isLocal ? JSON.stringify(icons) : JSON.stringify({ prefix, icons })}`)

        prefixSet.push(prefix)
      }
    }
  })
}
