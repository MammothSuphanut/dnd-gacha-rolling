// Resolves a shop item (name + optional 5e.tools link) to its mechanical
// statblock (damage, weight, AC, properties, mastery, magic item entries)
// pulled from the normalized 5etools data in public/data/5etools.
//
// Matching strategy, in order:
//   1. Parse the item's `link` (e.g. "#chain%20shirt_xphb") for an exact
//      name+source match against baseitem.json / item.json.
//   2. If the name looks like a generic bonus item ("+1 Longsword"), split
//      off the "+N " prefix, resolve the base item by name (any source),
//      and pair it with the matching generic variant ("+1 Weapon" / "+1
//      Armor" / ...) from magicvariant.json for the bonus rules text.
//   3. If the name matches a generic variant's own bare name ("Hunter's
//      Armor", "Adamantine Ammunition"), use that variant's rules text
//      directly — it describes a whole category, not one base item.
//   4. Fall back to a plain name-only lookup (any source) in item.json then
//      baseitem.json.
// Returns null if nothing matches — callers should fall back to the shop's
// own free-text description.

export const DMG_TYPE_LABELS = { P: 'Piercing', S: 'Slashing', B: 'Bludgeoning' }

let loadPromise = null

function fetchJson(file) {
  return fetch(`/data/5etools/${file}`).then((res) => {
    if (!res.ok) throw new Error(`โหลดข้อมูลไม่สำเร็จ (HTTP ${res.status}): ${file}`)
    return res.json()
  })
}

function loadAll() {
  if (!loadPromise) {
    loadPromise = Promise.all([
      fetchJson('baseitem.json'),
      fetchJson('item.json'),
      fetchJson('magicvariant.json'),
      fetchJson('itemproperty.json'),
      fetchJson('itemmastery.json'),
      fetchJson('itemtype.json'),
      fetchJson('itementry.json'),
    ]).then(([baseitem, item, magicvariant, itemproperty, itemmastery, itemtype, itementry]) => ({
      baseitem,
      item,
      magicvariant,
      itemproperty,
      itemmastery,
      baseitemByNameSource: indexByNameSource(baseitem),
      itemByNameSource: indexByNameSource(item),
      baseitemByName: indexByNameFirst(baseitem),
      itemByName: indexByNameFirst(item),
      propertyByKey: new Map(itemproperty.map((p) => [`${p.abbreviation}|${p.source}`.toLowerCase(), p])),
      masteryByKey: new Map(itemmastery.map((m) => [`${m.name}|${m.source}`.toLowerCase(), m])),
      // Homebrew base items often list property/mastery codes without a
      // "|SOURCE" suffix (e.g. Anti-Material Rifle's property: ["A", "H",
      // "ST", ...]) — these abbreviation-only maps are the fallback lookup.
      propertyByAbbr: buildAbbrFallback(itemproperty, (p) => p.abbreviation),
      masteryByAbbr: buildAbbrFallback(itemmastery, (m) => m.name),
      genericVariantByName: new Map(magicvariant.map((v) => [v.name.toLowerCase(), v])),
      typeNameByAbbr: new Map(itemtype.map((t) => [t.abbreviation, t.name])),
      itemEntryByKey: new Map(itementry.map((e) => [normKey(e.name, e.source), e])),
    }))
  }
  return loadPromise
}

// First entry seen wins, so official (loaded first) beats homebrew when an
// abbreviation/name collides — good enough since collisions are rare and
// this path is only a fallback for codes with no source suffix at all.
function buildAbbrFallback(list, keyFn) {
  const map = new Map()
  for (const entry of list) {
    const key = keyFn(entry).toLowerCase()
    if (!map.has(key)) map.set(key, entry)
  }
  return map
}

function normKey(name, source) {
  return `${name}|${source}`.toLowerCase()
}

function indexByNameSource(arr) {
  const map = new Map()
  for (const entry of arr) map.set(normKey(entry.name, entry.source), entry)
  return map
}

