export function validateGachaData(data) {
  const errors = []

  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return { valid: false, errors: ['ไฟล์ไม่ใช่ JSON object ที่ถูกต้อง'] }
  }
  if (typeof data.version !== 'number') {
    errors.push('ไม่พบฟิลด์ version หรือรูปแบบไม่ถูกต้อง')
  }
  if (!Array.isArray(data.boxes)) {
    errors.push('ไม่พบฟิลด์ boxes หรือไม่ใช่ array')
  } else {
    data.boxes.forEach((box, index) => {
      if (!box || typeof box !== 'object') {
        errors.push(`box ลำดับที่ ${index + 1} ไม่ถูกต้อง`)
        return
      }
      if (!box.id) errors.push(`box ลำดับที่ ${index + 1} ไม่มี id`)
      if (!box.name) errors.push(`box ลำดับที่ ${index + 1} ไม่มี name`)
      if (!Array.isArray(box.items)) {
        errors.push(`box "${box.name ?? index + 1}" ไม่มี items เป็น array`)
      }
    })
  }

  if (
    data.images !== undefined &&
    (typeof data.images !== 'object' || data.images === null || Array.isArray(data.images))
  ) {
    errors.push('ฟิลด์ images ต้องเป็น object')
  }

  if (data.shops !== undefined && !Array.isArray(data.shops)) {
    errors.push('ฟิลด์ shops ต้องเป็น array')
  } else if (Array.isArray(data.shops)) {
    data.shops.forEach((shop, index) => {
      if (!shop || typeof shop !== 'object') {
        errors.push(`ร้านค้าลำดับที่ ${index + 1} ไม่ถูกต้อง`)
        return
      }
      if (!shop.id) errors.push(`ร้านค้าลำดับที่ ${index + 1} ไม่มี id`)
      if (!shop.name) errors.push(`ร้านค้าลำดับที่ ${index + 1} ไม่มี name`)
      if (!Array.isArray(shop.items)) {
        errors.push(`ร้านค้า "${shop.name ?? index + 1}" ไม่มี items เป็น array`)
      }
    })
  }

  return { valid: errors.length === 0, errors }
}
