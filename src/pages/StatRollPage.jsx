import SearchSelect from '../components/SearchSelect'
import { createId } from '../utils/id'

const CORE_STATS = [
  { key: 'str', label: 'STR' },
  { key: 'dex', label: 'DEX' },
  { key: 'con', label: 'CON' },
  { key: 'int', label: 'INT' },
  { key: 'wis', label: 'WIS' },
  { key: 'cha', label: 'CHA' },
]

// Optional variant-rule scores (Honor/Sanity) — only some campaigns use
// these, so rolling them is opt-in (see includeHonSan below) rather than
// always part of the pool. Assigned from the roll pool same as the core
// six, but never get the species/background +2/+1 ability-score-improvement
// bonus, so their card skips those checkboxes.
const EXTRA_STATS = [
  { key: 'hon', label: 'HON', noBonus: true },
  { key: 'san', label: 'SAN', noBonus: true },
]

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1
}

function buildRollResult(rolls, dropCount) {
  const drops = Math.min(Math.max(dropCount, 0), rolls.length - 1)
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
// Shared budget for BOTH "สุ่มใหม่" (full reroll) and the per-card 🎲 reroll
// of a Standard card — the very first roll (from an empty results set) is
// always free and doesn't touch this; only redoing a roll you already have
// costs from the budget.
const DEFAULT_REROLLS = 3
// Separate, smaller budget just for rerolling an Extra (HON/SAN) card
// individually — doesn't share with, or get spent by, the Standard pool.
const DEFAULT_EXTRA_REROLLS = 2

export default function StatRollPage({
  statRollState,
  setStatRollState,
  pickMode = false,
  pickedStatKeys,
  onToggleStatKey,
  onToggleAllStatKeys,
}) {
  const {
    results,
    assignments,
    bonuses,
    minTotal = DEFAULT_MIN_TOTAL,
    diceCount = DEFAULT_DICE_COUNT,
    diceSides = DEFAULT_DICE_SIDES,
    dropCount = DEFAULT_DROP_COUNT,
    fixedFaces = {},
    fixedFacesEnabled = false,
    includeHonSan = true,
    rerollsLeft = DEFAULT_REROLLS,
    extraRerollsLeft = DEFAULT_EXTRA_REROLLS,
  } = statRollState

  const STATS = includeHonSan ? [...CORE_STATS, ...EXTRA_STATS] : CORE_STATS
  // One roll result per stat box (including HON/SAN when included) keeps
  // the 1:1 roll-to-assignment relationship the rest of this page assumes.
  const ROLL_COUNT = STATS.length

  function setMinTotal(value) {
    setStatRollState((prev) => ({ ...prev, minTotal: value }))
  }

  // Roll count changes shape (6 vs 8) when this flips, so any existing rolls
  // no longer line up 1:1 with the stat boxes — clear them like a reset.
  // minTotal is untouched: it only ever governs the core six (see
  // handleRoll), so there's nothing to re-tune here.
  function setIncludeHonSan(value) {
    setStatRollState((prev) => ({
      ...prev,
      includeHonSan: value,
      results: [],
      assignments: {},
      bonuses: {},
      rerollsLeft: DEFAULT_REROLLS,
      extraRerollsLeft: DEFAULT_EXTRA_REROLLS,
    }))
  }

  function setFixedFacesEnabled(value) {
    setStatRollState((prev) => ({ ...prev, fixedFacesEnabled: value }))
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

  function setFixedFace(resultIdx, diceIdx, value) {
    setStatRollState((prev) => {
      const prevFaces = prev.fixedFaces ?? {}
      const prevRow = prevFaces[resultIdx] ?? []
      const nextRow = [...prevRow]
      nextRow[diceIdx] = value
      return { ...prev, fixedFaces: { ...prevFaces, [resultIdx]: nextRow } }
    })
  }

  function clearFixedRow(resultIdx) {
    setStatRollState((prev) => {
      const prevFaces = prev.fixedFaces ?? {}
      const nextFaces = { ...prevFaces }
      delete nextFaces[resultIdx]
      return { ...prev, fixedFaces: nextFaces }
    })
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

  // Shared by both the full roll and the per-card reroll button below —
  // reads the current dice settings fresh each call.
  function fixedFaceValue(idx, diceIdx, sides) {
    if (!fixedFacesEnabled) return null
    const raw = fixedFaces[idx]?.[diceIdx]
    const v = Number(raw)
    if (raw === undefined || raw === '' || !Number.isFinite(v) || v < 1 || v > sides) {
      return null
    }
    return v
  }

  function rollResultForIndex(idx) {
    const count = Math.max(1, Number(diceCount) || DEFAULT_DICE_COUNT)
    const sides = Math.max(2, Number(diceSides) || DEFAULT_DICE_SIDES)
    const drop = Math.min(Math.max(0, Number(dropCount) || 0), count - 1)
    const rolls = Array.from({ length: count }, (_, diceIdx) => {
      const fixed = fixedFaceValue(idx, diceIdx, sides)
      return fixed !== null ? fixed : rollDie(sides)
    })
    return buildRollResult(rolls, drop)
  }

  // Searches for a fresh set of the core six that clears minTotal — the
  // min-total search only ever governs these, so it's the exact same search
  // as before HON/SAN existed (Honor/Sanity never dilute this budget).
  function rollStandardBatch() {
    const threshold = Math.max(0, Number(minTotal) || 0)
    let best = null
    let bestDistance = Infinity
    let guard = 0
    let dist
    do {
      const next = Array.from({ length: CORE_STATS.length }, (_, idx) => rollResultForIndex(idx))
      const sum = next.reduce((s, r) => s + r.total, 0)
      dist = sum < threshold ? threshold - sum : 0
      if (dist < bestDistance) {
        best = next
        bestDistance = dist
      }
      guard++
    } while (dist > 0 && guard < 50000)
    return best
  }

  // Extra (HON/SAN) rolls plainly, no threshold search.
  function rollExtraBatch() {
    return EXTRA_STATS.map((_, i) => rollResultForIndex(CORE_STATS.length + i))
  }

  // Applies a batch of { idx -> newResult } replacements to results, carrying
  // forward any assignment that pointed at the old roll in that slot (so a
  // reroll — single card or a whole group — never silently unassigns a
  // stat that was already filled in).
  function applyResultUpdates(prevResults, prevAssignments, updates) {
    const nextResults = prevResults.map((r, i) => (updates.has(i) ? updates.get(i) : r))
    const nextAssignments = { ...prevAssignments }
    for (const [idx, newResult] of updates) {
      const oldResult = prevResults[idx]
      if (!oldResult) continue
      const statKey = Object.keys(nextAssignments).find((k) => nextAssignments[k] === oldResult.id)
      if (statKey) nextAssignments[statKey] = newResult.id
    }
    return { nextResults, nextAssignments }
  }

  // The very first roll (nothing rolled yet) is free and rolls Standard +
  // Extra together in one "สุ่มเลย!" button. Afterward the button splits into
  // two independent reroll actions (see JSX below) — Standard spends from
  // rerollsLeft, Extra spends from its own separate, smaller extraRerollsLeft.
  const isFirstRoll = results.length === 0
  const canReroll = isFirstRoll || rerollsLeft > 0
  const canRerollExtra = extraRerollsLeft > 0

  function handleRoll() {
    if (!isFirstRoll) return
    const standard = rollStandardBatch()
    const extra = includeHonSan ? rollExtraBatch() : []
    setStatRollState((prev) => ({
      ...prev,
      results: [...standard, ...extra],
      assignments: {},
      bonuses: {},
    }))
  }

  function handleRerollStandard() {
    if (!canReroll) return
    const standard = rollStandardBatch()
    setStatRollState((prev) => {
      const updates = new Map(standard.map((r, i) => [i, r]))
      const { nextResults, nextAssignments } = applyResultUpdates(prev.results, prev.assignments, updates)
      return {
        ...prev,
        results: nextResults,
        assignments: nextAssignments,
        rerollsLeft: Math.max(0, prev.rerollsLeft - 1),
      }
    })
  }

  function handleRerollExtra() {
    if (!canRerollExtra) return
    const extra = rollExtraBatch()
    setStatRollState((prev) => {
      const updates = new Map(extra.map((r, i) => [CORE_STATS.length + i, r]))
      const { nextResults, nextAssignments } = applyResultUpdates(prev.results, prev.assignments, updates)
      return {
        ...prev,
        results: nextResults,
        assignments: nextAssignments,
        extraRerollsLeft: Math.max(0, prev.extraRerollsLeft - 1),
      }
    })
  }

  // Rerolls just one card in place — no threshold search, plain single roll.
  // Standard cards spend from rerollsLeft; Extra (HON/SAN) cards spend from
  // their own separate extraRerollsLeft budget instead.
  function handleRerollOne(idx) {
    const isExtra = idx >= CORE_STATS.length
    if (isExtra ? !canRerollExtra : !canReroll) return
    const newResult = rollResultForIndex(idx)
    setStatRollState((prev) => {
      const { nextResults, nextAssignments } = applyResultUpdates(
        prev.results,
        prev.assignments,
        new Map([[idx, newResult]]),
      )
      return {
        ...prev,
        results: nextResults,
        assignments: nextAssignments,
        rerollsLeft: isExtra ? prev.rerollsLeft : Math.max(0, prev.rerollsLeft - 1),
        extraRerollsLeft: isExtra ? Math.max(0, prev.extraRerollsLeft - 1) : prev.extraRerollsLeft,
      }
    })
  }

  function handleReset() {
    setStatRollState({
      results: [],
      assignments: {},
      bonuses: {},
      minTotal: DEFAULT_MIN_TOTAL,
      diceCount: DEFAULT_DICE_COUNT,
      diceSides: DEFAULT_DICE_SIDES,
      dropCount: DEFAULT_DROP_COUNT,
      fixedFaces: {},
      fixedFacesEnabled: false,
      includeHonSan: true,
      rerollsLeft: DEFAULT_REROLLS,
      extraRerollsLeft: DEFAULT_EXTRA_REROLLS,
    })
  }

  function adjustResultTotal(resultId, delta) {
    setResults((prev) =>
      prev.map((r) => (r.id === resultId ? { ...r, total: Math.max(0, r.total + delta) } : r)),
    )
  }

  function assignStat(statKey, resultId) {
    setAssignments((prev) => {
      const next = { ...prev }
      if (!resultId) {
        delete next[statKey]
        return next
      }
      const previousResultId = next[statKey]
      const otherStatKey = Object.keys(next).find(
        (key) => key !== statKey && next[key] === resultId,
      )
      if (otherStatKey) {
        if (previousResultId) {
          next[otherStatKey] = previousResultId
        } else {
          delete next[otherStatKey]
        }
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

  const assignableStatKeys = STATS.filter((stat) => assignments[stat.key]).map((stat) => stat.key)
  const allStatKeysPicked =
    assignableStatKeys.length > 0 && assignableStatKeys.every((key) => pickedStatKeys?.has(key))
  const assignedResultIds = new Set(Object.values(assignments))
  const resultById = new Map(results.map((r) => [r.id, r]))
  const resultsSum = results.reduce((sum, r) => sum + r.total, 0)
  // Shown separately since only the first slice (STR-CHA) is what the
  // min/max-total fields above actually constrain.
  const coreResultsSum = results.slice(0, CORE_STATS.length).reduce((sum, r) => sum + r.total, 0)
  const resultIndexById = new Map(results.map((r, idx) => [r.id, idx]))
  const sortedResults = [...results].sort((a, b) => b.total - a.total)

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

  // "Standard 1-6" = the core six (subject to the min/max-total search),
  // "Extra 1-2" = HON/SAN (rolled unconstrained) — see handleRoll.
  function resultLabel(idx) {
    return idx < CORE_STATS.length
      ? `Standard ${idx + 1}`
      : `Extra ${idx - CORE_STATS.length + 1}`
  }

  function rollResultCard(r, label, idx) {
    const used = assignedResultIds.has(r.id)
    const isExtra = idx >= CORE_STATS.length
    const allowed = isExtra ? canRerollExtra : canReroll
    return (
      <div
        key={r.id}
        className={`relative rounded-lg border p-3 text-center ${
          used ? 'border-violet-300 bg-violet-50' : 'border-[#e2cfb3] bg-white'
        }`}
      >
        <button
          type="button"
          onClick={() => handleRerollOne(idx)}
          disabled={!allowed}
          title={
            allowed
              ? `สุ่มใหม่เฉพาะช่องนี้ (ใช้ ${isExtra ? 'Reroll Extra' : 'Reroll'} 1 ครั้ง)`
              : `${isExtra ? 'Reroll Extra' : 'Reroll'} หมดแล้ว — กด "รีเซ็ต" ก่อน`
          }
          className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-xs leading-none text-stone-400 hover:bg-[#f5ede0] hover:text-stone-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
        >
          🎲
        </button>
        <div className="text-xs text-stone-400">{label}</div>
        <div className="mt-1 flex justify-center gap-1">
          {r.rolls.map((v, i) => (
            <span
              key={i}
              className={`flex h-6 w-6 items-center justify-center rounded text-xs font-medium ${
                r.dropIndices.has(i)
                  ? 'bg-[#f5ede0] text-stone-400 line-through'
                  : 'bg-gray-800 text-white'
              }`}
            >
              {v}
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => adjustResultTotal(r.id, -1)}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 text-sm font-bold text-stone-600 hover:bg-[#f5ede0]"
          >
            −
          </button>
          <div className="w-8 text-xl font-bold text-stone-900">{r.total}</div>
          <button
            type="button"
            onClick={() => adjustResultTotal(r.id, 1)}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 text-sm font-bold text-stone-600 hover:bg-[#f5ede0]"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-[150px]">
      <h2 className="mb-4 text-xl font-bold text-stone-900">
        สุ่มค่าพลัง ({diceCount}d{diceSides} ตัดต่ำสุด {dropCount} ลูก)
      </h2>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        {isFirstRoll ? (
          <button
            onClick={handleRoll}
            className="rounded-lg bg-violet-700 py-3 px-6 text-lg font-bold text-white transition hover:bg-violet-800 md:px-8"
          >
            สุ่มเลย!
          </button>
        ) : (
          <>
            <button
              onClick={handleRerollStandard}
              disabled={!canReroll}
              className="rounded-lg bg-violet-700 py-3 px-6 text-base font-bold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:hover:bg-stone-300 md:px-7"
            >
              สุ่มใหม่ (Standard)
            </button>
            {includeHonSan && (
              <button
                onClick={handleRerollExtra}
                disabled={!canRerollExtra}
                className="rounded-lg bg-violet-500 py-3 px-6 text-base font-bold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:hover:bg-stone-300 md:px-7"
              >
                สุ่มใหม่ (Extra)
              </button>
            )}
          </>
        )}
        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-gray-300 bg-white py-3 px-6 text-sm font-semibold text-stone-600 transition hover:bg-[#f5ede0]"
        >
          รีเซ็ต
        </button>
        <span
          className={`rounded-lg border px-3 py-2 text-sm font-semibold ${
            rerollsLeft > 0
              ? 'border-[#e2cfb3] bg-white text-stone-600'
              : 'border-red-200 bg-red-50 text-red-600'
          }`}
          title='ใช้ร่วมกันทั้ง "สุ่มใหม่ (Standard)" และ 🎲 รายการ์ด Standard — สุ่มครั้งแรกไม่เสีย Reroll, หมดแล้วต้องกด "รีเซ็ต"'
        >
          Reroll เหลือ: {rerollsLeft}/{DEFAULT_REROLLS}
        </span>
        {includeHonSan && (
          <span
            className={`rounded-lg border px-3 py-2 text-sm font-semibold ${
              extraRerollsLeft > 0
                ? 'border-[#e2cfb3] bg-white text-stone-600'
                : 'border-red-200 bg-red-50 text-red-600'
            }`}
            title='ใช้ร่วมกันทั้ง "สุ่มใหม่ (Extra)" และ 🎲 รายการ์ด Extra — หมดแล้วต้องกด "รีเซ็ต"'
          >
            Reroll Extra เหลือ: {extraRerollsLeft}/{DEFAULT_EXTRA_REROLLS}
          </span>
        )}
        {/* Locked once the first roll exists — settings shouldn't change out
            from under a roll already in progress. "รีเซ็ต" is the only way
            back in, since it's the button that clears results. className
            "contents" keeps these as if they weren't wrapped at all, so the
            flex-wrap row layout is unaffected. */}
        <fieldset disabled={!isFirstRoll} className="contents">
          <label
            className="flex items-center gap-2 rounded-lg border border-[#e2cfb3] bg-white px-3 py-2 text-sm font-medium text-stone-600 disabled:opacity-50"
            title="เพิ่มการสุ่ม HON (Honor) และ SAN (Sanity) — ใช้เฉพาะแคมเปญที่มีระบบเกียรติยศ/สติ ทอยแยกจากค่าพลัง Standard ไม่นับรวมกับเงื่อนไขขั้นต่ำ/สูงสุดด้านล่าง"
          >
            <input
              type="checkbox"
              checked={includeHonSan}
              onChange={(e) => setIncludeHonSan(e.target.checked)}
              className="h-4 w-4 accent-violet-700"
            />
            รวม HON/SAN ในการสุ่มด้วย
          </label>
          <label className="flex items-center gap-2 text-sm text-stone-600">
            จำนวนลูกเต๋า
            <input
              type="number"
              min="1"
              value={diceCount}
              onChange={(e) => setDiceCount(e.target.value)}
              className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm disabled:bg-stone-100 disabled:text-stone-400"
            />
            d
            <input
              type="number"
              min="2"
              value={diceSides}
              onChange={(e) => setDiceSides(e.target.value)}
              className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm disabled:bg-stone-100 disabled:text-stone-400"
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-stone-600">
            ตัดต่ำสุดกี่ลูก
            <input
              type="number"
              min="0"
              value={dropCount}
              onChange={(e) => setDropCount(e.target.value)}
              className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm disabled:bg-stone-100 disabled:text-stone-400"
            />
          </label>
          <label
            className="flex items-center gap-2 text-sm text-stone-600"
            title="ใช้กับค่าพลัง Standard เท่านั้น — Extra (HON/SAN) ไม่ถูกนับรวมในเงื่อนไขนี้"
          >
            รวมขั้นต่ำที่ยอมรับ (Standard)
            <input
              type="number"
              min="0"
              value={minTotal}
              onChange={(e) => setMinTotal(e.target.value)}
              className="w-20 rounded-md border border-gray-300 px-2 py-1 text-sm disabled:bg-stone-100 disabled:text-stone-400"
            />
          </label>
        </fieldset>
      </div>

      <fieldset disabled={!isFirstRoll} className="mb-8 border-0 p-0">
        <div className="mb-2 flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-500">
            <input
              type="checkbox"
              checked={fixedFacesEnabled}
              onChange={(e) => setFixedFacesEnabled(e.target.checked)}
            />
            กำหนดหน้าเต๋า (ใส่เฉพาะช่องที่ต้องการบังคับ ช่องที่เว้นว่างจะสุ่มตามปกติ)
          </label>
        </div>
        {fixedFacesEnabled && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {Array.from({ length: ROLL_COUNT }, (_, idx) => idx).map((idx) => {
              const row = fixedFaces[idx] ?? []
              const count = Math.max(1, Number(diceCount) || DEFAULT_DICE_COUNT)
              const hasValues = row.some((v) => v !== undefined && v !== '')
              return (
                <div key={idx} className="rounded-lg border border-[#e2cfb3] bg-white p-3 text-center">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-stone-400">ครั้งที่ {idx + 1}</div>
                    {hasValues && (
                      <button
                        type="button"
                        onClick={() => clearFixedRow(idx)}
                        className="flex h-4 w-4 items-center justify-center rounded-full text-xs leading-none text-stone-400 hover:bg-[#f5ede0] hover:text-stone-600"
                        title="ล้างค่า"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap justify-center gap-1">
                    {Array.from({ length: count }, (_, diceIdx) => (
                      <input
                        key={diceIdx}
                        type="number"
                        min="1"
                        max={diceSides}
                        value={row[diceIdx] ?? ''}
                        onChange={(e) => setFixedFace(idx, diceIdx, e.target.value)}
                        className="h-6 w-6 rounded border border-gray-300 p-0 text-center text-xs disabled:bg-stone-100 disabled:text-stone-400"
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </fieldset>

      {results.length > 0 && (
        <>
          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-stone-500">ผลการสุ่ม ({ROLL_COUNT} ครั้ง)</h2>
              <span className="text-sm font-medium text-stone-600">
                {includeHonSan ? (
                  <>
                    รวม Standard: <span className="font-bold text-stone-900">{coreResultsSum}</span>{' '}
                    <span className="text-stone-400">(รวมทั้งหมด {resultsSum})</span>
                  </>
                ) : (
                  <>
                    รวมทั้งหมด: <span className="font-bold text-stone-900">{resultsSum}</span>
                  </>
                )}
              </span>
            </div>
            {/* Every card gets the same grow factor + basis (not a grid split
                proportionally between the two groups), so Standard and Extra
                cards stretch to fill the full row equally instead of leaving
                dead space — and wrap to a new row on narrow screens instead
                of shrinking unreadably small. */}
            <div className="flex flex-wrap items-stretch gap-3">
              {results.slice(0, CORE_STATS.length).map((r, i) => (
                <div key={r.id} className="grow shrink basis-32">
                  {rollResultCard(r, resultLabel(i), i)}
                </div>
              ))}
              {includeHonSan && results.length > CORE_STATS.length && (
                <>
                  {/* Divider marking Standard vs Extra */}
                  <div className="w-px shrink-0 self-stretch bg-[#e2cfb3]" />
                  {results.slice(CORE_STATS.length).map((r, i) => (
                    <div key={r.id} className="grow shrink basis-32">
                      {rollResultCard(r, resultLabel(CORE_STATS.length + i), CORE_STATS.length + i)}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-stone-500">ลงค่าพลัง</h2>
                {pickMode && (
                  <label
                    className={`flex items-center gap-1.5 text-xs text-stone-600 ${
                      assignableStatKeys.length === 0 ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
                    }`}
                    title={assignableStatKeys.length === 0 ? 'ยังไม่ได้ลงค่าให้ช่องไหนเลย' : ''}
                  >
                    <input
                      type="checkbox"
                      checked={allStatKeysPicked}
                      disabled={assignableStatKeys.length === 0}
                      onChange={() => onToggleAllStatKeys?.(assignableStatKeys)}
                      className="h-4 w-4 accent-violet-700 disabled:opacity-40"
                    />
                    เลือกค่าพลังทั้ง {STATS.length}
                  </label>
                )}
              </div>
              <span className="text-sm font-medium text-stone-600">
                รวมที่ลงแล้ว ({assignedResultIds.size}/{STATS.length}):{' '}
                <span className="font-bold text-stone-900">{assignedSum}</span>
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
                    className={`flex flex-col gap-2 rounded-lg border p-3 ${
                      pickMode && pickedStatKeys?.has(stat.key)
                        ? 'border-violet-300 bg-violet-50'
                        : 'border-[#e2cfb3] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 font-semibold text-stone-700">
                        {pickMode && (
                          <input
                            type="checkbox"
                            checked={!!pickedStatKeys?.has(stat.key)}
                            disabled={!assignedId}
                            onChange={() => onToggleStatKey?.(stat.key)}
                            className="h-4 w-4 accent-violet-700 disabled:opacity-40"
                            title={!assignedId ? 'ยังไม่ได้ลงค่าให้ช่องนี้' : ''}
                          />
                        )}
                        {stat.label}
                      </span>
                      <span className="text-sm text-stone-500">
                        {score}
                        {currentBonus ? (
                          <span className="text-violet-700"> (+{currentBonus})</span>
                        ) : null}{' '}
                        {abilityModifier(score)}
                      </span>
                    </div>

                    <SearchSelect
                      options={sortedResults.map((r) => ({
                        value: r.id,
                        label: `${resultLabel(resultIndexById.get(r.id))} (${r.total})`,
                        disabled: assignedResultIds.has(r.id) && assignedId !== r.id,
                      }))}
                      value={assignedId ?? ''}
                      onChange={(v) => assignStat(stat.key, v || null)}
                      placeholder="-"
                      clearLabel="เปลี่ยน"
                    />

                    {!stat.noBonus && (
                      <div className="flex items-center gap-3 text-xs text-stone-500">
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
                    )}
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
