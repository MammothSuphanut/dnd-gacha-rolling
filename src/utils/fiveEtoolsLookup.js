// Lazy-loaded lookups against the project's bundled 5etools data mirror
// (src/data/5etools/official) — used by the "modern" PDF export to pull real
// SRD rules text for spells / class & subclass features / species traits /
// feats / equipment, keyed by name off the character sheet's own fields.
//
// Everything here is best-effort: a character's class/species/spell names
// are free text (and homebrew content isn't in this data set at all), so
// every lookup returns null/[] on a miss instead of throwing — callers fall
// back to whatever short text the character record itself already has.
import { entriesToText } from './fiveEtoolsText'

const spellGlob = import.meta.glob('../data/5etools/official/spells/spells-*.json')
const classGlob = import.meta.glob('../data/5etools/official/class/class-*.json')

let spellIndexPromise = null
let classDataPromise = null
let racesPromise = null
let featsPromise = null
let itemsPromise = null

function norm(name) {
  return String(name ?? '').trim().toLowerCase()
}

async function loadSpellIndex() {
  if (!spellIndexPromise) {
    spellIndexPromise = (async () => {
      const map = new Map()
      const modules = await Promise.all(Object.values(spellGlob).map((load) => load()))
      for (const mod of modules) {
        for (const spell of mod.default?.spell ?? []) {
          const key = norm(spell.name)
          // Prefer the first-seen (core PHB/XPHB files sort early alphabetically
          // among "spells-*"); don't overwrite an existing entry.
          if (!map.has(key)) map.set(key, spell)
        }
      }
      return map
    })()
  }
  return spellIndexPromise
}

// Each class JSON file bundles every edition of that class (a 2014/PHB
// `class` entry and, where WotC reprinted it, a 2024/XPHB one) sharing one
// classFeature/subclassFeature pool — so a naive name+level filter over that
// pool doubles up every feature both editions define. Keep all edition
// variants here; callers resolve to one edition via `pickClassDoc`/`pickSubclassDoc`.
async function loadAllClassData() {
  if (!classDataPromise) {
    classDataPromise = (async () => {
      const modules = await Promise.all(Object.values(classGlob).map((load) => load()))
      const byClassName = new Map()
      for (const mod of modules) {
        const data = mod.default
        for (const cls of data.class ?? []) {
          const key = norm(cls.name)
          if (!byClassName.has(key)) byClassName.set(key, { classDocs: [], classFeature: [], subclass: [], subclassFeature: [] })
          const bucket = byClassName.get(key)
          bucket.classDocs.push(cls)
          bucket.classFeature.push(...(data.classFeature ?? []))
          bucket.subclass.push(...(data.subclass ?? []))
          bucket.subclassFeature.push(...(data.subclassFeature ?? []))
        }
      }
      return byClassName
    })()
  }
  return classDataPromise
}

const PREFERRED_SOURCE = 'XPHB' // this project defaults to 2024-edition stats where both exist

// FeatureName|ClassName|ClassSource|Level(|FeatureSource) for a class-level
// feature ref, or FeatureName|ClassName|ClassSource|SubclassShortName|SubclassSource|Level for a subclass one.
function parseFeatureRef(ref) {
  const str = typeof ref === 'string' ? ref : ref?.classFeature ?? ref?.subclassFeature
  if (!str) return null
  const parts = str.split('|')
  return parts
}

function pickPreferredDoc(docs) {
  if (!docs?.length) return null
  return docs.find((d) => norm(d.source) === norm(PREFERRED_SOURCE)) ?? docs[0]
}

async function loadRaces() {
  if (!racesPromise) {
    racesPromise = import('../data/5etools/official/races.json').then((m) => m.default?.race ?? [])
  }
  return racesPromise
}

async function loadFeats() {
  if (!featsPromise) {
    featsPromise = import('../data/5etools/official/feats.json').then((m) => {
      const map = new Map()
      for (const f of m.default?.feat ?? []) {
        const key = norm(f.name)
        if (!map.has(key)) map.set(key, f)
      }
      return map
    })
  }
  return featsPromise
}

