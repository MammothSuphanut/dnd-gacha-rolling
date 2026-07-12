import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGachaStore } from '../store/GachaStore'
import { useToast } from '../store/ToastContext'
import {
  applyRateUp,
  calculateHierarchicalPercentages,
  getEffectiveTotalWeight,
  getUsableCount,
  rollBox,
} from '../utils/weightedRandom'

const DEFAULT_RATE_UP = { mode: 'multiplier', multiplier: 2, percent: 50, itemIds: [], groupNames: [] }
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
  const { state } = useGachaStore()
  const { showToast } = useToast()
  const [rolling, setRolling] = useState(false)
  const [rateUpBoxId, setRateUpBoxId] = useState(null)
  const { config, boxResults, revealedIds } = rollState
  const { selectedBoxId, showStatRoll, defaultVisibilityApplied } = visibility

  function isBoxVisible(category, boxId) {
    return selectedBoxId[category] === boxId
  }

  function selectBox(category, boxId) {
    setVisibility((prev) => ({
      ...prev,
      selectedBoxId: { ...prev.selectedBoxId, [category]: boxId },
    }))
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

  useEffect(() => {
    if (defaultVisibilityApplied || state.boxes.length === 0) return
    setVisibility((prev) => {
      const next = { ...prev.selectedBoxId }
      for (const [category, boxes] of grouped) {
        if (!next[category] && boxes.length > 0) next[category] = boxes[0].id
      }
      return { ...prev, selectedBoxId: next, defaultVisibilityApplied: true }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultVisibilityApplied, state.boxes.length, grouped])

  function getConfig(box) {
    return (
      config[box.id] ?? {
        count: box.settings?.defaultCount ?? 1,
        mode: box.settings?.defaultNoDuplicateMode ?? 'reroll',
        group: '',
        noDuplicateGroup: false,
        rateUp: DEFAULT_RATE_UP,
      }
    )
  }

  function updateConfig(box, patch) {
    setConfig((prev) => ({ ...prev, [box.id]: { ...getConfig(box), ...patch } }))
  }

  function getRateUp(box) {
    return getConfig(box).rateUp ?? DEFAULT_RATE_UP
  }

  function updateRateUp(box, patch) {
    updateConfig(box, { rateUp: { ...getRateUp(box), ...patch } })
  }

  function toggleRateUpItem(box, itemId) {
    const rateUp = getRateUp(box)
    const has = rateUp.itemIds.includes(itemId)
    updateRateUp(box, {
      itemIds: has ? rateUp.itemIds.filter((id) => id !== itemId) : [...rateUp.itemIds, itemId],
    })
  }

  function toggleRateUpGroup(box, groupName) {
    const rateUp = getRateUp(box)
    const has = rateUp.groupNames.includes(groupName)
    updateRateUp(box, {
      groupNames: has
        ? rateUp.groupNames.filter((name) => name !== groupName)
        : [...rateUp.groupNames, groupName],
    })
  }

  function getRollItems(box, group) {
    if (!group) return box.items
    return box.items.filter((item) => item.group?.trim() === group)
  }

  function getEffectiveRoll(box, boxConfig) {
    const baseItems = getRollItems(box, boxConfig.group)
    const baseGroups = box.groups ?? []
    return applyRateUp(baseItems, baseGroups, boxConfig.rateUp)
  }

  function getBoxDisplayData(box) {
    const boxConfig = getConfig(box)
    const { count, mode, group, noDuplicateGroup, rateUp } = boxConfig
    const subGroups = box.groups ?? []
    const rollItems = getRollItems(box, group)
    const { items: effectiveItems, groups: effectiveGroups } = getEffectiveRoll(box, boxConfig)
    const totalWeight = getEffectiveTotalWeight(effectiveItems, effectiveGroups)
    const percentagedItems = calculateHierarchicalPercentages(effectiveItems, effectiveGroups)
    const itemPercentMap = new Map(percentagedItems.map((i) => [i.id, i.percent]))
    const groupPercentMap = new Map()
    for (const i of percentagedItems) {
      const gname = i.group?.trim()
      if (!gname) continue
      groupPercentMap.set(gname, (groupPercentMap.get(gname) ?? 0) + i.percent)
    }
    const formatPercent = (p) => (p === undefined ? '0' : p % 1 === 0 ? p.toFixed(0) : p.toFixed(1))
    return {
      boxConfig,
      count,
      mode,
      group,
      noDuplicateGroup,
      rateUp,
      subGroups,
      rollItems,
      totalWeight,
      itemPercentMap,
      groupPercentMap,
      formatPercent,
    }
  }

  function performRoll(entries) {
    const invalidBox = entries.find(({ box, ...boxConfig }) => {
      const { items, groups } = getEffectiveRoll(box, boxConfig)
      return getEffectiveTotalWeight(items, groups) === 0
    })
    if (invalidBox) {
      showToast(`ตู้ "${invalidBox.box.name}" weight รวมเป็น 0 สุ่มไม่ได้`, 'error')
      return
    }

    setRolling(true)

    setTimeout(() => {
      let anyCapped = false

      const boxesRolledFull = entries.map(({ box, count, mode, noDuplicateGroup, ...boxConfig }) => {
        const { items: rollItems, groups } = getEffectiveRoll(box, boxConfig)
        const usableCount = getUsableCount(rollItems, groups, noDuplicateGroup)
        const requestedCount = Math.max(1, Number(count) || 1)
        const cappedCount = Math.min(requestedCount, usableCount)
        if (requestedCount > cappedCount) anyCapped = true

        const picked = rollBox(rollItems, cappedCount, mode, groups, { noDuplicateGroup })
        const percentMap = new Map(
          calculateHierarchicalPercentages(rollItems, groups).map((i) => [i.id, i.percent]),
        )
        return {
          boxId: box.id,
          boxName: box.name,
          mode,
          resultItems: picked.map((item) => ({ ...item, rollPercent: percentMap.get(item.id) })),
        }
      })

      setBoxResults((prev) => {
        const next = { ...prev }
        for (const r of boxesRolledFull) {
          const history = prev[r.boxId] ?? []
          next[r.boxId] = [r, ...history]
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
    const { count, mode, group, noDuplicateGroup, rateUp } = getConfig(box)
    performRoll([
      { box, count, mode, group, noDuplicateGroup: noDuplicateGroup && !group, rateUp },
    ])
  }

  const visibleGrouped = useMemo(
    () =>
      grouped
        .map(([category, boxes]) => [category, boxes.filter((box) => isBoxVisible(category, box.id))])
        .filter(([, boxes]) => boxes.length > 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [grouped, selectedBoxId],
  )

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <h2 className="mb-2 text-sm font-semibold text-gray-500">เลือกสิ่งที่จะแสดง</h2>
          <div className="flex flex-wrap gap-6">
            {grouped.map(([category, boxes]) => (
              <div key={category}>
                <div className="mb-1 text-xs font-medium text-gray-400">{category}</div>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {boxes.map((box) => (
                    <label key={box.id} className="flex items-center gap-1.5 text-sm text-gray-700">
                      <input
                        type="radio"
                        name={`show-box-${category}`}
                        checked={isBoxVisible(category, box.id)}
                        onChange={() => selectBox(category, box.id)}
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
        <Link
          to="/boxes"
          className="rounded-md border border-purple-300 px-3 py-2 text-sm font-medium text-purple-700 hover:bg-purple-100"
        >
          จัดการตู้สุ่ม
        </Link>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          {state.boxes.length === 0 ? (
            <p className="text-sm text-gray-400">
              ยังไม่มีตู้สุ่ม ไปที่หน้า "จัดการตู้สุ่ม" เพื่อสร้างตู้ก่อน
            </p>
          ) : visibleGrouped.length === 0 ? (
            <p className="text-sm text-gray-400">ยังไม่ได้เลือกตู้ที่จะแสดง ติ๊กเลือกด้านบนก่อน</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visibleGrouped.map(([category, boxes]) => {
                  const box = boxes[0]
                  const {
                    count,
                    mode,
                    group,
                    noDuplicateGroup,
                    rateUp,
                    subGroups,
                    rollItems,
                    totalWeight,
                    itemPercentMap,
                    groupPercentMap,
                    formatPercent,
                  } = getBoxDisplayData(box)
                  const rateUpTags = [
                    ...rateUp.groupNames.map((name) => ({
                      key: `g-${name}`,
                      label: name,
                      percent: groupPercentMap.get(name),
                    })),
                    ...rateUp.itemIds.map((id) => ({
                      key: `i-${id}`,
                      label: box.items.find((item) => item.id === id)?.name ?? '',
                      percent: itemPercentMap.get(id),
                    })),
                  ]
                  const resultHistory = boxResults[box.id] ?? []
                  return (
                    <div
                      key={category}
                      className="rounded-lg border border-gray-200 bg-white p-3"
                    >
                      <h2 className="mb-2 text-xs font-semibold text-gray-500">{category}</h2>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-medium text-gray-900">{box.name}</span>
                        <span className="text-xs text-gray-400">({rollItems.length} รายการ)</span>
                        {totalWeight === 0 && (
                          <span className="text-xs font-medium text-yellow-600">
                            weight รวมเป็น 0 สุ่มไม่ได้
                          </span>
                        )}
                        {box.items.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setRateUpBoxId(box.id)}
                            className="ml-auto rounded-md border border-purple-200 bg-purple-50/50 px-3 py-1.5 text-sm font-medium text-purple-700 hover:bg-purple-100"
                          >
                            Rate Up{' '}
                            {(rateUp.itemIds.length > 0 || rateUp.groupNames.length > 0) && (
                              <span className="ml-1 rounded-full bg-purple-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                                {rateUp.mode === 'percent' ? `${rateUp.percent}%` : `x${rateUp.multiplier}`}
                              </span>
                            )}
                          </button>
                        )}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-3">
                        <label className="flex flex-col gap-1 text-sm text-gray-600">
                          จำนวนครั้ง
                          <input
                            type="number"
                            min="1"
                            value={count}
                            onChange={(e) => updateConfig(box, { count: e.target.value })}
                            className="w-20 rounded-md border border-gray-300 px-2 py-1 text-sm"
                          />
                        </label>
                        <label className="flex flex-col gap-1 text-sm text-gray-600">
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

                      {subGroups.length > 0 && (
                        <div className="mt-3 flex flex-col gap-1 text-sm text-gray-600">
                          <label className="flex flex-col gap-1">
                            หมวดย่อย
                            <select
                              value={group}
                              onChange={(e) => updateConfig(box, { group: e.target.value })}
                              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                            >
                              <option value="">ทั้งหมด</option>
                              {subGroups.map((g) => (
                                <option key={g.name} value={g.name}>
                                  {g.name}
                                </option>
                              ))}
                            </select>
                          </label>
                          {!group && (
                            <label className="flex items-center gap-1.5">
                              <input
                                type="checkbox"
                                checked={noDuplicateGroup}
                                onChange={(e) =>
                                  updateConfig(box, { noDuplicateGroup: e.target.checked })
                                }
                              />
                              ไม่ซ้ำหมวดย่อย
                            </label>
                          )}
                        </div>
                      )}

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          disabled={rolling || totalWeight === 0}
                          onClick={() => handleRollSingle(box)}
                          className="rounded-lg bg-purple-600 py-3 px-6 text-lg font-bold text-white transition hover:bg-purple-700 disabled:opacity-50"
                        >
                          สุ่มตู้นี้เลย
                        </button>
                        {rateUpTags.map((tag) => (
                          <span
                            key={tag.key}
                            className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700"
                          >
                            {tag.label} ({formatPercent(tag.percent)}%)
                          </span>
                        ))}
                      </div>

                      {resultHistory.length > 0 && (
                        <div className="mt-3 border-t border-gray-100 pt-3">
                          <div className="mb-2 flex items-center justify-end">
                            <button
                              type="button"
                              onClick={() => clearBoxResult(box.id)}
                              className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-100"
                            >
                              ล้างผล
                            </button>
                          </div>
                          <div className="space-y-3">
                            {resultHistory.map((result, historyIndex) => (
                              <div key={historyIndex}>
                                {historyIndex > 0 && (
                                  <div className="mb-3 flex items-center gap-2">
                                    <div className="h-px flex-1 bg-gray-200" />
                                    <span className="text-[11px] font-medium text-gray-400">
                                      {historyIndex === 1 ? 'ผลรอบก่อนหน้า' : 'ผลรอบก่อนๆหน้า'}
                                    </span>
                                    <div className="h-px flex-1 bg-gray-200" />
                                  </div>
                                )}
                                <div
                                  className={
                                    historyIndex === 0
                                      ? `transition-all duration-500 ${
                                          revealedIds.has(box.id)
                                            ? 'translate-y-0 opacity-100'
                                            : 'translate-y-4 opacity-0'
                                        }`
                                      : ''
                                  }
                                >
                                  {historyIndex === 0 && (
                                    <div className="mb-2">
                                      <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                                        {result.mode === 'pool-shrink' ? 'ตัดพูลจริง' : 'Reroll ถ้าซ้ำ'}
                                      </span>
                                    </div>
                                  )}
                                  <div className="flex flex-wrap gap-3">
                                    {[...result.resultItems]
                                      .sort((a, b) =>
                                        (a.group ?? '').localeCompare(b.group ?? '', 'th'),
                                      )
                                      .map((item, i) => {
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
                                              {item.rollPercent !== undefined && (
                                                <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-medium text-purple-700">
                                                  {formatPercent(item.rollPercent)}%
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
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
              })}
            </div>
          )}

          {rolling && (
            <div className="mt-8 flex justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
            </div>
          )}
        </div>
      </div>

      {showStatRoll && (
        <div className="mt-8 border-t border-gray-200 pt-8">
          <StatRollPage statRollState={statRollState} setStatRollState={setStatRollState} />
        </div>
      )}

      {rateUpBoxId &&
        (() => {
          const box = state.boxes.find((b) => b.id === rateUpBoxId)
          if (!box) return null
          return (
            <RateUpModal
              box={box}
              getBoxDisplayData={getBoxDisplayData}
              updateRateUp={updateRateUp}
              toggleRateUpGroup={toggleRateUpGroup}
              toggleRateUpItem={toggleRateUpItem}
              onClose={() => setRateUpBoxId(null)}
            />
          )
        })()}
    </div>
  )
}

function RateUpModal({
  box,
  getBoxDisplayData,
  updateRateUp,
  toggleRateUpGroup,
  toggleRateUpItem,
  onClose,
}) {
  const { rateUp, subGroups, groupPercentMap, itemPercentMap, formatPercent } =
    getBoxDisplayData(box)

  const groupTagMap = useMemo(() => {
    const map = new Map()
    for (const item of box.items) {
      const g = item.group?.trim()
      if (!g || map.has(g)) continue
      map.set(g, item.tag)
    }
    return map
  }, [box])

  const groupedItems = useMemo(() => {
    const acc = {}
    for (const item of box.items) {
      const key = item.group?.trim() || ''
      ;(acc[key] ??= []).push(item)
    }
    return Object.entries(acc).sort(([a], [b]) => {
      const ia = subGroups.findIndex((g) => g.name === a)
      const ib = subGroups.findIndex((g) => g.name === b)
      if (ia === -1 && ib === -1) return a.localeCompare(b, 'th')
      if (ia === -1) return 1
      if (ib === -1) return -1
      return ia - ib
    })
  }, [box, subGroups])

  const sectionRefs = useRef({})
  const scrollContainerRef = useRef(null)
  const [activeGroup, setActiveGroup] = useState(subGroups[0]?.name ?? null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    function updateActiveGroup() {
      const containerTop = container.getBoundingClientRect().top
      let current = null
      for (const [groupName, el] of Object.entries(sectionRefs.current)) {
        if (!el) continue
        if (el.getBoundingClientRect().top - containerTop <= 16) {
          current = groupName
        }
      }
      if (current) setActiveGroup(current)
    }

    updateActiveGroup()
    container.addEventListener('scroll', updateActiveGroup, { passive: true })
    return () => container.removeEventListener('scroll', updateActiveGroup)
  }, [groupedItems])

  function scrollToGroup(groupName) {
    sectionRefs.current[groupName]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-7xl flex-col rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h3 className="text-sm font-semibold text-gray-900">Rate Up — {box.name}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <div className="flex min-h-0 flex-1 gap-4 px-4 py-3">
          <div className="flex w-48 shrink-0 flex-col gap-3 overflow-y-auto">
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-sm text-gray-600">
                <input
                  type="radio"
                  name={`rateup-mode-${box.id}`}
                  checked={(rateUp.mode ?? 'multiplier') === 'multiplier'}
                  onChange={() => updateRateUp(box, { mode: 'multiplier' })}
                />
                ตัวคูณ
              </label>
              <label className="flex items-center gap-1.5 text-sm text-gray-600">
                <input
                  type="radio"
                  name={`rateup-mode-${box.id}`}
                  checked={rateUp.mode === 'percent'}
                  onChange={() => updateRateUp(box, { mode: 'percent' })}
                />
                ตั้ง %
              </label>
            </div>
            {(rateUp.mode ?? 'multiplier') === 'multiplier' ? (
              <label className="flex flex-col gap-1 text-sm text-gray-600">
                ตัวคูณ
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={rateUp.multiplier}
                  onChange={(e) => updateRateUp(box, { multiplier: e.target.value })}
                  className="w-20 rounded-md border border-gray-300 px-2 py-1 text-sm"
                />
              </label>
            ) : (
              <label className="flex flex-col gap-1 text-sm text-gray-600">
                รวมกันเป็น %
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={rateUp.percent}
                  onChange={(e) => updateRateUp(box, { percent: e.target.value })}
                  className="w-20 rounded-md border border-gray-300 px-2 py-1 text-sm"
                />
              </label>
            )}
            {subGroups.length > 0 && (
              <div>
                <div className="mb-1 text-xs font-medium text-gray-400">หมวดย่อย</div>
                <div className="flex flex-col gap-1">
                  {subGroups.map((g) => (
                    <button
                      key={g.name}
                      type="button"
                      onClick={() => scrollToGroup(g.name)}
                      className={`rounded px-1 py-0.5 text-left text-sm ${
                        activeGroup === g.name
                          ? 'bg-purple-100 font-medium text-purple-700'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'
                      }`}
                    >
                      {g.name}{' '}
                      {groupTagMap.get(g.name) && (
                        <span className="text-gray-400">({groupTagMap.get(g.name)})</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="mb-1 text-xs font-medium text-gray-400">ไอเทม</div>
            <div ref={scrollContainerRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto">
              {groupedItems.map(([groupName, items]) => (
                <div
                  key={groupName || '__none__'}
                  data-group={groupName}
                  ref={(el) => {
                    if (groupName) sectionRefs.current[groupName] = el
                  }}
                >
                  {groupName && (
                    <div className="mb-1 flex items-center gap-2">
                      <label className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
                        <input
                          type="checkbox"
                          checked={rateUp.groupNames.includes(groupName)}
                          onChange={() => toggleRateUpGroup(box, groupName)}
                        />
                        {groupName} ({formatPercent(groupPercentMap.get(groupName))}%)
                      </label>
                      <div className="h-px flex-1 bg-gray-200" />
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                    {items.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-center gap-1.5 text-sm text-gray-700"
                      >
                        <input
                          type="checkbox"
                          checked={rateUp.itemIds.includes(item.id)}
                          onChange={() => toggleRateUpItem(box, item.id)}
                        />
                        {item.name}{' '}
                        <span className="text-gray-400">
                          ({formatPercent(itemPercentMap.get(item.id))}%)
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end border-t border-gray-100 px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-purple-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-purple-700"
          >
            เสร็จสิ้น
          </button>
        </div>
      </div>
    </div>
  )
}
