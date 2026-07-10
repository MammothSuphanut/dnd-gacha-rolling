const STORAGE_KEY = 'gacha-app-data'

export function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch (err) {
    console.error('Failed to load data from localStorage', err)
    return null
  }
}

export function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return true
  } catch (err) {
    console.error('Failed to save data to localStorage', err)
    return false
  }
}
