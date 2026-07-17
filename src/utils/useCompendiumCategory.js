import { useEffect, useState } from 'react'
import { getCategory } from './fiveEtoolsCategories'

// Module-level cache so switching tabs/back-forward doesn't refetch.
const cache = new Map()

export function useCompendiumCategory(categoryId) {
  const category = getCategory(categoryId)
  const [state, setState] = useState(() => {
    if (!category) return { status: 'error', error: new Error('ไม่พบหมวดนี้'), data: null }
    if (cache.has(category.id)) return { status: 'ready', error: null, data: cache.get(category.id) }
    return { status: 'loading', error: null, data: null }
  })

  useEffect(() => {
    if (!category) return
    if (cache.has(category.id)) {
      setState({ status: 'ready', error: null, data: cache.get(category.id) })
      return
    }
    let cancelled = false
    setState({ status: 'loading', error: null, data: null })
    fetch(`/data/5etools/${category.file}`)
      .then((res) => {
        if (!res.ok) throw new Error(`โหลดข้อมูลไม่สำเร็จ (HTTP ${res.status})`)
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        cache.set(category.id, data)
        setState({ status: 'ready', error: null, data })
      })
      .catch((error) => {
        if (cancelled) return
        setState({ status: 'error', error, data: null })
      })
    return () => {
      cancelled = true
    }
  }, [category])

  return state
}
