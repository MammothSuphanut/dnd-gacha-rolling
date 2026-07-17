import { PDFDocument } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import pdfTemplateUrl from '../data/5E_CharacterSheet_Fillable.pdf?url'
import thaiFontUrl from '../assets/NotoSansThai.ttf?url'
import {
  SKILLS,
  abilityMod,
  formatMod,
  normalizeSkillState,
  passivePerception,
  proficiencyBonus,
  savingThrowBonus,
  skillBonus,
} from './dnd5e'

export const EXPORT_SECTIONS = [
  { key: 'identity', label: 'ข้อมูลตัวตน', hint: 'ชื่อ, ผู้เล่น, เผ่าพันธุ์, คลาส, ภูมิหลัง, alignment' },
  { key: 'appearance', label: 'ลักษณะภายนอก', hint: 'อายุ, ส่วนสูง, น้ำหนัก, ตา, ผม, ผิว' },
  { key: 'stats', label: 'ค่าพลังและทักษะ', hint: 'STR-CHA, saving throws, skills' },
  { key: 'combat', label: 'การต่อสู้', hint: 'AC, HP, Speed, Death Saves, อาวุธ' },
  { key: 'equipment', label: 'อุปกรณ์และทรัพย์สิน', hint: 'เงินตรา, equipment, proficiencies & languages' },
  { key: 'personality', label: 'บุคลิกภาพ', hint: 'Ideals, Bonds, Flaws, Personality Traits' },
  { key: 'backstory', label: 'ประวัติและพันธมิตร', hint: 'Backstory, Allies, Faction, Treasure' },
  { key: 'spells', label: 'เวทมนตร์ (Spells)', hint: 'Spellcasting Class, Ability, Save DC, Attack Bonus, Cantrips & Spells 1-9' },
  { key: 'image', label: 'รูปตัวละคร', hint: 'ใส่รูปหลักของตัวละครลงในชีท' },
]

const SKILL_CHECKBOX = {
  acrobatics: 'Check Box 23',
  animal: 'Check Box 24',
  arcana: 'Check Box 25',
  athletics: 'Check Box 26',
  deception: 'Check Box 27',
  history: 'Check Box 28',
  insight: 'Check Box 29',
  intimidation: 'Check Box 30',
  investigation: 'Check Box 31',
  medicine: 'Check Box 32',
  nature: 'Check Box 33',
  perception: 'Check Box 34',
  performance: 'Check Box 35',
  persuasion: 'Check Box 36',
  religion: 'Check Box 37',
  sleightOfHand: 'Check Box 38',
  stealth: 'Check Box 39',
  survival: 'Check Box 40',
}

const SKILL_TEXT_FIELD = {
  acrobatics: 'Acrobatics',
  animal: 'Animal',
  arcana: 'Arcana',
  athletics: 'Athletics',
  deception: 'Deception',
  history: 'History',
  insight: 'Insight',
  intimidation: 'Intimidation',
  investigation: 'Investigation',
  medicine: 'Medicine',
  nature: 'Nature',
  perception: 'Perception',
  performance: 'Performance',
  persuasion: 'Persuasion',
  religion: 'Religion',
  sleightOfHand: 'SleightofHand',
  stealth: 'Stealth',
  survival: 'Survival',
}

const SAVE_CHECKBOX = {
  str: 'Check Box 11',
  dex: 'Check Box 18',
  con: 'Check Box 19',
  int: 'Check Box 20',
  wis: 'Check Box 21',
  cha: 'Check Box 22',
}

const SAVE_TEXT_FIELD = {
  str: 'ST Strength',
  dex: 'ST Dexterity',
  con: 'ST Constitution',
  int: 'ST Intelligence',
  wis: 'ST Wisdom',
  cha: 'ST Charisma',
}

const DEATH_SAVE_SUCCESS_BOXES = ['Check Box 12', 'Check Box 13', 'Check Box 14']
const DEATH_SAVE_FAILURE_BOXES = ['Check Box 15', 'Check Box 16', 'Check Box 17']

