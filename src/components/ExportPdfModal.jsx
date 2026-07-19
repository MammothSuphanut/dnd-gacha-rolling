import { useMemo, useState } from 'react'
import { EXPORT_SECTIONS, buildCharacterPdf, downloadPdfBytes } from '../utils/pdfExport'
import { characterImageKey, getImage } from '../utils/imageStore'

function defaultSelection() {
  return new Set(EXPORT_SECTIONS.filter((s) => s.defaultOn !== false).map((s) => s.key))
}

export default function ExportPdfModal({ character, onClose }) {
  const [selected, setSelected] = useState(defaultSelection)
  const [excludeVolatile, setExcludeVolatile] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const groups = useMemo(() => {
    const map = new Map()
    for (const section of EXPORT_SECTIONS) {
      if (!map.has(section.group)) map.set(section.group, [])
      map.get(section.group).push(section)
    }
    return Array.from(map.entries())
  }, [])

  function toggle(key) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  function toggleGroup(sections) {
    setSelected((prev) => {
      const allOn = sections.every((s) => prev.has(s.key))
      const next = new Set(prev)
      sections.forEach((s) => (allOn ? next.delete(s.key) : next.add(s.key)))
      return next
    })
  }

  function toggleAll() {
    setSelected((prev) =>
      prev.size === EXPORT_SECTIONS.length ? new Set() : new Set(EXPORT_SECTIONS.map((s) => s.key)),
    )
  }

  function resetToDefault() {
    setSelected(defaultSelection())
    setExcludeVolatile(true)
  }

  async function handleConfirm() {
    setBusy(true)
    setError('')
    try {
      let imageDataUrl = null
      if (selected.has('image')) {
        const images = character.images ?? []
        const active = images.find((img) => img.id === character.activeImageId) ?? images[0]
        if (active) {
          imageDataUrl = await getImage(characterImageKey(character.id, active.id))
        }
      }

      const bytes = await buildCharacterPdf(character, {
        sections: selected,
        imageDataUrl,
        excludeVolatile,
      })
      downloadPdfBytes(bytes, `${character.name || 'character'}.pdf`)
      onClose()
    } catch (e) {
      console.error(e)
      setError('เกิดข้อผิดพลาดระหว่างสร้างไฟล์ PDF')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="animate-fade-in flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-[#e2cfb3] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e2cfb3] px-5 py-4 bg-[#f5ede0]/30">
          <div>
            <h2 className="font-cinzel text-lg font-bold text-stone-900">Export เป็น PDF</h2>
            <p className="text-xs text-stone-400">เลือกข้อมูลที่จะเติมลงในชีทตัวละคร (5E Character Sheet)</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-stone-400 hover:bg-[#f5ede0] hover:text-stone-600"
            aria-label="ปิด"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={resetToDefault}
              className="rounded-md border border-[#e2cfb3] px-2.5 py-1 text-xs font-medium text-stone-600 hover:bg-[#f5ede0]/60"
            >
              ค่าเริ่มต้น
            </button>
            <label className="flex items-center gap-1.5 text-xs font-medium text-stone-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={excludeVolatile}
                onChange={(e) => setExcludeVolatile(e.target.checked)}
                className="h-3.5 w-3.5 rounded text-violet-700 focus:ring-violet-500 cursor-pointer"
              />
              เว้นค่าที่เปลี่ยนบ่อย (สำหรับเตรียมอัปเลเวล)
            </label>
          </div>
          {excludeVolatile && (
            <p className="mb-2 text-[11px] text-stone-400">
              จะไม่กรอก HP ปัจจุบัน/ชั่วคราว, Heroic Inspiration, เงิน, และช่องเวทที่ใช้ไป — เหมาะสำหรับพิมพ์ชีทไว้ล่วงหน้าก่อนอัปเลเวล
            </p>
          )}
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">หมวดข้อมูล ({selected.size}/{EXPORT_SECTIONS.length})</span>
            <button
              type="button"
              onClick={toggleAll}
              className="text-xs font-medium text-violet-700 hover:underline"
            >
              {selected.size === EXPORT_SECTIONS.length ? 'ยกเลิกทั้งหมด' : 'เลือกทั้งหมด'}
            </button>
          </div>
          <div className="space-y-3">
            {groups.map(([group, sections]) => {
              const allOn = sections.every((s) => selected.has(s.key))
              return (
                <div key={group} className="rounded-md border border-[#e2cfb3] overflow-hidden">
                  <div className="flex items-center justify-between bg-[#f5ede0]/60 px-3 py-1.5">
                    <span className="text-xs font-semibold text-stone-700">{group}</span>
                    <button
                      type="button"
                      onClick={() => toggleGroup(sections)}
                      className="text-[11px] font-medium text-violet-700 hover:underline"
                    >
                      {allOn ? 'ยกเลิกหมวดนี้' : 'เลือกหมวดนี้'}
                    </button>
                  </div>
                  <div className="divide-y divide-[#e2cfb3]/60 bg-white">
                    {sections.map((section) => (
                      <label
                        key={section.key}
                        className="flex items-start gap-2.5 px-3 py-1.5 text-sm hover:bg-[#f5ede0]/40 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          className="mt-0.5"
                          checked={selected.has(section.key)}
                          onChange={() => toggle(section.key)}
                        />
                        <span>
                          <span className="block font-medium text-stone-800">{section.label}</span>
                          {section.hint && <span className="block text-[11px] text-stone-400">{section.hint}</span>}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
        </div>

        <div className="flex justify-end gap-2 border-t border-[#e2cfb3] px-5 py-3 bg-[#f5ede0]/10">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-stone-600 hover:bg-[#f5ede0]"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={busy || selected.size === 0}
            className="rounded-lg bg-violet-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-800 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            {busy ? 'กำลังสร้าง...' : 'ยืนยัน Export'}
          </button>
        </div>
      </div>
    </div>
  )
}
