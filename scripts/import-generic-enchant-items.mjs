// Phase D follow-up — generates the classic "+1 Longsword"-style items that
// 5e.tools computes on the fly by combining a generic bonus template
// (magicvariant.json — "+1 Weapon", "+2 Armor", "+3 Ammunition", ...) with
// every compatible base item (baseitem.json). These aren't standalone
// entries in item.json, which is why the first import pass
// (import-magic-item-shop.mjs) didn't produce them.
//
// Scope: only the plain numeric bonus tiers (+1/+2/+3 Weapon/Armor/
// Ammunition) — the ones every table actually stocks. Flavor-specific
// generic variants (Vicious Weapon, Silvered Weapon, Adamantine Armor,
// etc.) are not included here; ask if you want those added too, since
// cross-multiplying all ~45 of them against every base item balloons fast
// and most only make sense on specific weapon types.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SHOPS_PATH = path.join(ROOT, 'src/data/shops.json')
const DATA_DIR = path.join(ROOT, 'public/data/5etools')
const SHOP_NAME = 'Magic Item Catalog (5e.tools)'

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}
function build5etoolsLink(name, source) {
  return `https://5e.tools/items.html#${encodeURIComponent(name.toLowerCase())}_${source.toLowerCase()}`
}
function formatCopper(cp) {
  let total = Math.round(Math.abs(cp))
  const gp = Math.floor(total / 100)
  total -= gp * 100
  const sp = Math.floor(total / 10)
  total -= sp * 10
  const parts = []
  if (gp) parts.push(`${gp} gp`)
  if (sp) parts.push(`${sp} sp`)
  if (parts.length === 0) parts.push(`${total} cp`)
  return parts.join(' ')
}
function niceRound(gp) {
  if (gp < 100) return Math.round(gp / 5) * 5
  if (gp < 1000) return Math.round(gp / 25) * 25
  if (gp < 10000) return Math.round(gp / 100) * 100
  return Math.round(gp / 500) * 500
}
// Same rarity->gp-range guideline used in import-magic-item-shop.mjs, kept
// in sync manually since these are two independent one-off scripts.
const RARITY_RANGE_GP = {
  uncommon: [101, 500],
  rare: [501, 5000],
  'very rare': [5001, 50000],
  legendary: [50001, 200000],
}
const RARITY_LABEL = {
  uncommon: 'Uncommon',
  rare: 'Rare',
  'very rare': 'Very Rare',
  legendary: 'Legendary',
}
// Generic +N items have no other power signals to weigh (no attunement, no
// charges, one plain sentence of text) — price them at the low-middle of
// their rarity band, same anchor point import-magic-item-shop.mjs's
// baseline score (0.3) resolves to for a signal-less item.
function priceGpFor(rarity) {
  const [min, max] = RARITY_RANGE_GP[rarity]
  return niceRound(min + 0.3 * (max - min))
}

const TYPE_CATEGORY = { M: 'Weapon', R: 'Weapon', A: 'Ammunition', AF: 'Ammunition', LA: 'Armor', MA: 'Armor', HA: 'Armor' }

const PREFERRED_2024_SOURCES = new Set(['XPHB', 'XDMG', 'XMM'])
function pickCanonical(entries) {
  const official = entries.filter((e) => e._gr?.origin === 'official')
  let pool = official.length ? official : entries
  const preferred = pool.filter((e) => PREFERRED_2024_SOURCES.has(e.source))
  pool = preferred.length ? preferred : pool
  return [...pool].sort((a, b) => a.source.localeCompare(b.source))[0]
}

// Pick the 2024 (XDMG) version of a generic variant template when present,
// else fall back to the legacy DMG one.
function pickVariantEdition(entries) {
  const modern = entries.find((e) => e.inherits?.source === 'XDMG')
  return modern || entries[0]
}

function main() {
  const baseitem = readJson(path.join(DATA_DIR, 'baseitem.json'))
  const magicvariant = readJson(path.join(DATA_DIR, 'magicvariant.json'))

  const byBaseName = new Map()
  for (const b of baseitem) {
    const key = b.name.trim().toLowerCase()
    if (!byBaseName.has(key)) byBaseName.set(key, [])
    byBaseName.get(key).push(b)
  }
  const weapons = [...byBaseName.values()].map(pickCanonical).filter((b) => b.weapon)
  const armors = [...byBaseName.values()]
    .map(pickCanonical)
    .filter((b) => ['LA', 'MA', 'HA'].includes((b.type || '').split('|')[0]))
  const ammo = [...byBaseName.values()]
    .map(pickCanonical)
    .filter((b) => ['A', 'AF'].includes((b.type || '').split('|')[0]))

  const variantsByBucket = { weapon: {}, armor: {}, ammo: {} }
  for (const bucket of ['Weapon', 'Armor', 'Ammunition']) {
    const key = bucket === 'Weapon' ? 'weapon' : bucket === 'Armor' ? 'armor' : 'ammo'
    for (const n of [1, 2, 3]) {
      const name = `+${n} ${bucket}`
      const entries = magicvariant.filter((e) => e.name === name)
      if (entries.length) variantsByBucket[key][n] = pickVariantEdition(entries)
    }
  }

  const baseSets = { weapon: weapons, armor: armors, ammo: ammo }
  const newItems = []
  for (const bucketKey of ['weapon', 'armor', 'ammo']) {
    const category = TYPE_CATEGORY[bucketKey === 'weapon' ? 'M' : bucketKey === 'armor' ? 'LA' : 'A']
    for (const base of baseSets[bucketKey]) {
      for (const n of [1, 2, 3]) {
        const variant = variantsByBucket[bucketKey][n]
        if (!variant) continue
        const rarity = variant.inherits.rarity
        const priceGp = priceGpFor(rarity)
        const name = `${variant.inherits.namePrefix}${base.name}`
        newItems.push({
          id: `shopitem-${crypto.randomUUID()}`,
          name,
          category: base.weapon ? 'Weapon' : category,
          subCategory: RARITY_LABEL[rarity] || rarity,
          priceNormal: formatCopper(priceGp * 100),
          priceCheap: formatCopper(niceRound(priceGp * 0.75) * 100),
          priceExpensive: formatCopper(niceRound(priceGp * 1.5) * 100),
          limitedStock: ['very rare', 'legendary'].includes(rarity),
          rural: false,
          urban: true,
          premium: rarity !== 'uncommon',
          note: `${RARITY_LABEL[rarity] || rarity} — ${base.name} +${n} มาตรฐาน ราคาประเมินอัตโนมัติจากความหายาก (ปรับได้ตามดุลยพินิจ)`,
          enhanceable: false,
          link: build5etoolsLink(name, variant.inherits.source),
        })
      }
    }
  }

  newItems.sort((a, b) => a.name.localeCompare(b.name))

  const shops = readJson(SHOPS_PATH)
  const shop = shops.find((s) => s.name === SHOP_NAME)
  if (!shop) throw new Error(`Shop "${SHOP_NAME}" not found — run import-magic-item-shop.mjs first`)

  const existingNames = new Set(shop.items.map((i) => i.name.trim().toLowerCase()))
  const toAdd = newItems.filter((i) => !existingNames.has(i.name.trim().toLowerCase()))
  shop.items.push(...toAdd)
  shop.items.sort((a, b) => a.name.localeCompare(b.name))

  fs.writeFileSync(SHOPS_PATH, JSON.stringify(shops, null, 2) + '\n')
  console.log(`Added ${toAdd.length} generic +1/+2/+3 weapon/armor/ammo items (skipped ${newItems.length - toAdd.length} already present).`)
}

main()
