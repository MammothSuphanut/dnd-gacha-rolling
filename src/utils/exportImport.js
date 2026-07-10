export function exportData(state) {
  const dateStr = new Date().toISOString().slice(0, 10)
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `gacha-data-${dateStr}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
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
