import {
  ABILITY_KEYS,
  DND_LANGUAGES,
  blankCombat,
  blankCurrency,
  blankSavingThrows,
  blankSkills,
  migrateLegacyAction,
  normalizeSpellcasting,
} from './dnd5e'
import { createId } from './id'

const SIZE_MAP = { tiny: 'Tiny', sm: 'Small', med: 'Medium', lg: 'Large', huge: 'Huge', grg: 'Gargantuan' }

// Foundry's dnd5e system abbreviates skills; map onto this app's SKILLS keys.
const FOUNDRY_SKILL_MAP = {
  acr: 'acrobatics',
  ani: 'animal',
  arc: 'arcana',
  ath: 'athletics',
  dec: 'deception',
  his: 'history',
  ins: 'insight',
  itm: 'intimidation',
  inv: 'investigation',
  med: 'medicine',
  nat: 'nature',
  prc: 'perception',
  prf: 'performance',
  per: 'persuasion',
  rel: 'religion',
  slt: 'sleightOfHand',
  ste: 'stealth',
  sur: 'survival',
}

const LANGUAGE_CODE_MAP = {
  ...Object.fromEntries(DND_LANGUAGES.map((l) => [l.toLowerCase().replace(/\s+/g, ''), l])),
  deep: 'Deep Speech',
  deepspeech: 'Deep Speech',
}

const EQUIPMENT_ITEM_TYPES = new Set(['equipment', 'consumable', 'tool', 'loot', 'container'])

// Foundry item descriptions carry both real HTML and a mix of inline-roll
// syntax ("[[/damage 2d4 type=bludgeoning]]") and reference tags. Some of
// this project's Foundry exports were themselves converted from 5etools text,
// so several bracket styles show up: native Foundry "@UUID[...]{label}"
// links, "&Reference[skill=Investigation]"-style system references, and
// 5etools-style "@tag[content|source]" tags (which — unlike @UUID — have no
// {label} and can nest further "[...]" inside their own content, e.g.
// "@variantrule[Emanation [Area of Effect]|XPHB|Emanation]").
function resolveBracketTags(str) {
  let out = ''
  let i = 0
  while (i < str.length) {
    if ((str[i] === '@' || str[i] === '&') && /[A-Za-z]/.test(str[i + 1] || '')) {
      let j = i + 1
      while (j < str.length && /[A-Za-z0-9]/.test(str[j])) j++
      if (str[j] === '[') {
        let depth = 1
        let k = j + 1
        while (k < str.length && depth > 0) {
          if (str[k] === '[') depth++
          else if (str[k] === ']') depth--
          k++
        }
        const content = str.slice(j + 1, k - 1)
        // "content|source" (5etools convention) -> first segment;
        // "key=value" (Foundry's &Reference[skill=Investigation]) -> the value.
        out += content.includes('|') ? content.split('|')[0] : content.includes('=') ? content.split('=').pop() : content
        i = k
        continue
      }
    }
    out += str[i]
    i++
  }
  return out
}

function resolveInlineRolls(str) {
  return str.replace(/\[\[\/?(\w+)\s*([^\]]*)\]\]/g, (_, cmd, args) => {
    const diceMatch = args.match(/(\d*d\d+(?:\s*[+-]\s*\d+)?)/i)
    const typeMatch = args.match(/type=(\w+)/i)
    const dice = diceMatch ? diceMatch[1].replace(/\s+/g, '') : args.trim()
    return typeMatch ? `${dice} ${typeMatch[1]}` : dice
  })
}

// Converts one Foundry item's HTML description into plain text, preserving
// paragraph breaks (needed so an "At Higher Levels"-style trailing block
// reads as its own paragraph, matching how the SRD-sourced text renders).
function stripHtml(raw) {
  if (!raw) return ''
  // Entities decode first — a literal "&" (as opposed to an HTML entity)
  // only appears in the source as "&amp;", including in "&amp;Reference[...]"
  // tags, so resolveBracketTags needs a real "&" to recognize those.
  let text = raw
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
  text = resolveInlineRolls(text)
  text = text.replace(/@UUID\[[^\]]*\]\{([^}]*)\}/g, '$1')
  text = resolveBracketTags(text)
  text = text.replace(/<\/(p|div|li|h[1-6])>/gi, '\n\n')
  text = text.replace(/<br\s*\/?>/gi, '\n')
  text = text.replace(/<li[^>]*>/gi, '• ')
  text = text.replace(/<[^>]+>/g, '')
  return text
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n\n')
}

