import { characterImageKey, getImage, saveImage } from './imageStore'

async function collectCharacterImages(state) {
  const characters = state.characters ?? []
  const images = {}
  for (const character of characters) {
    const imageList = character.images?.length
      ? character.images
      : character.hasImage
        ? [{ id: 'legacy' }]
        : []
    for (const img of imageList) {
      const key = characterImageKey(character.id, img.id)
      const dataUrl = await getImage(key)
      if (dataUrl) images[key] = dataUrl
    }
  }
  return images
}

export async function exportData(state) {
  const images = await collectCharacterImages(state)

  const dateStr = new Date().toISOString().slice(0, 10)
  const blob = new Blob([JSON.stringify({ ...state, images }, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `gacha-data-${dateStr}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export async function saveDefaultData(state) {
  const images = await collectCharacterImages(state)
  const res = await fetch('/__save-default-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...state, images }),
  })
  if (!res.ok) {
    let message = `บันทึกไม่สำเร็จ (HTTP ${res.status})`
    try {
      const data = await res.json()
      if (data?.error) message = data.error
    } catch {
      // ignore non-JSON error body
    }
    throw new Error(message)
  }
}

export async function importImages(images) {
  if (!images || typeof images !== 'object') return
  for (const [characterId, dataUrl] of Object.entries(images)) {
    if (typeof dataUrl === 'string') {
      await saveImage(characterId, dataUrl)
    }
  }
}

export function downloadDataUrl(dataUrl, filename) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export function getExtensionFromDataUrl(dataUrl) {
  const match = /^data:image\/(\w+);/.exec(dataUrl)
  return match ? match[1] : 'png'
}

export function readJsonFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        resolve(JSON.parse(reader.result))
      } catch {
        reject(new Error('ไฟล์ไม่ใช่ JSON ที่ถูกต้อง'))
      }
    }
    reader.onerror = () => reject(new Error('ไม่สามารถอ่านไฟล์ได้'))
    reader.readAsText(file)
  })
}
