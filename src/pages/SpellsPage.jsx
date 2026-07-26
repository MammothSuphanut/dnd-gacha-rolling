import { useMemo, useState } from 'react'
import { useCompendiumCategory } from '../utils/useCompendiumCategory'
import { getCategory, originLabels, originFacet, SCHOOL_LABELS } from '../utils/fiveEtoolsCategories'
import SpellDetailPanel from '../components/SpellDetailPanel'

const spellCategory = getCategory('spell')

// Same-name reprints across companion/supplement books of the same homebrew
// line (e.g. "Finger Guns" printed in both Valda's Spire core and its
// Player Pack) collapse to one row — prefer the flagship sourcebook over a
// companion/reprint one. Anything not listed here (official books, one-off
// homebrew names) just keeps whichever copy appears first in the data.
const REPRINT_PRIORITY = {
  ValdaSpire24: 1,
  VSS: 2,
  ValdaSpire24Extras: 3,
  ValdaSpireExtras: 4,
  ValdaGunslinger: 5,
  ValdaPlayerPack: 6,
  GrimHollowPG24: 7,
}

function dedupeReprints(spells) {
  const bestByName = new Map()
  spells.forEach((spell, idx) => {
    const key = spell.name.toLowerCase()
    const rank = REPRINT_PRIORITY[spell.source] ?? 100
    const existing = bestByName.get(key)
    if (!existing || rank < existing.rank || (rank === existing.rank && idx < existing.idx)) {
      bestByName.set(key, { spell, rank, idx })
    }
  })
  return [...bestByName.values()].map((v) => v.spell)
}

function matchesFilters(spell, filterDefs, activeFilters) {
  return filterDefs.every((def) => {
    const active = activeFilters[def.key]
    if (!active) return true
    return def.getValues(spell).includes(active)
  })
}

export default function SpellsPage() {
  const { status, error, data } = useCompendiumCategory('spell')
  const [query, setQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState({})
  const [selectedKey, setSelectedKey] = useState(null)

  const spells = useMemo(() => dedupeReprints(data || []), [data])

  const filterOptions = useMemo(() => {
    const options = {}
    for (const def of spellCategory.filters) {
      const values = new Set()
      for (const spell of spells) {
        for (const v of def.getValues(spell)) {
          if (v) values.add(v)
        }
      }
      options[def.key] = [...values].sort((a, b) => a.localeCompare(b))
    }
    return options
  }, [spells])

  const normalizedQuery = query.trim().toLowerCase()
  const filtered = useMemo(() => {
    return spells
      .filter((s) => (normalizedQuery ? s.name.toLowerCase().includes(normalizedQuery) : true))
      .filter((s) => matchesFilters(s, spellCategory.filters, activeFilters))
      .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name))
  }, [spells, normalizedQuery, activeFilters])

  const selectedSpell = useMemo(
    () => filtered.find((s) => `${s.name}|${s.source}` === selectedKey) || null,
    [filtered, selectedKey],
  )

  function setFilter(key, value) {
    setActiveFilters((prev) => ({ ...prev, [key]: value || undefined }))
  }

  function clearFilters() {
    setQuery('')
    setActiveFilters({})
  }

  const hasActiveFilters = Boolean(query || Object.values(activeFilters).some(Boolean))

  return (
    <div className="w-full p-3 md:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-lg font-bold text-stone-900">คาถา (Spells)</h1>
        {status === 'ready' && (
          <p className="text-xs text-stone-500">
            {filtered.length} / {spells.length} รายการ
          </p>
        )}
      </div>

      {status === 'loading' && <p className="text-sm text-stone-500">กำลังโหลดข้อมูล...</p>}
      {status === 'error' && <p className="text-sm text-red-600">โหลดข้อมูลไม่สำเร็จ: {error?.message}</p>}

      {status === 'ready' && (
        <div className="flex flex-col gap-4 lg:h-[calc(100vh-130px)] lg:flex-row lg:items-stretch">
          {/* Filters */}
          <aside className="w-full shrink-0 lg:w-64">
            <div className="rounded-lg border border-[#e2cfb3] bg-white p-3 shadow-sm">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ค้นหาชื่อคาถา..."
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
              <div className="mt-2 flex flex-col gap-2">
                {spellCategory.filters.map((def) => (
                  <select
                    key={def.key}
                    value={activeFilters[def.key] || ''}
                    onChange={(e) => setFilter(def.key, e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  >
                    <option value="">{def.label}: ทั้งหมด</option>
                    {filterOptions[def.key]?.map((v) => (
                      <option key={v} value={v}>
                        {def.optionLabel(v)}
                      </option>
                    ))}
                  </select>
                ))}
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="self-start text-xs text-stone-500 underline decoration-dotted hover:text-stone-700"
                  >
                    ล้างตัวกรอง
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* List */}
          <div className="w-full shrink-0 lg:flex lg:h-full lg:w-72 lg:flex-col lg:overflow-hidden">
            <div className="space-y-1 overflow-y-auto pr-1 lg:min-h-0 lg:flex-1">
              {filtered.length === 0 ? (
                <p className="rounded-lg border border-[#e2cfb3] bg-white p-4 text-center text-sm text-stone-400">
                  ไม่พบคาถาที่ตรงกับเงื่อนไข
                </p>
              ) : (
                filtered.map((spell) => {
                  const key = `${spell.name}|${spell.source}`
                  const isActive = key === selectedKey
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedKey(key)}
                      className={`flex w-full flex-col items-start rounded-lg border px-3 py-2 text-left transition-colors ${
                        isActive
                          ? 'border-violet-300 bg-violet-100'
                          : 'border-[#e2cfb3] bg-white hover:bg-[#f5ede0]'
                      }`}
                    >
                      <span className="text-sm font-medium text-stone-800">{spell.name}</span>
                      <span className="text-xs text-stone-500">
                        {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`} · {SCHOOL_LABELS[spell.school] || spell.school} ·{' '}
                        {originLabels[originFacet(spell)] || originFacet(spell)}
                      </span>
                    </button>
                  )
                })
              )}
            </div>
          </div>

          {/* Detail */}
          <main className="min-w-0 flex-1 lg:h-full lg:overflow-hidden">
            <SpellDetailPanel spell={selectedSpell} />
          </main>
        </div>
      )}
    </div>
  )
}
