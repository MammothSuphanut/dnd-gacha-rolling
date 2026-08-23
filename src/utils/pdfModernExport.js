// "Modern" character sheet PDF — a from-scratch, pdf-lib-drawn multi-page
// export styled like a readable D&D reference document (closer to how the
// PHB typesets a stat block or a spell entry) rather than a fillable form —
// this is meant to be read, not printed and marked up during play. Four
// sections, each starting on its own page but flowing across as many pages
// as its content needs: Character (stats + backstory), Spells (full text
// inline, not deferred to a later page), Inventory, Features & Feats.
// Real SRD rules text is pulled from the project's bundled 5etools data —
// see fiveEtoolsLookup.js — and nothing here truncates description text.
import { PDFDocument } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import thaiFontUrl from '../assets/NotoSansThai.ttf?url'
import { Sheet, PAGE_W, MARGIN, INK, MUTED, FAINT, BORDER, ACCENT } from './pdfDraw'
import {
  ABILITY_KEYS,
  SKILLS,
  abilityMod,
  formatMod,
  normalizeSkillState,
  passivePerception,
  proficiencyBonus,
  savingThrowBonus,
  skillBonus,
} from './dnd5e'
import {
  getClassFeaturesUpTo,
  getFeatText,
  getItemInfo,
  getSpeciesTraits,
  getSpellInfo,
  getSubclassFeaturesUpTo,
} from './fiveEtoolsLookup'

const CW = PAGE_W - MARGIN * 2
const ABILITY_LABELS = { str: 'STR', dex: 'DEX', con: 'CON', int: 'INT', wis: 'WIS', cha: 'CHA' }
const ABILITY_LABELS_LONG = { str: 'Strength', dex: 'Dexterity', con: 'Constitution', int: 'Intelligence', wis: 'Wisdom', cha: 'Charisma' }

function totalLevel(character) {
  return (character.classLevels ?? []).reduce((sum, cl) => sum + (Number(cl.level) || 0), 0)
}

function classAndSubclassText(character) {
  const classLevels = (character.classLevels ?? []).filter((cl) => cl.className)
  return classLevels
    .map((cl) => `${cl.className}${cl.subclassName ? ` (${cl.subclassName})` : ''} ${cl.level}`)
    .join(' / ')
}

function atkDcText(raw) {
  if (raw == null || raw === '') return ''
  const num = Number(raw)
  return Number.isFinite(num) ? formatMod(num) : String(raw)
}

// ------------------------------------------------------- section: header --

function onNewPageFor(banner) {
  return (s) => s.banner(`${banner} (ต่อ)`)
}

// -------------------------------------------------- section 1: character --

