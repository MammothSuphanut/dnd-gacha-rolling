// Formats the raw 5etools spell schema (time/range/components/duration) into
// plain display strings, and builds the spell's 5e.tools link. Mirrors the
// "#name_source" link convention already used for items (see
// utils/itemStatblock.js) — confirmed to also work for homebrew sources
// (Valda's Spire / Grim Hollow) since shops.json already links their items
// that way successfully.

const TIME_UNIT_LABELS = { action: 'action', bonus: 'bonus action', reaction: 'reaction', minute: 'minute', hour: 'hour' }
const AREA_TYPE_LABELS = { cone: 'cone', line: 'line', emanation: 'emanation', radius: 'radius', sphere: 'sphere', cube: 'cube' }
const DURATION_UNIT_LABELS = { turn: 'turn', round: 'round', minute: 'minute', hour: 'hour', day: 'day', week: 'week', year: 'year' }

function pluralize(unit, amount) {
  return amount === 1 ? unit : `${unit}s`
}

export function formatSpellTime(timeArr) {
  if (!Array.isArray(timeArr) || timeArr.length === 0) return null
  return timeArr
    .map((t) => {
      const unit = TIME_UNIT_LABELS[t.unit] || t.unit
      const base = `${t.number} ${pluralize(unit, t.number)}`
      return t.condition ? `${base}, ${t.condition}` : base
    })
    .join(' or ')
}

export function formatSpellRange(range) {
  if (!range) return null
  const { type, distance } = range
  if (type === 'point') {
    switch (distance?.type) {
      case 'touch':
        return 'Touch'
      case 'self':
        return 'Self'
      case 'sight':
        return 'Sight'
      case 'unlimited':
        return 'Unlimited'
      case 'feet':
        return `${distance.amount} ft.`
      case 'miles':
        return `${distance.amount} ${pluralize('mile', distance.amount)}`
      default:
        return null
    }
  }
  const areaLabel = AREA_TYPE_LABELS[type] || type
  const unit = distance?.type === 'miles' ? 'mile' : 'foot'
  return distance?.amount != null ? `Self (${distance.amount}-${unit} ${areaLabel})` : `Self (${areaLabel})`
}

export function formatSpellComponents(components) {
  if (!components) return null
  const parts = []
  if (components.v) parts.push('V')
  if (components.s) parts.push('S')
  if (components.m) {
    const text = typeof components.m === 'string' ? components.m : components.m.text
    parts.push(text ? `M (${text})` : 'M')
  }
  return parts.join(', ') || null
}

export function formatSpellDuration(durationArr) {
  if (!Array.isArray(durationArr) || durationArr.length === 0) return null
  return durationArr
    .map((d) => {
      if (d.type === 'instant') return 'Instantaneous'
      if (d.type === 'permanent') return d.ends?.includes('trigger') ? 'Until dispelled or triggered' : 'Until dispelled'
      if (d.type === 'special') return 'Special'
      if (d.type === 'timed') {
        const unit = DURATION_UNIT_LABELS[d.duration?.type] || d.duration?.type
        const amount = d.duration?.amount
        const showUpTo = d.duration?.upTo || d.concentration
        const base = `${showUpTo ? 'up to ' : ''}${amount} ${pluralize(unit, amount)}`
        return d.concentration ? `Concentration, ${base}` : base
      }
      return null
    })
    .filter(Boolean)
    .join(' or ')
}

export function isRitual(spell) {
  return !!spell.meta?.ritual
}

export function isConcentration(spell) {
  return Array.isArray(spell.duration) && spell.duration.some((d) => d.concentration)
}

// Matches 5e.tools' own `UrlUtil.URL_TO_HASH_GENERIC` (js/utils.js): each
// part is `encodeURIComponent(str.toLowerCase()).toLowerCase()`, joined by
// "_". Confirmed to be exactly what backgrounds.html, feats.html,
// races.html, classes.html, and spells.html all use — verified against the
// 5etools-src source rather than guessed, since a wrong link is worse than
// no link.
function toUrlified(str) {
  return encodeURIComponent(String(str).toLowerCase()).toLowerCase()
}

function buildFiveEtoolsPageLink(page, name, source) {
  return `https://5e.tools/${page}.html#${toUrlified(name)}_${toUrlified(source)}`
}

export function buildFiveEtoolsSpellLink(spell) {
  return buildFiveEtoolsPageLink('spells', spell.name, spell.source)
}

export function buildFiveEtoolsClassLink({ name, source }) {
  return buildFiveEtoolsPageLink('classes', name, source)
}

// Subclasses don't have their own page — they're a tab within their parent
// class's page, selected via an internal UI-state hash we can't safely
// reproduce (5e.tools' `getClassesPageStatePart`) — so this links to the
// parent class page instead of guessing at that state encoding.
export function buildFiveEtoolsSubclassLink({ class: cls }) {
  return buildFiveEtoolsPageLink('classes', cls?.name, cls?.source)
}

export function buildFiveEtoolsBackgroundLink({ name, source }) {
  return buildFiveEtoolsPageLink('backgrounds', name, source)
}

export function buildFiveEtoolsFeatLink({ name, source }) {
  return buildFiveEtoolsPageLink('feats', name, source)
}

// Subrace entries hash as `"{name} ({raceName})"_{source}` — one combined
// name part, not two separate ones — per 5e.tools' own `subrace` hash
// builder. Plain species (no raceName) just use the generic name/source.
export function buildFiveEtoolsSpeciesLink({ name, source, raceName }) {
  const fullName = raceName ? `${name} (${raceName})` : name
  return buildFiveEtoolsPageLink('races', fullName, source)
}
