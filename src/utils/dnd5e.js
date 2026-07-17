export const ABILITY_KEYS = ['str', 'dex', 'con', 'int', 'wis', 'cha']

export const DND_LANGUAGES = [
  'Common',
  'Dwarvish',
  'Elvish',
  'Giant',
  'Gnomish',
  'Goblin',
  'Halfling',
  'Orc',
  'Abyssal',
  'Celestial',
  'Draconic',
  'Deep Speech',
  'Infernal',
  'Primordial',
  'Sylvan',
  'Undercommon',
]

export const SKILLS = [
  { key: 'acrobatics', label: 'Acrobatics', ability: 'dex' },
  { key: 'animal', label: 'Animal Handling', ability: 'wis' },
  { key: 'arcana', label: 'Arcana', ability: 'int' },
  { key: 'athletics', label: 'Athletics', ability: 'str' },
  { key: 'deception', label: 'Deception', ability: 'cha' },
  { key: 'history', label: 'History', ability: 'int' },
  { key: 'insight', label: 'Insight', ability: 'wis' },
  { key: 'intimidation', label: 'Intimidation', ability: 'cha' },
  { key: 'investigation', label: 'Investigation', ability: 'int' },
  { key: 'medicine', label: 'Medicine', ability: 'wis' },
  { key: 'nature', label: 'Nature', ability: 'int' },
  { key: 'perception', label: 'Perception', ability: 'wis' },
  { key: 'performance', label: 'Performance', ability: 'cha' },
  { key: 'persuasion', label: 'Persuasion', ability: 'cha' },
  { key: 'religion', label: 'Religion', ability: 'int' },
  { key: 'sleightOfHand', label: 'Sleight of Hand', ability: 'dex' },
  { key: 'stealth', label: 'Stealth', ability: 'dex' },
  { key: 'survival', label: 'Survival', ability: 'wis' },
]

export const DAMAGE_TYPES = [
  'Acid',
  'Bludgeoning',
  'Cold',
  'Fire',
  'Force',
  'Lightning',
  'Necrotic',
  'Piercing',
  'Poison',
  'Psychic',
  'Radiant',
  'Slashing',
  'Thunder',
]

export function abilityMod(score) {
  const num = Number(score)
  if (!Number.isFinite(num)) return 0
  return Math.floor((num - 10) / 2)
}

export function proficiencyBonus(totalLevel) {
  const lvl = Number(totalLevel) || 1
  return Math.floor((Math.max(1, lvl) - 1) / 4) + 2
}

export function formatMod(mod) {
  return mod >= 0 ? `+${mod}` : `${mod}`
}

export function savingThrowBonus(character, abilityKey, profBonus) {
  const mod = abilityMod(character.stats?.[abilityKey])
  const proficient = !!character.savingThrows?.[abilityKey]
  return mod + (proficient ? profBonus : 0)
}

// Older saves stored proficiency as a plain boolean; expertise adds a second flag.
export function normalizeSkillState(value) {
  if (typeof value === 'boolean') return { prof: value, expertise: false }
  return { prof: !!value?.prof, expertise: !!value?.expertise }
}

export function skillBonus(character, skill, profBonus) {
  const mod = abilityMod(character.stats?.[skill.ability])
  const { prof, expertise } = normalizeSkillState(character.skills?.[skill.key])
  const multiplier = expertise ? 2 : prof ? 1 : 0
  return mod + profBonus * multiplier
}

export function passivePerception(character, profBonus) {
  const perceptionSkill = SKILLS.find((s) => s.key === 'perception')
  return 10 + skillBonus(character, perceptionSkill, profBonus)
}

export function blankCombat() {
  return {
    ac: '',
    speed: '',
    hitDice: '',
    inspiration: false,
    xp: '',
    hp: { max: '', current: '', temp: '' },
    deathSaves: { successes: 0, failures: 0 },
  }
}

export function blankSavingThrows() {
  return ABILITY_KEYS.reduce((acc, k) => ({ ...acc, [k]: false }), {})
}

export function blankSkills() {
  return SKILLS.reduce((acc, s) => ({ ...acc, [s.key]: { prof: false, expertise: false } }), {})
}

export function blankDamage() {
  return { amount: '', type: '' }
}

export function blankAction() {
  return { name: '', bonusOrDC: '', damages: [blankDamage()] }
}

