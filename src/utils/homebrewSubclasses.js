// Homebrew subclass writeups (e.g. The Ruined Flame) that get rolled from the
// gacha pool. Mirrors the homebrewRules.js + import.meta.glob pattern so a
// classes.json item can link to "/homebrew-subclass/<slug>" and open in a new
// tab instead of a 5e.tools URL.
const mdFiles = import.meta.glob('/homebrew-subclass/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function extractTitle(content, fallback) {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : fallback
}

function toSlug(path) {
  return path.replace(/^\/homebrew-subclass\//, '').replace(/\.md$/, '')
}

const subclasses = Object.entries(mdFiles)
  .map(([path, content]) => {
    const slug = toSlug(path)
    return { slug, path, content, title: extractTitle(content, slug) }
  })
  .sort((a, b) => a.title.localeCompare(b.title, 'th'))

export function getHomebrewSubclasses() {
  return subclasses
}

export function getHomebrewSubclass(slug) {
  return subclasses.find((s) => s.slug === slug) ?? null
}
