import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchSelect from '../components/SearchSelect'
import StartingGoldModal from '../components/StartingGoldModal'
import { useGachaStore } from '../store/GachaStore'
import { useToast } from '../store/ToastContext'
import { createId } from '../utils/id'
import { STAT_KEYS } from '../utils/gachaOptions'
import {
  applyRateUp,
  calculateHierarchicalPercentages,
  getEffectiveTotalWeight,
  getUsableCount,
  rollBox,
} from '../utils/weightedRandom'

const DEFAULT_RATE_UP = { mode: 'percent', multiplier: 2, percent: 100, itemIds: [], groupNames: [] }
import StatRollPage from './StatRollPage'
import CreateCharacterModal from '../components/CreateCharacterModal'

const NO_CATEGORY = 'ไม่มีหมวดหมู่'
const ROLL_DURATION_MS = 700
const STAR_RARITY_CATEGORIES = new Set(['Species', 'Background'])

// Species/Background groups are named "<Subcategory> (***)"; rank by star count
// instead of alphabetically so rarer tiers sort in the right order.
function starRarityRank(group) {
  const match = (group ?? '').match(/\(([*]+)\)\s*$/)
  return match ? match[1].length : 0
}

function resultItemComparator(category) {
  if (STAR_RARITY_CATEGORIES.has(category)) {
    return (a, b) =>
      starRarityRank(a.group) - starRarityRank(b.group) || (a.name ?? '').localeCompare(b.name ?? '', 'th')
  }
  return (a, b) =>
    (a.group ?? '').localeCompare(b.group ?? '', 'th') || (a.name ?? '').localeCompare(b.name ?? '', 'th')
}

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
  const navigate = useNavigate()
  const [rolling, setRolling] = useState(false)
  const [rateUpBoxId, setRateUpBoxId] = useState(null)
  const [startingGoldOpen, setStartingGoldOpen] = useState(false)
  const [pickMode, setPickMode] = useState(false)
  const [pickedItems, setPickedItems] = useState({})
  const [pickedStatKeys, setPickedStatKeys] = useState(() => new Set())
  const [createCharacterOpen, setCreateCharacterOpen] = useState(false)
  const { config, boxResults, revealedIds } = rollState
  const { selectedBoxId, showStatRoll, defaultVisibilityApplied } = visibility

  function togglePickMode() {
    setPickMode((prev) => {
      if (prev) {
        setPickedItems({})
        setPickedStatKeys(new Set())
      }
      return !prev
    })
  }

  function toggleItemPick(key, payload) {
    setPickedItems((prev) => {
      const next = { ...prev }
      if (next[key]) delete next[key]
      else next[key] = payload
      return next
    })
  }

  function toggleStatKey(statKey) {
    setPickedStatKeys((prev) => {
      const next = new Set(prev)
      if (next.has(statKey)) next.delete(statKey)
      else next.add(statKey)
      return next
    })
  }

  function toggleAllStatKeys(statKeys) {
    setPickedStatKeys((prev) => {
      const allSelected = statKeys.length > 0 && statKeys.every((key) => prev.has(key))
      return allSelected ? new Set() : new Set(statKeys)
    })
  }

  const pickCount = Object.keys(pickedItems).length + pickedStatKeys.size

  function finalStatScore(statKey) {
    const resultId = statRollState.assignments?.[statKey]
    if (!resultId) return null
    const result = (statRollState.results ?? []).find((r) => r.id === resultId)
    if (!result) return null
    const base = result.total
    const bonus = statRollState.bonuses?.[statKey] ?? 0
    return Math.min(20, base + bonus)
  }

  function buildPicksSummary() {
    const picks = Object.values(pickedItems)
    const classLevels = picks
      .filter((p) => p.category === 'Classes')
      .map((p) => ({ id: createId('classlevel'), className: p.item.group || '', subclassName: p.item.name, level: 1 }))
    const species = picks.find((p) => p.category === 'Species')?.item.name
    const background = picks.find((p) => p.category === 'Background')?.item.name
    const otherNames = picks
      .filter((p) => !['Classes', 'Species', 'Background'].includes(p.category))
      .map((p) => p.item.name)
    const stats = {}
    for (const key of pickedStatKeys) {
      const score = finalStatScore(key)
      if (score !== null) stats[key] = score
    }
    return { classLevels, species, background, otherNames, stats }
  }

  function handleCreateCharacterConfirm({ mode, characterId }) {
    const { classLevels, species, background, otherNames, stats } = buildPicksSummary()

    if (mode === 'existing') {
      const target = (state.characters ?? []).find((c) => c.id === characterId)
      if (!target) return
      const patch = {}
      if (classLevels.length > 0) patch.classLevels = classLevels
      if (species) patch.species = species
      if (background) patch.background = background
      if (Object.keys(stats).length > 0) patch.stats = { ...target.stats, ...stats }
      if (otherNames.length > 0) patch.equipment = [...(target.equipment ?? []), ...otherNames]
      dispatch({ type: 'UPDATE_CHARACTER', payload: { id: target.id, patch } })
      showToast(`อัปเดตข้อมูลไปยัง "${target.name || '(ไม่มีชื่อ)'}" แล้ว`, 'success')
    } else {
      const prefillCharacter = {}
      if (classLevels.length > 0) prefillCharacter.classLevels = classLevels
      if (species) prefillCharacter.species = species
      if (background) prefillCharacter.background = background
      if (Object.keys(stats).length > 0) {
        prefillCharacter.stats = STAT_KEYS.reduce((acc, s) => ({ ...acc, [s.key]: stats[s.key] ?? 0 }), {})
      }
      if (otherNames.length > 0) prefillCharacter.equipment = otherNames
      navigate('/characters', { state: { prefillCharacter } })
    }

    setCreateCharacterOpen(false)
    setPickMode(false)
    setPickedItems({})
    setPickedStatKeys(new Set())
  }

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
    const entries = Array.from(map.entries())
    const getPriority = (cat) => {
      const norm = cat.toLowerCase()
      if (norm.includes('class')) return 1
      if (norm.includes('species')) return 2
      if (norm.includes('background')) return 3
      return 4
    }
    return entries.sort((a, b) => {
      const pA = getPriority(a[0])
      const pB = getPriority(b[0])
      if (pA !== pB) return pA - pB
      return a[0].localeCompare(b[0], 'th')
    })
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
    <div className="w-full p-4 md:p-8">
      {/* Box selector + manage link */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1 rounded-xl border border-[#e2cfb3] bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-6">
            {grouped.map(([category, boxes]) => (
              <div key={category}>
                <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wide text-stone-400">
                  {category}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {boxes.map((box) => (
                    <button
                      key={box.id}
                      type="button"
                      onClick={() => selectBox(category, box.id)}
                      className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-150 ${isBoxVisible(category, box.id)
                          ? 'bg-violet-700 text-white shadow-sm'
                          : 'border border-[#e2cfb3] bg-[#fdf8f0] text-stone-600 hover:bg-[#f5ede0]'
                        }`}
                    >
                      {box.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="border-l border-[#e2cfb3] pl-6">
              <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wide text-stone-400">แสดง/ซ่อน</div>
              <button
                type="button"
                onClick={toggleStatRollVisible}
                title={showStatRoll ? 'ซ่อนส่วนสุ่มค่าพลัง' : 'แสดงส่วนสุ่มค่าพลัง'}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-150 ${showStatRoll
                    ? 'border border-violet-200 bg-violet-50 text-violet-700'
                    : 'border border-dashed border-[#e2cfb3] bg-[#fdf8f0] text-stone-500 hover:bg-[#f5ede0]'
                  }`}
              >
                <span aria-hidden>{showStatRoll ? '👁️' : '🙈'}</span>
                สุ่มค่าพลัง (4d6)
              </button>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <Link
            to="/boxes"
            className="rounded-lg border border-[#e2cfb3] bg-white px-3 py-2 text-center text-sm font-medium text-stone-700 shadow-sm hover:bg-[#f5ede0]"
          >
            จัดการตู้สุ่ม
          </Link>
          <button
            type="button"
            onClick={() => setStartingGoldOpen(true)}
            className="rounded-lg border border-[#e2cfb3] bg-white px-3 py-2 text-sm font-medium text-stone-700 shadow-sm hover:bg-[#f5ede0]"
          >
            💰 คำนวณเงินเริ่มต้น
          </button>
          <button
            type="button"
            disabled={pickMode}
            onClick={() => {
              if (!pickMode) togglePickMode()
            }}
            className={`rounded-lg px-3 py-2 text-sm font-medium shadow-sm transition-colors ${pickMode
                ? 'cursor-not-allowed bg-violet-700 text-white'
                : 'border border-[#e2cfb3] bg-white text-stone-700 hover:bg-[#f5ede0]'
              }`}
          >
            🧬 สร้างตัวละคร
          </button>
        </div>
      </div>

      {pickMode && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3">
          <p className="text-sm text-violet-800">
            ติ๊กเลือกไอเทมที่สุ่มได้ (เลือกจากรอบไหนก็ได้) และ/หรือค่าพลังที่ลงแล้วด้านล่าง แล้วกด &quot;ดำเนินการต่อ&quot;
            {pickCount > 0 && <span className="ml-1 font-semibold">(เลือกแล้ว {pickCount} รายการ)</span>}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={togglePickMode}
              className="rounded-lg border border-violet-300 bg-white px-3 py-1.5 text-sm font-medium text-violet-700 hover:bg-violet-100"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              disabled={pickCount === 0}
              onClick={() => setCreateCharacterOpen(true)}
              className="rounded-lg bg-violet-700 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-violet-800 disabled:cursor-not-allowed disabled:bg-stone-300"
            >
              ดำเนินการต่อ
            </button>
          </div>
        </div>
      )}

      <StartingGoldModal open={startingGoldOpen} onClose={() => setStartingGoldOpen(false)} />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          {state.boxes.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#e2cfb3] bg-white p-12 text-center">
              <p className="font-cinzel text-sm text-stone-400">ยังไม่มีตู้สุ่ม</p>
              <p className="mt-1 text-xs text-stone-400">ไปที่หน้า &quot;จัดการตู้สุ่ม&quot; เพื่อสร้างตู้ก่อน</p>
            </div>
          ) : visibleGrouped.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#e2cfb3] bg-white p-12 text-center">
              <p className="text-sm text-stone-400">ยังไม่ได้เลือกตู้ที่จะแสดง เลือกด้านบนก่อน</p>
            </div>
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
                    className="rounded-xl border border-[#e2cfb3] bg-white p-4 shadow-sm"
                  >
                    {/* Card header */}
                    <p className="font-cinzel mb-0.5 text-[10px] uppercase tracking-widest text-amber-700">
                      {category}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold text-stone-900">{box.name}</h2>
                      <span className="rounded-full bg-[#f5ede0] px-2 py-0.5 text-[10px] font-medium text-stone-500">
                        {rollItems.length} รายการ
                      </span>
                      {totalWeight === 0 && (
                        <span className="text-xs font-medium text-amber-700">
                          ⚠ weight รวมเป็น 0
                        </span>
                      )}
                      {box.items.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setRateUpBoxId(box.id)}
                          className="ml-auto rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700 transition-colors hover:bg-violet-100"
                        >
                          Rate Up{' '}
                          {(rateUp.itemIds.length > 0 || rateUp.groupNames.length > 0) && (
                            <span className="ml-1 rounded-full bg-violet-700 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                              {rateUp.mode === 'percent' ? `${rateUp.percent}%` : `x${rateUp.multiplier}`}
                            </span>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Controls */}
                    <div className="mt-3 flex flex-wrap gap-3">
                      <label className="flex flex-col gap-1 text-xs text-stone-500">
                        จำนวนครั้ง
                        <input
                          type="number"
                          min="1"
                          value={count}
                          onChange={(e) => updateConfig(box, { count: e.target.value })}
                          className="w-20 rounded-lg border border-[#e2cfb3] bg-[#fdf8f0] px-2 py-1.5 text-sm text-stone-900 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-300"
                        />
                      </label>
                      <label className="flex flex-col gap-1 text-xs text-stone-500">
                        โหมดกันซ้ำ
                        <select
                          value={mode}
                          onChange={(e) => updateConfig(box, { mode: e.target.value })}
                          className="rounded-lg border border-[#e2cfb3] bg-[#fdf8f0] px-2 py-1.5 text-sm text-stone-900 focus:border-violet-400 focus:outline-none"
                        >
                          <option value="reroll">Reroll ถ้าซ้ำ</option>
                          <option value="pool-shrink">ตัดพูลจริง</option>
                        </select>
                      </label>
                    </div>

                    {subGroups.length > 0 && (
                      <div className="mt-3 flex flex-col gap-1.5">
                        <div className="flex flex-col gap-1 text-xs text-stone-500">
                          หมวดย่อย
                          <SearchSelect
                            options={subGroups.map((g) => ({ value: g.name, label: g.name }))}
                            value={group}
                            onChange={(v) => updateConfig(box, { group: v })}
                            placeholder="ทั้งหมด"
                            clearLabel="ล้าง"
                          />
                        </div>
                        {!group && (
                          <label className="flex items-center gap-1.5 text-xs text-stone-600">
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

                    {/* Roll button */}
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        disabled={rolling || totalWeight === 0}
                        onClick={() => handleRollSingle(box)}
                        className="rounded-xl bg-violet-700 px-6 py-3 text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-violet-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 animate-pulse-glow"
                      >
                        {rolling ? '🎲 กำลังสุ่ม...' : '🎲 สุ่มตู้นี้เลย'}
                      </button>
                      {rateUpTags.map((tag) => (
                        <span
                          key={tag.key}
                          className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800"
                        >
                          ⬆ {tag.label} ({formatPercent(tag.percent)}%)
                        </span>
                      ))}
                    </div>

                    {/* Results */}
                    {resultHistory.length > 0 && (
                      <div className="mt-4 border-t border-[#e2cfb3] pt-4">
                        <div className="mb-2 flex items-center justify-between">
                          <p className="font-cinzel text-[10px] uppercase tracking-widest text-amber-700">ผลลัพธ์</p>
                          <button
                            type="button"
                            onClick={() => clearBoxResult(box.id)}
                            className="rounded-lg border border-[#e2cfb3] px-2 py-1 text-xs text-stone-500 hover:bg-[#f5ede0]"
                          >
                            ล้างผล
                          </button>
                        </div>
                        <div className="space-y-4">
                          {resultHistory.map((result, historyIndex) => (
                            <div key={historyIndex}>
                              {historyIndex > 0 && (
                                <div className="mb-3 flex items-center gap-2">
                                  <div className="h-px flex-1 bg-[#e2cfb3]" />
                                  <span className="text-[10px] font-medium text-stone-400">
                                    {historyIndex === 1 ? 'รอบก่อนหน้า' : 'รอบก่อนๆ'}
                                  </span>
                                  <div className="h-px flex-1 bg-[#e2cfb3]" />
                                </div>
                              )}
                              <div
                                className={
                                  historyIndex === 0
                                    ? `transition-all duration-500 ${revealedIds.has(box.id)
                                      ? 'translate-y-0 opacity-100'
                                      : 'translate-y-4 opacity-0'
                                    }`
                                    : ''
                                }
                              >
                                {historyIndex === 0 && (
                                  <div className="mb-2">
                                    <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-medium text-violet-700">
                                      {result.mode === 'pool-shrink' ? 'ตัดพูลจริง' : 'Reroll ถ้าซ้ำ'}
                                    </span>
                                  </div>
                                )}
                                <div className="flex flex-wrap gap-2">
                                  {[...result.resultItems]
                                    .sort(resultItemComparator(category))
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
                                      const pickKey = `${box.id}:${historyIndex}:${item.id}:${i}`
                                      const showPickCheckbox = pickMode
                                      const pickCheckbox = showPickCheckbox && (
                                        <input
                                          type="checkbox"
                                          checked={!!pickedItems[pickKey]}
                                          onChange={() =>
                                            toggleItemPick(pickKey, { category, boxId: box.id, boxName: box.name, item })
                                          }
                                          className="h-4 w-4 shrink-0 accent-violet-700"
                                        />
                                      )
                                      const cardEl = (
                                        <Wrapper
                                          key={showPickCheckbox ? undefined : i}
                                          {...wrapperProps}
                                          className="animate-fade-in-up flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 transition-shadow hover:shadow-sm"
                                          style={{
                                            animationDelay: historyIndex === 0 ? `${i * 60}ms` : '0ms',
                                            opacity: historyIndex === 0 ? 0 : 1,
                                            animationFillMode: 'forwards',
                                          }}
                                        >
                                          {item.image && (
                                            <img
                                              src={item.image}
                                              alt=""
                                              className="h-8 w-8 rounded-md object-cover"
                                            />
                                          )}
                                          <div>
                                            <div className="flex flex-wrap items-center gap-1.5">
                                              <span
                                                className={`text-sm font-semibold ${item.link ? 'text-violet-700 underline' : 'text-stone-900'
                                                  }`}
                                              >
                                                {item.name}
                                              </span>
                                              {item.group && (
                                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800">
                                                  {item.group}
                                                </span>
                                              )}
                                              {item.rollPercent !== undefined && (
                                                <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-medium text-violet-700">
                                                  {formatPercent(item.rollPercent)}%
                                                </span>
                                              )}
                                            </div>
                                            {item.tag && (
                                              <div className="text-xs text-stone-500">{item.tag}</div>
                                            )}
                                            {item.note && (
                                              <div className="text-xs text-stone-400">{item.note}</div>
                                            )}
                                          </div>
                                        </Wrapper>
                                      )
                                      if (!showPickCheckbox) return cardEl
                                      return (
                                        <label key={i} className="flex items-center gap-1.5">
                                          {pickCheckbox}
                                          {cardEl}
                                        </label>
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
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#e2cfb3] border-t-violet-700" />
            </div>
          )}
        </div>
      </div>

      {showStatRoll && (
        <div className="mt-8 border-t border-[#e2cfb3] pt-8">
          <StatRollPage
            statRollState={statRollState}
            setStatRollState={setStatRollState}
            pickMode={pickMode}
            pickedStatKeys={pickedStatKeys}
            onToggleStatKey={toggleStatKey}
            onToggleAllStatKeys={toggleAllStatKeys}
          />
        </div>
      )}

      {createCharacterOpen && (
        <CreateCharacterModal
          characters={state.characters ?? []}
          pickCount={pickCount}
          onCancel={() => setCreateCharacterOpen(false)}
          onConfirm={handleCreateCharacterConfirm}
        />
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
        ; (acc[key] ??= []).push(item)
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div
        className="flex max-h-[88vh] w-full max-w-7xl flex-col rounded-xl border border-[#e2cfb3] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e2cfb3] bg-[#fdf8f0] px-5 py-3.5 rounded-t-xl">
          <div>
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-amber-700">Rate Up</p>
            <h3 className="text-sm font-semibold text-stone-900">{box.name}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-[#f5ede0] hover:text-stone-700"
          >
            ✕
          </button>
        </div>
        <div className="flex min-h-0 flex-1 gap-0">
          {/* Sidebar */}
          <div className="flex w-52 shrink-0 flex-col gap-4 overflow-y-auto border-r border-[#e2cfb3] bg-[#fdf8f0] px-4 py-4">
            <div>
              <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-stone-400">โหมด</p>
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-2 text-sm text-stone-700">
                  <input
                    type="radio"
                    name={`rateup-mode-${box.id}`}
                    checked={(rateUp.mode ?? 'multiplier') === 'multiplier'}
                    onChange={() => updateRateUp(box, { mode: 'multiplier' })}
                  />
                  ตัวคูณ
                </label>
                <label className="flex items-center gap-2 text-sm text-stone-700">
                  <input
                    type="radio"
                    name={`rateup-mode-${box.id}`}
                    checked={rateUp.mode === 'percent'}
                    onChange={() => updateRateUp(box, { mode: 'percent' })}
                  />
                  ตั้ง %
                </label>
              </div>
            </div>
            {(rateUp.mode ?? 'multiplier') === 'multiplier' ? (
              <label className="flex flex-col gap-1 text-xs text-stone-500">
                ตัวคูณ
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={rateUp.multiplier}
                  onChange={(e) => updateRateUp(box, { multiplier: e.target.value })}
                  className="w-20 rounded-lg border border-[#e2cfb3] bg-white px-2 py-1.5 text-sm text-stone-900 focus:border-violet-400 focus:outline-none"
                />
              </label>
            ) : (
              <label className="flex flex-col gap-1 text-xs text-stone-500">
                รวมกันเป็น %
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={rateUp.percent}
                  onChange={(e) => updateRateUp(box, { percent: e.target.value })}
                  className="w-20 rounded-lg border border-[#e2cfb3] bg-white px-2 py-1.5 text-sm text-stone-900 focus:border-violet-400 focus:outline-none"
                />
              </label>
            )}
            {subGroups.length > 0 && (
              <div>
                <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wide text-stone-400">หมวดย่อย</p>
                <div className="flex flex-col gap-0.5">
                  {subGroups.map((g) => (
                    <button
                      key={g.name}
                      type="button"
                      onClick={() => scrollToGroup(g.name)}
                      className={`rounded-lg px-2 py-1 text-left text-sm transition-colors ${activeGroup === g.name
                          ? 'bg-violet-100 font-medium text-violet-700'
                          : 'text-stone-700 hover:bg-[#f5ede0] hover:text-violet-700'
                        }`}
                    >
                      {g.name}{' '}
                      {groupTagMap.get(g.name) && (
                        <span className="text-stone-400">({groupTagMap.get(g.name)})</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Items list */}
          <div className="flex min-w-0 flex-1 flex-col px-5 py-4">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-stone-400">ไอเทม</p>
            <div ref={scrollContainerRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto">
              {groupedItems.map(([groupName, items]) => (
                <div
                  key={groupName || '__none__'}
                  data-group={groupName}
                  ref={(el) => {
                    if (groupName) sectionRefs.current[groupName] = el
                  }}
                >
                  {groupName && (
                    <div className="mb-2 flex items-center gap-2">
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-500">
                        <input
                          type="checkbox"
                          checked={rateUp.groupNames.includes(groupName)}
                          onChange={() => toggleRateUpGroup(box, groupName)}
                        />
                        {groupName} <span className="text-amber-700">({formatPercent(groupPercentMap.get(groupName))}%)</span>
                      </label>
                      <div className="h-px flex-1 bg-[#e2cfb3]" />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-3">
                    {items.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-center gap-1.5 text-sm text-stone-700 hover:text-stone-900"
                      >
                        <input
                          type="checkbox"
                          checked={rateUp.itemIds.includes(item.id)}
                          onChange={() => toggleRateUpItem(box, item.id)}
                        />
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={item.link}
                            onClick={(e) => e.stopPropagation()}
                            className="text-violet-700 underline hover:text-violet-900"
                          >
                            {item.name}
                          </a>
                        ) : (
                          item.name
                        )}{' '}
                        <span className="text-stone-400">
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
        <div className="flex justify-end rounded-b-xl border-t border-[#e2cfb3] bg-[#fdf8f0] px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-violet-700 px-4 py-2 text-sm font-medium text-white hover:bg-violet-800"
          >
            เสร็จสิ้น
          </button>
        </div>
      </div>
    </div>
  )
}