async function buildCharacterSection(sheet, character) {
  sheet.addPage()
  const level = totalLevel(character)
  const profBonus = proficiencyBonus(level)
  const onNewPage = onNewPageFor('Character')

  sheet.text(character.name || '(ไม่มีชื่อตัวละคร)', MARGIN, sheet.y, { size: 20, color: INK, bold: true })
  sheet.y += 24

  const subtitleParts = [
    classAndSubclassText(character) || null,
    character.species || null,
    character.background,
    `Level ${level || 1}`,
    character.combat?.xp ? `${character.combat.xp} XP` : null,
  ].filter(Boolean)
  sheet.text(subtitleParts.join('  ·  '), MARGIN, sheet.y, { size: 10.5, color: MUTED, maxWidth: CW })
  sheet.y += 20

  sheet.line(MARGIN, sheet.y, PAGE_W - MARGIN, sheet.y, { color: BORDER, width: 1 })
  sheet.y += 12

  // Quick stats
  const quick = []
  quick.push({ text: `AC ${character.combat?.ac || '—'}   ` })
  const hp = character.combat?.hp ?? {}
  const hpCurrent = hp.current === '' || hp.current == null ? '—' : hp.current
  const hpMax = hp.max === '' || hp.max == null ? '—' : hp.max
  quick.push({ text: `HP ${hpCurrent}/${hpMax}${hp.temp ? ` (+${hp.temp} temp)` : ''}   ` })
  quick.push({ text: `Hit Dice ${level || '—'}   ` })
  quick.push({ text: `Speed ${(() => {
    const raw = String(character.combat?.speed ?? '').trim()
    if (!raw) return '—'
    return /[a-zA-Z]/.test(raw) ? raw : `${raw} ft.`
  })()}   ` })
  quick.push({ text: `Initiative ${formatMod(abilityMod(character.stats?.dex))}   ` })
  quick.push({ text: `Passive Perception ${passivePerception(character, profBonus)}   ` })
  quick.push({ text: `Proficiency Bonus ${formatMod(profBonus)}   ` })
  quick.push({ text: `Size ${character.size || '—'}` })
  sheet.richWrap(quick.map((q) => ({ ...q, bold: true, size: 9.5 })), MARGIN, CW, { size: 9.5, lineHeight: 14, onNewPage })
  sheet.y += 4

  const succ = character.combat?.deathSaves?.successes ?? 0
  const fail = character.combat?.deathSaves?.failures ?? 0
  if (succ > 0 || fail > 0) {
    sheet.richWrap([{ text: `Death Saves: ${succ} success${succ === 1 ? '' : 'es'}, ${fail} failure${fail === 1 ? '' : 's'}`, color: MUTED }], MARGIN, CW, { size: 8.5, onNewPage })
  }
  sheet.y += 6

  // Ability scores — one compact line, PHB stat-block style.
  const abilityLine = ABILITY_KEYS.map((k) => `${ABILITY_LABELS[k]} ${character.stats?.[k] ?? 10} (${formatMod(abilityMod(character.stats?.[k]))})`).join('    ')
  sheet.richWrap([{ text: abilityLine, bold: true, size: 10 }], MARGIN, CW, { size: 10, lineHeight: 15, onNewPage })
  sheet.y += 4

  const saveEntries = ABILITY_KEYS.filter((k) => character.savingThrows?.[k]).map(
    (k) => `${ABILITY_LABELS_LONG[k].slice(0, 3)} ${formatMod(savingThrowBonus(character, k, profBonus))}`,
  )
  if (saveEntries.length > 0) {
    sheet.richWrap(
      [{ text: 'Saving Throws  ', bold: true, color: ACCENT }, { text: saveEntries.join(', ') }],
      MARGIN,
      CW,
      { size: 9, lineHeight: 13, onNewPage },
    )
  }

  const skillEntries = SKILLS.filter((s) => {
    const { prof, expertise } = normalizeSkillState(character.skills?.[s.key])
    return prof || expertise
  }).map((s) => {
    const { expertise } = normalizeSkillState(character.skills?.[s.key])
    const bonus = formatMod(skillBonus(character, s, profBonus))
    return `${s.label} ${bonus}${expertise ? ' (Expertise)' : ''}`
  })
  if (skillEntries.length > 0) {
    sheet.richWrap(
      [{ text: 'Skills  ', bold: true, color: ACCENT }, { text: skillEntries.join(', ') }],
      MARGIN,
      CW,
      { size: 9, lineHeight: 13, onNewPage },
    )
  }
  sheet.y += 8

  // Weapons & cantrips-as-attacks
  const weapons = (character.weapons ?? []).filter((w) => w?.name?.trim())
  const cantrips = (character.spellcasting?.cantrips ?? []).filter((c) => c?.name?.trim())
  if (weapons.length > 0 || cantrips.length > 0) {
    sheet.subheading('Attacks & Cantrips')
    for (const w of weapons) {
      const dmgText = (w.damages ?? []).filter((d) => d.amount || d.type).map((d) => [d.amount, d.type].filter(Boolean).join(' ')).join(' / ')
      const bits = [w.name, atkDcText(w.bonusOrDC) && `${atkDcText(w.bonusOrDC)} to hit`, dmgText].filter(Boolean)
      sheet.richWrap([{ text: bits.join('  ·  ') }], MARGIN, CW, { size: 9, lineHeight: 13, onNewPage })
    }
    for (const c of cantrips) {
      const atk = character.spellcasting?.spellAttackBonus
      sheet.richWrap([{ text: `${c.name}${atk ? `  ·  ${atk} to hit` : ''}` }], MARGIN, CW, { size: 9, lineHeight: 13, onNewPage })
    }
    sheet.y += 6
  }

  // Proficiencies & languages
  const profList = character.proficienciesLanguages ?? []
  if (profList.length > 0) {
    sheet.subheading('Proficiencies & Languages')
    sheet.richWrap([{ text: profList.join(', ') }], MARGIN, CW, { size: 9, lineHeight: 13, onNewPage })
    sheet.y += 6
  }

  // Backstory & personality
  const descLine = [
    character.alignment && `Alignment ${character.alignment}`,
    character.faith && `Faith ${character.faith}`,
    character.gender && `Gender ${character.gender}`,
    character.age && `Age ${character.age}`,
    character.height && `Height ${character.height}`,
    character.weight && `Weight ${character.weight}`,
    character.eyes && `Eyes ${character.eyes}`,
    character.hair && `Hair ${character.hair}`,
    character.skin && `Skin ${character.skin}`,
  ].filter(Boolean)

  const bioBlocks = [
    ['Personality Traits', character.personalityTraits],
    ['Ideals', character.ideals],
    ['Bonds', character.bonds],
    ['Flaws', character.flaws],
    ['Biography', character.biography],
    ['Allies & Organizations', character.alliesOrganizations],
    ['Faction', character.factionName],
    ['Appearance', character.appearance],
    ['Notes', character.note],
  ].filter(([, v]) => v && String(v).trim())

  if (descLine.length > 0 || bioBlocks.length > 0) {
    sheet.subheading('Backstory & Personality')
    if (descLine.length > 0) {
      sheet.richWrap([{ text: descLine.join('  ·  '), color: MUTED }], MARGIN, CW, { size: 8.5, lineHeight: 12.5, onNewPage })
      sheet.y += 4
    }
    for (const [label, text] of bioBlocks) {
      sheet.ensure(14, onNewPage)
      sheet.text(label, MARGIN, sheet.y, { size: 9, color: ACCENT, bold: true })
      sheet.y += 12
      sheet.paragraph(text, MARGIN, CW, { size: 9, lineHeight: 12.5, paraGap: 4, onNewPage })
      sheet.y += 6
    }
  }
}

