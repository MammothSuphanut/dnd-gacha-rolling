import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import { useGachaStore } from '../store/GachaStore'
import { useToast } from '../store/ToastContext'
import { createId } from '../utils/id'
import {
  CURRENCY_UNITS,
  DEFAULT_ENHANCEMENT_MULTIPLIERS,
  ENHANCEMENT_LEVELS,
  PRICE_TYPES,
  applyDiscount,
  formatCopper,
  getEnhancementMultiplier,
  parsePriceToCopper,
} from '../utils/price'

function blankItem() {
  return {
    id: createId('shopitem'),
    name: '',
    category: '',
    subCategory: '',
    priceNormal: '',
    priceCheap: '',
    priceExpensive: '',
    limitedStock: false,
    rural: false,
    urban: false,
    premium: false,
    enhanceable: false,
    note: '',
  }
}

function itemMatchesQuery(item, q) {
  if (!q) return true
  const haystack = `${item.name} ${item.category} ${item.subCategory} ${item.note}`.toLowerCase()
  return haystack.includes(q)
}

function itemMatchesFilters(item, filters) {
  if (filters?.category && item.category !== filters.category) return false
  if (filters?.subCategory && item.subCategory !== filters.subCategory) return false
  if (filters?.tag && !item[filters.tag]) return false
  return true
}

const TAG_LABELS = [
  {
    key: 'limitedStock',
    label: 'จำกัดสต็อก',
    tooltip: 'สินค้ามีจำนวนจำกัด อาจหมดสต็อกได้และไม่สามารถหาซื้อได้เสมอไป',
  },
  {
    key: 'rural',
    label: 'ชนบท',
    tooltip: 'มีขายเฉพาะในร้านค้าเขตชนบท (นอกเมือง)',
  },
  {
    key: 'urban',
    label: 'เมือง',
    tooltip: 'มีขายเฉพาะในร้านค้าเขตเมือง',
  },
  {
    key: 'premium',
    label: 'พรีเมียม',
    tooltip: 'สินค้าเกรดพรีเมียม/คุณภาพสูง มักหาซื้อได้เฉพาะในร้านค้าระดับพรีเมียมเท่านั้น',
  },
  {
    key: 'enhanceable',
    label: 'ตีบวกได้',
    tooltip: 'สามารถซื้อพร้อมค่าตีบวก +1/+2/+3 ได้ ราคาจะถูกคูณตามตัวคูณที่ตั้งค่าไว้',
  },
]

const HARD_SELL_TOOLTIP =
  'จำนวนเงินสูงสุดที่ร้านนี้จะรับซื้อของจากผู้เล่นได้ในหนึ่งวัน (มูลค่ารวมของไอเทมที่ขายให้ร้าน)'
const SELLING_CAP_TOOLTIP =
  'มูลค่ารวมสูงสุดที่ร้านนี้สามารถขายสินค้าให้ผู้เล่นได้ในหนึ่งวัน'

function Tip({ text, children, className = '', tooltipClassName = '' }) {
  return (
    <span className={`group relative inline-flex ${className}`}>
      {children}
      <span
        className={`pointer-events-none absolute bottom-full left-0 z-20 mb-1 hidden w-max max-w-[220px] whitespace-pre-line rounded-md bg-gray-900 px-2 py-1 text-[11px] leading-snug text-white group-hover:block ${tooltipClassName}`}
      >
        {text}
      </span>
    </span>
  )
}

function ShopFormModal({ open, onClose, shop, onSubmit }) {
  const [form, setForm] = useState({
    name: shop?.name ?? '',
    hardSell: shop?.hardSell ?? '',
    sellingCap: shop?.sellingCap ?? '',
    notes: shop?.notes ?? '',
  })

  if (!open) return null

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    onSubmit(form)
  }

  return (
    <Modal open={open} onClose={onClose} title={shop ? 'แก้ไขร้านค้า' : 'เพิ่มร้านค้า'}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-stone-700">ชื่อร้านค้า</label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
            autoFocus
            placeholder="เช่น Blacksmith/Armory"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-stone-700">
              <Tip text={HARD_SELL_TOOLTIP}>
                <span className="cursor-help underline decoration-dotted">Hard Sell (ต่อวัน)</span>
              </Tip>
            </label>
            <input
              value={form.hardSell}
              onChange={(e) => setForm((f) => ({ ...f, hardSell: e.target.value }))}
              placeholder="เช่น 1000 gp (Cheap: 750 gp, Expensive: 1500 gp)"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">
              <Tip text={SELLING_CAP_TOOLTIP}>
                <span className="cursor-help underline decoration-dotted">Selling Cap (ต่อวัน)</span>
              </Tip>
            </label>
            <input
              value={form.sellingCap}
              onChange={(e) => setForm((f) => ({ ...f, sellingCap: e.target.value }))}
              placeholder="เช่น 2000 gp (Cheap: 1500 gp, Expensive: 3000 gp)"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">รายละเอียด / กติกาเพิ่มเติม</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            rows={4}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-2 text-sm text-stone-600 hover:bg-[#f5ede0]"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="rounded-md bg-violet-700 px-3 py-2 text-sm font-medium text-white hover:bg-violet-800"
          >
            บันทึก
          </button>
        </div>
      </form>
    </Modal>
  )
}

