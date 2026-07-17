// Homebrew starting-gold calculator data.
// เงินเริ่มต้น = (เงินพื้นฐานคลาส + โบนัส Background) × ตัวคูณเลเวล

export const CLASS_TIERS = {
  heavy: { label: 'Heavy', gold: 150, hint: 'ใส่เกราะหนักได้/อาวุธ martial' },
  medium: { label: 'Medium', gold: 100, hint: 'เกราะเบา-กลาง + อาวุธ martial/พิเศษ' },
  light: { label: 'Light', gold: 75, hint: 'เกราะเบาเท่านั้น หรือ caster กึ่งของ' },
  minimal: { label: 'Minimal', gold: 50, hint: 'ไม่พึ่งเกราะ/อาวุธเลย' },
}

export const CLASS_TIER_ORDER = ['heavy', 'medium', 'light', 'minimal']

// name -> tier key. Anything not listed falls back to 'medium'.
export const CLASS_TIER_MAP = {
  Barbarian: 'heavy',
  Fighter: 'heavy',
  Paladin: 'heavy',
  Craftsman: 'heavy',
  Warden: 'heavy',

  Captain: 'medium',
  Cleric: 'medium',
  Gunslinger: 'medium',
  Investigator: 'medium',
  Martyr: 'medium',
  'Monster Hunter': 'medium',
  Ranger: 'medium',
  Rogue: 'medium',
  Tactician: 'medium',
  Vagabond: 'medium',

  Alchemist: 'light',
  Artificer: 'light',
  Bard: 'light',
  Channeler: 'light',
  Dancer: 'light',
  Druid: 'light',
  Warlock: 'light',

  Monk: 'minimal',
  Necromancer: 'minimal',
  Sorcerer: 'minimal',
  Warmage: 'minimal',
  Witch: 'minimal',
  Wizard: 'minimal',
}

export const CLASS_NAMES = Object.keys(CLASS_TIER_MAP).sort()

export const BACKGROUND_TIERS = {
  poor: { label: 'จน/เร่ร่อน', gold: 5 },
  ordinary: { label: 'ธรรมดา', gold: 15 },
  skilled: { label: 'มีฝีมือ/มีสายสัมพันธ์', gold: 25 },
  rich: { label: 'รวย', gold: 50 },
}

export const BACKGROUND_TIER_ORDER = ['poor', 'ordinary', 'skilled', 'rich']

// name -> tier key. Anything not listed falls back to 'ordinary'.
export const BACKGROUND_TIER_MAP = {
  Acolyte: 'ordinary',
  Artisan: 'skilled',
  Charlatan: 'skilled',
  Criminal: 'ordinary',
  Entertainer: 'skilled',
  Farmer: 'poor',
  Guard: 'ordinary',
  Guide: 'ordinary',
  Hermit: 'poor',
  Merchant: 'skilled',
  Noble: 'rich',
  Sage: 'skilled',
  Sailor: 'ordinary',
  Scribe: 'skilled',
  Soldier: 'ordinary',
  Wayfarer: 'poor',

  Inquisitive: 'skilled',
  'House Vadalis Heir': 'rich',
  'House Thuranni Heir': 'rich',
  'House Tharashk Heir': 'rich',
  'House Sivis Heir': 'rich',
  'House Phianlan Heir': 'rich',
  'House Orien Heir': 'rich',
  'House Medani Heir': 'rich',
  'House Lyrandar Heir': 'rich',
  'House Kundarak Heir': 'rich',
  'House Jorasco Heir': 'rich',
  'House Ghallanda Heir': 'rich',
  'House Deneith Heir': 'rich',
  'House Cannith Heir': 'rich',
  'House Agent': 'skilled',
  Archaeologist: 'skilled',
  'Aberrant Heir': 'rich',
  'Zhentarim Mercenary': 'ordinary',
  'Spellfire Initiate': 'skilled',
  'Shadowmasters Exile': 'ordinary',
  'Rashemi Wanderer': 'poor',
  'Purple Dragon Squire': 'ordinary',
  Mythalkeeper: 'skilled',
  'Mulhorandi Tomb Raider': 'ordinary',
  'Moonwell Pilgrim': 'poor',
  "Lords' Alliance Vassal": 'skilled',
  'Knight of the Gauntlet': 'rich',
  'Ice Fisher': 'poor',
  Harper: 'skilled',
  'Genie Touched': 'skilled',
  'Flaming Fist Mercenary': 'ordinary',
  'Emerald Enclave Caretaker': 'ordinary',
  'Dragon Cultist': 'ordinary',
  'Dead Magic Dweller': 'poor',
  'Chondathan Freebooter': 'ordinary',

  'Syndicate Smuggler': 'ordinary',
  'Scion of the Thaumaturge': 'skilled',
  'Released Thrall': 'poor',
  Prisoner: 'poor',
  'Pox-Touched': 'poor',
  'Pit Fighter': 'poor',
  Pioneer: 'ordinary',
  Physician: 'skilled',
  'One of the Taken': 'poor',
  'Lapsed Inquisitor': 'ordinary',
  'Inquisitor of the Faithful': 'skilled',
  Heretic: 'ordinary',
  'Free Swords Mercenary': 'ordinary',
  'Fey-Blessed': 'skilled',
  Exterminator: 'ordinary',
  Explorer: 'ordinary',
  Executioner: 'ordinary',
  Envoy: 'skilled',
  'Disgraced Raider': 'poor',
  'Courtier (Grim)': 'rich',
  'Chapter Knight': 'rich',
  Beggar: 'poor',
  'Beast Hunter': 'ordinary',
  Antiquarian: 'skilled',
  'Agent of Augustine': 'skilled',
  'Vampire Survivor': 'poor',
  'Vampire Devotee': 'ordinary',
  Carouser: 'poor',
  'Haunted One': 'poor',
  'Spirit Medium': 'ordinary',
  'Mist Wanderer': 'poor',
  Investigator: 'skilled',

  'Shadowmoor Expert': 'skilled',
  'Lorwyn Expert': 'skilled',
}