// ------------------------------------------------------- section 2: spells -

async function buildSpellsSection(sheet, character) {
  const sp = character.spellcasting
  const named = new Map() // name -> level (from character record, prepared or not)
  for (const c of sp?.cantrips ?? []) if (c?.name?.trim()) named.set(c.name.trim(), 0)
  for (let lvl = 1; lvl <= 9; lvl++) {
    for (const s of sp?.levels?.[lvl]?.spells ?? []) if (s?.name?.trim()) named.set(s.name.trim(), lvl)
  }
  if (named.size === 0 && !sp?.spellcastingClass) return

  sheet.addPage()
  sheet.banner('Spells & Spellcasting')
  const onNewPage = onNewPageFor('Spells & Spellcasting')

  const introParts = [
    sp?.spellcastingClass && `Class ${sp.spellcastingClass}`,
    sp?.spellcastingAbility && `Ability ${sp.spellcastingAbility}`,
    sp?.spellSaveDC && `Save DC ${sp.spellSaveDC}`,
    sp?.spellAttackBonus && `Attack Bonus ${sp.spellAttackBonus}`,
  ].filter(Boolean)
  if (introParts.length > 0) {
    sheet.richWrap(introParts.map((t) => ({ text: `${t}   ` , bold: true })), MARGIN, CW, { size: 9.5, lineHeight: 14, onNewPage })
  }
  const slotParts = []
  for (let lvl = 1; lvl <= 9; lvl++) {
    const d = sp?.levels?.[lvl]
    if (d?.slotsTotal) slotParts.push(`Level ${lvl} (${d.slotsTotal})`)
  }
  if (slotParts.length > 0) {
    sheet.richWrap([{ text: 'Spell Slots  ', bold: true, color: ACCENT }, { text: slotParts.join(', ') }], MARGIN, CW, { size: 9, lineHeight: 13, onNewPage })
  }
  sheet.y += 10

  const entries = await Promise.all(
    [...named.entries()].map(async ([name, fallbackLevel]) => ({ name, fallbackLevel, info: await getSpellInfo(name) })),
  )
  entries.sort((a, b) => (a.info?.level ?? a.fallbackLevel) - (b.info?.level ?? b.fallbackLevel) || a.name.localeCompare(b.name))

  let lastLevel = null
  for (const { name, fallbackLevel, info } of entries) {
    const lvl = info?.level ?? fallbackLevel
    if (lvl !== lastLevel) {
      lastLevel = lvl
      sheet.ensure(18, onNewPage)
      sheet.text(lvl === 0 ? 'Cantrips' : `Level ${lvl}`, MARGIN, sheet.y, { size: 10.5, color: INK, bold: true })
      sheet.y += 15
    }

    const metaText = info
      ? `${info.school}${info.ritual ? ' (ritual)' : ''} — ${info.time}, ${info.range}, ${info.components}${info.concentration ? ', Concentration' : ''}, ${info.duration}`
      : 'ไม่พบข้อมูลสเปลล์นี้ในฐานข้อมูล SRD ในโปรเจกต์ — อาจเป็นสเปลล์ homebrew หรือพิมพ์ชื่อไม่ตรงกับฐานข้อมูล'
    const bodyText = info?.text || ''
    // entriesHigherLevel already renders its own "At Higher Levels" / custom
    // heading (see fiveEtoolsText's `entries`-type handling) — don't prefix it again.
    const higherText = info?.higherLevelText || ''
    const fullBody = [bodyText, higherText].filter(Boolean).join('\n\n')
    const bodyH = fullBody ? sheet.measureParagraphHeight(fullBody, CW, { size: 9, lineHeight: 12.5 }) : 0
    sheet.ensure(Math.min(14 + 12 + bodyH + 10, 720), onNewPage)
    sheet.text(name, MARGIN, sheet.y, { size: 10.5, color: ACCENT, bold: true })
    sheet.y += 14
    sheet.richWrap([{ text: metaText, color: MUTED, size: 8 }], MARGIN, CW, { size: 8, lineHeight: 11.5, onNewPage })
    sheet.y += 2
    if (fullBody) sheet.paragraph(fullBody, MARGIN, CW, { size: 9, lineHeight: 12.5, paraGap: 5, onNewPage })
    sheet.y += 10
    sheet.line(MARGIN, sheet.y, PAGE_W - MARGIN, sheet.y, { color: BORDER, width: 0.6 })
    sheet.y += 10
  }
}

