import { getHomebrewRules } from '../utils/homebrewRules'

export default function HomebrewRulesPage() {
  const rules = getHomebrewRules()

  return (
    <div className="w-full p-4 md:p-8">
      <h1 className="font-cinzel mb-4 text-2xl font-bold text-stone-900">Homebrew Rules</h1>

      {rules.length === 0 ? (
        <p className="text-sm text-stone-400">
          ยังไม่มีกฎ Homebrew — เพิ่มไฟล์ .md ใน homebrew-rules/ ได้เลย
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rules.map((rule) => (
            <a
              key={rule.slug}
              href={`/homebrew-rules/${encodeURIComponent(rule.slug)}`}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-start gap-1 rounded-xl border border-[#e2cfb3] bg-white p-4 text-left shadow-sm transition-colors hover:border-violet-300 hover:bg-violet-50/40"
            >
              <h2 className="font-cinzel text-lg font-semibold text-stone-900">{rule.title}</h2>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
