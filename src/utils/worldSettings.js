// World Setting reference content (e.g. Exandria) — static lore browsed
// read-only in the World tab. Each world is a manifest.json (metadata: name,
// categories, and card list) plus one markdown file per card holding the
// full detail shown in the card's modal. Mirrors the adventures/ + import.meta.glob
// pattern used by adventureJournals.js.
const manifestFiles = import.meta.glob('/world-settings/*/manifest.json', {
  import: 'default',
  eager: true,
})

const mdFiles = import.meta.glob('/world-settings/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

// World map images mostly live under world-settings/ next to their manifest,
// but a few older worlds still point at campaign map assets under
// adventures/ (e.g. adventures/aeorian-cataclysm/Exandria.jpeg) — both glob
// patterns feed the same lookup table so either mapImage path resolves.
const mapImageFiles = {
  ...import.meta.glob('/adventures/**/*.{jpg,jpeg,png,webp}', { import: 'default', eager: true }),
  ...import.meta.glob('/world-settings/**/*.{jpg,jpeg,png,webp}', { import: 'default', eager: true }),
}

// A continent/region category can declare its own detail map (e.g.
// Wildemount's own hi-res image) instead of only appearing as a pin on the
// world's overview map — resolved through the same lookup table as mapImage.
function resolveCategories(categories) {
  return (categories ?? []).map((category) => ({
    ...category,
    map: category.map?.image ? { ...category.map, image: mapImageFiles[category.map.image] ?? null } : null,
  }))
}

function buildWorlds() {
  const worlds = []
  for (const manifest of Object.values(manifestFiles)) {
    const cards = (manifest.cards ?? []).map((card) => ({
      ...card,
      content: mdFiles[card.contentPath] ?? null,
    }))
    worlds.push({
      id: manifest.id,
      name: manifest.name,
      source: manifest.source,
      mapImage: manifest.mapImage ? mapImageFiles[manifest.mapImage] ?? null : null,
      categories: resolveCategories(manifest.categories),
      cards,
      partyPins: manifest.partyPins ?? [],
    })
  }
  return worlds.sort((a, b) => a.name.localeCompare(b.name))
}

const worlds = buildWorlds()

export function getWorldSettings() {
  return worlds
}

export function getWorldSetting(id) {
  return worlds.find((world) => world.id === id) ?? null
}

// The untouched parsed manifest.json (raw mapImage/contentPath strings, no
// resolved asset URLs or attached markdown content) — the shape the edit-mode
// save flow needs, since saving a resolved runtime object back to disk would
// bake in hashed build URLs instead of the original source paths.
export function getRawManifest(id) {
  return Object.values(manifestFiles).find((manifest) => manifest.id === id) ?? null
}

// Cards for one category within a world, in manifest order.
export function getCategoryCards(world, categoryId) {
  if (!world) return []
  return world.cards.filter((card) => card.category === categoryId)
}

// The short markdown blurb a continent-level map pin opens (e.g. Wildemount's
// overview), distinct from the individual city cards inside that category.
export function getCategoryOverview(world, categoryId) {
  const category = world?.categories.find((c) => c.id === categoryId)
  if (!category?.overviewPath) return null
  return { content: mdFiles[category.overviewPath] ?? null }
}
