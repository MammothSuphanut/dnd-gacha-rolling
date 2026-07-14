export const SIZE_OPTIONS = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan']

export const STAT_KEYS = [
  { key: 'str', label: 'STR' },
  { key: 'dex', label: 'DEX' },
  { key: 'con', label: 'CON' },
  { key: 'int', label: 'INT' },
  { key: 'wis', label: 'WIS' },
  { key: 'cha', label: 'CHA' },
]

function collectNamesByCategory(boxes, category) {
  const set = new Set()
  for (const box of boxes ?? []) {
    if (box.category?.trim() !== category) continue
    for (const item of box.items ?? []) {
      if (item.name) set.add(item.name)
    }
  }
  return [...set].sort((a, b) => a.localeCompare(b))
}

// Class/subclass items are identified by box category Classes;
// the item's group is the class name and its name is the subclass name.
export function getClassSubclassOptions(boxes) {
  const map = new Map()
  for (const box of boxes ?? []) {
    if (box.category?.trim() !== 'Classes') continue
    for (const item of box.items ?? []) {
      if (!item.group) continue
      if (!map.has(item.group)) map.set(item.group, new Set())
      map.get(item.group).add(item.name)
    }
  }
  const classes = [...map.keys()].sort((a, b) => a.localeCompare(b))
  const subclassesByClass = {}
  for (const [cls, set] of map) {
    subclassesByClass[cls] = [...set].sort((a, b) => a.localeCompare(b))
  }
  return { classes, subclassesByClass }
}

export function getSpeciesOptions(boxes) {
  return collectNamesByCategory(boxes, 'Species')
}

export function getBackgroundOptions(boxes) {
  return collectNamesByCategory(boxes, 'Background')
}
