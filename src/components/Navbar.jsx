import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useGachaStore } from '../store/GachaStore'
import { useToast } from '../store/ToastContext'
import { exportData, readJsonFile } from '../utils/exportImport'
import { validateGachaData } from '../utils/validateData'
import Modal from './Modal'

const links = [
  { to: '/roll', label: 'สุ่ม' },
  { to: '/boxes', label: 'จัดการตู้สุ่ม' },
]

export default function Navbar() {
  const { state, dispatch } = useGachaStore()
  const { showToast } = useToast()
  const fileInputRef = useRef(null)
  const [pendingImport, setPendingImport] = useState(null)

  function handleExport() {
    exportData(state)
    showToast('Export ข้อมูลสำเร็จ', 'success')
  }

  function handleImportClick() {
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

  function confirmReplace() {
    dispatch({ type: 'REPLACE_ALL', payload: pendingImport })
    setPendingImport(null)
    showToast('Import สำเร็จ (แทนที่ข้อมูลเดิม)', 'success')
  }

  function confirmMerge() {
    dispatch({ type: 'MERGE_ALL', payload: pendingImport })
    setPendingImport(null)
    showToast('Import สำเร็จ (รวมกับข้อมูลเดิม)', 'success')
  }

  return (
    <>
      <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2 px-4 py-3 md:px-8">
          <span className="text-lg font-bold text-purple-600">GachaRolling</span>
          <div className="flex flex-wrap items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
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
              onClick={handleImportClick}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Import ข้อมูล
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700"
            >
              Export ข้อมูล
            </button>
          </div>
        </div>
      </nav>

      <Modal
        open={!!pendingImport}
        onClose={() => setPendingImport(null)}
        title="นำเข้าข้อมูล"
      >
        <p className="mb-4 text-sm text-gray-600">
          พบข้อมูลตู้สุ่ม {pendingImport?.boxes?.length ?? 0} ตู้ และประวัติ{' '}
          {pendingImport?.history?.length ?? 0} รายการในไฟล์
          ต้องการแทนที่ข้อมูลเดิมทั้งหมด หรือรวมกับข้อมูลเดิม?
        </p>
        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={() => setPendingImport(null)}
            className="rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={confirmMerge}
            className="rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
          >
            รวมกับข้อมูลเดิม
          </button>
          <button
            type="button"
            onClick={confirmReplace}
            className="rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700"
          >
            แทนที่ข้อมูลเดิม
          </button>
        </div>
      </Modal>
    </>
  )
}
