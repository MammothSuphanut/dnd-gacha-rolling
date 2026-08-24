import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog'
import SearchSelect from '../components/SearchSelect'
import { isLocalHost, useGachaStore } from '../store/GachaStore'
import { useToast } from '../store/ToastContext'
import { createId } from '../utils/id'
import {
  EXTRA_STAT_KEYS,
  SIZE_OPTIONS,
  STAT_KEYS,
  getBackgroundOptions,
  getClassSubclassOptions,
  getReferenceLinks,
  getSpeciesOptions,
} from '../utils/gachaOptions'
import { downloadDataUrl, getExtensionFromDataUrl, saveDefaultData } from '../utils/exportImport'
import {
  characterImageKey,
  deleteImage,
  getImage,
  readFileAsDataUrl,
  saveImage,
} from '../utils/imageStore'
import {
  ABILITY_KEYS,
  DAMAGE_TYPES,
  DND_LANGUAGES,
  SKILLS,
  abilityMod,
  blankAction,
  blankCombat,
  blankCurrency,
  blankDamage,
  blankSavingThrows,
  blankSkills,
  blankSpellcasting,
  normalizeSpellcasting,
  formatMod,
  migrateLegacyAction,
  normalizeSkillState,
  passivePerception,
  proficiencyBonus,
  savingThrowBonus,
  skillBonus,
} from '../utils/dnd5e'
import ExportPdfModal from '../components/ExportPdfModal'
import ItemStatblockModal from '../components/ItemStatblockModal'
import { parseFoundryActor } from '../utils/foundryImport'

const TABS = [
  { key: 'characters', label: 'ตัวละคร' },
  { key: 'users', label: 'ผู้เล่น (User)' },
  { key: 'parties', label: 'Party (Tag)' },
]

const DEFAULT_COLOR = '#7c3aed'
const MAX_TOTAL_LEVEL = 20
const STATUS_OPTIONS = ['Astral Nexus', 'In-Action', 'Hall of Fame']
const NO_CAMPAIGN_FILTER = '__no_campaign__'
const NO_PARTY_FILTER = '__no_party__'
const NO_USER_FILTER = '__no_user__'

const EDIT_TABS = [
  { key: 'identity', label: 'ข้อมูลพื้นฐาน', icon: '🧝' },
  { key: 'combat', label: 'การต่อสู้', icon: '💥' },
  { key: 'spells', label: 'เวทมนตร์', icon: '✨' },
  { key: 'equipment', label: 'อุปกรณ์', icon: '🎒' },
  { key: 'personality', label: 'บุคลิกภาพ', icon: '📜' },
]

const SORT_OPTIONS = [
  { key: 'name', label: 'ชื่อ' },
  { key: 'level', label: 'เลเวล' },
  { key: 'status', label: 'Status' },
  { key: 'party', label: 'Party' },
  { key: 'campaign', label: 'Campaign' },
  { key: 'user', label: 'User' },
]

function blankUser() {
  return { id: createId('user'), username: '', note: '', color: DEFAULT_COLOR }
}

function blankPartyTag() {
  return { id: createId('tag'), name: '', color: DEFAULT_COLOR }
}

function blankStats() {
  return [...STAT_KEYS, ...EXTRA_STAT_KEYS].reduce((acc, s) => ({ ...acc, [s.key]: 0 }), {})
}

// blankSavingThrows() (dnd5e.js) only knows about the core six abilities —
// extend it with the optional Honor/Sanity keys so every character always
// has a defined (default-false) entry for them too.
function blankSavingThrowsExt() {
  return {
    ...blankSavingThrows(),
    ...EXTRA_STAT_KEYS.reduce((acc, s) => ({ ...acc, [s.key]: false }), {}),
  }
}

function blankClassLevel() {
  return { id: createId('classlevel'), className: '', subclassName: '', level: 1 }
}

// Older saves stored these as a single free-text block; split into list items.
function toItemList(value) {
  if (Array.isArray(value)) return value
  if (typeof value === 'string' && value.trim()) {
    return value.split('\n').map((line) => line.trim()).filter(Boolean)
  }
  return []
}

// Equipment is {name, qty}; older saves have plain strings, sometimes with the
// quantity baked into the text (e.g. "Dagger x2", "Dagger (x2)") - split those apart.
const EQUIPMENT_QTY_PATTERN = /^(.*?)\s*(?:[x×]\s*(\d+)|\(\s*[x×]?\s*(\d+)\s*\))$/i

function toEquipmentList(value) {
  return toItemList(value).map((it) => {
    if (it && typeof it === 'object') {
      // description/weight are optional enrichment from a Foundry VTT import
      // (see foundryImport.js) — not edited by the manual UI, but carried
      // through so the PDF export can use them.
      const base = { name: it.name ?? '', qty: Math.max(1, Number(it.qty) || 1) }
      if (it.description) base.description = it.description
      if (typeof it.weight === 'number') base.weight = it.weight
      return base
    }
    const str = String(it ?? '').trim()
    const match = str.match(EQUIPMENT_QTY_PATTERN)
    if (match) {
      return { name: match[1].trim(), qty: Math.max(1, Number(match[2] ?? match[3]) || 1) }
    }
    return { name: str, qty: 1 }
  })
}

// Features/traits are {name, description} pairs; older saves may have plain
// text items (list of strings) or a single free-text block.
function toFeatureList(value) {
  if (Array.isArray(value)) {
    return value.map((it) =>
      typeof it === 'string' ? { name: it, description: '' } : { name: it.name ?? '', description: it.description ?? '' },
    )
  }
  return toItemList(value).map((name) => ({ name, description: '' }))
}

