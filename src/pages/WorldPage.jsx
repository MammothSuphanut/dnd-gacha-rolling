import { useNavigate } from 'react-router-dom'
import { getWorldSettings } from '../utils/worldSettings'

export default function WorldPage() {
  const navigate = useNavigate()
  const worlds = getWorldSettings()

  return (
    <div className="w-full p-4 md:p-8">
      <h1 className="font-cinzel mb-4 text-2xl font-bold text-stone-900">World</h1>

      {worlds.length === 0 ? (
        <p className="text-sm text-stone-400">
          ยังไม่มี World Setting — เพิ่มโฟลเดอร์ manifest.json ใน world-settings/ ได้เลย
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {worlds.map((world) => (
            <button
              key={world.id}
              type="button"
              onClick={() => navigate(`/world/${world.id}`)}
              className="flex flex-col items-start gap-1 rounded-xl border border-[#e2cfb3] bg-white p-4 text-left shadow-sm transition-colors hover:border-violet-300 hover:bg-violet-50/40"
            >
              <h2 className="font-cinzel text-lg font-semibold text-stone-900">{world.name}</h2>
              {world.source && <p className="text-sm text-stone-500">{world.source}</p>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
