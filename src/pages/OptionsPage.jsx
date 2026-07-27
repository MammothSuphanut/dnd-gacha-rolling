import { useEffect, useMemo, useState } from 'react'
import { useCompendiumCategory } from '../utils/useCompendiumCategory'
import { getCategory, originLabels, originFacet, SCHOOL_LABELS, FEAT_CATEGORY_LABELS } from '../utils/fiveEtoolsCategories'
import { loadPinnedKeys, savePinnedKeys, spellKey } from '../utils/pinnedSpells'
import { isEligibleForProfile, isProfileEmpty } from '../utils/characterEligibility'
import SpellDetailPanel from '../components/SpellDetailPanel'
import OptionDetailPanel from '../components/OptionDetailPanel'

const EMPTY_FILTERS = {}
const OPTION_CATEGORIES = ['spell', 'feat', 'background', 'optionalfeature']
const TAB_LABELS = { spell: 'คาถา', feat: 'ฟีต', background: 'แบ็คกราวด์', optionalfeature: 'ตัวเลือกอื่นๆ' }

// Filter dropdowns that overlap with the character-profile identity slots —
// hidden while "เท่าที่ตัวละครเลือกได้" is active since the profile section
// replaces them (keeping both would just be two controls fighting over the
// same thing). Only `spell` has any of these today.
const IDENTITY_FILTER_KEYS = { spell: ['class', 'subclass', 'grantedBySpecies', 'grantedByBackground'] }

// Same-name reprints across companion/supplement books of the same homebrew
// line (e.g. "Finger Guns" printed in both Valda's Spire core and its
// Player Pack) collapse to one row — prefer the flagship sourcebook over a
// companion/reprint one. Only verified as an issue for spells so far, so
// scoped to that category rather than applied blindly everywhere.
const REPRINT_PRIORITY = {
  ValdaSpire24: 1,
  VSS: 2,
  ValdaSpire24Extras: 3,
  ValdaSpireExtras: 4,
  ValdaGunslinger: 5,
  ValdaPlayerPack: 6,
  GrimHollowPG24: 7,
}

function dedupeReprints(items) {
  const bestByName = new Map()
  items.forEach((item, idx) => {
    const key = item.name.toLowerCase()
    const rank = REPRINT_PRIORITY[item.source] ?? 100
    const existing = bestByName.get(key)
    if (!existing || rank < existing.rank || (rank === existing.rank && idx < existing.idx)) {
      bestByName.set(key, { item, rank, idx })
    }
  })
  return [...bestByName.values()].map((v) => v.item)
}

// 'and' = must satisfy every active filter. 'or' = satisfies at least one.
// Filters left on "ทั้งหมด" don't count as a condition either way.
function matchesFilters(item, filterDefs, activeFilters, matchMode) {
  const activeDefs = filterDefs.filter((def) => activeFilters[def.key])
  if (activeDefs.length === 0) return true
  const checks = activeDefs.map((def) => def.getValues(item).includes(activeFilters[def.key]))
  return matchMode === 'or' ? checks.some(Boolean) : checks.every(Boolean)
}

function subtitleFor(categoryId, item) {
  const originBit = originLabels[originFacet(item)] || originFacet(item)
  if (categoryId === 'spell') {
    const level = item.level === 0 ? 'Cantrip' : `Level ${item.level}`
    return `${level} · ${SCHOOL_LABELS[item.school] || item.school} · ${originBit}`
  }
  if (categoryId === 'feat') {
    // feat.category is a single code string (e.g. "G"), not an array —
    // unlike optionalfeature.featureType below, which is.
    return `${(FEAT_CATEGORY_LABELS[item.category] || item.category || 'General')} · ${originBit}`
  }
  if (categoryId === 'optionalfeature') {
    return `${(item.featureType || []).join(', ') || '—'} · ${originBit}`
  }
  return originBit
}

