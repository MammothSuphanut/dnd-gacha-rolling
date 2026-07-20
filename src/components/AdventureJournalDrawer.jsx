import { useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import AdventureMarkdownView from './AdventureMarkdownView'
import { useToast } from '../store/ToastContext'
import { getAdventureJournal, getAdventureOverview } from '../utils/adventureJournals'

// Clean semantic HTML (no Tailwind classes, but same link-rewriting as the
// in-app view) so pasting into a rich-text editor like FoundryVTT's journal
// editor keeps headers/tables/bold *and* working links back to our app.
async function copyToClipboard(content, path) {
  const html = renderToStaticMarkup(<AdventureMarkdownView content={content} basePath={path} />)
  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([content], { type: 'text/plain' }),
      }),
    ])
  } catch {
    await navigator.clipboard.writeText(content)
  }
}

function ActEpisodeList({ overviewItem, acts, selectedId, onSelect }) {
  return (
    <nav className="space-y-3">
      {overviewItem && (
        <button
          type="button"
          onClick={() => onSelect(overviewItem)}
          className={`block w-full rounded-md px-2 py-1.5 text-left text-sm font-semibold leading-snug transition-colors ${
            selectedId === overviewItem.id
              ? 'bg-violet-700 text-white'
              : 'text-stone-700 hover:bg-[#f5ede0]'
          }`}
        >
          📜 Campaign Overview
        </button>
      )}
      {acts.map((act) => (
        <div key={act.id}>
          <p className="mb-1 px-1 text-xs font-semibold uppercase tracking-wide text-stone-400">{act.title}</p>
          <ul className="space-y-0.5">
            {act.episodes.map((ep) => (
              <li key={ep.id}>
                <button
                  type="button"
                  onClick={() => onSelect(ep)}
                  className={`block w-full rounded-md px-2 py-1.5 text-left text-sm leading-snug transition-colors ${
                    selectedId === ep.id
                      ? 'bg-violet-700 text-white'
                      : 'text-stone-600 hover:bg-[#f5ede0]'
                  }`}
                >
                  EP{String(ep.number).padStart(2, '0')}: {ep.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export default function AdventureJournalDrawer({ campaign, onClose }) {
  const { showToast } = useToast()
  const acts = getAdventureJournal(campaign?.adventureSlug)
  const overviewDoc = getAdventureOverview(campaign?.adventureSlug)
  const overviewItem = overviewDoc
    ? { kind: 'overview', id: 'overview', label: 'Campaign Overview', content: overviewDoc.content, path: overviewDoc.path }
    : null
  const allEpisodes = acts?.flatMap((act) => act.episodes) ?? []
  // Overview comes first so opening the drawer always lands there, with the
  // episodes flowing right after it in the prev/next footer.
  const navItems = [overviewItem, ...allEpisodes].filter(Boolean)
  const [selected, setSelected] = useState(navItems[0] ?? null)

  if (!campaign) return null

  async function handleCopy() {
    if (!selected) return
    await copyToClipboard(selected.content, selected.path)
    const label = selected.kind === 'overview' ? 'Overview' : `EP${String(selected.number).padStart(2, '0')}`
    showToast(`คัดลอก ${label} แล้ว`, 'success')
  }

  const index = navItems.findIndex((item) => item.id === selected?.id)
  const prevItem = index > 0 ? navItems[index - 1] : null
  const nextItem = index >= 0 && index < navItems.length - 1 ? navItems[index + 1] : null
  const itemLabel = (item) => (item.kind === 'overview' ? 'Overview' : `EP${String(item.number).padStart(2, '0')}`)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div
        className="animate-fade-in flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-[#e2cfb3] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e2cfb3] px-6 py-4 bg-[#f5ede0]/30">
          <div>
            <h2 className="font-cinzel text-xl font-bold text-stone-900">{campaign.name}</h2>
            <p className="mt-0.5 text-xs text-stone-500">Adventure Journal</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-stone-400 hover:bg-[#f5ede0] hover:text-stone-600 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {navItems.length === 0 ? (
          <div className="flex flex-1 items-center justify-center px-6 text-center text-sm text-stone-400">
            ยังไม่มี Journal สำหรับแคมเปญนี้ — ใช้ /build-ep เพื่อเขียน EP แรกได้เลย
          </div>
        ) : (
          <div className="flex flex-1 overflow-hidden">
            <div className="w-56 shrink-0 overflow-y-auto border-r border-[#e2cfb3] bg-[#fdf8f0] px-3 py-4">
              <ActEpisodeList overviewItem={overviewItem} acts={acts ?? []} selectedId={selected?.id} onSelect={setSelected} />
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {selected && (
                <>
                  <div className="mb-3 flex justify-end">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 rounded-md border border-[#e2cfb3] bg-white px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-[#f5ede0] hover:text-violet-700 transition-colors"
                      title="คัดลอกเนื้อหานี้ (วางใน Foundry VTT ได้เลย)"
                    >
                      📋 คัดลอก {itemLabel(selected)}
                    </button>
                  </div>
                  <AdventureMarkdownView content={selected.content} basePath={selected.path} />
                </>
              )}
            </div>
          </div>
        )}

        {(prevItem || nextItem) && (
          <div className="flex items-center justify-between border-t border-[#e2cfb3] px-6 py-3 bg-[#f5ede0]/10">
            <button
              type="button"
              disabled={!prevItem}
              onClick={() => prevItem && setSelected(prevItem)}
              className="rounded-lg px-4 py-2 text-sm text-stone-600 hover:bg-[#f5ede0] disabled:cursor-not-allowed disabled:text-stone-300 disabled:hover:bg-transparent transition-colors"
            >
              ← {prevItem ? itemLabel(prevItem) : ''}
            </button>
            <button
              type="button"
              disabled={!nextItem}
              onClick={() => nextItem && setSelected(nextItem)}
              className="rounded-lg px-4 py-2 text-sm text-stone-600 hover:bg-[#f5ede0] disabled:cursor-not-allowed disabled:text-stone-300 disabled:hover:bg-transparent transition-colors"
            >
              {nextItem ? itemLabel(nextItem) : ''} →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
