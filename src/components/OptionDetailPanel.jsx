import Entries from './FiveEtoolsEntries'
import { originLabels, editionLabels, originFacet } from '../utils/fiveEtoolsCategories'
import { buildFiveEtoolsFeatLink, buildFiveEtoolsBackgroundLink, buildFiveEtoolsOptionalFeatureLink } from '../utils/spellFormat'
import { formatPrerequisite } from '../utils/optionFormat'

const LINK_BUILDERS = {
  feat: buildFiveEtoolsFeatLink,
  background: buildFiveEtoolsBackgroundLink,
  optionalfeature: buildFiveEtoolsOptionalFeatureLink,
}

const LINK_TEXT = {
  feat: 'เปิดฟีตนี้ใน 5e.tools ↗',
  background: 'เปิด background นี้ใน 5e.tools ↗',
  optionalfeature: 'เปิดตัวเลือกนี้ใน 5e.tools ↗',
}

export default function OptionDetailPanel({ categoryId, entry, onSpellClick }) {
  if (!entry) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-[#e2cfb3] bg-white/50 text-sm text-stone-400 lg:h-full">
        เลือกรายการทางซ้ายเพื่อดูรายละเอียด
      </div>
    )
  }

  const prereqText = formatPrerequisite(entry.prerequisite)
  const buildLink = LINK_BUILDERS[categoryId]

  return (
    <div className="space-y-3 rounded-lg border border-[#e2cfb3] bg-white p-4 shadow-sm lg:h-full lg:overflow-y-auto">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-cinzel text-base font-semibold text-stone-900">{entry.name}</h3>
        <span className="text-xs text-stone-400">
          {entry.source}
          {entry.page ? ` p.${entry.page}` : ''}
        </span>
      </div>
      <span className="inline-block rounded-full bg-[#f5ede0] px-2 py-0.5 text-[11px] text-stone-600">
        {originLabels[originFacet(entry)] || originFacet(entry)} · {editionLabels[entry._gr.edition] || entry._gr.edition}
      </span>

      {prereqText && (
        <p className="text-sm text-stone-700">
          <strong>Prerequisite:</strong> {prereqText}
        </p>
      )}

      {entry.entries?.length > 0 && <Entries entries={entry.entries} onSpellClick={onSpellClick} />}

      {buildLink && (
        <a
          href={buildLink(entry)}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-block text-xs text-emerald-600 hover:text-emerald-700 hover:underline"
        >
          {LINK_TEXT[categoryId]}
        </a>
      )}
    </div>
  )
}