const FOUNDRY_SCHOOL_NAMES = {
  abj: 'Abjuration', con: 'Conjuration', div: 'Divination', enc: 'Enchantment',
  evo: 'Evocation', ill: 'Illusion', nec: 'Necromancy', trs: 'Transmutation',
}

function foundryActivationText(activation) {
  const type = activation?.type
  if (!type) return ''
  const labels = {
    action: 'Action', bonus: 'Bonus Action', reaction: 'Reaction',
    minute: 'Minute', hour: 'Hour', day: 'Day', special: 'Special', legendary: 'Legendary Action',
  }
  const label = labels[type] || type
  const value = Number(activation.value) || 0
  if ((type === 'minute' || type === 'hour' || type === 'day') && value) {
    return `${value} ${label}${value === 1 ? '' : 's'}`
  }
  return label
}

function foundryRangeText(range) {
  if (!range) return ''
  if (range.units === 'self') return 'Self'
  if (range.units === 'touch') return 'Touch'
  if (range.units === 'any') return 'Any'
  if (range.units === 'spec' || range.units === 'special') return range.special || 'Special'
  if (range.value) return `${range.value} ${range.units || 'ft'}`
  return range.units || ''
}

function foundryDurationText(duration) {
  if (!duration) return ''
  if (duration.units === 'inst') return 'Instantaneous'
  if (duration.units === 'perm') return 'Until dispelled'
  const labels = { round: 'Round', minute: 'Minute', hour: 'Hour', day: 'Day', spec: 'Special' }
  const label = labels[duration.units] || duration.units || ''
  const n = Number(duration.value) || 0
  return n ? `${n} ${label}${n === 1 ? '' : 's'}` : label
}

function foundryComponentsText(properties, materials) {
  const parts = []
  if (properties?.includes('vocal')) parts.push('V')
  if (properties?.includes('somatic')) parts.push('S')
  if (properties?.includes('material')) parts.push(materials?.value ? `M (${materials.value})` : 'M')
  return parts.join(', ')
}

// One-line "School — Casting Time, Range, Components, Concentration,
// Duration" summary, matching the format used elsewhere for SRD-sourced spells.
function foundrySpellMeta(system) {
  const school = FOUNDRY_SCHOOL_NAMES[system?.school] || system?.school || ''
  const ritual = !!system?.properties?.includes('ritual')
  const concentration = !!system?.properties?.includes('concentration')
  const bits = [
    foundryActivationText(system?.activation),
    foundryRangeText(system?.range),
    foundryComponentsText(system?.properties, system?.materials),
    concentration ? 'Concentration' : null,
    foundryDurationText(system?.duration),
  ].filter(Boolean)
  return `${school}${ritual ? ' (ritual)' : ''} — ${bits.join(', ')}`
}

function parseClassLevels(items) {
  const classItems = items.filter((it) => it.type === 'class')
  if (classItems.length === 0) return null
  const subclassItems = items.filter((it) => it.type === 'subclass')
  return classItems.map((ci) => {
    const sub = subclassItems.find((si) => si.system?.classIdentifier === ci.system?.identifier)
    return {
      id: createId('classlevel'),
      className: ci.name || '',
      subclassName: sub?.name || '',
      level: Math.max(1, Number(ci.system?.levels) || 1),
    }
  })
}

// Optional variant-rule ability scores (Foundry's "Honor and Sanity Scores"
// module rule) — only present in system.abilities when a campaign actually
// uses them, so these are copied over when found rather than defaulted.
const OPTIONAL_ABILITY_KEYS = ['hon', 'san']

