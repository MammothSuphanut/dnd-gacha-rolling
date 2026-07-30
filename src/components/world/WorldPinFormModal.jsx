import { useEffect, useState } from 'react'
import Modal from '../Modal'

// Shared form for both creating a new city pin and renaming/re-categorizing
// an existing one. Only asks for a title + which continent it belongs to —
// the markdown content behind the pin is meant to be filled in later
// (by hand or by an AI pass), not written here.
//
// variant="party" reuses the same form for party-location markers, which
// have no card/category of their own — just a label — so the continent
// select is hidden and the copy swaps to match.
export default function WorldPinFormModal({
  open,
  mode,
  variant = 'location',
  initialTitle,
  initialCategoryId,
  categories,
  onCancel,
  onSubmit,
  onDelete,
}) {
  const isParty = variant === 'party'
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')

  useEffect(() => {
    if (!open) return
    setTitle(initialTitle ?? '')
    setCategoryId(initialCategoryId ?? categories?.[0]?.id ?? '')
  }, [open, initialTitle, initialCategoryId, categories])

  const modalTitle = mode === 'create'
    ? isParty ? 'เพิ่มหมุดปาตี้ใหม่' : 'เพิ่มหมุดใหม่'
    : isParty ? 'แก้ไขหมุดปาตี้' : 'แก้ไขหมุด'

  return (
    <Modal open={open} onClose={onCancel} title={modalTitle}>
      <div className="flex flex-col gap-3">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-stone-700">{isParty ? 'ชื่อปาตี้' : 'ชื่อสถานที่'}</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-[#e2cfb3] px-3 py-2 text-sm"
            placeholder={isParty ? 'เช่น ปาตี้หลัก' : 'เช่น Kraghammer'}
            autoFocus
          />
        </label>
        {!isParty && (
          <label className="text-sm">
            <span className="mb-1 block font-medium text-stone-700">อยู่ในทวีป</span>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-lg border border-[#e2cfb3] bg-white px-3 py-2 text-sm"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
        )}
        {!isParty && (
          <p className="text-xs text-stone-400">
            ใส่แค่ชื่อไว้ก่อนได้ — เนื้อหารายละเอียดเติมทีหลังได้ (เช่นให้ AI ค้นข้อมูลมาเติม)
          </p>
        )}
        <div className="mt-2 flex items-center justify-between gap-2">
          {mode === 'edit' && onDelete ? (
            <button
              type="button"
              onClick={onDelete}
              className="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              ลบหมุดนี้
            </button>
          ) : (
            <span />
          )}
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg px-3 py-2 text-sm text-stone-600 hover:bg-[#f5ede0]"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              disabled={!title.trim()}
              onClick={() => onSubmit({ title: title.trim(), categoryId })}
              className="rounded-lg bg-violet-700 px-3 py-2 text-sm font-medium text-white hover:bg-violet-800 disabled:opacity-50"
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
