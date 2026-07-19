const UNIT_TO_COPPER = { cp: 1, sp: 10, gp: 100 }

export const PRICE_TYPES = [
  { type: 'normal', field: 'priceNormal', label: 'ราคาปกติ' },
  { type: 'cheap', field: 'priceCheap', label: 'ราคาถูก' },
  { type: 'expensive', field: 'priceExpensive', label: 'ราคาแพง' },
]

// Parses strings like "15 gp", "7 sp", "2 cp" into a copper-piece value.
// Returns null when the text can't be parsed as a plain amount + unit (e.g. "X4", "See Spell").
export function parsePriceToCopper(raw) {
  if (!raw) return null
  const text = String(raw).trim().toLowerCase()
  const match = text.match(/^([\d,]+(?:\.\d+)?)\s*(cp|sp|gp)$/)
  if (!match) return null
  const amount = parseFloat(match[1].replace(/,/g, ''))
  if (Number.isNaN(amount)) return null
  return amount * UNIT_TO_COPPER[match[2]]
}

export function formatCopper(cp) {
  if (cp == null || Number.isNaN(cp)) return '-'
  const sign = cp < 0 ? '-' : ''
  let total = Math.round(Math.abs(cp))
  const gp = Math.floor(total / 100)
  total -= gp * 100
  const sp = Math.floor(total / 10)
  total -= sp * 10
  const cpRemain = total
  const parts = []
  if (gp) parts.push(`${gp} gp`)
  if (sp) parts.push(`${sp} sp`)
  if (cpRemain || parts.length === 0) parts.push(`${cpRemain} cp`)
  return sign + parts.join(' ')
}

export const ENHANCEMENT_LEVELS = [1, 2, 3]

export const DEFAULT_ENHANCEMENT_MULTIPLIERS = { 1: 5, 2: 25, 3: 125 }

// multipliers = { 1: number, 2: number, 3: number } — price at level N = base price * multipliers[N]
export function getEnhancementMultiplier(level, multipliers) {
  if (!level) return 1
  const m = Number(multipliers?.[level])
  return m && !Number.isNaN(m) ? m : 1
}

// Chance of each outcome when attempting to reach a given target level.
// Higher levels are harder: lower success chance, and downgrade/break risk kicks in.
export const ENHANCEMENT_UPGRADE_RATES = {
  1: { success: 0.2, fail: 0.8, downgrade: 0, break: 0 },
  2: { success: 0.15, fail: 0.6, downgrade: 0.2, break: 0.05 },
  3: { success: 0.1, fail: 0.4, downgrade: 0.4, break: 0.1 },
}

// Cost per attempt, as a fraction of the item's current (pre-attempt) price —
// e.g. going from +1 to +2 costs a % of what the item is worth at +1, not +2.
// Kept low so upgrading stays cheaper on average than buying the already-enhanced
// item outright, in exchange for the risk above.
export const ENHANCEMENT_UPGRADE_COST_FACTORS = { 1: 0.1, 2: 0.12, 3: 0.15 }

// Preset damage/condition levels for repairing an item, and the chance of
// each outcome when attempting a repair at that level. Higher level = item
// is in better condition = repair is more likely to succeed.
export const REPAIR_DAMAGE_LEVELS = [100, 80, 60, 40, 20, 0]

// Reference price ranges by item rarity, per the commonly used D&D 5e
// "sane magic item prices" guideline (an expansion of the DMG p.135 variant
// rule into ranges). Shown to the user as a guideline only — they still
// type the price into the field themselves.
export const ITEM_RARITY_PRICES = [
  { key: 'common', label: 'Common (สามัญ)', priceText: '50 - 100 gp' },
  { key: 'uncommon', label: 'Uncommon (ไม่ธรรมดา)', priceText: '101 - 500 gp' },
  { key: 'rare', label: 'Rare (หายาก)', priceText: '501 - 5,000 gp' },
  { key: 'veryRare', label: 'Very Rare (หายากมาก)', priceText: '5,001 - 50,000 gp' },
  { key: 'legendary', label: 'Legendary (ในตำนาน)', priceText: '50,001+ gp' },
]

// downgrade is always 0 for repairs (an explicit 0, not omitted) — applyAntiBreak
// and applySuccessBoost both do arithmetic on rates.downgrade unconditionally,
// and undefined + number is NaN, which silently corrupts fail/break.
export const REPAIR_DAMAGE_RATES = {
  100: { success: 1, fail: 0, downgrade: 0, break: 0 },
  80: { success: 0.8, fail: 0.15, downgrade: 0, break: 0.05 },
  60: { success: 0.6, fail: 0.3, downgrade: 0, break: 0.1 },
  40: { success: 0.4, fail: 0.45, downgrade: 0, break: 0.15 },
  20: { success: 0.2, fail: 0.6, downgrade: 0, break: 0.2 },
  0: { success: 0, fail: 0.75, downgrade: 0, break: 0.25 },
}

