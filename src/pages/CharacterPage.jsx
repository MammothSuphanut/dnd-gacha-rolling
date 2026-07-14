import { useEffect, useMemo, useRef, useState } from 'react'
import ConfirmDialog from '../components/ConfirmDialog'
import { useGachaStore } from '../store/GachaStore'
import { useToast } from '../store/ToastContext'
import { createId } from '../utils/id'
import {
  SIZE_OPTIONS,
  STAT_KEYS,
  getBackgroundOptions,
  getClassSubclassOptions,
  getSpeciesOptions,
} from '../utils/gachaOptions'
import { downloadDataUrl, getExtensionFromDataUrl } from '../utils/exportImport'
import {
  characterImageKey,
  deleteImage,
  getImage,
  readFileAsDataUrl,
  saveImage,
} from '../utils/imageStore'

const TABS = [
  { key: 'characters', label: 'ตัวละคร' },
  { key: 'users', label: 'ผู้เล่น (User)' },
  { key: 'parties', label: 'Party (Tag)' },
]

const DEFAULT_COLOR = '#7c3aed'
const MAX_TOTAL_LEVEL = 20

function blankUser() {
  return { id: createId('user'), username: '', note: '', color: DEFAULT_COLOR }
}

function blankPartyTag() {
  return { id: createId('tag'), name: '', color: DEFAULT_COLOR }
}

function blankStats() {
  return STAT_KEYS.reduce((acc, s) => ({ ...acc, [s.key]: 0 }), {})
}

function blankClassLevel() {
  return { id: createId('classlevel'), className: '', subclassName: '', level: 1 }
}

function blankCharacter() {
  return {
    id: createId('character'),
    name: '',
    ownerId: '',
    partyTagIds: [],
    campaignIds: [],
    classLevels: [blankClassLevel()],
    species: '',
    background: '',
    size: 'Medium',
    stats: blankStats(),
    alignment: '',
    faith: '',
    gender: '',
    eyes: '',
    hair: '',
    skin: '',
    height: '',
    weight: '',
    age: '',
    ideals: '',
    bonds: '',
    flaws: '',
    personalityTraits: '',
    appearance: '',
    biography: '',
    note: '',
    images: [],
    activeImageId: '',
  }
}

// Normalizes characters saved under the older single-party/single-class/single-image
// schema so every consumer of the character list can rely on the current shape.
function normalizeCharacter(raw) {
  const partyTagIds = raw.partyTagIds ?? (raw.partyTagId ? [raw.partyTagId] : [])
  const campaignIds = raw.campaignIds ?? (raw.campaignId ? [raw.campaignId] : [])
  const classLevels =
    raw.classLevels && raw.classLevels.length > 0
      ? raw.classLevels
      : raw.className
        ? [
            {
              id: createId('classlevel'),
              className: raw.className,
              subclassName: raw.subclassName || '',
              level: raw.level || 1,
            },
          ]
        : [blankClassLevel()]
  const images =
    raw.images && raw.images.length > 0
      ? raw.images
      : raw.hasImage
        ? [{ id: 'legacy', label: 'ร่างหลัก' }]
        : []
  const activeImageId =
    raw.activeImageId && images.some((img) => img.id === raw.activeImageId)
      ? raw.activeImageId
      : images[0]?.id || ''

  const alignment = raw.alignment ?? ''
  const faith = raw.faith ?? ''
  const gender = raw.gender ?? ''
  const eyes = raw.eyes ?? ''
  const hair = raw.hair ?? ''
  const skin = raw.skin ?? ''
  const height = raw.height ?? ''
  const weight = raw.weight ?? ''
  const age = raw.age ?? ''
  const ideals = raw.ideals ?? ''
  const bonds = raw.bonds ?? ''
  const flaws = raw.flaws ?? ''
  const personalityTraits = raw.personalityTraits ?? ''
  const appearance = raw.appearance ?? ''
  const biography = raw.biography ?? ''

  return {
    ...raw,
    partyTagIds,
    campaignIds,
    classLevels,
    images,
    activeImageId,
    alignment,
    faith,
    gender,
    eyes,
    hair,
    skin,
    height,
    weight,
    age,
    ideals,
    bonds,
    flaws,
    personalityTraits,
    appearance,
    biography,
  }
}

function totalLevel(character) {
  return (character.classLevels ?? []).reduce((sum, cl) => sum + (Number(cl.level) || 0), 0)
}

function classSummary(character) {
  return (character.classLevels ?? [])
    .filter((cl) => cl.className)
    .map((cl) => `${cl.className} ${cl.level}`)
    .join(' / ')
}

function getActiveImageKey(character) {
  const images = character.images ?? []
  if (images.length === 0) return null
  const active = images.find((img) => img.id === character.activeImageId) ?? images[0]
  return characterImageKey(character.id, active.id)
}

function ColorSwatch({ color }) {
  return (
    <span
      className="inline-block h-4 w-4 rounded-full border border-gray-300 align-middle"
      style={{ backgroundColor: color || '#e5e7eb' }}
    />
  )
}

function CharacterImage({ imageKey, version, className, downloadName, allowDownload = true }) {
  const [src, setSrc] = useState(null)

  useEffect(() => {
    let cancelled = false
    if (!imageKey) {
      setSrc(null)
      return
    }
    getImage(imageKey).then((dataUrl) => {
      if (!cancelled) setSrc(dataUrl)
    })
    return () => {
      cancelled = true
    }
  }, [imageKey, version])

  if (!src) {
    return (
      <div className={`flex items-center justify-center bg-[#f5ede0] text-gray-300 ${className}`}>
        ไม่มีรูป
      </div>
    )
  }

  return (
    <div className={`group relative ${className}`}>
      <img src={src} alt="" className="h-full w-full object-cover" />
      {allowDownload && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            downloadDataUrl(src, `${downloadName || 'character'}.${getExtensionFromDataUrl(src)}`)
          }}
          className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
          ดาวน์โหลด
        </button>
      )}
    </div>
  )
}