function classSummary(character) {
  return (character.classLevels ?? [])
    .filter((cl) => cl.className)
    .map((cl) => `${cl.className}${cl.subclassName ? ` (${cl.subclassName})` : ''} ${cl.level}`)
    .join(' / ')
}

function totalLevel(character) {
  return (character.classLevels ?? []).reduce((sum, cl) => sum + (Number(cl.level) || 0), 0)
}

function buildFieldMap(form) {
  const map = new Map()
  for (const field of form.getFields()) {
    map.set(field.getName().trim(), field)
  }
  return map
}

function setText(map, name, value) {
  const field = map.get(name)
  if (!field || value == null || value === '') return
  try {
    field.setText(String(value))
  } catch {
    // field may not accept text (wrong type) - skip silently
  }
}

function setCheck(map, name, checked) {
  const field = map.get(name)
  if (!field) return
  try {
    if (checked) field.check()
    else field.uncheck()
  } catch {
    // ignore
  }
}

function fillIdentity(map, character, ownerUsername) {
  setText(map, 'CharacterName', character.name)
  setText(map, 'CharacterName 2', character.name)
  setText(map, 'PlayerName', ownerUsername)
  setText(map, 'ClassLevel', classSummary(character))
  setText(map, 'Background', character.background)
  setText(map, 'Race', character.species)
  setText(map, 'Alignment', character.alignment)
  setText(map, 'XP', character.combat?.xp)
}

function fillAppearance(map, character) {
  setText(map, 'Age', character.age)
  setText(map, 'Height', character.height)
  setText(map, 'Weight', character.weight)
  setText(map, 'Eyes', character.eyes)
  setText(map, 'Hair', character.hair)
  setText(map, 'Skin', character.skin)
}

function fillStats(map, character) {
  const level = totalLevel(character)
  const profBonus = proficiencyBonus(level)
  setText(map, 'ProfBonus', formatMod(profBonus))
  setText(map, 'STR', character.stats?.str)
  setText(map, 'DEX', character.stats?.dex)
  setText(map, 'CON', character.stats?.con)
  setText(map, 'INT', character.stats?.int)
  setText(map, 'WIS', character.stats?.wis)
  setText(map, 'CHA', character.stats?.cha)
  setText(map, 'STRmod', formatMod(abilityMod(character.stats?.str)))
  setText(map, 'DEXmod', formatMod(abilityMod(character.stats?.dex)))
  setText(map, 'CONmod', formatMod(abilityMod(character.stats?.con)))
  setText(map, 'INTmod', formatMod(abilityMod(character.stats?.int)))
  setText(map, 'WISmod', formatMod(abilityMod(character.stats?.wis)))
  setText(map, 'CHamod', formatMod(abilityMod(character.stats?.cha)))
  setText(map, 'Initiative', formatMod(abilityMod(character.stats?.dex)))
  setText(map, 'Passive', passivePerception(character, profBonus))

  for (const key of Object.keys(SAVE_CHECKBOX)) {
    setCheck(map, SAVE_CHECKBOX[key], !!character.savingThrows?.[key])
    setText(map, SAVE_TEXT_FIELD[key], formatMod(savingThrowBonus(character, key, profBonus)))
  }

  for (const skill of SKILLS) {
    const { prof, expertise } = normalizeSkillState(character.skills?.[skill.key])
    setCheck(map, SKILL_CHECKBOX[skill.key], prof || expertise)
    const bonusText = formatMod(skillBonus(character, skill, profBonus))
    setText(map, SKILL_TEXT_FIELD[skill.key], expertise ? `${bonusText} (E)` : bonusText)
  }
}

