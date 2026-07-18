import { PDFDocument } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import pdfTemplateUrl from '../data/character-sheet.pdf?url'
import thaiFontUrl from '../assets/NotoSansThai.ttf?url'
import {
  DND_LANGUAGES,
  SKILLS,
  abilityMod,
  formatMod,
  normalizeSkillState,
  passivePerception,
  proficiencyBonus,
  savingThrowBonus,
  skillBonus,
} from './dnd5e'

// Each entry fills exactly one (or a tightly related handful of) field(s) on the PDF,
// grouped only for the export modal's UI — the grouping has no bearing on the template.
export const EXPORT_SECTIONS = [
  // ข้อมูลตัวตน
  { key: 'name', group: 'ข้อมูลตัวตน', label: 'ชื่อตัวละคร', hint: 'Character Name' },
  { key: 'background', group: 'ข้อมูลตัวตน', label: 'ภูมิหลัง (Background)', hint: 'Background' },
  { key: 'species', group: 'ข้อมูลตัวตน', label: 'เผ่าพันธุ์ (Species)', hint: 'Species' },
  { key: 'class', group: 'ข้อมูลตัวตน', label: 'คลาส (Class)', hint: 'Class' },
  { key: 'subclass', group: 'ข้อมูลตัวตน', label: 'ซับคลาส (Subclass)', hint: 'Subclass' },
  { key: 'level', group: 'ข้อมูลตัวตน', label: 'เลเวล', hint: 'Level', defaultOn: false },
  { key: 'xp', group: 'ข้อมูลตัวตน', label: 'แต้มประสบการณ์ (XP)', hint: 'XP', defaultOn: false },
  { key: 'alignment', group: 'ข้อมูลตัวตน', label: 'แนวคิด (Alignment)', hint: 'Alignment' },
  { key: 'size', group: 'ข้อมูลตัวตน', label: 'ขนาดตัว (Size)', hint: 'Size' },

  // ลักษณะภายนอก (รวมลงช่อง Appearance ช่องเดียวในชีท)
  { key: 'age', group: 'ลักษณะภายนอก', label: 'อายุ', hint: 'รวมลงในช่อง Appearance' },
  { key: 'height', group: 'ลักษณะภายนอก', label: 'ส่วนสูง', hint: 'รวมลงในช่อง Appearance' },
  { key: 'weight', group: 'ลักษณะภายนอก', label: 'น้ำหนัก', hint: 'รวมลงในช่อง Appearance' },
  { key: 'eyes', group: 'ลักษณะภายนอก', label: 'สีตา', hint: 'รวมลงในช่อง Appearance' },
  { key: 'hair', group: 'ลักษณะภายนอก', label: 'สีผม', hint: 'รวมลงในช่อง Appearance' },
  { key: 'skin', group: 'ลักษณะภายนอก', label: 'สีผิว', hint: 'รวมลงในช่อง Appearance' },

  // ค่าพลังและทักษะ
  { key: 'abilityScores', group: 'ค่าพลังและทักษะ', label: 'ค่าพลัง STR-CHA', hint: 'Score, Modifier, Proficiency Bonus', defaultOn: false },
  { key: 'savingThrows', group: 'ค่าพลังและทักษะ', label: 'Saving Throws', defaultOn: false },
  { key: 'skills', group: 'ค่าพลังและทักษะ', label: 'ทักษะ (Skills)', defaultOn: false },

  // การต่อสู้
  { key: 'ac', group: 'การต่อสู้', label: 'Armor Class', defaultOn: false },
  { key: 'hp', group: 'การต่อสู้', label: 'Hit Points', hint: 'Current, Temp, Max', defaultOn: false },
  { key: 'hitDice', group: 'การต่อสู้', label: 'Hit Dice', defaultOn: false },
  { key: 'deathSaves', group: 'การต่อสู้', label: 'Death Saves', defaultOn: false },
  { key: 'heroicInspiration', group: 'การต่อสู้', label: 'Heroic Inspiration', defaultOn: false },
  { key: 'combatMeta', group: 'การต่อสู้', label: 'Initiative / Speed / Passive Perception', defaultOn: false },
  { key: 'weapons', group: 'การต่อสู้', label: 'อาวุธและดาเมจ', hint: 'สูงสุด 6 รายการ', defaultOn: false },

  // อุปกรณ์และทรัพย์สิน
  { key: 'equipmentList', group: 'อุปกรณ์และทรัพย์สิน', label: 'รายการอุปกรณ์ (Equipment)', defaultOn: false },
  { key: 'treasure', group: 'อุปกรณ์และทรัพย์สิน', label: 'ทรัพย์สิน/ของมีค่า (Treasure)', hint: 'รวมลงในช่อง Equipment', defaultOn: false },
  { key: 'coins', group: 'อุปกรณ์และทรัพย์สิน', label: 'เงินตรา (CP/SP/EP/GP/PP)', defaultOn: false },
  { key: 'languages', group: 'อุปกรณ์และทรัพย์สิน', label: 'ภาษาและความชำนาญ (Proficiencies & Languages)', hint: 'แยกลงช่อง Languages และ Tools ให้อัตโนมัติ', defaultOn: false },

  // ความสามารถพิเศษ
  { key: 'classFeatures', group: 'ความสามารถพิเศษ', label: 'Class Features', defaultOn: false },
  { key: 'feats', group: 'ความสามารถพิเศษ', label: 'Feats / ความสามารถเสริม', defaultOn: false },

  // บุคลิกภาพและเรื่องราว (รวมลงช่อง Backstory & Personality ช่องเดียวในชีท)
  { key: 'personalityTraits', group: 'บุคลิกภาพและเรื่องราว', label: 'Personality Traits', hint: 'รวมลงในช่อง Backstory & Personality' },
  { key: 'ideals', group: 'บุคลิกภาพและเรื่องราว', label: 'Ideals', hint: 'รวมลงในช่อง Backstory & Personality' },
  { key: 'bonds', group: 'บุคลิกภาพและเรื่องราว', label: 'Bonds', hint: 'รวมลงในช่อง Backstory & Personality' },
  { key: 'flaws', group: 'บุคลิกภาพและเรื่องราว', label: 'Flaws', hint: 'รวมลงในช่อง Backstory & Personality' },
  { key: 'biography', group: 'บุคลิกภาพและเรื่องราว', label: 'ประวัติตัวละคร (Biography)', hint: 'รวมลงในช่อง Backstory & Personality' },
  { key: 'allies', group: 'บุคลิกภาพและเรื่องราว', label: 'พันธมิตร/องค์กร (Allies & Organizations)', hint: 'รวมลงในช่อง Backstory & Personality' },
  { key: 'faction', group: 'บุคลิกภาพและเรื่องราว', label: 'กลุ่ม/สังกัด (Faction)', hint: 'รวมลงในช่อง Backstory & Personality' },

  // เวทมนตร์
  { key: 'spellcastingInfo', group: 'เวทมนตร์', label: 'ข้อมูลการร่าย', hint: 'Spellcasting Ability, Modifier, Save DC, Attack Bonus', defaultOn: false },
  { key: 'spellSlots', group: 'เวทมนตร์', label: 'Spell Slots (Total/Expended)', defaultOn: false },
  { key: 'cantrips', group: 'เวทมนตร์', label: 'Cantrips', defaultOn: false },
  { key: 'preparedSpells', group: 'เวทมนตร์', label: 'Prepared Spells (เลเวล 1-9)', defaultOn: false },

  // อื่นๆ
  { key: 'image', group: 'อื่นๆ', label: 'รูปตัวละคร', hint: 'ใส่รูปหลักของตัวละครลงในชีท', defaultOn: false },
]

