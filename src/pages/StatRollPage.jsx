import { useState } from 'react'
import { createId } from '../utils/id'

const STATS = [
  { key: 'str', label: 'STR' },
  { key: 'dex', label: 'DEX' },
  { key: 'con', label: 'CON' },
  { key: 'int', label: 'INT' },
  { key: 'wis', label: 'WIS' },
  { key: 'cha', label: 'CHA' },
]

function rollDie() {
  return Math.floor(Math.random() * 6) + 1
}

function roll4d6DropLowest() {
  const rolls = [rollDie(), rollDie(), rollDie(), rollDie()]
  let dropIndex = 0
  for (let i = 1; i < rolls.length; i++) {
    if (rolls[i] < rolls[dropIndex]) dropIndex = i
  }
  const total = rolls.reduce((sum, v, i) => (i === dropIndex ? sum : sum + v), 0)
  return { id: createId('stat-roll'), rolls, dropIndex, total }
}

function abilityModifier(score) {
  const mod = Math.floor((score - 10) / 2)
  return mod >= 0 ? `+${mod}` : `${mod}`
}

const STAT_CAP = 20

export default function StatRollPage() {
  const [results, setResults] = useState([])
  const [assignments, setAssignments] = useState({})
  const [bonuses, setBonuses] = useState({})

  function handleRoll() {
    const next = Array.from({ length: 6 }, () => roll4d6DropLowest())
    setResults(next)
    setAssignments({})
    setBonuses({})
  }

  function assignStat(statKey, resultId) {
    setAssignments((prev) => {
      const next = { ...prev }
      if (!resultId) {
        delete next[statKey]
        return next
      }
      for (const key of Object.keys(next)) {
        if (next[key] === resultId) delete next[key]
      }
      next[statKey] = resultId
      return next
    })
  }

  function toggleBonus(statKey, value, disabled) {
    if (disabled) return
    setBonuses((prev) => {
      const next = { ...prev }
      if (next[statKey] === value) {
        delete next[statKey]
        return next
      }
      next[statKey] = value
      return next
    })
  }

  const assignedResultIds = new Set(Object.values(assignments))
  const resultById = new Map(results.map((r) => [r.id, r]))
  const resultsSum = results.reduce((sum, r) => sum + r.total, 0)

  function finalScore(statKey) {
    const resultId = assignments[statKey]
    const base = resultId ? (resultById.get(resultId)?.total ?? 0) : 0
    const bonus = bonuses[statKey] ?? 0
    return Math.min(STAT_CAP, base + bonus)
  }

  const assignedSum = STATS.reduce(
    (sum, stat) => sum + (assignments[stat.key] ? finalScore(stat.key) : 0),
    0,
  )

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">สุ่มค่าพลัง (4d6 ตัดต่ำสุด)</h1>

      <button
        onClick={handleRoll}
        className="w-full rounded-lg bg-purple-600 py-3 text-lg font-bold text-white transition hover:bg-purple-700 md:w-auto md:px-8"
      >
        {results.length === 0 ? 'สุ่มเลย!' : 'สุ่มใหม่'}
      </button>

      {results.length > 0 && (
        <>
          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-500">ผลการสุ่ม (6 ครั้ง)</h2>
              <span className="text-sm font-medium text-gray-600">
                รวมทั้งหมด: <span className="font-bold text-gray-900">{resultsSum}</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {results.map((r, idx) => {
                const used = assignedResultIds.has(r.id)
                return (
                  <div
                    key={r.id}
                    className={`rounded-lg border p-3 text-center ${
                      used ? 'border-purple-300 bg-purple-50' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="text-xs text-gray-400">ครั้งที่ {idx + 1}</div>
                    <div className="mt-1 flex justify-center gap-1">
                      {r.rolls.map((v, i) => (
                        <span
                          key={i}
                          className={`flex h-6 w-6 items-center justify-center rounded text-xs font-medium ${
                            i === r.dropIndex
                              ? 'bg-gray-100 text-gray-400 line-through'
                              : 'bg-gray-800 text-white'
                          }`}
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 text-xl font-bold text-gray-900">{r.total}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-500">ลงค่าพลัง</h2>
              <span className="text-sm font-medium text-gray-600">
                รวมที่ลงแล้ว ({assignedResultIds.size}/6):{' '}
                <span className="font-bold text-gray-900">{assignedSum}</span>
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {STATS.map((stat) => {
                const assignedId = assignments[stat.key]
                const assignedResult = assignedId ? resultById.get(assignedId) : null
                const base = assignedResult?.total ?? 0
                const currentBonus = bonuses[stat.key]
                const score = finalScore(stat.key)

                const othersHas2 = Object.entries(bonuses).some(
                  ([k, v]) => k !== stat.key && v === 2,
                )
                const othersOnesCount = Object.entries(bonuses).filter(
                  ([k, v]) => k !== stat.key && v === 1,
                ).length
                const canPick2 = !othersHas2 && othersOnesCount <= 1
                const canPick1 = othersHas2 ? othersOnesCount < 1 : othersOnesCount < 3

                const disabled2 =
                  currentBonus !== 2 && (!canPick2 || base + 2 > STAT_CAP)
                const disabled1 =
                  currentBonus !== 1 && (!canPick1 || base + 1 > STAT_CAP)

                return (
                  <div
                    key={stat.key}
                    className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">{stat.label}</span>
                      <span className="text-sm text-gray-500">
                        {score}
                        {currentBonus ? (
                          <span className="text-purple-600"> (+{currentBonus})</span>
                        ) : null}{' '}
                        {abilityModifier(score)}
                      </span>
                    </div>

                    <select
                      value={assignedId ?? ''}
                      onChange={(e) => assignStat(stat.key, e.target.value || null)}
                      className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                    >
                      <option value="">-</option>
                      {results.map((r, idx) => (
                        <option
                          key={r.id}
                          value={r.id}
                          disabled={assignedResultIds.has(r.id) && assignedId !== r.id}
                        >
                          ครั้งที่ {idx + 1} ({r.total})
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <label
                        className={`flex items-center gap-1 ${
                          disabled2 ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={currentBonus === 2}
                          disabled={disabled2}
                          onChange={() => toggleBonus(stat.key, 2, disabled2)}
                        />
                        +2
                      </label>
                      <label
                        className={`flex items-center gap-1 ${
                          disabled1 ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={currentBonus === 1}
                          disabled={disabled1}
                          onChange={() => toggleBonus(stat.key, 1, disabled1)}
                        />
                        +1
                      </label>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
