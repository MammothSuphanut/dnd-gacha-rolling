import { getHomebrewRuleGroups } from '../utils/homebrewRules'

export default function HomebrewRulesPage() {
  const groups = getHomebrewRuleGroups()
  const isEmpty = groups.every((group) => group.rules.length === 0)

  return (
    <div className="w-full p-4 md:p-8">
      <h1 className="font-cinzel mb-4 text-2xl font-bold text-stone-900">Codex</h1>

      {isEmpty ? (
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
