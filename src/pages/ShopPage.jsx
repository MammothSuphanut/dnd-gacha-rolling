import { useEffect, useMemo, useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useSearchParams } from 'react-router-dom'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import SearchSelect from '../components/SearchSelect'
import AddCartToCharacterModal from '../components/AddCartToCharacterModal'
import ItemStatblockModal from '../components/ItemStatblockModal'
import { useGachaStore } from '../store/GachaStore'
import { useToast } from '../store/ToastContext'
import { createId } from '../utils/id'
import {
  CURRENCY_UNITS,
  DEFAULT_ENHANCEMENT_MULTIPLIERS,
  ENHANCEMENT_LEVELS,
  ENHANCEMENT_UPGRADE_RATES,
  PRICE_TYPES,
  applyAntiBreak,
  applyAntiDowngrade,
  applyPriceAdjustment,
  applySuccessBoost,
  flatAmountsToCopper,
  formatCopper,
  getEnhancementMultiplier,
  getUpgradeCostCp,
  ITEM_RARITY_PRICES,
  parsePriceToCopper,
  REPAIR_DAMAGE_LEVELS,
  REPAIR_DAMAGE_RATES,
  rollUpgradeOutcome,
} from '../utils/price'

function blankItem() {
  return {
    id: createId('shopitem'),
    name: '',
    category: '',
    subCategory: '',
    rarity: '',
    priceNormal: '',
    priceCheap: '',
    priceExpensive: '',
    limitedStock: false,
    rural: false,
    urban: false,
    premium: false,
    enhanceable: false,
    magical: false,
    nonMagical: true,
    attunement: false,
    cursed: false,
    consumable: false,
    description: '',
  }
}

function itemMatchesQuery(item, q) {
  if (!q) return true
  const haystack = `${item.name} ${item.category} ${item.subCategory} ${item.rarity} ${item.description}`.toLowerCase()
  return haystack.includes(q)
}

