import { useEffect, useMemo, useRef, useState } from 'react'
import ConfirmDialog from '../components/ConfirmDialog'
import SearchSelect from '../components/SearchSelect'
import { useGachaStore } from '../store/GachaStore'
import { useToast } from '../store/ToastContext'
import { createId } from '../utils/id'

const STATUS_OPTIONS = ['-', 'Developing', 'Prepared', 'On-Going', 'Complete']
const CAMPAIGN_TYPE_OPTIONS = ['-', 'One-Shot', 'Short Campaign', 'Long Campaign']

const STATUS_STYLES = {
  '-': 'bg-[#f5ede0] text-stone-600',
  Developing: 'bg-amber-100 text-amber-700',
  Prepared: 'bg-blue-100 text-blue-700',
  'On-Going': 'bg-violet-100 text-violet-700',
  Complete: 'bg-green-100 text-green-700',
}

const COLUMN_WIDTHS = {
  source: '10%',
  name: '17%',
  status: '8%',
  level: '6%',
  campaignType: '10%',
  continuesFrom: '14%',
  party: '12%',
  note: '19%',
  actions: '8%',
}

function blankCampaign() {
  return {
    id: createId('campaign'),
    source: '',
    name: '',
    status: '-',
    briefContent: '',
    level: '',
    continuesFrom: '',
    campaignType: '',
    partyTagIds: [],
    note: '',
  }
}

function Tip({ text, children }) {
  if (!text) return children
  return (
    <span className="group relative inline-flex w-full">
      {children}
      <span className="pointer-events-none absolute bottom-full left-0 z-20 mb-1 hidden w-max max-w-[320px] whitespace-pre-line rounded-md bg-gray-900 px-2 py-1 text-[11px] leading-snug text-white group-hover:block">
        {text}
      </span>
    </span>
  )
}

function DisplayText({ value, className = '', title }) {
  const hasValue = value != null && String(value).trim() !== ''
  return (
    <div
      title={title}
      className={`w-full whitespace-pre-wrap break-words rounded-md px-2 py-1 leading-snug ${
        hasValue ? 'text-gray-800' : 'text-gray-300'
      } ${className}`}
    >
      {hasValue ? value : '—'}
    </div>
  )
}

function PartyTagChips({ ids, partyTags }) {
  const selected = partyTags.filter((t) => (ids ?? []).includes(t.id))
  if (selected.length === 0) {
    return <div className="px-2 py-1 text-gray-300">—</div>
  }
  return (
    <div className="flex flex-wrap gap-1 px-1 py-1">
      {selected.map((t) => (
        <span
          key={t.id}
          className="inline-flex items-center gap-1 rounded-full bg-[#f5ede0] px-2 py-0.5 text-xs text-stone-700"
        >
          <span
            className="h-2 w-2 rounded-full border border-gray-300"
            style={{ backgroundColor: t.color || '#e5e7eb' }}
          />
          {t.name || '(ไม่มีชื่อ)'}
        </span>
      ))}
    </div>
  )
}

