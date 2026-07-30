import Modal from '../Modal'
import AdventureMarkdownView from '../AdventureMarkdownView'
import WorldEntryCard from './WorldEntryCard'
import WorldSourceList from './WorldSourceList'

// Opened either from a continent-level map pin (overview blurb + the city
// cards inside it, pinned on the map, as a quick way to drill into one
// without hunting for its own pin) or from the "Contents" button (no map
// pin, no overview blurb — just a grid of topic cards like "ภาพรวม", "ทะเล").
export default function WorldCategoryModal({ category, overview, cards, onClose, onSelectCard }) {
  const hasOverview = !!category?.overviewPath

  return (
    <Modal open={!!category} onClose={onClose} title={category?.title} size="lg">
      {hasOverview && (
        <>
          {overview?.content ? (
            <AdventureMarkdownView content={overview.content} basePath={category?.overviewPath} />
          ) : (
            <p className="text-sm text-stone-400">ยังไม่มีข้อมูลภาพรวมสำหรับทวีปนี้</p>
          )}
          <WorldSourceList sources={category?.sources} />
        </>
      )}
      {cards.length > 0 ? (
        <div className={hasOverview ? 'mt-4 border-t border-[#e2cfb3] pt-4' : ''}>
          {hasOverview && (
            <p className="font-cinzel mb-2 text-xs font-semibold uppercase tracking-wide text-stone-400">
              สถานที่ที่มีข้อมูล
            </p>
          )}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {cards.map((card) => (
              <WorldEntryCard key={card.id} card={card} onClick={() => onSelectCard(card)} />
            ))}
          </div>
        </div>
      ) : (
        !hasOverview && <p className="text-sm text-stone-400">ยังไม่มีการ์ดในหมวดนี้</p>
      )}
    </Modal>
  )
}
