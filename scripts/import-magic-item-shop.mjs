// Phase D of docs/shop-item-links-plan.md — bulk-imports a brand-new shop of
// magic items straight from the normalized 5etools item catalog, instead of
// adding them one by one through the UI.
//
// Scope (decided in chat): public/data/5etools/item.json entries with
// rarity !== "none" (i.e. actual magic items), official + homebrew sources.
// baseitem.json (mundane gear, already covered by existing shops) and
// magicvariant.json (templates like "+1 Weapon" that need a base item
// applied — not standalone purchasable items) are excluded. Item-type "GV"
// entries inside item.json are the same kind of template and are excluded
// too (e.g. "Armor of Resistance" — needs a base armor to attach to).
//
// Pricing: most 5etools magic items carry no `value` (5e RAW leaves magic
// item prices to the DM). We approximate a price with a heuristic: start
// from the "sane magic item prices" gp range for the item's rarity, then
// move up/down within that range based on measurable power signals pulled
// from the item data (attunement, +N bonus, charges/recharge, "at will"
// abilities, curse, 5etools' own minor/major tier tag, entry complexity).
// This is a documented approximation, not a hand-priced catalog — spot
// check a few afterward and adjust the constants below if a tier feels off.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SHOPS_PATH = path.join(ROOT, 'src/data/shops.json')
const DATA_DIR = path.join(ROOT, 'public/data/5etools')

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}
function build5etoolsLink(name, source) {
  return `https://5e.tools/items.html#${encodeURIComponent(name.toLowerCase())}_${source.toLowerCase()}`
}

// ---- price formatting (mirrors src/utils/price.js formatCopper, but this
// script runs outside Vite's ESM resolution for plain-JS files under src/,
// so the copper->"X gp Y sp" text formatting is duplicated here rather than
// imported) ----
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
  if (gp < 100000) return Math.round(gp / 500) * 500
  return Math.round(gp / 5000) * 5000
}

const RARITY_RANGE_GP = {
  common: [50, 100],
  uncommon: [101, 500],
  rare: [501, 5000],
  'very rare': [5001, 50000],
  legendary: [50001, 200000],
  artifact: [200001, 800000],
}
const RARITY_LABEL = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  'very rare': 'Very Rare',
  legendary: 'Legendary',
  artifact: 'Artifact',
}

function maxBonus(it) {
  const fields = ['bonusWeapon', 'bonusAc', 'bonusSpellAttack', 'bonusSpellDamage', 'bonusSpellSaveDc']
  let max = 0
  for (const f of fields) {
    const v = it[f]
    if (!v) continue
    const n = parseInt(String(v).replace('+', ''), 10)
    if (!Number.isNaN(n) && n > max) max = n
  }
  return max
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n))
}

function computeScore(it) {
  let score = 0.3
  if (it.reqAttune) score += 0.12
  score += Math.min(maxBonus(it), 3) * 0.09
  const text = JSON.stringify(it.entries || []).toLowerCase()
  if (text.includes('at will')) score += 0.08
  if (it.charges) score += Math.min(Number(it.charges) / 25 || 0, 0.12)
  if (it.recharge) score += 0.05
  if (it.tier === 'major') score += 0.12
  if (it.tier === 'minor') score -= 0.05
  if (it.curse) score -= 0.15
  const entryCount = Array.isArray(it.entries) ? it.entries.length : 0
  score += Math.min(entryCount * 0.02, 0.1)
  const baseType = (it.type || '').split('|')[0]
  const isSingleUseConsumable = (baseType === 'P' || baseType === 'SC') && !it.recharge
  if (isSingleUseConsumable) score -= 0.08
  return clamp(score, 0.05, 0.95)
}

// Returns null when the rarity is too ambiguous ("varies"/"unknown"/etc.)
// to anchor a price range to — left for the admin to price by hand.
function computePriceGp(it) {
  const range = RARITY_RANGE_GP[it.rarity]
  if (!range) return null
  const score = computeScore(it)
  const [min, max] = range
  return niceRound(min + score * (max - min))
}

