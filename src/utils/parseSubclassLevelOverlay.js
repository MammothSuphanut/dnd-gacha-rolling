// Structured reader for codex/2024-tier-list/<class>-subclass-level-overlay.md
// — the "ชั้น 2" (Subclass Overlay) file of the level-indexed tier system.
// Every file's stated convention is the same (delta-only: only axes/levels
// that grade differently from that class's Class Baseline are ever written
// down; anything not mentioned equals baseline) but the concrete markup
// used to say so drifted across the 30 files as they were written over
// several sessions (see 00-level-progress.md). Three shapes show up:
//
//  (a) one "**สรุปเกรด**: Axis: chain | Axis: chain | ..." line per
//      subclass that already gives each axis's FULL resolved 1-20 chain,
//      not just the delta (Alchemist, Artificer, Sacred Knight)
//  (b) a "| Axis | Lv | Grade | เหตุผล |" table where the Lv cell is
//      already an explicit level/range, or an em-dash meaning "no delta,
//      skip this row, it already equals baseline" (Channeler, Monster
//      Hunter, Mystic, Tactician)
//  (c) bare bullets "- **Axis**: chain — เหตุผล", one per changed axis, no
//      table at all — the ">10 subclass" abbreviated format used by the
//      other 23 classes
//
// This auto-detects per subclass block rather than trusting the filename,
// since a per-block check is just as cheap and won't silently go stale if a
// class's format changes later. A block matching none of the three (a
// subclass documented as "ไม่มี delta — เท่ากับ baseline ทั้ง 20 เลเวล 7
// axis", e.g. Channeler's Order of Blinknights) correctly yields {} —
// zero overrides, i.e. pure baseline.
//
// If new files drift into a 4th shape, extend parseBlock() to match.

import { stripHeadingDecoration } from './stripHeadingDecoration'
import {
  extractGradeRangeTokens,
  extractGradeRangeTokensWithReasons,
  matchAxisName,
  resolveCheckpointReasons,
  reasonAtLevel,
} from './levelTierGrading'

const HEADING_RE = /^##\s+(.+)$/
const SUMMARY_MARKER = '**สรุปเกรด**:'
const SKIP_LV_RE = /^[—–-]+$/

function isTableRow(line) {
  return line.startsWith('|') && line.endsWith('|')
}
function isTableRuleRow(cells) {
  return cells.every((c) => /^:?-+:?$/.test(c))
}

// Shared by paths (a) and (b) below — both read a "| Axis | Lv | Grade |
// เหตุผล |" table, just for different purposes (path (a) mines it only for
// reasons, path (b) reads grades from it directly).
function extractTableRows(blockLines) {
  return blockLines
    .map((l) => l.trim())
    .filter(isTableRow)
    .map((l) => l.split('|').slice(1, -1).map((c) => c.trim()))
    .filter((cells) => cells.length >= 3 && !isTableRuleRow(cells) && !/^axis$/i.test(cells[0]))
}

function parseBlock(blockLines) {
  const overrides = {}
  function push(axis, from, to, grade, reason) {
    if (!axis || !grade) return
    ;(overrides[axis] ||= []).push({ from, to, grade, reason: reason || null })
  }

  // (a) — a single summary line already gives every axis's full chain, but
  // it has no reasons of its own. The 3 classes using this format
  // (Alchemist/Artificer/Sacred Knight) ALSO write a per-level "| Axis | Lv
  // | Grade | เหตุผล |" checkpoint table above the summary line (the same
  // shape path (b) reads directly) — pull reasons from there instead,
  // keyed by (axis, level), so a level that's a real subclass-driven change
  // still shows why, not just what.
  const summaryLine = blockLines.find((l) => l.includes(SUMMARY_MARKER))
  if (summaryLine) {
    const detailRows = extractTableRows(blockLines)
      .map(([axisCell, lvCell, , reasonCell]) => {
        const axis = matchAxisName(axisCell)
        const lvMatch = lvCell.match(/^(\d{1,2})\s*(?:[-–]\s*(\d{1,2}))?$/)
        if (!axis || !lvMatch) return null
        return {
          axis,
          fromLv: parseInt(lvMatch[1], 10),
          toLv: lvMatch[2] ? parseInt(lvMatch[2], 10) : null,
          reason: (reasonCell || '').replace(/\*\*/g, '').trim() || null,
        }
      })
      .filter(Boolean)
    const resolvedReasons = resolveCheckpointReasons(detailRows)

    const payload = summaryLine.slice(summaryLine.indexOf(SUMMARY_MARKER) + SUMMARY_MARKER.length)
    for (const segment of payload.split('|')) {
      const axis = matchAxisName(segment)
      if (!axis) continue
      for (const t of extractGradeRangeTokens(segment)) push(axis, t.from, t.to, t.grade, reasonAtLevel(resolvedReasons, axis, t.from))
    }
    return overrides
  }

  // (b) — a per-axis table with the Lv cell already an explicit range.
  const tableRows = extractTableRows(blockLines)

  if (tableRows.length > 0) {
    for (const [axisCell, lvCell, gradeCell, reasonCell] of tableRows) {
      if (SKIP_LV_RE.test(lvCell) || lvCell === '') continue // "no delta" row
      const axis = matchAxisName(axisCell)
      if (!axis) continue // a grouped "*(Axis/Axis/...)*" no-op row, or unrecognized label
      const rangeMatch = lvCell.match(/^(\d{1,2})\s*(?:[-–]\s*(\d{1,2}))?$/)
      if (!rangeMatch) continue
      const from = parseInt(rangeMatch[1], 10)
      const to = rangeMatch[2] ? parseInt(rangeMatch[2], 10) : from
      const gradeMatch = gradeCell.match(/[SABCD]/)
      if (!gradeMatch) continue
      push(axis, from, Math.min(to, 20), gradeMatch[0], reasonCell.replace(/\*\*/g, '').trim())
    }
    return overrides
  }

  // (c) — bare bullets, one per changed axis.
  const bulletRe = /^-\s*\*{0,2}([A-Za-z][A-Za-z ]*?)\*{0,2}\s*[:=]\s*(.*)$/
  for (const raw of blockLines) {
    const line = raw.trim()
    const m = line.match(bulletRe)
    if (!m) continue
    const axis = matchAxisName(m[1])
    if (!axis) continue // not an axis bullet (e.g. a numbered finding elsewhere in the file)
    for (const t of extractGradeRangeTokensWithReasons(m[2])) push(axis, t.from, t.to, t.grade, t.reason)
  }
  return overrides
}

export function parseSubclassLevelOverlay(raw) {
  const lines = raw.split('\n')
  const headingIdxs = []
  lines.forEach((l, i) => {
    if (HEADING_RE.test(l.trim())) headingIdxs.push(i)
  })

  const subclasses = []
  for (let h = 0; h < headingIdxs.length; h++) {
    const start = headingIdxs[h]
    const end = h + 1 < headingIdxs.length ? headingIdxs[h + 1] : lines.length
    const headingText = lines[start].trim().match(HEADING_RE)[1]
    const name = stripHeadingDecoration(headingText)
    // Non-subclass footer sections ("## ข้อค้นพบสำคัญ", "## สรุปเกรดพีค...")
    // parse fine as a "block" here but simply won't match any real subclass
    // name when the caller looks it up against class-subclass-index.md —
    // no separate heading-exclusion list needed.
    subclasses.push({ name, overrides: parseBlock(lines.slice(start + 1, end)) })
  }
  return { subclasses }
}