const SAVE_CHECKBOX = {
  str: 'Check Box37',
  dex: 'Check Box33',
  con: 'Check Box32',
  int: 'Check Box4',
  wis: 'Check Box21',
  cha: 'Check Box26',
}

const SAVE_TEXT_FIELD = {
  str: 'Text91',
  dex: 'Text87',
  con: 'Text86',
  int: 'Text69',
  wis: 'Text75',
  cha: 'Text81',
}

// key -> { checkbox, text }, matched against dnd5e.js's SKILLS list
const SKILL_FIELD = {
  athletics: { checkbox: 'Check Box38', text: 'Text92' },
  acrobatics: { checkbox: 'Check Box34', text: 'Text88' },
  sleightOfHand: { checkbox: 'Check Box35', text: 'Text89' },
  stealth: { checkbox: 'Check Box36', text: 'Text90' },
  arcana: { checkbox: 'Check Box16', text: 'Text70' },
  history: { checkbox: 'Check Box17', text: 'Text71' },
  investigation: { checkbox: 'Check Box19', text: 'Text72' },
  nature: { checkbox: 'Check Box20', text: 'Text73' },
  religion: { checkbox: 'Check Box18', text: 'Text74' },
  animal: { checkbox: 'Check Box22', text: 'Text76' },
  insight: { checkbox: 'Check Box23', text: 'Text77' },
  medicine: { checkbox: 'Check Box25', text: 'Text78' },
  perception: { checkbox: 'Check Box31', text: 'Text79' },
  survival: { checkbox: 'Check Box24', text: 'Text80' },
  deception: { checkbox: 'Check Box27', text: 'Text82' },
  intimidation: { checkbox: 'Check Box28', text: 'Text83' },
  performance: { checkbox: 'Check Box30', text: 'Text84' },
  persuasion: { checkbox: 'Check Box29', text: 'Text85' },
}

