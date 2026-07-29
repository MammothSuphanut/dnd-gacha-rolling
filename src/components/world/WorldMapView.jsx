import { useEffect, useRef, useState } from 'react'
import { WorldMapContext } from './WorldMapContext'

const MIN_ZOOM = 1
const MAX_ZOOM = 5
const WHEEL_STEP = 1.15
const BUTTON_STEP = 1.4

// Pan/zoom viewport for a world map image. Pins are passed as children so
// they share the same transformed coordinate space as the image — their
// percentage-based positions (see WorldMapPin) stay correct at any zoom
// level without extra math here.
//
// onBackgroundClick (edit mode "place a new pin" flow) fires with percentage
// coordinates when the user taps empty map area without dragging — a pin's
// own pointerdown stops propagation, so this never fires for clicks that
// land on a pin.
export default function WorldMapView({ src, alt, children, onBackgroundClick }) {
  const viewportRef = useRef(null)
  const [zoom, setZoom] = useState(MIN_ZOOM)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [naturalSize, setNaturalSize] = useState(null)
  const [dragging, setDragging] = useState(false)
  const dragStateRef = useRef({ dragging: false, moved: false, x: 0, y: 0, panX: 0, panY: 0 })

  function clampPan(nextPan, nextZoom) {
    const viewport = viewportRef.current
    if (!viewport || !naturalSize) return nextPan
    const rect = viewport.getBoundingClientRect()
    const scaledWidth = rect.width * nextZoom
    const scaledHeight = rect.width * (naturalSize.height / naturalSize.width) * nextZoom
    const minX = Math.min(0, rect.width - scaledWidth)
    const minY = Math.min(0, rect.height - scaledHeight)
    return {
      x: Math.min(0, Math.max(minX, nextPan.x)),
      y: Math.min(0, Math.max(minY, nextPan.y)),
    }
  }

  // Zooms so the point at (originX, originY) — viewport-relative pixels —
  // stays fixed under the cursor/center instead of the image drifting.
  // Reads zoom/pan directly from the current render rather than via
  // functional setState updaters: this is called once per discrete user
  // gesture (a wheel tick, a button click), so a stale closure isn't a risk,
  // and nextPan's math depends on nextZoom — computing both in one updater
  // meant calling setPan as a side effect inside setZoom's updater, which
  // React Strict Mode double-invokes in dev, corrupting the pan offset.
  function applyZoom(factor, originX, originY) {
    const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom * factor))
    const contentX = (originX - pan.x) / zoom
    const contentY = (originY - pan.y) / zoom
    const nextPan = { x: originX - contentX * nextZoom, y: originY - contentY * nextZoom }
    setZoom(nextZoom)
    setPan(clampPan(nextPan, nextZoom))
  }

  // Wheel handler below is attached once (empty dep array) so it isn't torn
  // down/rebuilt on every render; it calls through this ref to always reach
  // the current applyZoom closure instead of a stale one.
  const applyZoomRef = useRef(applyZoom)
  applyZoomRef.current = applyZoom

  function zoomAtCenter(factor) {
    const rect = viewportRef.current?.getBoundingClientRect()
    if (!rect) return
    applyZoom(factor, rect.width / 2, rect.height / 2)
  }

  function resetView() {
    setZoom(MIN_ZOOM)
    setPan({ x: 0, y: 0 })
  }

  // Wheel must be a non-passive native listener — React attaches onWheel as
  // passive by default, which silently ignores preventDefault() and lets the
  // page scroll underneath while the user is trying to zoom the map.
  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return undefined
    function handleWheel(e) {
      e.preventDefault()
      const rect = viewport.getBoundingClientRect()
      applyZoomRef.current(e.deltaY < 0 ? WHEEL_STEP : 1 / WHEEL_STEP, e.clientX - rect.left, e.clientY - rect.top)
    }
    viewport.addEventListener('wheel', handleWheel, { passive: false })
    return () => viewport.removeEventListener('wheel', handleWheel)
  }, [])

  function handlePointerDown(e) {
    dragStateRef.current = { dragging: true, moved: false, x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y }
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e) {
    const drag = dragStateRef.current
    if (!drag.dragging) return
    const dx = e.clientX - drag.x
    const dy = e.clientY - drag.y
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) drag.moved = true
    setPan(clampPan({ x: drag.panX + dx, y: drag.panY + dy }, zoom))
  }

  // Converts a pointer event's raw screen position into the map's own 0-100
  // percentage coordinate space, undoing the current pan/zoom transform.
  function screenToContent(clientX, clientY) {
    const rect = viewportRef.current.getBoundingClientRect()
    const contentX = (clientX - rect.left - pan.x) / zoom
    const contentY = (clientY - rect.top - pan.y) / zoom
    return { xPercent: (contentX / rect.width) * 100, yPercent: (contentY / rect.height) * 100 }
  }

  function handlePointerUp(e) {
    const wasBackgroundTap = dragStateRef.current.dragging && !dragStateRef.current.moved
    dragStateRef.current.dragging = false
    setDragging(false)
    if (wasBackgroundTap && onBackgroundClick) {
      const { xPercent, yPercent } = screenToContent(e.clientX, e.clientY)
      onBackgroundClick(xPercent, yPercent)
    }
  }

  // A pin is a <button> inside this viewport, so its click bubbles up here.
  // If the pointer actually dragged (panned) rather than tapped, swallow
  // that click in the capture phase so panning doesn't accidentally open
  // whichever pin the cursor happened to land on.
  function handleClickCapture(e) {
    if (dragStateRef.current.moved) {
      e.stopPropagation()
      dragStateRef.current.moved = false
    }
  }

  function handleDoubleClick(e) {
    const rect = viewportRef.current.getBoundingClientRect()
    applyZoom(BUTTON_STEP, e.clientX - rect.left, e.clientY - rect.top)
  }

  function handleImageLoad(e) {
    setNaturalSize({ width: e.target.naturalWidth, height: e.target.naturalHeight })
  }

  return (
    <div
      ref={viewportRef}
      className={`relative aspect-[3/2] max-h-[75vh] w-full select-none overflow-hidden rounded-xl border border-[#e2cfb3] bg-white shadow-sm ${
        onBackgroundClick ? 'cursor-crosshair' : ''
      }`}
      style={onBackgroundClick ? undefined : { cursor: dragging ? 'grabbing' : 'grab' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClickCapture={handleClickCapture}
      onDoubleClick={handleDoubleClick}
    >
      <WorldMapContext.Provider value={{ screenToContent }}>
        <div
          className="absolute left-0 top-0 w-full"
          style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: '0 0' }}
        >
          <img src={src} alt={alt} draggable={false} onLoad={handleImageLoad} className="block w-full" />
          {children}
        </div>
      </WorldMapContext.Provider>

      <div className="absolute bottom-3 right-3 flex flex-col overflow-hidden rounded-lg border border-[#e2cfb3] bg-white shadow-md">
        <button
          type="button"
          onClick={() => zoomAtCenter(BUTTON_STEP)}
          className="flex h-8 w-8 items-center justify-center text-lg font-semibold text-stone-700 hover:bg-[#f5ede0]"
          title="ซูมเข้า"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => zoomAtCenter(1 / BUTTON_STEP)}
          className="flex h-8 w-8 items-center justify-center border-t border-[#e2cfb3] text-lg font-semibold text-stone-700 hover:bg-[#f5ede0]"
          title="ซูมออก"
        >
          −
        </button>
        <button
          type="button"
          onClick={resetView}
          className="flex h-8 w-8 items-center justify-center border-t border-[#e2cfb3] text-[10px] font-semibold text-stone-500 hover:bg-[#f5ede0]"
          title="รีเซ็ตมุมมอง"
        >
          100%
        </button>
      </div>
    </div>
  )
}
