// Formats a feat/class-option/background `prerequisite` array into a plain
// display string. 5etools' own site has a much more thorough renderer for
// this (with proper linking etc.) — this is a best-effort plain-text version
// covering the shapes that actually show up in our data, good enough for a
// one-line summary in the detail panel.

const ABILITY_LABELS = { str: 'Strength', dex: 'Dexterity', con: 'Constitution', int: 'Intelligence', wis: 'Wisdom', cha: 'Charisma' }

function formatLevel(level) {
  if (level == null) return null
  if (typeof level !== 'object') return `Level ${level}`
  const bits = [`Level ${level.level}`]
  if (level.class) bits.push(level.class.name)
  if (level.subclass) bits.push(`(${level.subclass.name})`)
  return bits.join(' ')
}

function formatSpellPrereq(spell) {
  if (typeof spell === 'string') return spell.split('#')[0].split('|')[0]
  return spell.entrySummary || spell.entry || 'a spell'
}

function formatAlternative(alt) {
  const parts = []
  const level = formatLevel(alt.level)
  if (level) parts.push(level)
  if (alt.race) parts.push(alt.race.map((r) => r.name).join(' or '))
  if (alt.background) parts.push(alt.background.map((b) => b.name).join(' or '))
  if (alt.ability) {
    parts.push(
      alt.ability
        .map((a) => Object.entries(a).map(([k, v]) => `${ABILITY_LABELS[k] || k.toUpperCase()} ${v}+`).join(' and '))
        .join(' or '),
    )
  }
  if (alt.proficiency) {
    parts.push(alt.proficiency.map((p) => Object.entries(p).map(([k, v]) => `${v} proficiency (${k})`).join(', ')).join(' or '))
  }
  if (alt.spellcasting2020 || alt.spellcastingFeature || alt.spellcasting) parts.push('the Spellcasting feature')
  if (alt.feat) parts.push(alt.feat.map((f) => String(f).split('|')[0]).join(' or '))
  if (alt.feature) parts.push((Array.isArray(alt.feature) ? alt.feature : [alt.feature]).join(' or '))
  if (alt.optionalfeature) parts.push(alt.optionalfeature.map((o) => String(o).split('|')[0]).join(' or '))
  if (alt.spell) parts.push((Array.isArray(alt.spell) ? alt.spell : [alt.spell]).map(formatSpellPrereq).join(' or '))
  if (alt.pact) parts.push(`Pact of the ${alt.pact}`)
  if (alt.item) parts.push(alt.item.join(', '))
  if (alt.campaign) parts.push(`${alt.campaign.join(' or ')} campaign`)
  if (alt.otherSummary) parts.push(alt.otherSummary.entrySummary || alt.otherSummary.entry)
  if (alt.other) parts.push(alt.other)
  return parts.filter(Boolean).join(', ')
}

export function formatPrerequisite(prerequisite) {
  if (!Array.isArray(prerequisite) || prerequisite.length === 0) return null
  return prerequisite.map(formatAlternative).filter(Boolean).join(' or ')
}