// ---------------------------------------------------- section 3: inventory -

async function buildInventorySection(sheet, character) {
  const equipment = (character.equipment ?? []).filter((it) => (typeof it === 'string' ? it.trim() : it?.name?.trim()))
  if (equipment.length === 0 && !character.treasure) return

  const infos = await Promise.all(
    equipment.map(async (it) => {
      const nm = typeof it === 'string' ? it : it.name
      const qty = typeof it === 'string' ? 1 : Number(it.qty) || 1
      return { name: nm, qty, info: await getItemInfo(nm) }
    }),
  )

  sheet.addPage()
  sheet.banner('Inventory')
  const onNewPage = onNewPageFor('Inventory')

  let totalWeight = 0
  for (const { name, qty, info } of infos) {
    const weight = info?.weight ?? null
    if (weight != null) totalWeight += weight * qty

    const headerText = `${name}${qty > 1 ? `  ×${qty}` : ''}`
    const metaText = weight != null ? `${weight} lbs${qty > 1 ? ` each (${(weight * qty).toFixed(1)} lbs total)` : ''}` : ''
    const bodyText = info?.text || ''
    const bodyH = bodyText ? sheet.measureParagraphHeight(bodyText, CW, { size: 9, lineHeight: 12.5 }) : 0
    sheet.ensure(Math.min(14 + bodyH + 10, 720), onNewPage)
    sheet.text(headerText, MARGIN, sheet.y, { size: 10, color: INK, bold: true })
    if (metaText) sheet.text(metaText, PAGE_W - MARGIN, sheet.y, { size: 8, color: MUTED, align: 'right' })
    sheet.y += 14
    if (bodyText) {
      sheet.paragraph(bodyText, MARGIN, CW, { size: 9, lineHeight: 12.5, paraGap: 5, onNewPage })
    } else if (!info) {
      sheet.richWrap([{ text: 'ไม่พบข้อมูลชิ้นนี้ในฐานข้อมูล SRD ในโปรเจกต์', color: FAINT, size: 8 }], MARGIN, CW, { size: 8, onNewPage })
    }
    sheet.y += 6
    sheet.line(MARGIN, sheet.y, PAGE_W - MARGIN, sheet.y, { color: BORDER, width: 0.6 })
    sheet.y += 10
  }

  if (character.treasure) {
    sheet.ensure(20, onNewPage)
    sheet.text('Treasure', MARGIN, sheet.y, { size: 10, color: INK, bold: true })
    sheet.y += 13
    sheet.paragraph(character.treasure, MARGIN, CW, { size: 9, lineHeight: 12.5, onNewPage })
    sheet.y += 6
  }

  const cur = character.currency ?? {}
  const coinText = ['cp', 'sp', 'ep', 'gp', 'pp'].map((k) => `${cur[k] || 0} ${k.toUpperCase()}`).join('   ')
  sheet.ensure(16, onNewPage)
  sheet.text(`Coins: ${coinText}`, MARGIN, sheet.y, { size: 9, color: INK })
  if (totalWeight > 0) sheet.text(`Total weight: ${totalWeight.toFixed(1)} lbs`, PAGE_W - MARGIN, sheet.y, { size: 9, color: INK, align: 'right' })
}