function parseStats(abilities) {
  if (!abilities) return null
  const stats = {}
  let any = false
  for (const key of ABILITY_KEYS) {
    const val = abilities[key]?.value
    if (val != null) any = true
    stats[key] = Number(val) || 0
  }
  for (const key of OPTIONAL_ABILITY_KEYS) {
    const val = abilities[key]?.value
    if (val != null) stats[key] = Number(val) || 0
  }
  return any ? stats : null
}

function parseSavingThrows(abilities) {
  const savingThrows = blankSavingThrows()
  for (const key of ABILITY_KEYS) {
    savingThrows[key] = Number(abilities?.[key]?.proficient) > 0
  }
  for (const key of OPTIONAL_ABILITY_KEYS) {
    if (abilities?.[key] != null) {
      savingThrows[key] = Number(abilities[key]?.proficient) > 0
    }
  }
  return savingThrows
}

function parseSkills(skills) {
  const result = blankSkills()
  for (const [foundryKey, appKey] of Object.entries(FOUNDRY_SKILL_MAP)) {
    const value = Number(skills?.[foundryKey]?.value) || 0
    result[appKey] = { prof: value >= 1, expertise: value >= 2 }
  }
  return result
}

function weaponDamageText(item) {
  const base = item.system?.damage?.base
  if (!base) return ''
  const parts = []
  if (base.number && base.denomination) parts.push(`${base.number}d${base.denomination}`)
  if (base.bonus) parts.push(base.bonus)
  const dmg = parts.join(' + ')
  const types = (base.types ?? []).join('/')
  return [dmg, types].filter(Boolean).join(' ')
}

function abilityModFromScore(score) {
  return Math.floor((Number(score ?? 10) - 10) / 2)
}

// 2024/2014 PHB proficiency bonus by total character level.
function proficiencyBonusForLevel(totalLevel) {
  if (totalLevel >= 17) return 6
  if (totalLevel >= 13) return 5
  if (totalLevel >= 9) return 4
  if (totalLevel >= 5) return 3
  return 2
}

function isWeaponProficient(item, weaponProfValues) {
  const explicit = item.system?.proficient
  if (explicit === 1 || explicit === true) return true
  if (explicit === 0 || explicit === false) return false
  // proficient is null/undefined -> Foundry auto-determines it from the actor's
  // weapon proficiencies; approximate using the simple/martial category and,
  // failing that, the specific base weapon identifier.
  const category = item.system?.type?.value?.startsWith('simple')
    ? 'sim'
    : item.system?.type?.value?.startsWith('martial')
      ? 'mar'
      : ''
  if (category && weaponProfValues?.includes(category)) return true
  const baseItem = item.system?.type?.baseItem || item.system?.identifier
  return !!(baseItem && weaponProfValues?.includes(baseItem))
}

function weaponAbilityMod(item, abilities) {
  const strMod = abilityModFromScore(abilities?.str?.value)
  const dexMod = abilityModFromScore(abilities?.dex?.value)
  const activities = item.system?.activities ? Object.values(item.system.activities) : []
  const explicitAbility = activities.find((a) => a.type === 'attack')?.attack?.ability
  if (explicitAbility === 'str') return strMod
  if (explicitAbility === 'dex') return dexMod
  if (item.system?.properties?.includes('fin')) return Math.max(strMod, dexMod)
  if (item.system?.type?.value?.endsWith('R')) return dexMod
  return strMod
}

function weaponAttackBonus(item, abilities, weaponProfValues, profBonus) {
  const abilityMod = weaponAbilityMod(item, abilities)
  const proficient = isWeaponProficient(item, weaponProfValues)
  const magicBonus = Number(item.system?.magicalBonus) || 0
  const total = abilityMod + (proficient ? profBonus : 0) + magicBonus
  return total >= 0 ? `+${total}` : `${total}`
}

