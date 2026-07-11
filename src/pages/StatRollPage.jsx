import { createId } from '../utils/id'

const STATS = [
  { key: 'str', label: 'STR' },
  { key: 'dex', label: 'DEX' },
  { key: 'con', label: 'CON' },
  { key: 'int', label: 'INT' },
  { key: 'wis', label: 'WIS' },
  { key: 'cha', label: 'CHA' },
]

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1
}

function rollDiceDropLowest(diceCount, diceSides, dropCount) {
  const rolls = Array.from({ length: diceCount }, () => rollDie(diceSides))
  const drops = Math.min(Math.max(dropCount, 0), diceCount - 1)
  const order = rolls.map((_, i) => i).sort((a, b) => rolls[a] - rolls[b])
  const dropIndices = new Set(order.slice(0, drops))
  const total = rolls.reduce((sum, v, i) => (dropIndices.has(i) ? sum : sum + v), 0)
  return { id: createId('stat-roll'), rolls, dropIndices, total }
}

function abilityModifier(score) {
  const mod = Math.floor((score - 10) / 2)
  return mod >= 0 ? `+${mod}` : `${mod}`
}

const STAT_CAP = 20

const DEFAULT_MIN_TOTAL = 75
const DEFAULT_DICE_COUNT = 4
const DEFAULT_DICE_SIDES = 6
const DEFAULT_DROP_COUNT = 1

export default function StatRollPage({ statRollState, setStatRollState }) {
  const {
    results,
    assignments,
    bonuses,
    minTotal = DEFAULT_MIN_TOTAL,
    maxTotal = '',
    diceCount = DEFAULT_DICE_COUNT,
    diceSides = DEFAULT_DICE_SIDES,
    dropCount = DEFAULT_DROP_COUNT,
  } = statRollState

  function setMinTotal(value) {
    setStatRollState((prev) => ({ ...prev, minTotal: value }))
  }

  function setMaxTotal(value) {
    setStatRollState((prev) => ({ ...prev, maxTotal: value }))
  }

  function setDiceCount(value) {
    setStatRollState((prev) => ({ ...prev, diceCount: value }))
  }

  function setDiceSides(value) {
    setStatRollState((prev) => ({ ...prev, diceSides: value }))
  }

  function setDropCount(value) {
    setStatRollState((prev) => ({ ...prev, dropCount: value }))
  }

  function setResults(updater) {
    setStatRollState((prev) => ({
      ...prev,
      results: typeof updater === 'function' ? updater(prev.results) : updater,
    }))
  }

  function setAssignments(updater) {
    setStatRollState((prev) => ({
      ...prev,
      assignments: typeof updater === 'function' ? updater(prev.assignments) : updater,
    }))
  }

  function setBonuses(updater) {
    setStatRollState((prev) => ({
      ...prev,
      bonuses: typeof updater === 'function' ? updater(prev.bonuses) : updater,
    }))
  }

  function handleRoll() {
    const threshold = Math.max(0, Number(minTotal) || 0)
    const ceiling = maxTotal === '' || maxTotal === null ? null : Math.max(0, Number(maxTotal) || 0)
    const count = Math.max(1, Number(diceCount) || DEFAULT_DICE_COUNT)
    const sides = Math.max(2, Number(diceSides) || DEFAULT_DICE_SIDES)
    const drop = Math.min(Math.max(0, Number(dropCount) || 0), count - 1)

    function distanceFromRange(sum) {
      if (sum < threshold) return threshold - sum
      if (ceiling !== null && sum > ceiling) return sum - ceiling
      return 0
    }

    let best = null
    let bestDistance = Infinity
    let guard = 0
    let dist
    do {
      const next = Array.from({ length: 6 }, () => rollDiceDropLowest(count, sides, drop))
      const sum = next.reduce((s, r) => s + r.total, 0)
      dist = distanceFromRange(sum)
      if (dist < bestDistance) {
        best = next
        bestDistance = dist
      }
      guard++
    } while (dist > 0 && guard < 50000)
    setResults(best)
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
    <div>
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        สุ่มค่าพลัง ({diceCount}d{diceSides} ตัดต่ำสุด {dropCount} ลูก)
      </h2>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          onClick={handleRoll}
          className="rounded-lg bg-purple-600 py-3 px-6 text-lg font-bold text-white transition hover:bg-purple-700 md:px-8"
        >
          {results.length === 0 ? 'สุ่มเลย!' : 'สุ่มใหม่'}
        </button>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          จำนวนลูกเต๋า
          <input
            type="number"
            min="1"
            value={diceCount}
            onChange={(e) => setDiceCount(e.target.value)}
            className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
          />
          d
          <input
            type="number"
            min="2"
            value={diceSides}
            onChange={(e) => setDiceSides(e.target.value)}
            className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          ตัดต่ำสุดกี่ลูก
          <input
            type="number"
            min="0"
            value={dropCount}
            onChange={(e) => setDropCount(e.target.value)}
            className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          รวมขั้นต่ำที่ยอมรับ
          <input
            type="number"
            min="0"
            value={minTotal}
            onChange={(e) => setMinTotal(e.target.value)}
            className="w-20 rounded-md border border-gray-300 px-2 py-1 text-sm"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          รวมสูงสุดที่ยอมรับ
          <input
            type="number"
            min="0"
            placeholder="ไม่จำกัด"
            value={maxTotal}
            onChange={(e) => setMaxTotal(e.target.value)}
            className="w-24 rounded-md border border-gray-300 px-2 py-1 text-sm"
          />
        </label>
      </div>

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
                            r.dropIndices.has(i)
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
