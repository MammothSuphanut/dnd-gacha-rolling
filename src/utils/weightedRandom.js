/**
 * Items can either stand alone (weighted against everything else by their own
 * `weight`) or belong to a named group (`item.group` matching a `groups[].name`).
 * A group's `weight` sets its overall share of the box; items inside that group
 * then split that share proportionally to their own `weight` (equally if every
 * item in the group has zero weight).
 */
function getTotalBucketWeight(items, groups) {
  const groupWeightMap = new Map(groups.map((g) => [g.name, Math.max(Number(g.weight) || 0, 0)]))
  const seenGroups = new Set()
  let total = 0
  for (const item of items) {
    const gname = item.group?.trim()
    if (gname && groupWeightMap.has(gname)) {
      if (!seenGroups.has(gname)) {
        seenGroups.add(gname)
        total += groupWeightMap.get(gname)
      }
    } else {
      total += Math.max(Number(item.weight) || 0, 0)
    }
  }
  return total
}

export function getEffectiveTotalWeight(items, groups = []) {
  return getTotalBucketWeight(items, groups)
}

export function calculateHierarchicalPercentages(items, groups = []) {
  const groupWeightMap = new Map(groups.map((g) => [g.name, Math.max(Number(g.weight) || 0, 0)]))
  const groupCounts = new Map()
  const groupItemWeightSums = new Map()
  for (const item of items) {
    const gname = item.group?.trim()
    if (gname && groupWeightMap.has(gname)) {
      groupCounts.set(gname, (groupCounts.get(gname) || 0) + 1)
      const w = Math.max(Number(item.weight) || 0, 0)
      groupItemWeightSums.set(gname, (groupItemWeightSums.get(gname) || 0) + w)
    }
  }
  const total = getTotalBucketWeight(items, groups)

  return items.map((item) => {
    const gname = item.group?.trim()
    if (gname && groupWeightMap.has(gname)) {
      const groupWeight = groupWeightMap.get(gname)
      const groupPercent = total > 0 ? (groupWeight / total) * 100 : 0
      const weightSum = groupItemWeightSums.get(gname) || 0
      const w = Math.max(Number(item.weight) || 0, 0)
      const share = weightSum > 0 ? w / weightSum : 1 / (groupCounts.get(gname) || 1)
      return { ...item, percent: groupPercent * share }
    }
    const w = Math.max(Number(item.weight) || 0, 0)
    return { ...item, percent: total > 0 ? (w / total) * 100 : 0 }
  })
}

/**
 * Multiplies the weight of chosen items and/or chosen subgroups by `multiplier`
 * before odds are computed, letting a specific item or an entire subcategory
 * be "rate up"-ed for a single roll without touching the stored box data.
 *
 * `rateUp.mode === 'percent'` switches to a target-share mode: instead of a
 * fixed multiplier, the chosen items/groups are scaled so their combined
 * share of the total weight equals `rateUp.percent`% (everything else keeps
 * its relative proportions and splits the remainder).
 *
 * An item inside a subgroup can never out-earn its subgroup's own share of
 * the pool by boosting the item's weight alone (the subgroup's weight is a
 * separate, fixed bucket) — so in percent mode, selecting an item implicitly
 * also lifts its subgroup's bucket weight, while a large in-group dominance
 * factor makes that item claim (almost) all of the subgroup's raised share.
 */