function parseWeaponsAndEquipment(items, system, profBonus) {
  const weaponItems = [...items.filter((it) => it.type === 'weapon')].sort(
    (a, b) => (b.system?.equipped ? 1 : 0) - (a.system?.equipped ? 1 : 0),
  )
  const weaponProfValues = system?.traits?.weaponProf?.value
  const weaponRows = weaponItems.slice(0, 6).map((it) =>
    migrateLegacyAction({
      name: it.name,
      atkBonus: weaponAttackBonus(it, system?.abilities, weaponProfValues, profBonus),
      damage: weaponDamageText(it),
    }),
  )
  const overflowWeapons = weaponItems.slice(6)

  const equipmentItems = items.filter(
    (it) => EQUIPMENT_ITEM_TYPES.has(it.type) || overflowWeapons.includes(it),
  )
  const equipment = equipmentItems.map((it) => {
    const description = stripHtml(it.system?.description?.value)
    const weight = it.system?.weight?.value
    return {
      name: it.name || '',
      qty: Math.max(1, Number(it.system?.quantity) || 1),
      ...(description ? { description } : {}),
      ...(typeof weight === 'number' ? { weight } : {}),
    }
  })

  return { weapons: weaponRows.length > 0 ? weaponRows : null, equipment }
}

function parseFeatures(items) {
  const featuresAndTraits = []
  const extraFeats = []
  for (const it of items) {
    if (it.type !== 'feat') continue
    const kind = it.system?.type?.value
    const description = stripHtml(it.system?.description?.value)
    if (kind === 'class' || kind === 'race') {
      featuresAndTraits.push({ name: it.name || '', description })
    } else {
      extraFeats.push(it.name || '')
    }
  }
  return { featuresAndTraits, additionalFeaturesTraits: extraFeats.join('; ') }
}

function parseSpellcasting(data, items) {
  const classItems = items.filter((it) => it.type === 'class')
  const spellcastingClassItem = classItems.find(
    (ci) => ci.system?.spellcasting?.progression && ci.system.spellcasting.progression !== 'none',
  )
  const spellcastingClass = spellcastingClassItem?.name || ''
  const abilityRaw = data.system?.attributes?.spellcasting || ''
  const spellcastingAbility = abilityRaw ? abilityRaw.toUpperCase() : ''

  const spellItems = items.filter((it) => it.type === 'spell')
  const spellEntry = (s) => ({
    name: s.name || '',
    description: stripHtml(s.system?.description?.value),
    meta: foundrySpellMeta(s.system),
  })
  const cantrips = spellItems
    .filter((s) => Number(s.system?.level) === 0)
    .map((s) => ({ ...spellEntry(s) }))

  const levels = {}
  for (let lvl = 1; lvl <= 9; lvl++) {
    const spells = spellItems
      .filter((s) => Number(s.system?.level) === lvl && Number(s.system?.prepared) >= 1)
      .map((s) => ({ ...spellEntry(s), prepared: true }))
    const slotsTotal = data.system?.spells?.[`spell${lvl}`]?.value
    levels[lvl] = { slotsTotal: slotsTotal != null ? slotsTotal : '', spells }
  }

  const hasData =
    spellcastingClass ||
    spellcastingAbility ||
    cantrips.length > 0 ||
    Object.values(levels).some((l) => l.slotsTotal !== '' || l.spells.length > 0)
  if (!hasData) return null

  return normalizeSpellcasting({ spellcastingClass, spellcastingAbility, cantrips, levels })
}

function parseSpeed(items) {
  const race = items.find((it) => it.type === 'race')
  const walk = race?.system?.movement?.walk
  if (!walk) return ''
  const units = race?.system?.movement?.units || 'ft'
  return `${walk} ${units}`
}

function parseLanguages(traits) {
  const codes = traits?.languages?.value ?? []
  return codes.map((code) => LANGUAGE_CODE_MAP[code.toLowerCase()] || code)
}

