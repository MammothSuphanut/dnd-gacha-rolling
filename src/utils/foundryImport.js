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

function stripHtml(raw) {
  if (!raw) return ''
  return raw
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
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

function parseStats(abilities) {
  if (!abilities) return null
  const stats = {}
  let any = false
  for (const key of ABILITY_KEYS) {
    const val = abilities[key]?.value
    if (val != null) any = true
    stats[key] = Number(val) || 0
  }
  return any ? stats : null
}

function parseSavingThrows(abilities) {
  const savingThrows = blankSavingThrows()
  for (const key of ABILITY_KEYS) {
    savingThrows[key] = Number(abilities?.[key]?.proficient) > 0
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
  const equipment = equipmentItems.map((it) => ({
    name: it.name || '',
    qty: Math.max(1, Number(it.system?.quantity) || 1),
  }))

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
  const cantrips = spellItems
    .filter((s) => Number(s.system?.level) === 0)
    .map((s) => ({ name: s.name || '' }))

  const levels = {}
  for (let lvl = 1; lvl <= 9; lvl++) {
    const spells = spellItems
      .filter((s) => Number(s.system?.level) === lvl && Number(s.system?.prepared) >= 1)
      .map((s) => ({ name: s.name || '', prepared: true }))
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