// ----------------------------------------------- section 4: feats/features -

const NOT_FOUND_HINT = 'ไม่พบข้อมูลนี้ในฐานข้อมูล SRD ในโปรเจกต์ (อาจเป็นเนื้อหา homebrew หรือพิมพ์ชื่อไม่ตรงกับฐานข้อมูล)'

async function renderFeatureEntry(sheet, onNewPage, name, sourceTag, text, { notFoundHint = false } = {}) {
  const bodyText = text || (notFoundHint ? NOT_FOUND_HINT : '')
  const bodyH = bodyText ? sheet.measureParagraphHeight(bodyText, CW, { size: 9, lineHeight: 12.5 }) : 0
  sheet.ensure(Math.min(14 + bodyH + 8, 720), onNewPage)
  sheet.text(name, MARGIN, sheet.y, { size: 10, color: INK, bold: true })
  if (sourceTag) sheet.text(sourceTag, PAGE_W - MARGIN, sheet.y, { size: 7.5, color: FAINT, align: 'right' })
  sheet.y += 13
  if (text) {
    sheet.paragraph(text, MARGIN, CW, { size: 9, lineHeight: 12.5, paraGap: 5, onNewPage })
  } else if (notFoundHint) {
    sheet.richWrap([{ text: NOT_FOUND_HINT, color: FAINT, size: 8 }], MARGIN, CW, { size: 8, onNewPage })
  }
  sheet.y += 8
}