// Reads a Foundry VTT (dnd5e system) actor export and reverse-maps it into a
// character patch object suitable for merging into CharacterFormModal's form
// state. Unlike the fillable-PDF character sheet, this is fully structured
// data (typed items array, numeric ability/skill values) so extraction is
// direct field access rather than text parsing - only truly-derived values
// Foundry computes at render time (AC, max HP, spell DC/attack bonus) are
// left for the user to fill in, since they aren't part of the export.
export async function parseFoundryActor(file) {
  const text = await file.text()
  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error('ไฟล์นี้ไม่ใช่ JSON ที่ถูกต้อง')
  }
  if (data.type !== 'character' || !data.system) {
    throw new Error('ไฟล์นี้ไม่ใช่ Foundry VTT character actor export ที่รองรับ')
  }

  const items = Array.isArray(data.items) ? data.items : []
  const system = data.system

  const patch = {}

  if (data.name) patch.name = data.name

  const speciesItem = items.find((it) => it.type === 'race')
  if (speciesItem?.name) patch.species = speciesItem.name
  const backgroundItem = items.find((it) => it.type === 'background')
  if (backgroundItem?.name) patch.background = backgroundItem.name

  const classLevels = parseClassLevels(items)
  if (classLevels) patch.classLevels = classLevels

  if (system.details?.alignment) patch.alignment = system.details.alignment
  const size = SIZE_MAP[system.traits?.size]
  if (size) patch.size = size

  for (const key of ['faith', 'gender', 'eyes', 'hair', 'skin', 'height', 'weight', 'age', 'appearance']) {
    const raw = system.details?.[key]
    if (raw) patch[key] = raw
  }
  if (system.details?.trait) patch.personalityTraits = stripHtml(system.details.trait)
  if (system.details?.ideal) patch.ideals = stripHtml(system.details.ideal)
  if (system.details?.bond) patch.bonds = stripHtml(system.details.bond)
  if (system.details?.flaw) patch.flaws = stripHtml(system.details.flaw)
  const biography = stripHtml(system.details?.biography?.value)
  if (biography) patch.biography = biography

  const stats = parseStats(system.abilities)
  if (stats) patch.stats = stats
  patch.savingThrows = parseSavingThrows(system.abilities)
  patch.skills = parseSkills(system.skills)

  const level1 = patch.classLevels?.[0]?.level || 1
  patch.combat = {
    ...blankCombat(),
    xp: system.details?.xp?.value ?? '',
    inspiration: !!system.attributes?.inspiration,
    speed: parseSpeed(items),
    hitDice:
      patch.classLevels?.length === 1 && items.find((it) => it.type === 'class')?.system?.hd?.denomination
        ? `${level1}${items.find((it) => it.type === 'class').system.hd.denomination}`
        : '',
    hp: {
      current: system.attributes?.hp?.value ?? '',
      max: typeof system.attributes?.hp?.max === 'number' ? system.attributes.hp.max : '',
      temp: system.attributes?.hp?.temp ?? '',
    },
    deathSaves: {
      successes: Number(system.attributes?.death?.success) || 0,
      failures: Number(system.attributes?.death?.failure) || 0,
    },
    ac: system.attributes?.ac?.calc === 'flat' && system.attributes.ac.flat ? system.attributes.ac.flat : '',
  }

  patch.currency = { ...blankCurrency(), ...system.currency }

  const totalLevel = patch.classLevels?.reduce((sum, cl) => sum + (Number(cl.level) || 0), 0) || level1
  const profBonus = proficiencyBonusForLevel(totalLevel)
  const { weapons, equipment } = parseWeaponsAndEquipment(items, system, profBonus)
  if (weapons) patch.weapons = weapons
  if (equipment.length > 0) patch.equipment = equipment

  const languages = parseLanguages(system.traits)
  if (languages.length > 0) patch.proficienciesLanguages = languages

  const { featuresAndTraits, additionalFeaturesTraits } = parseFeatures(items)
  if (featuresAndTraits.length > 0) patch.featuresAndTraits = featuresAndTraits
  if (additionalFeaturesTraits) patch.additionalFeaturesTraits = additionalFeaturesTraits

  const spellcasting = parseSpellcasting(data, items)
  if (spellcasting) patch.spellcasting = spellcasting

  if (import.meta.env?.DEV) {
    console.debug('[foundryImport] resulting patch:', patch)
  }

  return patch
}