export const BACKGROUND_NAMES = Object.keys(BACKGROUND_TIER_MAP).sort()

// [minLevel, maxLevel, multiplier]
export const LEVEL_MULTIPLIER_BRACKETS = [
  [1, 1, 1],
  [2, 4, 5],
  [5, 10, 15],
  [11, 16, 40],
  [17, 20, 100],
]

export function getLevelMultiplier(level) {
  const lvl = Number(level) || 1
  const bracket = LEVEL_MULTIPLIER_BRACKETS.find(([min, max]) => lvl >= min && lvl <= max)
  return bracket ? bracket[2] : 1
}

export function suggestClassTier(className) {
  return CLASS_TIER_MAP[className] ?? 'medium'
}

export function suggestBackgroundTier(backgroundName) {
  return BACKGROUND_TIER_MAP[backgroundName] ?? 'ordinary'
}

// Multiclass: the character has proficiencies from every class taken, so the
// best-equipped (highest base gold) class among them sets the class gold.
export function highestClassTier(tierKeys) {
  for (const key of CLASS_TIER_ORDER) {
    if (tierKeys.includes(key)) return key
  }
  return 'medium'
}

// Weighted random multiplier table for the "แบบสุ่ม" roll (percentages sum to 100).
export const RANDOM_MULTIPLIER_TABLE = [
  { multiplier: 0, weight: 0.1 },
  { multiplier: 0.5, weight: 5 },
  { multiplier: 0.75, weight: 10 },
  { multiplier: 1, weight: 50 },
  { multiplier: 1.5, weight: 20 },
  { multiplier: 2, weight: 8 },
  { multiplier: 3, weight: 3.5 },
  { multiplier: 5, weight: 2.5 },
  { multiplier: 10, weight: 0.8 },
  { multiplier: 100, weight: 0.1 },
]

export function rollRandomMultiplier() {
  const total = RANDOM_MULTIPLIER_TABLE.reduce((sum, row) => sum + row.weight, 0)
  let rand = Math.random() * total
  for (const row of RANDOM_MULTIPLIER_TABLE) {
    rand -= row.weight
    if (rand <= 0) return row.multiplier
  }
  return RANDOM_MULTIPLIER_TABLE[RANDOM_MULTIPLIER_TABLE.length - 1].multiplier
}

export function calculateStartingGold({ classTier, backgroundTier, level }) {
  const classGold = CLASS_TIERS[classTier]?.gold ?? 0
  const bgGold = BACKGROUND_TIERS[backgroundTier]?.gold ?? 0
  const multiplier = getLevelMultiplier(level)
  const total = (classGold + bgGold) * multiplier
  return { classGold, bgGold, multiplier, total }
}
