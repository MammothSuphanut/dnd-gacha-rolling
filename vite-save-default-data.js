import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DEFAULT_ENHANCEMENT_MULTIPLIERS } from './src/utils/price.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.resolve(__dirname, 'src/data')

function slugify(category) {
  return String(category || 'uncategorized')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'uncategorized'
}

function toIdentifier(slug) {
  return slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase())
}

function writeJson(filename, data) {
  fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2) + '\n')
}

function writeDefaultData(payload) {
  const {
    boxes = [],
    shops = [],
    campaigns = [],
    users = [],
    partyTags = [],
    characters = [],
    images = {},
    enhancementMultipliers = DEFAULT_ENHANCEMENT_MULTIPLIERS,
  } = payload

  const groups = new Map()
  for (const box of boxes) {
    const slug = slugify(box.category)
    if (!groups.has(slug)) groups.set(slug, [])
    groups.get(slug).push(box)
  }
  const categoryEntries = [...groups.entries()].sort(([a], [b]) => a.localeCompare(b))

  for (const [slug, groupBoxes] of categoryEntries) {
    writeJson(`${slug}.json`, groupBoxes)
  }
  writeJson('shops.json', shops)
  writeJson('campaigns.json', campaigns)
  writeJson('users.json', users)
  writeJson('partyTags.json', partyTags)
  writeJson('characters.json', characters)
  writeJson('images.json', images)

  const categoryVars = categoryEntries.map(([slug]) => toIdentifier(slug))
  const importLines = categoryEntries.map(
    ([slug], i) => `import ${categoryVars[i]} from './${slug}.json'`,
  )

  const content = `${importLines.join('\n')}
import shops from './shops.json'
import campaigns from './campaigns.json'
import users from './users.json'
import partyTags from './partyTags.json'
import characters from './characters.json'
import images from './images.json'

export default {
  version: 1,
  boxes: [${categoryVars.map((v) => `...${v}`).join(', ')}],
  shops,
  campaigns,
  users,
  partyTags,
  characters,
  images,
  enhancementMultipliers: ${JSON.stringify(enhancementMultipliers)},
}
`
  fs.writeFileSync(path.join(DATA_DIR, 'defaultData.js'), content)
}

export function saveDefaultDataPlugin() {
  return {
    name: 'save-default-data',
    configureServer(server) {
      server.middlewares.use('/__save-default-data', (req, res, next) => {
        if (req.method !== 'POST') return next()
        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', () => {
          try {
            const payload = JSON.parse(body)
            writeDefaultData(payload)
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: err.message }))
          }
        })
      })
    },
  }
}
