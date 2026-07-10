/**
 * Items can either stand alone (weighted against everything else by their own
 * `weight`) or belong to a named group (`item.group` matching a `groups[].name`).
 * A group's `weight` sets its overall share of the box; every item inside that
 * group then splits that share equally, regardless of the item's own weight.
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
  for (const item of items) {
    const gname = item.group?.trim()
    if (gname && groupWeightMap.has(gname)) {
      groupCounts.set(gname, (groupCounts.get(gname) || 0) + 1)
    }
  }
  const total = getTotalBucketWeight(items, groups)

  return items.map((item) => {
    const gname = item.group?.trim()
    if (gname && groupWeightMap.has(gname)) {
      const groupWeight = groupWeightMap.get(gname)
      const groupPercent = total > 0 ? (groupWeight / total) * 100 : 0
      const count = groupCounts.get(gname) || 1
      return { ...item, percent: groupPercent / count }
    }
    const w = Math.max(Number(item.weight) || 0, 0)
    return { ...item, percent: total > 0 ? (w / total) * 100 : 0 }
  })
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
 * Rolls a box `count` times without repeating an item within the same round.
 * mode "pool-shrink": remove picked items from the pool before recalculating odds.
 * mode "reroll": keep the original odds every time, but re-roll on a duplicate.
 */
export function rollBox(items, count, mode, groups = []) {
  const byId = new Map(items.map((item) => [item.id, item]))

  function computePool(currentItems) {
    return calculateHierarchicalPercentages(currentItems, groups)
      .filter((item) => item.percent > 0)
      .map((item) => ({ id: item.id, weight: item.percent }))
  }

  if (mode === 'pool-shrink') {
    let remaining = items.slice()
    const results = []
    const times = Math.min(count, computePool(remaining).length)
    for (let i = 0; i < times; i++) {
      const pool = computePool(remaining)
      if (pool.length === 0) break
      const picked = pickOne(pool)
      results.push(byId.get(picked.id))
      remaining = remaining.filter((item) => item.id !== picked.id)
    }
    return results
  }

  const pool = computePool(items)
  if (pool.length === 0) return []
  const times = Math.min(count, pool.length)
  const results = []
  const seenIds = new Set()
  for (let i = 0; i < times; i++) {
    let picked
    let guard = 0
    do {
      picked = pickOne(pool)
      guard++
    } while (seenIds.has(picked.id) && guard < 10000)
    seenIds.add(picked.id)
    results.push(byId.get(picked.id))
  }
  return results
}
