import Modal from './Modal'
import Entries from './FiveEtoolsEntries'
import { SCHOOL_LABELS, originLabels, editionLabels, originFacet } from '../utils/fiveEtoolsCategories'
import {
  formatSpellTime,
  formatSpellRange,
  formatSpellComponents,
  formatSpellDuration,
  isRitual,
  buildFiveEtoolsSpellLink,
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

export default function SpellStatblockModal({ spell, onClose }) {
  return (
    <Modal open={!!spell} onClose={onClose} size="lg">
      {spell && (
        <div className="space-y-3">
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

          {spell.classes?.fromClassList?.length > 0 && (
            <p className="text-sm text-stone-700">
              <strong>Class:</strong> {spell.classes.fromClassList.map((c) => c.name).join(', ')}
            </p>
          )}

          {spell.entries?.length > 0 && <Entries entries={spell.entries} />}
          {spell.entriesHigherLevel?.length > 0 && <Entries entries={spell.entriesHigherLevel} />}

          <a
            href={buildFiveEtoolsSpellLink(spell)}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-block text-xs text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            เปิดคาถานี้ใน 5e.tools ↗
          </a>
        </div>
      )}
    </Modal>
  )
}
