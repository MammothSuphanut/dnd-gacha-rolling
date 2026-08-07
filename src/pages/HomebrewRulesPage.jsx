import { useState } from 'react'
import CodexClassBrowser from '../components/CodexClassBrowser'
import { getHomebrewRuleGroups } from '../utils/homebrewRules'

const TABS = [
  { value: 'browser', label: 'Class & Subclass' },
  { value: 'documents', label: 'Documents' },
]

// /codex landing page. Used to open straight onto a flat list of document
// categories (Core-Rules, Consults, per-class tier-list write-ups, ...) —
// now it opens onto CodexClassBrowser, an interactive table of every
// class/subclass groupable by Class or by Tier (see that component + its
// merge util). Prose documents that aren't class/subclass data (Fatigue,
// Death & Dying, lore, party consults, per-class tier-list write-ups) still
// live under the "Documents" tab exactly as before.
export default function HomebrewRulesPage() {
  const [tab, setTab] = useState('browser')
  const groups = getHomebrewRuleGroups()
  const isEmpty = groups.every((group) => group.rules.length === 0)

  return (
    <div className="w-full p-4 md:p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-cinzel text-2xl font-bold text-stone-900">Codex</h1>
        <div className="flex items-center overflow-hidden rounded-full border border-[#e2cfb3] bg-white text-sm">
          {TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              className={`px-3 py-1.5 font-semibold transition-colors ${
                tab === t.value ? 'bg-[#f5ede0] text-stone-900' : 'text-stone-500 hover:bg-[#f5ede0]/60'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'browser' ? (
        <CodexClassBrowser />
      ) : isEmpty ? (
        <p className="text-sm text-stone-400">ยังไม่มีข้อมูลใน Codex — เพิ่มไฟล์ .md ในโฟลเดอร์ย่อยของ codex/ ได้เลย</p>
      ) : (
        <div className="flex flex-col gap-8">
          {groups.map((group) => (
            <section key={group.category}>
              <h2 className="font-cinzel mb-3 text-lg font-semibold text-stone-800">{group.label}</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {group.rules.map((rule) => (
                  <a
                    key={rule.slug}
                    href={`/codex/${rule.slug.split('/').map(encodeURIComponent).join('/')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-start gap-1 rounded-xl border border-[#e2cfb3] bg-white p-4 text-left shadow-sm transition-colors hover:border-violet-300 hover:bg-violet-50/40"
                  >
                    <h3 className="font-cinzel text-lg font-semibold text-stone-900">{rule.title}</h3>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
