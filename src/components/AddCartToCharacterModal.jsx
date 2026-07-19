import { useState } from 'react'
import SearchSelect from './SearchSelect'
import { createId } from '../utils/id'

function blankSplitRow() {
  return { id: createId('split'), characterId: '', qty: 1 }
}

export default function AddCartToCharacterModal({ items, characters, onClose, onConfirm }) {
  const [mode, setMode] = useState('single')
  const [singleCharacterId, setSingleCharacterId] = useState('')
  const [splits, setSplits] = useState(() =>
    Object.fromEntries(items.map((item) => [item.cartId, [{ ...blankSplitRow(), qty: item.qty }]])),
  )

  const characterOptions = characters.map((c) => ({ value: c.id, label: c.name || '(ไม่มีชื่อ)' }))

  function updateSplitRow(cartId, rowId, fields) {
    setSplits((prev) => ({
      ...prev,
      [cartId]: prev[cartId].map((row) => (row.id === rowId ? { ...row, ...fields } : row)),
    }))
  }

  function addSplitRow(cartId) {
    setSplits((prev) => ({ ...prev, [cartId]: [...prev[cartId], blankSplitRow()] }))
  }

  function removeSplitRow(cartId, rowId) {
    setSplits((prev) => ({ ...prev, [cartId]: prev[cartId].filter((row) => row.id !== rowId) }))
  }

  function assignedQty(cartId) {
    return (splits[cartId] ?? []).reduce((sum, row) => sum + (Number(row.qty) || 0), 0)
  }

  const canConfirm =
    mode === 'single'
      ? !!singleCharacterId
      : items.some((item) => (splits[item.cartId] ?? []).some((row) => row.characterId && Number(row.qty) > 0))

  function handleConfirm() {
    const grouped = new Map()
    function addToGroup(characterId, name, qty) {
      if (!characterId || qty <= 0) return
      const label = qty > 1 ? `${name} x${qty}` : name
      if (!grouped.has(characterId)) grouped.set(characterId, [])
      grouped.get(characterId).push(label)
    }

    if (mode === 'single') {
      for (const item of items) {
        addToGroup(singleCharacterId, item.itemName, item.qty)
      }
    } else {
      for (const item of items) {
        for (const row of splits[item.cartId] ?? []) {
          addToGroup(row.characterId, item.itemName, Math.floor(Number(row.qty) || 0))
        }
      }
    }

    onConfirm(grouped)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-[#e2cfb3] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-[#e2cfb3] bg-[#f5ede0]/30 px-5 py-4">
          <h2 className="font-cinzel text-lg font-bold text-stone-900">เพิ่มของที่ซื้อเข้าตัวละคร</h2>
          <p className="text-xs text-stone-400">เลือกได้ว่าจะเพิ่มให้คนเดียวทั้งหมด หรือแยกชิ้น/จำนวนให้แต่ละคน</p>
        </div>

        <div className="flex gap-1 border-b border-[#e2cfb3] px-5 pt-2">
          {[
            { key: 'single', label: 'เพิ่มให้คนเดียวทั้งหมด' },
            { key: 'split', label: 'แยกชิ้น/จำนวนให้แต่ละคน' },
          ].map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setMode(t.key)}
              className={`border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                mode === t.key
                  ? 'border-violet-600 text-violet-700'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {characters.length === 0 ? (
            <p className="text-sm text-stone-400">ยังไม่มีตัวละคร ไปสร้างตัวละครก่อนที่หน้า &quot;ตัวละคร&quot;</p>
          ) : mode === 'single' ? (
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-stone-500">ตัวละคร</label>
                <SearchSelect
                  options={characterOptions}
                  value={singleCharacterId}
                  onChange={setSingleCharacterId}
                  placeholder="เลือกตัวละคร..."
                  clearLabel="เปลี่ยน"
                />
              </div>
              <div className="rounded-lg border border-[#e2cfb3] bg-[#fdf8f0] p-3">
                <div className="mb-1.5 text-xs font-semibold text-stone-500">รายการที่จะเพิ่ม</div>
                <ul className="space-y-1 text-sm text-stone-700">
                  {items.map((item) => (
                    <li key={item.cartId}>
                      {item.itemName}
                      {item.qty > 1 ? ` x${item.qty}` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const assigned = assignedQty(item.cartId)
                return (
                  <div key={item.cartId} className="rounded-lg border border-[#e2cfb3] p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-stone-800">{item.itemName}</span>
                      <span
                        className={`text-xs ${
                          assigned === item.qty ? 'text-stone-400' : 'text-amber-600 font-medium'
                        }`}
                      >
                        แบ่งแล้ว {assigned}/{item.qty}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {(splits[item.cartId] ?? []).map((row) => (
                        <div key={row.id} className="flex items-center gap-1.5">
                          <div className="flex-1">
                            <SearchSelect
                              options={characterOptions}
                              value={row.characterId}
                              onChange={(v) => updateSplitRow(item.cartId, row.id, { characterId: v })}
                              placeholder="เลือกตัวละคร..."
                              clearLabel="เปลี่ยน"
                            />
                          </div>
                          <input
                            type="number"
                            min="0"
                            value={row.qty}
                            onChange={(e) => updateSplitRow(item.cartId, row.id, { qty: e.target.value })}
                            className="w-16 rounded-md border border-gray-300 px-2 py-1.5 text-center text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeSplitRow(item.cartId, row.id)}
                            className="shrink-0 rounded-md px-2 py-1.5 text-xs text-red-500 hover:bg-red-50"
                            aria-label="ลบแถว"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => addSplitRow(item.cartId)}
                      className="mt-2 rounded-md border border-dashed border-violet-300 px-2.5 py-1 text-xs font-medium text-violet-700 hover:bg-violet-50"
                    >
                      + แบ่งให้อีกคน
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 border-t border-[#e2cfb3] bg-[#f5ede0]/10 px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-stone-600 hover:bg-[#f5ede0]"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            disabled={!canConfirm}
            onClick={handleConfirm}
            className="rounded-lg bg-violet-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-800 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            ยืนยันเพิ่มเข้าตัวละคร
          </button>
        </div>
      </div>
    </div>
  )
}