function itemMatchesFilters(item, filters) {
  if (filters?.category && item.category !== filters.category) return false
  if (filters?.subCategory && item.subCategory !== filters.subCategory) return false
  if (filters?.rarity && item.rarity !== filters.rarity) return false
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
  {
    key: 'magical',
    label: 'เวทมนตร์',
    tooltip: 'ไอเทมเวทมนตร์ มีความหายาก (rarity) กำกับ',
  },
  {
    key: 'nonMagical',
    label: 'ไม่มีเวทมนตร์',
    tooltip: 'ของธรรมดา ไม่มีคุณสมบัติวิเศษ',
  },
  {
    key: 'attunement',
    label: 'ต้องร่ายผูกพัน',
    tooltip: 'ต้องใช้ Attunement (ร่ายผูกพัน) ก่อนจึงจะใช้ความสามารถพิเศษของไอเทมนี้ได้',
  },
  {
    key: 'cursed',
    label: 'ต้องคำสาป',
    tooltip: 'ไอเทมนี้มีคำสาปแฝงอยู่ ผู้เล่นอาจไม่รู้ตัวจนกว่าจะร่ายผูกพันหรือใช้งาน',
  },
  {
    key: 'consumable',
    label: 'ใช้แล้วหมด',
    tooltip: 'ของใช้ครั้งเดียวหมดไป เช่น ยาน้ำ ม้วนคาถา หรือกระสุน',
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

const UPGRADE_OUTCOME_META = {
  success: { label: 'สำเร็จ!', icon: '✨', badge: 'bg-green-100 text-green-700 border-green-300' },
  fail: { label: 'ไม่สำเร็จ', icon: '➖', badge: 'bg-stone-100 text-stone-600 border-stone-300' },
  downgrade: { label: 'ลดขั้น!', icon: '⬇️', badge: 'bg-amber-100 text-amber-700 border-amber-300' },
  break: { label: 'พัง!', icon: '💥', badge: 'bg-red-100 text-red-700 border-red-300' },
}

const UPGRADE_PROB_BAR_META = [
  { key: 'success', label: 'สำเร็จ', color: 'bg-green-500' },
  { key: 'fail', label: 'ไม่สำเร็จ', color: 'bg-stone-300' },
  { key: 'downgrade', label: 'ลดขั้น', color: 'bg-amber-500' },
  { key: 'break', label: 'พัง', color: 'bg-red-500' },
]

function ItemPreviewCard({ item, shopName }) {
  const tags = TAG_LABELS.filter((tag) => item[tag.key])
  return (
    <div className="rounded-lg border border-[#e2cfb3] bg-white p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="flex items-center gap-1.5 font-semibold text-stone-900">
            {item.name}
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="เปิดหน้าไอเทมนี้ใน 5e.tools"
                className="text-emerald-600 hover:text-emerald-700"
              >
                🔗
              </a>
            ) : (
              <span title="ไม่มีลิงก์ 5e.tools — ดูคำอธิบายด้านล่าง" className="text-stone-300">
                🔗
              </span>
            )}
          </p>
          <p className="text-xs text-stone-400">
            {shopName}
            {(item.category || item.subCategory || item.rarity) && ' · '}
            {item.category}
            {item.category && item.subCategory ? ' / ' : ''}
            {item.subCategory}
            {(item.category || item.subCategory) && item.rarity ? ' · ' : ''}
            {item.rarity}
          </p>
        </div>
      </div>
      {item.description && <p className="mt-1.5 text-xs text-stone-500">{item.description}</p>}
      <div className="mt-2 flex flex-wrap gap-3 text-xs">
        {PRICE_TYPES.filter((p) => item[p.field]).map((p) => (
          <span key={p.type} className="text-stone-600">
            <span className="text-stone-400">{p.label}:</span>{' '}
            <span className="font-medium text-stone-900">{item[p.field]}</span>
          </span>
        ))}
      </div>
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span key={tag.key} className="rounded-full bg-[#f5ede0] px-2 py-0.5 text-[11px] text-stone-600">
              {tag.label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function EnhanceUpgradeModal({ open, onClose, shops, enhancementMultipliers, onAddCostToCart, showToast }) {
  const enhanceableOptions = useMemo(() => {
    const list = []
    for (const shop of shops) {
      for (const item of shop.items) {
        if (item.enhanceable) list.push({ shopId: shop.id, shopName: shop.name, item })
      }
    }
    return list
  }, [shops])

  const itemSearchOptions = useMemo(
    () =>
      enhanceableOptions.map((o) => ({
        value: `${o.shopId}::${o.item.id}`,
        label: o.item.name,
        group: o.shopName,
      })),
    [enhanceableOptions],
  )

  const [mode, setMode] = useState('forge')
  const isRepair = mode === 'repair'
  const verb = isRepair ? 'ซ่อมแซม' : 'ตีบวก'
  const [selectedKey, setSelectedKey] = useState('')
  const [priceTier, setPriceTier] = useState('normal')
  const [currentLevel, setCurrentLevel] = useState(0)
  const [broken, setBroken] = useState(false)
  const [history, setHistory] = useState([])
  const [rolling, setRolling] = useState(false)
  const [boostMode, setBoostMode] = useState('percent')
  const [boostValue, setBoostValue] = useState('')
  const [antiDowngrade, setAntiDowngrade] = useState(false)
  const [antiBreak, setAntiBreak] = useState(false)
  const [repairDamage, setRepairDamage] = useState(100)
  const [manualPriceAmounts, setManualPriceAmounts] = useState({})
  const [manualRarity, setManualRarity] = useState('')

  function setManualPriceUnit(unit, value) {
    setManualPriceAmounts((prev) => ({ ...prev, [unit]: value }))
  }

  useEffect(() => {
    if (open) {
      setSelectedKey((prev) => (prev && enhanceableOptions.some((o) => `${o.shopId}::${o.item.id}` === prev) ? prev : ''))
    }
  }, [open, enhanceableOptions])

  function resetSimulation() {
    setCurrentLevel(0)
    setBroken(false)
    setHistory([])
    setRepairDamage(100)
  }

  if (!open) return null

  const selected = enhanceableOptions.find((o) => `${o.shopId}::${o.item.id}` === selectedKey)
  const item = selected?.item
  const itemName = item?.name ?? 'ไอเทมที่กำหนดเอง'

  const availableTiers = item ? PRICE_TYPES.filter((p) => item[p.field]) : []
  const activeTier = availableTiers.some((p) => p.type === priceTier) ? priceTier : availableTiers[0]?.type

  const targetLevel = Math.min(currentLevel + 1, 3)
  const canUpgrade = isRepair ? !broken : !broken && currentLevel < 3

  const priceField = activeTier ? PRICE_TYPES.find((p) => p.type === activeTier)?.field : null
  const basePriceText = priceField ? item?.[priceField] : null
  const hasManualPrice = CURRENCY_UNITS.some((unit) => manualPriceAmounts[unit])
  const basePriceCp = item
    ? (basePriceText ? parsePriceToCopper(basePriceText) : null)
    : hasManualPrice
      ? flatAmountsToCopper(manualPriceAmounts)
      : null
  const costCp = canUpgrade ? getUpgradeCostCp(basePriceCp, currentLevel, enhancementMultipliers) : null

  let effectiveRates
  if (isRepair) {
    effectiveRates = REPAIR_DAMAGE_RATES[repairDamage] ?? REPAIR_DAMAGE_RATES[100]
  } else {
    effectiveRates = ENHANCEMENT_UPGRADE_RATES[targetLevel] ?? ENHANCEMENT_UPGRADE_RATES[1]
    if (antiDowngrade) effectiveRates = applyAntiDowngrade(effectiveRates)
    if (antiBreak) effectiveRates = applyAntiBreak(effectiveRates)
  }
  effectiveRates = applySuccessBoost(effectiveRates, boostMode, boostValue)

  const rates = UPGRADE_PROB_BAR_META.map((meta) => ({
    ...meta,
    value: effectiveRates[meta.key] ?? 0,
  })).filter((r) => r.value > 0)
  const finishedPriceCp =
    basePriceCp != null ? basePriceCp * getEnhancementMultiplier(targetLevel, enhancementMultipliers) : null

  function handleSelectItem(key) {
    setSelectedKey(key)
    resetSimulation()
  }

  function handleRoll() {
    if (!canUpgrade || costCp == null) return
    setRolling(true)
    setTimeout(() => {
      const outcome = rollUpgradeOutcome(effectiveRates)
      const fromLevel = currentLevel
      let toLevel = fromLevel
      if (!isRepair) {
        if (outcome === 'success') toLevel = targetLevel
        else if (outcome === 'downgrade') toLevel = Math.max(0, fromLevel - 1)
      }

      setHistory((prev) => [
        { id: createId('roll'), outcome, cost: costCp, fromLevel, toLevel, isRepair },
        ...prev,
      ].slice(0, 8))

      // Every attempt costs money regardless of outcome — charge it to the buy cart.
      if (costCp != null) {
        onAddCostToCart({
          cartId: createId('cart'),
          shopId: selected?.shopId ?? 'manual',
          shopName: selected?.shopName ?? 'กำหนดเอง',
          itemId: item?.id ?? itemName,
          itemName: `${verb}: ${itemName}`,
          priceType: isRepair ? 'repair' : 'enhance',
          priceLabel: isRepair ? `ค่าซ่อม (+${currentLevel})` : `ค่าตีบวก (+${currentLevel} → +${targetLevel})`,
          priceText: formatCopper(costCp),
          priceCp: costCp,
          level: isRepair ? currentLevel : targetLevel,
          qty: 1,
        })
      }

      if (outcome === 'break') {
        setBroken(true)
        showToast(`💥 "${itemName}" แตกพัง! ต้องซื้อชิ้นใหม่`, 'error')
      } else {
        setCurrentLevel(toLevel)
        if (outcome === 'success') {
          showToast(
            isRepair ? `✨ ${verb} "${itemName}" สำเร็จ! ไอเทมกลับมาสภาพสมบูรณ์` : `✨ ${verb} "${itemName}" สำเร็จ! ตอนนี้ +${toLevel}`,
            'success',
          )
        } else if (outcome === 'downgrade') {
          showToast(`⬇️ ${verb}ลดขั้น! "${itemName}" เหลือ +${toLevel}`, 'error')
        } else {
          showToast(`${verb} "${itemName}" ไม่สำเร็จ ลองใหม่อีกครั้ง`, 'info')
        }
      }
      setRolling(false)
    }, 450)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[#e2cfb3] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e2cfb3] bg-gradient-to-r from-violet-700 to-violet-600 px-5 py-4">
          <h2 className="font-cinzel text-lg font-semibold text-white">{isRepair ? '🔧 ซ่อมแซมอุปกรณ์' : '🔨 ตีบวกอุปกรณ์'}</h2>
          <button onClick={onClose} className="text-violet-200 hover:text-white">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="mb-4 flex gap-1.5">
            <button
              type="button"
              onClick={() => {
                setMode('forge')
                resetSimulation()
              }}
              className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${
                !isRepair
                  ? 'border-violet-600 bg-violet-700 text-white'
                  : 'border-gray-300 text-stone-600 hover:bg-[#f5ede0]'
              }`}
            >
              🔨 ตีบวก
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('repair')
                resetSimulation()
              }}
              className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${
                isRepair
                  ? 'border-violet-600 bg-violet-700 text-white'
                  : 'border-gray-300 text-stone-600 hover:bg-[#f5ede0]'
              }`}
            >
              🔧 ซ่อมแซม
            </button>
          </div>

          <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700">อุปกรณ์</label>
                <SearchSelect
                  options={itemSearchOptions}
                  value={selectedKey}
                  onChange={handleSelectItem}
                  placeholder="พิมพ์ชื่ออุปกรณ์เพื่อค้นหา..."
                  clearLabel="เปลี่ยนอุปกรณ์"
                  emptyOptionsLabel="ยังไม่มีสินค้าที่ติด Tag &quot;ตีบวกได้&quot; ในร้านค้าใดเลย"
                  noMatchLabel="ไม่พบอุปกรณ์ที่ตรงกับคำค้นหา"
                  className="mt-1"
                />
                {enhanceableOptions.length === 0 && (
                  <p className="mt-1 text-xs text-stone-400">
                    ยังไม่มีสินค้าที่ติด Tag "ตีบวกได้" ในร้านค้าใดเลย ลองเปิดโหมดแก้ไขรายการแล้วติ๊ก Tag ตีบวกได้ก่อน หรือกำหนดราคาเองด้านล่าง
                  </p>
                )}
              </div>

              {item ? (
                <ItemPreviewCard item={item} shopName={selected.shopName} />
              ) : (
                <div className="rounded-lg border border-[#e2cfb3] bg-white p-3">
                  <div>
                    <label className="block text-sm font-medium text-stone-700">ระดับความหายาก (อ้างอิง)</label>
                    <select
                      value={manualRarity}
                      onChange={(e) => setManualRarity(e.target.value)}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    >
                      <option value="">-- เลือกเพื่อดูราคาอ้างอิง --</option>
                      {ITEM_RARITY_PRICES.map((r) => (
                        <option key={r.key} value={r.key}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                    {manualRarity && (
                      <p className="mt-1 text-xs text-stone-500">
                        ราคาอ้างอิงตามกฎ D&D: {ITEM_RARITY_PRICES.find((r) => r.key === manualRarity)?.priceText}
                      </p>
                    )}
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-stone-700">ราคาปกติ</label>
                    <div className="mt-1 flex gap-1.5">
                      {CURRENCY_UNITS.map((unit) => (
                        <div key={unit} className="flex flex-col items-center">
                          <input
                            type="number"
                            min="0"
                            value={manualPriceAmounts[unit] ?? ''}
                            onChange={(e) => setManualPriceUnit(unit, e.target.value)}
                            placeholder="0"
                            className="w-16 rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                          />
                          <span className="mt-0.5 text-[10px] text-stone-400">{unit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {availableTiers.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-stone-700">เรทราคา</label>
                  <div className="mt-1 flex gap-1.5">
                    {availableTiers.map((p) => {
                      const tierBaseCp = parsePriceToCopper(item[p.field])
                      const tierCostCp = canUpgrade ? getUpgradeCostCp(tierBaseCp, currentLevel, enhancementMultipliers) : null
                      return (
                        <button
                          key={p.type}
                          type="button"
                          onClick={() => setPriceTier(p.type)}
                          className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
                            activeTier === p.type
                              ? 'border-violet-600 bg-violet-700 text-white'
                              : 'border-gray-300 text-stone-600 hover:bg-[#f5ede0]'
                          }`}
                        >
                          {p.label} ({tierCostCp != null ? formatCopper(tierCostCp) : item[p.field]})
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {isRepair ? (
                <div>
                  <label className="block text-sm font-medium text-stone-700">ระดับความเสียหาย</label>
                  <select
                    value={repairDamage}
                    onChange={(e) => setRepairDamage(Number(e.target.value))}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  >
                    {REPAIR_DAMAGE_LEVELS.map((lvl, idx) => (
                      <option key={lvl} value={lvl}>
                        ระดับ {idx + 1}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="rounded-md border border-gray-300 bg-[#f5ede0] px-3 py-2 text-sm text-stone-700">
                  ระดับปัจจุบัน <span className="font-semibold">+{currentLevel}</span> → กำลังตี{' '}
                  <span className="font-semibold">+{targetLevel}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-stone-700">เพิ่มโอกาสสำเร็จ</label>
                <div className="mt-1 flex gap-1.5">
                  <input
                    type="number"
                    min="0"
                    value={boostValue}
                    onChange={(e) => setBoostValue(e.target.value)}
                    placeholder="0"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />
                  <select
                    value={boostMode}
                    onChange={(e) => setBoostMode(e.target.value)}
                    className="rounded-md border border-gray-300 px-2 py-2 text-sm"
                  >
                    <option value="percent">%</option>
                    <option value="times">เท่า</option>
                  </select>
                </div>
                <p className="mt-1 text-xs text-stone-400">
                  เพิ่มโอกาสสำเร็จแล้วลดโอกาสอื่น ๆ ลงตามสัดส่วน
                </p>
              </div>

              {!isRepair && (
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-1.5 text-sm text-stone-700">
                    <input
                      type="checkbox"
                      checked={antiDowngrade}
                      onChange={(e) => setAntiDowngrade(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-violet-700 focus:ring-violet-600"
                    />
                    กันลด
                  </label>
                  <label className="flex items-center gap-1.5 text-sm text-stone-700">
                    <input
                      type="checkbox"
                      checked={antiBreak}
                      onChange={(e) => setAntiBreak(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-violet-700 focus:ring-violet-600"
                    />
                    กันแตก
                  </label>
                </div>
              )}

              {broken ? (
                <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-center">
                  <p className="text-2xl">💥</p>
                  <p className="mt-1 text-sm font-medium text-red-700">ไอเทมชิ้นนี้แตกพังจากการตีบวก!</p>
                  <p className="mt-1 text-xs text-red-500">ต้องซื้อชิ้นใหม่มาเริ่มตีบวกอีกครั้ง</p>
                  <button
                    type="button"
                    onClick={resetSimulation}
                    className="mt-3 rounded-md border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    เริ่มใหม่ (ซื้อชิ้นใหม่)
                  </button>
                </div>
              ) : !canUpgrade ? (
                <div className="rounded-lg border border-green-300 bg-green-50 p-4 text-center text-sm font-medium text-green-700">
                  🎉 ไอเทมนี้ตีบวกถึงขั้นสูงสุด (+3) แล้ว
                </div>
              ) : (
                <div className="rounded-lg border border-[#e2cfb3] bg-[#f5ede0] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="text-stone-500">
                      ราคาต่อครั้ง {isRepair ? `(+${currentLevel})` : `(+${currentLevel} → +${targetLevel})`}
                    </span>
                    <span className="font-semibold text-stone-900">
                      {costCp != null ? formatCopper(costCp) : 'คำนวณราคาไม่ได้'}
                    </span>
                  </div>
                  {!isRepair && finishedPriceCp != null && costCp != null && (
                    <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
                      <span>ราคาซื้อของสำเร็จรูป +{targetLevel} (อ้างอิง)</span>
                      <span>{formatCopper(finishedPriceCp)}</span>
                    </div>
                  )}

                  <div className="mt-3">
                    <div className="mb-1 flex justify-between text-xs text-stone-500">
                      <span>โอกาสของการ{verb}ครั้งนี้</span>
                    </div>
                    <div className="flex h-3 w-full overflow-hidden rounded-full bg-gray-200">
                      {rates.map((r) => (
                        <div
                          key={r.key}
                          className={r.color}
                          style={{ width: `${r.value * 100}%` }}
                          title={`${r.label} ${Math.round(r.value * 100)}%`}
                        />
                      ))}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                      {rates.map((r) => (
                        <span key={r.key} className="flex items-center gap-1 text-stone-600">
                          <span className={`inline-block h-2 w-2 rounded-full ${r.color}`} />
                          {r.label} {Math.round(r.value * 100)}%
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={costCp == null || rolling}
                    onClick={handleRoll}
                    className="mt-4 w-full rounded-md bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:bg-violet-800 disabled:cursor-not-allowed disabled:bg-gray-300 active:scale-[0.98]"
                  >
                    {rolling
                      ? `🎲 กำลัง${verb}...`
                      : `${isRepair ? '🔧' : '🔨'} ${verb} (จ่าย ${costCp != null ? formatCopper(costCp) : '-'})`}
                  </button>
                </div>
              )}

              {history.length > 0 && (
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-medium text-stone-500">ประวัติการ{verb} (ล่าสุดก่อน)</span>
                    <button
                      type="button"
                      onClick={resetSimulation}
                      className="text-xs text-stone-400 underline decoration-dotted hover:text-stone-600"
                    >
                      ล้างประวัติ / เริ่มใหม่
                    </button>
                  </div>
                  <div className="space-y-1">
                    {history.map((h) => {
                      const meta = UPGRADE_OUTCOME_META[h.outcome]
                      return (
                        <div
                          key={h.id}
                          className={`flex items-center justify-between rounded-md border px-2.5 py-1.5 text-xs ${meta.badge}`}
                        >
                          <span>
                            {meta.icon} {meta.label}{' '}
                            {h.isRepair ? `(+${h.fromLevel})` : `(+${h.fromLevel} → +${h.toLevel})`}
                          </span>
                          <span>{formatCopper(h.cost)}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  )
}

const CONDITION_LEVELS = REPAIR_DAMAGE_LEVELS

const DEFAULT_PRICE_ADJUST = { sign: '+', mode: 'percent', value: '' }

// Bidirectional price adjuster (+ or -, percent or flat) — used for
// "haggling" a cart total up or down.
function PriceAdjustInput({ adjust, onChange, className = '' }) {
  const a = adjust ?? DEFAULT_PRICE_ADJUST

  function handleModeChange(mode) {
    if (mode === a.mode) return
    onChange({ ...a, mode, value: mode === 'flat' ? {} : '' })
  }

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      <div className="flex overflow-hidden rounded-md border border-gray-300">
        <button
          type="button"
          onClick={() => onChange({ ...a, sign: '+' })}
          className={`px-2.5 py-1.5 text-sm font-medium ${
            a.sign === '+' ? 'bg-green-600 text-white' : 'bg-white text-stone-600 hover:bg-[#f5ede0]'
          }`}
        >
          +
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...a, sign: '-' })}
          className={`px-2.5 py-1.5 text-sm font-medium ${
            a.sign === '-' ? 'bg-red-600 text-white' : 'bg-white text-stone-600 hover:bg-[#f5ede0]'
          }`}
        >
          −
        </button>
      </div>
      <select
        value={a.mode}
        onChange={(e) => handleModeChange(e.target.value)}
        className="rounded-md border border-gray-300 px-2 py-1.5 text-sm"
      >
        <option value="percent">%</option>
        <option value="flat">จำนวนเงิน</option>
      </select>
      {a.mode === 'percent' ? (
        <input
          type="number"
          min="0"
          value={a.value}
          onChange={(e) => onChange({ ...a, value: e.target.value })}
          placeholder="0"
          className="w-24 rounded-md border border-gray-300 px-2 py-1.5 text-sm"
        />
      ) : (
        <div className="flex gap-1">
          {CURRENCY_UNITS.map((unit) => (
            <div key={unit} className="flex flex-col items-center">
              <input
                type="number"
                min="0"
                value={a.value?.[unit] ?? ''}
                onChange={(e) => onChange({ ...a, value: { ...a.value, [unit]: e.target.value } })}
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

function AppraiseModal({ open, onClose, shops, enhancementMultipliers, onAddToSellCart, showToast }) {
  const allOptions = useMemo(() => {
    const list = []
    for (const shop of shops) {
      for (const item of shop.items) {
        list.push({ shopId: shop.id, shopName: shop.name, item })
      }
    }
    return list
  }, [shops])

  const searchOptions = useMemo(
    () =>
      allOptions.map((o) => ({
        value: `${o.shopId}::${o.item.id}`,
        label: o.item.name,
        group: o.shopName,
      })),
    [allOptions],
  )

  const [selectedKey, setSelectedKey] = useState('')
  const [priceTier, setPriceTier] = useState('normal')
  const [qty, setQty] = useState(1)
  const [condition, setCondition] = useState(100)
  const [enhanceLevel, setEnhanceLevel] = useState(0)
  const [rarity, setRarity] = useState('')
  const [adjust, setAdjust] = useState(DEFAULT_PRICE_ADJUST)
  const [manualItemName, setManualItemName] = useState('')
  const [manualPriceAmounts, setManualPriceAmounts] = useState({})

  function setManualPriceUnit(unit, value) {
    setManualPriceAmounts((prev) => ({ ...prev, [unit]: value }))
  }

  useEffect(() => {
    if (!open) {
      setSelectedKey('')
      setPriceTier('normal')
      setQty(1)
      setCondition(100)
      setEnhanceLevel(0)
      setRarity('')
      setAdjust(DEFAULT_PRICE_ADJUST)
      setManualItemName('')
      setManualPriceAmounts({})
    }
  }, [open])

  if (!open) return null

  const selected = allOptions.find((o) => `${o.shopId}::${o.item.id}` === selectedKey)
  const item = selected?.item

  function handleSelectKey(key) {
    setSelectedKey(key)
    setPriceTier('normal')
    setEnhanceLevel(0)
  }

  const availableTiers = item ? PRICE_TYPES.filter((p) => item[p.field]) : []
  const activeTier = availableTiers.some((p) => p.type === priceTier) ? priceTier : availableTiers[0]?.type
  const priceField = activeTier ? PRICE_TYPES.find((p) => p.type === activeTier)?.field : null
  const unitBasePriceText = priceField ? item?.[priceField] : null
  const hasManualPrice = CURRENCY_UNITS.some((unit) => manualPriceAmounts[unit])
  const unitBasePriceCp = item
    ? (unitBasePriceText ? parsePriceToCopper(unitBasePriceText) : null)
    : hasManualPrice
      ? flatAmountsToCopper(manualPriceAmounts)
      : null

  const conditionFactor = condition / 100
  const enhanceMultiplier = getEnhancementMultiplier(enhanceLevel, enhancementMultipliers)
  const unitEstimateCp = unitBasePriceCp != null ? unitBasePriceCp * conditionFactor * enhanceMultiplier : null
  const safeQty = Math.max(1, Math.floor(Number(qty)) || 1)
  const subtotalCp = unitEstimateCp != null ? unitEstimateCp * safeQty : null
  const totalCp = subtotalCp != null ? applyPriceAdjustment(subtotalCp, adjust) : null

  const itemName = item?.name ?? manualItemName.trim()

  function handleAddToSellCart() {
    if (!itemName || totalCp == null) return
    const conditionIdx = CONDITION_LEVELS.indexOf(condition)
    onAddToSellCart({
      cartId: createId('sellcart'),
      shopId: selected?.shopId ?? 'manual',
      shopName: selected?.shopName ?? 'กำหนดเอง',
      itemId: item?.id ?? itemName,
      itemName,
      priceLabel: activeTier ? PRICE_TYPES.find((p) => p.type === activeTier)?.label : 'ราคาที่กำหนดเอง',
      conditionLabel: `ระดับ ${conditionIdx + 1} (${condition}%)`,
      enhanceLevel,
      qty: safeQty,
      priceCp: totalCp / safeQty,
    })
    showToast(`เพิ่ม "${itemName}" ลงตระกร้าขายแล้ว`, 'success')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[#e2cfb3] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e2cfb3] bg-gradient-to-r from-violet-700 to-violet-600 px-5 py-4">
          <h2 className="font-cinzel text-lg font-semibold text-white">💰 ประเมินราคาขาย</h2>
          <button onClick={onClose} className="text-violet-200 hover:text-white">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700">ค้นหาไอเทม</label>
              <SearchSelect
                options={searchOptions}
                value={selectedKey}
                onChange={handleSelectKey}
                placeholder="พิมพ์ชื่อไอเทมเพื่อค้นหา..."
                clearLabel="เปลี่ยนไอเทม"
                emptyOptionsLabel="ยังไม่มีสินค้าในร้านค้าใดเลย"
                noMatchLabel="ไม่พบไอเทมที่ตรงกับคำค้นหา"
                className="mt-1"
              />
            </div>

            {item ? (
              <ItemPreviewCard item={item} shopName={selected.shopName} />
            ) : (
              <div className="rounded-lg border border-[#e2cfb3] bg-white p-3">
                <div>
                  <label className="block text-sm font-medium text-stone-700">ชื่อไอเทม</label>
                  <input
                    type="text"
                    value={manualItemName}
                    onChange={(e) => setManualItemName(e.target.value)}
                    placeholder="ระบุชื่อไอเทม"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-stone-700">ราคาปกติ</label>
                  <div className="mt-1 flex gap-1.5">
                    {CURRENCY_UNITS.map((unit) => (
                      <div key={unit} className="flex flex-col items-center">
                        <input
                          type="number"
                          min="0"
                          value={manualPriceAmounts[unit] ?? ''}
                          onChange={(e) => setManualPriceUnit(unit, e.target.value)}
                          placeholder="0"
                          className="w-16 rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                        />
                        <span className="mt-0.5 text-[10px] text-stone-400">{unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {availableTiers.length > 1 && (
              <div>
                <label className="block text-sm font-medium text-stone-700">เรทราคา</label>
                <div className="mt-1 flex gap-1.5">
                  {availableTiers.map((p) => (
                    <button
                      key={p.type}
                      type="button"
                      onClick={() => setPriceTier(p.type)}
                      className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
                        activeTier === p.type
                          ? 'border-violet-600 bg-violet-700 text-white'
                          : 'border-gray-300 text-stone-600 hover:bg-[#f5ede0]'
                      }`}
                    >
                      {p.label} ({item[p.field]})
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-stone-700">จำนวน</label>
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700">ระดับ +1 ถึง +3</label>
                <select
                  value={enhanceLevel}
                  onChange={(e) => setEnhanceLevel(Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value={0}>ปกติ (+0)</option>
                  {ENHANCEMENT_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      +{lvl} (x{getEnhancementMultiplier(lvl, enhancementMultipliers)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-stone-700">สภาพ (ตามระดับซ่อมแซม)</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                >
                  {CONDITION_LEVELS.map((lvl, idx) => (
                    <option key={lvl} value={lvl}>
                      ระดับ {idx + 1} ({lvl}%)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700">ระดับความหายาก (อ้างอิง)</label>
                <select
                  value={rarity}
                  onChange={(e) => setRarity(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="">-- ไม่ระบุ --</option>
                  {ITEM_RARITY_PRICES.map((r) => (
                    <option key={r.key} value={r.key}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {rarity && (
              <p className="-mt-2 text-xs text-stone-500">
                ราคาอ้างอิงตามกฎ D&D สำหรับความหายากนี้: {ITEM_RARITY_PRICES.find((r) => r.key === rarity)?.priceText}
                {' '}(ใช้เทียบเคียงเท่านั้น ไม่รวมในการคำนวณ)
              </p>
            )}

            <div className="rounded-lg border border-[#e2cfb3] bg-[#f5ede0] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="text-stone-500">ราคาประเมิน/ชิ้น</span>
                <span className="font-medium text-stone-900">
                  {unitEstimateCp != null ? formatCopper(unitEstimateCp) : '-'}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="text-stone-500">จำนวน x {safeQty}</span>
                <span className="font-medium text-stone-900">
                  {subtotalCp != null ? formatCopper(subtotalCp) : '-'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">ต่อราคา (ปรับผลรวม +/-)</label>
              <PriceAdjustInput adjust={adjust} onChange={setAdjust} className="mt-1" />
            </div>

            <div className="rounded-lg border border-violet-300 bg-violet-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-medium text-violet-700">ราคารวม</span>
                <span className="text-xl font-bold text-violet-800">
                  {totalCp != null ? formatCopper(totalCp) : 'เลือกไอเทมและใส่ราคาก่อน'}
                </span>
              </div>
              <button
                type="button"
                disabled={!itemName || totalCp == null}
                onClick={handleAddToSellCart}
                className="mt-3 w-full rounded-md bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:bg-violet-800 disabled:cursor-not-allowed disabled:bg-gray-300 active:scale-[0.98]"
              >
                🧾 ใส่ตระกร้าขาย
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const UNCATEGORIZED_LABEL = 'ไม่ระบุหมวด'

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9ก-๙]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'x'
}

// D&D rarity tiers, low to high — used to sort accordion groups sensibly
// when a shop is grouped by rarity instead of category (see groupField
// below) rather than falling back to insertion/alphabetical order.
const RARITY_ORDER = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact']
function groupSortIndex(label) {
  const i = RARITY_ORDER.indexOf(label)
  return i === -1 ? RARITY_ORDER.length : i
}

// Shared grid template for the virtualized item list (view mode) — used by
// both the header label row and every item row so columns line up.
const ITEM_ROW_GRID_COLS = 'minmax(180px,2fr) 90px 130px 160px 140px 60px 90px'

function ShopDetailView({
  shop,
  onBack,
  onEdit,
  query,
  filters,
  dispatch,
  showToast,
  onAddToCart,
}) {
  const [draftItems, setDraftItems] = useState(() => shop.items.map((item) => ({ ...item })))
  const [dirty, setDirty] = useState(false)
  const [deleteItem, setDeleteItem] = useState(null)
  const [itemEditMode, setItemEditMode] = useState(false)
  const [selectedPriceType, setSelectedPriceType] = useState({})
  const [quantities, setQuantities] = useState({})
  const [focusedGroupSlug, setFocusedGroupSlug] = useState(null)
  // Empty set is a sentinel meaning "nothing toggled yet" — only the first
  // group renders expanded by default (see flatRows below). Once the user
  // expands/collapses anything, membership is taken literally.
  const [expandedGroups, setExpandedGroups] = useState(() => new Set())
  const listScrollRef = useRef(null)
  const [statblockItem, setStatblockItem] = useState(null)

  useEffect(() => {
    setDraftItems(shop.items.map((item) => ({ ...item })))
    setDirty(false)
    setFocusedGroupSlug(null)
    setExpandedGroups(new Set())
  }, [shop.id])

  const categoryOptions = useMemo(
    () => Array.from(new Set(draftItems.map((i) => i.category).filter(Boolean))),
    [draftItems],
  )
  const subCategoryOptions = useMemo(
    () => Array.from(new Set(draftItems.map((i) => i.subCategory).filter(Boolean))),
    [draftItems],
  )
  const rarityOptions = useMemo(
    () => Array.from(new Set(draftItems.map((i) => i.rarity).filter(Boolean))),
    [draftItems],
  )

  const visibleItems = useMemo(
    () => draftItems.filter((item) => itemMatchesQuery(item, query) && itemMatchesFilters(item, filters)),
    [draftItems, query, filters],
  )

  // Shops that hold one uniform category (e.g. a category-specific magic
  // item shop where every row is "Weapon") gain nothing from grouping by
  // category — it collapses into a single giant section. Group by subCategory
  // when that varies, otherwise fall back to rarity (magic-item shops keep
  // subCategory blank and store their tier in `rarity` instead).
  const groupField =
    categoryOptions.length <= 1 && subCategoryOptions.length > 1
      ? 'subCategory'
      : categoryOptions.length <= 1 && rarityOptions.length > 1
        ? 'rarity'
        : 'category'

  const groupedItems = useMemo(() => {
    const map = new Map()
    for (const item of visibleItems) {
      const key = item[groupField] || UNCATEGORIZED_LABEL
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(item)
    }
    const groups = Array.from(map.entries()).map(([category, items]) => ({
      category,
      slug: slugify(category),
      items,
    }))
    // Only reorder when grouping by rarity tier — category grouping keeps the
    // original insertion order existing shops already rely on.
    if (groupField === 'subCategory' || groupField === 'rarity') {
      groups.sort((a, b) => groupSortIndex(a.category) - groupSortIndex(b.category) || a.category.localeCompare(b.category))
    }
    return groups
  }, [visibleItems, groupField])

  const hasActiveFilters = Boolean(filters?.category || filters?.subCategory || filters?.tag)

  const visibleGroups = useMemo(
    () => (focusedGroupSlug ? groupedItems.filter((g) => g.slug === focusedGroupSlug) : groupedItems),
    [groupedItems, focusedGroupSlug],
  )

  function toggleGroupFocus(slug) {
    setFocusedGroupSlug((prev) => (prev === slug ? null : slug))
  }

  const groupSlugsKey = visibleGroups.map((g) => g.slug).join('|')

  // Whenever the visible group list changes shape (shop switch, filter/focus
  // change, search), default back to "only the first group open" — large
  // shops (800+ items) stay cheap to render until the user opens a section.
  useEffect(() => {
    const firstSlug = visibleGroups[0]?.slug
    setExpandedGroups(firstSlug ? new Set([firstSlug]) : new Set())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupSlugsKey])

  function toggleGroupExpanded(slug) {
    setExpandedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  // Flatten every visible group into one row list — a "header" row per group,
  // followed by its "item" rows only when expanded — so the whole shop can be
  // rendered through a single virtualizer instead of one <table> per group.
  // Collapsed groups contribute just their header, so large shops (800+ items)
  // stay cheap until the user actually opens a section.
  const flatRows = useMemo(() => {
    const rows = []
    for (const group of visibleGroups) {
      const expanded = expandedGroups.has(group.slug)
      rows.push({ type: 'header', group, expanded })
      if (expanded) {
        for (const item of group.items) rows.push({ type: 'item', item, group })
      }
    }
    return rows
  }, [visibleGroups, expandedGroups])

  const rowVirtualizer = useVirtualizer({
    count: flatRows.length,
    getScrollElement: () => listScrollRef.current,
    estimateSize: (index) => (flatRows[index]?.type === 'header' ? 44 : 96),
    overscan: 8,
  })

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

  function handleAddToCart(item) {
    const type = getSelectedPriceType(item)
    if (!type) {
      showToast('รายการนี้ยังไม่มีราคาให้เลือก', 'error')
      return
    }
    const qty = Math.max(1, Math.floor(Number(getQuantity(item))) || 1)
    onAddToCart(shop, item, type, qty)
    showToast(`เพิ่ม "${item.name}" ลงตระกร้าแล้ว`, 'success')
  }

  return (
    <div className="flex h-full flex-col rounded-lg border border-[#e2cfb3] bg-white shadow-sm">
      <div className="shrink-0 border-b border-[#e2cfb3] p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-md p-1 -m-1 text-left text-xs font-medium text-violet-700 transition-colors hover:bg-violet-50"
          >
            <span aria-hidden>←</span> กลับไปรายชื่อร้าน
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-stone-900">{shop.name}</h2>
            <span className="text-xs text-stone-400">
              ({query || hasActiveFilters ? `${visibleItems.length}/${draftItems.length}` : draftItems.length} รายการ)
            </span>
            <button
              onClick={onEdit}
              className="rounded-md border border-gray-300 px-2 py-1 text-xs text-stone-700 transition-colors hover:bg-[#f5ede0]"
            >
              แก้ไขร้าน
            </button>
            <button
              type="button"
              onClick={toggleItemEditMode}
              className={`rounded-md border px-2 py-1 text-xs font-medium ${
                itemEditMode
                  ? 'border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100'
                  : 'border-gray-300 text-stone-700 hover:bg-[#f5ede0]'
              }`}
            >
              {itemEditMode ? '✓ กำลังแก้ไขรายการ' : '✎ โหมดแก้ไขรายการ'}
            </button>
          </div>
        </div>
        {(shop.hardSell || shop.sellingCap) && (
            <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-stone-600">
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
            <details className="mt-1.5 rounded-md bg-[#f5ede0] p-2 text-xs text-stone-600">
              <summary className="cursor-pointer font-medium text-stone-700">รายละเอียด / กติกาเพิ่มเติม</summary>
              <p className="mt-1 whitespace-pre-line">{shop.notes}</p>
            </details>
          )}

          {groupedItems.length > 1 && (
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              {groupedItems.map((group) => (
                <button
                  key={group.slug}
                  type="button"
                  onClick={() => toggleGroupFocus(group.slug)}
                  className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                    focusedGroupSlug === group.slug
                      ? 'border-violet-600 bg-violet-700 text-white'
                      : 'border-[#e2cfb3] bg-[#f5ede0] text-stone-600 hover:bg-[#e8d9c0]'
                  }`}
                >
                  {group.category}{' '}
                  <span className={focusedGroupSlug === group.slug ? 'text-violet-200' : 'text-stone-400'}>
                    ({group.items.length})
                  </span>
                </button>
              ))}
              {focusedGroupSlug && (
                <button
                  type="button"
                  onClick={() => setFocusedGroupSlug(null)}
                  className="text-[11px] text-stone-500 underline decoration-dotted hover:text-stone-700"
                >
                  ล้าง
                </button>
              )}
            </div>
          )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-3">
          {visibleItems.length === 0 ? (
            <p className="text-sm text-stone-400">
              {query || hasActiveFilters ? 'ไม่พบรายการที่ตรงกับคำค้นหา/ตัวกรองในร้านนี้' : 'ยังไม่มีรายการในร้านนี้'}
            </p>
          ) : itemEditMode ? (
            <div className="h-full space-y-3 overflow-y-auto">
              {visibleGroups.map((group) => (
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
                          <th className="py-2 pr-2">ความหายาก</th>
                          <th className="py-2 pr-2">ราคาปกติ</th>
                          <th className="py-2 pr-2">ราคาถูก</th>
                          <th className="py-2 pr-2">ราคาแพง</th>
                          <th className="py-2 pr-2 text-center">
                            <Tip text="ป้ายกำกับคุณสมบัติของสินค้า ชี้เพื่อดูคำอธิบาย" className="cursor-help">
                              Tag
                            </Tip>
                          </th>
                          <th className="py-2 pr-2">คำอธิบาย</th>
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
                                value={item.rarity ?? ''}
                                onChange={(e) => updateDraftItem(item.id, { rarity: e.target.value })}
                                list={`shop-rarity-${shop.id}`}
                                className="w-24 rounded-md border border-gray-300 px-2 py-1"
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
                                value={item.description}
                                onChange={(e) => updateDraftItem(item.id, { description: e.target.value })}
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
              <datalist id={`shop-rarity-${shop.id}`}>
                {RARITY_ORDER.map((r) => (
                  <option key={r} value={r} />
                ))}
              </datalist>
            </div>
          ) : (
            <div className="flex h-full min-h-0 flex-col overflow-x-auto">
              <div style={{ minWidth: 900 }} className="shrink-0">
                <div
                  className="grid gap-2 border-b border-[#e2cfb3] px-2 py-2 text-left text-xs text-stone-500"
                  style={{ gridTemplateColumns: ITEM_ROW_GRID_COLS }}
                >
                  <div>ชื่อรายการ</div>
                  <div>หมวดหลัก</div>
                  <div>หมวดรอง / ความหายาก</div>
                  <div>ราคา (เลือกราคาที่จะใส่ตระกร้า)</div>
                  <div className="text-center">
                    <Tip text="ป้ายกำกับคุณสมบัติของสินค้า ชี้เพื่อดูคำอธิบาย" className="cursor-help">
                      Tag
                    </Tip>
                  </div>
                  <div className="text-center">จำนวน</div>
                  <div></div>
                </div>
              </div>

              <div ref={listScrollRef} className="min-h-0 flex-1 overflow-y-auto" style={{ minWidth: 900 }}>
                <div style={{ height: rowVirtualizer.getTotalSize(), position: 'relative' }}>
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                      const row = flatRows[virtualRow.index]
                      if (!row) return null

                      if (row.type === 'header') {
                        return (
                          <div
                            key={virtualRow.key}
                            data-index={virtualRow.index}
                            ref={rowVirtualizer.measureElement}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', transform: `translateY(${virtualRow.start}px)` }}
                          >
                            <button
                              type="button"
                              onClick={() => toggleGroupExpanded(row.group.slug)}
                              className="flex w-full items-center gap-1.5 py-2 text-left text-sm font-medium text-stone-700 hover:bg-[#f5ede0]"
                            >
                              <span className={`inline-block transition-transform ${row.expanded ? 'rotate-90' : ''}`}>▶</span>
                              {row.group.category}{' '}
                              <span className="text-xs font-normal text-stone-400">({row.group.items.length})</span>
                            </button>
                          </div>
                        )
                      }

                      const item = row.item
                      const available = availablePriceTypes(item)
                      const selected = getSelectedPriceType(item)
                      return (
                        <div
                          key={virtualRow.key}
                          data-index={virtualRow.index}
                          ref={rowVirtualizer.measureElement}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            transform: `translateY(${virtualRow.start}px)`,
                            gridTemplateColumns: ITEM_ROW_GRID_COLS,
                          }}
                          className="grid gap-2 border-b border-[#e2cfb3] px-2 py-2 text-sm transition-colors hover:bg-violet-50/50"
                        >
                          <div className="py-2 pr-2 font-medium text-stone-900">
                            <span className="inline-flex items-center gap-1.5">
                              <span
                                role="button"
                                tabIndex={0}
                                title="คลิกเพื่อดูรายละเอียดไอเทม"
                                onClick={() => setStatblockItem(item)}
                                className="cursor-pointer hover:underline hover:decoration-dotted"
                              >
                                {item.name}
                              </span>
                              {item.link ? (
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  title="เปิดหน้าไอเทมนี้ใน 5e.tools"
                                  className="text-emerald-600 hover:text-emerald-700"
                                >
                                  🔗
                                </a>
                              ) : (
                                <span title="ไม่มีลิงก์ 5e.tools — ดูคำอธิบายด้านล่างชื่อ" className="text-stone-300">
                                  🔗
                                </span>
                              )}
                            </span>
                          </div>
                          <div className="py-2 pr-2 text-stone-600">{item.category}</div>
                          <div className="py-2 pr-2 text-stone-600">
                            {item.subCategory}
                            {item.subCategory && item.rarity ? ' · ' : ''}
                            {item.rarity}
                          </div>
                          <div className="py-2 pr-2">
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
                          </div>
                          <div className="py-2 pr-2">
                            <div className="flex flex-wrap gap-1">
                              {TAG_LABELS.filter((tag) => item[tag.key]).map((tag) => (
                                <Tip key={tag.key} text={tag.tooltip}>
                                  <span className="cursor-help rounded-full bg-[#f5ede0] px-2 py-0.5 text-[11px] text-stone-600">
                                    {tag.label}
                                  </span>
                                </Tip>
                              ))}
                            </div>
                          </div>
                          <div className="py-2 pr-2 text-center">
                            <input
                              type="number"
                              min="1"
                              value={getQuantity(item)}
                              onChange={(e) => setQuantity(item.id, e.target.value)}
                              className="w-16 rounded-md border border-gray-300 px-2 py-1 text-center text-sm"
                            />
                          </div>
                          <div className="py-2 pl-2 whitespace-nowrap text-right">
                            <button
                              type="button"
                              disabled={available.length === 0}
                              onClick={() => handleAddToCart(item)}
                              className="rounded-md bg-violet-700 px-2.5 py-1 text-xs font-medium text-white hover:bg-violet-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                            >
                              + ใส่ตระกร้า
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
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

        <ItemStatblockModal item={statblockItem} onClose={() => setStatblockItem(null)} />
    </div>
  )
}

function ShopListItem({ shop, matchedCount, totalCount, isFiltered, isActive, onSelect, onEdit }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onSelect()
      }}
      className={`group cursor-pointer rounded-lg border p-2.5 transition-colors ${
        isActive
          ? 'border-violet-400 bg-violet-50'
          : 'border-[#e2cfb3] bg-white hover:border-violet-300 hover:bg-violet-50/40'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-snug text-stone-900">{shop.name}</h3>
        <div className="hidden shrink-0 items-center gap-1 group-hover:flex">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onEdit()
            }}
            title="แก้ไขร้าน"
            className="rounded-md border border-gray-300 px-1.5 py-0.5 text-[11px] text-stone-700 transition-colors hover:bg-[#f5ede0]"
          >
            ✎
          </button>
        </div>
      </div>
      <p className="mt-0.5 text-xs text-stone-400">
        {isFiltered ? `${matchedCount}/${totalCount} รายการ` : `${totalCount} รายการ`}
      </p>
    </div>
  )
}

function CartModal({
  open,
  onClose,
  cartState,
  setCartState,
  sellCartState,
  setSellCartState,
  showToast,
  characters,
  dispatch,
}) {
  const [tab, setTab] = useState('buy')
  const [addToCharacterOpen, setAddToCharacterOpen] = useState(false)

  function handleAddCartToCharacters(grouped) {
    for (const [characterId, names] of grouped) {
      const target = characters.find((c) => c.id === characterId)
      if (!target) continue
      const equipment = Array.isArray(target.equipment) ? target.equipment : []
      dispatch({
        type: 'UPDATE_CHARACTER',
        payload: { id: characterId, patch: { equipment: [...equipment, ...names] } },
      })
    }
    showToast(`เพิ่มของเข้าตัวละคร ${grouped.size} คนแล้ว`, 'success')
    setAddToCharacterOpen(false)
  }

  const buyGroups = useMemo(() => {
    const map = new Map()
    for (const item of cartState.items) {
      if (!map.has(item.shopId)) {
        map.set(item.shopId, { shopId: item.shopId, shopName: item.shopName, items: [] })
      }
      map.get(item.shopId).items.push(item)
    }
    return Array.from(map.values()).map((group) => {
      const subtotalCp = group.items.reduce((sum, i) => sum + (i.priceCp ?? 0) * i.qty, 0)
      const shopAdjust = cartState.shopAdjustments[group.shopId] ?? DEFAULT_PRICE_ADJUST
      const totalCp = applyPriceAdjustment(subtotalCp, shopAdjust)
      return { ...group, subtotalCp, shopAdjust, totalCp }
    })
  }, [cartState.items, cartState.shopAdjustments])

  const buyGrandSubtotalCp = buyGroups.reduce((sum, g) => sum + g.totalCp, 0)
  const buyGrandTotalCp = applyPriceAdjustment(buyGrandSubtotalCp, cartState.overallAdjustment)

  const sellGroups = useMemo(() => {
    const map = new Map()
    for (const item of sellCartState.items) {
      if (!map.has(item.shopId)) {
        map.set(item.shopId, { shopId: item.shopId, shopName: item.shopName, items: [] })
      }
      map.get(item.shopId).items.push(item)
    }
    return Array.from(map.values()).map((group) => {
      const subtotalCp = group.items.reduce((sum, i) => sum + (i.priceCp ?? 0) * i.qty, 0)
      const shopAdjust = sellCartState.shopAdjustments[group.shopId] ?? DEFAULT_PRICE_ADJUST
      const totalCp = applyPriceAdjustment(subtotalCp, shopAdjust)
      return { ...group, subtotalCp, shopAdjust, totalCp }
    })
  }, [sellCartState.items, sellCartState.shopAdjustments])

  const sellGrandSubtotalCp = sellGroups.reduce((sum, g) => sum + g.totalCp, 0)
  const sellGrandTotalCp = applyPriceAdjustment(sellGrandSubtotalCp, sellCartState.overallAdjustment)

  const netCp = sellGrandTotalCp - buyGrandTotalCp

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

  function setBuyShopAdjustment(shopId, shopAdjust) {
    setCartState((prev) => ({ ...prev, shopAdjustments: { ...prev.shopAdjustments, [shopId]: shopAdjust } }))
  }

  function setBuyOverallAdjustment(overallAdjustment) {
    setCartState((prev) => ({ ...prev, overallAdjustment }))
  }

  function clearCart() {
    setCartState({ items: [], shopAdjustments: {}, overallAdjustment: DEFAULT_PRICE_ADJUST })
    showToast('ล้างตระกร้าซื้อแล้ว', 'info')
  }

  function removeSellCartItem(cartId) {
    setSellCartState((prev) => ({ ...prev, items: prev.items.filter((i) => i.cartId !== cartId) }))
  }

  function setSellCartItemQty(cartId, qty) {
    const safeQty = Math.max(0, Math.floor(Number(qty)) || 0)
    setSellCartState((prev) => ({
      ...prev,
      items: prev.items.map((i) => (i.cartId === cartId ? { ...i, qty: safeQty } : i)),
    }))
  }

  function bumpSellCartItemQty(cartId, delta) {
    setSellCartState((prev) => ({
      ...prev,
      items: prev.items.map((i) => (i.cartId === cartId ? { ...i, qty: Math.max(0, i.qty + delta) } : i)),
    }))
  }

  function setSellShopAdjustment(shopId, shopAdjust) {
    setSellCartState((prev) => ({ ...prev, shopAdjustments: { ...prev.shopAdjustments, [shopId]: shopAdjust } }))
  }

  function setSellOverallAdjustment(overallAdjustment) {
    setSellCartState((prev) => ({ ...prev, overallAdjustment }))
  }

  function clearSellCart() {
    setSellCartState({ items: [], shopAdjustments: {}, overallAdjustment: DEFAULT_PRICE_ADJUST })
    showToast('ล้างตระกร้าขายแล้ว', 'info')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e2cfb3] p-4">
          <h2 className="text-lg font-semibold text-stone-900">ตระกร้า</h2>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
              ✕
            </button>
          </div>
        </div>

        <div className="flex border-b border-[#e2cfb3]">
          <button
            type="button"
            onClick={() => setTab('buy')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium ${
              tab === 'buy' ? 'border-b-2 border-violet-600 text-violet-700' : 'text-stone-500 hover:bg-[#f5ede0]'
            }`}
          >
            🛒 ซื้อของ{cartState.items.length > 0 ? ` (${cartState.items.length})` : ''}
          </button>
          <button
            type="button"
            onClick={() => setTab('sell')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium ${
              tab === 'sell' ? 'border-b-2 border-violet-600 text-violet-700' : 'text-stone-500 hover:bg-[#f5ede0]'
            }`}
          >
            🧾 ขายของ{sellCartState.items.length > 0 ? ` (${sellCartState.items.length})` : ''}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {tab === 'buy' ? (
            buyGroups.length === 0 ? (
              <p className="text-sm text-stone-400">ตระกร้ายังว่างเปล่า กด "+ ใส่ตระกร้า" จากหน้ารายการร้านค้า</p>
            ) : (
              <div className="space-y-4">
                {buyGroups.map((group) => (
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
                        <label className="block text-xs font-medium text-stone-500">ต่อราคา</label>
                        <PriceAdjustInput
                          adjust={group.shopAdjust}
                          onChange={(shopAdjust) => setBuyShopAdjustment(group.shopId, shopAdjust)}
                          className="mt-1"
                        />
                      </div>
                      <div className="text-right text-sm">
                        <div className="text-stone-500">ยอดรวมร้านนี้: {formatCopper(group.subtotalCp)}</div>
                        <div className="font-semibold text-stone-900">
                          หลังต่อราคา: {formatCopper(group.totalCp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : sellGroups.length === 0 ? (
            <p className="text-sm text-stone-400">
              ตระกร้าขายยังว่างเปล่า กด "🧾 ใส่ตระกร้าขาย" จากหน้าประเมินราคาขาย
            </p>
          ) : (
            <div className="space-y-4">
              {sellGroups.map((group) => (
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
                            <div className="text-xs text-stone-400">
                              {item.priceLabel} · {item.conditionLabel}
                              {item.enhanceLevel > 0 ? ` · +${item.enhanceLevel}` : ''}
                            </div>
                          </td>
                          <td className="py-1.5 pr-2 text-right whitespace-nowrap text-stone-700">
                            {formatCopper(item.priceCp)}
                          </td>
                          <td className="py-1.5 pr-2">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                type="button"
                                onClick={() => bumpSellCartItemQty(item.cartId, -1)}
                                className="h-6 w-6 rounded-md border border-gray-300 text-xs text-stone-600 hover:bg-[#f5ede0]"
                              >
                                −
                              </button>
                              <input
                                type="number"
                                min="0"
                                value={item.qty}
                                onChange={(e) => setSellCartItemQty(item.cartId, e.target.value)}
                                className="w-12 rounded-md border border-gray-300 px-1 py-0.5 text-center text-sm"
                              />
                              <button
                                type="button"
                                onClick={() => bumpSellCartItemQty(item.cartId, 1)}
                                className="h-6 w-6 rounded-md border border-gray-300 text-xs text-stone-600 hover:bg-[#f5ede0]"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-1.5 pr-2 text-right whitespace-nowrap text-stone-700">
                            {formatCopper(item.priceCp * item.qty)}
                          </td>
                          <td className="py-1.5 pl-2 text-right">
                            <button
                              type="button"
                              onClick={() => removeSellCartItem(item.cartId)}
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
                      <label className="block text-xs font-medium text-stone-500">ต่อราคา</label>
                      <PriceAdjustInput
                        adjust={group.shopAdjust}
                        onChange={(shopAdjust) => setSellShopAdjustment(group.shopId, shopAdjust)}
                        className="mt-1"
                      />
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-stone-500">ยอดรวมร้านนี้: {formatCopper(group.subtotalCp)}</div>
                      <div className="font-semibold text-stone-900">
                        หลังต่อราคา: {formatCopper(group.totalCp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-[#e2cfb3] p-4">
          {tab === 'buy' ? (
            <>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-stone-500">ต่อราคารวมทุกร้าน</label>
                  <PriceAdjustInput
                    adjust={cartState.overallAdjustment}
                    onChange={setBuyOverallAdjustment}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={clearCart}
                    disabled={cartState.items.length === 0}
                    className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-[#e2cfb3] disabled:text-gray-300"
                  >
                    ล้างตระกร้าซื้อ
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddToCharacterOpen(true)}
                    disabled={cartState.items.length === 0}
                    className="rounded-md border border-violet-300 bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-700 hover:bg-violet-100 disabled:cursor-not-allowed disabled:border-[#e2cfb3] disabled:bg-transparent disabled:text-gray-300"
                  >
                    ➕ เพิ่มเข้าตัวละคร
                  </button>
                </div>
                <div className="text-right">
                  <div className="text-sm text-stone-500">
                    รวมทุกร้าน (หลังต่อราคาร้าน): {formatCopper(buyGrandSubtotalCp)}
                  </div>
                  <div className="text-lg font-bold text-red-700">ยอดที่ต้องจ่าย: {formatCopper(buyGrandTotalCp)}</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-stone-500">ต่อราคารวมทุกร้าน</label>
                  <PriceAdjustInput
                    adjust={sellCartState.overallAdjustment}
                    onChange={setSellOverallAdjustment}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={clearSellCart}
                  disabled={sellCartState.items.length === 0}
                  className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-[#e2cfb3] disabled:text-gray-300"
                >
                  ล้างตระกร้าขาย
                </button>
                <div className="text-right">
                  <div className="text-sm text-stone-500">
                    รวมทุกร้าน (หลังต่อราคาร้าน): {formatCopper(sellGrandSubtotalCp)}
                  </div>
                  <div className="text-lg font-bold text-green-700">
                    ยอดที่จะได้รับ: {formatCopper(sellGrandTotalCp)}
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-violet-300 bg-violet-50 p-3">
            <span className="text-sm font-medium text-violet-700">ผลรวมสุทธิ (ขาย − ซื้อ)</span>
            <span className={`text-lg font-bold ${netCp >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {netCp >= 0 ? '+' : '−'}
              {formatCopper(Math.abs(netCp))}
            </span>
          </div>
        </div>
      </div>

      {addToCharacterOpen && (
        <AddCartToCharacterModal
          items={cartState.items}
          characters={characters}
          onClose={() => setAddToCharacterOpen(false)}
          onConfirm={handleAddCartToCharacters}
        />
      )}
    </div>
  )
}

export default function ShopPage({ cartState, setCartState, sellCartState, setSellCartState }) {
  const { state, dispatch } = useGachaStore()
  const { showToast } = useToast()
  const shops = state.shops ?? []
  const [query, setQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterSubCategory, setFilterSubCategory] = useState('')
  const [filterRarity, setFilterRarity] = useState('')
  const [filterTag, setFilterTag] = useState('')
  const [shopForm, setShopForm] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)
  const [appraiseModalOpen, setAppraiseModalOpen] = useState(false)
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
    () => ({ category: filterCategory, subCategory: filterSubCategory, rarity: filterRarity, tag: filterTag }),
    [filterCategory, filterSubCategory, filterRarity, filterTag],
  )
  const hasActiveFilters = Boolean(filterCategory || filterSubCategory || filterRarity || filterTag)

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
  const rarityOptions = useMemo(
    () =>
      Array.from(
        new Set(
          allItems
            .filter((i) => itemMatchesFilters(i, { category: filterCategory, subCategory: filterSubCategory, tag: filterTag }))
            .map((i) => i.rarity)
            .filter(Boolean),
        ),
      ).sort((a, b) => groupSortIndex(a) - groupSortIndex(b) || a.localeCompare(b)),
    [allItems, filterCategory, filterSubCategory, filterTag],
  )
  const tagOptions = useMemo(
    () =>
      TAG_LABELS.filter((tag) =>
        allItems.some(
          (i) =>
            i[tag.key] &&
            itemMatchesFilters(i, { category: filterCategory, subCategory: filterSubCategory, rarity: filterRarity }),
        ),
      ),
    [allItems, filterCategory, filterSubCategory, filterRarity],
  )

  useEffect(() => {
    if (filterSubCategory && !subCategoryOptions.includes(filterSubCategory)) setFilterSubCategory('')
  }, [subCategoryOptions, filterSubCategory])

  useEffect(() => {
    if (filterCategory && !categoryOptions.includes(filterCategory)) setFilterCategory('')
  }, [categoryOptions, filterCategory])

  useEffect(() => {
    if (filterRarity && !rarityOptions.includes(filterRarity)) setFilterRarity('')
  }, [rarityOptions, filterRarity])

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
    setFilterRarity('')
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

  function handleAddToCart(shop, item, priceType, qty = 1) {
    const priceField = PRICE_TYPES.find((p) => p.type === priceType)
    const priceText = item[priceField.field]
    const priceCp = parsePriceToCopper(priceText)
    setCartState((prev) => {
      const existing = prev.items.find(
        (i) => i.shopId === shop.id && i.itemId === item.id && i.priceType === priceType && i.priceText === priceText,
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
            priceLabel: priceField.label,
            priceText,
            priceCp,
            level: 0,
            qty,
          },
        ],
      }
    })
  }

  function handleAddToSellCart(entry) {
    setSellCartState((prev) => {
      const existing = prev.items.find(
        (i) =>
          i.shopId === entry.shopId &&
          i.itemId === entry.itemId &&
          i.priceLabel === entry.priceLabel &&
          i.conditionLabel === entry.conditionLabel &&
          i.enhanceLevel === entry.enhanceLevel &&
          i.priceCp === entry.priceCp,
      )
      if (existing) {
        return {
          ...prev,
          items: prev.items.map((i) => (i.cartId === existing.cartId ? { ...i, qty: i.qty + entry.qty } : i)),
        }
      }
      return { ...prev, items: [...prev.items, entry] }
    })
  }

  // Used by the enhance/repair modal — the cost of an attempt is already
  // fully computed there, so this pushes it straight into the buy cart.
  function handleAddCostToCart(entry) {
    setCartState((prev) => {
      const existing = prev.items.find(
        (i) =>
          i.shopId === entry.shopId &&
          i.itemId === entry.itemId &&
          i.priceLabel === entry.priceLabel &&
          i.level === entry.level &&
          i.priceCp === entry.priceCp,
      )
      if (existing) {
        return {
          ...prev,
          items: prev.items.map((i) => (i.cartId === existing.cartId ? { ...i, qty: i.qty + entry.qty } : i)),
        }
      }
      return { ...prev, items: [...prev.items, entry] }
    })
  }

  const totalItems = shops.reduce((sum, s) => sum + s.items.length, 0)

  return (
    <div className="w-full p-3 md:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <h1 className="text-lg font-bold text-stone-900">ร้านค้า</h1>
          <p className="text-xs text-stone-500">
            {shops.length} ร้านค้า · {totalItems} รายการทั้งหมด
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setUpgradeModalOpen(true)}
            className="rounded-md border border-violet-300 bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700 hover:bg-violet-100"
          >
            🔨 Forge
          </button>
          <button
            onClick={() => setAppraiseModalOpen(true)}
            className="rounded-md border border-violet-300 bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700 hover:bg-violet-100"
          >
            💰 ประเมินราคา
          </button>
          <button
            onClick={() => setShopForm({ mode: 'create' })}
            className="rounded-md bg-violet-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-800"
          >
            + เพิ่มร้านค้า
          </button>
        </div>
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
        {sellCartState.items.length > 0 && (
          <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
            {sellCartState.items.length}
          </span>
        )}
      </button>

      <div className="flex flex-col gap-4 lg:h-[calc(100vh-130px)] lg:flex-row lg:items-stretch">
        <aside className="w-full shrink-0 lg:flex lg:h-full lg:w-72 lg:flex-col lg:overflow-hidden">
          <div className="shrink-0 rounded-lg border border-[#e2cfb3] bg-white p-3 shadow-sm">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหารายการ (ชื่อ, หมวดหลัก, หมวดรอง, หมายเหตุ)..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            <div className="mt-2 flex flex-col gap-2">
              <SearchSelect
                options={categoryOptions.map((c) => ({ value: c, label: c }))}
                value={filterCategory}
                onChange={setFilterCategory}
                placeholder="หมวดหลัก: ทั้งหมด"
                clearLabel="ล้าง"
                className="w-full"
              />
              <SearchSelect
                options={groupedSubCategoryOptions.flatMap((group) =>
                  group.subs.map((c) => ({ value: c, label: c, group: group.category })),
                )}
                value={filterSubCategory}
                onChange={(value) => {
                  setFilterSubCategory(value)
                  if (value && !filterCategory) {
                    const group = groupedSubCategoryOptions.find((g) => g.subs.includes(value))
                    if (group) setFilterCategory(group.category)
                  }
                }}
                placeholder="หมวดรอง: ทั้งหมด"
                clearLabel="ล้าง"
                className="w-full"
              />
              <SearchSelect
                options={rarityOptions.map((r) => ({ value: r, label: r }))}
                value={filterRarity}
                onChange={setFilterRarity}
                placeholder="ความหายาก: ทั้งหมด"
                clearLabel="ล้าง"
                className="w-full"
              />
              <SearchSelect
                options={tagOptions.map((tag) => ({ value: tag.key, label: tag.label }))}
                value={filterTag}
                onChange={setFilterTag}
                placeholder="Tag: ทั้งหมด"
                clearLabel="ล้าง"
                className="w-full"
              />
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="self-start text-xs text-stone-500 underline decoration-dotted hover:text-stone-700"
                >
                  ล้างตัวกรอง
                </button>
              )}
            </div>
          </div>

          <div className="mt-3 max-h-[70vh] space-y-2 overflow-y-auto pr-1 lg:max-h-none lg:min-h-0 lg:flex-1">
            {shops.length === 0 ? (
              <p className="text-sm text-stone-400">ยังไม่มีร้านค้า กด "+ เพิ่มร้านค้า" เพื่อเริ่มต้น</p>
            ) : visibleShops.length === 0 ? (
              <p className="text-sm text-stone-400">ไม่พบร้านค้าหรือรายการที่ตรงกับคำค้นหา/ตัวกรอง</p>
            ) : (
              visibleShops.map((shop) => {
                const matched = shop.items.filter(
                  (item) => itemMatchesQuery(item, normalizedQuery) && itemMatchesFilters(item, filters),
                )
                return (
                  <ShopListItem
                    key={shop.id}
                    shop={shop}
                    totalCount={shop.items.length}
                    matchedCount={matched.length}
                    isFiltered={Boolean(normalizedQuery || hasActiveFilters)}
                    isActive={shop.id === selectedShopId}
                    onSelect={() => openShop(shop.id)}
                    onEdit={() => setShopForm({ mode: 'edit', shop })}
                  />
                )
              })
            )}
          </div>
        </aside>

        <main className="min-w-0 flex-1 lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:overflow-hidden">
          {selectedShop ? (
            <ShopDetailView
              key={selectedShop.id}
              shop={selectedShop}
              onBack={closeShop}
              onEdit={() => setShopForm({ mode: 'edit', shop: selectedShop })}
              query={normalizedQuery}
              filters={filters}
              dispatch={dispatch}
              showToast={showToast}
              onAddToCart={handleAddToCart}
            />
          ) : (
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-[#e2cfb3] bg-white/50 text-sm text-stone-400">
              เลือกร้านค้าทางซ้ายเพื่อดูรายการ
            </div>
          )}
        </main>
      </div>

      <ShopFormModal
        key={shopForm ? (shopForm.mode === 'edit' ? shopForm.shop.id : 'create') : 'closed'}
        open={!!shopForm}
        onClose={() => setShopForm(null)}
        shop={shopForm?.mode === 'edit' ? shopForm.shop : null}
        onSubmit={handleShopSubmit}
      />

      <CartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartState={cartState}
        setCartState={setCartState}
        sellCartState={sellCartState}
        setSellCartState={setSellCartState}
        showToast={showToast}
        characters={state.characters ?? []}
        dispatch={dispatch}
      />

      <EnhanceUpgradeModal
        open={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        shops={shops}
        enhancementMultipliers={enhancementMultipliers}
        onAddCostToCart={handleAddCostToCart}
        showToast={showToast}
      />

      <AppraiseModal
        open={appraiseModalOpen}
        onClose={() => setAppraiseModalOpen(false)}
        shops={shops}
        enhancementMultipliers={enhancementMultipliers}
        onAddToSellCart={handleAddToSellCart}
        showToast={showToast}
      />
    </div>
  )
}
