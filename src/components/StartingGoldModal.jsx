import { useState } from 'react'
import SearchSelect from './SearchSelect'
import { createId } from '../utils/id'
import {
  BACKGROUND_NAMES,
  BACKGROUND_TIER_ORDER,
  BACKGROUND_TIERS,
  CLASS_NAMES,
  CLASS_TIER_ORDER,
  CLASS_TIERS,
  calculateStartingGold,
  getLevelMultiplier,
  highestClassTier,
  RANDOM_MULTIPLIER_TABLE,
  rollRandomMultiplier,
  suggestBackgroundTier,
  suggestClassTier,
} from '../data/startingGold'

const CLASS_OPTIONS = CLASS_NAMES.map((name) => ({ value: name, label: name }))
const BACKGROUND_OPTIONS = BACKGROUND_NAMES.map((name) => ({ value: name, label: name }))

function blankClassRow() {
  return { id: createId('sg-class'), name: '', tier: 'medium' }
}

export default function StartingGoldModal({ open, onClose }) {
  const [classRows, setClassRows] = useState([blankClassRow()])
  const [backgroundName, setBackgroundName] = useState('')
  const [backgroundTier, setBackgroundTier] = useState('ordinary')
  const [level, setLevel] = useState(1)
  const [rollFactor, setRollFactor] = useState(null)

  if (!open) return null

  function handleClose() {
    setClassRows([blankClassRow()])
    setBackgroundName('')
    setBackgroundTier('ordinary')
    setLevel(1)
    setRollFactor(null)
    onClose()
  }

  function updateClassRow(id, patch) {
    setClassRows((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)))
    setRollFactor(null)
  }

  function handleSelectClass(id, name) {
    updateClassRow(id, { name, tier: suggestClassTier(name) })
  }

  function addClassRow() {
    setClassRows((prev) => [...prev, blankClassRow()])
  }

  function removeClassRow(id) {
    setClassRows((prev) => (prev.length > 1 ? prev.filter((row) => row.id !== id) : prev))
    setRollFactor(null)
  }

  function handleSelectBackground(name) {
    setBackgroundName(name)
    setBackgroundTier(suggestBackgroundTier(name))
    setRollFactor(null)
  }

  const isMulticlass = classRows.filter((row) => row.name).length > 1
  const effectiveClassTier = highestClassTier(classRows.map((row) => row.tier))
  const multiplier = getLevelMultiplier(level)
  const base = calculateStartingGold({ classTier: effectiveClassTier, backgroundTier, level })

  const finalTotal = rollFactor == null ? null : Math.round(base.total * rollFactor)

  function handleRoll() {
    setRollFactor(rollRandomMultiplier())
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={handleClose}>
      <div
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[#e2cfb3] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e2cfb3] bg-gradient-to-r from-violet-700 to-violet-600 px-5 py-4">
          <h2 className="font-cinzel text-lg font-semibold text-white">💰 คำนวณเงินเริ่มต้น</h2>
          <button onClick={handleClose} className="text-violet-200 hover:text-white">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-stone-700">
                  คลาส {isMulticlass && <span className="text-xs font-normal text-violet-600">(Multiclass)</span>}
                </label>
                <button
                  type="button"
                  onClick={addClassRow}
                  className="text-xs font-medium text-violet-700 underline decoration-dotted hover:text-violet-900"
                >
                  + เพิ่มคลาส (multiclass)
                </button>
              </div>
              <div className="mt-1 space-y-2">
                {classRows.map((row) => (
                  <div key={row.id} className="flex items-center gap-1.5">
                    <SearchSelect
                      options={CLASS_OPTIONS}
                      value={row.name}
                      onChange={(name) => handleSelectClass(row.id, name)}
                      placeholder="พิมพ์ชื่อคลาสเพื่อค้นหา..."
                      clearLabel="เปลี่ยนคลาส"
                      className="flex-1"
                    />
                    <select
                      value={row.tier}
                      onChange={(e) => updateClassRow(row.id, { tier: e.target.value })}
                      className="w-32 shrink-0 rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                    >
                      {CLASS_TIER_ORDER.map((key) => (
                        <option key={key} value={key}>
                          {CLASS_TIERS[key].label} ({CLASS_TIERS[key].gold})
                        </option>
                      ))}
                    </select>
                    {classRows.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeClassRow(row.id)}
                        className="shrink-0 rounded-md border border-red-300 px-2 py-1.5 text-xs text-red-600 hover:bg-red-50"
                      >
                        ลบ
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-1 text-xs text-stone-400">
                กลุ่มคลาสจะเดาให้อัตโนมัติจากชื่อคลาส แก้ไขได้ถ้าไม่ตรงกับ homebrew ของคุณ
                {isMulticlass && ' • ตัวละคร multiclass ใช้กลุ่มคลาสที่สูงสุดจากทุกคลาสที่เลือก (ได้ proficiency รวมกัน)'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">Background</label>
              <div className="mt-1 flex items-center gap-1.5">
                <SearchSelect
                  options={BACKGROUND_OPTIONS}
                  value={backgroundName}
                  onChange={handleSelectBackground}
                  placeholder="พิมพ์ชื่อ background เพื่อค้นหา..."
                  clearLabel="เปลี่ยน background"
                  className="flex-1"
                />
                <select
                  value={backgroundTier}
                  onChange={(e) => {
                    setBackgroundTier(e.target.value)
                    setRollFactor(null)
                  }}
                  className="w-40 shrink-0 rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                >
                  {BACKGROUND_TIER_ORDER.map((key) => (
                    <option key={key} value={key}>
                      {BACKGROUND_TIERS[key].label} (+{BACKGROUND_TIERS[key].gold})
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-1 text-xs text-stone-400">ระดับฐานะจะเดาให้อัตโนมัติ แก้ไขได้เช่นกัน</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">เลเวล</label>
              <select
                value={level}
                onChange={(e) => {
                  setLevel(Number(e.target.value))
                  setRollFactor(null)
                }}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((lvl) => (
                  <option key={lvl} value={lvl}>
                    เลเวล {lvl} (×{getLevelMultiplier(lvl)})
                  </option>
                ))}
              </select>
            </div>

            <details className="rounded-md bg-[#f5ede0] p-2.5 text-xs text-stone-600">
              <summary className="cursor-pointer font-medium text-stone-700">
                ตารางโอกาสตัวคูณสุ่ม
              </summary>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                {RANDOM_MULTIPLIER_TABLE.map((row) => (
                  <span key={row.multiplier}>
                    ×{row.multiplier}: {row.weight}%
                  </span>
                ))}
              </div>
            </details>

            <div className="rounded-lg border border-[#e2cfb3] bg-[#f5ede0] p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">
                  เงินพื้นฐานคลาส ({CLASS_TIERS[effectiveClassTier].label})
                </span>
                <span className="font-medium text-stone-900">{base.classGold} gp</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-stone-500">
                  โบนัส Background ({BACKGROUND_TIERS[backgroundTier].label})
                </span>
                <span className="font-medium text-stone-900">+{base.bgGold} gp</span>
              </div>
              <div className="mt-1 flex justify-between border-t border-[#e2cfb3] pt-1">
                <span className="text-stone-500">รวมก่อนคูณเลเวล</span>
                <span className="font-medium text-stone-900">{base.classGold + base.bgGold} gp</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-stone-500">ตัวคูณเลเวล {level}</span>
                <span className="font-medium text-stone-900">×{multiplier}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-stone-500">ตัวคูณสุ่ม</span>
                <span className="font-medium text-stone-900">
                  {rollFactor != null ? `×${rollFactor}` : 'ยังไม่ทอย'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRoll}
              className="w-full rounded-md bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:bg-violet-800 active:scale-[0.98]"
            >
              🎲 {rollFactor != null ? 'ทอยใหม่' : 'ทอยตัวคูณสุ่ม'}
            </button>

            <div className="rounded-lg border border-violet-300 bg-violet-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-medium text-violet-700">เงินเริ่มต้น</span>
                <span className="text-2xl font-bold text-violet-800">
                  {finalTotal != null ? `${finalTotal.toLocaleString()} gp` : 'กด "ทอยตัวคูณสุ่ม" ก่อน'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
