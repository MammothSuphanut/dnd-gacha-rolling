import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OFFICIAL_DIR = path.join(ROOT, 'src/data/5etools/official')
const HOMEBREW_DIR = path.join(ROOT, 'src/data/5etools/homebrew')
const OUT_DIR = path.join(ROOT, 'public/data/5etools')

// Official sources belonging to the 2024 ("One D&D") revision.
const EDITION_2024_SOURCES = new Set(['XPHB', 'XDMG', 'XMM'])

// Source -> published date, e.g. two legacy (non-2024-core) books can both
// print a class under the same name (Artificer: TCE 2020 vs EFA 2025) —
// used to pick the newer one instead of keeping both.
function buildPublishedDateIndex() {
  const books = readJson(path.join(OFFICIAL_DIR, 'books.json'))
  const idx = new Map()
  for (const b of books.book || []) {
    if (b.published) idx.set(b.id, b.published)
  }
  return idx
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}
function readJsonIfExists(p) {
  return fs.existsSync(p) ? readJson(p) : null
}
function normName(s) {
  return String(s || '').trim().toLowerCase()
}

const buckets = new Map()
function push(category, entry, tag) {
  if (!buckets.has(category)) buckets.set(category, [])
  buckets.get(category).push({ ...entry, _gr: tag })
}

function buildFluffIndex(fluffArray) {
  const idx = new Map()
  for (const f of fluffArray || []) {
    idx.set(`${normName(f.name)}|${normName(f.source)}`, f)
  }
  return idx
}
function attachFluff(entry, fluffIdx) {
  const f = fluffIdx?.get(`${normName(entry.name)}|${normName(entry.source)}`)
  return f ? { ...entry, fluff: f } : entry
}

// classFeatures entries are pipe-strings "Name|ClassName|Source|Level" (or
// {classFeature: "..."} wrapper objects). Build a lookup so we can attach
// the full feature text instead of just the reference.
function buildClassFeatureIndex(classFeatureArray) {
  const idx = new Map()
  for (const f of classFeatureArray || []) {
    idx.set(`${normName(f.name)}|${normName(f.className)}|${normName(f.source)}|${f.level}`, f)
  }
  return idx
}
function resolveClassFeatures(rawList, idx) {
  return (rawList || []).map((raw) => {
    const key = typeof raw === 'string' ? raw : raw.classFeature
    const [name, className, source, level] = String(key).split('|')
    const full = idx.get(`${normName(name)}|${normName(className)}|${normName(source)}|${level}`)
    return { name, level, source, entries: full?.entries || null }
  })
}

// subclassFeatures pipe-strings are "Name|ClassName|ClassSource|SubclassShortName|SubclassSource|Level" —
// the class-source slot is frequently blank in the reference, so the lookup key deliberately ignores it.
function buildSubclassFeatureIndex(subclassFeatureArray) {
  const idx = new Map()
  for (const f of subclassFeatureArray || []) {
    idx.set(
      `${normName(f.name)}|${normName(f.className)}|${normName(f.subclassShortName)}|${normName(f.subclassSource)}|${f.level}`,
      f,
    )
  }
  return idx
}
function resolveSubclassFeatures(rawList, idx) {
  return (rawList || []).map((raw) => {
    const key = typeof raw === 'string' ? raw : raw.subclassFeature
    const [name, className, , subclassShortName, subclassSource, level] = String(key).split('|')
    const full = idx.get(
      `${normName(name)}|${normName(className)}|${normName(subclassShortName)}|${normName(subclassSource)}|${level}`,
    )
    return { name, level, source: subclassSource, entries: full?.entries || null }
  })
}

// ================= OFFICIAL =================
function editionOfSource(source) {
  return EDITION_2024_SOURCES.has(source) ? '2024' : 'legacy'
}
function officialTag(entry) {
  return { origin: 'official', edition: editionOfSource(entry.source), book: entry.source }
}