function fillCombat(map, character, excludeVolatile) {
  const level = totalLevel(character)
  setText(map, 'AC', character.combat?.ac)
  setText(map, 'Speed', character.combat?.speed)
  setText(map, 'HD', character.combat?.hitDice)
  setText(map, 'HDTotal', level || '')
  setText(map, 'HPMax', character.combat?.hp?.max)
  if (!excludeVolatile) {
      setText(map, 'HPCurrent', character.combat?.hp?.current)
      setText(map, 'HPTemp', character.combat?.hp?.temp)
      setText(map, 'Inspiration', character.combat?.inspiration ? 'X' : '')
  }

  const successes = character.combat?.deathSaves?.successes ?? 0
  const failures = character.combat?.deathSaves?.failures ?? 0
  DEATH_SAVE_SUCCESS_BOXES.forEach((name, i) => setCheck(map, name, i < successes))
  DEATH_SAVE_FAILURE_BOXES.forEach((name, i) => setCheck(map, name, i < failures))

  const weapons = character.weapons ?? []
  const weaponFieldNames = [
    ['Wpn Name', 'Wpn1 AtkBonus', 'Wpn1 Damage'],
    ['Wpn Name 2', 'Wpn2 AtkBonus', 'Wpn2 Damage'],
    ['Wpn Name 3', 'Wpn3 AtkBonus', 'Wpn3 Damage'],
  ]
  weaponFieldNames.forEach(([nameField, atkField, dmgField], i) => {
    const w = weapons[i]
    if (!w) return
    setText(map, nameField, w.name)
    setText(map, atkField, w.bonusOrDC ?? w.atkBonus)
    const damageText = (w.damages ?? [])
      .filter((d) => d.amount || d.type)
      .map((d) => [d.amount, d.type].filter(Boolean).join(' '))
      .join(' / ')
    setText(map, dmgField, damageText || w.damage)
  })
  setText(map, 'AttacksSpellcasting', character.attacksSpellcasting)
}

function joinItems(items) {
  return (items ?? []).filter((it) => it && it.trim()).map((it) => `• ${it.trim()}`).join('\n')
}

function joinFeatures(items) {
  return (items ?? [])
    .filter((it) => it.name?.trim() || it.description?.trim())
    .map((it) => (it.description?.trim() ? `• ${it.name.trim()}: ${it.description.trim()}` : `• ${it.name.trim()}`))
    .join('\n')
}

function fillEquipment(map, character, excludeVolatile) {
  if (!excludeVolatile) {
      setText(map, 'CP', character.currency?.cp)
      setText(map, 'SP', character.currency?.sp)
      setText(map, 'EP', character.currency?.ep)
      setText(map, 'GP', character.currency?.gp)
      setText(map, 'PP', character.currency?.pp)
  }
  setText(map, 'Equipment', joinItems(character.equipment))
  setText(map, 'ProficienciesLang', joinItems(character.proficienciesLanguages))
  setText(map, 'Features and Traits', joinFeatures(character.featuresAndTraits))
}

function fillPersonality(map, character) {
  setText(map, 'PersonalityTraits', character.personalityTraits)
  setText(map, 'Ideals', character.ideals)
  setText(map, 'Bonds', character.bonds)
  setText(map, 'Flaws', character.flaws)
}

function fillBackstory(map, character) {
  setText(map, 'Backstory', character.biography)
  setText(map, 'Allies', character.alliesOrganizations)
  setText(map, 'FactionName', character.factionName)
  setText(map, 'Treasure', character.treasure)
  setText(map, 'Feat+Traits', character.additionalFeaturesTraits)
}

