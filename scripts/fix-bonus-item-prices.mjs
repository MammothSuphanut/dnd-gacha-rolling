import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parsePriceToCopper, formatCopper, DEFAULT_ENHANCEMENT_MULTIPLIERS } from '../src/utils/price.js'

// Prices every literal "+1/+2/+3 <Item>" row in shops.json so it's
// consistent with the enhancement multiplier formula (base price x 5/25/125)
// now that the shop's old "buy pre-enchanted via a level dropdown" column is
// gone and these are just plain catalog rows.
//
// Resolution order per item:
//   1. It's a concrete named magic item (e.g. "+1 Amulet of the Devout") —
//      use its own 5e.tools price directly, no multiplier (there's no
//      "unenchanted" version of a unique magic item to multiply from).
//   2. Otherwise it's a generic bonus item (e.g. "+1 Longsword") — resolve
//      the base item's canonical 5e.tools price and multiply by the
//      enhancement multiplier for that level.
//   3. Otherwise fall back to a same-shop base item's listed price x
//      multiplier.
//   4. Otherwise leave the existing price alone and report it.
//
// priceCheap/priceExpensive are always recomputed from the new priceNormal
// at the shop's standard 0.75x / 1.5x ratio (verified against the existing
// data — see conversation), matching every other item in the file.

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SHOPS_FILE = path.join(ROOT, 'src/data/shops.json')
const DATA_DIR = path.join(ROOT, 'public/data/5etools')

const shops = JSON.parse(fs.readFileSync(SHOPS_FILE, 'utf8'))
const baseitem = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'baseitem.json'), 'utf8'))
const magicitem = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'item.json'), 'utf8'))

const CHEAP_RATIO = 0.75
const EXPENSIVE_RATIO = 1.5

function nameCandidates(name) {
  const out = new Set()
  const add = (n) => {
    const t = n.trim()
    if (t) out.add(t)
  }
  const noQty = name.replace(/\s*\(\d+\)\s*$/, '')
  add(noQty)
  for (const base of [name, noQty]) {
    const commaMatch = base.match(/^(.+),\s*(.+)$/)
    if (commaMatch) add(`${commaMatch[2]} ${commaMatch[1]}`)
    if (/s$/i.test(base) && !/ss$/i.test(base)) add(base.replace(/s$/i, ''))
    if (!/\barmor\b/i.test(base)) add(`${base} Armor`)
  }
  out.delete(name)
  return [...out]
}

// Mirrors utils/itemStatblock.js's RARITY_MIDPOINT_CP — a handful of items
// price by DMG rarity tier instead of a flat gp value.
const RARITY_MIDPOINT_CP = {
  common: 7500,
  uncommon: 30000,
  rare: 275000,
  'very rare': 2750000,
  legendary: 10000000,
}

function priceFromEntry(entry) {
  if (entry.value != null) return entry.value
  if (entry.valueRarity != null) return RARITY_MIDPOINT_CP[entry.valueRarity] ?? null
  // Named magic items (e.g. "Amulet of the Devout") rarely carry a `value`
  // at all — 5e RAW leaves their price to the DM — but do carry a `rarity`
  // tier, so fall back to that tier's midpoint as a last resort.
  return RARITY_MIDPOINT_CP[entry.rarity] ?? null
}

// Prefers whichever printing of a name actually has a resolvable price;
// among equally-priced (or equally priceless) printings, prefers the modern
// (XPHB/XDMG/XMM) one. Mirrors utils/itemStatblock.js's indexByNameFirst.
function buildPreferValueIndex(arr) {
  const map = new Map()
  for (const entry of arr) {
    const key = entry.name.toLowerCase()
    const existing = map.get(key)
    if (!existing) {
      map.set(key, entry)
      continue
    }
    const existingHasValue = priceFromEntry(existing) != null
    const entryHasValue = priceFromEntry(entry) != null
    if (entryHasValue !== existingHasValue) {
      if (entryHasValue) map.set(key, entry)
      continue
    }
    if (/^X/.test(entry.source)) map.set(key, entry)
  }
  return map
}

function lookupIn(map, name) {
  for (const candidate of [name, ...nameCandidates(name)]) {
    const hit = map.get(candidate.toLowerCase())
    if (hit) return hit
  }
  return null
}

const baseByName = buildPreferValueIndex(baseitem)
const magicByName = buildPreferValueIndex(magicitem)

function resolveBonusItemPriceCp(shop, item, level, baseName) {
  const concrete = lookupIn(magicByName, item.name)
  const concretePrice = concrete ? priceFromEntry(concrete) : null
  if (concretePrice != null) return concretePrice

  const multiplier = DEFAULT_ENHANCEMENT_MULTIPLIERS[level]
  const base = lookupIn(baseByName, baseName)
  const basePrice = base ? priceFromEntry(base) : null
  if (basePrice != null) return basePrice * multiplier

  const sameShopBase = shop.items.find((i) => i.name.toLowerCase() === baseName.toLowerCase())
  const sameShopPrice = sameShopBase?.priceNormal ? parsePriceToCopper(sameShopBase.priceNormal) : null
  if (sameShopPrice != null) return sameShopPrice * multiplier

  return null
}

let fixed = 0
const unresolved = []

for (const shop of shops) {
  for (const item of shop.items) {
    const m = item.name.match(/^\+(\d+)\s+(.+)$/)
    if (!m) continue
    const level = Number(m[1])
    if (!DEFAULT_ENHANCEMENT_MULTIPLIERS[level]) continue

    const normalCp = resolveBonusItemPriceCp(shop, item, level, m[2])
    if (normalCp == null) {
      unresolved.push(`${shop.name} :: ${item.name}`)
      continue
    }

    item.priceNormal = formatCopper(normalCp)
    if (item.priceCheap) item.priceCheap = formatCopper(normalCp * CHEAP_RATIO)
    if (item.priceExpensive) item.priceExpensive = formatCopper(normalCp * EXPENSIVE_RATIO)
    fixed++
  }
}

fs.writeFileSync(SHOPS_FILE, `${JSON.stringify(shops, null, 2)}\n`)

console.log(`Fixed ${fixed} bonus item prices.`)
if (unresolved.length > 0) {
  console.log(`Left ${unresolved.length} unresolved (no 5e.tools price found) — unchanged:`)
  unresolved.forEach((name) => console.log(`  ${name}`))
}