function loadOfficial() {
  const classDir = path.join(OFFICIAL_DIR, 'class')
  for (const file of fs.readdirSync(classDir).filter((f) => f.startsWith('class-') && f.endsWith('.json'))) {
    const d = readJson(path.join(classDir, file))
    const fluffData = readJsonIfExists(path.join(classDir, `fluff-${file}`))
    const classFluffIdx = buildFluffIndex(fluffData?.classFluff)
    const subclassFluffIdx = buildFluffIndex(fluffData?.subclassFluff)
    const classFeatureIdx = buildClassFeatureIndex(d.classFeature)
    const subclassFeatureIdx = buildSubclassFeatureIndex(d.subclassFeature)
    for (const c of d.class || []) {
      const withFeatures = { ...c, classFeaturesFull: resolveClassFeatures(c.classFeatures, classFeatureIdx) }
      push('class', attachFluff(withFeatures, classFluffIdx), officialTag(c))
    }
    for (const sc of d.subclass || []) {
      const withFeatures = { ...sc, subclassFeaturesFull: resolveSubclassFeatures(sc.subclassFeatures, subclassFeatureIdx) }
      push('subclass', attachFluff(withFeatures, subclassFluffIdx), officialTag(sc))
    }
  }

  const spellDir = path.join(OFFICIAL_DIR, 'spells')
  // 5etools' official spell files carry no `classes` field of their own (in
  // any edition) — class-spell association instead lives in this separate
  // book->name->class lookup, generated by 5etools itself. Every edition
  // (legacy and 2024/XPHB alike) needs it, not just XPHB.
  const spellClassLookup = readJsonIfExists(path.join(spellDir, 'sources.json')) || {}
  for (const file of fs.readdirSync(spellDir).filter((f) => f.startsWith('spells-') && f.endsWith('.json'))) {
    const d = readJson(path.join(spellDir, file))
    const fluffIdx = buildFluffIndex(readJsonIfExists(path.join(spellDir, `fluff-${file}`))?.spellFluff)
    for (const s of d.spell || []) {
      let entry = attachFluff(s, fluffIdx)
      const classes = spellClassLookup[entry.source]?.[entry.name]?.class
      if (classes && !entry.classes?.fromClassList?.length) {
        entry = { ...entry, classes: { ...entry.classes, fromClassList: classes } }
      }
      push('spell', entry, officialTag(s))
    }
  }

  const bestiaryDir = path.join(OFFICIAL_DIR, 'bestiary')
  for (const file of fs.readdirSync(bestiaryDir).filter((f) => f.startsWith('bestiary-') && f.endsWith('.json'))) {
    const d = readJson(path.join(bestiaryDir, file))
    const fluffIdx = buildFluffIndex(readJsonIfExists(path.join(bestiaryDir, `fluff-${file}`))?.monsterFluff)
    for (const m of d.monster || []) push('bestiary', attachFluff(m, fluffIdx), officialTag(m))
  }

  const simple = [
    ['background', 'backgrounds.json', 'background', 'fluff-backgrounds.json', 'backgroundFluff'],
    ['species', 'races.json', 'race', 'fluff-races.json', 'raceFluff'],
    ['feat', 'feats.json', 'feat', 'fluff-feats.json', 'featFluff'],
    ['optionalfeature', 'optionalfeatures.json', 'optionalfeature', 'fluff-optionalfeatures.json', 'optionalfeatureFluff'],
    ['deity', 'deities.json', 'deity', null, null],
    ['variantrule', 'variantrules.json', 'variantrule', null, null],
    ['adventure', 'adventures.json', 'adventure', null, null],
    ['book', 'books.json', 'book', null, null],
  ]
  for (const [category, file, key, fluffFile, fluffKey] of simple) {
    const d = readJson(path.join(OFFICIAL_DIR, file))
    const fluffIdx = fluffFile ? buildFluffIndex(readJsonIfExists(path.join(OFFICIAL_DIR, fluffFile))?.[fluffKey]) : null
    for (const e of d[key] || []) push(category, attachFluff(e, fluffIdx), officialTag(e))
  }
  {
    const d = readJson(path.join(OFFICIAL_DIR, 'races.json'))
    for (const sr of d.subrace || []) push('species', sr, officialTag(sr))
  }

  {
    const base = readJson(path.join(OFFICIAL_DIR, 'items-base.json'))
    for (const e of base.baseitem || []) push('baseitem', e, officialTag(e))

    const items = readJson(path.join(OFFICIAL_DIR, 'items.json'))
    const fluffIdx = buildFluffIndex(readJsonIfExists(path.join(OFFICIAL_DIR, 'fluff-items.json'))?.itemFluff)
    for (const e of items.item || []) push('item', attachFluff(e, fluffIdx), officialTag(e))
    for (const e of items.itemGroup || []) push('item', attachFluff(e, fluffIdx), officialTag(e))

    const variants = readJson(path.join(OFFICIAL_DIR, 'magicvariants.json'))
    for (const e of variants.magicvariant || []) push('magicvariant', e, officialTag(e))
  }

  {
    const d = readJson(path.join(OFFICIAL_DIR, 'conditionsdiseases.json'))
    const fluffIdx = buildFluffIndex(readJsonIfExists(path.join(OFFICIAL_DIR, 'fluff-conditionsdiseases.json'))?.conditionFluff)
    for (const e of [...(d.condition || []), ...(d.disease || []), ...(d.status || [])]) {
      push('condition', attachFluff(e, fluffIdx), officialTag(e))
    }
  }
}

