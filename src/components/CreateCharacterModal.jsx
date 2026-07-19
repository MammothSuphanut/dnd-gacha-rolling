import { useState } from 'react'
import SearchSelect from './SearchSelect'

export default function CreateCharacterModal({ characters, pickCount, onCancel, onConfirm }) {
  const [mode, setMode] = useState('existing')
  const [characterId, setCharacterId] = useState('')

  const canConfirm = mode === 'new' || (mode === 'existing' && !!characterId)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onCancel}>
      <div
        className="animate-fade-in w-full max-w-md rounded-xl border border-[#e2cfb3] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-[#e2cfb3] px-5 py-4 bg-[#f5ede0]/30">
          <h2 className="font-cinzel text-lg font-bold text-stone-900">เพิ่มเข้าตัวละคร</h2>
          <p className="text-xs text-stone-400">เลือกแล้ว {pickCount} รายการ จากหน้าสุ่ม</p>
        </div>

        <div className="space-y-3 px-5 py-4">
          <label
            className={`flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2.5 text-sm ${
              mode === 'existing' ? 'border-violet-400 bg-violet-50' : 'border-[#e2cfb3] bg-white'
            }`}
          >
            <input
              type="radio"
              name="create-character-mode"
              checked={mode === 'existing'}
              onChange={() => setMode('existing')}
              className="mt-0.5"
            />
            <span>
              <span className="block font-medium text-stone-800">เพิ่มเข้าตัวละครที่มีอยู่</span>
              <span className="block text-xs text-stone-400">
                แทนที่ข้อมูลของตัวละครที่เลือกด้วยรายการที่ติ๊กไว้
              </span>
            </span>
          </label>

          {mode === 'existing' && (
            <div className="pl-7">
              {characters.length === 0 ? (
                <p className="text-xs text-stone-400">ยังไม่มีตัวละคร</p>
              ) : (
                <SearchSelect
                  options={characters.map((c) => ({ value: c.id, label: c.name || '(ไม่มีชื่อ)' }))}
                  value={characterId}
                  onChange={setCharacterId}
                  placeholder="เลือกตัวละคร..."
                  clearLabel="เปลี่ยน"
                />
              )}
            </div>
          )}

          <label
            className={`flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2.5 text-sm ${
              mode === 'new' ? 'border-violet-400 bg-violet-50' : 'border-[#e2cfb3] bg-white'
            }`}
          >
            <input
              type="radio"
              name="create-character-mode"
              checked={mode === 'new'}
              onChange={() => setMode('new')}
              className="mt-0.5"
            />
            <span>
              <span className="block font-medium text-stone-800">สร้างตัวละครใหม่</span>
              <span className="block text-xs text-stone-400">
                เปิดหน้าสร้างตัวละครพร้อมข้อมูลที่ติ๊กไว้ กรอกส่วนที่เหลือต่อได้
              </span>
            </span>
          </label>
        </div>

        <div className="flex justify-end gap-2 border-t border-[#e2cfb3] px-5 py-3 bg-[#f5ede0]/10">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm text-stone-600 hover:bg-[#f5ede0]"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            disabled={!canConfirm}
            onClick={() => onConfirm({ mode, characterId })}
            className="rounded-lg bg-violet-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-800 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  )
}
