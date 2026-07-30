import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getWorldSetting, getRawManifest, getCategoryCards, getCategoryOverview } from '../utils/worldSettings'
import { saveWorldManifest } from '../utils/exportImport'
import { isLocalHost } from '../store/GachaStore'
import { useToast } from '../store/ToastContext'
import WorldMapPin from '../components/world/WorldMapPin'
import WorldMapView from '../components/world/WorldMapView'
import WorldEntryModal from '../components/world/WorldEntryModal'
import WorldCategoryModal from '../components/world/WorldCategoryModal'
import WorldPinFormModal from '../components/world/WorldPinFormModal'

function slugify(text) {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return slug || `pin-${Date.now()}`
}

function uniqueId(base, existingIds) {
  if (!existingIds.has(base)) return base
  let i = 2
  while (existingIds.has(`${base}-${i}`)) i += 1
  return `${base}-${i}`
}

// Contents has no map pin (it's not a place) — just a grid of topic cards
// like "ภาพรวม"/"ทะเล", opened from the header button instead of a pin.
const CONTENTS_CATEGORY = { id: 'contents', title: 'Contents' }

export default function WorldSettingPage() {
  const { worldId } = useParams()
  const world = getWorldSetting(worldId)
  const { showToast } = useToast()

  const [activeCard, setActiveCard] = useState(null)
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const [contentsOpen, setContentsOpen] = useState(false)

  const [editMode, setEditMode] = useState(false)
  const [draftCategories, setDraftCategories] = useState(null)
  const [draftCards, setDraftCards] = useState(null)
  const [saving, setSaving] = useState(false)
  const [placingPin, setPlacingPin] = useState(false)
  const [pendingNewPin, setPendingNewPin] = useState(null)
  const [editingCard, setEditingCard] = useState(null)

  if (!world) {
    return (
      <div className="w-full p-4 md:p-8">
        <p className="mb-2 text-sm text-stone-400">ไม่พบ World Setting นี้</p>
        <Link to="/world" className="text-sm text-violet-700 underline">
          ← กลับไปหน้า World
        </Link>
      </div>
    )
  }

  const contentsCards = getCategoryCards(world, 'contents')
  const categories = editMode ? draftCategories : world.categories
  const cards = editMode ? draftCards : world.cards
  const continentCategories = categories.filter((category) => category.pin)
  const cityCards = cards.filter((card) => card.pin)

  const activeCategory = !editMode ? continentCategories.find((category) => category.id === activeCategoryId) ?? null : null
  const activeOverview = activeCategory ? getCategoryOverview(world, activeCategory.id) : null
  const activeCategoryCards = activeCategory
    ? getCategoryCards(world, activeCategory.id).filter((card) => card.pin)
    : []

  function openCard(card) {
    setActiveCategoryId(null)
    setContentsOpen(false)
    setActiveCard(card)
  }

  function openCategory(categoryId) {
    setActiveCard(null)
    setActiveCategoryId(categoryId)
  }

  function closeAll() {
    setActiveCard(null)
    setActiveCategoryId(null)
    setContentsOpen(false)
  }

  function enterEditMode() {
    const raw = getRawManifest(world.id)
    setDraftCategories(structuredClone(raw.categories ?? []))
    setDraftCards(structuredClone(raw.cards ?? []))
    setEditMode(true)
  }

  function cancelEditMode() {
    setEditMode(false)
    setPlacingPin(false)
    setPendingNewPin(null)
    setEditingCard(null)
  }

  function handleCategoryReposition(categoryId, x, y) {
    setDraftCategories((prev) => prev.map((c) => (c.id === categoryId ? { ...c, pin: { x, y } } : c)))
  }

  function handleCardReposition(cardId, x, y) {
    setDraftCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, pin: { x, y } } : c)))
  }

  function handleBackgroundClick(x, y) {
    setPlacingPin(false)
    setPendingNewPin({ x, y })
  }

  function handleCreateSubmit({ title, categoryId }) {
    const existingIds = new Set(draftCards.map((c) => c.id))
    const id = uniqueId(slugify(title), existingIds)
    const newCard = {
      id,
      category: categoryId,
      title,
      summary: '',
      contentPath: `/world-settings/${world.id}/${categoryId}/${id}.md`,
      pin: pendingNewPin,
    }
    setDraftCards((prev) => [...prev, newCard])
    setPendingNewPin(null)
  }

  function handleEditSubmit({ title, categoryId }) {
    setDraftCards((prev) =>
      prev.map((c) => (c.id === editingCard.id ? { ...c, title, category: categoryId } : c)),
    )
    setEditingCard(null)
  }

  function handleDeleteCard() {
    setDraftCards((prev) => prev.filter((c) => c.id !== editingCard.id))
    setEditingCard(null)
  }

  async function handleSaveManifest() {
    setSaving(true)
    try {
      const raw = getRawManifest(world.id)
      await saveWorldManifest(world.id, { ...raw, categories: draftCategories, cards: draftCards })
      showToast('บันทึกตำแหน่งหมุดสำเร็จ — รีเฟรชหน้าเพื่อดูผลล่าสุด', 'success')
      cancelEditMode()
    } catch (err) {
      showToast(err.message || 'บันทึกไม่สำเร็จ', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="w-full p-4 md:p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <Link to="/world" className="text-xs text-stone-500 hover:text-violet-700">
            ← กลับไปหน้า World
          </Link>
          <h1 className="font-cinzel text-2xl font-bold text-stone-900">{world.name}</h1>
          {world.source && <p className="text-xs text-stone-400">{world.source}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {contentsCards.length > 0 && !editMode && (
            <button
              type="button"
              onClick={() => setContentsOpen(true)}
              className="rounded-lg border border-[#e2cfb3] bg-white px-3 py-2 text-sm font-medium text-stone-700 shadow-sm transition-colors hover:bg-[#f5ede0]"
            >
              📑 Contents
            </button>
          )}
          {isLocalHost() && !editMode && (
            <button
              type="button"
              onClick={enterEditMode}
              className="rounded-lg border border-[#e2cfb3] bg-white px-3 py-2 text-sm font-medium text-stone-700 shadow-sm transition-colors hover:bg-[#f5ede0]"
            >
              ✏️ แก้ไขหมุด
            </button>
          )}
          {editMode && (
            <>
              <button
                type="button"
                onClick={() => setPlacingPin((prev) => !prev)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium shadow-sm transition-colors ${
                  placingPin
                    ? 'border-violet-700 bg-violet-700 text-white'
                    : 'border-[#e2cfb3] bg-white text-stone-700 hover:bg-[#f5ede0]'
                }`}
              >
                {placingPin ? '📍 คลิกบนแผนที่เพื่อวางหมุด...' : '+ เพิ่มหมุด'}
              </button>
              <button
                type="button"
                onClick={cancelEditMode}
                disabled={saving}
                className="rounded-lg px-3 py-2 text-sm text-stone-600 hover:bg-[#f5ede0] disabled:opacity-50"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleSaveManifest}
                disabled={saving}
                className="rounded-lg bg-violet-700 px-3 py-2 text-sm font-medium text-white hover:bg-violet-800 disabled:opacity-60"
              >
                {saving ? 'กำลังบันทึก...' : '💾 บันทึกตำแหน่งหมุด'}
              </button>
            </>
          )}
        </div>
      </div>

      {editMode && (
        <p className="mb-3 text-xs text-stone-500">
          โหมดแก้ไข: ลากหมุดเพื่อขยับตำแหน่ง กดหมุดเมือง (จุดสีอำพัน) เพื่อแก้ชื่อ/ทวีป/ลบ ส่วนหมุดทวีป (จุดสีม่วง) ลากได้อย่างเดียว
        </p>
      )}

      {world.mapImage ? (
        <WorldMapView
          key={world.id}
          src={world.mapImage}
          alt={`แผนที่ ${world.name}`}
          onBackgroundClick={editMode && placingPin ? handleBackgroundClick : undefined}
        >
          {continentCategories.map((category) => (
            <WorldMapPin
              key={category.id}
              x={category.pin.x}
              y={category.pin.y}
              label={category.title}
              variant="continent"
              editable={editMode}
              onClick={editMode ? undefined : () => openCategory(category.id)}
              onReposition={(x, y) => handleCategoryReposition(category.id, x, y)}
            />
          ))}
          {cityCards.map((card) => (
            <WorldMapPin
              key={card.id}
              x={card.pin.x}
              y={card.pin.y}
              label={card.title}
              variant="city"
              editable={editMode}
              onClick={editMode ? () => setEditingCard(card) : () => openCard(card)}
              onReposition={(x, y) => handleCardReposition(card.id, x, y)}
            />
          ))}
        </WorldMapView>
      ) : (
        <p className="text-sm text-stone-400">ยังไม่มีแผนที่สำหรับ World Setting นี้</p>
      )}

      <WorldEntryModal card={activeCard} onClose={closeAll} />
      <WorldCategoryModal
        category={activeCategory}
        overview={activeOverview}
        cards={activeCategoryCards}
        onClose={closeAll}
        onSelectCard={openCard}
      />
      <WorldCategoryModal
        category={contentsOpen ? CONTENTS_CATEGORY : null}
        overview={null}
        cards={contentsCards}
        onClose={closeAll}
        onSelectCard={openCard}
      />

      <WorldPinFormModal
        open={!!pendingNewPin}
        mode="create"
        initialTitle=""
        initialCategoryId={continentCategories[0]?.id}
        categories={continentCategories}
        onCancel={() => setPendingNewPin(null)}
        onSubmit={handleCreateSubmit}
      />
      <WorldPinFormModal
        open={!!editingCard}
        mode="edit"
        initialTitle={editingCard?.title}
        initialCategoryId={editingCard?.category}
        categories={continentCategories}
        onCancel={() => setEditingCard(null)}
        onSubmit={handleEditSubmit}
        onDelete={handleDeleteCard}
      />
    </div>
  )
}