export default function CharacterPage() {
  const { state, dispatch } = useGachaStore()
  const { showToast } = useToast()
  const users = state.users ?? []
  const partyTags = state.partyTags ?? []
  const characters = useMemo(
    () => (state.characters ?? []).map(normalizeCharacter),
    [state.characters],
  )
  const campaigns = state.campaigns ?? []

  const [tab, setTab] = useState('characters')

  const { classes, subclassesByClass } = useMemo(
    () => getClassSubclassOptions(state.boxes),
    [state.boxes],
  )
  const speciesOptions = useMemo(() => getSpeciesOptions(state.boxes), [state.boxes])
  const backgroundOptions = useMemo(() => getBackgroundOptions(state.boxes), [state.boxes])

  return (
    <div className="w-full p-4 md:p-8">
      <div className="mb-6">
        <h1 className="font-cinzel text-2xl font-bold text-stone-900">ตัวละคร</h1>
        <p className="mt-0.5 text-sm text-stone-500">จัดการผู้เล่น, Party และตัวละคร</p>
      </div>

      {/* Pill tabs */}
      <div className="mb-6 flex flex-wrap gap-1.5 rounded-xl bg-[#f5ede0] p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150 ${
              tab === t.key
                ? 'bg-white text-violet-700 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'users' && <UsersTab users={users} dispatch={dispatch} showToast={showToast} />}
      {tab === 'parties' && (
        <PartyTagsTab partyTags={partyTags} dispatch={dispatch} showToast={showToast} />
      )}
      {tab === 'characters' && (
        <CharactersTab
          characters={characters}
          users={users}
          partyTags={partyTags}
          campaigns={campaigns}
          classes={classes}
          subclassesByClass={subclassesByClass}
          speciesOptions={speciesOptions}
          backgroundOptions={backgroundOptions}
          dispatch={dispatch}
          showToast={showToast}
        />
      )}
    </div>
  )
}