async function loadItems() {
  if (!itemsPromise) {
    itemsPromise = Promise.all([
      import('../data/5etools/official/items.json'),
      import('../data/5etools/official/items-base.json'),
    ]).then(([itemsMod, baseMod]) => {
      const map = new Map()
      for (const it of itemsMod.default?.item ?? []) {
        const key = norm(it.name)
        if (!map.has(key)) map.set(key, it)
      }
      for (const it of baseMod.default?.baseitem ?? []) {
        const key = norm(it.name)
        if (!map.has(key)) map.set(key, it)
      }
      return map
    })
  }
  return itemsPromise
}

const SCHOOL_NAMES = {
  A: 'Abjuration', C: 'Conjuration', D: 'Divination', E: 'Enchantment',
  V: 'Evocation', I: 'Illusion', N: 'Necromancy', T: 'Transmutation',
}

function fmtTime(time) {
  const t = time?.[0]
  if (!t) return ''
  const unit = t.unit === 'action' ? 'Action' : t.unit === 'bonus' ? 'Bonus Action'
    : t.unit === 'reaction' ? 'Reaction' : t.unit
  return t.number === 1 ? unit : `${t.number} ${unit}${t.unit === 'action' || t.unit === 'bonus' || t.unit === 'reaction' ? '' : 's'}`
}

function fmtRange(range) {
  if (!range) return ''
  if (range.type === 'point') {
    const d = range.distance
    if (!d) return 'Self'
    if (d.type === 'self') return 'Self'
    if (d.type === 'touch') return 'Touch'
    if (d.type === 'unlimited') return 'Unlimited'
    if (d.type === 'sight') return 'Sight'
    return `${d.amount ?? ''} ${d.type ?? ''}`.trim()
  }
  if (range.type === 'radius' || range.type === 'sphere' || range.type === 'cone' || range.type === 'line') {
    const d = range.distance
    return `Self (${d?.amount ?? ''}-${d?.type ?? 'foot'} ${range.type})`
  }
  return ''
}

function fmtComponents(components) {
  if (!components) return ''
  const parts = []
  if (components.v) parts.push('V')
  if (components.s) parts.push('S')
  if (components.m) parts.push(typeof components.m === 'string' ? `M (${components.m})` : 'M')
  return parts.join(', ')
}

function fmtDuration(duration) {
  const d = duration?.[0]
  if (!d) return ''
  if (d.type === 'instant') return 'Instantaneous'
  if (d.type === 'permanent') return 'Until dispelled'
  if (d.type === 'timed') {
    const conc = d.concentration ? 'Concentration, up to ' : ''
    return `${conc}${d.duration?.amount ?? ''} ${d.duration?.type ?? ''}${d.duration?.amount === 1 ? '' : 's'}`
  }
  return ''
}

// Returns { level, school, time, range, components, duration, ritual, concentration, text, higherLevelText } or null.
export async function getSpellInfo(name) {
  if (!name?.trim()) return null
  const index = await loadSpellIndex()
  const spell = index.get(norm(name))
  if (!spell) return null
  return {
    name: spell.name,
    level: spell.level ?? 0,
    school: SCHOOL_NAMES[spell.school] ?? spell.school ?? '',
    time: fmtTime(spell.time),
    range: fmtRange(spell.range),
    components: fmtComponents(spell.components),
    duration: fmtDuration(spell.duration),
    ritual: !!spell.meta?.ritual,
    concentration: !!spell.duration?.[0]?.concentration,
    material: typeof spell.components?.m === 'string',
    text: entriesToText(spell.entries),
    higherLevelText: spell.entriesHigherLevel ? entriesToText(spell.entriesHigherLevel) : '',
  }
}