// Prefers whichever printing actually has a price over one that doesn't
// (e.g. official XDMG "Hunting Rifle" has no `value`, only the homebrew
// ValdaGunslinger printing does) — a priceless duplicate is strictly worse
// even if it's the "official" one. Among equally-priced (or equally
// priceless) options, prefers the modern (XPHB/XDMG/XMM) printing.
function indexByNameFirst(arr) {
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

// A 5e.tools item link looks like:
//   https://5e.tools/items.html#chain%20shirt_xphb
// or with a book anchor suffix we don't need:
//   https://5e.tools/items.html#studded%20leather%20armor_xphb_
export function parseFiveEtoolsItemLink(link) {
  if (!link) return null
  const m = link.match(/items\.html#([^_]+)_([a-z0-9]+)/i)
  if (!m) return null
  return { name: decodeURIComponent(m[1]).replace(/%20/g, ' '), source: m[2].toUpperCase() }
}

const VARIANT_KIND_BY_FLAG = [
  ['weapon', 'Weapon'],
  ['armor', 'Armor'],
  ['shield', 'Shield'],
  ['ammo', 'Ammunition'],
]

function genericVariantSuffixFor(baseEntry) {
  for (const [flag, suffix] of VARIANT_KIND_BY_FLAG) {
    if (baseEntry[flag]) return suffix
  }
  return null
}

// Splits "+1 Longsword" -> { bonus: '+1', baseName: 'Longsword' }.
function splitBonusPrefix(name) {
  const m = name.match(/^\+(\d+)\s+(.+)$/)
  if (!m) return null
  return { bonus: `+${m[1]}`, baseName: m[2] }
}

// Codes are usually "ABBR|SOURCE" (or { uid: "2H|XPHB", note: "..." } for
// Lance-style property notes), but homebrew base items often list bare
// abbreviations with no source at all (e.g. property: ["A", "H", "ST"]) —
// fall back to matching the abbreviation alone when the exact key misses.
function resolveCoded(data, byKeyMap, byAbbrMap, code) {
  const raw = typeof code === 'string' ? code : code?.uid
  if (!raw) return null
  const lower = raw.toLowerCase()
  return byKeyMap.get(lower) || byAbbrMap.get(lower.split('|')[0]) || null
}

function buildPropertyEntries(data, codes) {
  return (codes || [])
    .map((code) => resolveCoded(data, data.propertyByKey, data.propertyByAbbr, code))
    .filter(Boolean)
    .map((p) => ({ name: p.name, entries: p.entries }))
}

function buildMasteryEntries(data, codes) {
  return (codes || [])
    .map((code) => resolveCoded(data, data.masteryByKey, data.masteryByAbbr, code))
    .filter(Boolean)
    .map((m) => ({ name: m.name, entries: m.entries }))
}

// "M|XPHB" -> "Melee Weapon"; falls back to the raw code if unrecognized
// (e.g. homebrew types we didn't export a table entry for).
function typeLabel(data, typeCode) {
  if (!typeCode) return null
  const abbr = String(typeCode).split('|')[0]
  return data.typeNameByAbbr.get(abbr) || abbr
}

// Generic-variant rules text uses "{=fieldName}" placeholders (e.g. "You
// have a {=bonusWeapon} bonus...") that must be substituted with the
// concrete value before rendering — otherwise the literal token leaks into
// the UI. Walks the entries tree (strings, nested entries/list/table
// objects) replacing every occurrence.
function substituteTemplateVars(entries, vars) {
  if (!vars || Object.keys(vars).length === 0) return entries
  const json = JSON.stringify(entries)
  const substituted = json.replace(/\{=([a-zA-Z]+)\}/g, (match, key) => {
    const value = vars[key]
    return value == null ? match : String(value)
  })
  return JSON.parse(substituted)
}

// Evaluates the small set of "[[baseItem.value]] <op> <n>" expressions
// magicvariant.json uses to price a variant off its base item (e.g. Hunter's
// Armor = base armor cost + 500gp). Returns entry.value unchanged if there's
// no expression or it doesn't match this shape.
function resolveVariantValue(baseValue, valueExpression) {
  if (!valueExpression || baseValue == null) return baseValue
  const m = valueExpression.match(/^\[\[baseItem\.value\]\]\s*([+*])\s*(\d+)$/)
  if (!m) return baseValue
  const n = Number(m[2])
  return m[1] === '+' ? baseValue + n : baseValue * n
}

// A handful of modern-firearm base items (2024 DMG) skip a flat `value` and
// instead tag a `valueRarity` (DMG "sane magic item price" tier) — same
// convention as ITEM_RARITY_PRICES in utils/price.js. Falls back to the
// midpoint of that tier's range so the modal still shows some price.
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

function baseStatblock(data, entry, { bonusLabel, variant } = {}) {
  const inherits = variant?.inherits
  const templateVars = inherits
    ? {
        bonusWeapon: inherits.bonusWeapon,
        bonusAc: inherits.bonusAc,
        bonusWeaponAttack: inherits.bonusWeaponAttack,
        bonusWeaponDamage: inherits.bonusWeaponDamage,
        bonusSavingThrow: inherits.bonusSavingThrow,
        dmgType: DMG_TYPE_LABELS[entry.dmgType] || entry.dmgType,
      }
    : null
  return {
    kind: 'base',
    name: entry.name,
    source: inherits?.source || entry.source,
    page: inherits?.page ?? entry.page,
    rarity: inherits?.rarity || (bonusLabel ? 'uncommon' : entry.rarity),
    reqAttune: inherits?.reqAttune,
    bonusLabel: bonusLabel || null,
    typeLabel: typeLabel(data, entry.type),
    weaponCategory: entry.weaponCategory,
    age: entry.age,
    firearm: entry.firearm,
    weight: entry.weight,
    value: resolveVariantValue(priceFromEntry(entry), inherits?.valueExpression),
    ac: entry.ac,
    strength: entry.strength,
    stealth: entry.stealth,
    dmg1: entry.dmg1,
    dmg2: entry.dmg2,
    dmgType: entry.dmgType,
    range: entry.range,
    properties: buildPropertyEntries(data, entry.property),
    masteries: buildMasteryEntries(data, entry.mastery),
    entries: substituteTemplateVars(inherits?.entries || entry.entries || [], templateVars),
  }
}

// English-joins a list for substitution text: "acid" / "acid and fire" /
// "acid, fire, and cold".
function joinList(value) {
  const list = Array.isArray(value) ? value : [value]
  if (list.length === 0) return ''
  if (list.length === 1) return String(list[0])
  if (list.length === 2) return `${list[0]} and ${list[1]}`
  return `${list.slice(0, -1).join(', ')}, and ${list[list.length - 1]}`
}

// itemEntry templates use "{{item.field}}" / "{{getFullImmRes item.field}}"
// placeholders, filled in from the concrete item's own fields (e.g. Black
// Dragon Scale Mail's {{item.detail1}} -> "black").
function substituteItemEntryTemplate(entriesTemplate, entry) {
  const json = JSON.stringify(entriesTemplate)
  const substituted = json
    .replace(/\{\{getFullImmRes item\.(\w+)\}\}/g, (_, field) => joinList(entry[field]))
    .replace(/\{\{item\.(\w+)\}\}/g, (_, field) => {
      const value = entry[field]
      if (value == null) return ''
      return Array.isArray(value) ? joinList(value) : String(value)
    })
  return JSON.parse(substituted)
}

const ITEM_ENTRY_REF_RE = /^\{#itemEntry ([^|]+)\|([^}]+)\}$/

// Some magic items don't spell out their own rules text — their `entries` is
// just a pointer like "{#itemEntry Dragon Scale Mail|XDMG}" to a shared
// write-up (every dragon color of scale mail reuses the same template).
// Expands any such pointer in place with the resolved, substituted text.
function expandItemEntryRefs(data, entries, entry) {
  if (!Array.isArray(entries)) return entries
  const out = []
  for (const node of entries) {
    const match = typeof node === 'string' && node.match(ITEM_ENTRY_REF_RE)
    if (match) {
      const template = data.itemEntryByKey.get(normKey(match[1], match[2]))
      if (template) {
        out.push(...substituteItemEntryTemplate(template.entriesTemplate, entry))
        continue
      }
    }
    out.push(node)
  }
  return out
}

function magicStatblock(data, entry) {
  return {
    kind: 'magic',
    name: entry.name,
    source: entry.source,
    page: entry.page,
    rarity: entry.rarity,
    typeLabel: entry.wondrous ? 'Wondrous Item' : typeLabel(data, entry.type),
    reqAttune: entry.reqAttune,
    tier: entry.tier,
    curse: !!entry.curse,
    charges: entry.charges,
    recharge: entry.recharge,
    weight: entry.weight,
    value: priceFromEntry(entry),
    ac: entry.ac,
    strength: entry.strength,
    stealth: entry.stealth,
    dmg1: entry.dmg1,
    dmg2: entry.dmg2,
    dmgType: entry.dmgType,
    range: entry.range,
    properties: [],
    masteries: [],
    entries: expandItemEntryRefs(data, entry.entries || [], entry),
  }
}

// Some generic variants are themselves cataloged in the shop under their own
// bare name (e.g. "Hunter's Armor", "Adamantine Ammunition") rather than as
// "<prefix> <base item>" — they describe a whole category of item ("any
// armor can be built as Hunter's Armor") instead of one specific base item.
function genericCategoryStatblock(variant) {
  const inherits = variant.inherits || {}
  return {
    kind: 'magic',
    name: variant.name,
    source: inherits.source || variant.source,
    page: inherits.page,
    rarity: inherits.rarity,
    reqAttune: inherits.reqAttune,
    properties: [],
    masteries: [],
    entries: inherits.entries || [],
  }
}

function lookupBaseItemAnyForm(data, name) {
  for (const candidate of [name, ...nameCandidates(name)]) {
    const hit = data.baseitemByName.get(candidate.toLowerCase())
    if (hit) return hit
  }
  return null
}

function resolveGenericVariant(data, name) {
  const split = splitBonusPrefix(name)
  if (!split) return null
  const baseEntry = lookupBaseItemAnyForm(data, split.baseName)
  if (!baseEntry) return null
  const suffix = genericVariantSuffixFor(baseEntry)
  if (!suffix) return null
  const variant = data.genericVariantByName.get(`${split.bonus} ${suffix}`.toLowerCase())
  return baseStatblock(data, baseEntry, { bonusLabel: split.bonus, variant })
}

// Our shop names don't always match 5e.tools' exact spelling/word order.
// Generates plausible alternate spellings, cheapest/most-certain first, so
// name-only lookups get a few extra tries before giving up:
//   "Bowstring (5)"     -> "Bowstring"                (strip quantity)
//   "Crossbow, Hand"    -> "Hand Crossbow"             (un-invert "X, Y")
//   "Darts"             -> "Dart"                      (de-pluralize)
//   "Studded Leather"   -> "Studded Leather Armor"     (add " Armor")
function nameCandidates(name) {
  const out = new Set()
  const add = (n) => {
    const trimmed = n.trim()
    if (trimmed) out.add(trimmed)
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

function lookupByNameAnyForm(data, name) {
  for (const candidate of [name, ...nameCandidates(name)]) {
    const key = candidate.toLowerCase()
    const genericCategory = data.genericVariantByName.get(key)
    if (genericCategory) return genericCategoryStatblock(genericCategory)
    const magicByName = data.itemByName.get(key)
    if (magicByName) return magicStatblock(data, magicByName)
    const baseByName = data.baseitemByName.get(key)
    if (baseByName) return baseStatblock(data, baseByName)
  }
  return null
}

export async function resolveItemStatblock({ name, link }) {
  const data = await loadAll()

  const parsed = parseFiveEtoolsItemLink(link)
  if (parsed) {
    const magicHit = data.itemByNameSource.get(normKey(parsed.name, parsed.source))
    if (magicHit) return magicStatblock(data, magicHit)
    const baseHit = data.baseitemByNameSource.get(normKey(parsed.name, parsed.source))
    if (baseHit) return baseStatblock(data, baseHit)
  }

  const generic = resolveGenericVariant(data, name)
  if (generic) return generic

  const byName = lookupByNameAnyForm(data, name)
  if (byName) return byName

  return null
}
