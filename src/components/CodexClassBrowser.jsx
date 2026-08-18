import { Fragment, useMemo, useState } from 'react'
import Modal from './Modal'
import { LINK_CLASS } from './AdventureMarkdownView'
import { getHomebrewRule } from '../utils/homebrewRules'
import { parseClassSubclassIndex } from '../utils/parseClassSubclassIndex'
import { parseSubclassScorecard } from '../utils/parseSubclassScorecard'
import { mergeCodexClassData } from '../utils/mergeCodexClassData'
import { parseLevelBaseline } from '../utils/parseLevelBaseline'
import { parseSubclassLevelOverlay } from '../utils/parseSubclassLevelOverlay'
import { LEVEL_AXIS_ORDER, resolveLevelGrid, overallFromAxisGrades, gradeToRadarScore } from '../utils/levelTierGrading'
import classesBoxes from '../data/classes.json'

// Core = the 12 classic PHB classes; every other class (including official
// non-PHB ones like Artificer/Mystic, and all 3rd-party/homebrew classes) is
// Supplement. This isn't derivable from class-subclass-index.md's "Official"
// vs publisher-name book line (Artificer/Mystic are both "Official" there
// but aren't PHB core) — classes.json's gacha roll table already tags each
// class's subclass items with the canonical "Core"/"Supplement" split the
// user wants mirrored here, so read it from there instead of re-deriving it.
const CORE_CLASS_NAMES = new Set(
  classesBoxes.flatMap((box) => box.items.filter((item) => item.tag === 'Core').map((item) => item.group))
)

// Standard grade order — tier data now comes from each class's own
// *-subclass-scorecard-2024.md (inline "**Overall**: <Tier>" per subclass,
// see 00-scorecard-methodology.md), not a single cross-class rollup doc, so
// there's no generated ordering to read; S/A/B/C/D is always the right order.
const TIER_ORDER = ['S', 'A', 'B', 'C', 'D']

// Shared with the level-indexed parsers (levelTierGrading.js) so the axis
// list can't drift between the two tier systems.
const AXIS_ORDER = LEVEL_AXIS_ORDER
const AXIS_SHORT = {
  Damage: 'Dmg',
  Control: 'Ctrl',
  Support: 'Sup',
  Survivability: 'Surv',
  'Action Economy': 'AE',
  Utility: 'Util',
  Versatility: 'Vers',
}

// "Monster Hunter" -> "monster-hunter", matching how per-class doc slugs
// are named (see generate-subclass-overview-tier-list.cjs's inverse,
// classNameFromFile).
function classSlug(className) {
  return className.toLowerCase().replace(/\s+/g, '-')
}

const CELL_CLASS = 'border border-[#e2cfb3] px-2 py-1 align-top text-stone-700'
const UNRANKED = 'unranked'

// class-subclass-index.md doesn't dedupe a subclass that got renamed between
// editions — 5etools mirrors both the pre-2024 name (linked via a generic
// search.html query, book usually still says "(2014)" even though the row's
// Edition column is mislabeled "2024") and the true 2024-native reprint
// (linked via classes.html) as two separate rows. The scorecard files follow
// the project's 2024-only-scope rule and score the subclass exactly once —
// so the old-name row has nothing to match by exact string comparison. This
// maps each such old name to whichever name the scorecard actually scored it
// under. When the 2024-named row is also present in the index (the normal
// case), the old-name row is dropped entirely so the subclass shows once,
// under its current name — see the `.filter()` above the `.map()` that uses
// this table. If the 2024 row is ever missing from the index, the old-name
// row is kept and just borrows the same tier via this alias instead of
// showing a false "unranked". See project_scorecard_methodology_rework
// memory, "reconciliation gotcha".
// Every pair here was cross-checked against the source JSON's own
// `reprintedAs` field (5etools' authoritative old-name→new-name link), not
// guessed from string similarity — e.g. Warlock's "Archfey Patron" etc. did
// turn out to be the genuine 2024 PHB content (confirmed by its 2024-only
// "Steps of the Fey" feature text), not a leftover playtest name as first
// suspected; the scorecard file just still carries the old label "The
// Archfey" as its heading, which is a legal alias, not a scoring error.
const RENAMED_SUBCLASS_ALIASES = {
  Druid: { 'circle of stars': 'circle of the stars' },
  Fighter: { 'the bulwark warrior': 'bulwark warrior' },
  Monk: {
    'way of mercy': 'warrior of mercy',
    'way of pride': 'warrior of pride',
    'way of shadow': 'warrior of shadow',
    'way of street fighting': 'warrior of the street',
    'way of the leaden crown': 'warrior of the leaden crown',
    'way of the open hand': 'warrior of the open hand',
  },
  Sorcerer: {
    'aberrant mind': 'aberrant sorcery',
    'clockwork soul': 'clockwork sorcery',
    'draconic bloodline': 'draconic sorcery',
    'haunted': 'haunted sorcery',
    'shadow magic': 'shadow sorcery',
    'wild magic': 'wild magic sorcery',
    'wretched bloodline': 'wretched bloodline sorcery',
  },
  Warden: {
    'bloodwrath guardian': 'beastblood guardian',
  },
  Warlock: {
    'archfey patron': 'the archfey',
    'celestial patron': 'the celestial',
    'fiend patron': 'the fiend',
    'great old one patron': 'the great old one',
    'the first vampire': 'the first vampire patron',
    'the future you': 'future you patron',
    'the parasite': 'the parasite patron',
  },
  Wizard: {
    bladesinging: 'bladesinger',
    'mystic savant': 'mystic strategist',
    'school of abjuration': 'abjurer',
    'school of chronomancy': 'chronomancer',
    'school of divination': 'diviner',
    'school of evocation': 'evoker',
    'school of gastronomy': 'gastronomer',
    'school of illusion': 'illusionist',
    'school of sangromancy': 'sangromancer',
    'school of somnomancy': 'somnomancer',
  },
}

