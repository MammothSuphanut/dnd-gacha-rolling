// Structured reader for codex/2024-tier-list/<class>-subclass-scorecard-2024.md
// — a per-class companion to <class>-subclass-tier-list-2024.md that adds a
// 7-axis M/R/B score breakdown (Damage/Control/Support/Survivability/Action
// Economy/Utility/Versatility) per subclass, with a short reason per axis.
// Shape: intro/methodology text, then one "## <Tier> Tier (<count>)" section
// per tier, each containing one "### Name (Source) ICON — role" subsection
// per subclass with a "**ภาพรวม**: ..." line and a
// "| Axis | Score | Grade | เหตุผล |" table right after.
//
// If the generator/author shape ever changes, update this parser to match.

const TIER_HEADING_RE = /^##\s+([SABCD](?:\/[SABCD])*)\s+Tier\s*\((\d+)\)\s*$/
const ICONS = '🔵🔴🟢🟡🟣🕰️🔗'
const headingReSourceFirst = new RegExp(`^### (.+?)\\s*\\(([^)]+)\\)\\s*([${ICONS}]+)\\s*—\\s*(.+)$`, 'u')
const headingReIconFirst = new RegExp(`^### (.+?)\\s*([${ICONS}]+)\\s*(?:\\(([^)]+)\\)\\s*)?—\\s*(.+)$`, 'u')

function matchSubclassHeading(line) {
  let m = line.match(headingReSourceFirst)
  if (m) return { name: m[1].trim(), source: m[2].trim(), icons: m[3], role: m[4].trim() }
  m = line.match(headingReIconFirst)
  if (m) return { name: m[1].trim(), source: (m[3] || '').trim(), icons: m[2], role: m[4].trim() }
  return null
}

export function parseSubclassScorecard(raw) {
  const lines = raw.split('\n')
  const firstGroupIdx = lines.findIndex((l) => TIER_HEADING_RE.test(l.trim()))
  const header = (firstGroupIdx === -1 ? lines : lines.slice(0, firstGroupIdx)).join('\n').trim()

  const groups = []
  let currentGroup = null
  let currentSub = null

  for (let i = firstGroupIdx === -1 ? lines.length : firstGroupIdx; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    const tierMatch = trimmed.match(TIER_HEADING_RE)
    if (tierMatch) {
      currentGroup = { tier: tierMatch[1], count: Number(tierMatch[2]), subclasses: [] }
      groups.push(currentGroup)
      currentSub = null
      continue
    }

    if (/^### /.test(line)) {
      if (!currentGroup) continue // heading appeared before any tier section — ignore
      const hm = matchSubclassHeading(line)
      if (!hm) continue
      currentSub = { ...hm, tier: currentGroup.tier, overallReason: '', axes: [] }
      currentGroup.subclasses.push(currentSub)
      continue
    }

    if (!currentSub) continue

    const overallMatch = trimmed.match(/^\*\*ภาพรวม\*\*:\s*(.+)$/)
    if (overallMatch) {
      currentSub.overallReason = overallMatch[1].trim()
      continue
    }

    if (line.startsWith('| Axis |') || line.startsWith('|---')) continue

    if (line.startsWith('|')) {
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim())
      if (cells.length < 4) continue
      const [axis, score, grade, reason] = cells
      currentSub.axes.push({ axis, score, grade, reason })
    }
  }

  return { header, groups }
}
