import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getWorldSetting, getRawManifest, getCategoryCards, getCategoryOverview } from '../utils/worldSettings'
import { getPinBounds, projectPoint, isWithinBounds } from '../utils/mapProjection'
import { saveWorldManifest } from '../utils/exportImport'
import { isLocalHost } from '../store/GachaStore'
import { useToast } from '../store/ToastContext'
import WorldMapPin from '../components/world/WorldMapPin'
import WorldMapView from '../components/world/WorldMapView'
import WorldMapLayerTabs from '../components/world/WorldMapLayerTabs'
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
  const [activeMapId, setActiveMapId] = useState('overview')

  const [editMode, setEditMode] = useState(false)
  const [draftCategories, setDraftCategories] = useState(null)
  const [draftCards, setDraftCards] = useState(null)
  const [draftPartyPins, setDraftPartyPins] = useState(null)
  const [saving, setSaving] = useState(false)
  const [placingPin, setPlacingPin] = useState(false)
  const [placingPartyPin, setPlacingPartyPin] = useState(false)
  const [pendingNewPin, setPendingNewPin] = useState(null)
  const [pendingNewPartyPin, setPendingNewPartyPin] = useState(null)
  const [editingCard, setEditingCard] = useState(null)
  const [editingPartyPin, setEditingPartyPin] = useState(null)
  const [pinFilter, setPinFilter] = useState('all')

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
  const partyPins = editMode ? draftPartyPins : world.partyPins
  const showMapPins = pinFilter === 'all' || pinFilter === 'map'
  const showPartyPins = pinFilter === 'all' || pinFilter === 'party'

  // A continent with its own dedicated hi-res image (category.map, resolved
  // from the stable world.categories — this assignment isn't editable
  // through this page, so it's never read from the edit-mode draft) gets its
  // own map "layer": a tab that swaps WorldMapView's image + pin set instead
  // of cramming every city onto the single world overview map.
  const worldCategoriesWithMap = world.categories.filter((category) => category.map?.image)
  const mapLayers = [
    { id: 'overview', title: world.name, image: world.mapImage },
    ...worldCategoriesWithMap.map((category) => ({ id: category.id, title: category.title, image: category.map.image })),
  ]
  const activeLayer = mapLayers.find((layer) => layer.id === activeMapId) ?? mapLayers[0]
  const isOverviewLayer = activeLayer.id === 'overview'

  // Overview layer: every city pin, same as before there were per-continent
  // detail maps — a continent having its own map is an extra way to reach a
  // city, not a replacement for finding it on the world map.
  const overviewCityCards = cards.filter((card) => card.pin)

  // Detail layer: every city pin belonging to this continent, positioned by
  // its own card.detailPin once someone's dragged it into place, or a
  // best-effort projection from its overview pin in the meantime (see
  // utils/mapProjection.js). Party pins do the same, matched to this
  // continent by whether their overview position falls inside its bounds.
  const detailLayerCards = isOverviewLayer ? [] : cards.filter((card) => card.category === activeMapId && card.pin)
  const detailLayerBounds = getPinBounds(detailLayerCards.map((card) => card.pin))
  const detailLayerPins = detailLayerCards.map((card) => ({
    card,
    pos: card.detailPin ?? projectPoint(card.pin, detailLayerBounds),
  }))
  const detailLayerPartyPins = isOverviewLayer
    ? []
    : partyPins
        .filter((pin) => pin.detailPin || isWithinBounds(pin, detailLayerBounds))
        .map((pin) => ({ pin, pos: pin.detailPin ?? projectPoint(pin, detailLayerBounds) }))

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

  // A continent pin on the overview map either zooms into that continent's
  // own dedicated map (if one exists) or, for the continents that don't have
  // one yet, falls back to the old behaviour of opening its card grid.
  function handleContinentPinClick(category) {
    if (category.map) {
      setActiveMapId(category.id)
    } else {
      openCategory(category.id)
    }
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
    setDraftPartyPins(structuredClone(raw.partyPins ?? []))
    setEditMode(true)
  }

  function cancelEditMode() {
    setEditMode(false)
    setPlacingPin(false)
    setPlacingPartyPin(false)
    setPendingNewPin(null)
    setPendingNewPartyPin(null)
    setEditingCard(null)
    setEditingPartyPin(null)
  }

  function handleCategoryReposition(categoryId, x, y) {
    setDraftCategories((prev) => prev.map((c) => (c.id === categoryId ? { ...c, pin: { x, y } } : c)))
  }

  // On the overview layer this drags the card's normal pin; on a continent's
  // own detail map it writes a detailPin instead, which then takes priority
  // over the bounding-box projection every time this card is displayed there.
  function handleCardReposition(cardId, x, y) {
    setDraftCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, ...(isOverviewLayer ? { pin: { x, y } } : { detailPin: { x, y } }) } : c)),
    )
  }

  // Same overview-vs-detail split as handleCardReposition: on the overview
  // layer this drags the pin's normal x/y, on a continent's own detail map
  // it writes a detailPin instead, which takes priority over the bounding-box
  // projection every time this pin is displayed there.
  function handlePartyPinReposition(pinId, x, y) {
    setDraftPartyPins((prev) =>
      prev.map((p) => (p.id === pinId ? { ...p, ...(isOverviewLayer ? { x, y } : { detailPin: { x, y } }) } : p)),
    )
  }

  function togglePlacingPin() {
    setPlacingPartyPin(false)
    setPlacingPin((prev) => !prev)
  }

  function togglePlacingPartyPin() {
    setPlacingPin(false)
    setPlacingPartyPin((prev) => !prev)
  }

  function handleBackgroundClick(x, y) {
    setPlacingPin(false)
    setPendingNewPin({ x, y })
  }

  function handlePartyBackgroundClick(x, y) {
    setPlacingPartyPin(false)
    setPendingNewPartyPin({ x, y })
  }

  function handleCreateSubmit({ title, categoryId }) {
    const existingIds = new Set(draftCards.map((c) => c.id))
    const id = uniqueId(slugify(title), existingIds)
    // On a continent's own detail map the pin can only belong to that
    // continent, so the category is forced rather than taken from the form.
    const targetCategoryId = isOverviewLayer ? categoryId : activeMapId
    const newCard = {
      id,
      category: targetCategoryId,
      title,
      summary: '',
      contentPath: `/world-settings/${world.id}/${targetCategoryId}/${id}.md`,
      ...(isOverviewLayer ? { pin: pendingNewPin } : { detailPin: pendingNewPin }),
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

  function handleCreatePartySubmit({ title }) {
    const existingIds = new Set(draftPartyPins.map((p) => p.id))
    const id = uniqueId(slugify(title), existingIds)
    const newPin = { id, label: title, x: pendingNewPartyPin.x, y: pendingNewPartyPin.y }
    setDraftPartyPins((prev) => [...prev, newPin])
    setPendingNewPartyPin(null)
  }

  function handleEditPartySubmit({ title }) {
    setDraftPartyPins((prev) =>
      prev.map((p) => (p.id === editingPartyPin.id ? { ...p, label: title } : p)),
    )
    setEditingPartyPin(null)
  }

  function handleDeletePartyPin() {
    setDraftPartyPins((prev) => prev.filter((p) => p.id !== editingPartyPin.id))
    setEditingPartyPin(null)
  }

  async function handleSaveManifest() {
    setSaving(true)
    try {
      const raw = getRawManifest(world.id)
      await saveWorldManifest(world.id, {
        ...raw,
        categories: draftCategories,
        cards: draftCards,
        partyPins: draftPartyPins,
      })
      showToast('บันทึกตำแหน่งหมุดสำเร็จ — รีเฟรชหน้าเพื่อดูผลล่าสุด', 'success')
      cancelEditMode()
    } catch (err) {
      showToast(err.message || 'บันทึกไม่สำเร็จ', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex h-full w-full flex-col p-4 md:p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          {mapLayers.length > 1 && (
            <WorldMapLayerTabs layers={mapLayers} activeId={activeLayer.id} onSelect={setActiveMapId} worldName={world.name} />
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {world.mapImage && (
            <select
              value={pinFilter}
              onChange={(e) => setPinFilter(e.target.value)}
              className="rounded-lg border border-[#e2cfb3] bg-white px-3 py-2 text-sm font-medium text-stone-700 shadow-sm"
              title="ตัวกรองหมุด"
            >
              <option value="all">📍 แสดงหมุดทั้งหมด</option>
              <option value="map">🗺️ แสดงหมุดแผนที่</option>
              <option value="party">🧭 แสดงหมุดปาตี้</option>
              <option value="none">🚫 ซ่อนหมุดทั้งหมด</option>
            </select>
          )}
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
                onClick={togglePlacingPin}
                className={`rounded-lg border px-3 py-2 text-sm font-medium shadow-sm transition-colors ${
                  placingPin
                    ? 'border-violet-700 bg-violet-700 text-white'
                    : 'border-[#e2cfb3] bg-white text-stone-700 hover:bg-[#f5ede0]'
                }`}
              >
                {placingPin ? '📍 คลิกบนแผนที่เพื่อวางหมุด...' : '+ เพิ่มหมุด'}
              </button>
              {isOverviewLayer && (
                <button
                  type="button"
                  onClick={togglePlacingPartyPin}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium shadow-sm transition-colors ${
                    placingPartyPin
                      ? 'border-emerald-700 bg-emerald-700 text-white'
                      : 'border-[#e2cfb3] bg-white text-stone-700 hover:bg-[#f5ede0]'
                  }`}
                >
                  {placingPartyPin ? '🧭 คลิกบนแผนที่เพื่อวางหมุดปาตี้...' : '+ เพิ่มหมุดปาตี้'}
                </button>
              )}
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
          โหมดแก้ไข: ลากหมุดเพื่อขยับตำแหน่ง กดหมุดเมือง (จุดสีอำพัน) หรือหมุดปาตี้ (จุดสีเขียว) เพื่อแก้ชื่อ/ลบ
          ส่วนหมุดทวีป (จุดสีม่วง) ลากได้อย่างเดียว
          {!isOverviewLayer && ' — หมุดปาตี้แก้ไขได้เฉพาะแผนที่รวมเท่านั้น'}
        </p>
      )}

      {!isOverviewLayer && activeCategory === null && !editMode && (
        <button
          type="button"
          onClick={() => openCategory(activeMapId)}
          className="mb-2 text-xs text-stone-500 hover:text-violet-700 hover:underline"
        >
          ℹ️ เกี่ยวกับ {activeLayer.title}
        </button>
      )}

      <div className="min-h-0 flex-1">
        {activeLayer.image ? (
          <WorldMapView
            key={`${world.id}:${activeLayer.id}`}
            src={activeLayer.image}
            alt={`แผนที่ ${activeLayer.title}`}
            onBackgroundClick={
              editMode && placingPin
                ? handleBackgroundClick
                : editMode && isOverviewLayer && placingPartyPin
                  ? handlePartyBackgroundClick
                  : undefined
            }
          >
            {isOverviewLayer && showMapPins &&
              continentCategories.map((category) => (
                <WorldMapPin
                  key={category.id}
                  x={category.pin.x}
                  y={category.pin.y}
                  label={category.title}
                  variant="continent"
                  editable={editMode}
                  onClick={editMode ? undefined : () => handleContinentPinClick(category)}
                  onReposition={(x, y) => handleCategoryReposition(category.id, x, y)}
                />
              ))}
            {isOverviewLayer && showMapPins &&
              overviewCityCards.map((card) => (
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
            {!isOverviewLayer && showMapPins &&
              detailLayerPins.map(({ card, pos }) => (
                <WorldMapPin
                  key={card.id}
                  x={pos.x}
                  y={pos.y}
                  label={card.title}
                  variant="city"
                  editable={editMode}
                  onClick={editMode ? () => setEditingCard(card) : () => openCard(card)}
                  onReposition={(x, y) => handleCardReposition(card.id, x, y)}
                />
              ))}
            {isOverviewLayer && showPartyPins &&
              partyPins.map((pin) => (
                <WorldMapPin
                  key={pin.id}
                  x={pin.x}
                  y={pin.y}
                  label={pin.label}
                  variant="party"
                  editable={editMode}
                  onClick={editMode ? () => setEditingPartyPin(pin) : undefined}
                  onReposition={(x, y) => handlePartyPinReposition(pin.id, x, y)}
                />
              ))}
            {!isOverviewLayer && showPartyPins &&
              detailLayerPartyPins.map(({ pin, pos }) => (
                <WorldMapPin
                  key={pin.id}
                  x={pos.x}
                  y={pos.y}
                  label={pin.label}
                  variant="party"
                  editable={editMode}
                  onClick={editMode ? () => setEditingPartyPin(pin) : undefined}
                  onReposition={(x, y) => handlePartyPinReposition(pin.id, x, y)}
                />
              ))}
          </WorldMapView>
        ) : (
          <p className="text-sm text-stone-400">ยังไม่มีแผนที่สำหรับ World Setting นี้</p>
        )}
      </div>

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
        initialCategoryId={isOverviewLayer ? continentCategories[0]?.id : activeMapId}
        categories={isOverviewLayer ? continentCategories : continentCategories.filter((c) => c.id === activeMapId)}
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

      <WorldPinFormModal
        open={!!pendingNewPartyPin}
        mode="create"
        variant="party"
        initialTitle=""
        onCancel={() => setPendingNewPartyPin(null)}
        onSubmit={handleCreatePartySubmit}
      />
      <WorldPinFormModal
        open={!!editingPartyPin}
        mode="edit"
        variant="party"
        initialTitle={editingPartyPin?.label}
        onCancel={() => setEditingPartyPin(null)}
        onSubmit={handleEditPartySubmit}
        onDelete={handleDeletePartyPin}
      />
    </div>
  )
}
