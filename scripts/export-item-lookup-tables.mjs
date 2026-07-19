import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Extracts the small, stable weapon-property / weapon-mastery / item-type
// reference tables (official + homebrew) into standalone files, so the shop
// item statblock modal can resolve `property: ["V|XPHB"]` / `mastery:
// ["Sap|XPHB"]` / `type: "M|XPHB"` codes into their full rules text without
// shipping the whole raw 5etools source files.
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OFFICIAL_FILE = path.join(ROOT, 'src/data/5etools/official/items-base.json')
const HOMEBREW_DIR = path.join(ROOT, 'src/data/5etools/homebrew')
const OUT_DIR = path.join(ROOT, 'public/data/5etools')

function listHomebrewFiles() {
  const out = []
  for (const line of fs.readdirSync(HOMEBREW_DIR)) {
    const lineDir = path.join(HOMEBREW_DIR, line)
    if (!fs.statSync(lineDir).isDirectory()) continue
    for (const file of fs.readdirSync(lineDir)) {
      if (file.endsWith('.json')) out.push(path.join(lineDir, file))
    }
  }
  return out
}

const sourceDocs = [JSON.parse(fs.readFileSync(OFFICIAL_FILE, 'utf8'))]
for (const file of listHomebrewFiles()) {
  sourceDocs.push(JSON.parse(fs.readFileSync(file, 'utf8')))
}

const itemProperty = sourceDocs.flatMap((doc) =>
  (doc.itemProperty || []).map((p) => ({
    abbreviation: p.abbreviation,
    source: p.source,
    name: p.entries?.[0]?.name || p.abbreviation,
    entries: p.entries?.[0]?.entries || [],
  })),
)

const itemMastery = sourceDocs.flatMap((doc) =>
  (doc.itemMastery || []).map((m) => ({
    name: m.name,
    source: m.source,
    entries: m.entries || [],
  })),
)

// itemType names are identical across sources for a given abbreviation
// (e.g. "M" is always "Melee Weapon") — dedupe down to one row each.
const itemTypeByAbbr = new Map()
for (const doc of sourceDocs) {
  for (const t of doc.itemType || []) {
    if (!itemTypeByAbbr.has(t.abbreviation)) itemTypeByAbbr.set(t.abbreviation, t.name)
  }
}
const itemType = [...itemTypeByAbbr.entries()].map(([abbreviation, name]) => ({ abbreviation, name }))

// Some magic items (e.g. every color of Dragon Scale Mail / Chromatic Rose)
// share one shared write-up via a "{#itemEntry Name|Source}" reference in
// their own `entries` instead of repeating the text — itemEntry is that
// shared-text table, keyed by name+source, with "{{item.field}}" /
// "{{getFullImmRes item.field}}" placeholders filled in per concrete item.
const itemEntry = sourceDocs.flatMap((doc) =>
  (doc.itemEntry || []).map((e) => ({
    name: e.name,
    source: e.source,
    entriesTemplate: e.entriesTemplate || [],
  })),
)

fs.writeFileSync(path.join(OUT_DIR, 'itemproperty.json'), JSON.stringify(itemProperty))
fs.writeFileSync(path.join(OUT_DIR, 'itemmastery.json'), JSON.stringify(itemMastery))
fs.writeFileSync(path.join(OUT_DIR, 'itemtype.json'), JSON.stringify(itemType))
fs.writeFileSync(path.join(OUT_DIR, 'itementry.json'), JSON.stringify(itemEntry))

console.log(
  `Wrote ${itemProperty.length} item properties, ${itemMastery.length} item masteries, ${itemType.length} item types, ${itemEntry.length} shared item entries.`,
)
