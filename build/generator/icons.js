import { resolve } from 'path'
import { readFileSync, statSync, mkdirSync, writeFileSync } from 'fs'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { emptyDir } from '../utils.js'

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'))

const generateIcon = async () => {
  const dir = resolve(process.cwd(), 'node_modules/@iconify/json')
  const raw = JSON.parse(readFileSync(resolve(dir, 'collections.json'), 'utf8'))

  console.log(raw)

  const collections = Object.entries(raw).map(([id, v]) => ({
    id,
    ...v
  }))

  console.log(collections)

  const choices = collections.map(({ id, name }) => ({ key: id, value: id, name }))

  inquirer.prompt([
    {
      type: 'list',
      name: 'useType',
      choices: [
        { key: 'local', value: 'local', name: 'Local' },
        { key: 'onLine', value: 'onLine', name: 'OnLine' }
      ],
      message: 'Where to get icons from?'
    },
    {
      type: 'list',
      name: 'iconSet',
      choices: choices,
      message: 'Select the icon set that needs to be generated?'
    }
    // {
    //   type: 'input',
    //   name: 'output',
    //   message: 'Input the icon set that needs to be generated?',
    //   default: 'src/components/Icon/data'
    // }
  ]).then(async (res) => {
    const { iconSet, useType, output } = res
    const outputDir = resolve(process.cwd(), 'src/assets/icons')

    try {
      const stat = statSync(outputDir)
      if (!stat.isDirectory()) {
        mkdirSync(outputDir)
      }
    } catch (err) {
      mkdirSync(outputDir)
    }

    const genCollections = collections.filter((item) => [iconSet].includes(item.id))
    const prefixSet = []

    for (const info of genCollections) {
      const data = JSON.parse(readFileSync(resolve(dir, 'json', `${info.id}.json`)))
      if (data) {
        console.log(data.prefix)
        const { prefix } = data
        const isLocal = useType === 'local'
        const icons = Object.keys(data.icons).map(item => `${isLocal ? `${prefix}:` : ''}${item}`)
        console.log(`${output}/icons.data.js`)
        writeFileSync(`${output}/icons.data.js`, `export default ${isLocal ? JSON.stringify(icons) : JSON.stringify({ prefix, icons })}`)

        prefixSet.push(prefix)
      }
    }
    emptyDir('node_modules/.vite')
    console.log(`✨ ${chalk.cyan(`[${pkg.name}]`)} - Icon generated successfully: [${prefixSet}]`)
  })
}

generateIcon()
