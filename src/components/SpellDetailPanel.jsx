import Entries from './FiveEtoolsEntries'
import { SCHOOL_LABELS, originLabels, editionLabels, originFacet } from '../utils/fiveEtoolsCategories'
import {
  formatSpellTime,
  formatSpellRange,
  formatSpellComponents,
  formatSpellDuration,
  isRitual,
  buildFiveEtoolsSpellLink,
  buildFiveEtoolsClassLink,
  buildFiveEtoolsSubclassLink,
  buildFiveEtoolsSpeciesLink,
  buildFiveEtoolsBackgroundLink,
  buildFiveEtoolsFeatLink,
} from '../utils/spellFormat'

function levelSchoolLine(spell) {
  const level = spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`
  const school = SCHOOL_LABELS[spell.school] || spell.school
  const ritual = isRitual(spell) ? ' (Ritual)' : ''
  return spell.level === 0 ? `${school} Cantrip${ritual}` : `${level} ${school}${ritual}`
}

function Fact({ label, value }) {
  if (!value) return null
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-stone-400">{label}</div>
      <div className="text-sm font-medium text-stone-800">{value}</div>
    </div>
  )
}

// Renders a comma-separated list of `{ text, href }` pairs as individual
// links — each reference (class, background, ...) points to its own 5e.tools
// page, so they can't share one combined href like a plain string join would.
function RefLine({ label, items }) {
  if (!items?.length) return null
  return (
    <p className="text-sm text-stone-700">
      <strong>{label}:</strong>{' '}
      {items.map((item, i) => (
        <span key={`${item.text}-${item.href}`}>
          {i > 0 && ', '}
          <a href={item.href} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">
            {item.text}
          </a>
        </span>
      ))}
    </p>
  )
}

export default function SpellDetailPanel({ spell }) {
  if (!spell) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-[#e2cfb3] bg-white/50 text-sm text-stone-400 lg:h-full">
        เลือกคาถาทางซ้ายเพื่อดูรายละเอียด
      </div>
    )
  }

  return (
    <div className="space-y-3 rounded-lg border border-[#e2cfb3] bg-white p-4 shadow-sm lg:h-full lg:overflow-y-auto">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-cinzel text-base font-semibold text-stone-900">{spell.name}</h3>
        <span className="text-xs text-stone-400">
          {spell.source}
          {spell.page ? ` p.${spell.page}` : ''}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-xs italic text-stone-500">{levelSchoolLine(spell)}</p>
        <span className="rounded-full bg-[#f5ede0] px-2 py-0.5 text-[11px] text-stone-600">
          {originLabels[originFacet(spell)] || originFacet(spell)} · {editionLabels[spell._gr.edition] || spell._gr.edition}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 rounded-lg border border-[#e2cfb3] bg-[#f5ede0] p-3 sm:grid-cols-4">
        <Fact label="เวลาร่าย" value={formatSpellTime(spell.time)} />
        <Fact label="ระยะ" value={formatSpellRange(spell.range)} />
        <Fact label="Components" value={formatSpellComponents(spell.components)} />
        <Fact label="ระยะเวลา" value={formatSpellDuration(spell.duration)} />
      </div>

      {spell.entries?.length > 0 && <Entries entries={spell.entries} />}
      {spell.entriesHigherLevel?.length > 0 && <Entries entries={spell.entriesHigherLevel} />}

      {(spell.classes?.fromClassList?.length > 0 ||
        spell.classes?.fromSubclass?.length > 0 ||
        spell.grantedBy?.species?.length > 0 ||
        spell.grantedBy?.background?.length > 0 ||
        spell.grantedBy?.feat?.length > 0) && (
        <>
          <hr className="border-t border-[#e2cfb3]" />
          <div className="space-y-1">
            <RefLine
              label="Class"
              items={spell.classes?.fromClassList?.map((c) => ({ text: c.name, href: buildFiveEtoolsClassLink(c) }))}
            />
            <RefLine
              label="Subclass"
              items={spell.classes?.fromSubclass?.map((s) => ({
                text: `${s.subclass?.shortName || s.subclass?.name || ''} ${s.class?.name || ''}`.trim(),
                href: buildFiveEtoolsSubclassLink(s),
              }))}
            />
            <RefLine
              label="Species"
              items={spell.grantedBy?.species?.map((s) => ({ text: s.label, href: buildFiveEtoolsSpeciesLink(s) }))}
            />
            <RefLine
              label="Background"
              items={spell.grantedBy?.background?.map((s) => ({ text: s.label, href: buildFiveEtoolsBackgroundLink(s) }))}
            />
            <RefLine
              label="Feat"
              items={spell.grantedBy?.feat?.map((s) => ({ text: s.label, href: buildFiveEtoolsFeatLink(s) }))}
            />
          </div>
        </>
      )}

      <a
        href={buildFiveEtoolsSpellLink(spell)}
        target="_blank"
        rel="noreferrer"
        className="mt-1 inline-block text-xs text-emerald-600 hover:text-emerald-700 hover:underline"
      >
        เปิดคาถานี้ใน 5e.tools ↗
      </a>
    </div>
  )
}
