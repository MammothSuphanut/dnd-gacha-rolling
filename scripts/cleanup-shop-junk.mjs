// Removes three kinds of junk/redundant rows the user flagged after
// reviewing the shop UI:
//   1. The 39 "Varies"-rarity items (e.g. "Potion of Healing (*)", "Figurine
//      of Wondrous Power") — these are 5e.tools' generic parent entries for
//      a family of items with individually different rarity/price; they
//      have no price of their own and can't actually be bought.
//   2. The 5 generic "Common/Uncommon/.../Legendary Potion" reference rows
//      in Potion Shop, and the 6 analogous "... Spell Scroll" rows in
//      Arcane Shop — both superseded now that Magic Consumables has the
//      real, individually-priced potion/scroll catalog.
//   3. Exact duplicate rows left over from merging shops together (same
//      name + category + subCategory + priceNormal within one shop) —
//      keeps the first occurrence, drops the rest.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SHOPS_PATH = path.join(ROOT, 'src/data/shops.json')

const shops = JSON.parse(fs.readFileSync(SHOPS_PATH, 'utf8'))

const GENERIC_PLACEHOLDER_NAMES = new Set([
  'Common Potion',
  'Uncommon Potion',
  'Rare Potion',
  'Very Rare Potion',
  'Legendary Potion',
  'Common (Cantrip) Spell Scroll',
  'Common (Level 1) Spell Scroll',
  'Uncommon (Level 2) Spell Scroll',
  'Uncommon (Level 3) Spell Scroll',
  'Rare (Level 4) Spell Scroll',
  'Rare (Level 5) Spell Scroll',
])

function dedupeKey(item) {
  return [item.name, item.category, item.subCategory, item.priceNormal].join('|')
}

let removedVaries = 0
let removedPlaceholder = 0
let removedDuplicate = 0

for (const shop of shops) {
  const seen = new Set()
  const keptItems = []
  for (const item of shop.items) {
    if (item.rarity === 'Varies') {
      removedVaries++
      continue
    }
    if (GENERIC_PLACEHOLDER_NAMES.has(item.name)) {
      removedPlaceholder++
      continue
    }
    const key = dedupeKey(item)
    if (seen.has(key)) {
      removedDuplicate++
      continue
    }
    seen.add(key)
    keptItems.push(item)
  }
  shop.items = keptItems
}

fs.writeFileSync(SHOPS_PATH, `${JSON.stringify(shops, null, 2)}\n`)

let total = 0
shops.forEach((s) => (total += s.items.length))
console.log(
  `Removed ${removedVaries} "Varies" placeholders, ${removedPlaceholder} generic potion/scroll rows, ${removedDuplicate} exact duplicates.`,
)
console.log(`${total} items remain across ${shops.length} shops.`)
