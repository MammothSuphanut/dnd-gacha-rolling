// The shop's rarity filter reads item.rarity, but that field was never
// populated (the tier info instead ended up in subCategory for magic items).
// Backfills item.rarity: the tier from subCategory for magic items, and
// "Mundane" for everything else — matching the schema's original intent.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SHOPS_PATH = path.join(ROOT, 'src/data/shops.json')

const shops = JSON.parse(fs.readFileSync(SHOPS_PATH, 'utf8'))

const TIER_LABELS = new Set(['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact'])

let mundaneCount = 0
let tierCount = 0
let variesCount = 0

for (const shop of shops) {
  for (const item of shop.items) {
    if (!item.magical) {
      item.rarity = 'Mundane'
      mundaneCount++
      continue
    }
    if (item.subCategory === 'varies') {
      item.subCategory = 'Varies'
      item.rarity = 'Varies'
      variesCount++
      continue
    }
    if (TIER_LABELS.has(item.subCategory)) {
      item.rarity = item.subCategory
      tierCount++
      continue
    }
    // Shouldn't happen given the current data, but don't silently mislabel.
    throw new Error(`Magic item "${item.name}" in "${shop.name}" has unexpected subCategory "${item.subCategory}"`)
  }
}

fs.writeFileSync(SHOPS_PATH, `${JSON.stringify(shops, null, 2)}\n`)
console.log(`Set rarity: ${mundaneCount} Mundane, ${tierCount} tiered, ${variesCount} Varies.`)
