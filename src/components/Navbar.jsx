import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useGachaStore, isLocalHost } from '../store/GachaStore'
import { useToast } from '../store/ToastContext'
import { exportData, importImages, readJsonFile, saveDefaultData } from '../utils/exportImport'
import { validateGachaData } from '../utils/validateData'
import defaultData from '../data/defaultData'
import Modal from './Modal'

const links = [
  {
    to: '/roll',
    label: 'สุ่ม',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
        <rect x="2" y="2" width="20" height="20" rx="4" />
        <circle cx="8" cy="8" r="1.2" fill="currentColor" />
        <circle cx="16" cy="8" r="1.2" fill="currentColor" />
        <circle cx="8" cy="16" r="1.2" fill="currentColor" />
        <circle cx="16" cy="16" r="1.2" fill="currentColor" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    to: '/options',
    label: 'ตัวเลือก',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.4-6.4-2.1 2.1M8.7 15.3l-2.1 2.1m10.8 0-2.1-2.1M8.7 8.7 6.6 6.6" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    to: '/shop',
    label: 'ร้านค้า',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 5m0 0H18m-13.3 0a1.7 1.7 0 1 0 3.4 0 1.7 1.7 0 0 0-3.4 0zm13.3 0a1.7 1.7 0 1 0 3.4 0 1.7 1.7 0 0 0-3.4 0z" />
      </svg>
    ),
  },
  {
    to: '/campaigns',
    label: 'แคมเปญ',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    to: '/characters',
    label: 'ตัวละคร',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
        <circle cx="12" cy="8" r="4" />
        <path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
]

const icons = {
  data: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <ellipse cx="12" cy="5" rx="7" ry="2.5" />
      <path d="M5 5v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5" />
      <path d="M5 11v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0 4 4m-4-4-4 4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  ),
  download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0 4-4m-4 4-4-4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  ),
  save: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h11l3 3v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 4v5h7V4M8 21v-7h8v7" />
    </svg>
  ),
  reset: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9a7.5 7.5 0 1 1 1.8 7.8" />
    </svg>
  ),
  chevron: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 text-[#a89070] transition-transform group-hover:translate-x-0.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6" />
    </svg>
  ),
}

const TONE_CLASSES = {
  gray:   'bg-[#f5ede0] text-stone-600 group-hover:bg-[#e8d9c0]',
  purple: 'bg-violet-100 text-violet-700 group-hover:bg-violet-200',
  amber:  'bg-amber-100 text-amber-700 group-hover:bg-amber-200',
  red:    'bg-red-100 text-red-700 group-hover:bg-red-200',
}

