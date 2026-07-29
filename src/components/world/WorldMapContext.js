import { createContext, useContext } from 'react'

// Exposes WorldMapView's pan/zoom geometry to pins nested inside it, so a
// pin being dragged in edit mode can convert the pointer's screen position
// into the map's own percentage coordinate space without WorldMapView
// needing to know anything about individual pins.
export const WorldMapContext = createContext(null)

export function useWorldMapView() {
  return useContext(WorldMapContext)
}