function EnhancementSettingsModal({ open, onClose, multipliers, onSubmit }) {
  const [form, setForm] = useState(() =>
    Object.fromEntries(ENHANCEMENT_LEVELS.map((lvl) => [lvl, String(multipliers?.[lvl] ?? '')])),
  )

  useEffect(() => {
    if (open) {
      setForm(Object.fromEntries(ENHANCEMENT_LEVELS.map((lvl) => [lvl, String(multipliers?.[lvl] ?? '')])))
    }
  }, [open, multipliers])

  if (!open) return null

  function handleSubmit(e) {
    e.preventDefault()
    const next = {}
    for (const lvl of ENHANCEMENT_LEVELS) {
      const num = Number(form[lvl])
      next[lvl] = num > 0 ? num : 1
    }
    onSubmit(next)
  }

  return (
    <Modal open={open} onClose={onClose} title="ตั้งค่าตัวคูณราคาตีบวก (+1 ~ +3)">
      <form onSubmit={handleSubmit} className="space-y-3">
        <p className="text-xs text-stone-500">
          ราคาไอเทมที่ตีบวกแล้ว = ราคาปกติ × ตัวคูณ ตามระดับที่เลือก กำหนดตัวคูณเองได้ตามกติกาของแคมเปญ
        </p>
        <div className="grid grid-cols-3 gap-3">
          {ENHANCEMENT_LEVELS.map((lvl) => (
            <div key={lvl}>
              <label className="block text-sm font-medium text-stone-700">+{lvl}</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={form[lvl]}
                onChange={(e) => setForm((f) => ({ ...f, [lvl]: e.target.value }))}
                placeholder="เช่น 2"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-2 text-sm text-stone-600 hover:bg-[#f5ede0]"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="rounded-md bg-violet-700 px-3 py-2 text-sm font-medium text-white hover:bg-violet-800"
          >
            บันทึก
          </button>
        </div>
      </form>
    </Modal>
  )
}

const UNCATEGORIZED_LABEL = 'ไม่ระบุหมวด'

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9ก-๙]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'x'
}

function ShopDetailView({
  shop,
  onBack,
  onEdit,
  onDelete,
  query,
  filters,
  dispatch,
  showToast,
  onAddToCart,
  enhancementMultipliers,
}) {
  const [draftItems, setDraftItems] = useState(() => shop.items.map((item) => ({ ...item })))
  const [dirty, setDirty] = useState(false)
  const [deleteItem, setDeleteItem] = useState(null)
  const [itemEditMode, setItemEditMode] = useState(false)
  const [selectedPriceType, setSelectedPriceType] = useState({})
  const [quantities, setQuantities] = useState({})
  const [selectedLevel, setSelectedLevel] = useState({})

  useEffect(() => {
    setDraftItems(shop.items.map((item) => ({ ...item })))
    setDirty(false)
  }, [shop.id])

  const categoryOptions = useMemo(
    () => Array.from(new Set(draftItems.map((i) => i.category).filter(Boolean))),
    [draftItems],
  )
  const subCategoryOptions = useMemo(
    () => Array.from(new Set(draftItems.map((i) => i.subCategory).filter(Boolean))),
    [draftItems],
  )

  const visibleItems = useMemo(
    () => draftItems.filter((item) => itemMatchesQuery(item, query) && itemMatchesFilters(item, filters)),
    [draftItems, query, filters],
  )

  const groupedItems = useMemo(() => {
    const map = new Map()
    for (const item of visibleItems) {
      const cat = item.category || UNCATEGORIZED_LABEL
      if (!map.has(cat)) map.set(cat, [])
      map.get(cat).push(item)
    }
    return Array.from(map.entries()).map(([category, items]) => ({
      category,
      slug: slugify(category),
      items,
    }))
  }, [visibleItems])

  const hasActiveFilters = Boolean(filters?.category || filters?.subCategory || filters?.tag)

  function scrollToGroup(slug) {
    const el = document.getElementById(`shop-${shop.id}-cat-${slug}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function updateDraftItem(id, patch) {
    setDraftItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)))
    setDirty(true)
  }

  function addDraftItem() {
    setDraftItems((prev) => [...prev, blankItem()])
    setDirty(true)
  }

  function removeDraftItemNow(id) {
    setDraftItems((prev) => prev.filter((item) => item.id !== id))
    setDirty(true)
  }

  function handleSave() {
    dispatch({ type: 'UPDATE_SHOP', payload: { id: shop.id, patch: { items: draftItems } } })
    setDirty(false)
    showToast('บันทึกการเปลี่ยนแปลงสำเร็จ', 'success')
  }

  function handleCancel() {
    setDraftItems(shop.items.map((item) => ({ ...item })))
    setDirty(false)
  }

  function toggleItemEditMode() {
    setItemEditMode((prev) => {
      if (prev && dirty) {
        handleCancel()
        showToast('ยกเลิกการแก้ไขที่ยังไม่ได้บันทึก', 'info')
      }
      return !prev
    })
  }

  function availablePriceTypes(item) {
    return PRICE_TYPES.filter((p) => item[p.field])
  }

  function getSelectedPriceType(item) {
    const available = availablePriceTypes(item)
    if (available.length === 0) return null
    const chosen = selectedPriceType[item.id]
    if (chosen && available.some((p) => p.type === chosen)) return chosen
    return available[0].type
  }

  function getQuantity(item) {
    const qty = quantities[item.id]
    return qty === undefined ? 1 : qty
  }

  function setQuantity(itemId, value) {
    setQuantities((prev) => ({ ...prev, [itemId]: value }))
  }

  function getSelectedLevel(item) {
    return selectedLevel[item.id] ?? 0
  }

  function setLevel(itemId, level) {
    setSelectedLevel((prev) => ({ ...prev, [itemId]: level }))
  }

  function handleAddToCart(item) {
    const type = getSelectedPriceType(item)
    if (!type) {
      showToast('รายการนี้ยังไม่มีราคาให้เลือก', 'error')
      return
    }
    const qty = Math.max(1, Math.floor(Number(getQuantity(item))) || 1)
    const level = item.enhanceable ? getSelectedLevel(item) : 0
    onAddToCart(shop, item, type, qty, level)
    showToast(`เพิ่ม "${item.name}" ลงตระกร้าแล้ว`, 'success')
  }

  return (
    <div className="rounded-lg border border-[#e2cfb3] bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 p-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-md p-1 -m-1 text-left text-sm font-medium text-violet-700 transition-colors hover:bg-violet-50"
        >
          <span aria-hidden>←</span> กลับไปรายชื่อร้าน
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="rounded-md border border-gray-300 px-2 py-1 text-xs text-stone-700 transition-colors hover:bg-[#f5ede0]"
          >
            แก้ไขร้าน
          </button>
          <button
            onClick={onDelete}
            className="rounded-md border border-red-300 px-2 py-1 text-xs text-red-600 transition-colors hover:bg-red-50"
          >
            ลบร้าน
          </button>
        </div>
      </div>

      <div className="border-t border-[#e2cfb3] p-4">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-xl font-bold text-stone-900">{shop.name}</h2>
          <span className="text-xs text-stone-400">
            ({query || hasActiveFilters ? `${visibleItems.length}/${draftItems.length}` : draftItems.length} รายการ)
          </span>
        </div>
        {(shop.hardSell || shop.sellingCap) && (
            <div className="mb-3 text-sm text-stone-600">
              {shop.hardSell && (
                <div>
                  <Tip text={HARD_SELL_TOOLTIP}>
                    <span className="cursor-help underline decoration-dotted">Hard Sell</span>
                  </Tip>
                  : <span className="font-medium text-stone-900">{shop.hardSell}</span>
                </div>
              )}
              {shop.sellingCap && (
                <div>
                  <Tip text={SELLING_CAP_TOOLTIP}>
                    <span className="cursor-help underline decoration-dotted">Selling Cap</span>
                  </Tip>
                  : <span className="font-medium text-stone-900">{shop.sellingCap}</span>
                </div>
              )}
            </div>
          )}
          {shop.notes && (
            <details className="mb-3 rounded-md bg-[#f5ede0] p-3 text-sm text-stone-600">
              <summary className="cursor-pointer font-medium text-stone-700">รายละเอียด / กติกาเพิ่มเติม</summary>
              <p className="mt-2 whitespace-pre-line">{shop.notes}</p>
            </details>
          )}

          <div className="mb-3 flex items-center justify-end">
            <button
              type="button"
              onClick={toggleItemEditMode}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
                itemEditMode
                  ? 'border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100'
                  : 'border-gray-300 text-stone-700 hover:bg-[#f5ede0]'
              }`}
            >
              {itemEditMode ? '✓ กำลังแก้ไขรายการ (กดเพื่อดูอย่างเดียว)' : '✎ โหมดแก้ไขรายการ'}
            </button>
          </div>

          {groupedItems.length > 1 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {groupedItems.map((group) => (
                <button
                  key={group.slug}
                  type="button"
                  onClick={() => scrollToGroup(group.slug)}
                  className="rounded-full border border-[#e2cfb3] bg-[#f5ede0] px-2.5 py-1 text-[11px] text-stone-600 hover:bg-[#e8d9c0]"
                >
                  {group.category} <span className="text-stone-400">({group.items.length})</span>
                </button>
              ))}
            </div>
          )}

          {visibleItems.length === 0 ? (
            <p className="text-sm text-stone-400">
              {query || hasActiveFilters ? 'ไม่พบรายการที่ตรงกับคำค้นหา/ตัวกรองในร้านนี้' : 'ยังไม่มีรายการในร้านนี้'}
            </p>
          ) : itemEditMode ? (
            <div className="space-y-3">
              {groupedItems.map((group) => (
                <details key={group.slug} id={`shop-${shop.id}-cat-${group.slug}`} open className="scroll-mt-4">
                  <summary className="cursor-pointer py-1 text-sm font-medium text-stone-700">
                    {group.category} <span className="text-xs font-normal text-stone-400">({group.items.length})</span>
                  </summary>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-[#e2cfb3] text-left text-xs text-stone-500">
                          <th className="py-2 pr-2">ชื่อรายการ</th>
                          <th className="py-2 pr-2">หมวดหลัก</th>
                          <th className="py-2 pr-2">หมวดรอง</th>
                          <th className="py-2 pr-2">ราคาปกติ</th>
                          <th className="py-2 pr-2">ราคาถูก</th>
                          <th className="py-2 pr-2">ราคาแพง</th>
                          <th className="py-2 pr-2 text-center">
                            <Tip text="ป้ายกำกับคุณสมบัติของสินค้า ชี้เพื่อดูคำอธิบาย" className="cursor-help">
                              Tag
                            </Tip>
                          </th>
                          <th className="py-2 pr-2">หมายเหตุ</th>
                          <th className="py-2 pl-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.items.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b border-[#e2cfb3] align-top transition-colors hover:bg-[#f5ede0]"
                          >
                            <td className="py-1.5 pr-2">
                              <input
                                value={item.name}
                                onChange={(e) => updateDraftItem(item.id, { name: e.target.value })}
                                className="w-full min-w-[140px] rounded-md border border-gray-300 px-2 py-1"
                              />
                            </td>
                            <td className="py-1.5 pr-2">
                              <input
                                value={item.category}
                                onChange={(e) => updateDraftItem(item.id, { category: e.target.value })}
                                list={`shop-cat-${shop.id}`}
                                className="w-28 rounded-md border border-gray-300 px-2 py-1"
                              />
                            </td>
                            <td className="py-1.5 pr-2">
                              <input
                                value={item.subCategory}
                                onChange={(e) => updateDraftItem(item.id, { subCategory: e.target.value })}
                                list={`shop-subcat-${shop.id}`}
                                className="w-28 rounded-md border border-gray-300 px-2 py-1"
                              />
                            </td>
                            <td className="py-1.5 pr-2">
                              <input
                                value={item.priceNormal}
                                onChange={(e) => updateDraftItem(item.id, { priceNormal: e.target.value })}
                                className="w-20 rounded-md border border-gray-300 px-2 py-1"
                              />
                            </td>
                            <td className="py-1.5 pr-2">
                              <input
                                value={item.priceCheap}
                                onChange={(e) => updateDraftItem(item.id, { priceCheap: e.target.value })}
                                className="w-20 rounded-md border border-gray-300 px-2 py-1"
                              />
                            </td>
                            <td className="py-1.5 pr-2">
                              <input
                                value={item.priceExpensive}
                                onChange={(e) => updateDraftItem(item.id, { priceExpensive: e.target.value })}
                                className="w-20 rounded-md border border-gray-300 px-2 py-1"
                              />
                            </td>
                            <td className="py-1.5 pr-2">
                              <div className="flex flex-col gap-0.5 text-xs whitespace-nowrap">
                                {TAG_LABELS.map((tag) => (
                                  <Tip key={tag.key} text={tag.tooltip}>
                                    <label className="flex cursor-help items-center gap-1">
                                      <input
                                        type="checkbox"
                                        checked={!!item[tag.key]}
                                        onChange={(e) => updateDraftItem(item.id, { [tag.key]: e.target.checked })}
                                      />
                                      {tag.label}
                                    </label>
                                  </Tip>
                                ))}
                              </div>
                            </td>
                            <td className="py-1.5 pr-2">
                              <input
                                value={item.note}
                                onChange={(e) => updateDraftItem(item.id, { note: e.target.value })}
                                className="w-full min-w-[120px] rounded-md border border-gray-300 px-2 py-1"
                              />
                            </td>
                            <td className="py-1.5 pl-2 whitespace-nowrap text-right">
                              <button
                                type="button"
                                onClick={() => setDeleteItem(item)}
                                className="text-xs text-red-600 hover:underline"
                              >
                                ลบ
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </details>
              ))}
              <datalist id={`shop-cat-${shop.id}`}>
                {categoryOptions.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
              <datalist id={`shop-subcat-${shop.id}`}>
                {subCategoryOptions.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          ) : (
            <div className="space-y-3">
              {groupedItems.map((group) => (
                <details key={group.slug} id={`shop-${shop.id}-cat-${group.slug}`} open className="scroll-mt-4">
                  <summary className="cursor-pointer py-1 text-sm font-medium text-stone-700">
                    {group.category} <span className="text-xs font-normal text-stone-400">({group.items.length})</span>
                  </summary>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[860px] border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-[#e2cfb3] text-left text-xs text-stone-500">
                          <th className="py-2 pr-2">ชื่อรายการ</th>
                          <th className="py-2 pr-2">หมวดหลัก</th>
                          <th className="py-2 pr-2">หมวดรอง</th>
                          <th className="py-2 pr-2">ราคา (เลือกราคาที่จะใส่ตระกร้า)</th>
                          <th className="py-2 pr-2 text-center">
                            <Tip text="ตีบวก +1/+2/+3 จะคูณราคาตามตัวคูณที่ตั้งค่าไว้ (เฉพาะไอเทมที่ติด Tag ตีบวกได้)" className="cursor-help">
                              ตีบวก
                            </Tip>
                          </th>
                          <th className="py-2 pr-2 text-center">
                            <Tip text="ป้ายกำกับคุณสมบัติของสินค้า ชี้เพื่อดูคำอธิบาย" className="cursor-help">
                              Tag
                            </Tip>
                          </th>
                          <th className="py-2 pr-2 text-center">จำนวน</th>
                          <th className="py-2 pl-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.items.map((item) => {
                          const available = availablePriceTypes(item)
                          const selected = getSelectedPriceType(item)
                          const level = getSelectedLevel(item)
                          const basePriceText = selected ? item[PRICE_TYPES.find((p) => p.type === selected).field] : null
                          const baseCp = basePriceText ? parsePriceToCopper(basePriceText) : null
                          const multiplier = getEnhancementMultiplier(level, enhancementMultipliers)
                          return (
                            <tr
                              key={item.id}
                              className="border-b border-[#e2cfb3] align-top transition-colors hover:bg-violet-50/50"
                            >
                              <td className="py-2 pr-2 font-medium text-stone-900">
                                {item.note ? (
                                  <Tip text={item.note} tooltipClassName="max-w-[260px]">
                                    <span className="cursor-help underline decoration-dotted">{item.name}</span>
                                  </Tip>
                                ) : (
                                  item.name
                                )}
                              </td>
                              <td className="py-2 pr-2 text-stone-600">{item.category}</td>
                              <td className="py-2 pr-2 text-stone-600">{item.subCategory}</td>
                              <td className="py-2 pr-2">
                                {available.length === 0 ? (
                                  <span className="text-xs text-stone-400">ไม่มีราคา</span>
                                ) : (
                                  <div className="flex flex-col gap-1">
                                    {available.map((p) => (
                                      <label key={p.type} className="flex items-center gap-1.5 text-xs">
                                        <input
                                          type="radio"
                                          name={`price-${item.id}`}
                                          checked={selected === p.type}
                                          onChange={() =>
                                            setSelectedPriceType((prev) => ({ ...prev, [item.id]: p.type }))
                                          }
                                        />
                                        <span className="text-stone-500">{p.label}:</span>
                                        <span className="font-medium text-stone-900">{item[p.field]}</span>
                                      </label>
                                    ))}
                                  </div>
                                )}
                              </td>
                              <td className="py-2 pr-2 text-center">
                                {item.enhanceable ? (
                                  <div className="flex flex-col items-center gap-1">
                                    <select
                                      value={level}
                                      onChange={(e) => setLevel(item.id, Number(e.target.value))}
                                      className="rounded-md border border-gray-300 px-1.5 py-1 text-xs"
                                    >
                                      <option value={0}>ปกติ</option>
                                      {ENHANCEMENT_LEVELS.map((lvl) => (
                                        <option key={lvl} value={lvl}>
                                          +{lvl} (x{getEnhancementMultiplier(lvl, enhancementMultipliers)})
                                        </option>
                                      ))}
                                    </select>
                                    {level > 0 && baseCp != null && (
                                      <span className="text-[11px] text-stone-500">
                                        = {formatCopper(baseCp * multiplier)}
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-xs text-stone-300">—</span>
                                )}
                              </td>
                              <td className="py-2 pr-2">
                                <div className="flex flex-wrap gap-1">
                                  {TAG_LABELS.filter((tag) => item[tag.key]).map((tag) => (
                                    <Tip key={tag.key} text={tag.tooltip}>
                                      <span className="cursor-help rounded-full bg-[#f5ede0] px-2 py-0.5 text-[11px] text-stone-600">
                                        {tag.label}
                                      </span>
                                    </Tip>
                                  ))}
                                </div>
                              </td>
                              <td className="py-2 pr-2 text-center">
                                <input
                                  type="number"
                                  min="1"
                                  value={getQuantity(item)}
                                  onChange={(e) => setQuantity(item.id, e.target.value)}
                                  className="w-16 rounded-md border border-gray-300 px-2 py-1 text-center text-sm"
                                />
                              </td>
                              <td className="py-2 pl-2 whitespace-nowrap text-right">
                                <button
                                  type="button"
                                  disabled={available.length === 0}
                                  onClick={() => handleAddToCart(item)}
                                  className="rounded-md bg-violet-700 px-2.5 py-1 text-xs font-medium text-white hover:bg-violet-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                                >
                                  + ใส่ตระกร้า
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </details>
              ))}
            </div>
          )}

          {itemEditMode && (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={addDraftItem}
                className="rounded-md bg-violet-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-800"
              >
                + เพิ่มรายการ
              </button>
              {dirty && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-md px-3 py-1.5 text-sm text-stone-600 hover:bg-[#f5ede0]"
                  >
                    ยกเลิกการแก้ไข
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
                  >
                    บันทึกการเปลี่ยนแปลง
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <ConfirmDialog
          open={!!deleteItem}
          title="ลบรายการ"
          message={`ต้องการลบ "${deleteItem?.name}" ออกจากร้านนี้หรือไม่?`}
          confirmLabel="ลบ"
          danger
          onCancel={() => setDeleteItem(null)}
          onConfirm={() => {
            removeDraftItemNow(deleteItem.id)
            setDeleteItem(null)
          }}
        />
    </div>
  )
}

function ShopTile({ shop, matchedCount, totalCount, isFiltered, onSelect, onEdit, onDelete }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onSelect()
      }}
      className="cursor-pointer rounded-lg border border-[#e2cfb3] bg-white p-4 shadow-sm transition-shadow hover:shadow-md hover:border-violet-300"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-stone-900">{shop.name}</h3>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onEdit()
            }}
            className="rounded-md border border-gray-300 px-2 py-0.5 text-xs text-stone-700 transition-colors hover:bg-[#f5ede0]"
          >
            แก้ไข
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="rounded-md border border-red-300 px-2 py-0.5 text-xs text-red-600 transition-colors hover:bg-red-50"
          >
            ลบ
          </button>
        </div>
      </div>
      <p className="mt-1 text-xs text-stone-400">
        {isFiltered ? `${matchedCount}/${totalCount} รายการที่ตรงกับคำค้นหา` : `${totalCount} รายการ`}
      </p>
      {(shop.hardSell || shop.sellingCap) && (
        <p className="mt-2 line-clamp-2 text-xs text-stone-500">
          {shop.hardSell && <>Hard Sell: {shop.hardSell}</>}
        </p>
      )}
    </div>
  )
}

const DEFAULT_DISCOUNT = { type: 'percent', value: '' }

function DiscountInput({ discount, onChange, className = '' }) {
  const d = discount ?? DEFAULT_DISCOUNT

  function handleTypeChange(type) {
    if (type === d.type) return
    onChange({ type, value: type === 'flat' ? {} : '' })
  }

  function handleFlatChange(unit, value) {
    onChange({ ...d, value: { ...d.value, [unit]: value } })
  }

  return (
    <div className={className}>
      <select
        value={d.type}
        onChange={(e) => handleTypeChange(e.target.value)}
        className="rounded-md border border-gray-300 px-2 py-1 text-sm"
      >
        <option value="percent">%</option>
        <option value="flat">จำนวนเงิน</option>
      </select>
      {d.type === 'percent' ? (
        <input
          type="number"
          min="0"
          max="100"
          value={d.value}
          onChange={(e) => onChange({ ...d, value: e.target.value })}
          placeholder="0"
          className="mt-1 w-24 rounded-md border border-gray-300 px-2 py-1 text-sm"
        />
      ) : (
        <div className="mt-1 flex gap-1">
          {CURRENCY_UNITS.map((unit) => (
            <div key={unit} className="flex flex-col items-center">
              <input
                type="number"
                min="0"
                value={d.value?.[unit] ?? ''}
                onChange={(e) => handleFlatChange(unit, e.target.value)}
                placeholder="0"
                className="w-14 rounded-md border border-gray-300 px-1.5 py-1 text-sm"
              />
              <span className="mt-0.5 text-[10px] text-stone-400">{unit}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CartModal({ open, onClose, cartState, setCartState, showToast, onGoToRoll }) {
  const groups = useMemo(() => {
    const map = new Map()
    for (const item of cartState.items) {
      if (!map.has(item.shopId)) {
        map.set(item.shopId, { shopId: item.shopId, shopName: item.shopName, items: [] })
      }
      map.get(item.shopId).items.push(item)
    }
    return Array.from(map.values()).map((group) => {
      const subtotalCp = group.items.reduce((sum, i) => sum + (i.priceCp ?? 0) * i.qty, 0)
      const discount = cartState.shopDiscounts[group.shopId] ?? DEFAULT_DISCOUNT
      const totalCp = applyDiscount(subtotalCp, discount)
      return { ...group, subtotalCp, discount, totalCp }
    })
  }, [cartState.items, cartState.shopDiscounts])

  const grandSubtotalCp = groups.reduce((sum, g) => sum + g.totalCp, 0)
  const grandTotalCp = applyDiscount(grandSubtotalCp, cartState.overallDiscount)

  if (!open) return null

  function removeCartItem(cartId) {
    setCartState((prev) => ({ ...prev, items: prev.items.filter((i) => i.cartId !== cartId) }))
  }

  function setCartItemQty(cartId, qty) {
    const safeQty = Math.max(0, Math.floor(Number(qty)) || 0)
    setCartState((prev) => ({
      ...prev,
      items: prev.items.map((i) => (i.cartId === cartId ? { ...i, qty: safeQty } : i)),
    }))
  }

  function bumpCartItemQty(cartId, delta) {
    setCartState((prev) => ({
      ...prev,
      items: prev.items.map((i) => (i.cartId === cartId ? { ...i, qty: Math.max(0, i.qty + delta) } : i)),
    }))
  }

  function setShopDiscount(shopId, discount) {
    setCartState((prev) => ({ ...prev, shopDiscounts: { ...prev.shopDiscounts, [shopId]: discount } }))
  }

  function setOverallDiscount(discount) {
    setCartState((prev) => ({ ...prev, overallDiscount: discount }))
  }

  function clearCart() {
    setCartState({ items: [], shopDiscounts: {}, overallDiscount: DEFAULT_DISCOUNT })
    showToast('ล้างตระกร้าแล้ว', 'info')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e2cfb3] p-4">
          <h2 className="text-lg font-semibold text-stone-900">ตระกร้าสินค้า</h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onGoToRoll}
              className="rounded-md border border-violet-300 px-3 py-1.5 text-sm font-medium text-violet-700 hover:bg-violet-50"
            >
              ไปหน้าสุ่ม
            </button>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {groups.length === 0 ? (
            <p className="text-sm text-stone-400">ตระกร้ายังว่างเปล่า กด "+ ใส่ตระกร้า" จากหน้ารายการร้านค้า</p>
          ) : (
            <div className="space-y-4">
              {groups.map((group) => (
                <div key={group.shopId} className="rounded-lg border border-[#e2cfb3] p-3">
                  <div className="mb-2 font-semibold text-stone-900">{group.shopName}</div>
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="text-xs text-stone-400">
                        <th className="pb-1 pr-2 text-left font-normal">รายการ</th>
                        <th className="pb-1 pr-2 text-right font-normal">ราคา/ชิ้น</th>
                        <th className="pb-1 pr-2 text-center font-normal">จำนวน</th>
                        <th className="pb-1 pr-2 text-right font-normal">รวม</th>
                        <th className="pb-1 pl-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map((item) => (
                        <tr key={item.cartId} className="border-b border-[#e2cfb3]">
                          <td className="py-1.5 pr-2">
                            <div className="font-medium text-gray-800">{item.itemName}</div>
                            <div className="text-xs text-stone-400">{item.priceLabel}</div>
                          </td>
                          <td className="py-1.5 pr-2 text-right whitespace-nowrap text-stone-700">
                            {item.priceText}
                            {item.priceCp == null && (
                              <span className="ml-1 text-[11px] text-amber-500">(คำนวณราคารวมไม่ได้)</span>
                            )}
                          </td>
                          <td className="py-1.5 pr-2">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                type="button"
                                onClick={() => bumpCartItemQty(item.cartId, -1)}
                                className="h-6 w-6 rounded-md border border-gray-300 text-xs text-stone-600 hover:bg-[#f5ede0]"
                              >
                                −
                              </button>
                              <input
                                type="number"
                                min="0"
                                value={item.qty}
                                onChange={(e) => setCartItemQty(item.cartId, e.target.value)}
                                className="w-12 rounded-md border border-gray-300 px-1 py-0.5 text-center text-sm"
                              />
                              <button
                                type="button"
                                onClick={() => bumpCartItemQty(item.cartId, 1)}
                                className="h-6 w-6 rounded-md border border-gray-300 text-xs text-stone-600 hover:bg-[#f5ede0]"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-1.5 pr-2 text-right whitespace-nowrap text-stone-700">
                            {item.priceCp != null ? formatCopper(item.priceCp * item.qty) : '-'}
                          </td>
                          <td className="py-1.5 pl-2 text-right">
                            <button
                              type="button"
                              onClick={() => removeCartItem(item.cartId)}
                              className="text-xs text-red-600 hover:underline"
                            >
                              ลบ
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-500">ส่วนลด</label>
                      <DiscountInput
                        discount={group.discount}
                        onChange={(discount) => setShopDiscount(group.shopId, discount)}
                        className="mt-1"
                      />
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-stone-500">ยอดรวมร้านนี้: {formatCopper(group.subtotalCp)}</div>
                      <div className="font-semibold text-stone-900">
                        หลังหักส่วนลด: {formatCopper(group.totalCp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-[#e2cfb3] p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-stone-500">ส่วนลดรวมทุกร้าน</label>
              <DiscountInput discount={cartState.overallDiscount} onChange={setOverallDiscount} className="mt-1" />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={clearCart}
              disabled={cartState.items.length === 0}
              className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-[#e2cfb3] disabled:text-gray-300"
            >
              ล้างตระกร้า
            </button>
            <div className="text-right">
              <div className="text-sm text-stone-500">รวมทุกร้าน (หลังหักส่วนลดร้าน): {formatCopper(grandSubtotalCp)}</div>
              <div className="text-lg font-bold text-violet-700">
                ยอดสุทธิ: {formatCopper(grandTotalCp)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ShopPage({ cartState, setCartState }) {
  const { state, dispatch } = useGachaStore()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const shops = state.shops ?? []
  const [query, setQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterSubCategory, setFilterSubCategory] = useState('')
  const [filterTag, setFilterTag] = useState('')
  const [shopForm, setShopForm] = useState(null)
  const [deleteShop, setDeleteShop] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [enhancementSettingsOpen, setEnhancementSettingsOpen] = useState(false)
  const enhancementMultipliers = state.enhancementMultipliers ?? DEFAULT_ENHANCEMENT_MULTIPLIERS
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedShopId = searchParams.get('shopId')
  const selectedShop = shops.find((s) => s.id === selectedShopId) ?? null

  function openShop(id) {
    setSearchParams({ shopId: id })
  }

  function closeShop() {
    setSearchParams({})
  }

  const normalizedQuery = query.trim().toLowerCase()
  const filters = useMemo(
    () => ({ category: filterCategory, subCategory: filterSubCategory, tag: filterTag }),
    [filterCategory, filterSubCategory, filterTag],
  )
  const hasActiveFilters = Boolean(filterCategory || filterSubCategory || filterTag)

  const allItems = useMemo(() => shops.flatMap((s) => s.items), [shops])

  const categoryOptions = useMemo(
    () =>
      Array.from(
        new Set(
          allItems
            .filter((i) => itemMatchesFilters(i, { subCategory: filterSubCategory, tag: filterTag }))
            .map((i) => i.category)
            .filter(Boolean),
        ),
      ).sort(),
    [allItems, filterSubCategory, filterTag],
  )
  const subCategoryOptions = useMemo(
    () =>
      Array.from(
        new Set(
          allItems
            .filter((i) => itemMatchesFilters(i, { category: filterCategory, tag: filterTag }))
            .map((i) => i.subCategory)
            .filter(Boolean),
        ),
      ).sort(),
    [allItems, filterCategory, filterTag],
  )
  const groupedSubCategoryOptions = useMemo(() => {
    const map = new Map()
    allItems
      .filter((i) => itemMatchesFilters(i, { category: filterCategory, tag: filterTag }))
      .forEach((i) => {
        if (!i.subCategory) return
        if (!map.has(i.category)) map.set(i.category, new Set())
        map.get(i.category).add(i.subCategory)
      })
    return Array.from(map.entries())
      .map(([category, subs]) => ({ category, subs: Array.from(subs).sort() }))
      .sort((a, b) => a.category.localeCompare(b.category))
  }, [allItems, filterCategory, filterTag])
  const tagOptions = useMemo(
    () =>
      TAG_LABELS.filter((tag) =>
        allItems.some(
          (i) => i[tag.key] && itemMatchesFilters(i, { category: filterCategory, subCategory: filterSubCategory }),
        ),
      ),
    [allItems, filterCategory, filterSubCategory],
  )

  useEffect(() => {
    if (filterSubCategory && !subCategoryOptions.includes(filterSubCategory)) setFilterSubCategory('')
  }, [subCategoryOptions, filterSubCategory])

  useEffect(() => {
    if (filterCategory && !categoryOptions.includes(filterCategory)) setFilterCategory('')
  }, [categoryOptions, filterCategory])

  useEffect(() => {
    if (filterTag && !tagOptions.some((t) => t.key === filterTag)) setFilterTag('')
  }, [tagOptions, filterTag])

  const visibleShops = useMemo(() => {
    if (!normalizedQuery && !hasActiveFilters) return shops
    return shops.filter((shop) =>
      shop.items.some(
        (item) => itemMatchesQuery(item, normalizedQuery) && itemMatchesFilters(item, filters),
      ) ||
      (!hasActiveFilters && shop.name.toLowerCase().includes(normalizedQuery)),
    )
  }, [shops, normalizedQuery, filters, hasActiveFilters])

  function clearFilters() {
    setFilterCategory('')
    setFilterSubCategory('')
    setFilterTag('')
  }

  function handleShopSubmit(form) {
    if (shopForm.mode === 'create') {
      dispatch({
        type: 'ADD_SHOP',
        payload: {
          id: createId('shop'),
          name: form.name,
          hardSell: form.hardSell,
          sellingCap: form.sellingCap,
          notes: form.notes,
          items: [],
        },
      })
      showToast('เพิ่มร้านค้าสำเร็จ', 'success')
    } else {
      dispatch({
        type: 'UPDATE_SHOP',
        payload: {
          id: shopForm.shop.id,
          patch: {
            name: form.name,
            hardSell: form.hardSell,
            sellingCap: form.sellingCap,
            notes: form.notes,
          },
        },
      })
      showToast('บันทึกการแก้ไขสำเร็จ', 'success')
    }
    setShopForm(null)
  }

  function handleAddToCart(shop, item, priceType, qty = 1, level = 0) {
    const priceField = PRICE_TYPES.find((p) => p.type === priceType)
    const priceText = item[priceField.field]
    const baseCp = parsePriceToCopper(priceText)
    const multiplier = getEnhancementMultiplier(level, state.enhancementMultipliers)
    const priceCp = baseCp != null ? baseCp * multiplier : null
    const priceLabel = level > 0 ? `${priceField.label} +${level} (x${multiplier})` : priceField.label
    setCartState((prev) => {
      const existing = prev.items.find(
        (i) =>
          i.shopId === shop.id &&
          i.itemId === item.id &&
          i.priceType === priceType &&
          i.priceText === priceText &&
          i.level === level,
      )
      if (existing) {
        return {
          ...prev,
          items: prev.items.map((i) => (i.cartId === existing.cartId ? { ...i, qty: i.qty + qty } : i)),
        }
      }
      return {
        ...prev,
        items: [
          ...prev.items,
          {
            cartId: createId('cart'),
            shopId: shop.id,
            shopName: shop.name,
            itemId: item.id,
            itemName: item.name,
            priceType,
            priceLabel,
            priceText: level > 0 ? `${priceText} → ${formatCopper(priceCp)}` : priceText,
            priceCp,
            level,
            qty,
          },
        ],
      }
    })
  }

  const totalItems = shops.reduce((sum, s) => sum + s.items.length, 0)

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">ร้านค้า</h1>
          <p className="text-sm text-stone-500">
            {shops.length} ร้านค้า · {totalItems} รายการทั้งหมด
          </p>
        </div>
        {!selectedShop && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEnhancementSettingsOpen(true)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-stone-700 hover:bg-[#f5ede0]"
            >
              ⚙ ตั้งค่าราคาตีบวก
            </button>
            <button
              onClick={() => setShopForm({ mode: 'create' })}
              className="rounded-md bg-violet-700 px-4 py-2 text-sm font-medium text-white hover:bg-violet-800"
            >
              + เพิ่มร้านค้า
            </button>
          </div>
        )}
      </div>

      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-violet-300 bg-white px-5 py-3 text-sm font-medium text-violet-700 shadow-lg hover:bg-violet-50"
      >
        🛒 ตระกร้า
        {cartState.items.length > 0 && (
          <span className="rounded-full bg-violet-700 px-2 py-0.5 text-xs font-semibold text-white">
            {cartState.items.length}
          </span>
        )}
      </button>

      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหารายการ (ชื่อ, หมวดหลัก, หมวดรอง, หมายเหตุ) ทุกร้านค้า..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-md border border-gray-300 px-2 py-1.5 text-sm text-stone-700"
          >
            <option value="">หมวดหลัก: ทั้งหมด</option>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={filterSubCategory}
            onChange={(e) => {
              const value = e.target.value
              setFilterSubCategory(value)
              if (value && !filterCategory) {
                const group = groupedSubCategoryOptions.find((g) => g.subs.includes(value))
                if (group) setFilterCategory(group.category)
              }
            }}
            className="rounded-md border border-gray-300 px-2 py-1.5 text-sm text-stone-700"
          >
            <option value="">หมวดรอง: ทั้งหมด</option>
            {groupedSubCategoryOptions.map((group) => (
              <optgroup key={group.category} label={group.category}>
                {group.subs.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="rounded-md border border-gray-300 px-2 py-1.5 text-sm text-stone-700"
          >
            <option value="">Tag: ทั้งหมด</option>
            {tagOptions.map((tag) => (
              <option key={tag.key} value={tag.key}>
                {tag.label}
              </option>
            ))}
          </select>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-md px-2 py-1.5 text-xs text-stone-500 underline decoration-dotted hover:text-stone-700"
            >
              ล้างตัวกรอง
            </button>
          )}
        </div>
      </div>

      {selectedShop ? (
        <ShopDetailView
          key={selectedShop.id}
          shop={selectedShop}
          onBack={closeShop}
          onEdit={() => setShopForm({ mode: 'edit', shop: selectedShop })}
          onDelete={() => setDeleteShop(selectedShop)}
          query={normalizedQuery}
          filters={filters}
          dispatch={dispatch}
          showToast={showToast}
          onAddToCart={handleAddToCart}
          enhancementMultipliers={enhancementMultipliers}
        />
      ) : shops.length === 0 ? (
        <p className="text-sm text-stone-400">ยังไม่มีร้านค้า กด "+ เพิ่มร้านค้า" เพื่อเริ่มต้น</p>
      ) : visibleShops.length === 0 ? (
        <p className="text-sm text-stone-400">ไม่พบร้านค้าหรือรายการที่ตรงกับคำค้นหา/ตัวกรอง</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleShops.map((shop) => {
            const matched = shop.items.filter(
              (item) => itemMatchesQuery(item, normalizedQuery) && itemMatchesFilters(item, filters),
            )
            return (
              <ShopTile
                key={shop.id}
                shop={shop}
                totalCount={shop.items.length}
                matchedCount={matched.length}
                isFiltered={Boolean(normalizedQuery || hasActiveFilters)}
                onSelect={() => openShop(shop.id)}
                onEdit={() => setShopForm({ mode: 'edit', shop })}
                onDelete={() => setDeleteShop(shop)}
              />
            )
          })}
        </div>
      )}

      <ShopFormModal
        key={shopForm ? (shopForm.mode === 'edit' ? shopForm.shop.id : 'create') : 'closed'}
        open={!!shopForm}
        onClose={() => setShopForm(null)}
        shop={shopForm?.mode === 'edit' ? shopForm.shop : null}
        onSubmit={handleShopSubmit}
      />

      <ConfirmDialog
        open={!!deleteShop}
        title="ลบร้านค้า"
        message={`ต้องการลบร้านค้า "${deleteShop?.name}" หรือไม่? รายการทั้งหมดในร้านจะถูกลบไปด้วย`}
        confirmLabel="ลบ"
        danger
        onCancel={() => setDeleteShop(null)}
        onConfirm={() => {
          dispatch({ type: 'DELETE_SHOP', payload: { id: deleteShop.id } })
          if (deleteShop.id === selectedShopId) closeShop()
          setDeleteShop(null)
          showToast('ลบร้านค้าแล้ว', 'success')
        }}
      />

      <CartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartState={cartState}
        setCartState={setCartState}
        showToast={showToast}
        onGoToRoll={() => {
          setCartOpen(false)
          navigate('/roll')
        }}
      />

      <EnhancementSettingsModal
        open={enhancementSettingsOpen}
        onClose={() => setEnhancementSettingsOpen(false)}
        multipliers={enhancementMultipliers}
        onSubmit={(next) => {
          dispatch({ type: 'UPDATE_ENHANCEMENT_MULTIPLIERS', payload: next })
          setEnhancementSettingsOpen(false)
          showToast('บันทึกตัวคูณราคาตีบวกแล้ว', 'success')
        }}
      />
    </div>
  )
}
