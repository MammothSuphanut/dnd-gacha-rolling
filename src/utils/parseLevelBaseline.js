// Structured reader for codex/2024-tier-list/<class>-level-baseline.md — the
// "ชั้น 1" (Class Baseline) file of the level-indexed tier system (see
// 00-level-anchor-rubric.md). Each file grades the bare class (no subclass
// feature) against the Anchor Rubric for all 20 levels × 7 axes, written as
// one prose section per axis ("## Damage Axis" etc, or just "## Damage" in
// the first 5 files written — see 00-level-progress.md) with a "| Lv |
// Grade | เหตุผล |" table, then ends in one table that already restates all
// 7 axes' full level-ascending grade chains in one place ("## สรุปรวม 7
// axis" or "## สรุปเกรดรวม (7 axis × 20 เลเวล)", again depending on when the
// file was written).
//
// Two passes read two different things out of the same file:
//  1. The closing summary table gives each axis's authoritative grade per
//     level — compact, reliably formatted, no free text. This is the only
//     thing the parser read before 2026-08-18.
//  2. The 7 detailed per-axis sections above it give the *reasoning* behind
//     each level's grade — prose, checkpoint-style rows (grade holds until
//     the next row, "=lv2" meaning "same grade AND reason as the row for
//     level 2" — its own เหตุผล cell is just filler like "ไม่มีจุดเปลี่ยน"
//     and is ignored) or already-a-range rows depending on the file. This
//     is what lets the UI explain *why* a level's grade is what it is even
//     when no subclass feature overrides it — added 2026-08-18 after a user
//     asked why e.g. Fighter's baseline Damage jumping B→A right at level
//     11 (Two Extra Attacks) showed no explanation in level mode.
//
// If the file shape ever changes, update this parser to match.

import {
  LEVEL_AXIS_ORDER,
  extractGradeRangeTokens,
  applySegments,
  emptyLevelArray,
  matchAxisName,
  resolveCheckpointReasons,
  reasonAtLevel,
} from './levelTierGrading'

const SUMMARY_HEADING_RE = /^##\s*สรุป(?:รวม|เกรดรวม)/
const HEADING_RE = /^##\s+(.+)$/

export function parseLevelBaseline(raw) {
  const lines = raw.split('\n')
  const headingIdx = lines.findIndex((l) => SUMMARY_HEADING_RE.test(l.trim()))

  const axes = {}
  for (const axis of LEVEL_AXIS_ORDER) axes[axis] = emptyLevelArray()
  if (headingIdx === -1) return { axes, ok: false }

  for (let i = headingIdx + 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line.startsWith('##')) break // next section — table has ended
    if (!line.startsWith('|')) continue
    const cells = line.split('|').slice(1, -1).map((c) => c.trim())
    if (cells.length < 2) continue
    const axisCell = cells[0].replace(/\*/g, '').trim()
    const axis = LEVEL_AXIS_ORDER.find((a) => a === axisCell)
    if (!axis) continue // header row ("| Axis | ... |") or separator row
    applySegments(axes[axis], extractGradeRangeTokens(cells[1]))
  }

  attachDetailReasons(lines, headingIdx, axes)

  // A correctly-parsed baseline covers every one of the 20 levels for every
  // axis — this doesn't throw on a gap (a malformed/edited-by-hand file
  // shouldn't break the whole page) but callers can check `ok` and log/flag
  // it rather than silently rendering "—" everywhere for that class.
  const ok = LEVEL_AXIS_ORDER.every((axis) => axes[axis].slice(1).every(Boolean))
  return { axes, ok }
}

// Walks the per-axis detail sections that come BEFORE the closing summary
// table (lines[0..summaryHeadingIdx)) and writes real prose into each
// already-graded level cell's `reason` field, in place. Grades themselves
// are never touched here — only the summary-table pass above is trusted for
// those, since it's the compact, uniformly-formatted source.
function attachDetailReasons(lines, summaryHeadingIdx, axes) {
  let currentAxis = null
  const rows = [] // {axis, fromLv, toLv|null, isRef, reason}

  for (let i = 0; i < summaryHeadingIdx; i++) {
    const line = lines[i].trim()
    const headingMatch = line.match(HEADING_RE)
    if (headingMatch) {
      currentAxis = matchAxisName(headingMatch[1])
      continue
    }
    if (!currentAxis || !line.startsWith('|')) continue
    const cells = line.split('|').slice(1, -1).map((c) => c.trim())
    if (cells.length < 3) continue
    const lvMatch = cells[0].replace(/\*/g, '').match(/^(\d{1,2})\s*(?:[-–]\s*(\d{1,2}))?$/)
    if (!lvMatch) continue // header row ("| Lv | ... |"), separator row, or an unexpected Lv cell shape
    const fromLv = parseInt(lvMatch[1], 10)
    const toLv = lvMatch[2] ? parseInt(lvMatch[2], 10) : null
    const gradeCell = cells[1].replace(/\*/g, '').trim()
    const isRef = gradeCell.startsWith('=') // "=lv2" — same grade AND reason as level 2's row, own text is filler
    rows.push({ axis: currentAxis, fromLv, toLv, isRef, reason: cells[2].replace(/\*\*/g, '').trim() || null })
  }

  const resolved = resolveCheckpointReasons(rows)
  for (const axis of LEVEL_AXIS_ORDER) {
    for (let lv = 1; lv <= 20; lv++) {
      if (axes[axis][lv]) axes[axis][lv].reason = reasonAtLevel(resolved, axis, lv)
    }
  }
}
