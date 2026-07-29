import { getCategoryCards } from '../../utils/worldSettings'
import WorldEntryCard from './WorldEntryCard'

// One collapsible section per category; expanding one shows its card grid
// inline. Mirrors the Act/Episode accordion in AdventureJournalDrawer, with
// the episode <ul> swapped for a card <div className="grid ...">.
export default function WorldCategoryAccordion({ world, openCategoryId, onToggleCategory, onSelectCard }) {
  return (
    <div className="space-y-3">
      {world.categories.map((category) => {
        const collapsed = category.id !== openCategoryId
        const cards = getCategoryCards(world, category.id)
        return (
          <div key={category.id} className="overflow-hidden rounded-lg border border-[#e2cfb3] bg-white shadow-sm">
            <button
              type="button"
              onClick={() => onToggleCategory(category.id)}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <span className="font-cinzel text-sm font-semibold text-stone-800">{category.title}</span>
              <span className="flex items-center gap-2">
                <span className="text-xs text-stone-400">{cards.length} รายการ</span>
                <span
                  className={`text-[10px] text-stone-400 transition-transform ${collapsed ? '-rotate-90' : ''}`}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </span>
            </button>
            {!collapsed && (
              <div className="border-t border-[#e2cfb3] bg-[#fdf8f0] p-4">
                {cards.length === 0 ? (
                  <p className="text-sm text-stone-400">ยังไม่มีข้อมูลในหมวดนี้</p>
                ) : (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {cards.map((card) => (
                      <WorldEntryCard key={card.id} card={card} onClick={() => onSelectCard(card)} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
