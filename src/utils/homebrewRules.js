// Homebrew rule references shared across every adventure and character in
// the project (Fatigue, Death & Dying, the Astral Nexus meta-campaign lore,
// the class/subclass index, subclass tier lists, party consults) — grouped
// into category subfolders under codex/ (Core-Rules/, General/, Consults/,
// 2024-tier-list/, ...). Mirrors the adventures/ + import.meta.glob pattern
// used by adventureJournals.js, just recursive so subfolders are picked up.
// codex/menu.md is a hand-edited manifest (not content) so it's excluded here
// and read separately below.
const mdFiles = import.meta.glob(['/codex/**/*.md', '!/codex/menu.md'], {
  query: '?raw',
  import: 'default',
  eager: true,
})

const menuFile = import.meta.glob('/codex/menu.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})
const menuRaw = menuFile['/codex/menu.md'] ?? ''

function extractTitle(content, fallback) {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : fallback
}

function prettifyCategory(folder) {
  return folder.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

// "/codex/2024-tier-list/wizard-subclass-tier-list-2024.md" -> category
// "2024-tier-list", slug "2024-tier-list/wizard-subclass-tier-list-2024".
// A file left directly under codex/ (no subfolder) falls back to "General".
function toSlugAndCategory(path) {
  const rel = path.replace(/^\/codex\//, '').replace(/\.md$/, '')
  const slashIndex = rel.indexOf('/')
  if (slashIndex === -1) return { slug: rel, category: 'General' }
  return { slug: rel, category: rel.slice(0, slashIndex) }
}

// Parses codex/menu.md into an ordered list of { folder, label, items }.
// `##` headings (optionally "Folder | Display Label") open a category in
// file order; `- filename` lines under it (no .md) set that file's position
// within the category. See codex/menu.md itself for the authored format —
// this just has to stay lenient with anything else written in there
// (prose, comments, blank lines) since it's meant to be hand-edited.
function parseMenu(raw) {
  const groups = []
  let current = null
  for (const line of raw.split('\n')) {
    const catMatch = line.match(/^##\s+(.+)$/)
    if (catMatch) {
      const [folderPart, labelPart] = catMatch[1].split('|').map((s) => s.trim())
      current = { folder: folderPart, label: labelPart || null, items: [] }
      groups.push(current)
      continue
    }
    const itemMatch = current && line.match(/^-\s+(.+)$/)
    if (itemMatch) {
      current.items.push(itemMatch[1].trim().replace(/\.md$/, ''))
    }
  }
  return groups
}

const rules = Object.entries(mdFiles)
  .map(([path, content]) => {
    const { slug, category } = toSlugAndCategory(path)
    return { slug, path, content, category, title: extractTitle(content, slug) }
  })
  .sort((a, b) => a.title.localeCompare(b.title, 'th'))

export function getHomebrewRules() {
  return rules
}

// Rules grouped by category for the Codex index page, ordered per
// codex/menu.md (both category order and file order within a category).
// Anything that exists on disk but isn't listed in menu.md yet — a new file
// in a known category, or a whole new category folder — is appended
// automatically (alphabetically) instead of silently disappearing.
export function getHomebrewRuleGroups() {
  const byCategory = new Map()
  for (const rule of rules) {
    if (!byCategory.has(rule.category)) byCategory.set(rule.category, [])
    byCategory.get(rule.category).push(rule)
  }

  const menu = parseMenu(menuRaw)
  const consumed = new Set()
  const result = []

  for (const { folder, label, items } of menu) {
    const rulesInCategory = byCategory.get(folder)
    if (!rulesInCategory) continue // listed in menu but no files present (yet) — skip
    consumed.add(folder)

    const byBasename = new Map(rulesInCategory.map((r) => [r.slug.split('/').pop(), r]))
    const used = new Set()
    const ordered = []
    for (const basename of items) {
      const rule = byBasename.get(basename)
      if (rule && !used.has(rule.slug)) {
        ordered.push(rule)
        used.add(rule.slug)
      }
    }
    const leftover = rulesInCategory.filter((r) => !used.has(r.slug))
    result.push({ category: folder, label: label || prettifyCategory(folder), rules: [...ordered, ...leftover] })
  }

  const remaining = [...byCategory.keys()].filter((c) => !consumed.has(c)).sort((a, b) => a.localeCompare(b, 'th'))
  for (const category of remaining) {
    result.push({ category, label: prettifyCategory(category), rules: byCategory.get(category) })
  }

  return result
}

export function getHomebrewRule(slug) {
  return rules.find((r) => r.slug === slug) ?? null
}

// Looked up by its glob-absolute path (e.g. "/codex/Core-Rules/Fatigue-system.md"),
// same shape as adventureJournals' getAdventureDoc — lets AdventureMarkdownView
// resolve links that cross from an adventure doc into a homebrew rule file.
export function getHomebrewDoc(path) {
  if (!path) return null
  return mdFiles[path] ?? null
}

// "/codex/Core-Rules/Fatigue-system.md" -> "/codex/Core-Rules/Fatigue-system",
// matching the app's own /codex/:slug route directly (unlike adventures,
// there's no campaign-folder prefix to strip).
export function toHomebrewCleanPath(path) {
  return path.replace(/\.md$/, '')
}
