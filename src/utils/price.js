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
