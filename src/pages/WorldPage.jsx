import { useState } from 'react'
import { getWorldSettings } from '../utils/worldSettings'
import WorldSettingSidebar from '../components/world/WorldSettingSidebar'
import WorldCategoryAccordion from '../components/world/WorldCategoryAccordion'
import WorldEntryModal from '../components/world/WorldEntryModal'

export default function WorldPage() {
  const worlds = getWorldSettings()
  const [selectedWorldId, setSelectedWorldId] = useState(worlds[0]?.id ?? null)
  const [openCategoryId, setOpenCategoryId] = useState(worlds[0]?.categories[0]?.id ?? null)
  const [selectedCard, setSelectedCard] = useState(null)

  const selectedWorld = worlds.find((world) => world.id === selectedWorldId) ?? null

  function handleSelectWorld(worldId) {
    setSelectedWorldId(worldId)
    const world = worlds.find((w) => w.id === worldId)
    setOpenCategoryId(world?.categories[0]?.id ?? null)
  }

  function toggleCategory(categoryId) {
    setOpenCategoryId((prev) => (prev === categoryId ? null : categoryId))
  }

  return (
    <div className="w-full p-4 md:p-8">
      <h1 className="font-cinzel mb-4 text-2xl font-bold text-stone-900">World</h1>

      {worlds.length === 0 ? (
        <p className="text-sm text-stone-400">
          ยังไม่มี World Setting — เพิ่มโฟลเดอร์ manifest.json ใน world-settings/ ได้เลย
        </p>
      ) : (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <aside className="w-full shrink-0 lg:w-56">
            <WorldSettingSidebar worlds={worlds} selectedId={selectedWorldId} onSelect={handleSelectWorld} />
          </aside>
          <div className="min-w-0 flex-1">
            {selectedWorld && (
              <WorldCategoryAccordion
                world={selectedWorld}
                openCategoryId={openCategoryId}
                onToggleCategory={toggleCategory}
                onSelectCard={setSelectedCard}
              />
            )}
          </div>
        </div>
      )}

      <WorldEntryModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  )
}
