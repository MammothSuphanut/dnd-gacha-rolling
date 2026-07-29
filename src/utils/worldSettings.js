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

// World map images live alongside adventure content (they're reused from
// campaign map assets, e.g. adventures/aeorian-cataclysm/Exandria.jpeg)
// rather than duplicated under world-settings/.
const mapImageFiles = import.meta.glob('/adventures/**/*.{jpg,jpeg,png}', {
  import: 'default',
  eager: true,
})

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
      categories: manifest.categories ?? [],
      cards,
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