export function applyRateUp(items, groups, rateUp) {
  const itemIds = rateUp?.itemIds ?? []
  const groupNames = rateUp?.groupNames ?? []
  if (itemIds.length === 0 && groupNames.length === 0) {
    return { items, groups }
  }
  const itemIdSet = new Set(itemIds)
  const groupNameSet = new Set(groupNames)
  const groupByName = new Map(groups.map((g) => [g.name, g]))
  const isPercentMode = rateUp?.mode === 'percent'

  if (!isPercentMode) {
    const multiplier = Math.max(Number(rateUp?.multiplier) || 1, 0)
    if (multiplier === 1) return { items, groups }
    const boostedItems = items.map((item) =>
      itemIdSet.has(item.id)
        ? { ...item, weight: Math.max(Number(item.weight) || 0, 0) * multiplier }
        : item,
    )
    const boostedGroups = groups.map((g) =>
      groupNameSet.has(g.name)
        ? { ...g, weight: Math.max(Number(g.weight) || 0, 0) * multiplier }
        : g,
    )
    return { items: boostedItems, groups: boostedGroups }
  }

  // Any subgroup that contains an individually selected item is implicitly
  // treated as a selected bucket too, so its weight can be lifted enough for
  // that item to actually reach the target share.
  const impliedGroupNames = new Set(groupNames)
  for (const item of items) {
    const gname = item.group?.trim()
    if (itemIdSet.has(item.id) && gname && groupByName.has(gname)) {
      impliedGroupNames.add(gname)
    }
  }
  const standaloneSelectedWeight = items
    .filter((item) => itemIdSet.has(item.id) && !groupByName.has(item.group?.trim()))
    .reduce((sum, item) => sum + Math.max(Number(item.weight) || 0, 0), 0)
  const selectedGroupWeight = Array.from(impliedGroupNames).reduce(
    (sum, name) => sum + Math.max(Number(groupByName.get(name)?.weight) || 0, 0),
    0,
  )
  const selectedWeight = standaloneSelectedWeight + selectedGroupWeight

  const targetFraction = Math.min(Math.max(Number(rateUp?.percent) || 0, 0), 99.9999) / 100
  const totalWeight = getTotalBucketWeight(items, groups)
  const otherWeight = totalWeight - selectedWeight
  let multiplier = 1
  if (selectedWeight > 0 && targetFraction > 0 && otherWeight > 0) {
    const targetSelectedWeight = (targetFraction / (1 - targetFraction)) * otherWeight
    multiplier = targetSelectedWeight / selectedWeight
  }
  // Large enough to dominate any realistic sibling weight sum within a group.
  const dominanceFactor = 1e6

  const boostedItems = items.map((item) => {
    if (!itemIdSet.has(item.id)) return item
    const gname = item.group?.trim()
    const factor = gname && groupByName.has(gname) ? dominanceFactor : multiplier
    return { ...item, weight: Math.max(Number(item.weight) || 0, 0) * factor }
  })
  const boostedGroups = groups.map((g) =>
    impliedGroupNames.has(g.name)
      ? { ...g, weight: Math.max(Number(g.weight) || 0, 0) * multiplier }
      : g,
  )
  return { items: boostedItems, groups: boostedGroups }
}

function pickOne(pool) {
  const total = pool.reduce((sum, item) => sum + item.weight, 0)
  let rand = Math.random() * total
  for (const item of pool) {
    rand -= item.weight
    if (rand <= 0) return item
  }
  return pool[pool.length - 1]
}

/**
 * Number of picks achievable under the given constraints: one item per
 * duplicate-blocking bucket. Without group dedup, the bucket is the item
 * itself; with it, items sharing a subcategory group count as one bucket.
 */
export function getUsableCount(items, groups = [], noDuplicateGroup = false) {
  const usable = calculateHierarchicalPercentages(items, groups).filter((i) => i.percent > 0)
  if (!noDuplicateGroup) return usable.length
  const buckets = new Set(usable.map((item) => item.group?.trim() || item.id))
  return buckets.size
}

/**
 * Rolls a box `count` times without repeating an item within the same round.
 * mode "pool-shrink": remove picked items from the pool before recalculating odds.
 * mode "reroll": keep the original odds every time, but re-roll on a duplicate.
 * `noDuplicateGroup`: also treat items sharing a subcategory group as a
 * duplicate, so at most one item per group is picked (reroll/shrink accordingly).
 */
export function rollBox(items, count, mode, groups = [], { noDuplicateGroup = false } = {}) {
  const byId = new Map(items.map((item) => [item.id, item]))
  const itemGroup = (id) => byId.get(id)?.group?.trim() || null

  function computePool(currentItems) {
    return calculateHierarchicalPercentages(currentItems, groups)
      .filter((item) => item.percent > 0)
      .map((item) => ({ id: item.id, weight: item.percent }))
  }

  if (mode === 'pool-shrink') {
    let remaining = items.slice()
    const results = []
    const times = Math.min(count, getUsableCount(remaining, groups, noDuplicateGroup))
    for (let i = 0; i < times; i++) {
      const pool = computePool(remaining)
      if (pool.length === 0) break
      const picked = pickOne(pool)
      const group = itemGroup(picked.id)
      results.push(byId.get(picked.id))
      remaining =
        noDuplicateGroup && group
          ? remaining.filter((item) => (item.group?.trim() || null) !== group)
          : remaining.filter((item) => item.id !== picked.id)
    }
    return results
  }

  const pool = computePool(items)
  if (pool.length === 0) return []
  const times = Math.min(count, getUsableCount(items, groups, noDuplicateGroup))
  const results = []
  const seenIds = new Set()
  const seenGroups = new Set()
  for (let i = 0; i < times; i++) {
    let picked
    let guard = 0
    let group
    do {
      picked = pickOne(pool)
      group = itemGroup(picked.id)
      guard++
    } while (
      guard < 10000 &&
      (seenIds.has(picked.id) || (noDuplicateGroup && group && seenGroups.has(group)))
    )
    seenIds.add(picked.id)
    if (group) seenGroups.add(group)
    results.push(byId.get(picked.id))
  }
  return results
}
