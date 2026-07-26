// Category registry for the Compendium (imported 5etools data).
// Each entry maps a route slug to its normalized data file and how to
// summarize/filter it in the list view. See docs/5etools-import-plan.md.

const SCHOOL_LABELS = {
  A: 'Abjuration',
  C: 'Conjuration',
  D: 'Divination',
  E: 'Enchantment',
  V: 'Evocation',
  I: 'Illusion',
  N: 'Necromancy',
  T: 'Transmutation',
}

const SIZE_LABELS = {
  T: 'Tiny',
  S: 'Small',
  M: 'Medium',
  L: 'Large',
  H: 'Huge',
  G: 'Gargantuan',
}

const ALIGNMENT_LABELS = {
  L: 'Lawful',
  N: 'Neutral',
  C: 'Chaotic',
  G: 'Good',
  E: 'Evil',
  U: 'Unaligned',
  A: 'Any',
}

const FEAT_CATEGORY_LABELS = {
  G: 'General',
  O: 'Origin',
  FS: 'Fighting Style',
  EB: 'Epic Boon',
  RF: 'Replaces First Feat',
}

function label(map, code) {
  return map[code] || code
}

function arr(v) {
  return Array.isArray(v) ? v : v == null ? [] : [v]
}

// entry.type for bestiary is usually a string or { type, tags }, but
// shapechangers encode it as { type: { choose: [...] } } — always resolve
// down to a plain string (or null) so it's safe to use as a React child/key.
function monsterTypeString(entry) {
  const t = entry.type
  if (typeof t === 'string') return t
  if (t && typeof t.type === 'string') return t.type
  if (t && t.type && Array.isArray(t.type.choose)) return t.type.choose.join('/')
  return null
}

export const originLabels = {
  official: 'Official',
  'grim-hollow': 'Grim Hollow',
  'valdas-spire': "Valda's Spire",
}

export const editionLabels = {
  '2024': '2024',
  legacy: 'Legacy',
  '2014': '2014',
}

function originFacet(entry) {
  return entry._gr.origin === 'homebrew' ? entry._gr.line : 'official'
}

// Facet filter available on every category.
const ORIGIN_FILTER = {
  key: 'origin',
  label: 'แหล่งที่มา',
  getValues: (e) => [originFacet(e)],
  optionLabel: (v) => originLabels[v] || v,
}
const EDITION_FILTER = {
  key: 'edition',
  label: 'Edition',
  getValues: (e) => [e._gr.edition],
  optionLabel: (v) => editionLabels[v] || v,
}