// ================= HOMEBREW =================
const HOMEBREW_CATEGORY_MAP = {
  class: 'class',
  subclass: 'subclass',
  background: 'background',
  race: 'species',
  subrace: 'species',
  feat: 'feat',
  optionalfeature: 'optionalfeature',
  spell: 'spell',
  baseitem: 'baseitem',
  item: 'item',
  itemGroup: 'item',
  magicvariant: 'magicvariant',
  monster: 'bestiary',
  deity: 'deity',
  variantrule: 'variantrule',
  condition: 'condition',
  disease: 'condition',
  status: 'condition',
}
const HOMEBREW_FLUFF_KEYS = {
  class: 'classFluff',
  subclass: 'subclassFluff',
  race: 'raceFluff',
  monster: 'monsterFluff',
  item: 'itemFluff',
  spell: 'spellFluff',
  disease: 'diseaseFluff',
}

function loadHomebrewLine(lineDir, lineName) {
  for (const file of fs.readdirSync(lineDir).filter((f) => f.endsWith('.json'))) {
    const d = readJson(path.join(lineDir, file))
    const src = d._meta?.sources?.[0]
    const edition = d._meta?.edition === 'one' ? '2024' : '2014'
    const book = src?.json || file
    const tag = { origin: 'homebrew', line: lineName, edition, book }
    const classFeatureIdx = buildClassFeatureIndex(d.classFeature)
    const subclassFeatureIdx = buildSubclassFeatureIndex(d.subclassFeature)
    for (const [key, category] of Object.entries(HOMEBREW_CATEGORY_MAP)) {
      const arr = d[key]
      if (!Array.isArray(arr)) continue
      const fluffKey = HOMEBREW_FLUFF_KEYS[key]
      const fluffIdx = fluffKey ? buildFluffIndex(d[fluffKey]) : null
      for (const e of arr) {
        let withFeatures = e
        if (key === 'class') withFeatures = { ...e, classFeaturesFull: resolveClassFeatures(e.classFeatures, classFeatureIdx) }
        if (key === 'subclass') withFeatures = { ...e, subclassFeaturesFull: resolveSubclassFeatures(e.subclassFeatures, subclassFeatureIdx) }
        push(category, attachFluff(withFeatures, fluffIdx), tag)
      }
    }
  }
}

// ================= DEDUP (prefer 2024 over legacy/2014 when names collide) =================
function dedupeByEdition(entries, preferredEdition) {
  const hasPreferred = new Set(entries.filter((e) => e._gr.edition === preferredEdition).map((e) => normName(e.name)))
  return entries.filter((e) => e._gr.edition === preferredEdition || !hasPreferred.has(normName(e.name)))
}