// A handful of the level-indexed overlay files (Barbarian/Bard, mostly)
// drop each subclass's common badge-word prefix ("Path of the ", "College
// of ", "Order of the ", ...) from its own "## " heading — e.g. Barbarian's
// heading is just "## Berserker", not "## Path of the Berserker" like
// class-subclass-index.md and every scorecard file use. This gives a
// couple of extra lookup keys to try, after the exact/alias matches used
// for the old scorecard system, before falling back to the class's plain
// baseline (tried both with and without a following "the" kept, since some
// subclasses keep it as part of their own short name — Bard's "College of
// the Mad God" maps to the overlay's own "## the Mad God").
const OVERLAY_PREFIX_WORD_RE = /^(path|college|circle|order|way|oath|school|warrior|throne|house|burden|guild)\s+of\s+/i
function overlayCoreNameCandidates(indexName) {
  const withThe = indexName.replace(OVERLAY_PREFIX_WORD_RE, '').trim()
  const noThe = withThe.replace(/^the\s+/, '').trim()
  return [withThe, noThe].filter((n) => n && n !== indexName)
}

// Resolves one subclass's full 1-20×7-axis level-indexed grid: the class's
// Class Baseline with its matching Subclass Overlay block (if any) layered
// on top. A subclass with no matching overlay block at all quietly falls
// back to the plain baseline (zero overrides) rather than "no data" — the
// correct default per every overlay file's own "unlisted = equals baseline"
// convention (see overlayCoreNameCandidates' comment for the one genuine
// documentation gap this covers, Captain's Adrenaline Junkie/Brigand).
function attachLevelGrid(s, overlayByName, aliases, levelBaseline) {
  const indexName = s.name.trim().toLowerCase()
  const candidates = [
    indexName,
    indexName.replace(/\s*\([^)]*\)\s*$/, '').trim(),
    aliases?.[indexName],
    ...overlayCoreNameCandidates(indexName),
  ].filter(Boolean)
  let ov
  for (const key of candidates) {
    ov = overlayByName.get(key)
    if (ov) break
  }
  return resolveLevelGrid(levelBaseline.axes, ov?.overrides)
}

const TIER_BADGE_CLASS = {
  S: 'bg-violet-100 text-violet-800 border-violet-300',
  A: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  B: 'bg-sky-100 text-sky-800 border-sky-300',
  C: 'bg-amber-100 text-amber-800 border-amber-300',
  D: 'bg-stone-200 text-stone-600 border-stone-300',
}

function tierBadgeClass(tier) {
  // Composite tiers like "S/A" borrow the color of their first letter.
  return TIER_BADGE_CLASS[tier?.[0]] || 'bg-stone-100 text-stone-400 border-stone-300'
}

// Plain badge everywhere except the class-grouped table, where it doubles as
// a button opening the detail modal (that table has no room for a
// "หมายเหตุ" column of its own — see the tier-grouped table, which prints it
// as a full column instead and doesn't need this).
function TierBadge({ tier, onClick }) {
  if (!tier) return <span className="text-xs text-stone-400">—</span>
  const badgeClass = `inline-flex items-center justify-center rounded border px-1.5 py-0.5 text-xs font-bold ${tierBadgeClass(tier)}`
  if (!onClick) return <span className={badgeClass}>{tier}</span>
  return (
    <button type="button" onClick={onClick} title="ดูรายละเอียด" className={`${badgeClass} cursor-pointer hover:brightness-95`}>
      {tier}
    </button>
  )
}

function toggled(set, value) {
  const next = new Set(set)
  if (next.has(value)) next.delete(value)
  else next.add(value)
  return next
}

