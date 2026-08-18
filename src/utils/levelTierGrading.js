// Shared constants + helpers for the level-indexed (1-20) tier system — see
// codex/2024-tier-list/00-level-anchor-rubric.md. Used by
// parseLevelBaseline.js and parseSubclassLevelOverlay.js to turn the
// project's prose-heavy analysis docs into per-level grade arrays, and by
// CodexClassBrowser to derive an "Overall" tier per level, which the docs
// themselves never compute (they only ever grade the 7 axes per level — see
// 00-level-anchor-rubric.md). The derivation reuses
// 00-scorecard-methodology.md's point formula unchanged (confirmed with
// user 2026-08-18 as the right way to fill that gap, rather than inventing
// a new one).

export const LEVEL_AXIS_ORDER = ['Damage', 'Control', 'Support', 'Survivability', 'Action Economy', 'Utility', 'Versatility']

// Longest-name-first so "Action Economy" is tried before any shorter name
// that might otherwise prefix-match part of it.
const AXIS_ALTERNATION = [...LEVEL_AXIS_ORDER].sort((a, b) => b.length - a.length).map((a) => a.replace(/\s+/g, '\\s+'))
const AXIS_NAME_RE = new RegExp(`^(${AXIS_ALTERNATION.join('|')})\\b`, 'i')

// Every grade-range token used across all 30 baseline/overlay files —
// however it's decorated with markdown (bold, an unmatched trailing paren
// from a source typo, etc.) — reduces to "<letter>(<num>[-<num>])"
// somewhere in the text. Deliberately doesn't require the closing ")" so it
// survives the occasional malformed "**S(3-20**, reason)" seen in a few
// files (e.g. craftsman-subclass-level-overlay.md).
const TOKEN_RE = /([SABCD])\s*\(\s*(\d{1,2})\s*(?:[-–]\s*(\d{1,2}))?/g

// Pulls every (grade, fromLv, toLv) triple out of a chunk of text, in the
// order written — always level-ascending in these docs.
export function extractGradeRangeTokens(text) {
  const tokens = []
  let m
  TOKEN_RE.lastIndex = 0
  while ((m = TOKEN_RE.exec(text))) {
    const from = parseInt(m[2], 10)
    const to = m[3] ? parseInt(m[3], 10) : from
    if (from >= 1 && from <= 20) tokens.push({ grade: m[1], from, to: Math.min(to, 20) })
  }
  return tokens
}

// Pulls every (grade, fromLv, toLv, reason) out of a bullet's chain text,
// e.g. "A(1-2)→**S(3-20)** — reason for the whole jump" or the malformed
// "A(1-2)→**S(3-20**, reason crammed inside the unclosed paren)" style some
// files use. A token's own reason is whatever text sits in the gap between
// it and the next token (or end of string for the last one), since that's
// where each source puts it either way — a naive "grab everything after the
// last dash" (the first version of this function) truncated multi-word
// reasons whenever the reason text itself contained a plain hyphen, e.g.
// "...หลุด floor — narrow)" losing the "...หลุด floor" half. If a token's own
// gap is empty (the common well-formed-chain convention, where only the
// final segment carries a reason that explains the *whole* progression),
// it's backfilled from the next token's reason so every segment still shows
// something.
export function extractGradeRangeTokensWithReasons(text) {
  // A few bullets add a bracketed aside noting a level range that's
  // unaffected — e.g. Rogue's "B(1-2)→A(3-16) [S(17-20) เท่า baseline] —
  // reason" — which TOKEN_RE would otherwise misread as a 3rd real chain
  // token, splitting the real reason in half right after the "[". Mask out
  // "[...]" spans before matching (by index, not content) so a token inside
  // one is skipped; the bracket text itself is left in the surrounding gap
  // text and cleaned up below instead of being read as its own segment.
  const bracketSpans = [...text.matchAll(/\[[^\]]*\]/g)].map((m) => [m.index, m.index + m[0].length])
  const insideBracket = (idx) => bracketSpans.some(([s, e]) => idx >= s && idx < e)

  const matches = [...text.matchAll(TOKEN_RE)].filter((m) => !insideBracket(m.index))
  const tokens = []
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i]
    const from = parseInt(m[2], 10)
    if (from < 1 || from > 20) continue
    const to = m[3] ? parseInt(m[3], 10) : from
    const gapStart = m.index + m[0].length
    const gapEnd = i + 1 < matches.length ? matches[i + 1].index : text.length
    let reason = text
      .slice(gapStart, gapEnd)
      // a malformed source's own unmatched ")" from the previous token, any
      // bold-markers closing it out ("**"), then the "," that actually
      // introduces this reason (or an em/en dash in the well-formed
      // convention) — either way, drop it
      .replace(/^[)*]*\s*[,—–-]?\s*/, '')
      // a leading "[...]" aside (see above) noting an unaffected range —
      // real content, but not part of this segment's own explanation
      .replace(/^\[[^\]]*\]\s*[—–-]?\s*/, '')
      // trailing connective noise before the next token starts (bold
      // markers, the chain arrow, whitespace)
      .replace(/[\s*→]+$/, '')
      .replace(/\*\*/g, '')
      .trim()
    // A malformed source's reason often ends with the "(" it opened right
    // after the letter+range — that open paren was consumed by TOKEN_RE
    // itself, not left in this slice, so a trailing ")" here is almost
    // always its unmatched close, not a real one — strip it unless the
    // reason text has a "(" of its own to legitimately pair it with.
    if (reason.endsWith(')') && (reason.match(/\(/g) || []).length < (reason.match(/\)/g) || []).length) {
      reason = reason.slice(0, -1).trim()
    }
    tokens.push({ grade: m[1], from, to: Math.min(to, 20), reason: reason || null })
  }
  for (let i = tokens.length - 2; i >= 0; i--) {
    if (!tokens[i].reason) tokens[i].reason = tokens[i + 1].reason
  }
  return tokens
}

