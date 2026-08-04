import { Link, useParams } from 'react-router-dom'
import AdventureMarkdownView from '../components/AdventureMarkdownView'
import { useToast } from '../store/ToastContext'
import { copyMarkdownToClipboard } from '../utils/copyMarkdown'
import { getHomebrewRule } from '../utils/homebrewRules'

export default function HomebrewRuleDocPage() {
  const { slug } = useParams()
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
        <p className="mb-2 text-sm text-stone-400">ไม่พบกฎ Homebrew นี้</p>
        <Link to="/homebrew-rules" className="text-sm text-violet-700 underline">
          ← กลับไปหน้า Homebrew Rules
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
        <AdventureMarkdownView content={rule.content} basePath={rule.path} />
      </div>
    </div>
  )
}
