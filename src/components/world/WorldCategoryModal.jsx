import Modal from '../Modal'
import AdventureMarkdownView from '../AdventureMarkdownView'
import WorldEntryCard from './WorldEntryCard'

// Opened from a continent-level map pin: the continent's overview blurb,
// plus any individual city cards inside it (also pinned on the map) as a
// quick way to drill into one without hunting for its own pin.
export default function WorldCategoryModal({ category, overview, cards, onClose, onSelectCard }) {
  return (
    <Modal open={!!category} onClose={onClose} title={category?.title} size="lg">
      {overview?.content ? (
        <AdventureMarkdownView content={overview.content} basePath={category?.overviewPath} />
      ) : (
        <p className="text-sm text-stone-400">ยังไม่มีข้อมูลภาพรวมสำหรับทวีปนี้</p>
      )}
      {cards.length > 0 && (
        <div className="mt-4 border-t border-[#e2cfb3] pt-4">
          <p className="font-cinzel mb-2 text-xs font-semibold uppercase tracking-wide text-stone-400">
            สถานที่ที่มีข้อมูล
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {cards.map((card) => (
              <WorldEntryCard key={card.id} card={card} onClick={() => onSelectCard(card)} />
            ))}
          </div>
        </div>
      )}
    </Modal>
  )
}