function blankCharacter() {
  return {
    id: createId('character'),
    name: '',
    status: STATUS_OPTIONS[0],
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
    combat: blankCombat(),
    savingThrows: blankSavingThrowsExt(),
    skills: blankSkills(),
    weapons: [blankAction(), blankAction(), blankAction()],
    attacksSpellcasting: '',
    currency: blankCurrency(),
    equipment: [],
    proficienciesLanguages: [],
    featuresAndTraits: [],
    alliesOrganizations: '',
    factionName: '',
    treasure: '',
    additionalFeaturesTraits: '',
    spellcasting: blankSpellcasting(),
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

  const status = STATUS_OPTIONS.includes(raw.status) ? raw.status : STATUS_OPTIONS[0]
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

  const combat = { ...blankCombat(), ...raw.combat, hp: { ...blankCombat().hp, ...raw.combat?.hp }, deathSaves: { ...blankCombat().deathSaves, ...raw.combat?.deathSaves } }
  const savingThrows = { ...blankSavingThrowsExt(), ...raw.savingThrows }
  const skills = SKILLS.reduce(
    (acc, s) => ({ ...acc, [s.key]: normalizeSkillState(raw.skills?.[s.key]) }),
    {},
  )
  const weapons =
    raw.weapons && raw.weapons.length > 0
      ? raw.weapons.map(migrateLegacyAction)
      : [blankAction(), blankAction(), blankAction()]
  const currency = { ...blankCurrency(), ...raw.currency }
  const attacksSpellcasting = raw.attacksSpellcasting ?? ''
  const equipment = toEquipmentList(raw.equipment)
  const proficienciesLanguages = toItemList(raw.proficienciesLanguages)
  const featuresAndTraits = toFeatureList(raw.featuresAndTraits)
  const alliesOrganizations = raw.alliesOrganizations ?? ''
  const factionName = raw.factionName ?? ''
  const treasure = raw.treasure ?? ''
  const additionalFeaturesTraits = raw.additionalFeaturesTraits ?? ''
  const spellcasting = normalizeSpellcasting(raw.spellcasting)

  return {
    ...raw,
    partyTagIds,
    campaignIds,
    classLevels,
    images,
    activeImageId,
    status,
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
    combat,
    savingThrows,
    skills,
    weapons,
    currency,
    attacksSpellcasting,
    equipment,
    proficienciesLanguages,
    featuresAndTraits,
    alliesOrganizations,
    factionName,
    treasure,
    additionalFeaturesTraits,
    spellcasting,
  }
}

function totalLevel(character) {
  return (character.classLevels ?? []).reduce((sum, cl) => sum + (Number(cl.level) || 0), 0)
}

const STATUS_BADGE_STYLES = {
  'Astral Nexus': 'bg-sky-100 text-sky-700',
  'In-Action': 'bg-emerald-100 text-emerald-700',
  'Hall of Fame': 'bg-amber-100 text-amber-700',
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

// Wraps children in a 5e.tools reference link when one is available for the value.
function ReferenceLink({ href, className, children }) {
  if (!href) return <>{children}</>
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={href}
      onClick={(e) => e.stopPropagation()}
      className={`text-violet-700 underline decoration-violet-300 hover:decoration-violet-600 ${className || ''}`}
    >
      {children}
    </a>
  )
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
      <div className={`flex items-center justify-center bg-[#f5ede0] text-stone-300 ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-1/2 w-1/2 max-h-10 max-w-10">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7v1H4v-1Z" />
        </svg>
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
  const location = useLocation()
  const navigate = useNavigate()
  const users = state.users ?? []
  const partyTags = state.partyTags ?? []
  const characters = useMemo(
    () => (state.characters ?? []).map(normalizeCharacter),
    [state.characters],
  )
  const campaigns = state.campaigns ?? []
  const shops = state.shops ?? []

  const [tab, setTab] = useState('characters')
  const prefillCharacter = location.state?.prefillCharacter

  function consumePrefill() {
    navigate(location.pathname, { replace: true, state: {} })
  }

  const { classes, subclassesByClass } = useMemo(
    () => getClassSubclassOptions(state.boxes),
    [state.boxes],
  )
  const speciesOptions = useMemo(() => getSpeciesOptions(state.boxes), [state.boxes])
  const backgroundOptions = useMemo(() => getBackgroundOptions(state.boxes), [state.boxes])
  const referenceLinks = useMemo(() => getReferenceLinks(state.boxes), [state.boxes])

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
          shops={shops}
          classes={classes}
          subclassesByClass={subclassesByClass}
          speciesOptions={speciesOptions}
          backgroundOptions={backgroundOptions}
          referenceLinks={referenceLinks}
          dispatch={dispatch}
          showToast={showToast}
          prefillCharacter={prefillCharacter}
          onConsumePrefill={consumePrefill}
        />
      )}
    </div>
  )
}

function UsersTab({ users, dispatch, showToast }) {
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [userForm, setUserForm] = useState(null)
  const isEdit = userForm ? users.some((u) => u.id === userForm.id) : false

  function addUser() {
    setUserForm(blankUser())
  }

  function editUser(user) {
    setUserForm({ ...user })
  }

  function updateFormField(field, value) {
    setUserForm((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  function saveUser() {
    if (!userForm || !userForm.username.trim()) return
    if (isEdit) {
      dispatch({ type: 'UPDATE_USER', payload: { id: userForm.id, patch: userForm } })
      showToast('แก้ไขผู้เล่นสำเร็จ', 'success')
    } else {
      dispatch({ type: 'ADD_USER', payload: userForm })
      showToast('เพิ่มผู้เล่นใหม่แล้ว', 'success')
    }
    setUserForm(null)
  }

  function confirmDelete() {
    dispatch({ type: 'DELETE_USER', payload: { id: deleteTarget.id } })
    setDeleteTarget(null)
    setUserForm(null)
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
        <div className="rounded-xl border border-dashed border-[#e2cfb3] bg-white p-12 text-center">
          <p className="text-sm text-stone-400">ยังไม่มีผู้เล่น กด "+ เพิ่มผู้เล่น" เพื่อเริ่มต้น</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {users.map((user) => (
            <button
              type="button"
              key={user.id}
              onClick={() => editUser(user)}
              className="group flex items-center gap-3 overflow-hidden rounded-xl border border-[#e2cfb3] bg-white p-3 text-left shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <span
                className="h-10 w-10 shrink-0 rounded-full border border-stone-200"
                style={{ backgroundColor: user.color || DEFAULT_COLOR }}
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-stone-900 leading-tight">
                  {user.username || '(ไม่มีชื่อ)'}
                </div>
                <div className="mt-0.5 truncate text-xs text-stone-500 leading-normal">
                  {user.note || ' '}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {userForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
          <div
            className="animate-fade-in flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-xl border border-[#e2cfb3] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#e2cfb3] px-6 py-4 bg-[#f5ede0]/30">
              <h2 className="font-cinzel text-xl font-bold text-stone-900">
                {isEdit ? 'แก้ไขผู้เล่น' : 'เพิ่มผู้เล่นใหม่'}
              </h2>
              <button
                type="button"
                onClick={() => setUserForm(null)}
                className="rounded-md p-1 text-stone-400 hover:bg-[#f5ede0] hover:text-stone-600 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-4 space-y-4 text-sm">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-stone-700">Username <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={userForm.username}
                  onChange={(e) => updateFormField('username', e.target.value)}
                  placeholder="Username"
                  className="w-full rounded-lg border border-[#e2cfb3] bg-white px-3 py-2 text-stone-900 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-200 transition-shadow"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-stone-700">Note</label>
                <input
                  type="text"
                  value={userForm.note}
                  onChange={(e) => updateFormField('note', e.target.value)}
                  placeholder="หมายเหตุ"
                  className="w-full rounded-lg border border-[#e2cfb3] bg-white px-3 py-2 text-stone-900 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-200 transition-shadow"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-stone-700">สีประจำตัว</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={userForm.color || DEFAULT_COLOR}
                    onChange={(e) => updateFormField('color', e.target.value)}
                    className="h-9 w-9 cursor-pointer rounded border border-gray-300 bg-transparent p-0.5"
                  />
                  <input
                    value={userForm.color || DEFAULT_COLOR}
                    onChange={(e) => updateFormField('color', e.target.value)}
                    className="w-28 rounded-lg border border-[#e2cfb3] px-3 py-2 font-mono text-xs uppercase focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-200"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-[#e2cfb3] px-6 py-3 bg-[#f5ede0]/10">
              <div>
                {isEdit && (
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(userForm)}
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
                  >
                    ลบผู้เล่น
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setUserForm(null)}
                  className="rounded-lg px-4 py-2 text-stone-600 hover:bg-[#f5ede0] transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="button"
                  onClick={saveUser}
                  disabled={!userForm.username.trim()}
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
  const [tagForm, setTagForm] = useState(null)
  const isEdit = tagForm ? partyTags.some((t) => t.id === tagForm.id) : false

  function addTag() {
    setTagForm(blankPartyTag())
  }

  function editTag(tag) {
    setTagForm({ ...tag })
  }

  function updateFormField(field, value) {
    setTagForm((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  function saveTag() {
    if (!tagForm || !tagForm.name.trim()) return
    if (isEdit) {
      dispatch({ type: 'UPDATE_PARTY_TAG', payload: { id: tagForm.id, patch: tagForm } })
      showToast('แก้ไข Party สำเร็จ', 'success')
    } else {
      dispatch({ type: 'ADD_PARTY_TAG', payload: tagForm })
      showToast('เพิ่ม Party ใหม่แล้ว', 'success')
    }
    setTagForm(null)
  }

  function confirmDelete() {
    dispatch({ type: 'DELETE_PARTY_TAG', payload: { id: deleteTarget.id } })
    setDeleteTarget(null)
    setTagForm(null)
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
        <div className="rounded-xl border border-dashed border-[#e2cfb3] bg-white p-12 text-center">
          <p className="text-sm text-stone-400">ยังไม่มี Party กด "+ เพิ่ม Party" เพื่อเริ่มต้น</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {partyTags.map((tag) => (
            <button
              type="button"
              key={tag.id}
              onClick={() => editTag(tag)}
              className="group flex items-center gap-3 overflow-hidden rounded-xl border border-[#e2cfb3] bg-white p-3 text-left shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <span
                className="h-10 w-10 shrink-0 rounded-full border border-stone-200"
                style={{ backgroundColor: tag.color || DEFAULT_COLOR }}
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-stone-900 leading-tight">
                  {tag.name || '(ไม่มีชื่อ)'}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {tagForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
          <div
            className="animate-fade-in flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-xl border border-[#e2cfb3] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#e2cfb3] px-6 py-4 bg-[#f5ede0]/30">
              <h2 className="font-cinzel text-xl font-bold text-stone-900">
                {isEdit ? 'แก้ไข Party' : 'เพิ่ม Party ใหม่'}
              </h2>
              <button
                type="button"
                onClick={() => setTagForm(null)}
                className="rounded-md p-1 text-stone-400 hover:bg-[#f5ede0] hover:text-stone-600 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-4 space-y-4 text-sm">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-stone-700">ชื่อ Party <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={tagForm.name}
                  onChange={(e) => updateFormField('name', e.target.value)}
                  placeholder="ชื่อ Party"
                  className="w-full rounded-lg border border-[#e2cfb3] bg-white px-3 py-2 text-stone-900 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-200 transition-shadow"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-stone-700">สี</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={tagForm.color || DEFAULT_COLOR}
                    onChange={(e) => updateFormField('color', e.target.value)}
                    className="h-9 w-9 cursor-pointer rounded border border-gray-300 bg-transparent p-0.5"
                  />
                  <input
                    value={tagForm.color || DEFAULT_COLOR}
                    onChange={(e) => updateFormField('color', e.target.value)}
                    className="w-28 rounded-lg border border-[#e2cfb3] px-3 py-2 font-mono text-xs uppercase focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-200"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-[#e2cfb3] px-6 py-3 bg-[#f5ede0]/10">
              <div>
                {isEdit && (
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(tagForm)}
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
                  >
                    ลบ Party
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTagForm(null)}
                  className="rounded-lg px-4 py-2 text-stone-600 hover:bg-[#f5ede0] transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="button"
                  onClick={saveTag}
                  disabled={!tagForm.name.trim()}
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

// modes: [{ key, label, type: 'text' | 'select', options?: string[], placeholder? }]
function AddItemBar({ modes, onAdd }) {
  const [activeKey, setActiveKey] = useState(modes[0].key)
  const [text, setText] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const activeMode = modes.find((m) => m.key === activeKey) ?? modes[0]

  function handleAdd() {
    if (activeMode.type === 'text') {
      const v = text.trim()
      if (!v) return
      onAdd(v)
      setText('')
    } else {
      if (!selectValue) return
      onAdd(selectValue)
      setSelectValue('')
    }
  }

  return (
    <div className="space-y-1.5">
      {modes.length > 1 && (
        <div className="flex flex-wrap gap-1">
          {modes.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => {
                setActiveKey(m.key)
                setText('')
                setSelectValue('')
              }}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                activeKey === m.key
                  ? 'bg-violet-700 text-white'
                  : 'bg-[#f5ede0] text-stone-600 hover:bg-violet-100'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-1.5">
        {activeMode.type === 'text' ? (
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAdd()
              }
            }}
            placeholder={activeMode.placeholder || 'พิมพ์ข้อความ...'}
            className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
          />
        ) : (
          <SearchSelect
            options={(activeMode.options || []).map((o) => ({ value: o, label: o }))}
            value={selectValue}
            onChange={setSelectValue}
            placeholder={activeMode.placeholder || 'ค้นหา...'}
            clearLabel="เปลี่ยน"
            emptyOptionsLabel="ไม่มีตัวเลือก"
            className="w-full"
          />
        )}
        <button
          type="button"
          onClick={handleAdd}
          className="shrink-0 rounded-md bg-violet-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-800"
        >
          + เพิ่ม
        </button>
      </div>
    </div>
  )
}

function ItemListEditor({ items, onChange, modes }) {
  function updateItem(index, value) {
    onChange(items.map((it, i) => (i === index ? value : it)))
  }

  function removeItem(index) {
    onChange(items.filter((_, i) => i !== index))
  }

  function addItem(value) {
    if (!value || !value.trim()) return
    onChange([...items, value.trim()])
  }

  return (
    <div className="space-y-3">
      <AddItemBar modes={modes} onAdd={addItem} />
      {items.length > 0 && (
        <div className="space-y-1.5">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <span className="w-4 shrink-0 text-center text-xs text-stone-400">{index + 1}.</span>
              <input
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
              />
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="shrink-0 rounded-md px-2 py-1.5 text-xs text-red-500 hover:bg-red-50"
                aria-label="ลบรายการ"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function EquipmentListEditor({ items, onChange, modes }) {
  function updateItem(index, fields) {
    onChange(items.map((it, i) => (i === index ? { ...it, ...fields } : it)))
  }

  function removeItem(index) {
    onChange(items.filter((_, i) => i !== index))
  }

  function addItem(value) {
    if (!value || !value.trim()) return
    onChange([...items, { name: value.trim(), qty: 1 }])
  }

  return (
    <div className="space-y-3">
      <AddItemBar modes={modes} onAdd={addItem} />
      {items.length > 0 && (
        <div className="space-y-1.5">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <span className="w-4 shrink-0 text-center text-xs text-stone-400">{index + 1}.</span>
              <input
                value={item.name}
                onChange={(e) => updateItem(index, { name: e.target.value })}
                placeholder="ชื่ออุปกรณ์"
                className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
              />
              <input
                type="number"
                min={1}
                value={item.qty}
                onChange={(e) => updateItem(index, { qty: Math.max(1, Number(e.target.value) || 1) })}
                title="จำนวน"
                className="w-16 shrink-0 rounded-md border border-gray-300 px-2 py-1.5 text-center text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
              />
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="shrink-0 rounded-md px-2 py-1.5 text-xs text-red-500 hover:bg-red-50"
                aria-label="ลบรายการ"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function FeatureListEditor({ items, onChange }) {
  function updateItem(index, fields) {
    onChange(items.map((it, i) => (i === index ? { ...it, ...fields } : it)))
  }

  function removeItem(index) {
    onChange(items.filter((_, i) => i !== index))
  }

  function addItem() {
    onChange([...items, { name: '', description: '' }])
  }

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="rounded-md border border-[#e2cfb3] bg-white p-2.5">
          <div className="flex items-center gap-1.5">
            <input
              value={item.name}
              onChange={(e) => updateItem(index, { name: e.target.value })}
              placeholder="ชื่อ Feature / Trait"
              className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm font-medium focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="shrink-0 rounded-md px-2 py-1.5 text-xs text-red-500 hover:bg-red-50"
              aria-label="ลบรายการ"
            >
              ✕
            </button>
          </div>
          <textarea
            value={item.description}
            onChange={(e) => updateItem(index, { description: e.target.value })}
            placeholder="คำอธิบาย"
            rows={2}
            className="mt-1.5 w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="rounded-md border border-dashed border-violet-300 px-3 py-1.5 text-xs font-medium text-violet-700 hover:bg-violet-50"
      >
        + เพิ่ม Feature/Trait
      </button>
    </div>
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

function StatsRadarChart({ stats, savingThrows, profBonus, extraStats = [] }) {
  // extraStats (e.g. Honor/Sanity) appends as extra spokes — the angle step
  // is derived from the point count so the hexagon becomes an octagon (etc.)
  // instead of assuming exactly six abilities.
  const keys = [...STAT_KEYS, ...extraStats]
  const angleStep = (2 * Math.PI) / keys.length
  const maxVal = Math.max(20, ...keys.map((s) => Number(stats[s.key]) || 0))
  const cx = 110
  const cy = 110
  const r = 70
  const size = 220

  const levels = [0.25, 0.5, 0.75, 1.0]

  return (
    <div className="flex justify-center items-center w-full max-w-[240px] aspect-square select-none rounded-lg border border-[#e2cfb3] bg-[#fdfbf8]/80 p-2 shadow-inner">
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        <defs>
          <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#78716c" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#44403c" stopOpacity="0.28" />
          </radialGradient>
        </defs>

        {/* Outer and inner concentric hexagons */}
        {levels.map((level, lIdx) => {
          const radius = r * level
          const points = keys.map((_, idx) => {
            const angle = -Math.PI / 2 + idx * angleStep
            const x = cx + radius * Math.cos(angle)
            const y = cy + radius * Math.sin(angle)
            return `${x},${y}`
          }).join(' ')

          return (
            <polygon
              key={lIdx}
              points={points}
              fill="none"
              stroke={lIdx === levels.length - 1 ? '#e2cfb3' : '#f3e8d7'}
              strokeWidth={lIdx === levels.length - 1 ? '1.5' : '1'}
              strokeDasharray={lIdx === levels.length - 1 ? 'none' : '3,3'}
            />
          )
        })}

        {/* Axis line connectors */}
        {keys.map((_, idx) => {
          const angle = -Math.PI / 2 + idx * angleStep
          const x = cx + r * Math.cos(angle)
          const y = cy + r * Math.sin(angle)
          return (
            <line
              key={idx}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="#f3e8d7"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          )
        })}

        {/* Stats Fill Area */}
        {(() => {
          const points = keys.map((s, idx) => {
            const val = Number(stats[s.key]) || 0
            const radius = (val / maxVal) * r
            const angle = -Math.PI / 2 + idx * angleStep
            const x = cx + radius * Math.cos(angle)
            const y = cy + radius * Math.sin(angle)
            return `${x},${y}`
          }).join(' ')

          return (
            <polygon
              points={points}
              fill="url(#radarGrad)"
              stroke="#57534e"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
          )
        })()}

        {/* Markers and Labels */}
        {keys.map((s, idx) => {
          const val = Number(stats[s.key]) || 0
          const radius = (val / maxVal) * r
          const angle = -Math.PI / 2 + idx * angleStep
          const x = cx + radius * Math.cos(angle)
          const y = cy + radius * Math.sin(angle)

          // Label placement offsets
          const labelDist = r + 18
          const lx = cx + labelDist * Math.cos(angle)
          const ly = cy + labelDist * Math.sin(angle)

          const labelAnchor = Math.cos(angle) > 0.15 ? 'start' : Math.cos(angle) < -0.15 ? 'end' : 'middle'
          const isTop = Math.sin(angle) < -0.5
          const isBottom = Math.sin(angle) > 0.5
          const labelYOffset = isTop ? -8 : isBottom ? 12 : 2

          const mod = Math.floor((val - 10) / 2)
          const formattedMod = mod >= 0 ? `+${mod}` : `${mod}`

          const isProf = !!savingThrows?.[s.key]
          const saveBonus = mod + (isProf ? Number(profBonus) || 0 : 0)
          const formattedSave = saveBonus >= 0 ? `+${saveBonus}` : `${saveBonus}`

          return (
            <g key={s.key}>
              <text
                x={lx}
                y={ly + labelYOffset}
                textAnchor={labelAnchor}
                className="font-sans text-[10px] font-bold"
              >
                <tspan fill="#57534e" className="font-bold tracking-wider">{s.label}</tspan>
                <tspan x={lx} dy="11" fill="#78716c" className="font-mono text-[9px] font-bold">
                  {val} ({formattedMod})
                </tspan>
                {isProf && (
                  <tspan x={lx} dy="11" fill="#7c3aed" className="font-mono text-[9px] font-bold">
                    ({formattedSave})
                  </tspan>
                )}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function CharacterFormModal({
  initial,
  users,
  partyTags,
  campaigns,
  shops,
  classes,
  subclassesByClass,
  speciesOptions,
  backgroundOptions,
  referenceLinks,
  onCancel,
  onSave,
  onDelete,
  showToast,
  // Rendered as a full page (opened in its own tab) instead of a modal
  // overlay — no backdrop, and no close controls since there's no "back to
  // the list" to close to (the list lives in a different tab).
  standalone = false,
  // Extra controls to show in the header when standalone — the page has no
  // Navbar (see STANDALONE_ROUTES in App.jsx), so anything normally reached
  // from the Navbar's "จัดการข้อมูล" menu (e.g. save-to-default-data) needs
  // its own way in here.
  headerExtra = null,
}) {
  const shopItemOptions = useMemo(() => {
    const names = new Set()
    const toolNames = new Set()
    for (const shop of shops ?? []) {
      for (const item of shop.items ?? []) {
        if (!item.name) continue
        names.add(item.name)
        if (item.category === 'Tools') toolNames.add(item.name)
      }
    }
    return {
      all: [...names].sort((a, b) => a.localeCompare(b)),
      tools: [...toolNames].sort((a, b) => a.localeCompare(b)),
    }
  }, [shops])

  const isEditing = !!initial.name
  const [form, setForm] = useState(initial)
  const fileInputRef = useRef(null)
  const foundryImportInputRef = useRef(null)
  const [importingFoundry, setImportingFoundry] = useState(false)
  const [activeTab, setActiveTab] = useState(EDIT_TABS[0].key)
  const editTab = activeTab
  const setEditTab = setActiveTab
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [statblockItem, setStatblockItem] = useState(null)

  const [viewMode, setViewMode] = useState(isEditing)
  const viewTab = activeTab
  const setViewTab = setActiveTab
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
        (c.partyLinks ?? []).some((l) => form.partyTagIds.includes(l.partyTagId)),
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

  function patchCombat(fields) {
    setForm((prev) => ({ ...prev, combat: { ...prev.combat, ...fields } }))
  }

  function patchHp(fields) {
    setForm((prev) => ({ ...prev, combat: { ...prev.combat, hp: { ...prev.combat.hp, ...fields } } }))
  }

  function patchDeathSaves(fields) {
    setForm((prev) => ({
      ...prev,
      combat: { ...prev.combat, deathSaves: { ...prev.combat.deathSaves, ...fields } },
    }))
  }

  function toggleSavingThrow(key) {
    setForm((prev) => ({
      ...prev,
      savingThrows: { ...prev.savingThrows, [key]: !prev.savingThrows[key] },
    }))
  }

  function toggleSkillProf(key) {
    setForm((prev) => {
      const cur = prev.skills[key]
      const prof = !cur.prof
      return {
        ...prev,
        skills: { ...prev.skills, [key]: { prof, expertise: prof ? cur.expertise : false } },
      }
    })
  }

  function toggleSkillExpertise(key) {
    setForm((prev) => {
      const cur = prev.skills[key]
      const expertise = !cur.expertise
      return {
        ...prev,
        skills: { ...prev.skills, [key]: { prof: expertise ? true : cur.prof, expertise } },
      }
    })
  }

  function patchAction(index, fields) {
    setForm((prev) => ({
      ...prev,
      weapons: prev.weapons.map((w, i) => (i === index ? { ...w, ...fields } : w)),
    }))
  }

  function addAction() {
    setForm((prev) => ({ ...prev, weapons: [...prev.weapons, blankAction()] }))
  }

  function removeAction(index) {
    setForm((prev) => ({ ...prev, weapons: prev.weapons.filter((_, i) => i !== index) }))
  }

  function patchActionDamage(actionIndex, damageIndex, fields) {
    setForm((prev) => ({
      ...prev,
      weapons: prev.weapons.map((w, i) =>
        i !== actionIndex
          ? w
          : {
              ...w,
              damages: w.damages.map((d, di) => (di === damageIndex ? { ...d, ...fields } : d)),
            },
      ),
    }))
  }

  function addActionDamage(actionIndex) {
    setForm((prev) => ({
      ...prev,
      weapons: prev.weapons.map((w, i) =>
        i !== actionIndex ? w : { ...w, damages: [...w.damages, blankDamage()] },
      ),
    }))
  }

  function removeActionDamage(actionIndex, damageIndex) {
    setForm((prev) => ({
      ...prev,
      weapons: prev.weapons.map((w, i) =>
        i !== actionIndex
          ? w
          : { ...w, damages: w.damages.filter((_, di) => di !== damageIndex) },
      ),
    }))
  }

  function patchCurrency(fields) {
    setForm((prev) => ({ ...prev, currency: { ...prev.currency, ...fields } }))
  }

  function patchSpellcastingMeta(fields) {
    setForm((prev) => ({
      ...prev,
      spellcasting: {
        ...(prev.spellcasting ?? blankSpellcasting()),
        ...fields,
      },
    }))
  }

  function patchCantrip(index, name) {
    setForm((prev) => {
      const sp = prev.spellcasting ?? blankSpellcasting()
      const cantrips = [...(sp.cantrips ?? [])]
      while (cantrips.length <= index) {
        cantrips.push({ name: '' })
      }
      cantrips[index] = { ...cantrips[index], name }
      return {
        ...prev,
        spellcasting: {
          ...sp,
          cantrips,
        },
      }
    })
  }

  function patchSpell(level, index, fields) {
    setForm((prev) => {
      const sp = prev.spellcasting ?? blankSpellcasting()
      const levels = { ...(sp.levels ?? {}) }
      const lvlData = { ...(levels[level] ?? { slotsTotal: '', slotsRemaining: '', spells: [] }) }
      const spells = [...(lvlData.spells ?? [])]
      const count = { 1: 12, 2: 13, 3: 13, 4: 13, 5: 9, 6: 9, 7: 9, 8: 7, 9: 7 }[level] || 10
      while (spells.length < count) {
        spells.push({ name: '', prepared: false })
      }
      spells[index] = { ...spells[index], ...fields }
      levels[level] = { ...lvlData, spells }
      return {
        ...prev,
        spellcasting: {
          ...sp,
          levels,
        },
      }
    })
  }

  function patchSpellSlots(level, fields) {
    setForm((prev) => {
      const sp = prev.spellcasting ?? blankSpellcasting()
      const levels = { ...(sp.levels ?? {}) }
      const lvlData = { ...(levels[level] ?? { slotsTotal: '', slotsRemaining: '', spells: [] }) }
      levels[level] = { ...lvlData, ...fields }
      return {
        ...prev,
        spellcasting: {
          ...sp,
          levels,
        },
      }
    })
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

  async function handleFoundryImportChange(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setImportingFoundry(true)
    try {
      const patch = await parseFoundryActor(file)
      setForm((prev) => ({ ...prev, ...patch }))
      showToast?.(
        'นำเข้าข้อมูลจาก Foundry สำเร็จ (AC และ HP สูงสุดต้องกรอกเอง เพราะ Foundry คำนวณสดไม่ได้อยู่ในไฟล์)',
        'success',
      )
    } catch (err) {
      console.error(err)
      showToast?.(err.message || 'นำเข้าไฟล์ไม่สำเร็จ', 'error')
    } finally {
      setImportingFoundry(false)
    }
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
    
    const updatedCharacter = {
      ...form,
      stats: normalizedStats,
      images,
      activeImageId,
      equipment: form.equipment
        .filter((it) => it.name && it.name.trim())
        .map((it) => ({ name: it.name.trim(), qty: Math.max(1, Number(it.qty) || 1) })),
      proficienciesLanguages: form.proficienciesLanguages.filter((it) => it.trim()),
      featuresAndTraits: form.featuresAndTraits
        .map((it) => ({ name: it.name.trim(), description: it.description.trim() }))
        .filter((it) => it.name || it.description),
    }
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
    // Honor/Sanity are an optional variant rule — only show them once a
    // character actually has one set, so sheets that don't use the variant
    // stay uncluttered.
    const activeExtraStats = EXTRA_STAT_KEYS.filter(
      (s) => Number(form.stats?.[s.key]) > 0 || form.savingThrows?.[s.key],
    )
    const speciesLink = referenceLinks?.speciesLinks?.get(form.species)
    const backgroundLink = referenceLinks?.backgroundLinks?.get(form.background)

    return (
      <div className={standalone ? 'h-full w-full' : 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'}>
        <div
          className={
            standalone
              ? 'flex h-full w-full flex-col overflow-hidden bg-white'
              : 'flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl'
          }
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
                <span>Lv.{level}</span>
                {form.classLevels && form.classLevels.length > 0 && form.classLevels.some(cl => cl.className) && (
                  <>
                    <span>•</span>
                    <span className="inline-flex flex-wrap items-center">
                      {form.classLevels
                        .filter((cl) => cl.className)
                        .map((cl, idx) => {
                          const classLink = referenceLinks?.classLinks?.get(cl.className)
                          const subclassLink = referenceLinks?.subclassLinks?.get(`${cl.className}::${cl.subclassName}`)
                          return (
                            <Fragment key={cl.id || idx}>
                              {idx > 0 && <span className="mx-1 text-stone-300">/</span>}
                              <span className="font-semibold text-stone-700">
                                <ReferenceLink href={classLink}>{cl.className}</ReferenceLink>
                                {cl.subclassName && (
                                  <>
                                    (<ReferenceLink href={subclassLink}>{cl.subclassName}</ReferenceLink>)
                                  </>
                                )}
                                {' '}{cl.level}
                              </span>
                            </Fragment>
                          )
                        })}
                    </span>
                  </>
                )}
                <span>•</span>
                <span>
                  {form.species ? (
                    <ReferenceLink href={speciesLink}>{form.species}</ReferenceLink>
                  ) : (
                    'ไม่ระบุเผ่าพันธุ์'
                  )}
                </span>
                {form.background && (
                  <>
                    <span>•</span>
                    <span>
                      ภูมิหลัง: <ReferenceLink href={backgroundLink}>{form.background}</ReferenceLink>
                    </span>
                  </>
                )}
              </div>
            </div>
            {standalone ? (
              headerExtra
            ) : (
              <div className="flex items-center gap-1.5">
                {isEditing && (
                  <a
                    href={`/characters/${form.id}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 rounded-md border border-stone-300 bg-white px-2 py-1.5 text-xs font-medium text-stone-600 hover:bg-[#f5ede0]"
                    title="เปิดหน้าตัวละครในแท็บใหม่"
                  >
                    ↗ เปิดแท็บใหม่
                  </a>
                )}
                <button
                  type="button"
                  onClick={onCancel}
                  className="rounded-md p-1.5 text-stone-400 hover:bg-[#f5ede0] hover:text-stone-600"
                  aria-label="ปิด"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* View Mode Tabs */}
          <div className="flex overflow-x-auto border-b border-[#e2cfb3] bg-white px-4 md:justify-center">
            {EDIT_TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setViewTab(t.key)}
                className={`shrink-0 inline-flex items-center justify-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-3 text-xs sm:text-sm font-semibold transition-colors md:flex-1 ${
                  viewTab === t.key
                    ? 'border-violet-600 text-violet-700 bg-violet-50/30'
                    : 'border-transparent text-stone-500 hover:bg-stone-50/50 hover:text-stone-800'
                }`}
              >
                <span aria-hidden className="leading-none">{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto bg-[#fdfbf7] p-6">
            {viewTab === 'identity' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left Column: Image showcase (5 cols) */}
                <div className="md:col-span-5 flex flex-col gap-3">
                  <div className="relative mx-auto aspect-[3/4] h-[42vh] max-h-[420px] w-auto max-w-full overflow-hidden rounded-xl border border-[#e2cfb3] bg-[#f5ede0] shadow-inner flex items-center justify-center md:h-[50vh] md:max-h-[560px]">
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
                      {form.classLevels.map((cl, idx) => {
                        const classLink = referenceLinks?.classLinks?.get(cl.className)
                        const subclassLink = referenceLinks?.subclassLinks?.get(
                          `${cl.className}::${cl.subclassName}`,
                        )
                        return (
                          <div key={cl.id || idx} className="flex items-center justify-between text-sm text-stone-800">
                            <span className="font-semibold">
                              {cl.className ? (
                                <ReferenceLink href={classLink}>{cl.className}</ReferenceLink>
                              ) : (
                                '(ไม่มีคลาส)'
                              )}
                              {cl.subclassName && (
                                <span className="ml-1.5 font-normal text-stone-500">
                                  (<ReferenceLink href={subclassLink}>{cl.subclassName}</ReferenceLink>)
                                </span>
                              )}
                            </span>
                            <span className="font-mono font-bold text-violet-700 bg-violet-50 border border-violet-100 rounded px-2 py-0.5 text-xs">
                              Level {cl.level}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Stats Modifier Hexagon Radar Chart & Basic Details */}
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="shrink-0 flex justify-center w-full sm:w-auto">
                      <StatsRadarChart
                        stats={form.stats}
                        savingThrows={form.savingThrows}
                        profBonus={proficiencyBonus(level)}
                        extraStats={activeExtraStats}
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      {[
                        { label: 'SPECIES', value: form.species, link: speciesLink },
                        { label: 'BACKGROUND', value: form.background, link: backgroundLink },
                        { label: 'SIZE', value: form.size },
                      ].map(
                        (item) =>
                          item.value && (
                            <div
                              key={item.label}
                              className="flex flex-col items-center justify-center rounded-lg border border-[#e2cfb3] bg-white p-2.5 text-center shadow-sm w-full min-h-[52px]"
                            >
                              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                                {item.label}
                              </span>
                              <span className="mt-0.5 text-xs font-semibold text-stone-850 break-words text-center">
                                {item.link ? (
                                  <ReferenceLink href={item.link}>{item.value}</ReferenceLink>
                                ) : (
                                  item.value
                                )}
                              </span>
                            </div>
                          ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {viewTab === 'combat' && (
              <div className="space-y-6">
                {/* Combat Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 rounded-xl border border-[#e2cfb3] bg-white p-4 shadow-sm">
                    <h3 className="text-sm font-bold text-stone-800 flex items-center gap-1.5 mb-3">
                      ❤️ สถานะการต่อสู้ (Combat Stats)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="rounded-lg bg-stone-50 border border-stone-150 p-2.5">
                        <div className="text-[10px] font-bold text-stone-400 uppercase">Armor Class (AC)</div>
                        <div className="mt-1 font-cinzel text-lg font-bold text-stone-800">{form.combat.ac || 10}</div>
                      </div>
                      <div className="rounded-lg bg-stone-50 border border-stone-150 p-2.5">
                        <div className="text-[10px] font-bold text-stone-400 uppercase">Speed</div>
                        <div className="mt-1 text-sm font-bold text-stone-800">{form.combat.speed || '-'}</div>
                      </div>
                      <div className="rounded-lg bg-stone-50 border border-stone-150 p-2.5">
                        <div className="text-[10px] font-bold text-stone-400 uppercase">Hit Dice</div>
                        <div className="mt-1 font-mono text-sm font-bold text-stone-800">{form.combat.hitDice || '-'}</div>
                      </div>
                      <div className="rounded-lg bg-stone-50 border border-stone-150 p-2.5">
                        <div className="text-[10px] font-bold text-stone-400 uppercase">XP</div>
                        <div className="mt-1 font-mono text-sm font-bold text-stone-800">{form.combat.xp || 0}</div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                      <div className="sm:col-span-2 rounded-lg border border-violet-100 bg-violet-50/50 px-3 py-2 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-violet-400 uppercase">Hit Points (HP)</span>
                          <div className="text-sm font-bold text-stone-800">
                            {form.combat.hp.current || 0} / {form.combat.hp.max || 0}
                            {form.combat.hp.temp && <span className="ml-1 text-violet-600 font-semibold">(+{form.combat.hp.temp} Temp)</span>}
                          </div>
                        </div>
                        {/* Visual Health Bar */}
                        <div className="w-24 bg-stone-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-violet-600 h-2.5 rounded-full"
                            style={{
                              width: `${Math.min(100, Math.max(0, (Number(form.combat.hp.current) / (Number(form.combat.hp.max) || 1)) * 100))}%`
                            }}
                          />
                        </div>
                      </div>

                      <div className="rounded-lg border border-stone-150 bg-stone-50 px-3 py-2.5 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-stone-400 uppercase">Inspiration</span>
                        {form.combat.inspiration ? (
                          <span className="rounded bg-violet-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider animate-pulse">
                            Active
                          </span>
                        ) : (
                          <span className="text-[10px] text-stone-400 italic">None</span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3 border-t border-stone-100 pt-3 text-center">
                      <div>
                        <div className="text-[10px] font-bold text-stone-400 uppercase">Proficiency Bonus</div>
                        <div className="mt-1 font-mono text-sm font-bold text-violet-700 bg-violet-50 inline-block px-2 py-0.5 rounded border border-violet-100">
                          {formatMod(proficiencyBonus(level))}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-stone-400 uppercase">Initiative</div>
                        <div className="mt-1 font-mono text-sm font-bold text-stone-800">
                          {formatMod(abilityMod(form.stats.dex))}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-stone-400 uppercase">Passive Perception</div>
                        <div className="mt-1 font-mono text-sm font-bold text-stone-800">
                          {passivePerception(form, proficiencyBonus(level))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Death Saves card */}
                  <div className="self-start rounded-xl border border-[#e2cfb3] bg-white p-3.5 shadow-sm">
                    <h3 className="text-sm font-bold text-stone-800 flex items-center gap-1.5 mb-2.5">
                      💀 Death Saves
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-stone-600">Successes</span>
                        <div className="flex gap-1.5">
                          {[1, 2, 3].map((n) => (
                            <div
                              key={n}
                              className={`h-4 w-4 rounded-full border-2 flex items-center justify-center text-[9px] font-bold ${
                                form.combat.deathSaves.successes >= n
                                  ? 'bg-emerald-500 border-emerald-500 text-white'
                                  : 'border-stone-300 bg-stone-100 text-transparent'
                              }`}
                            >
                              ✓
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-stone-600">Failures</span>
                        <div className="flex gap-1.5">
                          {[1, 2, 3].map((n) => (
                            <div
                              key={n}
                              className={`h-4 w-4 rounded-full border-2 flex items-center justify-center text-[9px] font-bold ${
                                form.combat.deathSaves.failures >= n
                                  ? 'bg-red-500 border-red-500 text-white'
                                  : 'border-stone-300 bg-stone-100 text-transparent'
                              }`}
                            >
                              ✕
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3.5 flex justify-center border-t border-stone-100 pt-3.5">
                      <StatsRadarChart
                        stats={form.stats}
                        savingThrows={form.savingThrows}
                        profBonus={proficiencyBonus(level)}
                        extraStats={activeExtraStats}
                      />
                    </div>
                  </div>
                </div>

                {/* Saving Throws & Skills grouped by ability */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                    🛡️ Saving Throws &amp; 🎯 ทักษะ (Skills)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {[...ABILITY_KEYS, ...activeExtraStats.map((s) => s.key)].map((key) => {
                      const isProf = form.savingThrows[key]
                      const bonus = savingThrowBonus(form, key, proficiencyBonus(level))
                      const abilitySkills = SKILLS.filter((s) => s.ability === key)
                      return (
                        <div key={key} className="rounded-xl border border-[#e2cfb3] bg-white p-3 shadow-sm space-y-2">
                          <div
                            className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm shadow-sm transition-all ${
                              isProf
                                ? 'border-violet-300 bg-violet-50/50 font-semibold text-violet-950'
                                : 'border-stone-200 bg-stone-50 text-stone-700'
                            }`}
                          >
                            <span className="flex items-center gap-1.5 uppercase">
                              {isProf && <span className="text-violet-600 text-xs">🛡️</span>}
                              {key} (Save)
                            </span>
                            <span className={`font-mono text-xs ${isProf ? 'text-violet-700 font-bold' : 'text-stone-500'}`}>
                              {formatMod(bonus)}
                            </span>
                          </div>
                          <div className="space-y-1.5">
                            {abilitySkills.map((s) => {
                              const state = normalizeSkillState(form.skills[s.key])
                              const skillBns = skillBonus(form, s, proficiencyBonus(level))
                              const hasBonus = state.prof || state.expertise
                              return (
                                <div
                                  key={s.key}
                                  className={`flex items-center justify-between rounded-lg border px-3 py-1.5 text-sm transition-all ${
                                    hasBonus
                                      ? 'border-violet-300 bg-violet-50/40 text-violet-950 font-semibold'
                                      : 'border-stone-200 bg-white text-stone-600'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 truncate">
                                    {state.expertise && (
                                      <span className="rounded-full bg-violet-600 text-white text-[9px] px-1 font-bold leading-none py-0.5" title="Expertise">
                                        E
                                      </span>
                                    )}
                                    {state.prof && !state.expertise && (
                                      <span className="rounded-full bg-violet-100 text-violet-700 text-[9px] px-1 font-bold leading-none py-0.5 border border-violet-200" title="Proficiency">
                                        P
                                      </span>
                                    )}
                                    <span className="truncate">{s.label}</span>
                                  </div>
                                  <span className={`font-mono text-xs ${hasBonus ? 'text-violet-700 font-bold' : 'text-stone-400'}`}>
                                    {formatMod(skillBns)}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Actions / Attack List */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                    ⚔️ Actions &amp; Weapons
                  </h3>
                  {form.weapons.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 p-6 text-center text-xs text-stone-400">
                      ไม่มีรายการ Action หรืออาวุธ
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {form.weapons.map((w, idx) => (
                        <div key={idx} className="rounded-xl border border-[#e2cfb3] bg-white p-3.5 shadow-sm space-y-2">
                          <div className="flex items-center justify-between border-b border-stone-50 pb-2">
                            <h4 className="font-semibold text-stone-900 text-sm flex items-center gap-1.5">
                              ⚔️ {w.name || '(ไม่มีชื่อ)'}
                            </h4>
                            {w.bonusOrDC && (
                              <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                                {w.bonusOrDC}
                              </span>
                            )}
                          </div>
                          <div className="space-y-1">
                            {w.damages.map((d, dIdx) => (
                              <div key={dIdx} className="flex items-center gap-2 text-xs">
                                <span className="font-mono font-bold text-stone-700">{d.amount || '0'}</span>
                                {d.type && (
                                  <span className="rounded-md bg-stone-100 text-stone-600 px-1.5 py-0.5 text-[10px] font-medium border border-stone-200">
                                    {d.type}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Features and Traits */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                    ✨ Features &amp; Traits (ความสามารถพิเศษ)
                  </h3>
                  {form.featuresAndTraits.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 p-6 text-center text-xs text-stone-400">
                      ไม่มีความสามารถพิเศษเฉพาะตัว
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {form.featuresAndTraits.map((item, index) => (
                        <div key={index} className="rounded-xl border border-[#e2cfb3] bg-white p-4 shadow-sm space-y-1.5">
                          <h4 className="font-bold text-stone-800 text-sm flex items-center gap-1.5">
                            ✨ {item.name || '(ไม่มีชื่อ)'}
                          </h4>
                          {item.description && (
                            <p className="text-xs text-stone-600 whitespace-pre-wrap leading-relaxed pl-4 border-l-2 border-violet-100">
                              {item.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {viewTab === 'equipment' && (
              <div className="space-y-6">
                {/* Currency Grid */}
                <div className="rounded-xl border border-[#e2cfb3] bg-white p-4 shadow-sm">
                  <h3 className="text-sm font-bold text-stone-800 flex items-center gap-1.5 mb-3">
                    💰 เงินตรา (Currency)
                  </h3>
                  <div className="grid grid-cols-5 gap-3 text-center">
                    {[
                      { key: 'cp', label: 'CP', color: 'bg-amber-600 border-amber-700 text-amber-950', name: 'Copper' },
                      { key: 'sp', label: 'SP', color: 'bg-stone-300 border-stone-400 text-stone-850', name: 'Silver' },
                      { key: 'ep', label: 'EP', color: 'bg-teal-600 border-teal-700 text-teal-950', name: 'Electrum' },
                      { key: 'gp', label: 'GP', color: 'bg-yellow-400 border-yellow-500 text-yellow-950', name: 'Gold' },
                      { key: 'pp', label: 'PP', color: 'bg-sky-200 border-sky-300 text-sky-950', name: 'Platinum' },
                    ].map((coin) => (
                      <div key={coin.key} className="rounded-lg border border-stone-150 bg-stone-50/50 p-2.5 relative overflow-hidden group">
                        <div className="flex justify-center mb-1">
                          <div className={`h-5 w-5 rounded-full border flex items-center justify-center text-[9px] font-bold ${coin.color} shadow-sm`}>
                            {coin.label}
                          </div>
                        </div>
                        <div className="font-mono text-sm font-bold text-stone-800">{form.currency[coin.key] || 0}</div>
                        <div className="text-[9px] text-stone-400 select-none">{coin.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipment & Proficiencies/Languages side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Weapons & Equipment */}
                  <div className="space-y-5">
                    {/* Weapons */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                        ⚔️ อาวุธ (Weapons)
                      </h3>
                      {form.weapons.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 p-6 text-center text-xs text-stone-400">
                          ไม่มีอาวุธ
                        </div>
                      ) : (
                        <div className="rounded-xl border border-stone-200 bg-white p-3.5 shadow-sm">
                          <ul className="divide-y divide-stone-100">
                            {form.weapons.map((w, index) => (
                              <li key={index} className="py-2 text-sm text-stone-700 flex items-center gap-2">
                                <span className="text-stone-400 text-xs">⚔️</span>
                                <span>{w.name || '(ไม่มีชื่อ)'}</span>
                                {w.damages?.[0]?.amount && (
                                  <span className="ml-auto shrink-0 rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-semibold text-stone-500 font-mono">
                                    {w.damages[0].amount}
                                    {w.damages[0].type ? ` ${w.damages[0].type}` : ''}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Equipment */}
                    <div className="space-y-3">
                    <h3 className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                      🎒 อุปกรณ์ (Equipment)
                    </h3>
                    {form.equipment.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 p-6 text-center text-xs text-stone-400">
                        ไม่มีอุปกรณ์สวมใส่
                      </div>
                    ) : (
                      <div className="rounded-xl border border-stone-200 bg-white p-3.5 shadow-sm">
                        <ul className="divide-y divide-stone-100">
                          {form.equipment.map((item, index) => (
                            <li key={index} className="py-2 text-sm text-stone-700 flex items-center gap-2">
                              <span className="text-stone-400 text-xs">🎒</span>
                              <span
                                role="button"
                                tabIndex={0}
                                title="คลิกเพื่อดูรายละเอียดไอเทม"
                                onClick={() => setStatblockItem({ name: item.name })}
                                className="cursor-pointer hover:underline hover:decoration-dotted"
                              >
                                {item.name}
                              </span>
                              {item.qty > 1 && (
                                <span className="ml-auto shrink-0 rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-semibold text-stone-500">
                                  ×{item.qty}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    </div>
                  </div>

                  {/* Proficiencies & Languages */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                      🗣️ Proficiencies &amp; Languages
                    </h3>
                    {form.proficienciesLanguages.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 p-6 text-center text-xs text-stone-400">
                        ไม่มีข้อมูลทักษะและภาษา
                      </div>
                    ) : (
                      <div className="rounded-xl border border-stone-200 bg-white p-3.5 shadow-sm">
                        <ul className="divide-y divide-stone-100">
                          {form.proficienciesLanguages.map((item, index) => (
                            <li key={index} className="py-2 text-sm text-stone-700 flex items-center gap-2">
                              <span className="text-stone-400 text-xs">🗣️</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {viewTab === 'personality' && (
              <div className="space-y-6">
                {/* Character Details Grid */}
                <div className="rounded-xl border border-[#e2cfb3] bg-white p-4 shadow-sm">
                  <h3 className="text-sm font-bold text-stone-800 flex items-center gap-1.5 mb-3">
                    🎭 ข้อมูลลักษณะ (Character Details)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { label: 'Alignment', value: form.alignment },
                      { label: 'Faith', value: form.faith },
                      { label: 'Gender', value: form.gender },
                      { label: 'Age', value: form.age },
                      { label: 'Height', value: form.height },
                      { label: 'Weight', value: form.weight },
                      { label: 'Eyes', value: form.eyes },
                      { label: 'Hair', value: form.hair },
                      { label: 'Skin', value: form.skin },
                    ].map((item) => (
                      <div key={item.label} className="rounded-lg border border-stone-150 bg-stone-50 p-2.5">
                        <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{item.label}</div>
                        <div className="mt-0.5 text-xs font-semibold text-stone-800 break-words">{item.value || '-'}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personality Values & Traits */}
                {(form.ideals || form.bonds || form.flaws || form.personalityTraits || form.appearance) && (
                  <div className="space-y-4 rounded-xl border border-[#e2cfb3] bg-white p-4 shadow-sm">
                    <h3 className="font-cinzel text-sm font-bold text-stone-800 border-b border-stone-100 pb-2 flex items-center gap-1.5">
                      🎭 บุคลิกภาพและค่านิยม (Personality &amp; Values)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        {form.ideals && (
                          <div className="rounded-lg bg-stone-50/50 p-2.5 border border-stone-100">
                            <span className="text-xs font-bold text-stone-500 uppercase flex items-center gap-1">
                              🌱 Ideals
                            </span>
                            <p className="mt-1 text-xs text-stone-700 whitespace-pre-wrap leading-relaxed">
                              {form.ideals}
                            </p>
                          </div>
                        )}
                        {form.bonds && (
                          <div className="rounded-lg bg-stone-50/50 p-2.5 border border-stone-100">
                            <span className="text-xs font-bold text-stone-500 uppercase flex items-center gap-1">
                              🔗 Bonds
                            </span>
                            <p className="mt-1 text-xs text-stone-700 whitespace-pre-wrap leading-relaxed">
                              {form.bonds}
                            </p>
                          </div>
                        )}
                        {form.flaws && (
                          <div className="rounded-lg bg-stone-50/50 p-2.5 border border-stone-100">
                            <span className="text-xs font-bold text-stone-500 uppercase flex items-center gap-1">
                              💔 Flaws
                            </span>
                            <p className="mt-1 text-xs text-stone-700 whitespace-pre-wrap leading-relaxed">
                              {form.flaws}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        {form.personalityTraits && (
                          <div className="rounded-lg bg-stone-50/50 p-2.5 border border-stone-100">
                            <span className="text-xs font-bold text-stone-500 uppercase flex items-center gap-1">
                              🧩 Personality Traits
                            </span>
                            <p className="mt-1 text-xs text-stone-700 whitespace-pre-wrap leading-relaxed">
                              {form.personalityTraits}
                            </p>
                          </div>
                        )}
                        {form.appearance && (
                          <div className="rounded-lg bg-stone-50/50 p-2.5 border border-stone-100">
                            <span className="text-xs font-bold text-stone-500 uppercase flex items-center gap-1">
                              👤 Appearance
                            </span>
                            <p className="mt-1 text-xs text-stone-700 whitespace-pre-wrap leading-relaxed">
                              {form.appearance}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Biography */}
                {form.biography && (
                  <div className="space-y-3 rounded-xl border border-[#e2cfb3] bg-white p-4 shadow-sm">
                    <h3 className="font-cinzel text-sm font-bold text-stone-800 border-b border-stone-100 pb-2 flex items-center gap-1.5">
                      🏺 ประวัติ (Biography)
                    </h3>
                    <div className="pt-1">
                      <p className="text-xs text-stone-700 whitespace-pre-wrap leading-relaxed">
                        {form.biography}
                      </p>
                    </div>
                  </div>
                )}

                {/* Allies & Organizations */}
                {(form.factionName || form.treasure || form.alliesOrganizations || form.additionalFeaturesTraits) && (
                  <div className="rounded-xl border border-[#e2cfb3] bg-white p-4 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-stone-800 border-b border-stone-100 pb-2 flex items-center gap-1.5">
                      🏰 พันธมิตรและองค์กร (Allies &amp; Factions)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        {form.factionName && (
                          <div className="rounded-lg bg-stone-50/50 p-2.5 border border-stone-100">
                            <span className="text-[10px] font-bold text-stone-400 uppercase">Faction Name</span>
                            <div className="text-xs font-semibold text-stone-800 mt-0.5">{form.factionName}</div>
                          </div>
                        )}
                        {form.alliesOrganizations && (
                          <div className="rounded-lg bg-stone-50/50 p-2.5 border border-stone-100">
                            <span className="text-[10px] font-bold text-stone-400 uppercase">Allies &amp; Organizations</span>
                            <p className="text-xs text-stone-700 mt-1 whitespace-pre-wrap leading-relaxed">{form.alliesOrganizations}</p>
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        {form.treasure && (
                          <div className="rounded-lg bg-stone-50/50 p-2.5 border border-stone-100">
                            <span className="text-[10px] font-bold text-stone-400 uppercase">Treasure</span>
                            <div className="text-xs font-semibold text-stone-800 mt-0.5">{form.treasure}</div>
                          </div>
                        )}
                        {form.additionalFeaturesTraits && (
                          <div className="rounded-lg bg-stone-50/50 p-2.5 border border-stone-100">
                            <span className="text-[10px] font-bold text-stone-400 uppercase">Additional Features &amp; Traits</span>
                            <p className="text-xs text-stone-700 mt-1 whitespace-pre-wrap leading-relaxed">{form.additionalFeaturesTraits}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Note Section */}
                {form.note && (
                  <div className="rounded-xl border border-[#e2cfb3] bg-stone-50/50 p-4 shadow-sm">
                    <span className="text-xs font-bold text-stone-400 uppercase flex items-center gap-1">
                      📝 หมายเหตุ (Notes)
                    </span>
                    <p className="mt-1 text-xs text-stone-700 whitespace-pre-wrap leading-relaxed">
                      {form.note}
                    </p>
                  </div>
                )}
              </div>
            )}

            {viewTab === 'spells' && (
              <SpellsTabView character={form} />
            )}
          </div>

          {/* Footer */}
          <div className={`flex items-center border-t border-[#e2cfb3] px-6 py-4 bg-[#f5ede0]/30 ${standalone ? 'justify-end' : 'justify-between'}`}>
            {!standalone && (
              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm hover:bg-[#f5ede0]"
              >
                ปิด
              </button>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setExportModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 shadow-sm hover:bg-violet-100"
              >
                📄 Export PDF
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
        {exportModalOpen && (
          <ExportPdfModal character={form} onClose={() => setExportModalOpen(false)} />
        )}
        <ItemStatblockModal item={statblockItem} onClose={() => setStatblockItem(null)} />
      </div>
    )
  }

  const activePreview = gallery.images.find((img) => img.id === gallery.activeImageId)?.dataUrl

  return (
    <div className={standalone ? 'h-full w-full' : 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'}>
      <div
        className={
          standalone
            ? 'flex h-full w-full flex-col overflow-hidden bg-white'
            : 'flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl'
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e2cfb3] px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-stone-900">
              {isEditing ? 'แก้ไขตัวละคร' : 'สร้างตัวละคร'}
            </h2>
            <p className="text-xs text-stone-400">บันทึกข้อมูลตัวละคร D&amp;D อย่างครบถ้วน</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              ref={foundryImportInputRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={handleFoundryImportChange}
            />
            <button
              type="button"
              onClick={() => foundryImportInputRef.current?.click()}
              disabled={importingFoundry}
              className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
              title="นำเข้าข้อมูลจากไฟล์ Foundry VTT character actor export (.json)"
            >
              {importingFoundry ? '⏳ กำลังนำเข้า...' : '📥 Import Foundry JSON'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => setExportModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-md border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700 hover:bg-violet-100"
              >
                📄 Export PDF
              </button>
            )}
            {isEditing && !standalone && (
              <a
                href={`/characters/${form.id}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-stone-300 bg-white px-2 py-1.5 text-xs font-medium text-stone-600 hover:bg-[#f5ede0]"
                title="เปิดหน้าตัวละครในแท็บใหม่"
              >
                ↗ เปิดแท็บใหม่
              </a>
            )}
            {standalone && headerExtra}
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-md p-1.5 text-stone-400 hover:bg-[#f5ede0] hover:text-stone-600"
              aria-label="ปิด"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto border-b border-[#e2cfb3] bg-white px-4 md:justify-center">
          {EDIT_TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setEditTab(t.key)}
              className={`shrink-0 inline-flex items-center justify-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-3 text-xs sm:text-sm font-semibold transition-colors md:flex-1 ${
                editTab === t.key
                  ? 'border-violet-600 text-violet-700 bg-violet-50/30'
                  : 'border-transparent text-stone-500 hover:bg-stone-50/50 hover:text-stone-800'
              }`}
            >
              <span aria-hidden className="leading-none">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto bg-[#f5ede0] px-5 py-4">
        {editTab === 'identity' && (
        <>
          <FormSection icon="🖼️" title="ภาพตัวละคร" hint="อัปโหลดได้หลายรูป เลือกรูปหลักที่จะแสดง">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="h-36 w-36 shrink-0 overflow-hidden rounded-md border border-[#e2cfb3] bg-[#f5ede0]">
                {activePreview ? (
                  <img src={activePreview} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-stone-300">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7v1H4v-1Z" />
                    </svg>
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
                <SearchSelect
                  options={users.map((u) => ({ value: u.id, label: u.username || '(ไม่มีชื่อ)' }))}
                  value={form.ownerId}
                  onChange={(v) => patch({ ownerId: v })}
                  placeholder="-"
                  clearLabel="เปลี่ยน"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-stone-500">Status</label>
                <SearchSelect
                  options={STATUS_OPTIONS.map((s) => ({ value: s, label: s }))}
                  value={form.status}
                  onChange={(v) => patch({ status: v })}
                  clearLabel="เปลี่ยน"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-stone-500">Size</label>
                <SearchSelect
                  options={SIZE_OPTIONS.map((s) => ({ value: s, label: s }))}
                  value={form.size}
                  onChange={(v) => patch({ size: v })}
                  clearLabel="เปลี่ยน"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-stone-500">Species</label>
                <SearchSelect
                  options={speciesOptions.map((s) => ({ value: s, label: s }))}
                  value={form.species}
                  onChange={(v) => patch({ species: v })}
                  placeholder="-"
                  clearLabel="เปลี่ยน"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-stone-500">Background</label>
                <SearchSelect
                  options={backgroundOptions.map((b) => ({ value: b, label: b }))}
                  value={form.background}
                  onChange={(v) => patch({ background: v })}
                  placeholder="-"
                  clearLabel="เปลี่ยน"
                />
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
            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {EXTRA_STAT_KEYS.map((s) => (
                <div key={s.key}>
                  <label className="mb-0.5 block text-center text-[11px] font-medium text-stone-400" title="ค่าพลังเสริม ใช้เฉพาะบางแคมเปญ (เช่น Honor/Sanity)">
                    {s.label}
                  </label>
                  <input
                    type="number"
                    value={form.stats[s.key] ?? 0}
                    onChange={(e) => patchStat(s.key, e.target.value)}
                    className="w-full rounded-md border border-dashed border-gray-300 px-1 py-1 text-center text-sm"
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
                      <SearchSelect
                        options={classes.map((c) => ({ value: c, label: c }))}
                        value={cl.className}
                        onChange={(v) => updateClassLevel(cl.id, { className: v, subclassName: '' })}
                        placeholder="-"
                        clearLabel="เปลี่ยน"
                      />
                    </div>
                    <div className="min-w-[140px] flex-1">
                      <label className="mb-1 block text-[11px] text-stone-500">Subclass</label>
                      <SearchSelect
                        options={availableSubclasses.map((s) => ({ value: s, label: s }))}
                        value={cl.subclassName}
                        onChange={(v) => updateClassLevel(cl.id, { subclassName: v })}
                        disabled={!cl.className}
                        placeholder="-"
                        clearLabel="เปลี่ยน"
                      />
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
        </>
        )}

        {editTab === 'combat' && (
        <>
          <FormSection icon="❤️" title="สถานะการต่อสู้ (Combat Stats)">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs text-stone-500">Armor Class (AC)</label>
                <input
                  value={form.combat.ac}
                  onChange={(e) => patchCombat({ ac: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-stone-500">Speed</label>
                <input
                  value={form.combat.speed}
                  onChange={(e) => patchCombat({ speed: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                  placeholder="เช่น 30 ft."
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-stone-500">Hit Dice</label>
                <input
                  value={form.combat.hitDice}
                  onChange={(e) => patchCombat({ hitDice: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                  placeholder="เช่น 5d10"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-stone-500">XP</label>
                <input
                  value={form.combat.xp}
                  onChange={(e) => patchCombat({ xp: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-stone-500">HP สูงสุด</label>
                <input
                  value={form.combat.hp.max}
                  onChange={(e) => patchHp({ max: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-stone-500">HP ปัจจุบัน</label>
                <input
                  value={form.combat.hp.current}
                  onChange={(e) => patchHp({ current: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-stone-500">HP ชั่วคราว</label>
                <input
                  value={form.combat.hp.temp}
                  onChange={(e) => patchHp({ temp: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                />
              </div>
              <div className="flex items-end pb-1.5">
                <label className="flex items-center gap-1.5 text-xs text-stone-600">
                  <input
                    type="checkbox"
                    checked={form.combat.inspiration}
                    onChange={(e) => patchCombat({ inspiration: e.target.checked })}
                  />
                  Inspiration
                </label>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <div className="mb-1 text-xs text-stone-500">Proficiency Bonus</div>
                <div className="font-mono text-sm font-semibold text-stone-800">
                  {formatMod(proficiencyBonus(level))}
                </div>
              </div>
              <div>
                <div className="mb-1 text-xs text-stone-500">Initiative</div>
                <div className="font-mono text-sm font-semibold text-stone-800">
                  {formatMod(abilityMod(form.stats.dex))}
                </div>
              </div>
              <div>
                <div className="mb-1 text-xs text-stone-500">Passive Perception</div>
                <div className="font-mono text-sm font-semibold text-stone-800">
                  {passivePerception(form, proficiencyBonus(level))}
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="mb-1.5 text-xs text-stone-500">Death Saves</div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-stone-500">Successes</span>
                  {[1, 2, 3].map((n) => (
                    <label key={n} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={form.combat.deathSaves.successes >= n}
                        onChange={() =>
                          patchDeathSaves({
                            successes: form.combat.deathSaves.successes >= n ? n - 1 : n,
                          })
                        }
                      />
                    </label>
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-stone-500">Failures</span>
                  {[1, 2, 3].map((n) => (
                    <label key={n} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={form.combat.deathSaves.failures >= n}
                        onChange={() =>
                          patchDeathSaves({
                            failures: form.combat.deathSaves.failures >= n ? n - 1 : n,
                          })
                        }
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </FormSection>

          <FormSection icon="🛡️" title="Saving Throws" hint="ติ๊กเมื่อมี proficiency">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[...ABILITY_KEYS, ...EXTRA_STAT_KEYS.map((s) => s.key)].map((key) => (
                <label
                  key={key}
                  className="flex items-center justify-between gap-2 rounded-md border border-[#e2cfb3] bg-white px-2.5 py-1.5 text-sm"
                >
                  <span className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      checked={form.savingThrows[key]}
                      onChange={() => toggleSavingThrow(key)}
                    />
                    <span className="uppercase text-stone-700">{key}</span>
                  </span>
                  <span className="font-mono text-xs text-stone-500">
                    {formatMod(savingThrowBonus(form, key, proficiencyBonus(level)))}
                  </span>
                </label>
              ))}
            </div>
          </FormSection>

          <FormSection
            icon="🎯"
            title="ทักษะ (Skills)"
            hint="P = Proficiency, E = Expertise (โบนัส x2, ตามกฎ D&D ต้องมี Proficiency ก่อน)"
          >
            <div className="mb-1.5 hidden items-center gap-2 px-2.5 text-[10px] uppercase text-stone-400 sm:flex">
              <span className="flex-1">Skill</span>
              <span className="w-6 text-center">P</span>
              <span className="w-6 text-center">E</span>
              <span className="w-8 text-right">Mod</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {SKILLS.map((s) => {
                const state = normalizeSkillState(form.skills[s.key])
                return (
                  <div
                    key={s.key}
                    className="flex items-center justify-between gap-2 rounded-md border border-[#e2cfb3] bg-white px-2.5 py-1.5 text-sm"
                  >
                    <span className="flex min-w-0 flex-1 items-center gap-1.5">
                      <span className="truncate text-stone-700">{s.label}</span>
                      <span className="shrink-0 text-[10px] uppercase text-stone-400">
                        ({s.ability})
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      <label
                        title="Proficiency"
                        className="flex w-6 cursor-pointer items-center justify-center"
                      >
                        <input
                          type="checkbox"
                          checked={state.prof}
                          onChange={() => toggleSkillProf(s.key)}
                        />
                      </label>
                      <label
                        title="Expertise"
                        className="flex w-6 cursor-pointer items-center justify-center"
                      >
                        <input
                          type="checkbox"
                          checked={state.expertise}
                          onChange={() => toggleSkillExpertise(s.key)}
                        />
                      </label>
                      <span className="w-8 text-right font-mono text-xs text-stone-500">
                        {formatMod(skillBonus(form, s, proficiencyBonus(level)))}
                      </span>
                    </span>
                  </div>
                )
              })}
            </div>
          </FormSection>

          <FormSection icon="⚔️" title="Action" hint="เพิ่ม/ลบ Action และดาเมจได้ตามต้องการ">
            <div className="space-y-2.5">
              {form.weapons.map((action, index) => (
                <div key={index} className="rounded-lg border border-[#e2cfb3] bg-[#fffaf0] p-2.5">
                  <div className="flex items-start gap-2">
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex gap-2">
                        <input
                          value={action.name}
                          onChange={(e) => patchAction(index, { name: e.target.value })}
                          placeholder="Action (เช่น ดาบยาว, Fire Bolt, Breath Weapon...)"
                          className="min-w-0 flex-1 rounded-md border border-gray-300 px-2 py-1.5 text-sm font-medium"
                        />
                        <input
                          value={action.bonusOrDC}
                          onChange={(e) => patchAction(index, { bonusOrDC: e.target.value })}
                          placeholder="Bonus / DC (เช่น +7, DC 15)"
                          className="w-32 sm:w-44 shrink-0 rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                        />
                      </div>
                      <div className="space-y-1.5 pt-0.5">
                        {action.damages.map((d, dIndex) => (
                          <div key={dIndex} className="flex items-center gap-1.5">
                            <input
                              value={d.amount}
                              onChange={(e) =>
                                patchActionDamage(index, dIndex, { amount: e.target.value })
                              }
                              placeholder="ดาเมจ เช่น 1d8 + 3"
                              className="min-w-0 flex-1 rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                            />
                            <select
                              value={d.type}
                              onChange={(e) =>
                                patchActionDamage(index, dIndex, { type: e.target.value })
                              }
                              className="shrink-0 rounded-md border border-gray-300 px-2 py-1.5 text-sm text-stone-600"
                            >
                              <option value="">ชนิดดาเมจ...</option>
                              {DAMAGE_TYPES.map((t) => (
                                <option key={t} value={t}>
                                  {t}
                                </option>
                              ))}
                            </select>
                            <button
                              type="button"
                              onClick={() => removeActionDamage(index, dIndex)}
                              disabled={action.damages.length <= 1}
                              title="ลบดาเมจนี้"
                              className="shrink-0 rounded-md px-1.5 py-1 text-stone-400 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => addActionDamage(index)}
                        className="text-xs font-medium text-amber-700 hover:text-amber-900"
                      >
                        + เพิ่มดาเมจ
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAction(index)}
                      title="ลบ Action นี้"
                      className="shrink-0 rounded-md px-1.5 py-1 text-stone-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addAction}
              className="mt-2.5 rounded-md border border-dashed border-amber-400 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-50"
            >
              + เพิ่ม Action
            </button>
          </FormSection>

          <FormSection icon="✨" title="Features and Traits" hint="ใส่ชื่อพร้อมคำอธิบายทีละรายการ">
            <FeatureListEditor
              items={form.featuresAndTraits}
              onChange={(items) => patch({ featuresAndTraits: items })}
            />
          </FormSection>
        </>
        )}

        {editTab === 'equipment' && (
        <>
          <FormSection icon="💰" title="เงินตรา (Currency)">
            <div className="grid grid-cols-5 gap-2">
              {['cp', 'sp', 'ep', 'gp', 'pp'].map((key) => (
                <div key={key}>
                  <label className="mb-1 block text-center text-xs uppercase text-stone-500">{key}</label>
                  <input
                    value={form.currency[key]}
                    onChange={(e) => patchCurrency({ [key]: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-center text-sm"
                  />
                </div>
              ))}
            </div>
          </FormSection>

          <FormSection icon="🎒" title="อุปกรณ์ (Equipment)" hint="กำหนดเองหรือเลือกจากร้านค้า">
            <EquipmentListEditor
              items={form.equipment}
              onChange={(items) => patch({ equipment: items })}
              modes={[
                { key: 'custom', label: 'กำหนดเอง', type: 'text', placeholder: 'เช่น ดาบยาว, เกราะโซ่...' },
                {
                  key: 'shop',
                  label: 'จากร้านค้า',
                  type: 'select',
                  options: shopItemOptions.all,
                  placeholder: 'ค้นหาไอเทมในร้านค้า...',
                },
              ]}
            />
          </FormSection>

          <FormSection icon="🗣️" title="Proficiencies &amp; Languages" hint="กำหนดเอง, จากร้านค้า หรือภาษาตามกฎ D&amp;D">
            <ItemListEditor
              items={form.proficienciesLanguages}
              onChange={(items) => patch({ proficienciesLanguages: items })}
              modes={[
                { key: 'custom', label: 'กำหนดเอง', type: 'text', placeholder: "เช่น Smith's Tools..." },
                {
                  key: 'shop',
                  label: 'จากร้านค้า',
                  type: 'select',
                  options: shopItemOptions.tools,
                  placeholder: 'ค้นหาเครื่องมือ/ทูลในร้านค้า...',
                },
                {
                  key: 'language',
                  label: 'ภาษา D&D',
                  type: 'select',
                  options: DND_LANGUAGES,
                  placeholder: 'เลือกภาษา...',
                },
              ]}
            />
          </FormSection>
        </>
        )}

        {editTab === 'personality' && (
        <>
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

          <FormSection icon="🏰" title="พันธมิตรและองค์กร (Allies &amp; Factions)">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-stone-500">Faction Name</label>
                <input
                  value={form.factionName}
                  onChange={(e) => patch({ factionName: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-stone-500">Treasure</label>
                <input
                  value={form.treasure}
                  onChange={(e) => patch({ treasure: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="mb-1 block text-xs text-stone-500">Allies &amp; Organizations</label>
              <textarea
                value={form.alliesOrganizations}
                onChange={(e) => patch({ alliesOrganizations: e.target.value })}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm"
              />
            </div>
            <div className="mt-3">
              <label className="mb-1 block text-xs text-stone-500">Additional Features &amp; Traits</label>
              <textarea
                value={form.additionalFeaturesTraits}
                onChange={(e) => patch({ additionalFeaturesTraits: e.target.value })}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm"
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
        </>
        )}

        {editTab === 'spells' && (
          <SpellsTabEdit
            form={form}
            classes={classes}
            patchSpellcastingMeta={patchSpellcastingMeta}
            patchCantrip={patchCantrip}
            patchSpell={patchSpell}
            patchSpellSlots={patchSpellSlots}
          />
        )}
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

      {exportModalOpen && (
        <ExportPdfModal character={form} onClose={() => setExportModalOpen(false)} />
      )}
    </div>
  )
}

function CharactersTab({
  characters,
  users,
  partyTags,
  campaigns,
  shops,
  classes,
  subclassesByClass,
  speciesOptions,
  backgroundOptions,
  referenceLinks,
  dispatch,
  showToast,
  prefillCharacter,
  onConsumePrefill,
}) {
  const [editingCharacter, setEditingCharacter] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [imageVersions, setImageVersions] = useState({})

  useEffect(() => {
    if (!prefillCharacter) return
    setEditingCharacter({ ...blankCharacter(), ...prefillCharacter })
    onConsumePrefill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillCharacter])

  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('In-Action')
  const [filterUserId, setFilterUserId] = useState('')
  const [filterPartyId, setFilterPartyId] = useState('')
  const [filterClass, setFilterClass] = useState('')
  const [filterCampaignId, setFilterCampaignId] = useState('')
  const [sortBy, setSortBy] = useState('name')

  const partyTagsById = useMemo(
    () => Object.fromEntries(partyTags.map((t) => [t.id, t])),
    [partyTags],
  )

  const campaignsById = useMemo(
    () => Object.fromEntries(campaigns.map((c) => [c.id, c])),
    [campaigns],
  )

  const usersById = useMemo(
    () => Object.fromEntries(users.map((u) => [u.id, u])),
    [users],
  )

  const campaignsWithCharacters = useMemo(() => {
    const usedCampaignIds = new Set(characters.flatMap((c) => c.campaignIds ?? []))
    return campaigns.filter((c) => usedCampaignIds.has(c.id))
  }, [campaigns, characters])

  function getSortValue(character) {
    switch (sortBy) {
      case 'status':
        return character.status || ''
      case 'party':
        return partyTagsById[(character.partyTagIds ?? [])[0]]?.name || ''
      case 'campaign':
        return campaignsById[(character.campaignIds ?? [])[0]]?.name || ''
      case 'user':
        return usersById[character.ownerId]?.username || ''
      default:
        return character.name || ''
    }
  }

  const filteredCharacters = useMemo(() => {
    const q = search.trim().toLowerCase()
    const filtered = characters.filter((character) => {
      if (q && !character.name?.toLowerCase().includes(q)) return false
      if (filterStatus && character.status !== filterStatus) return false
      if (filterUserId === NO_USER_FILTER) {
        if (character.ownerId) return false
      } else if (filterUserId && character.ownerId !== filterUserId) return false
      if (filterPartyId === NO_PARTY_FILTER) {
        if ((character.partyTagIds ?? []).length > 0) return false
      } else if (filterPartyId && !(character.partyTagIds ?? []).includes(filterPartyId)) return false
      if (filterClass && !(character.classLevels ?? []).some((cl) => cl.className === filterClass)) return false
      if (filterCampaignId === NO_CAMPAIGN_FILTER) {
        if ((character.campaignIds ?? []).length > 0) return false
      } else if (filterCampaignId && !(character.campaignIds ?? []).includes(filterCampaignId)) return false
      return true
    })
    return [...filtered].sort((a, b) => {
      if (sortBy === 'level') return totalLevel(b) - totalLevel(a)
      return getSortValue(a).localeCompare(getSortValue(b), 'th')
    })
  }, [
    characters,
    search,
    filterStatus,
    filterUserId,
    filterPartyId,
    filterClass,
    filterCampaignId,
    sortBy,
    partyTagsById,
    campaignsById,
    usersById,
  ])

  function resetFilters() {
    setSearch('')
    setFilterStatus('')
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

  const hasActiveFilters =
    search || filterStatus || filterUserId || filterPartyId || filterClass || filterCampaignId

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-wrap items-end gap-2">
          <div>
            <label className="mb-1 block text-xs text-stone-500">เรียงตาม (A-Z)</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-36 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-stone-500">ค้นหา</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาชื่อตัวละคร"
              className="w-48 rounded-md border border-gray-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-stone-500">Status</label>
            <SearchSelect
              options={STATUS_OPTIONS.map((s) => ({ value: s, label: s }))}
              value={filterStatus}
              onChange={setFilterStatus}
              placeholder="ทั้งหมด"
              clearLabel="ล้าง"
              className="w-36"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-stone-500">Party</label>
            <SearchSelect
              options={[
                { value: NO_PARTY_FILTER, label: 'ไม่มี Party' },
                ...partyTags.map((t) => ({ value: t.id, label: t.name || '(ไม่มีชื่อ)' })),
              ]}
              value={filterPartyId}
              onChange={setFilterPartyId}
              placeholder="ทั้งหมด"
              clearLabel="ล้าง"
              className="w-36"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-stone-500">Campaign</label>
            <SearchSelect
              options={[
                { value: NO_CAMPAIGN_FILTER, label: 'ไม่มี Campaign' },
                ...campaignsWithCharacters.map((c) => ({ value: c.id, label: c.name || '(ไม่มีชื่อ)' })),
              ]}
              value={filterCampaignId}
              onChange={setFilterCampaignId}
              placeholder="ทั้งหมด"
              clearLabel="ล้าง"
              className="w-36"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-stone-500">User</label>
            <SearchSelect
              options={[
                { value: NO_USER_FILTER, label: 'ไม่มี User' },
                ...users.map((u) => ({ value: u.id, label: u.username || '(ไม่มีชื่อ)' })),
              ]}
              value={filterUserId}
              onChange={setFilterUserId}
              placeholder="ทั้งหมด"
              clearLabel="ล้าง"
              className="w-36"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-stone-500">Class</label>
            <SearchSelect
              options={classes.map((c) => ({ value: c, label: c }))}
              value={filterClass}
              onChange={setFilterClass}
              placeholder="ทั้งหมด"
              clearLabel="ล้าง"
              className="w-36"
            />
          </div>
          <span className="px-2 py-1.5 text-xs text-stone-500">
            ({filteredCharacters.length})
          </span>
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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCharacters.map((character) => {
            const summary = classSummary(character)
            return (
              <button
                type="button"
                key={character.id}
                onClick={() => openEdit(character)}
                className="group flex flex-row items-stretch overflow-hidden rounded-xl border border-[#e2cfb3] bg-white text-left shadow-sm transition-all duration-200 hover:shadow-md h-20 sm:h-24 w-full"
              >
                {/* Left Portrait Image */}
                <div className="relative aspect-square h-full shrink-0 bg-[#f5ede0] overflow-hidden">
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
                  {(character.status || character.ownerId) && (
                    <div className="mt-1 flex flex-wrap items-center gap-1">
                      {character.status && (
                        <span
                          className={`inline-block w-fit truncate rounded-full px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold leading-none ${
                            STATUS_BADGE_STYLES[character.status] || 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          {character.status}
                        </span>
                      )}
                      {(() => {
                        const owner = users.find((u) => u.id === character.ownerId)
                        if (!owner) return null
                        return (
                          <span
                            className="inline-flex max-w-[6.5rem] items-center gap-1 truncate rounded-full px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium leading-none"
                            style={{
                              backgroundColor: `${owner.color || DEFAULT_COLOR}1a`,
                              color: owner.color || DEFAULT_COLOR,
                            }}
                          >
                            <span
                              className="h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ backgroundColor: owner.color || DEFAULT_COLOR }}
                            />
                            <span className="truncate">{owner.username}</span>
                          </span>
                        )
                      })()}
                    </div>
                  )}
                  {(character.partyTagIds ?? []).length > 0 && (
                    <div className="mt-1 flex flex-wrap items-center gap-1">
                      {(character.partyTagIds ?? []).map((tagId) => {
                        const party = partyTags.find((t) => t.id === tagId)
                        if (!party) return null
                        return (
                          <span
                            key={tagId}
                            className="inline-flex max-w-[7rem] items-center gap-1 truncate rounded-full px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium leading-none"
                            style={{
                              backgroundColor: `${party.color || DEFAULT_COLOR}1a`,
                              color: party.color || DEFAULT_COLOR,
                            }}
                          >
                            <span
                              className="h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ backgroundColor: party.color || DEFAULT_COLOR }}
                            />
                            <span className="truncate">{party.name}</span>
                          </span>
                        )
                      })}
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
          shops={shops}
          classes={classes}
          subclassesByClass={subclassesByClass}
          speciesOptions={speciesOptions}
          backgroundOptions={backgroundOptions}
          referenceLinks={referenceLinks}
          onCancel={() => setEditingCharacter(null)}
          onSave={handleSave}
          onDelete={requestDelete}
          showToast={showToast}
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

function SpellsTabView({ character }) {
  const sp = character.spellcasting || blankSpellcasting()
  const [preparedOnly, setPreparedOnly] = useState(false)

  // Helper to check if level has any spells
  const hasSpells = (level) => {
    if (level === 0) {
      return sp.cantrips?.some(c => c.name?.trim())
    }
    const lvl = sp.levels?.[level]
    return lvl?.spells?.some(s => s.name?.trim()) || lvl?.slotsTotal || lvl?.slotsRemaining
  }

  const anySpells = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].some(lvl => hasSpells(lvl))

  // Render a spell level card
  const renderLevelCard = (level, title) => {
    const isCantrip = level === 0
    const spellsList = isCantrip
      ? (sp.cantrips || [])
      : (sp.levels?.[level]?.spells || [])

    let activeSpells = spellsList.filter(s => s.name?.trim())
    if (preparedOnly && !isCantrip) {
      activeSpells = activeSpells.filter(s => s.prepared)
    }

    if (activeSpells.length === 0 && (isCantrip || (!sp.levels?.[level]?.slotsTotal && !sp.levels?.[level]?.slotsRemaining))) {
      return null // Hide empty levels in view mode
    }

    return (
      <div key={level} className="rounded-xl border border-[#e2cfb3] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between border-b border-stone-105 pb-2 mb-3">
          <h4 className="font-cinzel text-xs font-bold text-stone-800 flex items-center gap-1.5">
            ✨ {title}
          </h4>
          {!isCantrip && (
            <div className="flex gap-2">
              <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[9px] font-bold text-stone-500 uppercase tracking-wider">
                ช่องเวท (Slots): {sp.levels?.[level]?.slotsRemaining || 0} / {sp.levels?.[level]?.slotsTotal || 0}
              </span>
            </div>
          )}
        </div>
        
        <div className="space-y-1.5">
          {activeSpells.map((s, idx) => (
            <div key={idx} className="flex items-center gap-2 rounded-md bg-stone-50/50 px-2 py-1.5 border border-stone-100/50 hover:bg-stone-50 transition-colors">
              {!isCantrip && (
                <div className="shrink-0">
                  {s.prepared ? (
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-violet-100 text-violet-700 text-[10px] font-semibold" title="เตรียมการแล้ว (Prepared)">
                      ✓
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-stone-100 text-stone-300 text-[10px] font-semibold" title="ยังไม่ได้เตรียม (Unprepared)">
                      -
                    </span>
                  )}
                </div>
              )}
              <span className="text-xs font-medium text-stone-700 leading-tight">
                {s.name}
              </span>
            </div>
          ))}
          {activeSpells.length === 0 && (
            <div className="text-center py-2 text-xs text-stone-400 italic">
              ไม่มีคาถาที่ระบุ
            </div>
          )}
        </div>
      </div>
    )
  }

  // 3 Columns matching the PDF columns
  const leftLevels = [
    { lvl: 0, title: 'Cantrips (คาถาระดับ 0)' },
    { lvl: 1, title: 'Level 1 Spells (เวทมนตร์เลเวล 1)' },
    { lvl: 2, title: 'Level 2 Spells (เวทมนตร์เลเวล 2)' }
  ]
  const midLevels = [
    { lvl: 3, title: 'Level 3 Spells (เวทมนตร์เลเวล 3)' },
    { lvl: 4, title: 'Level 4 Spells (เวทมนตร์เลเวล 4)' },
    { lvl: 5, title: 'Level 5 Spells (เวทมนตร์เลเวล 5)' }
  ]
  const rightLevels = [
    { lvl: 6, title: 'Level 6 Spells (เวทมนตร์เลเวล 6)' },
    { lvl: 7, title: 'Level 7 Spells (เวทมนตร์เลเวล 7)' },
    { lvl: 8, title: 'Level 8 Spells (เวทมนตร์เลเวล 8)' },
    { lvl: 9, title: 'Level 9 Spells (เวทมนตร์เลเวล 9)' }
  ]

  return (
    <div className="space-y-6">
      {/* Spellcasting Metadata Header Card */}
      <div className="rounded-xl border border-[#e2cfb3] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
            🔮 ข้อมูลผู้ใช้เวทมนตร์ (Spellcasting Information)
          </h3>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={preparedOnly}
              onChange={(e) => setPreparedOnly(e.target.checked)}
              className="h-3.5 w-3.5 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
            />
            แสดงเฉพาะที่เตรียมไว้ (Prepared)
          </label>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className="rounded-lg bg-stone-50 border border-stone-100 p-2">
            <div className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Spellcasting Class</div>
            <div className="mt-1 text-xs font-bold text-stone-800">{sp.spellcastingClass || '-'}</div>
          </div>
          <div className="rounded-lg bg-stone-50 border border-stone-100 p-2">
            <div className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Spellcasting Ability</div>
            <div className="mt-1 text-xs font-bold text-stone-800">{sp.spellcastingAbility || '-'}</div>
          </div>
          <div className="rounded-lg bg-stone-50 border border-stone-100 p-2">
            <div className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Spell Save DC</div>
            <div className="mt-1 font-mono text-xs font-bold text-stone-800">{sp.spellSaveDC || '-'}</div>
          </div>
          <div className="rounded-lg bg-stone-50 border border-stone-100 p-2">
            <div className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Spell Attack Bonus</div>
            <div className="mt-1 font-mono text-xs font-bold text-stone-800">{sp.spellAttackBonus || '-'}</div>
          </div>
        </div>
      </div>

      {anySpells ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {leftLevels.map(l => renderLevelCard(l.lvl, l.title))}
          </div>
          {/* Middle Column */}
          <div className="space-y-6">
            {midLevels.map(l => renderLevelCard(l.lvl, l.title))}
          </div>
          {/* Right Column */}
          <div className="space-y-6">
            {rightLevels.map(l => renderLevelCard(l.lvl, l.title))}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-stone-200 p-12 text-center text-stone-400 bg-white">
          <div className="text-3xl mb-2">✨</div>
          <div className="text-sm font-medium">ยังไม่มีข้อมูลเวทมนตร์หรือคาถาสำหรับตัวละครนี้</div>
          <div className="text-xs text-stone-300 mt-1">คลิกปุ่ม Edit เพื่อเริ่มเพิ่มเวทมนตร์และระบุช่องร่ายเวท (Spell Slots)</div>
        </div>
      )}
    </div>
  )
}

function SpellsTabEdit({
  form,
  classes,
  patchSpellcastingMeta,
  patchCantrip,
  patchSpell,
  patchSpellSlots,
}) {
  const sp = form.spellcasting || blankSpellcasting()
  const [activeLevel, setActiveLevel] = useState(0) // Default to Cantrips open

  const abilityOption = STAT_KEYS.find((s) => s.label === sp.spellcastingAbility)
  const level = form.classLevels.reduce((sum, cl) => sum + (Number(cl.level) || 0), 0)
  const profBonus = proficiencyBonus(level)
  const abilityMod_ = abilityOption ? abilityMod(form.stats?.[abilityOption.key]) : null
  const computedDC = abilityMod_ != null ? 8 + profBonus + abilityMod_ : null
  const computedAtk = abilityMod_ != null ? formatMod(profBonus + abilityMod_) : null

  useEffect(() => {
    if (computedDC == null) return
    const dcText = String(computedDC)
    if (sp.spellSaveDC === dcText && sp.spellAttackBonus === computedAtk) return
    patchSpellcastingMeta({ spellSaveDC: dcText, spellAttackBonus: computedAtk })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computedDC, computedAtk])

  const rowCounts = {
    1: 12, 2: 13, 3: 13, 4: 13, 5: 9, 6: 9, 7: 9, 8: 7, 9: 7
  }

  // Count active spells for badge
  const getSpellCountText = (level) => {
    if (level === 0) {
      const active = (sp.cantrips || []).filter(c => c.name?.trim()).length
      return `${active} คาถา`
    }
    const lvlData = sp.levels?.[level]
    const active = (lvlData?.spells || []).filter(s => s.name?.trim()).length
    const slotsTotal = lvlData?.slotsTotal || 0
    return `${active} คาถา (${slotsTotal} ช่องเวท)`
  }

  return (
    <div className="space-y-4">
      {/* Spellcasting Meta Info */}
      <FormSection icon="🔮" title="ข้อมูลการร่ายเวท (Spellcasting Info)">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="mb-1 block text-xs text-stone-500 font-semibold uppercase">Spellcasting Class</label>
            <SearchSelect
              options={classes.map((c) => ({ value: c, label: c }))}
              value={sp.spellcastingClass || ''}
              onChange={(v) => patchSpellcastingMeta({ spellcastingClass: v })}
              placeholder="เลือกคลาส"
              clearLabel="เปลี่ยน"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-stone-500 font-semibold uppercase">Spellcasting Ability</label>
            <SearchSelect
              options={STAT_KEYS.map((s) => ({ value: s.label, label: s.label }))}
              value={sp.spellcastingAbility || ''}
              onChange={(v) => patchSpellcastingMeta({ spellcastingAbility: v })}
              placeholder="เลือกค่าพลัง"
              clearLabel="เปลี่ยน"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-stone-500 font-semibold uppercase">Spell Save DC</label>
            <div className="w-full rounded-md border border-gray-200 bg-stone-50 px-2.5 py-1.5 text-sm font-mono font-bold text-stone-700">
              {computedDC ?? '-'}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-stone-500 font-semibold uppercase">Spell Attack Bonus</label>
            <div className="w-full rounded-md border border-gray-200 bg-stone-50 px-2.5 py-1.5 text-sm font-mono font-bold text-stone-700">
              {computedAtk ?? '-'}
            </div>
          </div>
        </div>
      </FormSection>

      {/* Accordion List */}
      <FormSection icon="✨" title="รายการคาถา (Spell List)" hint="คลิกแต่ละระดับเพื่อระบุช่องเวทและรายชื่อเวทมนตร์">
        <div className="space-y-2.5">
          {/* Level 0 (Cantrips) */}
          <div className="overflow-hidden rounded-lg border border-[#e2cfb3] bg-white shadow-sm">
            <button
              type="button"
              onClick={() => setActiveLevel(activeLevel === 0 ? null : 0)}
              className="flex w-full items-center justify-between bg-stone-50 px-4 py-3 text-left hover:bg-stone-100/70 transition-colors cursor-pointer"
            >
              <span className="font-cinzel text-xs font-bold text-stone-800">
                Cantrips (คาถาระดับ 0)
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-stone-200/80 px-2 py-0.5 rounded text-stone-600 font-semibold">
                  {getSpellCountText(0)}
                </span>
                <span className={`text-stone-400 transition-transform ${activeLevel === 0 ? 'rotate-90' : ''}`}>▶</span>
              </div>
            </button>

            {activeLevel === 0 && (
              <div className="border-t border-[#e2cfb3] p-4 bg-stone-50/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Array.from({ length: 8 }).map((_, idx) => {
                    const val = sp.cantrips?.[idx]?.name || ''
                    return (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-xs text-stone-400 font-mono w-5 text-right">{idx + 1}.</span>
                        <input
                          value={val}
                          onChange={(e) => patchCantrip(idx, e.target.value)}
                          className="flex-1 rounded-md border border-gray-300 px-2.5 py-1.5 text-xs focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300 bg-white"
                          placeholder={`ชื่อคาถาระดับ 0 ที่ {idx + 1}`}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Levels 1 to 9 */}
          {Array.from({ length: 9 }).map((_, lIdx) => {
            const level = lIdx + 1
            const rowCount = rowCounts[level]
            const lvlData = sp.levels?.[level] || { slotsTotal: '', slotsRemaining: '', spells: [] }
            const isOpen = activeLevel === level

            return (
              <div key={level} className="overflow-hidden rounded-lg border border-[#e2cfb3] bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setActiveLevel(isOpen ? null : level)}
                  className="flex w-full items-center justify-between bg-stone-50 px-4 py-3 text-left hover:bg-stone-100/70 transition-colors cursor-pointer"
                >
                  <span className="font-cinzel text-xs font-bold text-stone-800">
                    Level {level} Spells (เวทมนตร์เลเวล {level})
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-stone-200/80 px-2 py-0.5 rounded text-stone-600 font-semibold">
                      {getSpellCountText(level)}
                    </span>
                    <span className={`text-stone-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}>▶</span>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-[#e2cfb3] p-4 bg-stone-50/10 space-y-4">
                    {/* Spell Slots Inputs */}
                    <div className="grid grid-cols-2 gap-4 max-w-xs bg-stone-50/60 p-3 rounded-lg border border-stone-150">
                      <div>
                        <label className="mb-0.5 block text-[10px] font-bold text-stone-500 uppercase">ช่องเวททั้งหมด (Total)</label>
                        <input
                          value={lvlData.slotsTotal || ''}
                          onChange={(e) => patchSpellSlots(level, { slotsTotal: e.target.value })}
                          className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-center text-xs focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300 bg-white"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="mb-0.5 block text-[10px] font-bold text-stone-500 uppercase">ช่องเวทคงเหลือ (Remaining)</label>
                        <input
                          value={lvlData.slotsRemaining || ''}
                          onChange={(e) => patchSpellSlots(level, { slotsRemaining: e.target.value })}
                          className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-center text-xs focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300 bg-white"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    {/* Spell List Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {Array.from({ length: rowCount }).map((_, idx) => {
                        const s = lvlData.spells?.[idx] || { name: '', prepared: false }
                        return (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-xs text-stone-400 font-mono w-5 text-right">{idx + 1}.</span>
                            <input
                              type="checkbox"
                              checked={!!s.prepared}
                              onChange={(e) => patchSpell(level, idx, { prepared: e.target.checked })}
                              className="h-3.5 w-3.5 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
                              title="เตรียมการ (Prepared)"
                            />
                            <input
                              value={s.name || ''}
                              onChange={(e) => patchSpell(level, idx, { name: e.target.value })}
                              className="flex-1 rounded-md border border-gray-300 px-2.5 py-1.5 text-xs focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-300 bg-white"
                              placeholder={`ชื่อเวทเลเวล ${level} ที่ ${idx + 1}`}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </FormSection>
    </div>
  )
}

// Full-page character sheet, opened in its own tab from a character's card
// in the grid — reuses CharacterFormModal (in standalone mode, so it fills
// the page instead of rendering as a modal overlay) rather than duplicating
// its view/edit UI.
export function CharacterDetailPage() {
  const { characterId } = useParams()
  const { state, dispatch } = useGachaStore()
  const { showToast } = useToast()
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [confirmSaveDefault, setConfirmSaveDefault] = useState(false)
  const [savingDefault, setSavingDefault] = useState(false)

  const character = useMemo(() => {
    const found = (state.characters ?? []).find((c) => c.id === characterId)
    return found ? normalizeCharacter(found) : null
  }, [state.characters, characterId])

  const { classes, subclassesByClass } = useMemo(
    () => getClassSubclassOptions(state.boxes),
    [state.boxes],
  )
  const speciesOptions = useMemo(() => getSpeciesOptions(state.boxes), [state.boxes])
  const backgroundOptions = useMemo(() => getBackgroundOptions(state.boxes), [state.boxes])
  const referenceLinks = useMemo(() => getReferenceLinks(state.boxes), [state.boxes])

  function handleSave(updated) {
    dispatch({ type: 'UPDATE_CHARACTER', payload: { id: updated.id, patch: updated } })
    showToast('บันทึกตัวละครแล้ว', 'success')
  }

  async function confirmDelete() {
    const images = deleteTarget.images ?? []
    await Promise.all(images.map((img) => deleteImage(characterImageKey(deleteTarget.id, img.id))))
    dispatch({ type: 'DELETE_CHARACTER', payload: { id: deleteTarget.id } })
    setDeleteTarget(null)
    showToast('ลบตัวละครแล้ว', 'success')
  }

  async function confirmSaveAsDefault() {
    setSavingDefault(true)
    try {
      await saveDefaultData(state)
      showToast('บันทึกลง Default Data สำเร็จ', 'success')
    } catch (err) {
      showToast(err.message || 'บันทึกลง Default Data ไม่สำเร็จ', 'error')
    } finally {
      setSavingDefault(false)
      setConfirmSaveDefault(false)
    }
  }

  // Standalone pages (this one included) skip the Navbar entirely, so the
  // "จัดการข้อมูล" menu's save-to-default-data action isn't reachable from
  // there — surface a compact equivalent in the character sheet header.
  const headerExtra = isLocalHost() && (
    <button
      type="button"
      onClick={() => setConfirmSaveDefault(true)}
      className="inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-100"
      title="เขียนทับไฟล์ข้อมูลตั้งต้นในโปรเจกต์ด้วยข้อมูลปัจจุบัน"
    >
      💾 บันทึกลง Default Data
    </button>
  )

  if (!character) {
    return (
      <div className="w-full p-4 md:p-8">
        <p className="text-sm text-stone-400">ไม่พบตัวละครนี้</p>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <CharacterFormModal
        key={character.id}
        initial={character}
        users={state.users ?? []}
        partyTags={state.partyTags ?? []}
        campaigns={state.campaigns ?? []}
        shops={state.shops ?? []}
        classes={classes}
        subclassesByClass={subclassesByClass}
        speciesOptions={speciesOptions}
        backgroundOptions={backgroundOptions}
        referenceLinks={referenceLinks}
        onCancel={() => {}}
        onSave={handleSave}
        onDelete={setDeleteTarget}
        showToast={showToast}
        standalone
        headerExtra={headerExtra}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        title="ลบตัวละคร"
        message={`ต้องการลบตัวละคร "${deleteTarget?.name}" หรือไม่?`}
        confirmLabel="ลบ"
        danger
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
      <ConfirmDialog
        open={confirmSaveDefault}
        title="บันทึกลง Default Data"
        message="จะเขียนทับไฟล์ข้อมูลตั้งต้น (src/data) ด้วยข้อมูลปัจจุบันทั้งหมด ได้แก่ ตู้สุ่ม ร้านค้า แคมเปญ ตัวละคร และรูปตัวละคร การกระทำนี้แก้ไขไฟล์ในโปรเจกต์โดยตรง ต้องการดำเนินการต่อหรือไม่?"
        confirmLabel={savingDefault ? 'กำลังบันทึก...' : 'ยืนยันบันทึก'}
        onCancel={() => setConfirmSaveDefault(false)}
        onConfirm={confirmSaveAsDefault}
      />
    </div>
  )
}


