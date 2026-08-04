// Homebrew rule references shared across every adventure and character in
// the project (Fatigue, Death & Dying, the Astral Nexus meta-campaign lore,
// the class/subclass index) — one flat folder, no manifest needed since
// there's no per-file metadata beyond the file itself. Mirrors the
// adventures/ + import.meta.glob pattern used by adventureJournals.js.
const mdFiles = import.meta.glob('/homebrew-rules/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function extractTitle(content, fallback) {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : fallback
}

function toSlug(path) {
  return path.replace(/^\/homebrew-rules\//, '').replace(/\.md$/, '')
}

const rules = Object.entries(mdFiles)
  .map(([path, content]) => {
    const slug = toSlug(path)
    return { slug, path, content, title: extractTitle(content, slug) }
  })
  .sort((a, b) => a.title.localeCompare(b.title, 'th'))

export function getHomebrewRules() {
  return rules
}

export function getHomebrewRule(slug) {
  return rules.find((r) => r.slug === slug) ?? null
}

// Looked up by its glob-absolute path (e.g. "/homebrew-rules/Fatigue-system.md"),
// same shape as adventureJournals' getAdventureDoc — lets AdventureMarkdownView
// resolve links that cross from an adventure doc into a homebrew rule file.
export function getHomebrewDoc(path) {
  if (!path) return null
  return mdFiles[path] ?? null
}

// "/homebrew-rules/Fatigue-system.md" -> "/homebrew-rules/Fatigue-system",
// matching the app's own /homebrew-rules/:slug route directly (unlike
// adventures, there's no campaign-folder prefix to strip).
export function toHomebrewCleanPath(path) {
  return path.replace(/\.md$/, '')
}
