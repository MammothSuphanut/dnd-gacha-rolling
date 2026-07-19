import { useEffect, useState } from 'react'
import Modal from './Modal'
import Entries from './FiveEtoolsEntries'
import { resolveItemStatblock, DMG_TYPE_LABELS } from '../utils/itemStatblock'
import { formatCopper } from '../utils/price'

function damageText(stat) {
  if (!stat.dmg1) return null
  const type = DMG_TYPE_LABELS[stat.dmgType] || stat.dmgType
  const base = `${stat.dmg1} ${type || ''}`.trim()
  return stat.dmg2 ? `${base} (${stat.dmg2} two-handed)` : base
}

// AC reads differently depending on what kind of item it is: flat for heavy
// armor, "+ Dex mod" for light/medium, a flat bonus for shields/magic items.
function acText(stat) {
  if (stat.ac == null) return null
  switch (stat.typeLabel) {
    case 'Light Armor':
      return `${stat.ac} + Dex modifier`
    case 'Medium Armor':
      return `${stat.ac} + Dex modifier (max 2)`
    case 'Heavy Armor':
      return `${stat.ac}`
    default:
      return `+${stat.ac}`
  }
}

function subtitleText(stat) {
  const parts = []
  if (stat.typeLabel) parts.push(stat.typeLabel)
  if (stat.weaponCategory) parts.push(`${stat.weaponCategory} weapon`)
  if (stat.firearm) parts.push('firearm')
  else if (stat.age === 'modern') parts.push('modern')
  return parts.join(' · ') || null
}

function rarityLine(stat) {
  const bits = []
  if (stat.rarity && stat.rarity !== 'none') bits.push(stat.rarity)
  if (stat.tier) bits.push(`${stat.tier} tier`)
  if (stat.reqAttune) {
    bits.push(typeof stat.reqAttune === 'string' ? `requires attunement (${stat.reqAttune})` : 'requires attunement')
  }
  if (stat.curse) bits.push('cursed')
  return bits.length > 0 ? bits.join(', ') : null
}

function Fact({ label, value }) {
  if (value == null || value === '') return null
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-stone-400">{label}</div>
      <div className="text-sm font-medium text-stone-800">{value}</div>
    </div>
  )
}

function StatblockBody({ stat }) {
  const dmg = damageText(stat)
  const ac = acText(stat)
  const subtitle = subtitleText(stat)
  const rarity = rarityLine(stat)
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-cinzel text-base font-semibold text-stone-900">
          {stat.bonusLabel ? `${stat.bonusLabel} ${stat.name}` : stat.name}
        </h3>
        <span className="text-xs text-stone-400">
          {stat.source}
          {stat.page ? ` p.${stat.page}` : ''}
        </span>
      </div>
      {subtitle && <p className="text-xs italic text-stone-500">{subtitle}</p>}
      {rarity && <p className="text-xs italic text-amber-700">{rarity}</p>}
      <div className="grid grid-cols-2 gap-2 rounded-lg border border-[#e2cfb3] bg-[#f5ede0] p-3 sm:grid-cols-3">
        <Fact label="ราคา" value={stat.value != null ? formatCopper(stat.value) : null} />
        <Fact label="น้ำหนัก" value={stat.weight != null ? `${stat.weight} lb.` : null} />
        <Fact label="ดาเมจ" value={dmg} />
        <Fact label="AC" value={ac} />
        <Fact label="ระยะ" value={stat.range ? `${stat.range} ft.` : null} />
        <Fact label="ต้องการ Strength" value={stat.strength ? `${stat.strength}` : null} />
        <Fact label="Stealth" value={stat.stealth ? 'Disadvantage' : null} />
        <Fact label="Charges" value={stat.charges != null ? `${stat.charges}${stat.recharge ? ` (recharge ${stat.recharge})` : ''}` : null} />
      </div>
      {stat.properties?.length > 0 && (
        <div className="space-y-1.5">
          {stat.properties.map((p) => (
            <p key={p.name} className="text-sm leading-relaxed text-stone-700">
              <strong>{p.name}.</strong> <Entries entries={p.entries} inline />
            </p>
          ))}
        </div>
      )}
      {stat.masteries?.length > 0 && (
        <div className="space-y-1.5">
          {stat.masteries.map((m) => (
            <p key={m.name} className="text-sm leading-relaxed text-stone-700">
              <strong>Mastery: {m.name}.</strong> <Entries entries={m.entries} inline />
            </p>
          ))}
        </div>
      )}
      {stat.entries?.length > 0 && <Entries entries={stat.entries} />}
    </div>
  )
}

export default function ItemStatblockModal({ item, onClose }) {
  const [state, setState] = useState({ status: 'loading', stat: null })

  useEffect(() => {
    if (!item) return
    let cancelled = false
    setState({ status: 'loading', stat: null })
    resolveItemStatblock({ name: item.name, link: item.link })
      .then((stat) => {
        if (!cancelled) setState({ status: stat ? 'ready' : 'not-found', stat })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error', stat: null })
      })
    return () => {
      cancelled = true
    }
  }, [item])

  return (
    <Modal open={!!item} onClose={onClose} size="lg">
      {item && (
        <div>
          {state.status === 'loading' && <p className="text-sm text-stone-500">กำลังโหลดข้อมูล...</p>}
          {state.status === 'ready' && <StatblockBody stat={state.stat} />}
          {(state.status === 'not-found' || state.status === 'error') && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-cinzel text-base font-semibold text-stone-900">{item.name}</h3>
                {(item.category || item.subCategory) && (
                  <span className="text-xs text-stone-400">
                    {[item.category, item.subCategory].filter(Boolean).join(' / ')}
                  </span>
                )}
              </div>
              <p className="text-xs italic text-stone-500">
                {state.status === 'error'
                  ? 'โหลดข้อมูลจาก 5e.tools ไม่สำเร็จ'
                  : 'ไม่พบข้อมูลไอเทมนี้ใน 5e.tools (อาจเป็นไอเทม homebrew หรือชื่อไม่ตรงกับฐานข้อมูล)'}
              </p>
              {item.description ? (
                <p className="text-sm leading-relaxed text-stone-700">{item.description}</p>
              ) : (
                <p className="text-sm italic text-stone-400">ไม่มีคำอธิบายสำหรับไอเทมนี้</p>
              )}
            </div>
          )}
          <a
            href={item.link || `https://5e.tools/search.html?q=${encodeURIComponent(item.name)}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-xs text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            {item.link ? 'เปิดหน้าไอเทมนี้ใน 5e.tools ↗' : 'ค้นหาไอเทมนี้ใน 5e.tools ↗'}
          </a>
        </div>
      )}
    </Modal>
  )
}