// ---- type -> shop category ----
const TYPE_CATEGORY = {
  M: 'Weapon',
  R: 'Weapon',
  A: 'Ammunition',
  P: 'Potion',
  SC: 'Scroll',
  RG: 'Ring',
  WD: 'Wand',
  RD: 'Rod',
  S: 'Armor',
  MA: 'Armor',
  HA: 'Armor',
  LA: 'Armor',
  INS: 'Instrument',
  SCF: 'Spellcasting Focus',
  G: 'Adventuring Gear',
  OTH: 'Wondrous Item',
  MG: 'Wondrous Item',
}
function categoryFor(it) {
  const baseType = (it.type || '').split('|')[0]
  return TYPE_CATEGORY[baseType] || 'Wondrous Item'
}

// ---- dedupe reprints of the same item name across sources ----
const PREFERRED_2024_SOURCES = new Set(['XPHB', 'XDMG', 'XMM'])
function pickCanonical(entries) {
  const official = entries.filter((e) => e._gr?.origin === 'official')
  let pool = official.length ? official : entries
  const preferred = pool.filter((e) => PREFERRED_2024_SOURCES.has(e.source))
  pool = preferred.length ? preferred : pool
  return [...pool].sort((a, b) => a.source.localeCompare(b.source))[0]
}

function main() {
  const item = readJson(path.join(DATA_DIR, 'item.json'))
  const magic = item.filter((it) => (it.rarity || 'none') !== 'none' && (it.type || '').split('|')[0] !== 'GV')

  const byName = new Map()
  for (const it of magic) {
    const key = it.name.trim().toLowerCase()
    if (!byName.has(key)) byName.set(key, [])
    byName.get(key).push(it)
  }

  const shopItems = []
  for (const [, entries] of byName) {
    const it = pickCanonical(entries)
    const priceGp = computePriceGp(it)
    const rarityLabel = RARITY_LABEL[it.rarity] || it.rarity || 'Unclear/Varies'
    const isHighTier = ['rare', 'very rare', 'legendary', 'artifact'].includes(it.rarity)

    shopItems.push({
      id: `shopitem-${crypto.randomUUID()}`,
      name: it.name,
      category: categoryFor(it),
      subCategory: rarityLabel,
      priceNormal: priceGp != null ? formatCopper(priceGp * 100) : '',
      priceCheap: priceGp != null ? formatCopper(niceRound(priceGp * 0.75) * 100) : '',
      priceExpensive: priceGp != null ? formatCopper(niceRound(priceGp * 1.5) * 100) : '',
      limitedStock: ['very rare', 'legendary', 'artifact'].includes(it.rarity),
      rural: false,
      urban: true,
      premium: isHighTier,
      note:
        priceGp != null
          ? `${rarityLabel} — ราคาประเมินอัตโนมัติจากความหายาก/ความสามารถของไอเทม (ปรับได้ตามดุลยพินิจ)`
          : `${rarityLabel} — ยังไม่มีราคาอ้างอิง (rarity ไม่ชัดเจนใน 5etools) ให้ตั้งราคาเอง`,
      enhanceable: false,
      link: build5etoolsLink(it.name, it.source),
    })
  }

  shopItems.sort((a, b) => a.name.localeCompare(b.name))

  const shops = readJson(SHOPS_PATH)
  shops.push({
    id: `shop-${crypto.randomUUID()}`,
    name: 'Magic Item Catalog (5e.tools)',
    hardSell: '',
    sellingCap: '',
    notes:
      'นำเข้าอัตโนมัติจากฐานข้อมูล 5e.tools (official + homebrew) เฉพาะไอเทมเวทมนตร์ (rarity ไม่ใช่ none) — ราคาเป็นการประเมินอัตโนมัติจากสูตร ควรตรวจสอบ/ปรับก่อนใช้จริงในแคมเปญ',
    items: shopItems,
  })

  fs.writeFileSync(SHOPS_PATH, JSON.stringify(shops, null, 2) + '\n')
  console.log(`Imported ${shopItems.length} magic items into new shop "Magic Item Catalog (5e.tools)".`)
}

main()
