// Matches a campaign's name against the locally normalized 5etools
// adventure/book index to build an exact 5e.tools link.
//
// Unlike items.html (which hashes to "#name_source"), 5e.tools' adventure.html
// and book.html pages hash to just the book/adventure id, lowercased — e.g.
// "Wildemount: Frozen Sick" (id "FS") is https://5e.tools/adventure.html#fs.

function normName(s) {
  return String(s || '').trim().toLowerCase()
}

function fetchJson(file) {
  return fetch(`/data/5etools/${file}`).then((res) => {
    if (!res.ok) throw new Error(`โหลดข้อมูลไม่สำเร็จ (HTTP ${res.status}): ${file}`)
    return res.json()
  })
}

let byNameCache = null
let loadPromise = null

function loadAll() {
  if (!loadPromise) {
    loadPromise = Promise.all([fetchJson('adventure.json'), fetchJson('book.json')]).then(
      ([adventures, books]) => {
        const byName = new Map()
        for (const a of adventures) byName.set(normName(a.name), { id: a.id, page: 'adventure' })
        for (const b of books) if (!byName.has(normName(b.name))) byName.set(normName(b.name), { id: b.id, page: 'book' })
        byNameCache = byName
        return byName
      },
    )
  }
  return loadPromise
}

// Preload once the module is imported so a warmed-up cache is ready by the
// time the user starts typing a campaign name into the form.
loadAll().catch(() => {})

export function buildFiveEToolsLink(entry) {
  return `https://5e.tools/${entry.page}.html#${entry.id.toLowerCase()}`
}

// Synchronous fast-path lookup against the local adventure/book index.
// Returns undefined if the index hasn't finished loading yet (first render),
// or null if it loaded but there's no exact name match — callers should fall
// back to a best-effort slug guess in either case.
export function findAdventureOrBook(name) {
  if (!byNameCache) return undefined
  return byNameCache.get(normName(name)) ?? null
}

export async function findAdventureOrBookAsync(name) {
  const byName = await loadAll()
  return byName.get(normName(name)) ?? null
}