const DEATH_SAVE_SUCCESS_BOXES = ['Check Box5', 'Check Box6', 'Check Box7']
const DEATH_SAVE_FAILURE_BOXES = ['Check Box8', 'Check Box9', 'Check Box10']

const WEAPON_ROW_FIELDS = [
  ['Text30', 'Text31', 'Text32'],
  ['Text34', 'Text35', 'Text36'],
  ['Text38', 'Text39', 'Text40'],
  ['Text42', 'Text43', 'Text44'],
  ['Text46', 'Text47', 'Text48'],
  ['Text50', 'Text51', 'Text52'],
]

const SPELL_SLOT_TOTAL_FIELD = {
  1: 'Text112', 2: 'Text113', 3: 'Text114',
  4: 'Text117', 5: 'Text116', 6: 'Text115',
  7: 'Text118', 8: 'Text119', 9: 'Text120',
}

const SPELL_SLOT_EXPENDED_BOXES = {
  1: ['Check Box227', 'Check Box228', 'Check Box229', 'Check Box230'],
  2: ['Check Box231', 'Check Box232', 'Check Box233'],
  3: ['Check Box234', 'Check Box235', 'Check Box236'],
  4: ['Check Box237', 'Check Box238', 'Check Box239'],
  5: ['Check Box240', 'Check Box241', 'Check Box242'],
  6: ['Check Box243', 'Check Box244'],
  7: ['Check Box245', 'Check Box246'],
  8: ['Check Box247'],
  9: ['Check Box248'],
}

const PREPARED_SPELL_ROWS = 30 // Text105.N (level) / Text106.N (name), N = 0..29

const COIN_FIELD = { cp: 'Text226', sp: 'Text267', ep: 'Text268', gp: 'Text269', pp: 'Text270' }

// character.proficienciesLanguages is one flat list mixing languages and tool/other
// proficiencies (the editor doesn't tag entries by type) — split by name so the
// sheet's separate Languages and Tools boxes each get only what belongs there.
const DND_LANGUAGE_SET = new Set(DND_LANGUAGES.map((l) => l.toLowerCase()))