export const CATEGORIES = [
  {
    id: 'class',
    label: 'Class',
    file: 'class.json',
    filters: [ORIGIN_FILTER, EDITION_FILTER],
  },
  {
    id: 'subclass',
    label: 'Subclass',
    file: 'subclass.json',
    // Browsable via the Class detail page's subclass picker instead of its
    // own sidebar entry — keep the definition so getCategory('subclass')
    // still resolves for that picker's useCompendiumCategory call.
    hiddenFromNav: true,
    filters: [
      {
        key: 'className',
        label: 'Class',
        getValues: (e) => [e.className],
        optionLabel: (v) => v,
      },
      ORIGIN_FILTER,
      EDITION_FILTER,
    ],
  },
  {
    id: 'background',
    label: 'Background',
    file: 'background.json',
    filters: [ORIGIN_FILTER, EDITION_FILTER],
  },
  {
    id: 'species',
    label: 'Species',
    file: 'species.json',
    filters: [ORIGIN_FILTER, EDITION_FILTER],
  },
  {
    id: 'feat',
    label: 'Feat',
    file: 'feat.json',
    filters: [
      {
        key: 'category',
        label: 'ประเภท',
        getValues: (e) => arr(e.category),
        optionLabel: (v) => label(FEAT_CATEGORY_LABELS, v),
      },
      ORIGIN_FILTER,
      EDITION_FILTER,
    ],
  },
  {
    id: 'optionalfeature',
    label: 'Optional Feature',
    file: 'optionalfeature.json',
    filters: [
      {
        key: 'featureType',
        label: 'ประเภท',
        getValues: (e) => arr(e.featureType),
        optionLabel: (v) => v,
      },
      ORIGIN_FILTER,
      EDITION_FILTER,
    ],
  },
  {
    id: 'spell',
    label: 'Spell',
    file: 'spell.json',
    filters: [
      {
        key: 'level',
        label: 'Level',
        getValues: (e) => [String(e.level)],
        optionLabel: (v) => (v === '0' ? 'Cantrip' : `Level ${v}`),
      },
      {
        key: 'school',
        label: 'School',
        getValues: (e) => [e.school],
        optionLabel: (v) => label(SCHOOL_LABELS, v),
      },
      {
        key: 'class',
        label: 'Class',
        // Official spell files carry no `classes` field of their own — the
        // normalize script backfills it from spells/sources.json, but that
        // lookup doesn't cover every book (e.g. XGE, EGW), so some spells
        // still fall through to "ไม่ระบุ".
        getValues: (e) => arr(e.classes?.fromClassList).map((c) => c.name),
        optionLabel: (v) => v,
      },
      {
        key: 'ritual',
        label: 'Ritual',
        getValues: (e) => [e.meta?.ritual ? 'เป็น Ritual' : 'ไม่ใช่ Ritual'],
        optionLabel: (v) => v,
      },
      {
        key: 'concentration',
        label: 'Concentration',
        getValues: (e) => [
          arr(e.duration).some((d) => d.concentration) ? 'ต้อง Concentration' : 'ไม่ต้อง Concentration',
        ],
        optionLabel: (v) => v,
      },
      ORIGIN_FILTER,
      EDITION_FILTER,
    ],
  },
  {
    id: 'baseitem',
    label: 'Base Item',
    file: 'baseitem.json',
    filters: [
      {
        key: 'type',
        label: 'ประเภท',
        getValues: (e) => arr(e.type?.split('|')[0]),
        optionLabel: (v) => v,
      },
      ORIGIN_FILTER,
      EDITION_FILTER,
    ],
  },
  {
    id: 'item',
    label: 'Item',
    file: 'item.json',
    filters: [
      {
        key: 'rarity',
        label: 'Rarity',
        getValues: (e) => arr(e.rarity),
        optionLabel: (v) => v,
      },
      {
        key: 'attunement',
        label: 'Attunement',
        getValues: (e) => [e.reqAttune ? 'ต้อง attune' : 'ไม่ต้อง attune'],
        optionLabel: (v) => v,
      },
      ORIGIN_FILTER,
      EDITION_FILTER,
    ],
  },
  {
    id: 'magicvariant',
    label: 'Magic Variant',
    file: 'magicvariant.json',
    filters: [ORIGIN_FILTER, EDITION_FILTER],
  },
  {
    id: 'bestiary',
    label: 'Bestiary',
    file: 'bestiary.json',
    filters: [
      {
        key: 'cr',
        label: 'CR',
        getValues: (e) => arr(typeof e.cr === 'string' ? e.cr : e.cr?.cr).filter((v) => typeof v === 'string'),
        optionLabel: (v) => v,
      },
      {
        key: 'type',
        label: 'Type',
        getValues: (e) => arr(monsterTypeString(e)),
        optionLabel: (v) => v,
      },
      {
        key: 'size',
        label: 'Size',
        getValues: (e) => arr(e.size).map((s) => label(SIZE_LABELS, s)),
        optionLabel: (v) => v,
      },
      ORIGIN_FILTER,
      EDITION_FILTER,
    ],
  },
  {
    id: 'deity',
    label: 'Deity',
    file: 'deity.json',
    filters: [
      {
        key: 'pantheon',
        label: 'Pantheon',
        getValues: (e) => arr(e.pantheon),
        optionLabel: (v) => v,
      },
      {
        key: 'alignment',
        label: 'Alignment',
        getValues: (e) => arr(e.alignment).filter((a) => typeof a === 'string').map((a) => label(ALIGNMENT_LABELS, a)),
        optionLabel: (v) => v,
      },
      ORIGIN_FILTER,
      EDITION_FILTER,
    ],
  },
  {
    id: 'variantrule',
    label: 'Variant Rule',
    file: 'variantrule.json',
    filters: [
      {
        key: 'ruleType',
        label: 'ประเภท',
        getValues: (e) => arr(e.ruleType),
        optionLabel: (v) => v,
      },
      ORIGIN_FILTER,
      EDITION_FILTER,
    ],
  },
  {
    id: 'condition',
    label: 'Condition',
    file: 'condition.json',
    filters: [ORIGIN_FILTER, EDITION_FILTER],
  },
]

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id)
}

export { originFacet, monsterTypeString, SCHOOL_LABELS, SIZE_LABELS, ALIGNMENT_LABELS }
