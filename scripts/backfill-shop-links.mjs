// Phase B of docs/shop-item-links-plan.md — adds a `link` field to existing
// shops.json items that exact-match a name in the normalized 5etools data.
// Items with no exact match are left untouched (their existing `note` stays
// as the only description) rather than guessing a fuzzy match.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SHOPS_PATH = path.join(ROOT, 'src/data/shops.json')
const DATA_DIR = path.join(ROOT, 'public/data/5etools')

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}
function normName(s) {
  return String(s || '').trim().toLowerCase().replace(/\s+/g, ' ')
}
function build5etoolsLink(name, source) {
  return `https://5e.tools/items.html#${encodeURIComponent(name.toLowerCase())}_${source.toLowerCase()}`
}

// Files can define the same item name more than once (reprints, homebrew vs
// official). Prefer a non-template entry, then official over homebrew, then
// the current 2024 core books, for a deterministic single link per name.
const PREFERRED_2024_SOURCES = new Set(['XPHB', 'XDMG', 'XMM'])
function pickBest(candidates) {
  const nonVariant = candidates.filter((c) => c.file !== 'magicvariant')
  let pool = nonVariant.length ? nonVariant : candidates
  const official = pool.filter((c) => c.origin === 'official')
  pool = official.length ? official : pool
  const preferred = pool.filter((c) => PREFERRED_2024_SOURCES.has(c.source))
  pool = preferred.length ? preferred : pool
  return [...pool].sort((a, b) => a.source.localeCompare(b.source))[0]
}

function buildIndex() {
  const idx = new Map()
  const add = (arr, file) => {
    for (const e of arr) {
      const source = e.source || e.inherits?.source
      if (!source) continue
      const key = normName(e.name)
      if (!idx.has(key)) idx.set(key, [])
      idx.get(key).push({ name: e.name, source, file, origin: e._gr?.origin })
    }
  }
  add(readJson(path.join(DATA_DIR, 'item.json')), 'item')
  add(readJson(path.join(DATA_DIR, 'baseitem.json')), 'baseitem')
  add(readJson(path.join(DATA_DIR, 'magicvariant.json')), 'magicvariant')
  return idx
}

const idx = buildIndex()
const shops = readJson(SHOPS_PATH)

let matched = 0
let unmatched = 0
for (const shop of shops) {
  for (const shopItem of shop.items) {
    const candidates = idx.get(normName(shopItem.name))
    if (!candidates) {
      unmatched++
      continue
    }
    const best = pickBest(candidates)
    shopItem.link = build5etoolsLink(best.name, best.source)
    matched++
  }
}

fs.writeFileSync(SHOPS_PATH, JSON.stringify(shops, null, 2) + '\n')
console.log(`Backfilled links: ${matched} matched, ${unmatched} unmatched (left without link).`)