// All class features (this class's own progression, not subclass) at or
// below `level`, in level order, from a single resolved edition (see
// `pickPreferredDoc`) so features that exist in both a 2014 and a 2024
// version of the class don't show up twice. Each: { name, level, text }.
export async function getClassFeaturesUpTo(className, level) {
  if (!className?.trim()) return []
  const byClass = await loadAllClassData()
  const entry = byClass.get(norm(className))
  if (!entry) return []
  const cls = pickPreferredDoc(entry.classDocs)
  if (!cls) return []
  const classSourceKey = norm(cls.source)

  const out = []
  for (const ref of cls.classFeatures ?? []) {
    const parts = parseFeatureRef(ref)
    if (!parts) continue
    const [name, refClassName, refClassSource, levelStr] = parts
    const lvl = Number(levelStr) || 1
    if (lvl > (level || 1)) continue
    const match = entry.classFeature.find(
      (f) =>
        norm(f.name) === norm(name) &&
        norm(f.className) === norm(refClassName) &&
        norm(f.classSource || 'PHB') === (refClassSource ? norm(refClassSource) : 'phb') &&
        norm(f.classSource || 'PHB') === (classSourceKey || 'phb') &&
        f.level === lvl,
    )
    if (match) out.push({ name: match.name, level: lvl, text: entriesToText(match.entries) })
  }
  return out.sort((a, b) => a.level - b.level)
}

// Subclass features up to `level` for a given class + subclass display name
// (matched against the subclass's `name` or `shortName`, case-insensitively —
// character records only store the free-text subclass name, e.g. "Archfey"
// or "The Archfey Patron"), resolved to a single edition the same way as
// getClassFeaturesUpTo.
export async function getSubclassFeaturesUpTo(className, subclassName, level) {
  if (!className?.trim() || !subclassName?.trim()) return []
  const byClass = await loadAllClassData()
  const entry = byClass.get(norm(className))
  if (!entry) return []
  const target = norm(subclassName)
  const candidates = entry.subclass.filter(
    (s) => target.includes(norm(s.shortName)) || norm(s.shortName).includes(target) ||
      target.includes(norm(s.name)) || norm(s.name).includes(target),
  )
  const subclass = pickPreferredDoc(candidates)
  if (!subclass) return []

  const out = []
  for (const ref of subclass.subclassFeatures ?? []) {
    const parts = parseFeatureRef(ref)
    if (!parts) continue
    const [name, refClassName, refClassSource, refSubclassShort, refSubclassSource, levelStr] = parts
    const lvl = Number(levelStr) || 1
    if (lvl > (level || 1)) continue
    const match = entry.subclassFeature.find(
      (f) =>
        norm(f.name) === norm(name) &&
        norm(f.className) === norm(refClassName) &&
        norm(f.classSource || 'PHB') === (refClassSource ? norm(refClassSource) : 'phb') &&
        norm(f.subclassShortName) === norm(refSubclassShort) &&
        norm(f.subclassSource || 'PHB') === (refSubclassSource ? norm(refSubclassSource) : 'phb') &&
        f.level === lvl,
    )
    if (match) out.push({ name: match.name, level: lvl, text: entriesToText(match.entries) })
  }
  return out.sort((a, b) => a.level - b.level)
}

// All named traits for a species (5etools calls it "race"), matched by
// exact/partial name. Each: { name, text }.
export async function getSpeciesTraits(speciesName) {
  if (!speciesName?.trim()) return []
  const races = await loadRaces()
  const target = norm(speciesName)
  const race = races.find((r) => norm(r.name) === target) ??
    races.find((r) => target.includes(norm(r.name)) || norm(r.name).includes(target))
  if (!race) return []
  const traits = []
  for (const entry of race.entries ?? []) {
    if (entry && typeof entry === 'object' && entry.name) {
      traits.push({ name: entry.name, text: entriesToText(entry.entries) })
    }
  }
  return traits
}

// Best-effort feat lookup — character records only have a free-text field for
// feats, so this is matched by exact name.
export async function getFeatText(name) {
  if (!name?.trim()) return null
  const feats = await loadFeats()
  const feat = feats.get(norm(name))
  if (!feat) return null
  return entriesToText(feat.entries)
}

// { text, weight, value } for an equipment/item name, or null.
export async function getItemInfo(name) {
  if (!name?.trim()) return null
  const items = await loadItems()
  const item = items.get(norm(name))
  if (!item) return null
  return {
    text: entriesToText(item.entries),
    weight: item.weight ?? null,
    value: item.value ?? null,
  }
}