function DataMenuRow({ icon, tone, title, subtitle, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-[#f5ede0]"
    >
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${TONE_CLASSES[tone]}`}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-stone-900">{title}</span>
        <span className="block truncate text-xs text-stone-500">{subtitle}</span>
      </span>
      {icons.chevron}
    </button>
  )
}

// D20 logo SVG
function D20Icon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-7 w-7" aria-hidden>
      <polygon points="20,3 37,13 37,27 20,37 3,27 3,13" fill="#6d28d9" opacity="0.15" stroke="#6d28d9" strokeWidth="1.5"/>
      <polygon points="20,3 37,13 20,18" fill="#6d28d9" opacity="0.25"/>
      <polygon points="20,3 3,13 20,18" fill="#6d28d9" opacity="0.35"/>
      <polygon points="20,18 37,13 37,27 20,37" fill="#6d28d9" opacity="0.2"/>
      <polygon points="20,18 3,13 3,27 20,37" fill="#6d28d9" opacity="0.3"/>
      <text x="20" y="28" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9" fontFamily="Cinzel, serif">20</text>
    </svg>
  )
}

export default function Navbar() {
  const { state, dispatch } = useGachaStore()
  const { showToast } = useToast()
  const fileInputRef = useRef(null)
  const [dataMenuOpen, setDataMenuOpen] = useState(false)
  const [pendingImport, setPendingImport] = useState(null)
  const [confirmSaveDefault, setConfirmSaveDefault] = useState(false)
  const [savingDefault, setSavingDefault] = useState(false)
  const [confirmLoadDefault, setConfirmLoadDefault] = useState(false)

  async function handleExport() {
    setDataMenuOpen(false)
    await exportData(state)
    showToast('Export ข้อมูลสำเร็จ (รวมรูปตัวละคร)', 'success')
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

  function handleImportClick() {
    setDataMenuOpen(false)
    fileInputRef.current?.click()
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const data = await readJsonFile(file)
      const { valid, errors } = validateGachaData(data)
      if (!valid) {
        showToast(`ไฟล์ไม่ถูกต้อง: ${errors[0]}`, 'error')
        return
      }
      setPendingImport(data)
    } catch (err) {
      showToast(err.message || 'ไม่สามารถอ่านไฟล์ได้', 'error')
    }
  }

  async function confirmReplace() {
    dispatch({ type: 'REPLACE_ALL', payload: pendingImport })
    await importImages(pendingImport.images)
    setPendingImport(null)
    showToast('Import สำเร็จ (แทนที่ข้อมูลเดิม)', 'success')
  }

  async function confirmMerge() {
    dispatch({ type: 'MERGE_ALL', payload: pendingImport })
    await importImages(pendingImport.images)
    setPendingImport(null)
    showToast('Import สำเร็จ (รวมกับข้อมูลเดิม)', 'success')
  }

  async function confirmLoadDefaultData() {
    dispatch({ type: 'REPLACE_ALL', payload: defaultData })
    await importImages(defaultData.images)
    setConfirmLoadDefault(false)
    showToast('โหลดข้อมูลตั้งต้นสำเร็จ (แทนที่ข้อมูลปัจจุบัน)', 'success')
  }

  return (
    <>
      <nav className="sticky top-0 z-10 border-b border-[#e2cfb3] bg-[#fdf8f0]/95 shadow-sm backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3 md:px-6">

          {/* Logo */}
          <NavLink to="/roll" className="flex items-center gap-2.5 select-none">
            <D20Icon />
            <span className="font-cinzel text-lg font-bold tracking-wide text-violet-700 leading-none">
              Astral Nexus: Realm of Fortunes
            </span>
          </NavLink>

          {/* Nav links */}
          <div className="flex flex-wrap items-center gap-0.5">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-violet-100 text-violet-700'
                      : 'text-stone-600 hover:bg-[#f5ede0] hover:text-stone-900'
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Data button */}
          {isLocalHost() && (
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => setDataMenuOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-[#e2cfb3] bg-white px-3 py-2 text-sm font-medium text-stone-700 shadow-sm transition-colors hover:bg-[#f5ede0]"
              >
                {icons.data}
                จัดการข้อมูล
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Data Menu Modal */}
      <Modal open={dataMenuOpen} onClose={() => setDataMenuOpen(false)} title="จัดการข้อมูล">
        <div className="flex flex-col gap-1">
          <DataMenuRow
            icon={icons.upload}
            tone="gray"
            title="Import ข้อมูล"
            subtitle="นำเข้าไฟล์ JSON ที่เคย Export ไว้"
            onClick={handleImportClick}
          />
          <DataMenuRow
            icon={icons.download}
            tone="purple"
            title="Export ข้อมูล"
            subtitle="บันทึกข้อมูลปัจจุบันเป็นไฟล์ JSON"
            onClick={handleExport}
          />
          {isLocalHost() && (
            <DataMenuRow
              icon={icons.save}
              tone="amber"
              title="บันทึกลง Default Data"
              subtitle="เขียนทับไฟล์ข้อมูลตั้งต้นในโปรเจกต์"
              onClick={() => {
                setDataMenuOpen(false)
                setConfirmSaveDefault(true)
              }}
            />
          )}
          <DataMenuRow
            icon={icons.reset}
            tone="red"
            title="โหลด Default Data"
            subtitle="แทนที่ข้อมูลปัจจุบันด้วยข้อมูลตั้งต้น"
            onClick={() => {
              setDataMenuOpen(false)
              setConfirmLoadDefault(true)
            }}
          />
        </div>
      </Modal>

      {/* Import confirm */}
      <Modal
        open={!!pendingImport}
        onClose={() => setPendingImport(null)}
        title="นำเข้าข้อมูล"
      >
        <p className="mb-4 text-sm text-stone-600">
          พบข้อมูลตู้สุ่ม {pendingImport?.boxes?.length ?? 0} ตู้ และร้านค้า{' '}
          {pendingImport?.shops?.length ?? 0} ร้านในไฟล์
          ต้องการแทนที่ข้อมูลเดิมทั้งหมด หรือรวมกับข้อมูลเดิม?
        </p>
        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={() => setPendingImport(null)}
            className="rounded-lg px-3 py-2 text-sm text-stone-600 hover:bg-[#f5ede0]"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={confirmMerge}
            className="rounded-lg border border-[#e2cfb3] bg-[#f5ede0] px-3 py-2 text-sm font-medium text-stone-800 hover:bg-[#e8d9c0]"
          >
            รวมกับข้อมูลเดิม
          </button>
          <button
            type="button"
            onClick={confirmReplace}
            className="rounded-lg bg-violet-700 px-3 py-2 text-sm font-medium text-white hover:bg-violet-800"
          >
            แทนที่ข้อมูลเดิม
          </button>
        </div>
      </Modal>

      {/* Save default confirm */}
      <Modal
        open={confirmSaveDefault}
        onClose={() => setConfirmSaveDefault(false)}
        title="บันทึกลง Default Data"
      >
        <p className="mb-4 text-sm text-stone-600">
          จะเขียนทับไฟล์ข้อมูลตั้งต้น (src/data) ด้วยข้อมูลปัจจุบันทั้งหมด ได้แก่ ตู้สุ่ม
          ร้านค้า แคมเปญ ตัวละคร และรูปตัวละคร การกระทำนี้แก้ไขไฟล์ในโปรเจกต์โดยตรง
          ต้องการดำเนินการต่อหรือไม่?
        </p>
        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={() => setConfirmSaveDefault(false)}
            className="rounded-lg px-3 py-2 text-sm text-stone-600 hover:bg-[#f5ede0]"
            disabled={savingDefault}
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={confirmSaveAsDefault}
            className="rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-60"
            disabled={savingDefault}
          >
            {savingDefault ? 'กำลังบันทึก...' : 'ยืนยันบันทึก'}
          </button>
        </div>
      </Modal>

      {/* Load default confirm */}
      <Modal
        open={confirmLoadDefault}
        onClose={() => setConfirmLoadDefault(false)}
        title="โหลด Default Data"
      >
        <p className="mb-4 text-sm text-stone-600">
          จะดึงข้อมูลตั้งต้น (src/data) มาแทนที่ข้อมูลปัจจุบันทั้งหมด ได้แก่ ตู้สุ่ม ร้านค้า
          แคมเปญ ผู้ใช้ Party และตัวละคร ข้อมูลปัจจุบันที่ยังไม่ได้ Export จะหายไป
          ต้องการดำเนินการต่อหรือไม่?
        </p>
        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={() => setConfirmLoadDefault(false)}
            className="rounded-lg px-3 py-2 text-sm text-stone-600 hover:bg-[#f5ede0]"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={confirmLoadDefaultData}
            className="rounded-lg bg-red-700 px-3 py-2 text-sm font-medium text-white hover:bg-red-800"
          >
            ยืนยันโหลด
          </button>
        </div>
      </Modal>
    </>
  )
}
