import { useMemo, useState } from 'react'
import Modal from './Modal'
import { LINK_CLASS } from './AdventureMarkdownView'
import { getHomebrewRule } from '../utils/homebrewRules'
import { parseClassSubclassIndex } from '../utils/parseClassSubclassIndex'
import { parseSubclassScorecard } from '../utils/parseSubclassScorecard'
import { mergeCodexClassData } from '../utils/mergeCodexClassData'
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

const AXIS_ORDER = ['Damage', 'Control', 'Support', 'Survivability', 'Action Economy', 'Utility', 'Versatility']
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
// under, so the old row shows the same tier instead of a false "unranked".
// See project_scorecard_methodology_rework memory, "reconciliation gotcha".
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
      <span className="mr-1 text-xs font-semibold text-stone-500">{label}:</span>
      {extra}
      {options.map((option) => (
        <FilterChip key={option} active={selected.has(option)} onClick={() => onToggle(option)}>
          {option}
        </FilterChip>
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

const GROUP_MODES = [
  { value: 'class', label: 'จัดกลุ่มตาม Class' },
  { value: 'tier', label: 'จัดกลุ่มตาม Tier' },
]

function GroupModeToggle({ value, onChange }) {
  return (
    <div className="flex items-center overflow-hidden rounded-full border border-violet-300 bg-white text-sm">
      {GROUP_MODES.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 font-semibold transition-colors ${value === opt.value ? 'bg-violet-600 text-white' : 'text-violet-700 hover:bg-violet-50'
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
      if (!scorecardRule) return c
      const { subclasses: scSubclasses } = parseSubclassScorecard(scorecardRule.content)
      const byName = new Map(scSubclasses.map((s) => [s.name.trim().toLowerCase(), s]))
      const aliases = RENAMED_SUBCLASS_ALIASES[c.name]
      const analysisLink = `/codex/${scorecardSlug}`
      return {
        ...c,
        analysisLink,
        subclasses: c.subclasses.map((s) => {
          const indexName = s.name.trim().toLowerCase()
          // 1) exact match. 2) the index's own name still carries a
          // disambiguating "(PSA)"/"(PSK)" suffix that the scorecard heading
          // strips (e.g. "Ambition Domain (PSA)" vs scorecard's "Ambition
          // Domain") — retry with that trailing parenthetical stripped. 3) a
          // known old-name/2024-rename duplicate (see RENAMED_SUBCLASS_ALIASES).
          const sc =
            byName.get(indexName) ||
            byName.get(indexName.replace(/\s*\([^)]*\)\s*$/, '').trim()) ||
            (aliases?.[indexName] ? byName.get(aliases[indexName]) : undefined)
          // A scorecard file existing for the class is enough to link every one
          // of its subclasses to the write-up, even ones whose "**Overall**"
          // judgment (tier) hasn't been written yet — axes/tier stay unset for
          // those until it is (see 00-scorecard-methodology.md § การเขียน
          // Overall Tier), and they render as "ยังไม่ได้จัดระดับ".
          if (!sc) return { ...s, analysisLink }
          return { ...s, analysisLink, tier: sc.tier, overallReason: sc.overallReason, axes: sc.axes }
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

  const [groupMode, setGroupMode] = useState('class')
  const [detailRow, setDetailRow] = useState(null)
  const [search, setSearch] = useState('')
  const [books, setBooks] = useState(new Set())
  const [bookScope, setBookScope] = useState('both')
  const [tiers, setTiers] = useState(new Set())
  const [selectedClasses, setSelectedClasses] = useState(new Set())

  const query = search.trim().toLowerCase()
  const hasAnyFilter = query !== '' || books.size > 0 || tiers.size > 0 || selectedClasses.size > 0

  const filteredRows = useMemo(() => {
    return flatRows.filter((r) => {
      if (selectedClasses.size && !selectedClasses.has(r.className)) return false
      if (tiers.size && !(r.tier && tiers.has(r.tier))) return false
      if (books.size) {
        const classBookOk = bookScope !== 'subclass' && r.classBooks.some((b) => books.has(b))
        const subBookOk = bookScope !== 'class' && books.has(r.book)
        if (!classBookOk && !subBookOk) return false
      }
      if (query !== '' && !r.name.toLowerCase().includes(query) && !r.className.toLowerCase().includes(query)) return false
      return true
    })
  }, [flatRows, selectedClasses, tiers, books, bookScope, query])

  const classGroups = useMemo(() => {
    const byClass = new Map(classes.map((c) => [c.name, []]))
    for (const r of filteredRows) byClass.get(r.className)?.push(r)
    return classes
      .map((c) => ({ ...c, rows: byClass.get(c.name) || [] }))
      .filter((c) => c.rows.length > 0)
  }, [classes, filteredRows])

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
    setSelectedClasses(new Set())
  }

  if (classes.length === 0) {
    return <p className="text-sm text-stone-400">ยังไม่มีข้อมูล class/subclass ใน Codex</p>
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <GroupModeToggle value={groupMode} onChange={setGroupMode} />
        <span className="text-xs text-stone-500">
          แสดง {totalShown} จาก {totalAll} subclass
        </span>
      </div>

      <div className="mb-6 flex flex-col gap-2.5 rounded-lg border border-[#e2cfb3] bg-[#f5ede0]/60 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาชื่อ subclass หรือ class..."
            className="w-full max-w-xs rounded-md border border-[#e2cfb3] bg-white px-3 py-1.5 text-sm text-stone-700 placeholder:text-stone-400 focus:border-violet-400 focus:outline-none"
          />
          {hasAnyFilter && (
            <button type="button" onClick={clearFilters} className="text-xs text-violet-700 underline">
              ล้างตัวกรอง
            </button>
          )}
        </div>

        <FilterRow label="Tier" options={tierOrder} selected={tiers} onToggle={(v) => setTiers(toggled(tiers, v))} />
        <FilterRow
          label="Book"
          options={bookOptions}
          selected={books}
          onToggle={(v) => setBooks(toggled(books, v))}
          extra={<BookScopeToggle value={bookScope} onChange={setBookScope} />}
        />
        <div className="flex flex-col gap-1.5">
          <FilterRow
            label="Core Class"
            options={rankedClassOptions.core}
            selected={selectedClasses}
            onToggle={(v) => setSelectedClasses(toggled(selectedClasses, v))}
          />
          <FilterRow
            label="Supplement Class"
            options={rankedClassOptions.supplement}
            selected={selectedClasses}
            onToggle={(v) => setSelectedClasses(toggled(selectedClasses, v))}
          />
        </div>
      </div>

      {totalShown === 0 && <p className="text-sm text-stone-400">ไม่พบ subclass ที่ตรงกับตัวกรอง</p>}

      {groupMode === 'class'
        ? classGroups.map((c) => (
          <section key={c.name} className="mb-6">
            <div className="mt-2 mb-2 flex flex-wrap items-baseline gap-2">
              <h2 className="font-cinzel text-lg font-bold text-stone-800">
                {c.link ? (
                  <a href={c.link} target="_blank" rel="noreferrer" className={LINK_CLASS}>
                    {c.name}
                  </a>
                ) : (
                  c.name
                )}
              </h2>
              {c.analysisLink && (
                <a href={c.analysisLink} target="_blank" rel="noreferrer" className={`${LINK_CLASS} text-xs`}>
                  📊 ดูวิเคราะห์เต็ม/tier list
                </a>
              )}
            </div>
            <div className="mb-3 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-[#f5ede0] text-left">
                  <tr>
                    <th className={`${CELL_CLASS} font-semibold`}>Subclass</th>
                    <th className={`${CELL_CLASS} text-center font-semibold`}>Tier</th>
                    <th className={`${CELL_CLASS} font-semibold`}>Edition</th>
                    <th className={`${CELL_CLASS} font-semibold`}>Source</th>
                    <th className={`${CELL_CLASS} font-semibold`}>Book</th>
                  </tr>
                </thead>
                <tbody>
                  {c.rows.map((s, i) => (
                    <tr key={`${s.name}-${s.edition}-${i}`}>
                      <td className={CELL_CLASS}>
                        {s.link ? (
                          <a href={s.link} target="_blank" rel="noreferrer" className={LINK_CLASS}>
                            {s.name}
                          </a>
                        ) : (
                          s.name
                        )}
                      </td>
                      <td className={`${CELL_CLASS} text-center`}>
                        <TierBadge tier={s.tier} onClick={s.tier ? () => setDetailRow(s) : undefined} />
                      </td>
                      <td className={CELL_CLASS}>{s.edition}</td>
                      <td className={CELL_CLASS}>{s.source}</td>
                      <td className={CELL_CLASS}>{s.book}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))
        : tierGroups.map((g) => (
          <section key={g.tier} className="mb-6">
            <h2 className="font-cinzel mt-2 mb-2 flex items-center gap-2 text-lg font-bold text-stone-800">
              <TierBadge tier={g.tier === UNRANKED ? null : g.tier} />
              {g.tier === UNRANKED ? 'ยังไม่ได้จัดระดับ (ยังไม่มีไฟล์วิเคราะห์)' : `${g.tier} Tier`} ({g.rows.length})
            </h2>
            <div className="mb-3 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-[#f5ede0] text-left">
                  <tr>
                    <th className={`${CELL_CLASS} font-semibold`}>Subclass</th>
                    <th className={`${CELL_CLASS} text-center font-semibold`}>Tier</th>
                    <th className={`${CELL_CLASS} font-semibold`}>Class</th>
                    <th className={`${CELL_CLASS} font-semibold`}>Edition</th>
                    <th className={`${CELL_CLASS} font-semibold`}>Book</th>
                    <th className={`${CELL_CLASS} font-semibold`}>หมายเหตุ</th>
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
                        )}
                      </td>
                      <td className={`${CELL_CLASS} text-center`}>
                        <TierBadge tier={r.tier} onClick={r.tier ? () => setDetailRow(r) : undefined} />
                      </td>
                      <td className={CELL_CLASS}>
                        {r.analysisLink ? (
                          <a href={r.analysisLink} target="_blank" rel="noreferrer" className={LINK_CLASS}>
                            {r.className}
                          </a>
                        ) : r.classLink ? (
                          <a href={r.classLink} target="_blank" rel="noreferrer" className={LINK_CLASS}>
                            {r.className}
                          </a>
                        ) : (
                          r.className
                        )}
                      </td>
                      <td className={CELL_CLASS}>{r.edition}</td>
                      <td className={CELL_CLASS}>{r.book}</td>
                      <td className={CELL_CLASS}>{r.note || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}

      <Modal open={!!detailRow} onClose={() => setDetailRow(null)} title={detailRow?.name} size={detailRow?.axes?.length ? 'lg' : 'md'}>
        {detailRow && (
          <div className="flex flex-col gap-4 text-sm text-stone-700">
            {detailRow.axes?.length ? (
              // 7-axis scorecard pilot (Wizard only for now) — chart + big
              // Overall Rank side by side, per-axis grade/reasoning below.
              <div className="flex flex-wrap items-center gap-4">
                <AxisRadarChart axes={AXIS_ORDER.map((name) => detailRow.axes.find((a) => a.axis === name)).filter(Boolean)} />
                <div className="flex flex-col items-start gap-1.5">
                  <span className="text-xs font-semibold text-stone-500">Overall Rank</span>
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-lg border text-xl font-extrabold ${tierBadgeClass(detailRow.tier)}`}
                  >
                    {detailRow.tier}
                  </span>
                  <span className="text-xs text-stone-500">
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
                        <span className="text-[11px] text-stone-400">{a.score}</span>
                      </div>
                      <p className="text-stone-700">{a.reason}</p>
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
                  📊 ดูวิเคราะห์เต็ม/tier list
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
