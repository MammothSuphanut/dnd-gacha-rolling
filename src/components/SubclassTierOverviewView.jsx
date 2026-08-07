import { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { buildComponents, LINK_CLASS, slugifyHeading } from './AdventureMarkdownView'
import { parseSubclassTierOverview } from '../utils/parseSubclassTierOverview'

const CELL_CLASS = 'border border-[#e2cfb3] px-2 py-1 align-top text-stone-700'

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

function FilterRow({ label, options, selected, onToggle }) {
  if (options.length === 0) return null
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-xs font-semibold text-stone-500">{label}:</span>
      {options.map((option) => (
        <FilterChip key={option} active={selected.has(option)} onClick={() => onToggle(option)}>
          {option}
        </FilterChip>
      ))}
    </div>
  )
}

// Interactive replacement for rendering
// codex/General/00-sub-class-overview-tier-list-2024.md as plain
// markdown — same reasoning as ClassSubclassIndexView (460+ rows, too long
// to scroll by hand) but grouped by **tier** instead of by class, with Tier
// and Class as the two facet filters (search still matches either name).
// Parses via parseSubclassTierOverview.js — see that file for the expected
// generator output shape.
export default function SubclassTierOverviewView({ content, basePath }) {
  const { header, groups, footer } = useMemo(() => parseSubclassTierOverview(content), [content])
  const linkComponents = useMemo(() => buildComponents(basePath), [basePath])

  const tierOptions = useMemo(() => groups.map((g) => g.tier), [groups])
  const classOptions = useMemo(
    () => [...new Set(groups.flatMap((g) => g.rows.map((r) => r.className)))].sort((a, b) => a.localeCompare(b)),
    [groups]
  )

  const [search, setSearch] = useState('')
  const [tiers, setTiers] = useState(new Set())
  const [classes, setClasses] = useState(new Set())

  const query = search.trim().toLowerCase()
  const hasAnyFilter = query !== '' || tiers.size > 0 || classes.size > 0

  const visibleGroups = useMemo(() => {
    return groups
      .filter((g) => tiers.size === 0 || tiers.has(g.tier))
      .map((g) => {
        const filteredRows = g.rows.filter((r) => {
          if (classes.size && !classes.has(r.className)) return false
          if (query !== '' && !r.name.toLowerCase().includes(query) && !r.className.toLowerCase().includes(query)) {
            return false
          }
          return true
        })
        return { ...g, filteredRows }
      })
      .filter((g) => g.filteredRows.length > 0)
  }, [groups, tiers, classes, query])

  const totalShown = visibleGroups.reduce((sum, g) => sum + g.filteredRows.length, 0)
  const totalAll = groups.reduce((sum, g) => sum + g.rows.length, 0)

  function clearFilters() {
    setSearch('')
    setTiers(new Set())
    setClasses(new Set())
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
            placeholder="ค้นหาชื่อ subclass หรือ class..."
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

        <FilterRow label="Tier" options={tierOptions} selected={tiers} onToggle={(v) => setTiers(toggled(tiers, v))} />
        <FilterRow
          label="Class"
          options={classOptions}
          selected={classes}
          onToggle={(v) => setClasses(toggled(classes, v))}
        />
      </div>

      {visibleGroups.length === 0 && <p className="text-sm text-stone-400">ไม่พบ subclass ที่ตรงกับตัวกรอง</p>}

      {visibleGroups.map((g) => (
        <section key={g.tier} className="mb-6">
          <h2 id={slugifyHeading(g.title)} className="font-cinzel mt-2 mb-2 text-lg font-bold text-stone-800">
            {g.title}
          </h2>
          <div className="mb-3 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-[#f5ede0] text-left">
                <tr>
                  <th className={`${CELL_CLASS} font-semibold`}>Subclass</th>
                  <th className={`${CELL_CLASS} font-semibold`}>Class</th>
                  <th className={`${CELL_CLASS} font-semibold`}>Source</th>
                  <th className={`${CELL_CLASS} font-semibold`}>หมายเหตุ</th>
                </tr>
              </thead>
              <tbody>
                {g.filteredRows.map((r, i) => (
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
                    <td className={CELL_CLASS}>
                      {r.classLink ? (
                        <a href={r.classLink} target="_blank" rel="noreferrer" className={LINK_CLASS}>
                          {r.className}
                        </a>
                      ) : (
                        r.className
                      )}
                    </td>
                    <td className={CELL_CLASS}>{r.source}</td>
                    <td className={CELL_CLASS}>{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {footer && (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={linkComponents}>
          {footer}
        </ReactMarkdown>
      )}
    </div>
  )
}
