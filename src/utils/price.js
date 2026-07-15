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

export function rollUpgradeOutcome(targetLevel) {
  const rates = ENHANCEMENT_UPGRADE_RATES[targetLevel] ?? ENHANCEMENT_UPGRADE_RATES[1]
  const r = Math.random()
  let cum = 0
  for (const key of ['success', 'fail', 'downgrade', 'break']) {
    cum += rates[key] ?? 0
    if (r < cum) return key
  }
  return 'fail'
}

export function applyDiscountPercent(cp, percent) {
  const p = Number(percent)
  if (!p || Number.isNaN(p)) return cp
  return cp * (1 - p / 100)
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

// discount = { type: 'percent', value: string } | { type: 'flat', value: { pp, gp, ep, sp, cp } }
export function applyDiscount(cp, discount) {
  if (!discount) return cp
  if (discount.type === 'flat') {
    return Math.max(0, cp - flatAmountsToCopper(discount.value))
  }
  return applyDiscountPercent(cp, discount.value)
}