// "ขั้นต่ำ" (minimum) mode for an axis's tier filter: selecting a grade also
// admits every grade ranked above it (TIER_ORDER runs best-to-worst, S
// first), not just an exact match. With several grades selected at once the
// loosest one wins — e.g. A + C both selected means "at least C" already
// covers "at least A" — so only the worst selected grade's cutoff matters.
function expandMinimum(selected) {
  if (!selected.size) return selected
  let worstIdx = -1
  for (const grade of selected) worstIdx = Math.max(worstIdx, TIER_ORDER.indexOf(grade))
  return new Set(TIER_ORDER.slice(0, worstIdx + 1))
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${active
        ? 'border-violet-400 bg-violet-100 text-violet-800'
        : 'border-[#e2cfb3] bg-white text-stone-600 hover:bg-[#f5ede0]'
        }`}
    >
      {children}
    </button>
  )
}

function FilterRow({ label, options, selected, onToggle, extra }) {
  if (options.length === 0) return null
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {label && <span className="mr-1 text-xs font-semibold text-stone-500">{label}:</span>}
      {extra}
      {options.map((option) => (
        <FilterChip key={option} active={selected.has(option)} onClick={() => onToggle(option)}>
          {option}
        </FilterChip>
      ))}
    </div>
  )
}

// One S/A/B/C/D toggle button, shared by every cell of TierMatrix — same
// visual language as TierBadge (tierBadgeClass) but sized for a dense grid
// and always clickable (toggles a filter, never opens the detail modal).
function TierCell({ tier, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={tier}
      className={`inline-flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${active ? `${tierBadgeClass(tier)} shadow-sm` : 'border-[#e2cfb3] bg-white text-stone-400 hover:border-violet-300 hover:text-stone-600'
        }`}
    >
      {tier}
    </button>
  )
}

const TIER_FILTER_MODES = [
  { value: 'exact', label: 'ตรงตามเงื่อนไข' },
  { value: 'min', label: 'ขั้นต่ำ' },
]

// Per-axis "exact match vs. minimum threshold" toggle — only meaningful for
// the 7 axis rows, not the Overall row (Overall already has its own S/A/B/C/D
// grouping in the tier-list view, so it stays exact-only). Must be
// inline-flex, not flex: this sits alone inside a CSS Grid cell (see
// TierMatrix), and a block-level flex box defaults to filling all available
// track width instead of hugging its own two buttons.
function TierFilterModeToggle({ mode, onChange }) {
  return (
    <div className="inline-flex items-center overflow-hidden rounded-full border border-[#e2cfb3] bg-white text-[10px] shadow-sm">
      {TIER_FILTER_MODES.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`whitespace-nowrap px-2 py-1 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${mode === opt.value ? 'bg-violet-600 text-white' : 'text-stone-500 hover:bg-[#f5ede0]'
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// Condenses what used to be 8 separate FilterRow strips (Overall Tier + one
// per axis, each repeating the S/A/B/C/D labels) into a single grid — the
// column header prints S/A/B/C/D exactly once instead of 8 times, cutting
// the filter panel's height roughly in half. Built as a CSS Grid rather than
// a <table>: an HTML table's auto layout algorithm dumps all of a row's
// leftover width into whichever cell has no explicit width (the mode-toggle
// column here), stretching it into a huge empty box — a grid with explicit
// track sizes doesn't have that failure mode. Rows carrying `onModeChange`
// (the 7 axis rows) get the exact/minimum toggle in the middle column;
// Overall has none, so that cell is left blank for it.
function TierMatrix({ rows }) {
  return (
    <div
      className="grid w-fit items-center gap-x-4 gap-y-1.5"
      style={{ gridTemplateColumns: 'max-content max-content repeat(5, 2.25rem)' }}
    >
      <div />
      <div />
      {TIER_ORDER.map((t) => (
        <div key={t} className="pb-1 text-center text-xs font-semibold text-stone-500">
          {t}
        </div>
      ))}
      {rows.map((row) => (
        <Fragment key={row.label}>
          <div className={`whitespace-nowrap text-right text-sm font-medium ${row.onModeChange ? 'text-stone-600' : 'text-stone-800'}`}>
            {row.label}
          </div>
          <div>{row.onModeChange && <TierFilterModeToggle mode={row.mode} onChange={row.onModeChange} />}</div>
          {TIER_ORDER.map((t) => (
            <div key={t} className="flex justify-center">
              <TierCell tier={t} active={row.selected.has(t)} onClick={() => row.onToggle(t)} />
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  )
}

const BOOK_SCOPE_OPTIONS = [
  { value: 'both', label: 'ทั้งคู่' },
  { value: 'class', label: 'Class' },
  { value: 'subclass', label: 'Subclass' },
]

function BookScopeToggle({ value, onChange }) {
  return (
    <div className="flex items-center overflow-hidden rounded-full border border-[#e2cfb3] bg-white text-[11px]">
      {BOOK_SCOPE_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-2 py-1 font-medium transition-colors ${value === opt.value ? 'bg-violet-100 text-violet-800' : 'text-stone-500 hover:bg-[#f5ede0]'
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// N-axis radar chart for a subclass's 7-axis scorecard breakdown — same
// concentric-polygon construction as CharacterPage's StatsRadarChart
// (StatsRadarChart is fixed to the 6 ability scores; this generalizes the
// angle math to any axis count instead of hardcoding Math.PI/3). Score is
// read as the leading number out of each axis's "X/10" string (see the
// scoring methodology at the top of *-subclass-scorecard-2024.md) — a fixed
// 0-10 scale, not the coarser S/A/B/C/D grade, so the shape stays precise
// between two axes that share a grade but not a score.
function AxisRadarChart({ axes }) {
  const n = axes.length
  const cx = 110
  const cy = 110
  const r = 70
  const size = 220
  const maxVal = 10
  const levels = [0.25, 0.5, 0.75, 1.0]

  function pointAt(idx, radius) {
    const angle = -Math.PI / 2 + (idx * 2 * Math.PI) / n
    return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]
  }

  return (
    <div className="flex aspect-square w-full max-w-[220px] shrink-0 select-none items-center justify-center rounded-lg border border-[#e2cfb3] bg-[#fdfbf8]/80 p-2 shadow-inner">
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        <defs>
          <radialGradient id="codexRadarGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#5b21b6" stopOpacity="0.28" />
          </radialGradient>
        </defs>

        {levels.map((level, lIdx) => (
          <polygon
            key={lIdx}
            points={axes.map((_, idx) => pointAt(idx, r * level).join(',')).join(' ')}
            fill="none"
            stroke={lIdx === levels.length - 1 ? '#e2cfb3' : '#f3e8d7'}
            strokeWidth={lIdx === levels.length - 1 ? '1.5' : '1'}
            strokeDasharray={lIdx === levels.length - 1 ? 'none' : '3,3'}
          />
        ))}

        {axes.map((_, idx) => {
          const [x, y] = pointAt(idx, r)
          return <line key={idx} x1={cx} y1={cy} x2={x} y2={y} stroke="#f3e8d7" strokeWidth="1" strokeDasharray="2,2" />
        })}

        <polygon
          points={axes.map((a, idx) => pointAt(idx, (Math.min(maxVal, parseFloat(a.score) || 0) / maxVal) * r).join(',')).join(' ')}
          fill="url(#codexRadarGrad)"
          stroke="#7c3aed"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {axes.map((a, idx) => {
          const [lx, ly] = pointAt(idx, r + 14)
          const angle = -Math.PI / 2 + (idx * 2 * Math.PI) / n
          const anchor = Math.cos(angle) > 0.15 ? 'start' : Math.cos(angle) < -0.15 ? 'end' : 'middle'
          return (
            <text key={a.axis} x={lx} y={ly} textAnchor={anchor} className="font-sans text-[8px] font-bold" fill="#57534e">
              {AXIS_SHORT[a.axis] || a.axis}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

// Main /codex landing view — merges class-subclass-index.md (every
// class/subclass, no tier) with 00-sub-class-overview-tier-list-2024.md
// (every ranked 2024 subclass, no edition/book) into one flat, filterable
// table (see mergeCodexClassData.js), and lets it be grouped either by
// Class or by Tier from the same filtered set instead of two separate docs.
// Where a class also has a *-subclass-scorecard-2024.md pilot doc (Wizard
// only, as of writing — see HomebrewRuleDocPage's FILTERABLE_VIEWS comment),
// its per-subclass 7-axis breakdown is attached too so the detail modal can
// draw a radar chart instead of falling back to the one-line note.
//
// Classes with zero mirrored subclasses (Sacred Knight, the 3 sidekick
// classes — same exclusions the source docs already call out) contribute no
// rows and simply don't appear here; that matches what both source docs
// already documented as out of scope, not a bug.
export default function CodexClassBrowser() {
  const classes = useMemo(() => {
    const indexRule = getHomebrewRule('General/class-subclass-index')
    if (!indexRule) return []
    const indexResult = parseClassSubclassIndex(indexRule.content)
    const merged = mergeCodexClassData(indexResult)

    return merged.map((c) => {
      const scorecardSlug = `2024-tier-list/${classSlug(c.name)}-subclass-scorecard-2024`
      const scorecardRule = getHomebrewRule(scorecardSlug)
      const aliases = RENAMED_SUBCLASS_ALIASES[c.name]

      // Level-indexed system (see 00-level-anchor-rubric.md) — a completely
      // separate pair of files per class from the scorecard above. Loaded
      // unconditionally (not gated behind the scorecard existing) since a
      // class could in principle have one system's files but not the
      // other's, though in practice both cover the same 30 classes.
      const levelBaselineSlug = `2024-tier-list/${classSlug(c.name)}-level-baseline`
      const levelOverlaySlug = `2024-tier-list/${classSlug(c.name)}-subclass-level-overlay`
      const levelBaselineRule = getHomebrewRule(levelBaselineSlug)
      const levelOverlayRule = getHomebrewRule(levelOverlaySlug)
      const levelBaseline = levelBaselineRule ? parseLevelBaseline(levelBaselineRule.content) : null
      const overlayByName = new Map(
        (levelOverlayRule ? parseSubclassLevelOverlay(levelOverlayRule.content).subclasses : []).map((s) => [
          s.name.trim().toLowerCase(),
          s,
        ])
      )
      const levelAnalysisLink = `/codex/${levelOverlaySlug}`

      if (!scorecardRule) {
        return {
          ...c,
          subclasses: c.subclasses.map((s) => ({
            ...s,
            levelAnalysisLink,
            levelGrid: levelBaseline ? attachLevelGrid(s, overlayByName, aliases, levelBaseline) : null,
          })),
        }
      }
      const { subclasses: scSubclasses } = parseSubclassScorecard(scorecardRule.content)
      const byName = new Map(scSubclasses.map((s) => [s.name.trim().toLowerCase(), s]))
      const analysisLink = `/codex/${scorecardSlug}`
      return {
        ...c,
        analysisLink,
        // The index still lists the pre-2024 name as its own row alongside
        // the 2024 rename (both point at the same scorecard entry via
        // RENAMED_SUBCLASS_ALIASES) — e.g. "Way of Mercy" next to "Warrior
        // of Mercy". Drop the old-name row once we know its 2024 replacement
        // is also present, so the browser shows each subclass once, under
        // its current name, instead of two rows with identical tiers.
        subclasses: c.subclasses
          .filter((s) => {
            const indexName = s.name.trim().toLowerCase()
            const renamedTo = aliases?.[indexName]
            return !renamedTo || !c.subclasses.some((other) => other.name.trim().toLowerCase() === renamedTo)
          })
          .map((s) => {
            const indexName = s.name.trim().toLowerCase()
            // 1) exact match. 2) the index's own name still carries a
            // disambiguating "(PSA)"/"(PSK)" suffix that the scorecard heading
            // strips (e.g. "Ambition Domain (PSA)" vs scorecard's "Ambition
            // Domain") — retry with that trailing parenthetical stripped. 3) a
            // known old-name/2024-rename duplicate (see RENAMED_SUBCLASS_ALIASES) —
            // only reached when the 2024 row itself wasn't in the index, so
            // this old-name row is the only one left to carry the tier.
            const sc =
              byName.get(indexName) ||
              byName.get(indexName.replace(/\s*\([^)]*\)\s*$/, '').trim()) ||
              (aliases?.[indexName] ? byName.get(aliases[indexName]) : undefined)
            const levelGrid = levelBaseline ? attachLevelGrid(s, overlayByName, aliases, levelBaseline) : null
            // A scorecard file existing for the class is enough to link every one
            // of its subclasses to the write-up, even ones whose "**Overall**"
            // judgment (tier) hasn't been written yet — axes/tier stay unset for
            // those until it is (see 00-scorecard-methodology.md § การเขียน
            // Overall Tier), and they render as "ยังไม่ได้จัดระดับ".
            if (!sc) return { ...s, analysisLink, levelAnalysisLink, levelGrid }
            return { ...s, analysisLink, levelAnalysisLink, levelGrid, tier: sc.tier, overallReason: sc.overallReason, axes: sc.axes }
          }),
      }
    })
  }, [])

  const tierOrder = TIER_ORDER

  const flatRows = useMemo(
    () =>
      classes.flatMap((c) =>
        c.subclasses.map((s) => ({
          ...s,
          className: c.name,
          classLink: c.link,
          classBooks: c.books || [],
          analysisLink: s.analysisLink,
        }))
      ),
    [classes]
  )

  // "ภาพรวม" (whole-career, the old scorecard system, unchanged) or a
  // specific character level 1-20 (the level-indexed system) — see
  // project_tier_list_level_split_idea memory. Selecting a level swaps
  // every row's tier/axes source from the scorecard's whole-career grades
  // to that level's resolved grid (levelGrid, built above), computing a
  // derived Overall via the point formula since the level-indexed docs only
  // ever grade the 7 axes per level, never a combined score.
  const [selectedLevel, setSelectedLevel] = useState('overall')
  const isLevelMode = selectedLevel !== 'overall'
  const levelRows = useMemo(() => {
    if (!isLevelMode) return flatRows
    const lv = parseInt(selectedLevel, 10)
    return flatRows.map((r) => {
      if (!r.levelGrid) return { ...r, tier: null, axes: undefined, overallReason: null, isLevelMode: true, selectedLevel: lv }
      const axes = AXIS_ORDER.map((axis) => {
        const cell = r.levelGrid[axis][lv]
        return { axis, grade: cell?.grade || null, reason: cell?.reason || null, score: gradeToRadarScore(cell?.grade) }
      })
      const gradeByAxis = Object.fromEntries(axes.map((a) => [a.axis, a.grade]))
      const summary = axes.map((a) => `${AXIS_SHORT[a.axis]} ${a.grade || '—'}`).join(' · ')
      return {
        ...r,
        tier: overallFromAxisGrades(gradeByAxis),
        axes,
        overallReason: `Lv${lv}: ${summary} — Overall คำนวณจากสูตร point (S=+3/A=+2/B=+1/C=0/D=-1, ดู 00-scorecard-methodology.md)`,
        analysisLink: r.levelAnalysisLink || r.analysisLink,
        isLevelMode: true,
        selectedLevel: lv,
      }
    })
  }, [flatRows, isLevelMode, selectedLevel])

  const bookOptions = useMemo(
    () => [...new Set([...flatRows.map((r) => r.book), ...classes.flatMap((c) => c.books || [])])].sort((a, b) => a.localeCompare(b)),
    [flatRows, classes]
  )
  // Class filter is split into Core vs Supplement (see CORE_CLASS_NAMES),
  // each sorted A-Z independently rather than one interleaved list.
  const rankedClassOptions = useMemo(() => {
    const withSubclasses = classes.filter((c) => c.subclasses.length > 0)
    const byName = (a, b) => a.name.localeCompare(b.name)
    return {
      core: withSubclasses.filter((c) => CORE_CLASS_NAMES.has(c.name)).sort(byName).map((c) => c.name),
      supplement: withSubclasses.filter((c) => !CORE_CLASS_NAMES.has(c.name)).sort(byName).map((c) => c.name),
    }
  }, [classes])
  const fullTierOrder = useMemo(() => [...tierOrder, UNRANKED], [tierOrder])

  const [detailRow, setDetailRow] = useState(null)
  const [search, setSearch] = useState('')
  const [books, setBooks] = useState(new Set())
  const [bookScope, setBookScope] = useState('both')
  const [tiers, setTiers] = useState(new Set())
  // One S/A/B/C/D chip-set per axis, filtered independently of the overall
  // Tier row above and of each other (a row must match every axis filter
  // that has at least one grade selected).
  const [axisTiers, setAxisTiers] = useState(() => new Map(AXIS_ORDER.map((axis) => [axis, new Set()])))
  // Per-axis "ตรงตามเงื่อนไข" (exact) vs "ขั้นต่ำ" (minimum) mode — see
  // expandMinimum. Defaults to exact for every axis.
  const [axisTierModes, setAxisTierModes] = useState(() => new Map(AXIS_ORDER.map((axis) => [axis, 'exact'])))
  const [selectedClasses, setSelectedClasses] = useState(new Set())
  // Whether the filter section (Tier matrix + Book + Class) is expanded
  // inline below the search bar — an accordion, not a floating popover, so
  // it stays open until the toggle button itself is clicked again.
  const [filterOpen, setFilterOpen] = useState(false)

  function toggleAxisTier(axis, value) {
    setAxisTiers((prev) => {
      const next = new Map(prev)
      next.set(axis, toggled(prev.get(axis), value))
      return next
    })
  }

  function setAxisTierMode(axis, mode) {
    setAxisTierModes((prev) => new Map(prev).set(axis, mode))
  }

  const query = search.trim().toLowerCase()
  const hasAxisTierFilter = useMemo(() => [...axisTiers.values()].some((s) => s.size > 0), [axisTiers])
  const hasAnyFilter = query !== '' || books.size > 0 || tiers.size > 0 || selectedClasses.size > 0 || hasAxisTierFilter
  // Badge count on the "ตัวกรอง" button — total selected chips across Tier
  // (overall + every axis), Book, and Class, but not the always-visible
  // search box.
  const activeFilterCount = useMemo(() => {
    let n = tiers.size + books.size + selectedClasses.size
    for (const s of axisTiers.values()) n += s.size
    return n
  }, [tiers, axisTiers, books, selectedClasses])

  const filteredRows = useMemo(() => {
    return levelRows.filter((r) => {
      if (selectedClasses.size && !selectedClasses.has(r.className)) return false
      if (tiers.size && !(r.tier && tiers.has(r.tier))) return false
      for (const [axis, selected] of axisTiers) {
        if (!selected.size) continue
        const allowed = axisTierModes.get(axis) === 'min' ? expandMinimum(selected) : selected
        const a = r.axes?.find((x) => x.axis === axis)
        if (!a || !allowed.has(a.grade)) return false
      }
      if (books.size) {
        const classBookOk = bookScope !== 'subclass' && r.classBooks.some((b) => books.has(b))
        const subBookOk = bookScope !== 'class' && books.has(r.book)
        if (!classBookOk && !subBookOk) return false
      }
      if (query !== '' && !r.name.toLowerCase().includes(query) && !r.className.toLowerCase().includes(query)) return false
      return true
    })
  }, [levelRows, selectedClasses, tiers, axisTiers, axisTierModes, books, bookScope, query])

  const tierGroups = useMemo(() => {
    const byTier = new Map(fullTierOrder.map((t) => [t, []]))
    for (const r of filteredRows) {
      const key = r.tier && byTier.has(r.tier) ? r.tier : UNRANKED
      byTier.get(key).push(r)
    }
    return fullTierOrder.map((t) => ({ tier: t, rows: byTier.get(t) })).filter((g) => g.rows.length > 0)
  }, [fullTierOrder, filteredRows])

  const totalAll = flatRows.length
  const totalShown = filteredRows.length

  function clearFilters() {
    setSearch('')
    setBooks(new Set())
    setBookScope('both')
    setTiers(new Set())
    setAxisTiers(new Map(AXIS_ORDER.map((axis) => [axis, new Set()])))
    setAxisTierModes(new Map(AXIS_ORDER.map((axis) => [axis, 'exact'])))
    setSelectedClasses(new Set())
  }

  if (classes.length === 0) {
    return <p className="text-sm text-stone-400">ยังไม่มีข้อมูล class/subclass ใน Codex</p>
  }

  const tierMatrixRows = [
    { label: 'Overall', selected: tiers, onToggle: (v) => setTiers(toggled(tiers, v)) },
    ...AXIS_ORDER.map((axis) => ({
      label: axis,
      selected: axisTiers.get(axis),
      onToggle: (v) => toggleAxisTier(axis, v),
      mode: axisTierModes.get(axis),
      onModeChange: (m) => setAxisTierMode(axis, m),
    })),
  ]

  return (
    <div>
      <div className="mb-6 rounded-xl border border-[#e2cfb3] bg-[#f5ede0]/60 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* 21 options: whole-career "ภาพรวม" (the old scorecard system,
                unchanged) plus Lv1-20 (the level-indexed system) — picking a
                level swaps every row's Tier/axis grades to that level's
                resolved grid instead of the whole-career score. */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              title="เลือกดู Tier แบบภาพรวมทั้งอาชีพ หรือที่เลเวลใดเลเวลหนึ่ง"
              className="rounded-md border border-[#e2cfb3] bg-white px-2 py-1.5 text-sm font-medium text-stone-700 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
            >
              <option value="overall">ภาพรวม (ทั้งอาชีพ)</option>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((lv) => (
                <option key={lv} value={String(lv)}>
                  Lv {lv}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาชื่อ subclass หรือ class..."
              className="w-full max-w-xs rounded-md border border-[#e2cfb3] bg-white px-3 py-1.5 text-sm text-stone-700 placeholder:text-stone-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
            {hasAnyFilter && (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded text-xs text-violet-700 underline decoration-violet-300 underline-offset-2 hover:text-violet-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                ล้างตัวกรอง
              </button>
            )}

            {/* Filter accordion — everything but search/clear collapses behind
                this button so the page opens on the data, not a wall of chip
                rows; expands inline below instead of floating over content. */}
            <button
              type="button"
              onClick={() => setFilterOpen((o) => !o)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${filterOpen || activeFilterCount > 0
                ? 'border-violet-400 bg-violet-600 text-white'
                : 'border-[#e2cfb3] bg-white text-stone-600 hover:bg-[#f5ede0]'
                }`}
            >
              ตัวกรอง{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
              <span className={`text-[9px] transition-transform ${filterOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>
          </div>

          <span className="text-xs text-stone-500">
            แสดง <span className="font-semibold text-stone-700">{totalShown}</span> จาก {totalAll} subclass
          </span>
        </div>

        {isLevelMode && (
          <p className="mt-3 rounded-md border border-violet-200 bg-violet-50 px-3 py-2 text-xs text-violet-800">
            🔬 กำลังดู Tier ที่ <span className="font-semibold">Lv {selectedLevel}</span> — เกรดราย axis มาจากระบบ level-indexed ใหม่
            (Class Baseline + Subclass Overlay) ส่วน <span className="font-semibold">Overall</span> คำนวณจากสูตร point (S=+3/A=+2/B=+1/C=0/D=-1
            รวม 7 axis) เพราะเอกสารต้นฉบับให้แค่เกรดราย axis ต่อเลเวล ไม่มี Overall รวมต่อเลเวลอยู่แล้ว — ต่างจากโหมด "ภาพรวม" ที่ใช้ Overall Tier
            ที่ให้ดุลยพินิจ/คำนวณแยกไว้ในไฟล์ scorecard ระบบเดิม
          </p>
        )}

        {filterOpen && (
          <div className="mt-4 flex flex-col gap-4 border-t border-[#e2cfb3] pt-4">
            <div className="rounded-lg bg-white/50 p-3">
              <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wide text-stone-500">Tier</h3>
              <div className="overflow-x-auto">
                <TierMatrix rows={tierMatrixRows} />
              </div>
            </div>
            <div className="rounded-lg bg-white/50 p-3">
              <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wide text-stone-500">Book</h3>
              <FilterRow
                options={bookOptions}
                selected={books}
                onToggle={(v) => setBooks(toggled(books, v))}
                extra={<BookScopeToggle value={bookScope} onChange={setBookScope} />}
              />
            </div>
            <div className="flex flex-col gap-2.5 rounded-lg bg-white/50 p-3">
              <h3 className="text-[11px] font-bold uppercase tracking-wide text-stone-500">Class</h3>
              <FilterRow
                label="Core"
                options={rankedClassOptions.core}
                selected={selectedClasses}
                onToggle={(v) => setSelectedClasses(toggled(selectedClasses, v))}
              />
              <FilterRow
                label="Supplement"
                options={rankedClassOptions.supplement}
                selected={selectedClasses}
                onToggle={(v) => setSelectedClasses(toggled(selectedClasses, v))}
              />
            </div>
          </div>
        )}
      </div>

      {totalShown === 0 && <p className="text-sm text-stone-400">ไม่พบ subclass ที่ตรงกับตัวกรอง</p>}

      {tierGroups.map((g) => (
          <section key={g.tier} className="mb-6">
            <h2 className="font-cinzel mt-2 mb-2 flex items-center gap-2 text-lg font-bold text-stone-800">
              <TierBadge tier={g.tier === UNRANKED ? null : g.tier} />
              {g.tier === UNRANKED ? 'ยังไม่ได้จัดระดับ (ยังไม่มีไฟล์วิเคราะห์)' : `${g.tier} Tier`} ({g.rows.length})
            </h2>
            <div className="mb-3 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-[#f5ede0] text-left">
                  <tr>
                    <th rowSpan={2} className={`${CELL_CLASS} align-middle font-semibold`}>
                      Subclass
                    </th>
                    <th colSpan={AXIS_ORDER.length} className={`${CELL_CLASS} text-center font-semibold`}>
                      {isLevelMode ? `Tier @ Lv ${selectedLevel}` : 'Tier'}
                    </th>
                    <th rowSpan={2} className={`${CELL_CLASS} align-middle font-semibold`}>
                      Book
                    </th>
                  </tr>
                  <tr>
                    {AXIS_ORDER.map((name) => (
                      <th key={name} className={`${CELL_CLASS} text-center font-semibold`} title={name}>
                        {AXIS_SHORT[name]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {g.rows.map((r, i) => (
                    <tr key={`${r.className}-${r.name}-${i}`}>
                      <td className={CELL_CLASS}>
                        {r.link ? (
                          <a href={r.link} target="_blank" rel="noreferrer" className={LINK_CLASS}>
                            {r.name}
                          </a>
                        ) : (
                          r.name
                        )}{' '}
                        <span className="text-xs text-stone-400">({r.className})</span>
                      </td>
                      {AXIS_ORDER.map((name) => {
                        const a = r.axes?.find((x) => x.axis === name)
                        return (
                          <td key={name} className={`${CELL_CLASS} text-center`}>
                            <TierBadge tier={a?.grade} onClick={a ? () => setDetailRow(r) : undefined} />
                          </td>
                        )
                      })}
                      <td className={CELL_CLASS}>{r.book}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}

      <Modal
        open={!!detailRow}
        onClose={() => setDetailRow(null)}
        title={
          detailRow && (
            <>
              {detailRow.name}{' '}
              <span className="text-sm font-normal text-stone-400">
                ({detailRow.isLevelMode ? `Lv ${detailRow.selectedLevel}` : 'ภาพรวม'})
              </span>
            </>
          )
        }
        size={detailRow?.axes?.length ? 'lg' : 'md'}
      >
        {detailRow && (
          <div className="flex flex-col gap-4 text-sm text-stone-700">
            {detailRow.axes?.length ? (
              // 7-axis scorecard pilot (Wizard only for now) — chart + big
              // Overall Rank side by side, per-axis grade/reasoning below.
              <div className="flex items-start gap-4">
                <AxisRadarChart axes={AXIS_ORDER.map((name) => detailRow.axes.find((a) => a.axis === name)).filter(Boolean)} />
                <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
                  <span className="text-xs font-semibold text-stone-500">Overall Rank</span>
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-lg border text-xl font-extrabold ${tierBadgeClass(detailRow.tier)}`}
                  >
                    {detailRow.tier}
                  </span>
                  <span className="break-words text-xs text-stone-500">
                    {detailRow.className} · {detailRow.edition} · {detailRow.source}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <TierBadge tier={detailRow.tier} />
                <span className="text-xs text-stone-500">
                  {detailRow.className} · {detailRow.edition} · {detailRow.source}
                </span>
              </div>
            )}

            {(detailRow.axes?.length ? detailRow.overallReason : detailRow.note) ? (
              <p className="rounded-md bg-[#f5ede0]/60 p-3 text-stone-700">
                {detailRow.axes?.length && <span className="font-semibold">ภาพรวม: </span>}
                {detailRow.axes?.length ? detailRow.overallReason : detailRow.note}
              </p>
            ) : (
              <p className="text-xs italic text-stone-400">ยังไม่มีหมายเหตุ</p>
            )}

            {detailRow.axes?.length > 0 && (
              <div className="flex flex-col gap-2">
                {AXIS_ORDER.map((name) => {
                  const a = detailRow.axes.find((x) => x.axis === name)
                  if (!a) return null
                  return (
                    <div key={name} className="flex gap-3 border-b border-[#e2cfb3] pb-2 last:border-0">
                      <div className="flex w-24 shrink-0 flex-col items-start gap-1">
                        <span
                          className={`inline-flex h-6 w-6 items-center justify-center rounded border text-xs font-bold ${tierBadgeClass(a.grade)}`}
                        >
                          {a.grade}
                        </span>
                        <span className="text-xs font-semibold text-stone-600">{name}</span>
                        {/* Level mode's "score" is a pseudo 0-10 value that
                            only exists to drive the radar chart's polygon
                            math (see gradeToRadarScore) — showing it as text
                            here would read as a real measurement it isn't. */}
                        {!detailRow.isLevelMode && <span className="text-[11px] text-stone-400">{a.score}</span>}
                      </div>
                      <p className="text-stone-700">
                        {a.reason ||
                          (detailRow.isLevelMode && (
                            <span className="italic text-stone-400">
                              เท่ากับ Class Baseline ที่เลเวลนี้ (ไม่พบคำอธิบายในเอกสารต้นฉบับ)
                            </span>
                          ))}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="flex flex-wrap gap-3 text-xs">
              {detailRow.link && (
                <a href={detailRow.link} target="_blank" rel="noreferrer" className={LINK_CLASS}>
                  เปิดหน้ากติกา (5e.tools)
                </a>
              )}
              {detailRow.analysisLink && (
                <a href={detailRow.analysisLink} target="_blank" rel="noreferrer" className={LINK_CLASS}>
                  {detailRow.isLevelMode ? '📊 ดู Subclass Overlay (delta จาก baseline)' : '📊 ดูวิเคราะห์เต็ม/tier list'}
                </a>
              )}
              {/* Overlay doc above is delta-only — doesn't restate every one
                  of the 20 levels for axes the subclass never changes. The
                  Class Baseline doc is where the full un-abridged 7×20
                  table (with its own per-level reasoning) actually lives —
                  useful reference in either Tier mode, not just level mode,
                  so it isn't gated behind selecting a level. */}
              {detailRow.className && (
                <a
                  href={`/codex/2024-tier-list/${classSlug(detailRow.className)}-level-baseline`}
                  target="_blank"
                  rel="noreferrer"
                  className={LINK_CLASS}
                >
                  📐 ดู Class Baseline ({detailRow.className}, 7 axis × 20 เลเวลเต็ม)
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
