import { useRef, useState } from 'react'

// Checkbox dropdown for categorical filters with more than one useful value
// at once (School, Class, Type, ...). Values picked here are OR'd together
// by the caller (e.g. School = Evocation or Illusion) — combining with OTHER
// filters (AND/OR) is a separate, page-level concern this component doesn't
// know about. options: [{ value, label }]
export default function MultiSelectFilter({ label, options, selected, onChange, searchable }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef(null)

  const useSearch = searchable ?? options.length > 8
  const normalizedQuery = query.trim().toLowerCase()
  const visibleOptions = normalizedQuery ? options.filter((o) => o.label.toLowerCase().includes(normalizedQuery)) : options

  function toggleValue(value) {
    onChange(selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value])
  }

  // Closes when focus leaves the whole dropdown (button + panel), not just
  // whichever single element blurred — lets clicking a checkbox inside stay
  // open while a real click-away (or Tab out) closes it.
  function handleBlur(e) {
    if (!containerRef.current?.contains(e.relatedTarget)) {
      setOpen(false)
    }
  }

  const buttonText =
    selected.length === 0
      ? `${label}: ทั้งหมด`
      : selected.length === 1
        ? options.find((o) => o.value === selected[0])?.label || selected[0]
        : `${label}: เลือกไว้ ${selected.length}`

  return (
    <div ref={containerRef} onBlur={handleBlur} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-left text-sm ${
          selected.length > 0 ? 'border-violet-400 bg-violet-50 font-medium text-violet-800' : 'border-gray-300 text-stone-700'
        }`}
      >
        <span className="truncate">{buttonText}</span>
        <span className="shrink-0 text-xs text-stone-400">{open ? '▴' : '▾'}</span>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
          <div className="flex items-center justify-between gap-2 border-b border-[#f0e5d0] px-2 py-1.5">
            <button
              type="button"
              onClick={() => onChange(options.map((o) => o.value))}
              className="text-xs text-violet-600 hover:underline"
            >
              เลือกทั้งหมด
            </button>
            <button type="button" onClick={() => onChange([])} className="text-xs text-stone-500 hover:underline">
              ล้าง
            </button>
          </div>
          {useSearch && (
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหา..."
              className="w-full border-b border-[#f0e5d0] px-2 py-1.5 text-sm focus:outline-none"
            />
          )}
          <div className="max-h-56 overflow-y-auto">
            {visibleOptions.length === 0 ? (
              <p className="p-2 text-xs text-stone-400">ไม่พบตัวเลือก</p>
            ) : (
              visibleOptions.map((o) => (
                <label
                  key={o.value}
                  // Clicking the text (not the checkbox square itself) hits a
                  // plain, non-focusable <span> first — without this, the
                  // browser's default mousedown behavior blurs the trigger
                  // button (closing the dropdown via handleBlur) before the
                  // click ever reaches the checkbox to toggle it.
                  onMouseDown={(e) => e.preventDefault()}
                  className="flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm hover:bg-violet-50"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(o.value)}
                    onChange={() => toggleValue(o.value)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className="truncate text-stone-800">{o.label}</span>
                </label>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
