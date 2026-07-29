export default function WorldSettingSidebar({ worlds, selectedId, onSelect }) {
  return (
    <nav className="space-y-1 rounded-lg border border-[#e2cfb3] bg-white p-2 shadow-sm">
      {worlds.map((world) => (
        <button
          key={world.id}
          type="button"
          onClick={() => onSelect(world.id)}
          className={`block w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
            selectedId === world.id
              ? 'bg-violet-700 text-white'
              : 'text-stone-700 hover:bg-[#f5ede0]'
          }`}
        >
          <span className="block">{world.name}</span>
          {world.source && (
            <span className={`block text-xs ${selectedId === world.id ? 'text-violet-100' : 'text-stone-400'}`}>
              {world.source}
            </span>
          )}
        </button>
      ))}
    </nav>
  )
}