function UsersTab({ users, dispatch, showToast }) {
  const [deleteTarget, setDeleteTarget] = useState(null)

  function addUser() {
    dispatch({ type: 'ADD_USER', payload: blankUser() })
  }

  function updateUser(id, patch) {
    dispatch({ type: 'UPDATE_USER', payload: { id, patch } })
  }

  function confirmDelete() {
    dispatch({ type: 'DELETE_USER', payload: { id: deleteTarget.id } })
    setDeleteTarget(null)
    showToast('ลบผู้เล่นแล้ว', 'success')
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={addUser}
          className="rounded-md bg-violet-700 px-4 py-2 text-sm font-medium text-white hover:bg-violet-800"
        >
          + เพิ่มผู้เล่น
        </button>
      </div>

      {users.length === 0 ? (
        <p className="text-sm text-stone-400">ยังไม่มีผู้เล่น กด "+ เพิ่มผู้เล่น" เพื่อเริ่มต้น</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-[#e2cfb3] bg-white shadow-sm">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#e2cfb3] bg-[#f5ede0] text-left text-xs text-stone-500">
                <th className="py-2 px-3 w-1/4">Username</th>
                <th className="py-2 px-3">Note</th>
                <th className="py-2 px-3 w-48">สีประจำตัว</th>
                <th className="py-2 px-3 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-[#e2cfb3] hover:bg-[#f5ede0]">
                  <td className="py-2 px-3">
                    <input
                      value={user.username}
                      onChange={(e) => updateUser(user.id, { username: e.target.value })}
                      placeholder="Username"
                      className="w-full rounded-md border border-gray-300 px-2 py-1"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      value={user.note}
                      onChange={(e) => updateUser(user.id, { note: e.target.value })}
                      placeholder="หมายเหตุ"
                      className="w-full rounded-md border border-gray-300 px-2 py-1"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={user.color || DEFAULT_COLOR}
                        onChange={(e) => updateUser(user.id, { color: e.target.value })}
                        className="h-8 w-8 cursor-pointer rounded border border-gray-300 bg-transparent p-0.5"
                      />
                      <input
                        value={user.color || DEFAULT_COLOR}
                        onChange={(e) => updateUser(user.id, { color: e.target.value })}
                        className="w-24 rounded-md border border-gray-300 px-2 py-1 font-mono text-xs uppercase"
                      />
                    </div>
                  </td>
                  <td className="py-2 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(user)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="ลบผู้เล่น"
        message={`ต้องการลบผู้เล่น "${deleteTarget?.username}" หรือไม่?`}
        confirmLabel="ลบ"
        danger
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

function PartyTagsTab({ partyTags, dispatch, showToast }) {
  const [deleteTarget, setDeleteTarget] = useState(null)

  function addTag() {
    dispatch({ type: 'ADD_PARTY_TAG', payload: blankPartyTag() })
  }

  function updateTag(id, patch) {
    dispatch({ type: 'UPDATE_PARTY_TAG', payload: { id, patch } })
  }

  function confirmDelete() {
    dispatch({ type: 'DELETE_PARTY_TAG', payload: { id: deleteTarget.id } })
    setDeleteTarget(null)
    showToast('ลบ Party แล้ว', 'success')
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={addTag}
          className="rounded-md bg-violet-700 px-4 py-2 text-sm font-medium text-white hover:bg-violet-800"
        >
          + เพิ่ม Party
        </button>
      </div>

      {partyTags.length === 0 ? (
        <p className="text-sm text-stone-400">ยังไม่มี Party กด "+ เพิ่ม Party" เพื่อเริ่มต้น</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-[#e2cfb3] bg-white shadow-sm">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#e2cfb3] bg-[#f5ede0] text-left text-xs text-stone-500">
                <th className="py-2 px-3">ชื่อ Party</th>
                <th className="py-2 px-3 w-48">สี</th>
                <th className="py-2 px-3 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {partyTags.map((tag) => (
                <tr key={tag.id} className="border-b border-[#e2cfb3] hover:bg-[#f5ede0]">
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <ColorSwatch color={tag.color} />
                      <input
                        value={tag.name}
                        onChange={(e) => updateTag(tag.id, { name: e.target.value })}
                        placeholder="ชื่อ Party"
                        className="w-full rounded-md border border-gray-300 px-2 py-1"
                      />
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={tag.color || DEFAULT_COLOR}
                        onChange={(e) => updateTag(tag.id, { color: e.target.value })}
                        className="h-8 w-8 cursor-pointer rounded border border-gray-300 bg-transparent p-0.5"
                      />
                      <input
                        value={tag.color || DEFAULT_COLOR}
                        onChange={(e) => updateTag(tag.id, { color: e.target.value })}
                        className="w-24 rounded-md border border-gray-300 px-2 py-1 font-mono text-xs uppercase"
                      />
                    </div>
                  </td>
                  <td className="py-2 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(tag)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="ลบ Party"
        message={`ต้องการลบ Party "${deleteTarget?.name}" หรือไม่?`}
        confirmLabel="ลบ"
        danger
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

function FormSection({ icon, title, hint, children }) {
  return (
    <section className="rounded-lg border border-[#e2cfb3] bg-white p-4">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h3 className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
          <span aria-hidden>{icon}</span>
          {title}
        </h3>
        {hint && <span className="text-[11px] text-stone-400">{hint}</span>}
      </div>
      {children}
    </section>
  )
}

function SearchableMultiSelect({ options, selectedIds, onToggle, emptyLabel, getColor, placeholder = 'ค้นหา...' }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOptions = options.filter((opt) => selectedIds.includes(opt.id))
  const filteredOptions = options.filter(
    (opt) =>
      !selectedIds.includes(opt.id) &&
      (opt.name || '').toLowerCase().includes(query.toLowerCase()),
  )

  if (options.length === 0) {
    return <p className="text-xs text-stone-400">{emptyLabel}</p>
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Selected chips */}
      {selectedOptions.length > 0 && (
        <div className="mb-1.5 flex flex-wrap gap-1">
          {selectedOptions.map((opt) => (
            <span
              key={opt.id}
              className="inline-flex items-center gap-1 rounded-full border border-violet-300 bg-violet-100 px-2 py-0.5 text-xs text-violet-700"
            >
              {getColor && (
                <span
                  className="h-2 w-2 rounded-full border border-violet-300"
                  style={{ backgroundColor: getColor(opt) || '#e5e7eb' }}
                />
              )}
              {opt.name || '(ไม่มีชื่อ)'}
              <button
                type="button"
                onClick={() => onToggle(opt.id)}
                className="ml-0.5 leading-none text-purple-500 hover:text-purple-800"
                aria-label={`ลบ ${opt.name}`}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search input */}
      <input
        type="text"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        placeholder={selectedOptions.length === 0 ? placeholder : 'เพิ่มเติม...'}
        className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-md border border-[#e2cfb3] bg-white shadow-lg">
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-xs text-stone-400">
              {query ? 'ไม่พบผลลัพธ์' : 'เลือกครบทุกรายการแล้ว'}
            </div>
          ) : (
            filteredOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onMouseDown={(e) => { e.preventDefault(); onToggle(opt.id); setQuery('') }}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-stone-700 hover:bg-violet-50 hover:text-violet-700"
              >
                {getColor && (
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full border border-gray-300"
                    style={{ backgroundColor: getColor(opt) || '#e5e7eb' }}
                  />
                )}
                {opt.name || '(ไม่มีชื่อ)'}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}

function CharacterFormModal({
  initial,
  users,
  partyTags,
  campaigns,
  classes,
  subclassesByClass,
  speciesOptions,
  backgroundOptions,
  onCancel,
  onSave,
  onDelete,
}) {
  const isEditing = !!initial.name
  const [form, setForm] = useState(initial)
  const fileInputRef = useRef(null)

  const [viewMode, setViewMode] = useState(isEditing)
  const [selectedViewImageId, setSelectedViewImageId] = useState(initial.activeImageId || initial.images?.[0]?.id || '')
  const [resetVersion, setResetVersion] = useState(0)

  // gallery holds the working copy of the image variants: existing ones (with a
  // dataUrl loaded lazily) plus any newly-picked files (dataUrl already known).
  const [gallery, setGallery] = useState(() => ({
    images: (initial.images ?? []).map((img) => ({ ...img, dataUrl: null, isNew: false })),
    activeImageId: initial.activeImageId || initial.images?.[0]?.id || '',
    deletedIds: [],
  }))

  useEffect(() => {
    let cancelled = false
    ;(initial.images ?? []).forEach((img) => {
      const key = characterImageKey(initial.id, img.id)
      getImage(key).then((dataUrl) => {
        if (cancelled || !dataUrl) return
        setGallery((g) => ({
          ...g,
          images: g.images.map((i) => (i.id === img.id ? { ...i, dataUrl } : i)),
        }))
      })
    })
    return () => {
      cancelled = true
    }
  }, [initial.id, initial.images, resetVersion])

  const filteredCampaigns = useMemo(() => {
    // ถ้ายังไม่มี party ที่เลือก → แสดงทั้งหมด
    if (form.partyTagIds.length === 0) return [...campaigns].sort((a, b) => (a.name || '').localeCompare(b.name || ''))

    // กรองเฉพาะ campaigns ที่ partyTagIds ตรงกับ party ที่เลือก
    // และรวม campaigns ที่ถูก assign ไว้แล้ว (ป้องกันหาย)
    const matched = campaigns.filter(
      (c) =>
        form.campaignIds.includes(c.id) ||
        (c.partyTagIds ?? []).some((id) => form.partyTagIds.includes(id)),
    )
    matched.sort((a, b) => {
      // แสดง campaigns ที่ assign แล้วก่อน จากนั้นเรียงตามชื่อ
      const aAssigned = form.campaignIds.includes(a.id) ? 0 : 1
      const bAssigned = form.campaignIds.includes(b.id) ? 0 : 1
      if (aAssigned !== bAssigned) return aAssigned - bAssigned
      return (a.name || '').localeCompare(b.name || '')
    })
    return matched
  }, [campaigns, form.partyTagIds, form.campaignIds])

  function patch(fields) {
    setForm((prev) => ({ ...prev, ...fields }))
  }

  function togglePartyTag(id) {
    setForm((prev) => ({
      ...prev,
      partyTagIds: prev.partyTagIds.includes(id)
        ? prev.partyTagIds.filter((x) => x !== id)
        : [...prev.partyTagIds, id],
    }))
  }

  function toggleCampaign(id) {
    setForm((prev) => ({
      ...prev,
      campaignIds: prev.campaignIds.includes(id)
        ? prev.campaignIds.filter((x) => x !== id)
        : [...prev.campaignIds, id],
    }))
  }

  function patchStat(key, value) {
    const num = value === '' || value === '-' ? value : Number(value)
    setForm((prev) => ({ ...prev, stats: { ...prev.stats, [key]: num } }))
  }

  function addClassLevel() {
    setForm((prev) => ({ ...prev, classLevels: [...prev.classLevels, blankClassLevel()] }))
  }

  function updateClassLevel(id, fields) {
    setForm((prev) => ({
      ...prev,
      classLevels: prev.classLevels.map((cl) => (cl.id === id ? { ...cl, ...fields } : cl)),
    }))
  }

  function removeClassLevel(id) {
    setForm((prev) => ({
      ...prev,
      classLevels: prev.classLevels.length > 1 ? prev.classLevels.filter((cl) => cl.id !== id) : prev.classLevels,
    }))
  }

  async function handleAddImages(fileList) {
    const files = Array.from(fileList || [])
    if (files.length === 0) return
    const newImgs = []
    for (const file of files) {
      const dataUrl = await readFileAsDataUrl(file)
      newImgs.push({ id: createId('img'), label: '', dataUrl, isNew: true })
    }
    setGallery((g) => ({
      ...g,
      images: [...g.images, ...newImgs],
      activeImageId: g.activeImageId || newImgs[0].id,
    }))
  }

  function handleImageInputChange(e) {
    handleAddImages(e.target.files)
    e.target.value = ''
  }

  function handleRemoveImage(id) {
    setGallery((g) => {
      const target = g.images.find((img) => img.id === id)
      const images = g.images.filter((img) => img.id !== id)
      const deletedIds = target && !target.isNew ? [...g.deletedIds, id] : g.deletedIds
      const activeImageId = g.activeImageId === id ? images[0]?.id || '' : g.activeImageId
      return { images, deletedIds, activeImageId }
    })
  }

  function handleLabelChange(id, label) {
    setGallery((g) => ({
      ...g,
      images: g.images.map((img) => (img.id === id ? { ...img, label } : img)),
    }))
  }

  function handleSetActive(id) {
    setGallery((g) => ({ ...g, activeImageId: id }))
  }

  async function handleSave() {
    for (const img of gallery.images) {
      if (img.isNew) {
        await saveImage(characterImageKey(form.id, img.id), img.dataUrl)
      }
    }
    for (const deletedId of gallery.deletedIds) {
      await deleteImage(characterImageKey(form.id, deletedId))
    }
    const normalizedStats = STAT_KEYS.reduce((acc, s) => {
      const raw = form.stats[s.key]
      const num = Number(raw)
      acc[s.key] = Number.isFinite(num) ? num : 0
      return acc
    }, {})
    const images = gallery.images.map(({ id, label }) => ({ id, label }))
    const activeImageId = images.some((img) => img.id === gallery.activeImageId)
      ? gallery.activeImageId
      : images[0]?.id || ''
    
    const updatedCharacter = { ...form, stats: normalizedStats, images, activeImageId }
    onSave(updatedCharacter, true)

    if (isEditing) {
      setGallery((g) => ({
        images: g.images.map((img) => ({ ...img, isNew: false })),
        activeImageId,
        deletedIds: [],
      }))
      setSelectedViewImageId(activeImageId)
      setViewMode(true)
    }
  }

  function handleCancel() {
    if (isEditing) {
      setForm(initial)
      setGallery({
        images: (initial.images ?? []).map((img) => ({ ...img, dataUrl: null, isNew: false })),
        activeImageId: initial.activeImageId || initial.images?.[0]?.id || '',
        deletedIds: [],
      })
      setSelectedViewImageId(initial.activeImageId || initial.images?.[0]?.id || '')
      setResetVersion((v) => v + 1)
      setViewMode(true)
    } else {
      onCancel()
    }
  }

  const level = form.classLevels.reduce((sum, cl) => sum + (Number(cl.level) || 0), 0)
  const overLevel = level > MAX_TOTAL_LEVEL

  if (viewMode) {
    const activePreview = gallery.images.find((img) => img.id === (selectedViewImageId || gallery.activeImageId))?.dataUrl
    const ownerUser = users.find((u) => u.id === form.ownerId)
    const selectedParties = partyTags.filter((t) => form.partyTagIds.includes(t.id))
    const selectedCampaigns = campaigns.filter((c) => form.campaignIds.includes(c.id))

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onCancel}>
        <div
          className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#e2cfb3] px-6 py-4 bg-[#f5ede0]/30">
            <div>
              <h2 className="font-cinzel text-2xl font-bold text-stone-900 leading-tight">
                {form.name || '(ไม่มีชื่อตัวละคร)'}
              </h2>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
                {ownerUser && (
                  <span className="flex items-center gap-1">
                    <span className="font-medium text-stone-600">ผู้เล่น:</span>
                    <span className="inline-flex items-center gap-1 rounded bg-[#f5ede0] px-1.5 py-0.5 text-stone-700 font-semibold">
                      {ownerUser.color && <ColorSwatch color={ownerUser.color} />}
                      {ownerUser.username}
                    </span>
                  </span>
                )}
                <span>•</span>
                <span>Lv.{level} {form.species || 'ไม่ระบุเผ่าพันธุ์'}</span>
                {form.background && (
                  <>
                    <span>•</span>
                    <span>ภูมิหลัง: {form.background}</span>
                  </>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md p-1.5 text-stone-400 hover:bg-[#f5ede0] hover:text-stone-600"
              aria-label="ปิด"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto bg-[#fdfbf7] p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Column: Image showcase (5 cols) */}
              <div className="md:col-span-5 flex flex-col gap-3">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-[#e2cfb3] bg-[#f5ede0] shadow-inner flex items-center justify-center">
                  {activePreview ? (
                    <img src={activePreview} alt={form.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-stone-300">
                      <span className="text-4xl">🖼️</span>
                      <span className="text-xs">ไม่มีรูปภาพ</span>
                    </div>
                  )}
                  <span className="absolute bottom-3 left-3 rounded-lg bg-violet-700 px-2 py-1 text-xs font-bold text-white shadow">
                    Lv.{level}
                  </span>
                </div>

                {/* Gallery skins list */}
                {gallery.images.length > 1 && (
                  <div>
                    <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
                      ร่างตัวละคร ({gallery.images.length})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {gallery.images.map((img) => {
                        const isCurrent = img.id === (selectedViewImageId || gallery.activeImageId)
                        return (
                          <button
                            key={img.id}
                            type="button"
                            onClick={() => setSelectedViewImageId(img.id)}
                            className={`group relative w-16 rounded-lg border p-1 transition-all ${
                              isCurrent
                                ? 'border-purple-400 bg-violet-50 ring-2 ring-purple-300'
                                : 'border-[#e2cfb3] bg-white hover:border-purple-300'
                            }`}
                          >
                            <div className="h-12 w-full overflow-hidden rounded bg-[#f5ede0]">
                              {img.dataUrl ? (
                                <img src={img.dataUrl} alt="" className="h-full w-full object-cover" />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-300">
                                  ...
                                </div>
                              )}
                            </div>
                            {img.label && (
                              <div className="mt-0.5 truncate text-[9px] text-stone-500 text-center leading-tight max-w-full px-0.5">
                                {img.label}
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Character Details (7 cols) */}
              <div className="md:col-span-7 space-y-5">
                {/* Party & Campaigns */}
                {(selectedParties.length > 0 || selectedCampaigns.length > 0) && (
                  <div className="flex flex-wrap gap-2">
                    {selectedParties.map((party) => (
                      <span
                        key={party.id}
                        className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold"
                        style={{
                          borderColor: party.color || DEFAULT_COLOR,
                          color: party.color || DEFAULT_COLOR,
                          backgroundColor: `${party.color || DEFAULT_COLOR}0c`,
                        }}
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: party.color || DEFAULT_COLOR }}
                        />
                        {party.name}
                      </span>
                    ))}
                    {selectedCampaigns.map((camp) => (
                      <span
                        key={camp.id}
                        className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700"
                      >
                        🏰 {camp.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Multiclass Details */}
                <div className="rounded-lg border border-[#e2cfb3] bg-stone-50/50 p-3.5">
                  <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
                    คลาสและระดับเลเวล
                  </div>
                  <div className="space-y-1.5">
                    {form.classLevels.map((cl, idx) => (
                      <div key={cl.id || idx} className="flex items-center justify-between text-sm text-stone-800">
                        <span className="font-semibold">
                          {cl.className || '(ไม่มีคลาส)'}
                          {cl.subclassName && (
                            <span className="ml-1.5 font-normal text-stone-500">({cl.subclassName})</span>
                          )}
                        </span>
                        <span className="font-mono font-bold text-violet-700 bg-violet-50 border border-violet-100 rounded px-2 py-0.5 text-xs">
                          Level {cl.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats Modifier Grid */}
                <div>
                  <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
                    ค่าพลังสเตตัส
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {STAT_KEYS.map((s) => {
                      const val = form.stats[s.key]
                      const num = Number(val)
                      const formatted = num > 0 ? `+${num}` : `${num}`
                      return (
                        <div
                          key={s.key}
                          className="flex flex-col items-center justify-center rounded-lg border border-[#e2cfb3] bg-white p-2.5 shadow-sm text-center"
                        >
                          <span className="text-[10px] font-bold text-stone-400">{s.label}</span>
                          <span className="mt-1 font-cinzel text-lg font-bold text-stone-900">
                            {formatted}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Basic Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Species', value: form.species },
                    { label: 'Background', value: form.background },
                    { label: 'Size', value: form.size },
                    { label: 'Alignment', value: form.alignment },
                    { label: 'Faith', value: form.faith },
                    { label: 'Gender', value: form.gender },
                    { label: 'Age', value: form.age },
                    { label: 'Height', value: form.height },
                    { label: 'Weight', value: form.weight },
                    { label: 'Eyes', value: form.eyes },
                    { label: 'Hair', value: form.hair },
                    { label: 'Skin', value: form.skin },
                  ].map(
                    (item) =>
                      item.value && (
                        <div
                          key={item.label}
                          className="rounded-lg border border-stone-200 bg-white p-2.5 shadow-sm"
                        >
                          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                            {item.label}
                          </div>
                          <div className="mt-0.5 text-xs font-semibold text-stone-800 truncate" title={item.value}>
                            {item.value}
                          </div>
                        </div>
                      ),
                  )}
                </div>
              </div>
            </div>

            {/* Bottom details block (Full width details) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Personality / Ideal / Bond / Flaws */}
              {(form.ideals || form.bonds || form.flaws || form.personalityTraits) && (
                <div className="space-y-4 rounded-xl border border-[#e2cfb3] bg-white p-4">
                  <h3 className="font-cinzel text-sm font-bold text-stone-800 border-b border-stone-100 pb-2">
                    🎭 บุคลิกภาพและค่านิยม (Personality & Values)
                  </h3>
                  <div className="space-y-3">
                    {form.ideals && (
                      <div>
                        <span className="text-xs font-bold text-stone-400 uppercase flex items-center gap-1">
                          🌱 Ideals
                        </span>
                        <p className="mt-1 text-xs text-stone-700 whitespace-pre-wrap leading-relaxed">
                          {form.ideals}
                        </p>
                      </div>
                    )}
                    {form.bonds && (
                      <div>
                        <span className="text-xs font-bold text-stone-400 uppercase flex items-center gap-1">
                          🔗 Bonds
                        </span>
                        <p className="mt-1 text-xs text-stone-700 whitespace-pre-wrap leading-relaxed">
                          {form.bonds}
                        </p>
                      </div>
                    )}
                    {form.flaws && (
                      <div>
                        <span className="text-xs font-bold text-stone-400 uppercase flex items-center gap-1">
                          💔 Flaws
                        </span>
                        <p className="mt-1 text-xs text-stone-700 whitespace-pre-wrap leading-relaxed">
                          {form.flaws}
                        </p>
                      </div>
                    )}
                    {form.personalityTraits && (
                      <div>
                        <span className="text-xs font-bold text-stone-400 uppercase flex items-center gap-1">
                          🧩 Personality Traits
                        </span>
                        <p className="mt-1 text-xs text-stone-700 whitespace-pre-wrap leading-relaxed">
                          {form.personalityTraits}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Appearance & Biography */}
              {(form.appearance || form.biography) && (
                <div className="space-y-4 rounded-xl border border-[#e2cfb3] bg-white p-4">
                  <h3 className="font-cinzel text-sm font-bold text-stone-800 border-b border-stone-100 pb-2">
                    📜 รูปลักษณ์และประวัติ (Appearance & Bio)
                  </h3>
                  <div className="space-y-3">
                    {form.appearance && (
                      <div>
                        <span className="text-xs font-bold text-stone-400 uppercase flex items-center gap-1">
                          👤 Appearance
                        </span>
                        <p className="mt-1 text-xs text-stone-700 whitespace-pre-wrap leading-relaxed">
                          {form.appearance}
                        </p>
                      </div>
                    )}
                    {form.biography && (
                      <div>
                        <span className="text-xs font-bold text-stone-400 uppercase flex items-center gap-1">
                          🏺 Biography
                        </span>
                        <p className="mt-1 text-xs text-stone-700 whitespace-pre-wrap leading-relaxed">
                          {form.biography}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Note Section */}
            {form.note && (
              <div className="rounded-xl border border-[#e2cfb3] bg-stone-50/50 p-4">
                <span className="text-xs font-bold text-stone-400 uppercase flex items-center gap-1">
                  📝 หมายเหตุ (Notes)
                </span>
                <p className="mt-1 text-xs text-stone-700 whitespace-pre-wrap leading-relaxed">
                  {form.note}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-[#e2cfb3] px-6 py-4 bg-[#f5ede0]/30">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm hover:bg-[#f5ede0]"
            >
              ปิด
            </button>
            <button
              type="button"
              onClick={() => setViewMode(false)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-violet-700 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-800"
            >
              ✏️ แก้ไข
            </button>
          </div>
        </div>
      </div>
    )
  }

  const activePreview = gallery.images.find((img) => img.id === gallery.activeImageId)?.dataUrl

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onCancel}>
      <div
        className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e2cfb3] px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-stone-900">
              {isEditing ? 'แก้ไขตัวละคร' : 'สร้างตัวละคร'}
            </h2>
            <p className="text-xs text-stone-400">บันทึกข้อมูลตัวละคร D&amp;D อย่างครบถ้วน</p>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md p-1.5 text-stone-400 hover:bg-[#f5ede0] hover:text-stone-600"
            aria-label="ปิด"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto bg-[#f5ede0] px-5 py-4">
          <FormSection icon="🖼️" title="ภาพตัวละคร" hint="อัปโหลดได้หลายรูป เลือกรูปหลักที่จะแสดง">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="h-36 w-36 shrink-0 overflow-hidden rounded-md border border-[#e2cfb3] bg-[#f5ede0]">
                {activePreview ? (
                  <img src={activePreview} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-gray-300">
                    ไม่มีรูป
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {gallery.images.map((img) => {
                    const active = img.id === gallery.activeImageId
                    return (
                      <div
                        key={img.id}
                        className={`group relative w-20 rounded-md border p-1 ${
                          active ? 'border-purple-400 bg-violet-50 ring-1 ring-purple-300' : 'border-[#e2cfb3] bg-white'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleSetActive(img.id)}
                          className="block h-16 w-full overflow-hidden rounded bg-[#f5ede0]"
                          title="ตั้งเป็นรูปหลัก"
                        >
                          {img.dataUrl ? (
                            <img src={img.dataUrl} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-300">
                              ...
                            </div>
                          )}
                        </button>
                        <input
                          value={img.label}
                          onChange={(e) => handleLabelChange(img.id, e.target.value)}
                          placeholder="ชื่อร่าง"
                          className="mt-1 w-full rounded border border-[#e2cfb3] px-1 py-0.5 text-center text-[10px]"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(img.id)}
                          className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] leading-none text-white opacity-0 shadow group-hover:opacity-100"
                          aria-label="ลบรูปนี้"
                        >
                          ✕
                        </button>
                        {active && (
                          <span className="absolute left-1 top-1 rounded bg-violet-700 px-1 text-[9px] font-medium text-white">
                            หลัก
                          </span>
                        )}
                      </div>
                    )
                  })}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-[76px] w-20 flex-col items-center justify-center gap-1 rounded-md border border-dashed border-gray-300 text-stone-400 hover:border-purple-400 hover:text-purple-500"
                  >
                    <span className="text-lg leading-none">+</span>
                    <span className="text-[10px]">เพิ่มรูป</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageInputChange}
                  />
                </div>
                {gallery.images.length > 0 && (
                  <p className="mt-2 text-[11px] text-stone-400">
                    คลิกที่รูปเพื่อตั้งเป็นรูปหลักที่แสดงในรายการ ({gallery.images.length} ร่าง)
                  </p>
                )}
              </div>
            </div>
          </FormSection>

          <FormSection icon="🛡️" title="สังกัด" hint="เลือกได้มากกว่า 1">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs text-stone-500">Party</label>
                <SearchableMultiSelect
                  options={partyTags}
                  selectedIds={form.partyTagIds}
                  onToggle={togglePartyTag}
                  emptyLabel="ยังไม่มี Party (สร้างได้ที่แท็บ Party)"
                  getColor={(t) => t.color}
                  placeholder="ค้นหา Party..."
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-stone-500">Campaign</label>
                <SearchableMultiSelect
                  options={filteredCampaigns}
                  selectedIds={form.campaignIds}
                  onToggle={toggleCampaign}
                  emptyLabel="ยังไม่มี Campaign"
                  placeholder="ค้นหา Campaign..."
                />
              </div>
            </div>
          </FormSection>

          <FormSection icon="🧝" title="ข้อมูลพื้นฐาน">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs text-stone-500">ชื่อตัวละคร</label>
                <input
                  value={form.name}
                  onChange={(e) => patch({ name: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                  placeholder="เช่น Thalric Dawn-Shield"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-stone-500">Owner (User)</label>
                <select
                  value={form.ownerId}
                  onChange={(e) => patch({ ownerId: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                >
                  <option value="">-</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.username || '(ไม่มีชื่อ)'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs text-stone-500">Size</label>
                <select
                  value={form.size}
                  onChange={(e) => patch({ size: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                >
                  {SIZE_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs text-stone-500">Species</label>
                <select
                  value={form.species}
                  onChange={(e) => patch({ species: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                >
                  <option value="">-</option>
                  {speciesOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs text-stone-500">Background</label>
                <select
                  value={form.background}
                  onChange={(e) => patch({ background: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                >
                  <option value="">-</option>
                  {backgroundOptions.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </FormSection>

          <FormSection icon="📊" title="ค่าพลัง (Stat Bonus)" hint="อ้างอิงจากหน้าสุ่มสเตตัส">
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {STAT_KEYS.map((s) => (
                <div key={s.key}>
                  <label className="mb-0.5 block text-center text-[11px] font-medium text-stone-500">
                    {s.label}
                  </label>
                  <input
                    type="number"
                    value={form.stats[s.key]}
                    onChange={(e) => patchStat(s.key, e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-1 py-1 text-center text-sm"
                  />
                </div>
              ))}
            </div>
          </FormSection>

          <FormSection
            icon="⚔️"
            title="คลาสและเลเวล (Multiclass)"
            hint="รวมทุกคลาสได้สูงสุด 20 เลเวล"
          >
            <div className="space-y-2">
              {form.classLevels.map((cl, index) => {
                const availableSubclasses = subclassesByClass[cl.className] ?? []
                return (
                  <div
                    key={cl.id}
                    className="flex flex-wrap items-end gap-2 rounded-md border border-[#e2cfb3] bg-[#f5ede0]/60 p-2"
                  >
                    <div className="w-6 pb-1.5 text-center text-xs text-stone-400">{index + 1}</div>
                    <div className="min-w-[140px] flex-1">
                      <label className="mb-1 block text-[11px] text-stone-500">Class</label>
                      <select
                        value={cl.className}
                        onChange={(e) =>
                          updateClassLevel(cl.id, { className: e.target.value, subclassName: '' })
                        }
                        className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                      >
                        <option value="">-</option>
                        {classes.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="min-w-[140px] flex-1">
                      <label className="mb-1 block text-[11px] text-stone-500">Subclass</label>
                      <select
                        value={cl.subclassName}
                        onChange={(e) => updateClassLevel(cl.id, { subclassName: e.target.value })}
                        disabled={!cl.className}
                        className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm disabled:bg-[#f5ede0] disabled:text-stone-400"
                      >
                        <option value="">-</option>
                        {availableSubclasses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-20">
                      <label className="mb-1 block text-[11px] text-stone-500">Level</label>
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={cl.level}
                        onChange={(e) => {
                          const v = Number(e.target.value)
                          updateClassLevel(cl.id, { level: Number.isFinite(v) ? Math.min(20, Math.max(1, v)) : 1 })
                        }}
                        className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeClassLevel(cl.id)}
                      disabled={form.classLevels.length === 1}
                      className="mb-0.5 rounded-md px-2 py-1.5 text-xs text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent"
                    >
                      ลบ
                    </button>
                  </div>
                )
              })}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={addClassLevel}
                className="rounded-md border border-dashed border-violet-300 px-3 py-1.5 text-xs font-medium text-violet-700 hover:bg-violet-50"
              >
                + เพิ่มคลาส (Multiclass)
              </button>
              <span className={`text-xs font-medium ${overLevel ? 'text-red-600' : 'text-stone-500'}`}>
                รวม {level} / {MAX_TOTAL_LEVEL} เลเวล
                {overLevel && ' (เกินกำหนด)'}
              </span>
            </div>
          </FormSection>

          <FormSection icon="🎭" title="ข้อมูลลักษณะ (Character Details)">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {/* Column 1 */}
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs text-stone-500 font-semibold uppercase">Alignment</label>
                  <input
                    value={form.alignment}
                    onChange={(e) => patch({ alignment: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
                    placeholder="เช่น Lawful Good"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-stone-500 font-semibold uppercase">Faith</label>
                  <input
                    value={form.faith}
                    onChange={(e) => patch({ faith: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
                    placeholder="เช่น The Ancestral Gatekeepers"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-stone-500 font-semibold uppercase">Gender</label>
                  <input
                    value={form.gender}
                    onChange={(e) => patch({ gender: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
                    placeholder="เช่น ชาย (Male)"
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs text-stone-500 font-semibold uppercase">Eyes</label>
                  <input
                    value={form.eyes}
                    onChange={(e) => patch({ eyes: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
                    placeholder="เช่น สีฟ้าอ่อน"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-stone-500 font-semibold uppercase">Hair</label>
                  <input
                    value={form.hair}
                    onChange={(e) => patch({ hair: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
                    placeholder="เช่น ขนหนาฟูสีขาว"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-stone-500 font-semibold uppercase">Skin</label>
                  <input
                    value={form.skin}
                    onChange={(e) => patch({ skin: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
                    placeholder="เช่น ผิวหนังหนาสีเทาเข้ม"
                  />
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs text-stone-500 font-semibold uppercase">Height</label>
                  <input
                    value={form.height}
                    onChange={(e) => patch({ height: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
                    placeholder="เช่น 215 cm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-stone-500 font-semibold uppercase">Weight</label>
                  <input
                    value={form.weight}
                    onChange={(e) => patch({ weight: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
                    placeholder="เช่น 165 kg"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-stone-500 font-semibold uppercase">Age</label>
                  <input
                    value={form.age}
                    onChange={(e) => patch({ age: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
                    placeholder="เช่น 32"
                  />
                </div>
              </div>
            </div>
          </FormSection>

          <FormSection icon="📜" title="บุคลิกภาพ ประวัติ และความสัมพันธ์ (Personality, Background & Biography)">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase text-stone-700">
                    <span>🌱</span> Ideals
                  </label>
                  <textarea
                    value={form.ideals}
                    onChange={(e) => patch({ ideals: e.target.value })}
                    rows={3}
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
                    placeholder="เช่น หน้าที่และความเสียสละ..."
                  />
                </div>
                <div>
                  <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase text-stone-700">
                    <span>🔗</span> Bonds
                  </label>
                  <textarea
                    value={form.bonds}
                    onChange={(e) => patch({ bonds: e.target.value })}
                    rows={3}
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
                    placeholder="เช่น ประตูมิติสู่แดนภูติ..."
                  />
                </div>
                <div>
                  <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase text-stone-700">
                    <span>💔</span> Flaws
                  </label>
                  <textarea
                    value={form.flaws}
                    onChange={(e) => patch({ flaws: e.target.value })}
                    rows={3}
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
                    placeholder="เช่น ยึดติดกับกฎเกณฑ์ของตระกูล..."
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase text-stone-700">
                    <span>🧩</span> Personality Traits
                  </label>
                  <textarea
                    value={form.personalityTraits}
                    onChange={(e) => patch({ personalityTraits: e.target.value })}
                    rows={5}
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
                    placeholder="เช่น คาร์กอธเป็นมินอทอร์ที่หัวช้า..."
                  />
                </div>
                <div>
                  <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase text-stone-700">
                    <span>👤</span> Appearance
                  </label>
                  <textarea
                    value={form.appearance}
                    onChange={(e) => patch({ appearance: e.target.value })}
                    rows={6}
                    className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
                    placeholder="เช่น มินอทอร์ร่างยักษ์ผู้บึกบึน..."
                  />
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="mt-4">
              <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase text-stone-700">
                <span>🏺</span> Biography
              </label>
              <textarea
                value={form.biography}
                onChange={(e) => patch({ biography: e.target.value })}
                rows={6}
                className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
                placeholder="เช่น คาร์กอธเกิดในเผ่ามินอทอร์แห่งแดนเหนือ..."
              />
            </div>
          </FormSection>

          <FormSection icon="📝" title="หมายเหตุ">
            <textarea
              value={form.note}
              onChange={(e) => patch({ note: e.target.value })}
              rows={2}
              className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
            />
          </FormSection>
        </div>

        <div className="flex items-center justify-between border-t border-[#e2cfb3] px-5 py-3">
          <div>
            {isEditing && onDelete && (
              <button
                type="button"
                onClick={() => onDelete(form)}
                className="rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                ลบตัวละคร
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-md px-3 py-2 text-sm text-stone-600 hover:bg-[#f5ede0]"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!form.name.trim()}
              className="rounded-md bg-violet-700 px-4 py-2 text-sm font-medium text-white hover:bg-violet-800 disabled:cursor-not-allowed disabled:bg-purple-300"
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CharactersTab({
  characters,
  users,
  partyTags,
  campaigns,
  classes,
  subclassesByClass,
  speciesOptions,
  backgroundOptions,
  dispatch,
  showToast,
}) {
  const [editingCharacter, setEditingCharacter] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [imageVersions, setImageVersions] = useState({})

  const [search, setSearch] = useState('')
  const [filterUserId, setFilterUserId] = useState('')
  const [filterPartyId, setFilterPartyId] = useState('')
  const [filterClass, setFilterClass] = useState('')
  const [filterCampaignId, setFilterCampaignId] = useState('')

  const partyTagsById = useMemo(
    () => Object.fromEntries(partyTags.map((t) => [t.id, t])),
    [partyTags],
  )

  const filteredCharacters = useMemo(() => {
    const q = search.trim().toLowerCase()
    return characters.filter((character) => {
      if (q && !character.name?.toLowerCase().includes(q)) return false
      if (filterUserId && character.ownerId !== filterUserId) return false
      if (filterPartyId && !(character.partyTagIds ?? []).includes(filterPartyId)) return false
      if (filterClass && !(character.classLevels ?? []).some((cl) => cl.className === filterClass)) return false
      if (filterCampaignId && !(character.campaignIds ?? []).includes(filterCampaignId)) return false
      return true
    })
  }, [characters, search, filterUserId, filterPartyId, filterClass, filterCampaignId])

  function resetFilters() {
    setSearch('')
    setFilterUserId('')
    setFilterPartyId('')
    setFilterClass('')
    setFilterCampaignId('')
  }

  function openCreate() {
    setEditingCharacter(blankCharacter())
  }

  function openEdit(character) {
    setEditingCharacter(character)
  }

  function handleSave(character, keepOpen = false) {
    const exists = characters.some((c) => c.id === character.id)
    if (exists) {
      dispatch({ type: 'UPDATE_CHARACTER', payload: { id: character.id, patch: character } })
    } else {
      dispatch({ type: 'ADD_CHARACTER', payload: character })
    }
    setImageVersions((prev) => ({ ...prev, [character.id]: (prev[character.id] ?? 0) + 1 }))
    if (exists && keepOpen) {
      setEditingCharacter(normalizeCharacter(character))
    } else {
      setEditingCharacter(null)
    }
    showToast(exists ? 'บันทึกตัวละครแล้ว' : 'สร้างตัวละครแล้ว', 'success')
  }

  function requestDelete(character) {
    setDeleteTarget(character)
  }

  async function confirmDelete() {
    const images = deleteTarget.images ?? []
    await Promise.all(images.map((img) => deleteImage(characterImageKey(deleteTarget.id, img.id))))
    dispatch({ type: 'DELETE_CHARACTER', payload: { id: deleteTarget.id } })
    setDeleteTarget(null)
    setEditingCharacter(null)
    showToast('ลบตัวละครแล้ว', 'success')
  }

  const hasActiveFilters = search || filterUserId || filterPartyId || filterClass || filterCampaignId

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-wrap items-end gap-2">
          <div>
            <label className="mb-1 block text-xs text-stone-500">ค้นหา</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาชื่อตัวละคร"
              className="w-48 rounded-lg border border-[#e2cfb3] bg-white px-2 py-1.5 text-sm text-stone-900 placeholder-stone-400 focus:border-violet-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-stone-500">User</label>
            <select
              value={filterUserId}
              onChange={(e) => setFilterUserId(e.target.value)}
              className="w-36 rounded-lg border border-[#e2cfb3] bg-white px-2 py-1.5 text-sm text-stone-700 focus:border-violet-400 focus:outline-none"
            >
              <option value="">ทั้งหมด</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.username || '(ไม่มีชื่อ)'}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-stone-500">Party</label>
            <select
              value={filterPartyId}
              onChange={(e) => setFilterPartyId(e.target.value)}
              className="w-36 rounded-lg border border-[#e2cfb3] bg-white px-2 py-1.5 text-sm text-stone-700 focus:border-violet-400 focus:outline-none"
            >
              <option value="">ทั้งหมด</option>
              {partyTags.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name || '(ไม่มีชื่อ)'}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-stone-500">Class</label>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="w-36 rounded-lg border border-[#e2cfb3] bg-white px-2 py-1.5 text-sm text-stone-700 focus:border-violet-400 focus:outline-none"
            >
              <option value="">ทั้งหมด</option>
              {classes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-stone-500">Campaign</label>
            <select
              value={filterCampaignId}
              onChange={(e) => setFilterCampaignId(e.target.value)}
              className="w-36 rounded-lg border border-[#e2cfb3] bg-white px-2 py-1.5 text-sm text-stone-700 focus:border-violet-400 focus:outline-none"
            >
              <option value="">ทั้งหมด</option>
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name || '(ไม่มีชื่อ)'}
                </option>
              ))}
            </select>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-lg px-2 py-1.5 text-xs text-stone-500 hover:text-stone-800 hover:underline"
            >
              ล้างตัวกรอง
            </button>
          )}
        </div>
        <button
          onClick={openCreate}
          className="rounded-lg bg-violet-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-800"
        >
          + สร้างตัวละคร
        </button>
      </div>

      {characters.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#e2cfb3] bg-white p-12 text-center">
          <p className="font-cinzel text-sm text-stone-400">ยังไม่มีตัวละคร</p>
          <p className="mt-1 text-xs text-stone-400">กด "+ สร้างตัวละคร" เพื่อเริ่มต้น</p>
        </div>
      ) : filteredCharacters.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#e2cfb3] bg-white p-12 text-center">
          <p className="text-sm text-stone-400">ไม่พบตัวละครที่ตรงกับตัวกรอง</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredCharacters.map((character) => {
            const summary = classSummary(character)
            return (
              <button
                type="button"
                key={character.id}
                onClick={() => openEdit(character)}
                className="group flex flex-row items-stretch overflow-hidden rounded-xl border border-[#e2cfb3] bg-white text-left shadow-sm transition-all duration-200 hover:shadow-md h-16 sm:h-20"
              >
                {/* Left Portrait Image */}
                <div className="relative w-16 sm:w-20 shrink-0 bg-[#f5ede0] overflow-hidden">
                  <CharacterImage
                    imageKey={getActiveImageKey(character)}
                    version={imageVersions[character.id]}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    downloadName={character.name}
                    allowDownload={false}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-1 left-1 rounded bg-violet-700 px-1 py-0.5 text-[9px] sm:text-[10px] font-bold text-white leading-none">
                    Lv.{totalLevel(character)}
                  </span>
                </div>
                {/* Right Info */}
                <div className="flex-1 flex flex-col justify-center px-2.5 py-1 min-w-0">
                  <div className="truncate text-xs sm:text-sm font-semibold text-stone-900 leading-tight">
                    {character.name}
                  </div>
                  {summary && (
                    <div className="mt-0.5 truncate text-[10px] sm:text-xs text-stone-500 leading-normal">
                      {summary}
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      )}

      {editingCharacter && (
        <CharacterFormModal
          initial={editingCharacter}
          users={users}
          partyTags={partyTags}
          campaigns={campaigns}
          classes={classes}
          subclassesByClass={subclassesByClass}
          speciesOptions={speciesOptions}
          backgroundOptions={backgroundOptions}
          onCancel={() => setEditingCharacter(null)}
          onSave={handleSave}
          onDelete={requestDelete}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="ลบตัวละคร"
        message={`ต้องการลบตัวละคร "${deleteTarget?.name}" หรือไม่?`}
        confirmLabel="ลบ"
        danger
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