function classAndSubclassText(character) {
  const classLevels = (character.classLevels ?? []).filter((cl) => cl.className)
  const classText = classLevels.map((cl) => `${cl.className} ${cl.level}`).join(' / ')
  const subclassText = classLevels
    .filter((cl) => cl.subclassName)
    .map((cl) => cl.subclassName)
    .join(' / ')
  return { classText, subclassText }
}

function totalLevel(character) {
  return (character.classLevels ?? []).reduce((sum, cl) => sum + (Number(cl.level) || 0), 0)
}

function buildFieldMap(form) {
  const map = new Map()
  for (const field of form.getFields()) {
    // The template ships fixed font sizes that clip long values (e.g. "Medium",
    // "1d8+3 slashing"); auto-size (0) lets pdf-lib shrink text to fit instead.
    if (field.constructor.name === 'PDFTextField') {
      try {
        field.setFontSize(0)
      } catch {
        // ignore
      }
    }
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

function fillIdentity(map, character, include) {
  if (include('name')) {
    setText(map, 'Text1', character.name)
  }
  if (include('background')) setText(map, 'Text6', character.background)
  if (include('species')) setText(map, 'Text8', character.species)
  const { classText, subclassText } = classAndSubclassText(character)
  if (include('class')) setText(map, 'Text7', classText)
  if (include('subclass')) setText(map, 'Text9', subclassText)
  if (include('level')) setText(map, 'Text11', totalLevel(character) || '')
  if (include('xp')) setText(map, 'Text12', character.combat?.xp)
  if (include('alignment')) setText(map, 'Text100', character.alignment)
  if (include('size')) setText(map, 'Text28', character.size)
}

function fillAppearance(map, character, include) {
  const lines = []
  if (include('age') && character.age) lines.push(`อายุ: ${character.age}`)
  if (include('height') && character.height) lines.push(`ส่วนสูง: ${character.height}`)
  if (include('weight') && character.weight) lines.push(`น้ำหนัก: ${character.weight}`)
  if (include('eyes') && character.eyes) lines.push(`สีตา: ${character.eyes}`)
  if (include('hair') && character.hair) lines.push(`สีผม: ${character.hair}`)
  if (include('skin') && character.skin) lines.push(`สีผิว: ${character.skin}`)
  if (lines.length > 0) setText(map, 'Text96', lines.join('\n'))
}

const ABILITY_MOD_FIELD = { str: 'Text21', dex: 'Text22', con: 'Text24', int: 'Text20', wis: 'Text23', cha: 'Text25' }
const ABILITY_SCORE_FIELD = { str: 'Text64', dex: 'Text66', con: 'Text67', int: 'Text63', wis: 'Text65', cha: 'Text68' }

function fillAbilities(map, character, include) {
  const level = totalLevel(character)
  const profBonus = proficiencyBonus(level)

  if (include('abilityScores')) {
    setText(map, 'Text19', formatMod(profBonus))
    for (const key of Object.keys(ABILITY_MOD_FIELD)) {
      setText(map, ABILITY_SCORE_FIELD[key], character.stats?.[key])
      setText(map, ABILITY_MOD_FIELD[key], formatMod(abilityMod(character.stats?.[key])))
    }
  }

  if (include('savingThrows')) {
    for (const key of Object.keys(SAVE_CHECKBOX)) {
      setCheck(map, SAVE_CHECKBOX[key], !!character.savingThrows?.[key])
      setText(map, SAVE_TEXT_FIELD[key], formatMod(savingThrowBonus(character, key, profBonus)))
    }
  }

  if (include('skills')) {
    for (const skill of SKILLS) {
      const fields = SKILL_FIELD[skill.key]
      if (!fields) continue
      const { prof, expertise } = normalizeSkillState(character.skills?.[skill.key])
      setCheck(map, fields.checkbox, prof || expertise)
      const bonusText = formatMod(skillBonus(character, skill, profBonus))
      setText(map, fields.text, expertise ? `${bonusText} (E)` : bonusText)
    }
  }
}

function fillCombat(map, character, include, excludeVolatile) {
  if (include('ac')) setText(map, 'Text13', character.combat?.ac)

  if (include('combatMeta')) {
    setText(map, 'Text26', formatMod(abilityMod(character.stats?.dex)))
    setText(map, 'Text27', character.combat?.speed)
    const level = totalLevel(character)
    setText(map, 'Text29', passivePerception(character, proficiencyBonus(level)))
  }

  if (include('hp')) {
    setText(map, 'Text16', character.combat?.hp?.max)
    if (!excludeVolatile) {
      setText(map, 'Text14', character.combat?.hp?.current)
      setText(map, 'Text15', character.combat?.hp?.temp)
    }
  }

  if (include('hitDice')) {
    setText(map, 'Text17', totalLevel(character) || '')
  }

  if (include('heroicInspiration') && !excludeVolatile) {
    setCheck(map, 'Check Box11', !!character.combat?.inspiration)
  }

  if (include('deathSaves')) {
    const successes = character.combat?.deathSaves?.successes ?? 0
    const failures = character.combat?.deathSaves?.failures ?? 0
    DEATH_SAVE_SUCCESS_BOXES.forEach((name, i) => setCheck(map, name, i < successes))
    DEATH_SAVE_FAILURE_BOXES.forEach((name, i) => setCheck(map, name, i < failures))
  }

  if (include('weapons')) {
    const weapons = character.weapons ?? []
    WEAPON_ROW_FIELDS.forEach(([nameField, atkField, dmgField], i) => {
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
  }
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

function fillEquipment(map, character, include, excludeVolatile) {
  const equipmentLines = []
  if (include('equipmentList')) equipmentLines.push(...(character.equipment ?? []))
  if (include('treasure') && character.treasure) equipmentLines.push(character.treasure)
  if (equipmentLines.length > 0) setText(map, 'Text99', joinItems(equipmentLines))

  if (include('languages')) {
    const entries = character.proficienciesLanguages ?? []
    const languages = entries.filter((it) => DND_LANGUAGE_SET.has(it.trim().toLowerCase()))
    const otherProficiencies = entries.filter((it) => !DND_LANGUAGE_SET.has(it.trim().toLowerCase()))
    setText(map, 'Text98', joinItems(languages))
    setText(map, 'Text60', joinItems(otherProficiencies))
  }

  if (include('coins') && !excludeVolatile) {
    setText(map, COIN_FIELD.cp, character.currency?.cp)
    setText(map, COIN_FIELD.sp, character.currency?.sp)
    setText(map, COIN_FIELD.ep, character.currency?.ep)
    setText(map, COIN_FIELD.gp, character.currency?.gp)
    setText(map, COIN_FIELD.pp, character.currency?.pp)
  }
}

function fillFeatures(map, character, include) {
  if (include('classFeatures')) setText(map, 'Text54', joinFeatures(character.featuresAndTraits))
  if (include('feats')) setText(map, 'Text58', character.additionalFeaturesTraits)
}

function fillPersonality(map, character, include) {
  const sections = []
  if (include('personalityTraits') && character.personalityTraits) {
    sections.push(`Personality Traits:\n${character.personalityTraits}`)
  }
  if (include('ideals') && character.ideals) sections.push(`Ideals:\n${character.ideals}`)
  if (include('bonds') && character.bonds) sections.push(`Bonds:\n${character.bonds}`)
  if (include('flaws') && character.flaws) sections.push(`Flaws:\n${character.flaws}`)
  if (include('biography') && character.biography) sections.push(`Biography:\n${character.biography}`)
  if (include('allies') && character.alliesOrganizations) sections.push(`Allies & Organizations:\n${character.alliesOrganizations}`)
  if (include('faction') && character.factionName) sections.push(`Faction:\n${character.factionName}`)
  if (sections.length > 0) setText(map, 'Text97', sections.join('\n\n'))
}

function fillSpells(map, character, include, excludeVolatile) {
  const sp = character.spellcasting
  if (!sp) return

  if (include('spellcastingInfo')) {
    setText(map, 'Text111', sp.spellcastingClass)
    setText(map, 'Text93', sp.spellcastingAbility)
    setText(map, 'Text94', sp.spellSaveDC)
    setText(map, 'Text95', sp.spellAttackBonus)
  }

  if (include('spellSlots')) {
    for (let lvl = 1; lvl <= 9; lvl++) {
      const levelData = sp.levels?.[lvl]
      setText(map, SPELL_SLOT_TOTAL_FIELD[lvl], levelData?.slotsTotal)
      if (!excludeVolatile) {
        const total = Number(levelData?.slotsTotal) || 0
        const remaining = Number(levelData?.slotsRemaining) || 0
        const expended = Math.max(0, Math.min(total - remaining, SPELL_SLOT_EXPENDED_BOXES[lvl].length))
        SPELL_SLOT_EXPENDED_BOXES[lvl].forEach((name, i) => setCheck(map, name, i < expended))
      }
    }
  }

  const preparedRows = []
  if (include('cantrips')) {
    for (const c of sp.cantrips ?? []) {
      if (c?.name?.trim()) preparedRows.push({ level: 0, name: c.name.trim() })
    }
  }
  if (include('preparedSpells')) {
    for (let lvl = 1; lvl <= 9; lvl++) {
      for (const s of sp.levels?.[lvl]?.spells ?? []) {
        if (s?.prepared && s?.name?.trim()) preparedRows.push({ level: lvl, name: s.name.trim() })
      }
    }
  }
  preparedRows.slice(0, PREPARED_SPELL_ROWS).forEach((row, i) => {
    setText(map, `Text105.${i}`, row.level)
    setText(map, `Text106.${i}`, row.name)
  })
}

// This template has no image form field (unlike the old sheet), so the portrait is
// drawn directly onto the page instead — anchored to the top-right corner of the
// "Appearance" box (page 2, Text96's rect) rather than a dedicated slot.
const APPEARANCE_BOX = { page: 1, x: 418, y: 686, w: 176, h: 68 }
const PORTRAIT_SIZE = 58

async function fillImage(imageDataUrl, pdfDoc) {
  if (!imageDataUrl) return
  try {
    const isPng = imageDataUrl.startsWith('data:image/png')
    const image = isPng ? await pdfDoc.embedPng(imageDataUrl) : await pdfDoc.embedJpg(imageDataUrl)
    const page = pdfDoc.getPages()[APPEARANCE_BOX.page]
    if (!page) return
    const scale = Math.min(PORTRAIT_SIZE / image.width, PORTRAIT_SIZE / image.height)
    const w = image.width * scale
    const h = image.height * scale
    page.drawImage(image, {
      x: APPEARANCE_BOX.x + APPEARANCE_BOX.w - w,
      y: APPEARANCE_BOX.y + APPEARANCE_BOX.h - h,
      width: w,
      height: h,
    })
  } catch {
    // unsupported image format - skip
  }
}

// sections: Set of EXPORT_SECTIONS keys to include
export async function buildCharacterPdf(character, { sections, imageDataUrl, excludeVolatile } = {}) {
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

  fillIdentity(map, character, include)
  fillAppearance(map, character, include)
  fillAbilities(map, character, include)
  fillCombat(map, character, include, excludeVolatile)
  fillEquipment(map, character, include, excludeVolatile)
  fillFeatures(map, character, include)
  fillPersonality(map, character, include)
  fillSpells(map, character, include, excludeVolatile)
  if (include('image')) await fillImage(imageDataUrl, pdfDoc)

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
