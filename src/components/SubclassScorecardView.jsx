import { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Modal from './Modal'
import { buildComponents, slugifyHeading } from './AdventureMarkdownView'
import { parseSubclassScorecard } from '../utils/parseSubclassScorecard'

const CELL_CLASS = 'border border-[#e2cfb3] px-2 py-1 align-top text-stone-700'
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

const GRADE_CLASS = {
  S: 'bg-violet-100 text-violet-800 border-violet-300',
  A: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  B: 'bg-sky-100 text-sky-800 border-sky-300',
  C: 'bg-amber-100 text-amber-800 border-amber-300',
  D: 'bg-stone-200 text-stone-600 border-stone-300',
}

function GradeBadge({ grade }) {
  return (
    <span
      className={`inline-flex h-6 w-6 items-center justify-center rounded border text-xs font-bold ${
        GRADE_CLASS[grade] || GRADE_CLASS.D
      }`}
    >
      {grade}
    </span>
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
      className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
        active
          ? 'border-violet-400 bg-violet-100 text-violet-800'
          : 'border-[#e2cfb3] bg-white text-stone-600 hover:bg-[#f5ede0]'
      }`}
    >
      {children}
    </button>
  )
}

// Interactive view for codex/2024-tier-list/<class>-subclass-scorecard-2024.md
// — one row per subclass with a letter-grade badge for each of the 7 scoring
// axes (see parseSubclassScorecard.js), so a filterable grid stays scannable
// at a glance. Full reasoning per axis (the "why") lives in a modal opened
// per subclass instead of inline — 7 axes × reasoning text per row would
// make the table unreadable, and a dropdown per cell (7 per row) was too
// many separate triggers, so one "ℹ️" button per row opening a single modal
// with all 7 axes + the overall reasoning was the simplest UI that still
// surfaces everything.
export default function SubclassScorecardView({ content, basePath }) {
  const { header, groups } = useMemo(() => parseSubclassScorecard(content), [content])
  const linkComponents = useMemo(() => buildComponents(basePath), [basePath])

  const tierOptions = useMemo(() => groups.map((g) => g.tier), [groups])
  const [search, setSearch] = useState('')
  const [tiers, setTiers] = useState(new Set())
  const [detailSub, setDetailSub] = useState(null)

  const query = search.trim().toLowerCase()
  const hasAnyFilter = query !== '' || tiers.size > 0

  const visibleGroups = useMemo(() => {
    return groups
      .filter((g) => tiers.size === 0 || tiers.has(g.tier))
      .map((g) => ({
        ...g,
        filtered: g.subclasses.filter((s) => query === '' || s.name.toLowerCase().includes(query)),
      }))
      .filter((g) => g.filtered.length > 0)
  }, [groups, tiers, query])

  const totalShown = visibleGroups.reduce((sum, g) => sum + g.filtered.length, 0)
  const totalAll = groups.reduce((sum, g) => sum + g.subclasses.length, 0)

  function clearFilters() {
    setSearch('')
    setTiers(new Set())
  }

  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={linkComponents}>
        {header}
      </ReactMarkdown>

      <div className="mb-6 flex flex-col gap-2.5 rounded-lg border border-[#e2cfb3] bg-[#f5ede0]/60 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาชื่อ subclass..."
            className="w-full max-w-xs rounded-md border border-[#e2cfb3] bg-white px-3 py-1.5 text-sm text-stone-700 placeholder:text-stone-400 focus:border-violet-400 focus:outline-none"
          />
          <span className="text-xs text-stone-500">
            แสดง {totalShown} จาก {totalAll} subclass
          </span>
          {hasAnyFilter && (
            <button type="button" onClick={clearFilters} className="text-xs text-violet-700 underline">
              ล้างตัวกรอง
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-xs font-semibold text-stone-500">Overall Tier:</span>
          {tierOptions.map((t) => (
            <FilterChip key={t} active={tiers.has(t)} onClick={() => setTiers(toggled(tiers, t))}>
              {t}
            </FilterChip>
          ))}
        </div>
      </div>

      {visibleGroups.length === 0 && <p className="text-sm text-stone-400">ไม่พบ subclass ที่ตรงกับตัวกรอง</p>}

      {visibleGroups.map((g) => (
        <section key={g.tier} className="mb-6">
          <h2 id={slugifyHeading(`${g.tier} Tier`)} className="font-cinzel mt-2 mb-2 text-lg font-bold text-stone-800">
            {g.tier} Tier ({g.filtered.length})
          </h2>
          <div className="mb-3 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-[#f5ede0] text-left">
                <tr>
                  <th className={`${CELL_CLASS} font-semibold`}>Subclass</th>
                  <th className={`${CELL_CLASS} text-center font-semibold`}>Overall</th>
                  {AXIS_ORDER.map((a) => (
                    <th key={a} className={`${CELL_CLASS} text-center font-semibold`} title={a}>
                      {AXIS_SHORT[a]}
                    </th>
                  ))}
                  <th className={CELL_CLASS}></th>
                </tr>
              </thead>
              <tbody>
                {g.filtered.map((s) => {
                  const byAxis = Object.fromEntries(s.axes.map((a) => [a.axis, a]))
                  return (
                    <tr key={s.name}>
                      <td className={CELL_CLASS}>{s.name}</td>
                      <td className={`${CELL_CLASS} text-center`}>
                        <GradeBadge grade={s.tier.split('/')[0]} />
                      </td>
                      {AXIS_ORDER.map((a) => (
                        <td key={a} className={`${CELL_CLASS} text-center`}>
                          {byAxis[a] ? <GradeBadge grade={byAxis[a].grade} /> : '—'}
                        </td>
                      ))}
                      <td className={`${CELL_CLASS} text-center`}>
                        <button
                          type="button"
                          onClick={() => setDetailSub(s)}
                          className="rounded-full border border-[#e2cfb3] px-2 py-0.5 text-xs text-violet-700 hover:bg-violet-50"
                          title="ดูเหตุผลราย axis"
                        >
                          ℹ️ เหตุผล
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <Modal open={!!detailSub} onClose={() => setDetailSub(null)} title={detailSub?.name} size="lg">
        {detailSub && (
          <div className="flex flex-col gap-3 text-sm text-stone-700">
            <div className="flex items-center gap-2">
              <GradeBadge grade={detailSub.tier.split('/')[0]} />
              <span className="text-xs text-stone-500">
                Overall Tier: {detailSub.tier} · {detailSub.source} {detailSub.icons} — {detailSub.role}
              </span>
            </div>
            {detailSub.overallReason && (
              <p className="rounded-md bg-[#f5ede0]/60 p-3 text-stone-700">
                <span className="font-semibold">ภาพรวม: </span>
                {detailSub.overallReason}
              </p>
            )}
            <div className="flex flex-col gap-2">
              {detailSub.axes.map((a) => (
                <div key={a.axis} className="flex gap-3 border-b border-[#e2cfb3] pb-2 last:border-0">
                  <div className="flex w-28 shrink-0 flex-col items-start gap-1">
                    <GradeBadge grade={a.grade} />
                    <span className="text-xs font-semibold text-stone-600">{a.axis}</span>
                    <span className="text-[11px] text-stone-400">{a.score}</span>
                  </div>
                  <p className="text-stone-700">{a.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
