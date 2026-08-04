import { useEffect, useState } from 'react'
import AdventureMarkdownView from './AdventureMarkdownView'
import { useToast } from '../store/ToastContext'
import { getAdventureJournal, getAdventureOverview } from '../utils/adventureJournals'
import { copyMarkdownToClipboard } from '../utils/copyMarkdown'

// "EP04" for a mainline episode, "EP04a" for a side episode branching off it.
function epLabel(ep) {
  return `EP${String(ep.number).padStart(2, '0')}${ep.sideLetter ?? ''}`
}

function ActEpisodeList({ overviewItem, acts, selectedId, onSelect, openActId, onToggleAct }) {
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
      {acts.map((act) => {
        const collapsed = act.id !== openActId
        return (
          <div key={act.id}>
            <button
              type="button"
              onClick={() => onToggleAct(act.id)}
              className="mb-1 flex w-full items-center justify-between rounded-md px-1 py-0.5 text-xs font-semibold uppercase tracking-wide text-stone-400 hover:text-stone-600"
            >
              <span>{act.title}</span>
              <span
                className={`text-[10px] transition-transform ${collapsed ? '-rotate-90' : ''}`}
                aria-hidden="true"
              >
                ▼
              </span>
            </button>
            {!collapsed && (
              <ul className="space-y-0.5">
                {act.episodes.map((ep) => (
                  <li key={ep.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(ep)}
                      title={ep.isSide ? 'ตอนย่อย — นอกเนื้อเรื่องหลัก' : undefined}
                      className={`flex w-full items-start gap-1 rounded-md px-2 py-1.5 text-left text-sm leading-snug transition-colors ${
                        ep.isSide ? 'ml-3 border-l-2 border-amber-300 pl-2' : ''
                      } ${
                        selectedId === ep.id
                          ? 'bg-violet-700 text-white'
                          : ep.isSide
                            ? 'text-stone-500 hover:bg-[#f5ede0]'
                            : 'text-stone-600 hover:bg-[#f5ede0]'
                      }`}
                    >
                      <span className={ep.isSide ? 'italic' : ''}>
                        {epLabel(ep)}: {ep.title}
                      </span>
                      {ep.isSide && (
                        <span
                          className={`ml-auto shrink-0 rounded-full px-1.5 py-0 text-[10px] font-medium not-italic ${
                            selectedId === ep.id ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          ตอนย่อย
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )
}

// The Adventure Journal reading UI: an Act/EP sidebar, the selected doc's
// content, and a prev/next footer. Fills whatever fixed-height container the
// caller gives it (a full page, previously a modal) — no chrome of its own
// beyond a header banner with the campaign name.
export default function AdventureJournalView({ campaign }) {
  const { showToast } = useToast()
  const acts = getAdventureJournal(campaign?.adventureSlug)
  const overviewDoc = getAdventureOverview(campaign?.adventureSlug)
  const overviewItem = overviewDoc
    ? { kind: 'overview', id: 'overview', label: 'Campaign Overview', content: overviewDoc.content, path: overviewDoc.path }
    : null
  const allEpisodes = acts?.flatMap((act) => act.episodes) ?? []
  // Overview comes first so opening the page always lands there, with the
  // episodes flowing right after it in the prev/next footer.
  const navItems = [overviewItem, ...allEpisodes].filter(Boolean)
  const [selected, setSelected] = useState(navItems[0] ?? null)
  // Accordion: only one Act's episode list is expanded at a time.
  const [openActId, setOpenActId] = useState(() => acts?.[0]?.id ?? null)

  function toggleAct(actId) {
    setOpenActId((prev) => (prev === actId ? null : actId))
  }

  // Jumping to an episode via prev/next shouldn't leave it hidden inside a
  // collapsed Act — reveal that Act whenever the selection lands in it.
  useEffect(() => {
    if (!selected || selected.kind === 'overview') return
    const actId = selected.id.split('-EP')[0]
    setOpenActId((prev) => (prev === actId ? prev : actId))
  }, [selected])

  if (!campaign) return null

  async function handleCopy() {
    if (!selected) return
    await copyMarkdownToClipboard(selected.content, selected.path)
    const label = selected.kind === 'overview' ? 'Overview' : itemLabel(selected)
    showToast(`คัดลอก ${label} แล้ว`, 'success')
  }

  const index = navItems.findIndex((item) => item.id === selected?.id)
  const prevItem = index > 0 ? navItems[index - 1] : null
  const nextItem = index >= 0 && index < navItems.length - 1 ? navItems[index + 1] : null
  const itemLabel = (item) =>
    item.kind === 'overview' ? 'Overview' : `EP${String(item.number).padStart(2, '0')}${item.sideLetter ?? ''}`

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#e2cfb3] px-6 py-4 bg-[#f5ede0]/30">
        <div>
          <h2 className="font-cinzel text-xl font-bold text-stone-900">{campaign.name}</h2>
          <p className="mt-0.5 text-xs text-stone-500">Adventure Journal</p>
        </div>
      </div>

      {navItems.length === 0 ? (
        <div className="flex flex-1 items-center justify-center px-6 text-center text-sm text-stone-400">
          ยังไม่มี Journal สำหรับแคมเปญนี้ — ใช้ /build-ep เพื่อเขียน EP แรกได้เลย
        </div>
      ) : (
        <div className="flex flex-1 overflow-hidden">
          <div className="w-56 shrink-0 overflow-y-auto border-r border-[#e2cfb3] bg-[#fdf8f0] px-3 py-4">
            <ActEpisodeList
              overviewItem={overviewItem}
              acts={acts ?? []}
              selectedId={selected?.id}
              onSelect={setSelected}
              openActId={openActId}
              onToggleAct={toggleAct}
            />
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
  )
}