// Older saves stored a single weapon row {name, atkBonus, damage}; split the
// free-text damage string (eg. "1d8 + 3 slashing / 1d4 fire") into per-type rows
// so existing characters land in the new Action editor already filled in.
function splitLegacyDamage(str) {
  if (!str || typeof str !== 'string') return []
  return str
    .split(/\s*\/\s*|\s*,\s*/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const type = DAMAGE_TYPES.find((t) => new RegExp(`\\b${t}\\b`, 'i').test(part))
      if (type) {
        return { amount: part.replace(new RegExp(`\\b${type}\\b`, 'i'), '').trim(), type }
      }
      return { amount: part, type: '' }
    })
}

export function migrateLegacyAction(raw) {
  if (!raw) return blankAction()
  if (Array.isArray(raw.damages)) {
    const damages = raw.damages.map((d) => ({ amount: d.amount ?? '', type: d.type ?? '' }))
    return {
      name: raw.name ?? '',
      bonusOrDC: raw.bonusOrDC ?? '',
      damages: damages.length > 0 ? damages : [blankDamage()],
    }
  }
  const damages = splitLegacyDamage(raw.damage)
  return {
    name: raw.name ?? '',
    bonusOrDC: raw.atkBonus ?? '',
    damages: damages.length > 0 ? damages : [blankDamage()],
  }
}

export function blankCurrency() {
  return { cp: '', sp: '', ep: '', gp: '', pp: '' }
}

export function blankSpellcasting() {
  return {
    spellcastingClass: '',
    spellcastingAbility: '',
    spellSaveDC: '',
    spellAttackBonus: '',
    cantrips: Array.from({ length: 8 }, () => ({ name: '' })),
    levels: {
      1: { slotsTotal: '', slotsRemaining: '', spells: Array.from({ length: 12 }, () => ({ name: '', prepared: false })) },
      2: { slotsTotal: '', slotsRemaining: '', spells: Array.from({ length: 13 }, () => ({ name: '', prepared: false })) },
      3: { slotsTotal: '', slotsRemaining: '', spells: Array.from({ length: 13 }, () => ({ name: '', prepared: false })) },
      4: { slotsTotal: '', slotsRemaining: '', spells: Array.from({ length: 13 }, () => ({ name: '', prepared: false })) },
      5: { slotsTotal: '', slotsRemaining: '', spells: Array.from({ length: 9 }, () => ({ name: '', prepared: false })) },
      6: { slotsTotal: '', slotsRemaining: '', spells: Array.from({ length: 9 }, () => ({ name: '', prepared: false })) },
      7: { slotsTotal: '', slotsRemaining: '', spells: Array.from({ length: 9 }, () => ({ name: '', prepared: false })) },
      8: { slotsTotal: '', slotsRemaining: '', spells: Array.from({ length: 7 }, () => ({ name: '', prepared: false })) },
      9: { slotsTotal: '', slotsRemaining: '', spells: Array.from({ length: 7 }, () => ({ name: '', prepared: false })) },
    }
  }
}

export function normalizeSpellcasting(raw) {
  const blank = blankSpellcasting()
  if (!raw) return blank

  const cantrips = Array.from({ length: 8 }, (_, i) => ({
    name: raw.cantrips?.[i]?.name ?? ''
  }))

  const levels = {}
  const rowCounts = {
    1: 12, 2: 13, 3: 13, 4: 13, 5: 9, 6: 9, 7: 9, 8: 7, 9: 7
  }

  for (let lvl = 1; lvl <= 9; lvl++) {
    const rawLvl = raw.levels?.[lvl] || {}
    const count = rowCounts[lvl]
    levels[lvl] = {
      slotsTotal: rawLvl.slotsTotal ?? '',
      slotsRemaining: rawLvl.slotsRemaining ?? '',
      spells: Array.from({ length: count }, (_, i) => ({
        name: rawLvl.spells?.[i]?.name ?? '',
        prepared: !!rawLvl.spells?.[i]?.prepared
      }))
    }
  }

  return {
    spellcastingClass: raw.spellcastingClass ?? '',
    spellcastingAbility: raw.spellcastingAbility ?? '',
    spellSaveDC: raw.spellSaveDC ?? '',
    spellAttackBonus: raw.spellAttackBonus ?? '',
    cantrips,
    levels
  }
}

