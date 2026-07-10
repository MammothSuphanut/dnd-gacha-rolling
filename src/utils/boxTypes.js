export const BOX_TYPES = [
  { value: 'class', label: 'Classes' },
  { value: 'species', label: 'Species' },
  { value: 'background', label: 'Backgrounds' },
]

function matchBoxType(category) {
  const normalized = category?.trim().toLowerCase()
  if (!normalized) return null
  return BOX_TYPES.find((t) => t.value === normalized || t.label.toLowerCase() === normalized) ?? null
}

export function getBoxTypeLabel(category) {
  return matchBoxType(category)?.label ?? category?.trim() ?? ''
}

const BADGE_CLASSES = {
  class: 'bg-blue-100 text-blue-800',
  species: 'bg-green-100 text-green-800',
  background: 'bg-amber-100 text-amber-800',
}

export function getBoxTypeBadgeClass(category) {
  const matched = matchBoxType(category)
  return matched ? BADGE_CLASSES[matched.value] : 'bg-gray-100 text-gray-600'
}