// basePriceCp = copper price of the item at +0. currentLevel = the item's level
// before this attempt (0-2). Returns the copper cost of one upgrade attempt
// aiming for currentLevel + 1.
export function getUpgradeCostCp(basePriceCp, currentLevel, multipliers) {
  if (basePriceCp == null) return null
  const targetLevel = currentLevel + 1
  const currentPriceCp = basePriceCp * getEnhancementMultiplier(currentLevel, multipliers)
  const factor = ENHANCEMENT_UPGRADE_COST_FACTORS[targetLevel] ?? 1
  return currentPriceCp * factor
}

export function rollUpgradeOutcome(rates) {
  const r = Math.random()
  let cum = 0
  for (const key of ['success', 'fail', 'downgrade', 'break']) {
    cum += rates[key] ?? 0
    if (r < cum) return key
  }
  return 'fail'
}

// Removes the downgrade chance entirely, halves success, and hands the freed
// probability mass to fail/break (split proportionally to their current weight).
export function applyAntiDowngrade(rates) {
  const freed = rates.downgrade + rates.success / 2
  const success = rates.success / 2
  const remaining = rates.fail + rates.break
  const fail = remaining > 0 ? rates.fail + (freed * rates.fail) / remaining : rates.fail + freed / 2
  const brk = remaining > 0 ? rates.break + (freed * rates.break) / remaining : rates.break + freed / 2
  return { success, fail, downgrade: 0, break: brk }
}

// Removes the break chance entirely, halves success, and hands the freed
// probability mass to fail/downgrade (split proportionally to their current weight).
export function applyAntiBreak(rates) {
  const freed = rates.break + rates.success / 2
  const success = rates.success / 2
  const remaining = rates.fail + rates.downgrade
  const fail = remaining > 0 ? rates.fail + (freed * rates.fail) / remaining : rates.fail + freed / 2
  const downgrade = remaining > 0 ? rates.downgrade + (freed * rates.downgrade) / remaining : rates.downgrade + freed / 2
  return { success, fail, downgrade, break: 0 }
}

// Boosts the success chance, either by adding percentage points ('percent')
// or by multiplying it ('times'), then rescales fail/downgrade/break
// proportionally so everything still sums to 1.
export function applySuccessBoost(rates, mode, value) {
  const amount = Number(value)
  if (!amount || Number.isNaN(amount)) return rates
  const rawSuccess = mode === 'times' ? rates.success * amount : rates.success + amount / 100
  const success = Math.min(Math.max(rawSuccess, 0), 1)
  const remaining = 1 - success
  const othersTotal = rates.fail + rates.downgrade + rates.break
  if (othersTotal <= 0) return { success, fail: remaining, downgrade: 0, break: 0 }
  const scale = remaining / othersTotal
  return {
    success,
    fail: rates.fail * scale,
    downgrade: rates.downgrade * scale,
    break: rates.break * scale,
  }
}

export const CURRENCY_UNITS = ['pp', 'gp', 'ep', 'sp', 'cp']
const FULL_UNIT_TO_COPPER = { pp: 1000, gp: 100, ep: 50, sp: 10, cp: 1 }

// amounts = { pp, gp, ep, sp, cp } (each an optional numeric string)
export function flatAmountsToCopper(amounts) {
  if (!amounts) return 0
  return CURRENCY_UNITS.reduce((sum, unit) => {
    const v = Number(amounts[unit])
    return sum + (v && !Number.isNaN(v) ? v * FULL_UNIT_TO_COPPER[unit] : 0)
  }, 0)
}

// Bidirectional price adjustment — used for "haggling" a cart or appraised
// price up or down. adjust = { sign: '+' | '-', mode: 'percent' | 'flat',
// value: string (percent) | { pp, gp, ep, sp, cp } (flat) }
export function applyPriceAdjustment(cp, adjust) {
  if (!adjust) return cp
  const deltaCp =
    adjust.mode === 'flat' ? flatAmountsToCopper(adjust.value) : cp * ((Number(adjust.value) || 0) / 100)
  const signedDeltaCp = adjust.sign === '-' ? -deltaCp : deltaCp
  return Math.max(0, cp + signedDeltaCp)
}
