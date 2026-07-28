// Lets the Spells page mark candidate spells while browsing (e.g. shortlisting
// options for a character build) and filter the list down to just those.
// Kept in its own localStorage key, separate from the main gacha app data
// store, since this is a personal browsing aid rather than campaign data.

const STORAGE_KEY = 'spellsPage.pinned'

export function spellKey(spell) {
  return `${spell.name}|${spell.source}`
}

export function loadPinnedKeys() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    return new Set(JSON.parse(raw))
  } catch {
    return new Set()
  }
}

export function savePinnedKeys(keys) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...keys]))
  } catch {
    // Storage unavailable (private mode, quota) — pin state just won't persist.
  }
}