export default function OptionsPage() {
  const [categoryId, setCategoryId] = useState('spell')
  const category = getCategory(categoryId)
  const { status, error, data } = useCompendiumCategory(categoryId)

  const [query, setQuery] = useState('')
  const [activeFiltersByCategory, setActiveFiltersByCategory] = useState({})
  const [selectedKey, setSelectedKey] = useState(null)
  const [pinned, setPinned] = useState(() => loadPinnedKeys())
  const [onlyPinned, setOnlyPinned] = useState(false)
  const [matchMode, setMatchMode] = useState('and')

  // Character-profile identity slots, kept independent of `categoryId` so
  // switching tabs (Spell -> Feat -> ...) doesn't lose the character you set up.
  const [profile, setProfile] = useState({ className: '', subclassName: '', speciesName: '', backgroundName: '' })
  const classData = useCompendiumCategory('class')
  const subclassData = useCompendiumCategory('subclass')
  const speciesData = useCompendiumCategory('species')
  const backgroundData = useCompendiumCategory('background')

  const activeFilters = activeFiltersByCategory[categoryId] || EMPTY_FILTERS

  useEffect(() => {
    setSelectedKey(null)
  }, [categoryId])

  function togglePin(item) {
    setPinned((prev) => {
      const next = new Set(prev)
      const key = spellKey(item)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      savePinnedKeys(next)
      return next
    })
  }

  const items = useMemo(() => {
    const raw = data || []
    return categoryId === 'spell' ? dedupeReprints(raw) : raw
  }, [data, categoryId])

  const nonIdentityFilters = useMemo(
    () => category.filters.filter((def) => !(IDENTITY_FILTER_KEYS[categoryId] || []).includes(def.key)),
    [category, categoryId],
  )

  const filterOptions = useMemo(() => {
    const options = {}
    for (const def of category.filters) {
      const values = new Set()
      for (const item of items) {
        for (const v of def.getValues(item)) {
          if (v) values.add(v)
        }
      }
      options[def.key] = [...values].sort((a, b) => a.localeCompare(b))
    }
    return options
  }, [items, category])

  const normalizedQuery = query.trim().toLowerCase()
  const filtered = useMemo(() => {
    return items
      .filter((it) => (normalizedQuery ? it.name.toLowerCase().includes(normalizedQuery) : true))
      .filter((it) => {
        if (matchMode === 'character') {
          if (!matchesFilters(it, nonIdentityFilters, activeFilters, 'and')) return false
          return isEligibleForProfile(categoryId, it, profile)
        }
        return matchesFilters(it, category.filters, activeFilters, matchMode)
      })
      .filter((it) => !onlyPinned || pinned.has(spellKey(it)))
      .sort((a, b) => (categoryId === 'spell' ? a.level - b.level || a.name.localeCompare(b.name) : a.name.localeCompare(b.name)))
  }, [items, normalizedQuery, matchMode, nonIdentityFilters, activeFilters, categoryId, profile, onlyPinned, pinned, category])

  const selectedItem = useMemo(() => filtered.find((it) => spellKey(it) === selectedKey) || null, [filtered, selectedKey])

  function setFilter(key, value) {
    setActiveFiltersByCategory((prev) => ({
      ...prev,
      [categoryId]: { ...(prev[categoryId] || {}), [key]: value || undefined },
    }))
  }

  function clearFilters() {
    setQuery('')
    setActiveFiltersByCategory((prev) => ({ ...prev, [categoryId]: {} }))
  }

  const hasActiveFilters = Boolean(query || Object.values(activeFilters).some(Boolean))

  const subclassOptions = useMemo(() => {
    const list = subclassData.data || []
    return profile.className ? list.filter((sc) => sc.className === profile.className) : list
  }, [subclassData.data, profile.className])

  return (
    <div className="w-full p-3 md:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-lg font-bold text-stone-900">ตัวเลือก (Options)</h1>
        {status === 'ready' && (
          <p className="text-xs text-stone-500">
            {filtered.length} / {items.length} รายการ
          </p>
        )}
      </div>

      <div className="mb-3 flex flex-wrap gap-1">
        {OPTION_CATEGORIES.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setCategoryId(id)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              id === categoryId ? 'bg-violet-100 text-violet-700' : 'bg-white text-stone-600 hover:bg-[#f5ede0]'
            }`}
          >
            {TAB_LABELS[id]}
          </button>
        ))}
      </div>

      {status === 'loading' && <p className="text-sm text-stone-500">กำลังโหลดข้อมูล...</p>}
      {status === 'error' && <p className="text-sm text-red-600">โหลดข้อมูลไม่สำเร็จ: {error?.message}</p>}

      {status === 'ready' && (
        <div className="flex flex-col gap-4 lg:h-[calc(100vh-170px)] lg:flex-row lg:items-stretch">
          {/* Filters */}
          <aside className="w-full shrink-0 lg:w-64">
            <div className="rounded-lg border border-[#e2cfb3] bg-white p-3 shadow-sm">
              <div className="mb-2 flex flex-col gap-1 text-sm text-stone-700">
                <label className="flex items-center gap-1.5">
                  <input type="radio" name="filterMatchMode" checked={matchMode === 'and'} onChange={() => setMatchMode('and')} />
                  ตรงทุกเงื่อนไข
                </label>
                <label className="flex items-center gap-1.5">
                  <input type="radio" name="filterMatchMode" checked={matchMode === 'or'} onChange={() => setMatchMode('or')} />
                  ตรงข้อใดข้อหนึ่ง
                </label>
                <label className="flex items-center gap-1.5">
                  <input
                    type="radio"
                    name="filterMatchMode"
                    checked={matchMode === 'character'}
                    onChange={() => setMatchMode('character')}
                  />
                  เท่าที่ตัวละครเลือกได้
                </label>
              </div>

              {matchMode === 'character' && (
                <div className="mb-2 flex flex-col gap-2 rounded-md border border-violet-200 bg-violet-50 p-2">
                  <p className="text-[11px] text-violet-700">
                    โปรไฟล์ตัวละคร — เช็คได้เฉพาะ class/subclass/species/background เท่านั้น เงื่อนไขอื่น (ability score, level,
                    proficiency ฯลฯ) จะไม่ถูกใช้กรอง
                  </p>
                  <select
                    value={profile.className}
                    onChange={(e) => setProfile((p) => ({ ...p, className: e.target.value, subclassName: '' }))}
                    className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                  >
                    <option value="">Class: ไม่ระบุ</option>
                    {(classData.data || [])
                      .map((c) => c.name)
                      .sort((a, b) => a.localeCompare(b))
                      .map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                  </select>
                  <select
                    value={profile.subclassName}
                    onChange={(e) => setProfile((p) => ({ ...p, subclassName: e.target.value }))}
                    className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                  >
                    <option value="">Subclass: ไม่ระบุ</option>
                    {subclassOptions
                      .map((s) => s.name)
                      .sort((a, b) => a.localeCompare(b))
                      .map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                  </select>
                  <select
                    value={profile.speciesName}
                    onChange={(e) => setProfile((p) => ({ ...p, speciesName: e.target.value }))}
                    className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                  >
                    <option value="">Species: ไม่ระบุ</option>
                    {(speciesData.data || [])
                      .map((s) => s.name)
                      .sort((a, b) => a.localeCompare(b))
                      .map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                  </select>
                  <select
                    value={profile.backgroundName}
                    onChange={(e) => setProfile((p) => ({ ...p, backgroundName: e.target.value }))}
                    className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                  >
                    <option value="">Background: ไม่ระบุ</option>
                    {(backgroundData.data || [])
                      .map((b) => b.name)
                      .sort((a, b) => a.localeCompare(b))
                      .map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                  </select>
                  {isProfileEmpty(profile) && (
                    <p className="text-[11px] text-violet-500">ยังไม่ได้เลือกอะไรเลย — ตอนนี้เลยยังไม่กรองอะไร</p>
                  )}
                </div>
              )}

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ค้นหาชื่อ..."
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
              <label className="mt-2 flex items-center gap-2 text-sm text-stone-700">
                <input
                  type="checkbox"
                  checked={onlyPinned}
                  onChange={(e) => setOnlyPinned(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                แสดงเฉพาะที่เล็งไว้ ({pinned.size})
              </label>
              <div className="mt-2 flex flex-col gap-2">
                {(matchMode === 'character' ? nonIdentityFilters : category.filters).map((def) => (
                  <select
                    key={def.key}
                    value={activeFilters[def.key] || ''}
                    onChange={(e) => setFilter(def.key, e.target.value)}
                    className={`w-full rounded-md border px-3 py-2 text-sm ${
                      activeFilters[def.key] ? 'border-violet-400 bg-violet-50 font-medium text-violet-800' : 'border-gray-300'
                    }`}
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
                  {onlyPinned ? 'ยังไม่ได้เล็งรายการไว้เลย' : 'ไม่พบรายการที่ตรงกับเงื่อนไข'}
                </p>
              ) : (
                filtered.map((item) => {
                  const key = spellKey(item)
                  const isActive = key === selectedKey
                  const isPinned = pinned.has(key)
                  return (
                    <div
                      key={key}
                      className={`flex w-full items-center gap-1 rounded-lg border pr-1 transition-colors ${
                        isActive ? 'border-violet-300 bg-violet-100' : 'border-[#e2cfb3] bg-white hover:bg-[#f5ede0]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedKey(key)}
                        className="flex min-w-0 flex-1 flex-col items-start px-3 py-2 text-left"
                      >
                        <span className="w-full truncate text-sm font-medium text-stone-800">{item.name}</span>
                        <span className="text-xs text-stone-500">{subtitleFor(categoryId, item)}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => togglePin(item)}
                        aria-label={isPinned ? 'เลิกเล็งรายการนี้' : 'เล็งรายการนี้ไว้'}
                        aria-pressed={isPinned}
                        className={`shrink-0 rounded-md p-1.5 text-lg leading-none transition-colors ${
                          isPinned ? 'text-amber-500 hover:text-amber-600' : 'text-stone-300 hover:text-stone-400'
                        }`}
                      >
                        {isPinned ? '★' : '☆'}
                      </button>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Detail */}
          <main className="min-w-0 flex-1 lg:h-full lg:overflow-hidden">
            {categoryId === 'spell' ? (
              <SpellDetailPanel spell={selectedItem} />
            ) : (
              <OptionDetailPanel categoryId={categoryId} entry={selectedItem} />
            )}
          </main>
        </div>
      )}
    </div>
  )
}