function fillSpells(map, character, excludeVolatile) {
  const sp = character.spellcasting
  if (!sp) return

  // Metadata
  setText(map, 'Spellcasting Class 2', sp.spellcastingClass)
  setText(map, 'SpellcastingAbility 2', sp.spellcastingAbility)
  setText(map, 'SpellSaveDC  2', sp.spellSaveDC)
  setText(map, 'SpellAtkBonus 2', sp.spellAttackBonus)

  // Cantrips
  const cantripFields = [
    'Spells 1014', 'Spells 1016', 'Spells 1017', 'Spells 1018',
    'Spells 1019', 'Spells 1020', 'Spells 1021', 'Spells 1022'
  ]
  cantripFields.forEach((name, i) => {
    setText(map, name, sp.cantrips?.[i]?.name)
  })

  // Level 1
  if (!excludeVolatile) {
    setText(map, 'SlotsTotal 19', sp.levels?.[1]?.slotsTotal)
    setText(map, 'SlotsRemaining 19', sp.levels?.[1]?.slotsRemaining)
  }
  const lvl1Fields = [
    ['Spells 1015', 'Check Box 251'],
    ['Spells 1023', 'Check Box 309'],
    ['Spells 1024', 'Check Box 3010'],
    ['Spells 1025', 'Check Box 3011'],
    ['Spells 1026', 'Check Box 3012'],
    ['Spells 1027', 'Check Box 3013'],
    ['Spells 1028', 'Check Box 3014'],
    ['Spells 1029', 'Check Box 3015'],
    ['Spells 1030', 'Check Box 3016'],
    ['Spells 1031', 'Check Box 3017'],
    ['Spells 1032', 'Check Box 3018'],
    ['Spells 1033', 'Check Box 3019']
  ]
  lvl1Fields.forEach(([nameField, checkField], i) => {
    const s = sp.levels?.[1]?.spells?.[i]
    setText(map, nameField, s?.name)
    setCheck(map, checkField, !!s?.prepared)
  })

  // Level 2
  if (!excludeVolatile) {
    setText(map, 'SlotsTotal 20', sp.levels?.[2]?.slotsTotal)
    setText(map, 'SlotsRemaining 20', sp.levels?.[2]?.slotsRemaining)
  }
  const lvl2Fields = [
    ['Spells 1046', 'Check Box 313'],
    ['Spells 1034', 'Check Box 310'],
    ['Spells 1035', 'Check Box 3020'],
    ['Spells 1036', 'Check Box 3021'],
    ['Spells 1037', 'Check Box 3022'],
    ['Spells 1038', 'Check Box 3023'],
    ['Spells 1039', 'Check Box 3024'],
    ['Spells 1040', 'Check Box 3025'],
    ['Spells 1041', 'Check Box 3026'],
    ['Spells 1042', 'Check Box 3027'],
    ['Spells 1043', 'Check Box 3028'],
    ['Spells 1044', 'Check Box 3029'],
    ['Spells 1045', 'Check Box 3030']
  ]
  lvl2Fields.forEach(([nameField, checkField], i) => {
    const s = sp.levels?.[2]?.spells?.[i]
    setText(map, nameField, s?.name)
    setCheck(map, checkField, !!s?.prepared)
  })

  // Level 3
  if (!excludeVolatile) {
    setText(map, 'SlotsTotal 21', sp.levels?.[3]?.slotsTotal)
    setText(map, 'SlotsRemaining 21', sp.levels?.[3]?.slotsRemaining)
  }
  const lvl3Fields = [
    ['Spells 1048', 'Check Box 315'],
    ['Spells 1047', 'Check Box 314'],
    ['Spells 1049', 'Check Box 3031'],
    ['Spells 1050', 'Check Box 3032'],
    ['Spells 1051', 'Check Box 3033'],
    ['Spells 1052', 'Check Box 3034'],
    ['Spells 1053', 'Check Box 3035'],
    ['Spells 1054', 'Check Box 3036'],
    ['Spells 1055', 'Check Box 3037'],
    ['Spells 1056', 'Check Box 3038'],
    ['Spells 1057', 'Check Box 3039'],
    ['Spells 1058', 'Check Box 3040'],
    ['Spells 1059', 'Check Box 3041']
  ]
  lvl3Fields.forEach(([nameField, checkField], i) => {
    const s = sp.levels?.[3]?.spells?.[i]
    setText(map, nameField, s?.name)
    setCheck(map, checkField, !!s?.prepared)
  })

  // Level 4
  if (!excludeVolatile) {
    setText(map, 'SlotsTotal 22', sp.levels?.[4]?.slotsTotal)
    setText(map, 'SlotsRemaining 22', sp.levels?.[4]?.slotsRemaining)
  }
  const lvl4Fields = [
    ['Spells 1061', 'Check Box 317'],
    ['Spells 1060', 'Check Box 316'],
    ['Spells 1062', 'Check Box 3042'],
    ['Spells 1063', 'Check Box 3043'],
    ['Spells 1064', 'Check Box 3044'],
    ['Spells 1065', 'Check Box 3045'],
    ['Spells 1066', 'Check Box 3046'],
    ['Spells 1067', 'Check Box 3047'],
    ['Spells 1068', 'Check Box 3048'],
    ['Spells 1069', 'Check Box 3049'],
    ['Spells 1070', 'Check Box 3050'],
    ['Spells 1071', 'Check Box 3051'],
    ['Spells 1072', 'Check Box 3052']
  ]
  lvl4Fields.forEach(([nameField, checkField], i) => {
    const s = sp.levels?.[4]?.spells?.[i]
    setText(map, nameField, s?.name)
    setCheck(map, checkField, !!s?.prepared)
  })

  // Level 5
  if (!excludeVolatile) {
    setText(map, 'SlotsTotal 23', sp.levels?.[5]?.slotsTotal)
    setText(map, 'SlotsRemaining 23', sp.levels?.[5]?.slotsRemaining)
  }
  const lvl5Fields = [
    ['Spells 1074', 'Check Box 319'],
    ['Spells 1073', 'Check Box 318'],
    ['Spells 1075', 'Check Box 3053'],
    ['Spells 1076', 'Check Box 3054'],
    ['Spells 1077', 'Check Box 3055'],
    ['Spells 1078', 'Check Box 3056'],
    ['Spells 1079', 'Check Box 3057'],
    ['Spells 1080', 'Check Box 3058'],
    ['Spells 1081', 'Check Box 3059']
  ]
  lvl5Fields.forEach(([nameField, checkField], i) => {
    const s = sp.levels?.[5]?.spells?.[i]
    setText(map, nameField, s?.name)
    setCheck(map, checkField, !!s?.prepared)
  })

  // Level 6
  if (!excludeVolatile) {
    setText(map, 'SlotsTotal 24', sp.levels?.[6]?.slotsTotal)
    setText(map, 'SlotsRemaining 24', sp.levels?.[6]?.slotsRemaining)
  }
  const lvl6Fields = [
    ['Spells 1083', 'Check Box 321'],
    ['Spells 1082', 'Check Box 320'],
    ['Spells 1084', 'Check Box 3060'],
    ['Spells 1085', 'Check Box 3061'],
    ['Spells 1086', 'Check Box 3062'],
    ['Spells 1087', 'Check Box 3063'],
    ['Spells 1088', 'Check Box 3064'],
    ['Spells 1089', 'Check Box 3065'],
    ['Spells 1090', 'Check Box 3066']
  ]
  lvl6Fields.forEach(([nameField, checkField], i) => {
    const s = sp.levels?.[6]?.spells?.[i]
    setText(map, nameField, s?.name)
    setCheck(map, checkField, !!s?.prepared)
  })

  // Level 7
  if (!excludeVolatile) {
    setText(map, 'SlotsTotal 25', sp.levels?.[7]?.slotsTotal)
    setText(map, 'SlotsRemaining 25', sp.levels?.[7]?.slotsRemaining)
  }
  const lvl7Fields = [
    ['Spells 1092', 'Check Box 323'],
    ['Spells 1091', 'Check Box 322'],
    ['Spells 1093', 'Check Box 3067'],
    ['Spells 1094', 'Check Box 3068'],
    ['Spells 1095', 'Check Box 3069'],
    ['Spells 1096', 'Check Box 3070'],
    ['Spells 1097', 'Check Box 3071'],
    ['Spells 1098', 'Check Box 3072'],
    ['Spells 1099', 'Check Box 3073']
  ]
  lvl7Fields.forEach(([nameField, checkField], i) => {
    const s = sp.levels?.[7]?.spells?.[i]
    setText(map, nameField, s?.name)
    setCheck(map, checkField, !!s?.prepared)
  })

  // Level 8
  if (!excludeVolatile) {
    setText(map, 'SlotsTotal 26', sp.levels?.[8]?.slotsTotal)
    setText(map, 'SlotsRemaining 26', sp.levels?.[8]?.slotsRemaining)
  }
  const lvl8Fields = [
    ['Spells 10101', 'Check Box 325'],
    ['Spells 10100', 'Check Box 324'],
    ['Spells 10102', 'Check Box 3074'],
    ['Spells 10103', 'Check Box 3075'],
    ['Spells 10104', 'Check Box 3076'],
    ['Spells 10105', 'Check Box 3077'],
    ['Spells 10106', 'Check Box 3078']
  ]
  lvl8Fields.forEach(([nameField, checkField], i) => {
    const s = sp.levels?.[8]?.spells?.[i]
    setText(map, nameField, s?.name)
    setCheck(map, checkField, !!s?.prepared)
  })

  // Level 9
  if (!excludeVolatile) {
    setText(map, 'SlotsTotal 27', sp.levels?.[9]?.slotsTotal)
    setText(map, 'SlotsRemaining 27', sp.levels?.[9]?.slotsRemaining)
  }
  const lvl9Fields = [
    ['Spells 10108', 'Check Box 327'],
    ['Spells 10107', 'Check Box 326'],
    ['Spells 10109', 'Check Box 3079'],
    ['Spells 101010', 'Check Box 3080'],
    ['Spells 101011', 'Check Box 3081'],
    ['Spells 101012', 'Check Box 3082'],
    ['Spells 101013', 'Check Box 3083']
  ]
  lvl9Fields.forEach(([nameField, checkField], i) => {
    const s = sp.levels?.[9]?.spells?.[i]
    setText(map, nameField, s?.name)
    setCheck(map, checkField, !!s?.prepared)
  })
}


