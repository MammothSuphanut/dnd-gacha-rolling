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
  const dragRef = useRef({ dragging: false, moved: false, offsetX: 0, offsetY: 0 })

  // Always stop propagation, even outside edit mode: if a pin's pointerdown
  // reaches WorldMapView, its own pan handler calls setPointerCapture on
  // itself, which hijacks the rest of the gesture (and the click that
  // follows) away from the pin — so neither the pin's onClick nor the map's
  // background-click-to-place-a-pin ever fires.
  function handlePointerDown(e) {
    e.stopPropagation()
    if (!editable) return
    // Record how far off-center the cursor grabbed the pin, so the pin keeps
    // that same offset instead of snapping its anchor onto the cursor on the
    // very first move (which reads as the pin "teleporting" to the cursor).
    const start = mapView?.screenToContent(e.clientX, e.clientY)
    dragRef.current = {
      dragging: true,
      moved: false,
      offsetX: start ? start.xPercent - x : 0,
      offsetY: start ? start.yPercent - y : 0,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e) {
    e.stopPropagation()
    if (!editable || !dragRef.current.dragging || !mapView) return
    dragRef.current.moved = true
    const { xPercent, yPercent } = mapView.screenToContent(e.clientX, e.clientY)
    onReposition?.(
      clampPercent(xPercent - dragRef.current.offsetX),
      clampPercent(yPercent - dragRef.current.offsetY),
    )
  }

  function handlePointerUp(e) {
    e.stopPropagation()
    if (!editable) return
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
      // The button's own hit box (h-10 w-10) is bigger than the visible dot
      // inside it — that's the "hover near it" zone: hovering anywhere in
      // this invisible 40px area reveals the dot via group-hover, not just
      // the few pixels of the dot itself. In edit mode pins stay fully
      // visible always, since you need to see them to drag/place accurately.
      className={`group absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center focus:outline-none ${
        editable ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
      title={label}
    >
      <span
        className={`block rounded-full border-2 shadow-md transition-all duration-150 group-hover:scale-125 group-focus-visible:opacity-100 ${
          editable
            ? 'animate-pulse border-dashed border-violet-500 opacity-100'
            : mapView?.revealAll
              ? 'border-white opacity-100'
              : 'border-white opacity-20 group-hover:opacity-100'
        } ${isCity ? 'h-2.5 w-2.5 bg-amber-500' : 'h-4 w-4 bg-violet-700'}`}
      />
      <span className="pointer-events-none absolute left-1/2 top-full z-10 -mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-stone-900/85 px-1.5 py-0.5 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </button>
  )
}
