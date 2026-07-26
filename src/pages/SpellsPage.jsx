import { useMemo, useState } from 'react'
import { useCompendiumCategory } from '../utils/useCompendiumCategory'
import { getCategory, originLabels, originFacet, SCHOOL_LABELS } from '../utils/fiveEtoolsCategories'
import SpellStatblockModal from '../components/SpellStatblockModal'

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
  const [selectedSpell, setSelectedSpell] = useState(null)

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

  function setFilter(key, value) {
    setActiveFilters((prev) => ({ ...prev, [key]: value || undefined }))
  }

  function clearFilters() {
    setQuery('')
    setActiveFilters({})
  }

  const hasActiveFilters = Boolean(query || Object.values(activeFilters).some(Boolean))

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h1 className="font-cinzel text-xl font-bold text-stone-900">คาถา (Spells)</h1>
        {status === 'ready' && (
          <span className="text-sm text-stone-500">
            {filtered.length} / {spells.length} รายการ
          </span>
        )}
      </div>

      {status === 'loading' && <p className="text-sm text-stone-500">กำลังโหลดข้อมูล...</p>}
      {status === 'error' && <p className="text-sm text-red-600">โหลดข้อมูลไม่สำเร็จ: {error?.message}</p>}

      {status === 'ready' && (
        <>
          <div className="mb-4 flex flex-wrap items-end gap-3 rounded-lg border border-[#e2cfb3] bg-white p-3">
            <div className="min-w-[180px] flex-1">
              <label className="block text-sm font-medium text-stone-700">ค้นหาชื่อคาถา</label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="เช่น Fireball"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            {spellCategory.filters.map((def) => (
              <div key={def.key} className="min-w-[150px]">
                <label className="block text-sm font-medium text-stone-700">{def.label}</label>
                <select
                  value={activeFilters[def.key] || ''}
                  onChange={(e) => setFilter(def.key, e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="">ทั้งหมด</option>
                  {filterOptions[def.key]?.map((v) => (
                    <option key={v} value={v}>
                      {def.optionLabel(v)}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-lg px-3 py-2 text-sm text-stone-600 hover:bg-[#f5ede0]"
              >
                ล้าง filter
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <p className="rounded-lg border border-[#e2cfb3] bg-white p-6 text-center text-sm text-stone-500">
              ไม่พบคาถาที่ตรงกับเงื่อนไข
            </p>
          ) : (
            <div className="overflow-hidden rounded-lg border border-[#e2cfb3] bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e2cfb3] bg-[#f5ede0] text-left text-xs uppercase tracking-wide text-stone-500">
                    <th className="px-3 py-2">ชื่อ</th>
                    <th className="px-3 py-2">Level</th>
                    <th className="px-3 py-2">School</th>
                    <th className="px-3 py-2">แหล่งที่มา</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((spell) => (
                    <tr
                      key={`${spell.name}|${spell.source}`}
                      onClick={() => setSelectedSpell(spell)}
                      className="cursor-pointer border-b border-[#f0e5d0] transition-colors last:border-0 hover:bg-[#f5ede0]"
                    >
                      <td className="px-3 py-2 font-medium text-stone-800">{spell.name}</td>
                      <td className="px-3 py-2 text-stone-600">{spell.level === 0 ? 'Cantrip' : spell.level}</td>
                      <td className="px-3 py-2 text-stone-600">{SCHOOL_LABELS[spell.school] || spell.school}</td>
                      <td className="px-3 py-2 text-stone-600">{originLabels[originFacet(spell)] || originFacet(spell)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <SpellStatblockModal spell={selectedSpell} onClose={() => setSelectedSpell(null)} />
    </div>
  )
}
