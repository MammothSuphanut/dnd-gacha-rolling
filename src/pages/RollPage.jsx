import { useMemo, useState } from 'react'
import { useGachaStore } from '../store/GachaStore'
import { useToast } from '../store/ToastContext'
import { createId } from '../utils/id'
import {
  calculateHierarchicalPercentages,
  getEffectiveTotalWeight,
  rollBox,
} from '../utils/weightedRandom'
import StatRollPage from './StatRollPage'

const NO_CATEGORY = 'ไม่มีหมวดหมู่'
const ROLL_DURATION_MS = 700

export default function RollPage({
  rollState,
  setRollState,
  statRollState,
  setStatRollState,
  visibility,
  setVisibility,
}) {
  const { state, dispatch } = useGachaStore()
  const { showToast } = useToast()
  const [rolling, setRolling] = useState(false)
  const { config, boxResults, revealedIds } = rollState
  const { hiddenBoxIds, showStatRoll } = visibility

  function isBoxVisible(boxId) {
    return !hiddenBoxIds.has(boxId)
  }

  function toggleBoxVisible(boxId) {
    setVisibility((prev) => {
      const next = new Set(prev.hiddenBoxIds)
      if (next.has(boxId)) next.delete(boxId)
      else next.add(boxId)
      return { ...prev, hiddenBoxIds: next }
    })
  }

  function toggleStatRollVisible() {
    setVisibility((prev) => ({ ...prev, showStatRoll: !prev.showStatRoll }))
  }

  function setConfig(updater) {
    setRollState((prev) => ({
      ...prev,
      config: typeof updater === 'function' ? updater(prev.config) : updater,
    }))
  }

  function setBoxResults(updater) {
    setRollState((prev) => ({
      ...prev,
      boxResults: typeof updater === 'function' ? updater(prev.boxResults) : updater,
    }))
  }

  function setRevealedIds(updater) {
    setRollState((prev) => ({
      ...prev,
      revealedIds: typeof updater === 'function' ? updater(prev.revealedIds) : updater,
    }))
  }

  const grouped = useMemo(() => {
    const map = new Map()
    for (const box of state.boxes) {
      const cat = box.category?.trim() || NO_CATEGORY
      if (!map.has(cat)) map.set(cat, [])
      map.get(cat).push(box)
    }
    return Array.from(map.entries())
  }, [state.boxes])

  function getConfig(box) {
    return (
      config[box.id] ?? {
        count: box.settings?.defaultCount ?? 1,
        mode: box.settings?.defaultNoDuplicateMode ?? 'reroll',
      }
    )
  }

  function updateConfig(box, patch) {
    setConfig((prev) => ({ ...prev, [box.id]: { ...getConfig(box), ...patch } }))
  }

  function performRoll(entries) {
    const invalidBox = entries.find(
      ({ box }) => getEffectiveTotalWeight(box.items, box.groups ?? []) === 0,
    )
    if (invalidBox) {
      showToast(`ตู้ "${invalidBox.box.name}" weight รวมเป็น 0 สุ่มไม่ได้`, 'error')
      return
    }

    setRolling(true)

    setTimeout(() => {
      let anyCapped = false

      const boxesRolledFull = entries.map(({ box, count, mode }) => {
        const groups = box.groups ?? []
        const usableCount = calculateHierarchicalPercentages(box.items, groups).filter(
          (i) => i.percent > 0,
        ).length
        const requestedCount = Math.max(1, Number(count) || 1)
        const cappedCount = Math.min(requestedCount, usableCount)
        if (requestedCount > cappedCount) anyCapped = true

        const picked = rollBox(box.items, cappedCount, mode, groups)
        return {
          boxId: box.id,
          boxName: box.name,
          mode,
          resultItems: picked,
        }
      })

      const entry = {
        id: createId('history'),
        timestamp: new Date().toISOString(),
        boxesRolled: boxesRolledFull.map(({ boxId, boxName, mode, resultItems }) => ({
          boxId,
          boxName,
          mode,
          results: resultItems.map((item) => item.name),
        })),
      }

      dispatch({ type: 'ADD_HISTORY', payload: entry })

      setBoxResults((prev) => {
        const next = { ...prev }
        for (const r of boxesRolledFull) {
          next[r.boxId] = r
        }
        return next
      })
      setRevealedIds((prev) => {
        const next = new Set(prev)
        for (const r of boxesRolledFull) next.delete(r.boxId)
        return next
      })
      setRolling(false)

      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setRevealedIds((prev) => {
            const next = new Set(prev)
            for (const r of boxesRolledFull) next.add(r.boxId)
            return next
          })
        }),
      )

      if (anyCapped) {
        showToast('บางตู้จำนวนที่ขอสุ่มเกินจำนวน item จึงถูกปรับลดอัตโนมัติ', 'info')
      }
    }, ROLL_DURATION_MS)
  }

  function clearBoxResult(boxId) {
    setBoxResults((prev) => {
      const next = { ...prev }
      delete next[boxId]
      return next
    })
    setRevealedIds((prev) => {
      const next = new Set(prev)
      next.delete(boxId)
      return next
    })
  }

  function handleRollSingle(box) {
    const { count, mode } = getConfig(box)
    performRoll([{ box, count, mode }])
  }

  const visibleGrouped = useMemo(
    () =>
      grouped
        .map(([category, boxes]) => [category, boxes.filter((box) => isBoxVisible(box.id))])
        .filter(([, boxes]) => boxes.length > 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [grouped, hiddenBoxIds],
  )

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">สุ่ม</h1>

      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-3">
        <h2 className="mb-2 text-sm font-semibold text-gray-500">เลือกสิ่งที่จะแสดง</h2>
        <div className="space-y-3">
          {grouped.map(([category, boxes]) => (
            <div key={category}>
              <div className="mb-1 text-xs font-medium text-gray-400">{category}</div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {boxes.map((box) => (
                  <label key={box.id} className="flex items-center gap-1.5 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={isBoxVisible(box.id)}
                      onChange={() => toggleBoxVisible(box.id)}
                    />
                    {box.name}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div>
            <div className="mb-1 text-xs font-medium text-gray-400">อื่นๆ</div>
            <label className="flex items-center gap-1.5 text-sm text-gray-700">
              <input type="checkbox" checked={showStatRoll} onChange={toggleStatRollVisible} />
              สุ่มค่าพลัง (4d6)
            </label>
          </div>
        </div>
      </div>

      {state.boxes.length === 0 ? (
        <p className="text-sm text-gray-400">
          ยังไม่มีตู้สุ่ม ไปที่หน้า "จัดการตู้สุ่ม" เพื่อสร้างตู้ก่อน
        </p>
      ) : visibleGrouped.length === 0 ? (
        <p className="text-sm text-gray-400">ยังไม่ได้เลือกตู้ที่จะแสดง ติ๊กเลือกด้านบนก่อน</p>
      ) : (
        <div className="space-y-6">
          {visibleGrouped.map(([category, boxes]) => (
            <div key={category}>
              <h2 className="mb-2 text-sm font-semibold text-gray-500">{category}</h2>
              <div className="space-y-2">
                {boxes.map((box) => {
                  const totalWeight = getEffectiveTotalWeight(box.items, box.groups ?? [])
                  const { count, mode } = getConfig(box)
                  const result = boxResults[box.id]
                  return (
                    <div
                      key={box.id}
                      className="rounded-lg border border-gray-200 bg-white p-3"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-medium text-gray-900">{box.name}</span>
                        <span className="text-xs text-gray-400">({box.items.length} รายการ)</span>
                        {totalWeight === 0 && (
                          <span className="text-xs font-medium text-yellow-600">
                            weight รวมเป็น 0 สุ่มไม่ได้
                          </span>
                        )}
                        <button
                          type="button"
                          disabled={rolling || totalWeight === 0}
                          onClick={() => handleRollSingle(box)}
                          className="ml-auto rounded-md border border-purple-300 px-3 py-1 text-xs font-medium text-purple-700 hover:bg-purple-100 disabled:opacity-50"
                        >
                          สุ่มตู้นี้เลย
                        </button>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                          จำนวนครั้ง
                          <input
                            type="number"
                            min="1"
                            value={count}
                            onChange={(e) => updateConfig(box, { count: e.target.value })}
                            className="w-20 rounded-md border border-gray-300 px-2 py-1 text-sm"
                          />
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                          โหมดกันซ้ำ
                          <select
                            value={mode}
                            onChange={(e) => updateConfig(box, { mode: e.target.value })}
                            className="rounded-md border border-gray-300 px-2 py-1 text-sm"
                          >
                            <option value="reroll">Reroll ถ้าซ้ำ</option>
                            <option value="pool-shrink">ตัดพูลจริง</option>
                          </select>
                        </label>
                      </div>

                      {result && (
                        <div
                          className={`mt-3 border-t border-gray-100 pt-3 transition-all duration-500 ${
                            revealedIds.has(box.id)
                              ? 'translate-y-0 opacity-100'
                              : 'translate-y-4 opacity-0'
                          }`}
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                              {result.mode === 'pool-shrink' ? 'ตัดพูลจริง' : 'Reroll ถ้าซ้ำ'}
                            </span>
                            <button
                              type="button"
                              onClick={() => clearBoxResult(box.id)}
                              className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-100"
                            >
                              ล้างผล
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {result.resultItems.map((item, i) => {
                              const Wrapper = item.link ? 'a' : 'div'
                              const wrapperProps = item.link
                                ? {
                                    href: item.link,
                                    target: '_blank',
                                    rel: 'noopener noreferrer',
                                    title: item.link,
                                  }
                                : {}
                              return (
                                <Wrapper
                                  key={i}
                                  {...wrapperProps}
                                  className={`flex items-center gap-2 rounded-md border border-gray-100 bg-gray-50 px-3 py-2 ${
                                    item.link ? 'transition hover:border-purple-300 hover:bg-purple-50' : ''
                                  }`}
                                >
                                  {item.image && (
                                    <img
                                      src={item.image}
                                      alt=""
                                      className="h-8 w-8 rounded object-cover"
                                    />
                                  )}
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span
                                        className={`text-sm font-medium ${
                                          item.link ? 'text-purple-700 underline' : 'text-gray-900'
                                        }`}
                                      >
                                        {item.name}
                                      </span>
                                      {item.group && (
                                        <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                                          {item.group}
                                        </span>
                                      )}
                                    </div>
                                    {item.tag && (
                                      <div className="text-xs text-gray-500">{item.tag}</div>
                                    )}
                                    {item.note && (
                                      <div className="text-xs text-gray-400">{item.note}</div>
                                    )}
                                  </div>
                                </Wrapper>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {rolling && (
        <div className="mt-8 flex justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
        </div>
      )}

      {showStatRoll && (
        <div className="mt-8 border-t border-gray-200 pt-8">
          <StatRollPage statRollState={statRollState} setStatRollState={setStatRollState} />
        </div>
      )}
    </div>
  )
}
