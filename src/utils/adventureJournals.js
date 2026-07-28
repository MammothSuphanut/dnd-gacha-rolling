// Full episode journals written by the /build-ep skill, one .md file per
// session (e.g. "EP01 - A Village in Mourning.md"). Only EP*.md counts as a
// "journal entry" — CH*.md / 99-*.md are planning outlines, not narrative
// content meant for players to read back.
//
// A side episode (an unplanned detour a session went on, off the main plot)
// keeps the mainline EP number it branches from and appends a lowercase
// letter — "EP04a - The Smuggler's Debt.md" — instead of renumbering every
// EP after it. Multiple detours off the same EP go a, b, c...
const journalFiles = import.meta.glob('/adventures/**/EP*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

// The campaign-level "00-overview.md" is the one planning doc worth showing
// in-app — it's the pitch/summary a player would actually want to read.
const overviewFiles = import.meta.glob('/adventures/*/00-overview.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

// Every markdown file, so relative links inside a journal/overview (e.g.
// "[Act 1 outline](./00-act-outline.md)") can be resolved and opened.
const allMdFiles = import.meta.glob('/adventures/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const EP_PATH_RE = /^\/adventures\/([^/]+)\/(ACT\d+)[^/]*\/EP(\d+)([a-z]?)[^/]*\.md$/
const OVERVIEW_PATH_RE = /^\/adventures\/([^/]+)\/00-overview\.md$/

function extractTitle(content, fallback) {
  const match = content.match(/^#\s+(.+)$/m)
  if (!match) return fallback
  // Strip a redundant "EP1: " style prefix — the sidebar already prepends its own "EP01:" label.
  return match[1].trim().replace(/^EP\d+[a-z]?\s*[:.-]\s*/i, '')
}

function buildJournalsBySlug() {
  const bySlug = new Map()

  for (const [path, content] of Object.entries(journalFiles)) {
    const match = path.match(EP_PATH_RE)
    if (!match) continue
    const [, slug, actId, epNumber, sideLetter] = match

    if (!bySlug.has(slug)) bySlug.set(slug, new Map())
    const actsById = bySlug.get(slug)
    if (!actsById.has(actId)) actsById.set(actId, [])

    actsById.get(actId).push({
      id: `${actId}-EP${epNumber}${sideLetter}`,
      number: Number(epNumber),
      sideLetter,
      isSide: sideLetter !== '',
      title: extractTitle(content, `EP${epNumber}${sideLetter}`),
      content,
      path,
    })
  }

  const result = new Map()
  for (const [slug, actsById] of bySlug.entries()) {
    const acts = [...actsById.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([actId, episodes]) => ({
        id: actId,
        title: actId,
        episodes: episodes.sort((a, b) => a.number - b.number || a.sideLetter.localeCompare(b.sideLetter)),
      }))
    result.set(slug, acts)
  }
  return result
}

function buildOverviewsBySlug() {
  const bySlug = new Map()
  for (const [path, content] of Object.entries(overviewFiles)) {
    const match = path.match(OVERVIEW_PATH_RE)
    if (!match) continue
    bySlug.set(match[1], { content, path })
  }
  return bySlug
}

const journalsBySlug = buildJournalsBySlug()
const overviewsBySlug = buildOverviewsBySlug()

export function getAdventureJournal(slug) {
  if (!slug) return null
  const acts = journalsBySlug.get(slug)
  return acts && acts.length > 0 ? acts : null
}

export function getAdventureOverview(slug) {
  if (!slug) return null
  return overviewsBySlug.get(slug) ?? null
}

// Any markdown file under adventures/, looked up by its glob-absolute path
// (e.g. "/adventures/frozen-sick-the-plague-covenant/99-notes.md").
export function getAdventureDoc(path) {
  if (!path) return null
  return allMdFiles[path] ?? null
}

// Resolves a relative markdown link (e.g. "./00-act-outline.md" or
// "../ACT02-.../00-act-outline.md") against the file it appears in, the same
// way a browser resolves a relative <a href> against the current page.
// decodeURIComponent undoes the percent-encoding URL adds for spaces etc. —
// import.meta.glob keys are literal file paths, not URL-encoded ones.
export function resolveAdventureLink(basePath, href) {
  return decodeURIComponent(new URL(href, `https://local${basePath}`).pathname)
}

// Drops the "/adventures/<campaign-slug>" prefix so links look like a plain
// site path (e.g. "/01-hook-and-antagonist.md") instead of carrying our
// internal folder layout — this is what we hand out as the copy/paste href,
// since FoundryVTT (and anywhere else) navigates it as a normal absolute URL.
export function toCleanAdventurePath(fullPath) {
  return fullPath.replace(/^\/adventures\/[^/]+/, '')
}

// Reverse lookup for the catch-all route: given a browser pathname like
// "/01-hook-and-antagonist.md" or "/ACT01-.../EP01 - ....md", find every doc
// whose clean path matches. Usually exactly one; root-level filenames that
// repeat across campaigns (00-overview.md, 99-notes.md) can be ambiguous.
export function findAdventureDocsByCleanPath(pathname) {
  const normalized = decodeURIComponent(pathname)
  const matches = []
  for (const [path, content] of Object.entries(allMdFiles)) {
    if (toCleanAdventurePath(path) === normalized) {
      matches.push({ path, content })
    }
  }
  return matches
}
