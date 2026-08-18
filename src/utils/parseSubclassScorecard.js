// Structured reader for codex/2024-tier-list/<class>-subclass-scorecard-2024.md
// — the 2026-08-07 methodology rework's per-class file, which replaced the
// old prose tier-list corpus (see 00-scorecard-methodology.md). Shape: intro
// text, a "## Class Baseline (...)" section, then one "## Subclass Scoring
// (N)" section containing a summary table followed by one flat "### <Name>"
// subsection per subclass (no tier grouping — tier lives inline per
// subclass, see below), each with a "| Axis | คะแนน | เหตุผล |" table and an
// optional "**Overall**: <Tier> — <reason>" line just above it.
//
// A subclass heading may carry a trailing "(Source [icons])" parenthetical
// (e.g. "### Path of Heavy Metal (VSS 🕰️)") and/or a trailing "— role/flavor
// blurb" (e.g. "### Amorist — สาย charm/social control", Alchemist's file
// only, so far) — both stripped here since class-subclass-index.md already
// carries the canonical source/edition/book, and the blurb is prose, not data.
//
// "**Overall**" is optional: methodology allows classes to have full 7-axis
// scoring before their Overall Tier judgment call is written — see
// 00-scorecard-methodology.md § การเขียน Overall Tier. Subclasses missing it
// come back with tier: null, which callers should treat as "not yet ranked",
// not an error.
//
// If the file shape ever changes, update this parser to match.

import { stripHeadingDecoration } from './stripHeadingDecoration'

// Usually "## Subclass Scoring (N)", but Sacred Knight's file (its subclass
// concept is called a "Sacred Throne", not a plain "subclass") uses
// "## Subclass (Sacred Throne) Scoring (N)" instead — allow anything between
// the two words rather than force that file to match the generic wording.
const SCORING_HEADING_RE = /^##\s+Subclass\b.*\bScoring/
const SUBCLASS_HEADING_RE = /^###\s+(.+)$/
const OVERALL_RE = /^\*\*Overall\*\*:\s*([SABCD](?:\/[SABCD])*)\s*(?:—|-)\s*(.+)$/
const AXIS_SCORE_RE = /(\d+)\s*\/\s*10\s*\(([SABCD])\)/

export function parseSubclassScorecard(raw) {
  const lines = raw.split('\n')
  const scoringIdx = lines.findIndex((l) => SCORING_HEADING_RE.test(l.trim()))
  const header = (scoringIdx === -1 ? lines : lines.slice(0, scoringIdx)).join('\n').trim()

  const subclasses = []
  let current = null

  for (let i = scoringIdx === -1 ? lines.length : scoringIdx; i < lines.length; i++) {
    const line = lines[i]

    const headingMatch = line.match(SUBCLASS_HEADING_RE)
    if (headingMatch) {
      const name = stripHeadingDecoration(headingMatch[1])
      current = { name, tier: null, overallReason: '', axes: [] }
      subclasses.push(current)
      continue
    }

    if (!current) continue // still inside the summary table / intro, before the first "### Name"

    const trimmed = line.trim()
    const overallMatch = trimmed.match(OVERALL_RE)
    if (overallMatch) {
      current.tier = overallMatch[1]
      current.overallReason = overallMatch[2].trim()
      continue
    }

    if (line.startsWith('| Axis |') || line.startsWith('|---')) continue
    if (!line.startsWith('|')) continue

    const cells = line.split('|').slice(1, -1).map((c) => c.trim())
    if (cells.length < 3) continue
    const [axisRaw, scoreCell, reason] = cells
    const axis = axisRaw.replace(/\*\*/g, '').trim()
    const scoreMatch = scoreCell.match(AXIS_SCORE_RE)
    current.axes.push({
      axis,
      score: scoreMatch ? scoreMatch[1] : scoreCell,
      grade: scoreMatch ? scoreMatch[2] : '',
      reason,
    })
  }

  return { header, subclasses }
}