function PartyTagPicker({ selectedIds, partyTags, onToggle }) {
  if (partyTags.length === 0) {
    return <p className="px-1 py-1 text-xs text-stone-400">ยังไม่มี Party (สร้างได้ที่หน้าตัวละคร)</p>
  }
  return (
    <div className="flex flex-wrap gap-1 p-1">
      {partyTags.map((t) => {
        const active = (selectedIds ?? []).includes(t.id)
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onToggle(t.id)}
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs transition-colors ${
              active
                ? 'border-purple-400 bg-violet-100 text-violet-700'
                : 'border-gray-300 bg-white text-stone-600 hover:bg-[#f5ede0]'
            }`}
          >
            <span
              className="h-2 w-2 rounded-full border border-gray-300"
              style={{ backgroundColor: t.color || '#e5e7eb' }}
            />
            {t.name || '(ไม่มีชื่อ)'}
          </button>
        )
      })}
    </div>
  )
}

function SortableTh({ label, sortKey, activeKey, dir, onSort }) {
  const isActive = activeKey === sortKey
  return (
    <th className="py-2 px-3">
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className="inline-flex items-center gap-1 hover:text-stone-700"
      >
        {label}
        <span className="text-[10px] leading-none">
          {isActive ? (dir === 'asc' ? '▲' : '▼') : '↕'}
        </span>
      </button>
    </th>
  )
}

function ContinuesFromSelect({ value, options, onSelect }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const normalized = search.trim().toLowerCase()
  const filtered = normalized
    ? options.filter((name) => name.toLowerCase().includes(normalized))
    : options

  function openDropdown() {
    setOpen(true)
    setSearch('')
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openDropdown())}
        className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-2 py-1 text-left leading-snug"
      >
        <span className={value ? 'text-gray-800' : 'text-stone-400'}>{value || 'ต่อจากอันไหน (เลือกแคมเปญ)'}</span>
        <span className="ml-1 text-[10px] text-stone-400">▼</span>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-md border border-[#e2cfb3] bg-white text-sm shadow-lg">
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาชื่อแคมเปญ..."
            className="w-full border-b border-[#e2cfb3] px-2 py-1 leading-snug outline-none"
          />
          <ul className="max-h-48 overflow-auto">
            <li>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onSelect('')
                  setOpen(false)
                }}
                className="block w-full px-2 py-1 text-left text-stone-400 hover:bg-violet-50"
              >
                — ไม่มี —
              </button>
            </li>
            {filtered.map((name) => (
              <li key={name}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onSelect(name)
                    setOpen(false)
                  }}
                  className="block w-full px-2 py-1 text-left hover:bg-violet-50"
                >
                  {name}
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-2 py-1 text-stone-400">ไม่พบแคมเปญที่ตรงกับคำค้นหา</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

function AutoGrowField({ value, onChange, placeholder, className = '', title, disabled = false }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [value])

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      title={title}
      rows={1}
      disabled={disabled}
      className={`w-full resize-none overflow-hidden whitespace-pre-wrap break-words rounded-md border border-gray-300 px-2 py-1 leading-snug disabled:cursor-not-allowed disabled:bg-[#f5ede0] disabled:text-stone-400 ${className}`}
    />
  )
}

export default function CampaignPage() {
  const { state, dispatch } = useGachaStore()
  const { showToast } = useToast()
  const campaigns = state.campaigns ?? []
  const partyTags = useMemo(
    () => [...(state.partyTags ?? [])].sort((a, b) => (a.name || '').localeCompare(b.name || '')),
    [state.partyTags],
  )
  const partyTagsById = useMemo(
    () => Object.fromEntries(partyTags.map((t) => [t.id, t])),
    [partyTags],
  )
  const [deleteCampaign, setDeleteCampaign] = useState(null)
  const [campaignForm, setCampaignForm] = useState(null)
  const [query, setQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterCampaignType, setFilterCampaignType] = useState('')
  const [filterParty, setFilterParty] = useState('')
  const [filterLevel, setFilterLevel] = useState('')
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const isEdit = campaignForm ? campaigns.some((c) => c.id === campaignForm.id) : false

  const campaignTypeOptions = useMemo(
    () =>
      [...new Set(campaigns.map((c) => c.campaignType).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b, 'th'),
      ),
    [campaigns],
  )
  const levelOptions = useMemo(
    () =>
      [...new Set(campaigns.map((c) => c.level).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b, 'th', { numeric: true }),
      ),
    [campaigns],
  )

  const normalizedQuery = query.trim().toLowerCase()
  const visibleCampaigns = useMemo(() => {
    const filtered = campaigns.filter((c) => {
      if (filterStatus && c.status !== filterStatus) return false
      if (filterCampaignType && c.campaignType !== filterCampaignType) return false
      if (filterParty && !(c.partyTagIds ?? []).includes(filterParty)) return false
      if (filterLevel && c.level !== filterLevel) return false
      if (!normalizedQuery) return true
      const partyNames = (c.partyTagIds ?? [])
        .map((id) => partyTagsById[id]?.name ?? '')
        .join(' ')
      const haystack = `${c.source} ${c.name} ${partyNames} ${c.note}`.toLowerCase()
      return haystack.includes(normalizedQuery)
    })

    if (!sortKey) return filtered

    const getSortValue = (c) => {
      if (sortKey === 'party') {
        return (c.partyTagIds ?? [])
          .map((id) => partyTagsById[id]?.name ?? '')
          .join(' ')
      }
      return c[sortKey] ?? ''
    }

    const sorted = [...filtered].sort((a, b) => {
      const va = getSortValue(a)
      const vb = getSortValue(b)
      const na = Number(va)
      const nb = Number(vb)
      let cmp
      if (va !== '' && vb !== '' && !Number.isNaN(na) && !Number.isNaN(nb)) {
        cmp = na - nb
      } else {
        cmp = String(va).localeCompare(String(vb), 'th')
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
    return sorted
  }, [
    campaigns,
    normalizedQuery,
    filterStatus,
    filterCampaignType,
    filterParty,
    filterLevel,
    partyTagsById,
    sortKey,
    sortDir,
  ])

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  function addCampaign() {
    setCampaignForm(blankCampaign())
  }

  function editCampaign(campaign) {
    setCampaignForm({ ...campaign })
  }

  function updateFormField(field, value) {
    setCampaignForm((prev) => {
      if (!prev) return null
      return { ...prev, [field]: value }
    })
  }

  function selectContinuesFromForForm(name) {
    if (!name) {
      updateFormField('continuesFrom', '')
      return
    }
    const noteAddition = `ต่อจาก: ${name}`
    const currentNote = campaignForm?.note || ''
    const nextNote = currentNote.includes(noteAddition)
      ? currentNote
      : currentNote
        ? `${currentNote}\n${noteAddition}`
        : noteAddition
    setCampaignForm((prev) => {
      if (!prev) return null
      return {
        ...prev,
        continuesFrom: name,
        note: nextNote,
      }
    })
  }

  function togglePartyTagForForm(tagId) {
    setCampaignForm((prev) => {
      if (!prev) return null
      const current = prev.partyTagIds ?? []
      const next = current.includes(tagId)
        ? current.filter((id) => id !== tagId)
        : [...current, tagId]
      return { ...prev, partyTagIds: next }
    })
  }

  function saveCampaign() {
    if (!campaignForm || !campaignForm.name.trim()) return
    if (isEdit) {
      dispatch({ type: 'UPDATE_CAMPAIGN', payload: { id: campaignForm.id, patch: campaignForm } })
      showToast('แก้ไขแคมเปญสำเร็จ', 'success')
    } else {
      dispatch({ type: 'ADD_CAMPAIGN', payload: campaignForm })
      showToast('เพิ่มแคมเปญใหม่แล้ว', 'success')
    }
    setCampaignForm(null)
  }

  function confirmDelete() {
    dispatch({ type: 'DELETE_CAMPAIGN', payload: { id: deleteCampaign.id } })
    setDeleteCampaign(null)
    setCampaignForm(null)
    showToast('ลบแคมเปญแล้ว', 'success')
  }

  return (
    <div className="w-full p-4 md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-cinzel text-2xl font-bold text-stone-900">แคมเปญ</h1>
          <p className="mt-0.5 text-sm text-stone-500">
            {query || filterStatus || filterCampaignType || filterParty || filterLevel
              ? `${visibleCampaigns.length}/${campaigns.length}`
              : campaigns.length}{' '}
            แคมเปญทั้งหมด
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={addCampaign}
            className="rounded-lg bg-violet-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-800"
          >
            + เพิ่มแคมเปญ
          </button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหา (Source, ชื่อ, Party, หมายเหตุ)..."
          className="w-full max-w-xs rounded-lg border border-[#e2cfb3] bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-200"
        />
        {/* Status pill filters */}
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setFilterStatus('')}
            className={!filterStatus
              ? 'rounded-full bg-violet-700 px-3 py-1 text-xs font-medium text-white'
              : 'rounded-full border border-[#e2cfb3] bg-white px-3 py-1 text-xs text-stone-600 hover:bg-[#f5ede0]'}
          >
            ทั้งหมด
          </button>
          {STATUS_OPTIONS.filter((s) => s !== '-').map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilterStatus(filterStatus === s ? '' : s)}
              className={filterStatus === s
                ? 'rounded-full bg-violet-700 px-3 py-1 text-xs font-medium text-white'
                : 'rounded-full border border-[#e2cfb3] bg-white px-3 py-1 text-xs text-stone-600 hover:bg-[#f5ede0]'}
            >
              {s}
            </button>
          ))}
        </div>
        <SearchSelect
          options={levelOptions.map((lvl) => ({ value: lvl, label: lvl }))}
          value={filterLevel}
          onChange={setFilterLevel}
          placeholder="Level: ทั้งหมด"
          clearLabel="ล้าง"
          className="w-36"
        />
        <SearchSelect
          options={campaignTypeOptions.map((t) => ({ value: t, label: t }))}
          value={filterCampaignType}
          onChange={setFilterCampaignType}
          placeholder="ประเภทแคมเปญ: ทั้งหมด"
          clearLabel="ล้าง"
          className="w-40"
        />
        <SearchSelect
          options={partyTags.map((t) => ({ value: t.id, label: t.name || '(ไม่มีชื่อ)' }))}
          value={filterParty}
          onChange={setFilterParty}
          placeholder="Party: ทั้งหมด"
          clearLabel="ล้าง"
          className="w-36"
        />
      </div>

      {campaigns.length === 0 ? (
        <p className="text-sm text-stone-400">ยังไม่มีแคมเปญ กด "+ เพิ่มแคมเปญ" เพื่อเริ่มต้น</p>
      ) : visibleCampaigns.length === 0 ? (
        <p className="text-sm text-stone-400">ไม่พบแคมเปญที่ตรงกับคำค้นหา/ตัวกรอง</p>
      ) : (
        <div className="rounded-lg border border-[#e2cfb3] bg-white shadow-sm">
          <table className="w-full table-fixed border-collapse text-sm">
            <colgroup>
              {Object.values(COLUMN_WIDTHS).map((w, i) => (
                <col key={i} style={{ width: w }} />
              ))}
            </colgroup>
            <thead>
              <tr className="border-b border-[#e2cfb3] bg-[#f5ede0] text-left text-xs text-stone-500">
                <SortableTh label="Source" sortKey="source" activeKey={sortKey} dir={sortDir} onSort={handleSort} />
                <SortableTh label="ชื่อแคมเปญ" sortKey="name" activeKey={sortKey} dir={sortDir} onSort={handleSort} />
                <SortableTh label="สถานะ" sortKey="status" activeKey={sortKey} dir={sortDir} onSort={handleSort} />
                <SortableTh label="Level" sortKey="level" activeKey={sortKey} dir={sortDir} onSort={handleSort} />
                <SortableTh label="ประเภทแคมเปญ" sortKey="campaignType" activeKey={sortKey} dir={sortDir} onSort={handleSort} />
                <SortableTh label="ต่อจากอันไหน" sortKey="continuesFrom" activeKey={sortKey} dir={sortDir} onSort={handleSort} />
                <SortableTh label="Party" sortKey="party" activeKey={sortKey} dir={sortDir} onSort={handleSort} />
                <SortableTh label="หมายเหตุ" sortKey="note" activeKey={sortKey} dir={sortDir} onSort={handleSort} />
                <th className="py-2 px-3"></th>
              </tr>
            </thead>
            <tbody>
              {visibleCampaigns.map((campaign) => {
                return (
                <tr key={campaign.id} className="border-b border-[#e2cfb3] align-top hover:bg-[#f5ede0]">
                  <td className="py-2 px-3">
                    <DisplayText value={campaign.source} />
                  </td>
                  <td className="py-2 px-3">
                    <Tip text={campaign.briefContent}>
                      <DisplayText
                        value={campaign.name}
                        title={campaign.briefContent ? 'ชี้ที่ชื่อเพื่อดูเนื้อหาคร่าวๆ' : undefined}
                        className={campaign.briefContent ? 'cursor-help font-medium underline decoration-dotted underline-offset-2' : 'font-medium'}
                      />
                    </Tip>
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        STATUS_STYLES[campaign.status] ?? STATUS_STYLES['-']
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <DisplayText value={campaign.level} />
                  </td>
                  <td className="py-2 px-3">
                    <DisplayText value={campaign.campaignType} />
                  </td>
                  <td className="py-2 px-3">
                    <DisplayText value={campaign.continuesFrom} />
                  </td>
                  <td className="py-2 px-3">
                    <PartyTagChips ids={campaign.partyTagIds} partyTags={partyTags} />
                  </td>
                  <td className="py-2 px-3">
                    <DisplayText value={campaign.note} />
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap text-right align-top">
                    <button
                      type="button"
                      onClick={() => editCampaign(campaign)}
                      className="inline-flex items-center justify-center rounded-md p-1 text-stone-400 hover:bg-[#f5ede0] hover:text-violet-600 transition-colors"
                      title="แก้ไขแคมเปญ"
                    >
                      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {campaignForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
          <div
            className="animate-fade-in flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-[#e2cfb3] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e2cfb3] px-6 py-4 bg-[#f5ede0]/30">
              <h2 className="font-cinzel text-xl font-bold text-stone-900">
                {isEdit ? 'แก้ไขแคมเปญ' : 'เพิ่มแคมเปญใหม่'}
              </h2>
              <button
                type="button"
                onClick={() => setCampaignForm(null)}
                className="rounded-md p-1 text-stone-400 hover:bg-[#f5ede0] hover:text-stone-600 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto px-6 py-4 space-y-4 text-sm">
              {/* Row 1: Name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-stone-700">ชื่อแคมเปญ <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={campaignForm.name}
                  onChange={(e) => updateFormField('name', e.target.value)}
                  placeholder="เช่น Curse of Strahd"
                  className="w-full rounded-lg border border-[#e2cfb3] bg-white px-3 py-2 text-stone-900 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-200 transition-shadow"
                  required
                />
              </div>

              {/* Row 2: Source & Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-stone-700">Source</label>
                  <input
                    type="text"
                    value={campaignForm.source}
                    onChange={(e) => updateFormField('source', e.target.value)}
                    placeholder="เช่น CoS, Homebrew"
                    className="w-full rounded-lg border border-[#e2cfb3] bg-white px-3 py-2 text-stone-900 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-200 transition-shadow"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-stone-700">Level</label>
                  <input
                    type="text"
                    value={campaignForm.level}
                    onChange={(e) => updateFormField('level', e.target.value)}
                    placeholder="เช่น 1-10"
                    className="w-full rounded-lg border border-[#e2cfb3] bg-white px-3 py-2 text-stone-900 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-200 transition-shadow"
                  />
                </div>
              </div>

              {/* Row 3: Status & Campaign Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-stone-700">สถานะ</label>
                  <select
                    value={campaignForm.status}
                    onChange={(e) => updateFormField('status', e.target.value)}
                    className={`w-full rounded-lg border border-gray-300 px-3 py-2 font-medium focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-200 ${
                      STATUS_STYLES[campaignForm.status] ?? ''
                    }`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-stone-700">ประเภทแคมเปญ</label>
                  <select
                    value={campaignForm.campaignType}
                    onChange={(e) => updateFormField('campaignType', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-200"
                  >
                    {CAMPAIGN_TYPE_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Continues From */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-stone-700">ต่อจากอันไหน</label>
                <ContinuesFromSelect
                  value={campaignForm.continuesFrom}
                  options={campaigns.filter((c) => c.name).map((c) => c.name)}
                  onSelect={selectContinuesFromForForm}
                />
              </div>

              {/* Row 5: Party Tags */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-stone-700">Party (กลุ่ม)</label>
                <PartyTagPicker
                  selectedIds={campaignForm.partyTagIds}
                  partyTags={partyTags}
                  onToggle={togglePartyTagForForm}
                />
              </div>

              {/* Row 6: Brief Content */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-stone-700">เนื้อหาคร่าวๆ (แสดงใน Tooltip)</label>
                <AutoGrowField
                  value={campaignForm.briefContent}
                  onChange={(e) => updateFormField('briefContent', e.target.value)}
                  placeholder="คำอธิบายหรือข้อมูลสรุปสั้นๆ..."
                  className="focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-200"
                />
              </div>

              {/* Row 7: Note */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-stone-700">หมายเหตุ</label>
                <AutoGrowField
                  value={campaignForm.note}
                  onChange={(e) => updateFormField('note', e.target.value)}
                  placeholder="โน้ตเพิ่มเติมเกี่ยวกับแคมเปญนี้..."
                  className="focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-200"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center border-t border-[#e2cfb3] px-6 py-3 bg-[#f5ede0]/10">
              <div>
                {isEdit && (
                  <button
                    type="button"
                    onClick={() => setDeleteCampaign(campaignForm)}
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
                  >
                    ลบแคมเปญ
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCampaignForm(null)}
                  className="rounded-lg px-4 py-2 text-stone-600 hover:bg-[#f5ede0] transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="button"
                  onClick={saveCampaign}
                  disabled={!campaignForm.name.trim()}
                  className="rounded-lg bg-violet-700 px-4 py-2 font-medium text-white shadow-sm hover:bg-violet-800 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500 transition-colors"
                >
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteCampaign}
        title="ลบแคมเปญ"
        message={`ต้องการลบแคมเปญ "${deleteCampaign?.name}" หรือไม่?`}
        confirmLabel="ลบ"
        danger
        onCancel={() => setDeleteCampaign(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