// Resolves "checkpoint" rows — one row per level a grade *changes*, holding
// until the next row for that axis (or level 20 if it's the last) — into
// per-axis reason segments with concrete [fromLv, toLv] ranges. Shared by
// parseLevelBaseline.js (its 7 detailed "## <Axis> Axis" sections, where
// `isRef` rows are the "=lv2" backreferences that inherit level 2's grade
// AND reason rather than stating their own) and parseSubclassLevelOverlay.js
// (its per-block "| Axis | Lv | Grade | เหตุผล |" table, before the
// **สรุปเกรด** summary line those same 3 classes also write — that summary
// line is authoritative for grades, but has no reasons of its own, so this
// table is the only place those levels' reasons exist).
//
// rows: [{axis, fromLv, toLv (nullable — inferred if so), reason, isRef?}],
// not necessarily sorted. Returns { [axis]: [{fromLv, toLv, reason}] }.
export function resolveCheckpointReasons(rows) {
  const byAxis = new Map()
  for (const r of rows) {
    if (!byAxis.has(r.axis)) byAxis.set(r.axis, [])
    byAxis.get(r.axis).push({ ...r })
  }
  const result = {}
  for (const [axis, axisRows] of byAxis) {
    axisRows.sort((a, b) => a.fromLv - b.fromLv)
    for (let i = 0; i < axisRows.length; i++) {
      if (axisRows[i].toLv == null) axisRows[i].toLv = i + 1 < axisRows.length ? axisRows[i + 1].fromLv - 1 : 20
    }
    let carryReason = null
    result[axis] = axisRows.map((row) => {
      if (!row.isRef) carryReason = row.reason
      return { fromLv: row.fromLv, toLv: row.toLv, reason: carryReason }
    })
  }
  return result
}

// Looks up the reason covering a specific level from resolveCheckpointReasons'
// output, or null if that axis/level isn't covered by any row.
export function reasonAtLevel(resolvedByAxis, axis, lv) {
  const segs = resolvedByAxis[axis]
  if (!segs) return null
  const seg = segs.find((s) => lv >= s.fromLv && lv <= s.toLv)
  return seg ? seg.reason : null
}

