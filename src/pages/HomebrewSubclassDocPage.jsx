import { Link, useParams } from 'react-router-dom'
import AdventureMarkdownView from '../components/AdventureMarkdownView'
import { useToast } from '../store/ToastContext'
import { copyMarkdownToClipboard } from '../utils/copyMarkdown'
import { getHomebrewSubclass } from '../utils/homebrewSubclasses'

export default function HomebrewSubclassDocPage() {
  // Route is "/homebrew-subclass/*" (not ":slug") because files live in
  // per-class subfolders (homebrew-subclass/<ClassName>/<Name>.md), so the
  // slug itself contains a "/" — grab it via the wildcard param.
  const params = useParams()
  const slug = params['*']
  const subclass = getHomebrewSubclass(slug)
  const { showToast } = useToast()

  async function handleCopy() {
    if (!subclass) return
    await copyMarkdownToClipboard(subclass.content, subclass.path)
    showToast(`คัดลอก ${subclass.title} แล้ว`, 'success')
  }

  if (!subclass) {
    return (
      <div className="w-full p-4 md:p-8">
        <p className="mb-2 text-sm text-stone-400">ไม่พบ subclass Homebrew นี้</p>
        <Link to="/roll" className="text-sm text-violet-700 underline">
          ← กลับไปหน้าสุ่ม
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
            📋 คัดลอก {subclass.title}
          </button>
        </div>
        <AdventureMarkdownView content={subclass.content} basePath={subclass.path} />
      </div>
    </div>
  )
}
