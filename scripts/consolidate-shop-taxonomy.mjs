// Consolidates shops.json's shop list, item `category`, and item
// `subCategory` down to a smaller, easier-to-browse taxonomy, and backfills
// the (previously always-empty) `magical` / `nonMagical` tags. Requested in
// chat: "รวมร้านค้า หมวดหลัก หมวดรอง แล้วเพิ่ม tag magical, non-magical...
// รวมให้ร้านน้อยลง... unknown ก็ใส่ได้เลย".
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SHOPS_PATH = path.join(ROOT, 'src/data/shops.json')

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}

const shops = readJson(SHOPS_PATH)

// ---- 1. Shop consolidation (33 -> 16) ----
// Each target shop name maps to the source shop names merged into it.
// Shops not listed here are kept as-is (already a sensible standalone shop).
const SHOP_MERGE_MAP = {
  Smithy: ['Smithy', 'Fletcher/Bowyer', 'Leatherworker', 'Gunsmith/Firearms', 'Exotic Weapons Dealer', 'Special Materials, Leather Armor Pieces'],
  'General Store': ['General Store', 'Adventuring Supplies', 'Shady Dealer Theme'],
  'Jeweler & Materials': ['Jeweler/Stonecutter', 'Special Crafting Materials'],
  'Tailor & Clothing': ['Tailor/Textiles', 'High End Clothing'],
  'Tavern & Market': ['Common Meal & Inn Prices', 'Market Produce/ Foods'],
  'Books, Art & Games': ['Book Prices (Library or Otherwise)', 'Art and Games Theme'],
  'Magic Weapons & Armor': ['Magic Weapon', 'Magic Armor'],
  'Magic Accessories': ['Magic Wand', 'Magic Rod', 'Magic Instrument', 'Magic Focus Items', 'Magic Gear, Ammunition & Ring'],
  'Magic Consumables': ['Magic Potion', 'Magic Scroll'],
}
// Every shop name that ends up "Magic *" after consolidation — used for the
// magical/nonMagical backfill in step 3, since shop membership is the one
// fully reliable signal (item-level `rarity` is never populated in this file
// and the useful rarity info instead lives inside `subCategory`).
const MAGIC_SHOP_NAMES = new Set(['Magic Weapons & Armor', 'Magic Accessories', 'Magic Consumables', 'Magic Wondrous Item'])

function mergeShops(shops) {
  const merged = []
  const consumed = new Set()
  for (const [targetName, sourceNames] of Object.entries(SHOP_MERGE_MAP)) {
    const sources = shops.filter((s) => sourceNames.includes(s.name))
    if (sources.length === 0) continue
    sources.forEach((s) => consumed.add(s))
    const anchor = sources[0]
    merged.push({
      id: anchor.id,
      name: targetName,
      hardSell: anchor.hardSell,
      sellingCap: anchor.sellingCap,
      notes: sources.map((s) => s.notes).filter(Boolean).join('\n\n'),
      items: sources.flatMap((s) => s.items),
    })
  }
  for (const s of shops) {
    if (!consumed.has(s)) merged.push(s)
  }
  return merged
}

// ---- 2. Category consolidation (~48 -> ~20) ----
const CATEGORY_MERGE_MAP = {
  Weapons: 'Weapon',
  Gemstones: 'Jewelry & Materials',
  'Materials (Per unit Price)': 'Jewelry & Materials',
  'Alchemy Ingredients': 'Jewelry & Materials',
  'Basic Colors': 'Tattoo & Ink',
  'Tattoo Designs': 'Tattoo & Ink',
  'Specialty Inks': 'Tattoo & Ink',
  'Custom Clothing Items': 'Clothing & Accessories',
  'Custom Accessories': 'Clothing & Accessories',
  Services: 'Services & Lodging',
  'Room Prices, Inns/ Taverns': 'Services & Lodging',
  'Tack & Drawn Vehicles': 'Vehicles & Mounts',
  'Mounts & Other Animals': 'Vehicles & Mounts',
  'Waterborne Vehicles': 'Vehicles & Mounts',
  'Airborne Vehicles': 'Vehicles & Mounts',
  Protein: 'Food & Drink',
  Spices: 'Food & Drink',
  Breakfast: 'Food & Drink',
  Lunch: 'Food & Drink',
  Dinner: 'Food & Drink',
  'Food and Drink': 'Food & Drink',
  'Baked Goods': 'Food & Drink',
  Grains: 'Food & Drink',
  Vegetables: 'Food & Drink',
  Cheeses: 'Food & Drink',
  'Non-Alcoholic Drinks': 'Food & Drink',
  Fruits: 'Food & Drink',
  Miscellaneous: 'Adventuring Gear',
  Extras: 'Adventuring Gear',
  'Trade Goods': 'Adventuring Gear',
  Books: 'Books & Games',
  'Custom Armor Parts': 'Armor',
}
// "Magic Items" is a stray category the auto-importer never produced —
// these rows are generic-tier potions/scrolls sitting inside mundane shops
// (Potion Shop, Arcane Shop); recategorize by what they actually are.
function fixMagicItemsCategory(item) {
  if (item.category !== 'Magic Items') return item.category
  if (/potion/i.test(item.name)) return 'Potion'
  if (/scroll/i.test(item.name)) return 'Scroll'
  return 'Adventuring Gear'
}

// ---- 3. Subcategory cleanup ----
// "unknown" / "unknown (magic)" is 5e.tools' own literal rarity string for
// items an adventure module never assigned a formal DMG rarity tier to —
// default them to the most common real tier ("Rare") rather than leaving an
// unhelpful "unknown" label in the filter UI.
function fixSubCategory(subCategory) {
  if (subCategory === 'unknown' || subCategory === 'unknown (magic)') return 'Rare'
  return subCategory
}

function main() {
  const mergedShops = mergeShops(shops)

  for (const shop of mergedShops) {
    const isMagicShop = MAGIC_SHOP_NAMES.has(shop.name)
    for (const item of shop.items) {
      if (item.category === 'Magic Items') item.category = fixMagicItemsCategory(item)
      else if (CATEGORY_MERGE_MAP[item.category]) item.category = CATEGORY_MERGE_MAP[item.category]

      item.subCategory = fixSubCategory(item.subCategory)

      // 4. magical / nonMagical backfill — shop membership is the reliable
      // signal (see MAGIC_SHOP_NAMES comment above).
      item.magical = isMagicShop
      item.nonMagical = !isMagicShop
    }
  }

  fs.writeFileSync(SHOPS_PATH, `${JSON.stringify(mergedShops, null, 2)}\n`)

  const catCounts = new Map()
  const subCounts = new Map()
  let total = 0
  for (const shop of mergedShops) {
    for (const item of shop.items) {
      total++
      catCounts.set(item.category, (catCounts.get(item.category) || 0) + 1)
      subCounts.set(item.subCategory || '(none)', (subCounts.get(item.subCategory || '(none)') || 0) + 1)
    }
  }

  console.log(`${mergedShops.length} shops, ${total} items total.`)
  mergedShops.forEach((s) => console.log(`  ${s.name} (${s.items.length})`))
  console.log(`\n${catCounts.size} categories:`)
  ;[...catCounts.entries()].sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k}: ${v}`))
}

main()