async function fillImage(map, imageDataUrl, pdfDoc) {
  const field = map.get('CHARACTER IMAGE')
  if (!field || !imageDataUrl) return
  try {
    const isPng = imageDataUrl.startsWith('data:image/png')
    const image = isPng ? await pdfDoc.embedPng(imageDataUrl) : await pdfDoc.embedJpg(imageDataUrl)
    field.setImage(image)
  } catch {
    // unsupported image format or field type - skip
  }
}

// sections: Set of EXPORT_SECTIONS keys to include
export async function buildCharacterPdf(character, { ownerUsername, sections, imageDataUrl, excludeVolatile } = {}) {
  const [templateBytes, thaiFontBytes] = await Promise.all([
    fetch(pdfTemplateUrl).then((res) => res.arrayBuffer()),
    fetch(thaiFontUrl).then((res) => res.arrayBuffer()),
  ])
  const pdfDoc = await PDFDocument.load(templateBytes)
  pdfDoc.registerFontkit(fontkit)
  // The template's fields default to Helvetica, which can't render Thai glyphs;
  // embed a Thai-capable font and use it for every field's appearance instead.
  const thaiFont = await pdfDoc.embedFont(thaiFontBytes, { subset: true })
  const form = pdfDoc.getForm()
  const map = buildFieldMap(form)

  const include = (key) => !sections || sections.has(key)

  if (include('identity')) fillIdentity(map, character, ownerUsername)
  if (include('appearance')) fillAppearance(map, character)
  if (include('stats')) fillStats(map, character)
  if (include('combat')) fillCombat(map, character, excludeVolatile)
  if (include('equipment')) fillEquipment(map, character, excludeVolatile)
  if (include('personality')) fillPersonality(map, character)
  if (include('backstory')) fillBackstory(map, character)
  if (include('spells')) fillSpells(map, character, excludeVolatile)
  if (include('image')) await fillImage(map, imageDataUrl, pdfDoc)

  form.updateFieldAppearances(thaiFont)
  return pdfDoc.save()
}

export function downloadPdfBytes(bytes, filename) {
  const blob = new Blob([bytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
