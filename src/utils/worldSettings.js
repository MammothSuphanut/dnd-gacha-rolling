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

// Cards for one category within a world, in manifest order.
export function getCategoryCards(world, categoryId) {
  if (!world) return []
  return world.cards.filter((card) => card.category === categoryId)
}
