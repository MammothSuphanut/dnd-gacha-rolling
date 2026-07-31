// Continent detail maps (e.g. Wildemount.jpg) don't have their own plotted
// pin coordinates yet — only the world overview map does. To show something
// reasonable on a detail map immediately, we take the bounding box of a
// continent's existing overview pins and project it onto the detail image
// with a single uniform scale (preserving the landmass's real proportions)
// centered in the image, rather than independently stretching x and y to
// fill every edge (which warps the shape to match the bbox's own aspect
// ratio). It's an approximation, not a real re-projection, but it's a much
// better starting point than no pin at all — explicit card.detailPin
// overrides (set by dragging in edit mode) always win.
const MARGIN = 8

export function getPinBounds(points) {
  if (!points.length) return null
  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) }
}

export function projectPoint(point, bounds, margin = MARGIN) {
  if (!bounds) return point
  const spanX = bounds.maxX - bounds.minX || 1
  const spanY = bounds.maxY - bounds.minY || 1
  const range = 100 - margin * 2
  // A single uniform scale (not independent per axis) so the landmass keeps
  // its real proportions on the detail map instead of getting stretched
  // into whatever aspect ratio the bounding box happens to have — the more
  // "cramped" axis sets the scale, and the pin cloud is centered around the
  // detail image's middle rather than corner-stretched to fill every edge.
  const scale = Math.min(range / spanX, range / spanY)
  const centerX = (bounds.minX + bounds.maxX) / 2
  const centerY = (bounds.minY + bounds.maxY) / 2
  return {
    x: 50 + (point.x - centerX) * scale,
    y: 50 + (point.y - centerY) * scale,
  }
}

export function isWithinBounds(point, bounds) {
  if (!bounds) return false
  return point.x >= bounds.minX && point.x <= bounds.maxX && point.y >= bounds.minY && point.y <= bounds.maxY
}
