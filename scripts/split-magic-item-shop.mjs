// Splits the single "Magic Item Catalog (5e.tools)" shop (2,364 items) into
// one shop per item category (Weapon, Armor, Wondrous Item, ...) so browsing
// isn't one giant scroll. Run after import-magic-item-shop.mjs and
// import-generic-enchant-items.mjs. Idempotent: re-running after the split
// already happened is a no-op (the combined shop won't be found).
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SHOPS_PATH = path.join(ROOT, 'src/data/shops.json')
const SOURCE_SHOP_NAME = 'Magic Item Catalog (5e.tools)'

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}

function main() {
  const shops = readJson(SHOPS_PATH)
  const sourceIndex = shops.findIndex((s) => s.name === SOURCE_SHOP_NAME)
  if (sourceIndex === -1) {
    console.log(`Shop "${SOURCE_SHOP_NAME}" not found — already split, or import scripts haven't run yet.`)
    return
  }
  const source = shops[sourceIndex]

  const byCategory = new Map()
  for (const item of source.items) {
    const cat = item.category || 'Other'
    if (!byCategory.has(cat)) byCategory.set(cat, [])
    byCategory.get(cat).push(item)
  }

  const newShops = [...byCategory.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([category, items]) => ({
      id: `shop-${crypto.randomUUID()}`,
      name: `Magic ${category} (5e.tools)`,
      hardSell: '',
      sellingCap: '',
      notes: source.notes,
      items,
    }))

  shops.splice(sourceIndex, 1, ...newShops)

  fs.writeFileSync(SHOPS_PATH, JSON.stringify(shops, null, 2) + '\n')
  console.log(
    `Split "${SOURCE_SHOP_NAME}" into ${newShops.length} shops: ${newShops.map((s) => `${s.name} (${s.items.length})`).join(', ')}`,
  )
}

main()