// A homebrew line occasionally declares the exact same entry twice across
// its own files (e.g. Valda's Spire's "Adamantine" optional feature appears
// verbatim in two of its source files) — collapses those, keeping the first.
// Different from dedupeByEdition: this is the SAME edition/name/source
// appearing twice, not a 2014-vs-2024 reprint.
function dedupeExact(entries) {
  const seen = new Set()
  return entries.filter((e) => {
    const key = `${normName(e.name)}|${normName(e.source)}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

// After the 2024-vs-legacy pass, two *legacy* books can still print the same
// name (e.g. class Artificer: TCE 2020 vs EFA 2025) — keep only the entry
// from the most recently published source. Scoped to 'class' for now since
// that's the reported case; other categories haven't shown this collision.
function dedupeLatestPublished(entries, publishedBySource) {
  const bestDateByName = new Map()
  for (const e of entries) {
    const key = normName(e.name)
    const date = publishedBySource.get(e.source) || ''
    if (!bestDateByName.has(key) || date > bestDateByName.get(key)) bestDateByName.set(key, date)
  }
  const seen = new Set()
  return entries.filter((e) => {
    const key = normName(e.name)
    const date = publishedBySource.get(e.source) || ''
    if (date !== bestDateByName.get(key)) return false
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

// 2024 rules moved ability-score increases onto backgrounds — a background
// with no `ability` field is 2014-only and unusable for 2024 character
// creation, so drop it outright rather than just deprioritizing it.
const SIDEKICK_CLASSES = new Set(['Expert Sidekick', 'Spellcaster Sidekick', 'Warrior Sidekick'])

function categoryPostFilter(category, entries) {
  if (category === 'background') return entries.filter((e) => Array.isArray(e.ability) && e.ability.length > 0)
  if (category === 'class') return entries.filter((e) => !SIDEKICK_CLASSES.has(e.name))
  return entries
}

// ================= SPELL GRANTORS (species/background/feat -> spell) =================
// Spell entries don't carry a reverse link to whatever grants them as a
// bonus/innate spell — that's only a forward reference on the species/
// background/feat side, in `additionalSpells`. We invert it here so the
// spell detail view can show "Species: Tiefling", "Feat: Magic Initiate" etc.
// (mirrors what 5e.tools' own site computes on the fly).
const GRANTOR_SPELL_KEYS = ['innate', 'known', 'prepared', 'expanded']

// Walks known/innate/prepared/expanded's arbitrarily-nested level/frequency
// wrapper objects (e.g. innate.3.daily.1: ["invisibility"]) collecting every
// plain spell-name string leaf. Skips "choose"-shaped nodes entirely (e.g.
// {choose: "level=1|class=Sorcerer"}) since those are a dynamic pick, not a
// single named spell we can attribute.
function collectSpellNames(node, out) {
  if (typeof node === 'string') {
    const clean = node.split('|')[0].split('#')[0].trim().toLowerCase()
    if (clean) out.add(clean)
    return
  }
  if (Array.isArray(node)) {
    for (const n of node) collectSpellNames(n, out)
    return
  }
  if (node && typeof node === 'object') {
    if ('choose' in node) return
    for (const v of Object.values(node)) collectSpellNames(v, out)
  }
}

function attachSpellGrantors(finalByCategory) {
  const spellsByName = new Map()
  for (const spell of finalByCategory.get('spell') || []) {
    const key = normName(spell.name)
    if (!spellsByName.has(key)) spellsByName.set(key, [])
    spellsByName.get(key).push(spell)
  }

  const GRANTOR_TYPES = [
    ['species', 'species'],
    ['background', 'background'],
    ['feat', 'feat'],
  ]
  for (const [category, grantorType] of GRANTOR_TYPES) {
    for (const entry of finalByCategory.get(category) || []) {
      for (const block of entry.additionalSpells || []) {
        const spellNames = new Set()
        for (const key of GRANTOR_SPELL_KEYS) {
          if (block[key]) collectSpellNames(block[key], spellNames)
        }
        if (spellNames.size === 0) continue
        // Prefer the fullest available display label: a subrace entry's own
        // `name` is bare ("Variant; Infernal Legacy") without its parent
        // race, and a block can separately name one lineage within a single
        // entry (Elf XPHB's "Drow"/"High Elf"/"Wood Elf" sub-blocks) —
        // combine whichever of those apply with the entry's own name.
        // Kept separate from the raw name/source/raceName below because
        // 5e.tools' own races.html link hash needs those raw parts in ITS
        // convention ("{name} ({raceName})"), not our display order.
        const label = entry.raceName
          ? `${entry.raceName} (${entry.name})`
          : block.name
            ? `${entry.name} (${block.name})`
            : entry.name
        for (const spellName of spellNames) {
          for (const spell of spellsByName.get(spellName) || []) {
            spell.grantedBy = spell.grantedBy || { species: [], background: [], feat: [] }
            const list = spell.grantedBy[grantorType]
            if (!list.some((g) => g.label === label && g.source === entry.source)) {
              list.push({ label, name: entry.name, source: entry.source, raceName: entry.raceName || null })
            }
          }
        }
      }
    }
  }

  // Subclasses (e.g. a Cleric domain's expanded spell list, a Sorcerer
  // origin's bonus spells) grant spells the exact same way via
  // `additionalSpells` — but that's the same "classes.fromSubclass" concept
  // a handful of spells already carry natively (Valda's Spire's Hex line),
  // so merge into that field instead of a separate `grantedBy` bucket.
  for (const entry of finalByCategory.get('subclass') || []) {
    for (const block of entry.additionalSpells || []) {
      const spellNames = new Set()
      for (const key of GRANTOR_SPELL_KEYS) {
        if (block[key]) collectSpellNames(block[key], spellNames)
      }
      if (spellNames.size === 0) continue
      for (const spellName of spellNames) {
        for (const spell of spellsByName.get(spellName) || []) {
          spell.classes = spell.classes || {}
          spell.classes.fromSubclass = spell.classes.fromSubclass || []
          const grant = {
            class: { name: entry.className, source: entry.classSource },
            subclass: { name: entry.name, shortName: entry.shortName, source: entry.source },
          }
          const exists = spell.classes.fromSubclass.some(
            (g) => g.subclass?.name === grant.subclass.name && g.subclass?.source === grant.subclass.source,
          )
          if (!exists) spell.classes.fromSubclass.push(grant)
        }
      }
    }
  }
}

// ================= MAIN =================
loadOfficial()
loadHomebrewLine(path.join(HOMEBREW_DIR, 'grim-hollow'), 'grim-hollow')
loadHomebrewLine(path.join(HOMEBREW_DIR, 'valdas-spire'), 'valdas-spire')

const publishedBySource = buildPublishedDateIndex()

fs.mkdirSync(OUT_DIR, { recursive: true })
const summary = {}
const finalByCategory = new Map()
// The 2024-ability postFilter on `background` (and similar per-category
// filters) exists to keep character-creation pickers 2024-clean — it's not
// a signal that the entry is bogus. A background like GGR's Rakdos Cultist
// has no `ability` field (predates the 2024 rule) so `categoryPostFilter`
// drops it from background.json, but it still legitimately grants Hellish
// Rebuke — so the spell-grantor scan reads from this pre-postFilter (but
// still edition-deduped) map instead of `finalByCategory`.
const grantorSourceByCategory = new Map()
for (const [category, rawEntries] of [...buckets].sort(([a], [b]) => a.localeCompare(b))) {
  const entries = categoryPostFilter(category, rawEntries)
  let official = dedupeByEdition(
    entries.filter((e) => e._gr.origin === 'official'),
    '2024',
  )
  if (category === 'class') official = dedupeLatestPublished(official, publishedBySource)
  const grimHollow = dedupeByEdition(
    entries.filter((e) => e._gr.origin === 'homebrew' && e._gr.line === 'grim-hollow'),
    '2024',
  )
  const valdasSpire = dedupeByEdition(
    entries.filter((e) => e._gr.origin === 'homebrew' && e._gr.line === 'valdas-spire'),
    '2024',
  )
  const final = dedupeExact([...official, ...grimHollow, ...valdasSpire])
  finalByCategory.set(category, final)
  summary[category] = {
    total: final.length,
    official: official.length,
    grimHollow: grimHollow.length,
    valdasSpire: valdasSpire.length,
    droppedByEditionDedup: entries.length - final.length,
  }

  const rawOfficial = dedupeByEdition(
    rawEntries.filter((e) => e._gr.origin === 'official'),
    '2024',
  )
  const rawGrimHollow = dedupeByEdition(
    rawEntries.filter((e) => e._gr.origin === 'homebrew' && e._gr.line === 'grim-hollow'),
    '2024',
  )
  const rawValdasSpire = dedupeByEdition(
    rawEntries.filter((e) => e._gr.origin === 'homebrew' && e._gr.line === 'valdas-spire'),
    '2024',
  )
  grantorSourceByCategory.set(category, [...rawOfficial, ...rawGrimHollow, ...rawValdasSpire])
}
// Spells themselves must still come from the shipped (postFilter'd) set —
// only the grantor side (species/background/feat/subclass) needs the wider view.
grantorSourceByCategory.set('spell', finalByCategory.get('spell'))

attachSpellGrantors(grantorSourceByCategory)

for (const [category, final] of finalByCategory) {
  fs.writeFileSync(path.join(OUT_DIR, `${category}.json`), JSON.stringify(final, null, 2) + '\n')
}
console.log(JSON.stringify(summary, null, 2))
