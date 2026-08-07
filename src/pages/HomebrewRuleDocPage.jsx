import { Link, useParams } from 'react-router-dom'
import AdventureMarkdownView from '../components/AdventureMarkdownView'
import ClassSubclassIndexView from '../components/ClassSubclassIndexView'
import { useToast } from '../store/ToastContext'
import { copyMarkdownToClipboard } from '../utils/copyMarkdown'
import { getHomebrewRule } from '../utils/homebrewRules'

// Some docs are long enough (500+ rows across dozens of classes) to need
// their own filterable view instead of the plain markdown renderer every
// other Codex doc uses — see each component for why + the exact generator
// it's paired with.
//
// SubclassTierOverviewView (General/00-sub-class-overview-tier-list-2024)
// and SubclassScorecardView (2024-tier-list/wizard-subclass-scorecard-2024)
// were dropped from here 2026-08-07 — both source docs were deleted along
// with the rest of the old tier-list system (being redone under
// codex/2024-tier-list/00-scorecard-methodology.md). The components
// themselves are left in src/components/ (SubclassScorecardView's rendering
// approach is what CodexClassBrowser's detail-modal radar chart reuses) —
// re-add an entry here once a new doc exists at either slug.
const FILTERABLE_VIEWS = {
  'General/class-subclass-index': ClassSubclassIndexView,
}

export default function HomebrewRuleDocPage() {
  // Route is "/codex/*" (not ":slug") because files live in per-category
  // subfolders (codex/<Category>/<Name>.md), so the slug itself contains a
  // "/" — grab it via the wildcard param (mirrors HomebrewSubclassDocPage).
  const params = useParams()
  const slug = params['*']
  const rule = getHomebrewRule(slug)
  const { showToast } = useToast()

  async function handleCopy() {
    if (!rule) return
    await copyMarkdownToClipboard(rule.content, rule.path)
    showToast(`คัดลอก ${rule.title} แล้ว`, 'success')
  }

  if (!rule) {
    return (
      <div className="w-full p-4 md:p-8">
        <p className="mb-2 text-sm text-stone-400">ไม่พบข้อมูลนี้ใน Codex</p>
        <Link to="/codex" className="text-sm text-violet-700 underline">
          ← กลับไปหน้า Codex
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full p-4 md:p-8">
      <div className="rounded-lg border border-[#e2cfb3] bg-white p-6 shadow-sm">
        <div className="mb-3 flex justify-end">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#e2cfb3] bg-white px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-[#f5ede0] hover:text-violet-700 transition-colors"
            title="คัดลอกเนื้อหานี้ (วางใน Foundry VTT ได้เลย)"
          >
            📋 คัดลอก {rule.title}
          </button>
        </div>
        {(() => {
          const FilterableView = FILTERABLE_VIEWS[rule.slug]
          return FilterableView ? (
            <FilterableView content={rule.content} basePath={rule.path} />
          ) : (
            <AdventureMarkdownView content={rule.content} basePath={rule.path} />
          )
        })()}
      </div>
    </div>
  )
}
