import { Link, useLocation, useSearchParams } from 'react-router-dom'
import AdventureMarkdownView from '../components/AdventureMarkdownView'
import { findAdventureDocsByCleanPath, getAdventureDoc } from '../utils/adventureJournals'

export default function AdventureDocPage() {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const matches = findAdventureDocsByCleanPath(pathname)

  const picked = searchParams.get('doc')
  const pickedContent = picked ? getAdventureDoc(picked) : null

  return (
    <div className="mx-auto w-full max-w-3xl p-4 md:p-8">
      <div className="rounded-lg border border-[#e2cfb3] bg-white p-6 shadow-sm">
        {pickedContent ? (
          <AdventureMarkdownView content={pickedContent} basePath={picked} />
        ) : matches.length === 1 ? (
          <AdventureMarkdownView content={matches[0].content} basePath={matches[0].path} />
        ) : matches.length > 1 ? (
          <div className="text-sm text-stone-600">
            <p className="mb-2">พบไฟล์ชื่อนี้มากกว่าหนึ่งแคมเปญ เลือกอันที่ต้องการ:</p>
            <ul className="list-disc space-y-1 pl-5">
              {matches.map((m) => (
                <li key={m.path}>
                  <a
                    href={`${window.location.origin}${pathname}?doc=${encodeURIComponent(m.path)}`}
                    className="text-violet-700 underline decoration-dotted underline-offset-2 hover:text-violet-900"
                  >
                    {m.path}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-sm text-stone-400">
            <p>ไม่พบไฟล์: {pathname}</p>
            <Link to="/campaigns" className="mt-2 inline-block text-violet-700 underline decoration-dotted underline-offset-2 hover:text-violet-900">
              ← กลับหน้าแคมเปญ
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