// Matches a known axis name at the start of a string (after stripping
// leading markdown decoration like "**", "*(", "_"), returning the
// canonical LEVEL_AXIS_ORDER spelling or null if it isn't one.
export function matchAxisName(text) {
  const cleaned = text.replace(/^[\s*_(]+/, '').trim()
  const m = cleaned.match(AXIS_NAME_RE)
  if (!m) return null
  const normalized = m[1].replace(/\s+/g, ' ').toLowerCase()
  return LEVEL_AXIS_ORDER.find((a) => a.toLowerCase() === normalized) || null
}

export function emptyLevelArray() {
  return new Array(21).fill(null) // index 0 unused, 1-20 = character level
}

// Writes {grade, reason} into every level a list of (grade, from, to,
// reason?) segments covers, later segments winning on overlap (shouldn't
// happen in practice — these docs write segments in non-overlapping
// ascending order — but last-write-wins is the sane default if one ever
// does).
export function applySegments(levelArray, segments) {
  for (const seg of segments) {
    for (let lv = Math.max(1, seg.from); lv <= Math.min(20, seg.to); lv++) {
      levelArray[lv] = { grade: seg.grade, reason: seg.reason || null }
    }
  }
  return levelArray
}

// Layers a subclass's override segments (partial — only axes/levels that
// differ from the Class Baseline are ever present, per every overlay file's
// stated convention) onto that class's already-resolved baseline grid,
// producing one full 1-20 grid per axis for the subclass.
export function resolveLevelGrid(baselineAxes, overrideSegmentsByAxis) {
  const grid = {}
  for (const axis of LEVEL_AXIS_ORDER) {
    const arr = [...(baselineAxes[axis] || emptyLevelArray())]
    const segs = overrideSegmentsByAxis?.[axis]
    if (segs) {
      for (const seg of segs) {
        for (let lv = Math.max(1, seg.from); lv <= Math.min(20, seg.to); lv++) {
          // A few overlay files (see parseSubclassLevelOverlay.js's path
          // (a), the "summary line" classes: Alchemist/Artificer/Sacred
          // Knight) restate the FULL resolved chain per axis rather than
          // just the delta from baseline, so some of these "override"
          // segments are really just the baseline value copied verbatim
          // with no reason of its own. Don't let a reason-less restatement
          // like that clobber the baseline's real explanation for that
          // level — only a segment that actually changes the grade, or
          // carries its own reason, wins.
          if (!seg.reason && arr[lv]?.grade === seg.grade) continue
          arr[lv] = { grade: seg.grade, reason: seg.reason || null }
        }
      }
    }
    grid[axis] = arr
  }
  return grid
}

const GRADE_POINTS = { S: 3, A: 2, B: 1, C: 0, D: -1 }

// The 00-scorecard-methodology.md point formula (S=+3..D=-1 per axis,
// summed over all 7, thresholded at 15/12/9/6 — see that doc for where the
// thresholds come from) — reused here to derive an "Overall at level N"
// since the level-indexed docs only ever grade the 7 axes, never a combined
// score, per level. Returns null if any axis grade is missing (incomplete
// data — callers should render that as "unranked", not guess).
export function overallFromAxisGrades(gradeByAxis) {
  let sum = 0
  for (const axis of LEVEL_AXIS_ORDER) {
    const g = gradeByAxis[axis]
    if (!g || !(g in GRADE_POINTS)) return null
    sum += GRADE_POINTS[g]
  }
  if (sum >= 15) return 'S'
  if (sum >= 12) return 'A'
  if (sum >= 9) return 'B'
  if (sum >= 6) return 'C'
  return 'D'
}

// Pseudo 0-10 score used only to drive AxisRadarChart's polygon math in
// level mode (that chart expects a numeric magnitude, not a letter) — evenly
// spaced quarters of the 0-10 scale, not a real measurement, so the UI never
// prints it as if it were one (see CodexClassBrowser's isLevelMode guard).
const RADAR_SCORE_BY_GRADE = { D: 0, C: 2.5, B: 5, A: 7.5, S: 10 }
export function gradeToRadarScore(grade) {
  return RADAR_SCORE_BY_GRADE[grade] ?? 0
}