async function buildFeaturesSection(sheet, character) {
  sheet.addPage()
  sheet.banner('Features & Feats')
  const onNewPage = onNewPageFor('Features & Feats')

  // Official class + subclass features, by level, per multiclass entry.
  const classBlocks = []
  for (const cl of character.classLevels ?? []) {
    if (!cl.className) continue
    const [cf, scf] = await Promise.all([
      getClassFeaturesUpTo(cl.className, cl.level),
      cl.subclassName ? getSubclassFeaturesUpTo(cl.className, cl.subclassName, cl.level) : Promise.resolve([]),
    ])
    classBlocks.push({ className: cl.className, subclassName: cl.subclassName, features: [...cf, ...scf].sort((a, b) => a.level - b.level) })
  }
  const hasOfficialFeatures = classBlocks.some((b) => b.features.length > 0)

  sheet.text('Class Features', MARGIN, sheet.y, { size: 12, color: ACCENT, bold: true })
  sheet.y += 18
  if (hasOfficialFeatures) {
    for (const block of classBlocks) {
      if (classBlocks.length > 1) {
        sheet.ensure(16, onNewPage)
        sheet.text(`${block.className}${block.subclassName ? ` — ${block.subclassName}` : ''}`, MARGIN, sheet.y, { size: 9.5, color: MUTED, bold: true })
        sheet.y += 14
      }
      for (const f of block.features) {
        await renderFeatureEntry(sheet, onNewPage, f.name, `lv. ${f.level}`, f.text)
      }
    }
  } else {
    // Homebrew / unrecognized class — fall back to the character's own short
    // feature list rather than showing an empty section.
    const list = (character.featuresAndTraits ?? []).filter((f) => f.name?.trim())
    if (list.length === 0) {
      sheet.text('—', MARGIN, sheet.y, { size: 9, color: FAINT })
      sheet.y += 14
    }
    for (const f of list) {
      await renderFeatureEntry(sheet, onNewPage, f.name, '', f.description)
    }
  }
  sheet.y += 6

  // Species traits
  const traits = await getSpeciesTraits(character.species)
  sheet.ensure(20, onNewPage)
  sheet.text('Species Traits', MARGIN, sheet.y, { size: 12, color: ACCENT, bold: true })
  sheet.y += 18
  if (traits.length === 0) {
    sheet.text('—', MARGIN, sheet.y, { size: 9, color: FAINT })
    sheet.y += 14
  }
  for (const t of traits) {
    await renderFeatureEntry(sheet, onNewPage, t.name, '', t.text)
  }
  sheet.y += 6

  // Feats — best-effort match against the free-text "additional features"
  // field, which characters in this project separate with newlines or "; ".
  const featLines = String(character.additionalFeaturesTraits ?? '').split(/[\n;]+/).map((s) => s.trim()).filter(Boolean)
  sheet.ensure(20, onNewPage)
  sheet.text('Feats', MARGIN, sheet.y, { size: 12, color: ACCENT, bold: true })
  sheet.y += 18
  if (featLines.length === 0) {
    sheet.text('—', MARGIN, sheet.y, { size: 9, color: FAINT })
    sheet.y += 14
  }
  for (const line of featLines) {
    const officialText = await getFeatText(line)
    await renderFeatureEntry(sheet, onNewPage, line, '', officialText || '', { notFoundHint: !officialText })
  }
}

// --------------------------------------------------------------- entry -----

export async function buildModernCharacterPdf(character) {
  const [thaiFontBytes] = await Promise.all([fetch(thaiFontUrl).then((r) => r.arrayBuffer())])
  const pdfDoc = await PDFDocument.create()
  pdfDoc.registerFontkit(fontkit)
  const font = await pdfDoc.embedFont(thaiFontBytes, { subset: true })
  const sheet = new Sheet(pdfDoc, font)

  await buildCharacterSection(sheet, character)
  await buildSpellsSection(sheet, character)
  await buildInventorySection(sheet, character)
  await buildFeaturesSection(sheet, character)

  sheet.addFooters(character.name || 'Character')

  return pdfDoc.save()
}
