import { useRef } from 'react'
import { useWorldMapView } from './WorldMapContext'

function clampPercent(value) {
  return Math.min(100, Math.max(0, value))
}

// A clickable marker positioned by percentage over a world map image, so it
// stays put regardless of how wide the map is rendered. "continent" pins are
// bigger (violet) for the 5 landmasses; "city" pins are smaller (amber) for
// individual locations with their own card.
//
// In edit mode (editable=true) the pin becomes draggable — it converts its
// own pointer movement into map percentage coordinates via WorldMapView's
// context and reports the new position through onReposition, while a plain
// tap (no movement) still calls onClick as usual.
export default function WorldMapPin({ x, y, label, variant = 'continent', editable = false, onClick, onReposition }) {
  const isCity = variant === 'city'
  const mapView = useWorldMapView()
  const dragRef = useRef({ dragging: false, moved: false })

  function handlePointerDown(e) {
    if (!editable) return
    e.stopPropagation()
    dragRef.current = { dragging: true, moved: false }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e) {
    if (!editable || !dragRef.current.dragging || !mapView) return
    dragRef.current.moved = true
    const { xPercent, yPercent } = mapView.screenToContent(e.clientX, e.clientY)
    onReposition?.(clampPercent(xPercent), clampPercent(yPercent))
  }

  function handlePointerUp(e) {
    if (!editable) return
    e.stopPropagation()
    const wasTap = !dragRef.current.moved
    dragRef.current = { dragging: false, moved: false }
    if (wasTap) onClick?.()
  }

  return (
    <button
      type="button"
      onClick={editable ? undefined : onClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ left: `${x}%`, top: `${y}%` }}
      className={`group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none ${
        editable ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
      title={label}
    >
      <span
        className={`block rounded-full border-2 shadow-md transition-transform group-hover:scale-125 ${
          editable ? 'animate-pulse border-dashed border-violet-500' : 'border-white'
        } ${isCity ? 'h-2.5 w-2.5 bg-amber-500' : 'h-4 w-4 bg-violet-700'}`}
      />
      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-stone-900/85 px-1.5 py-0.5 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </button>
  )
}
