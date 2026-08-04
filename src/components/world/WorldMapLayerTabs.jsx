// A world can have several map "layers": the whole-world overview plus one
// dedicated detail map per continent/region that has its own hi-res image
// (see manifest category.map). This renders the tab strip to switch between
// them and a small breadcrumb underneath when a detail layer is active.
export default function WorldMapLayerTabs({ layers, activeId, onSelect, worldName }) {
  const active = layers.find((layer) => layer.id === activeId) ?? layers[0]
  const isOverview = active.id === 'overview'

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto">
        {layers.map((layer) => {
          const isActive = layer.id === active.id
          return (
            <button
              key={layer.id}
              type="button"
              onClick={() => onSelect(layer.id)}
              className={`flex-none whitespace-nowrap rounded-t-lg border px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-[#e2cfb3] border-b-white bg-white text-violet-700'
                  : 'border-transparent text-stone-500 hover:bg-[#f5ede0] hover:text-stone-700'
              }`}
            >
              {layer.id === 'overview' ? `🌐 ${layer.title}` : layer.title}
            </button>
          )
        })}
      </div>
      {!isOverview && (
        <div className="flex items-center gap-1.5 rounded-b-lg border border-t-0 border-[#e2cfb3] bg-[#f5ede0] px-3 py-1.5 text-xs text-stone-500">
          <button type="button" onClick={() => onSelect('overview')} className="hover:text-violet-700 hover:underline">
            {worldName}
          </button>
          <span className="opacity-50">›</span>
          <span className="font-semibold text-stone-700">{active.title}</span>
        </div>
      )}
    </div>
  )
}
