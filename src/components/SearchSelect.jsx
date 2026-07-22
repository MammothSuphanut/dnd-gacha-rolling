import { useState } from 'react'

// Single-select combobox: looks like a text input, but focusing it (even
// before typing) opens the full option list like a normal <select> — typing
// filters that list. Options can carry a `group` to render under a sticky
// header (e.g. shop name), and `disabled` to show but block picking.
// options: [{ value, label, group?, disabled? }]
export default function SearchSelect({
  options,
  value,
  onChange,
  placeholder = 'พิมพ์เพื่อค้นหา...',
  clearLabel = 'เปลี่ยน',
  emptyOptionsLabel = 'ไม่มีตัวเลือก',
  noMatchLabel = 'ไม่พบตัวเลือกที่ตรงกับคำค้นหา',
  className = '',
  disabled = false,
}) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const selected = options.find((o) => o.value === value)
  const normalizedQuery = query.trim().toLowerCase()
  const visibleOptions = normalizedQuery
    ? options.filter((o) => o.label.toLowerCase().includes(normalizedQuery))
    : options

  const grouped = []
  const groupMap = new Map()
  for (const o of visibleOptions) {
    const key = o.group ?? ''
    if (!groupMap.has(key)) {
      const list = []
      groupMap.set(key, list)
      grouped.push([key, list])
    }
    groupMap.get(key).push(o)
  }
  const hasGroups = grouped.some(([key]) => key)

  function pick(opt) {
    if (opt.disabled) return
    onChange(opt.value)
    setQuery('')
    setFocused(false)
  }

  function renderOption(o) {
    return (
      <button
        key={o.value}
        type="button"
        disabled={o.disabled}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => pick(o)}
        className={`flex w-full items-center justify-between gap-2 px-3 py-1.5 text-left text-sm ${
          o.disabled ? 'cursor-not-allowed text-stone-300' : 'text-stone-800 hover:bg-violet-50'
        }`}
      >
        <span>{o.label}</span>
      </button>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {selected ? (
        <div className="flex items-center justify-between gap-2 rounded-md border border-violet-300 bg-violet-50 px-2 py-1.5 text-sm">
          <span className="truncate font-medium text-violet-800">
            {selected.label}
            {selected.group && <span className="text-xs text-violet-500"> ({selected.group})</span>}
          </span>
          {!disabled && (
            <button
              type="button"
              onClick={() => {
                onChange('')
                setQuery('')
              }}
              className="shrink-0 text-xs text-violet-500 underline decoration-dotted hover:text-violet-700"
            >
              {clearLabel}
            </button>
          )}
        </div>
      ) : value ? (
        // value is set but doesn't match any known option (eg. imported from a PDF,
        // or an option removed since) - show it instead of silently looking empty.
        <div className="flex items-center justify-between gap-2 rounded-md border border-amber-300 bg-amber-50 px-2 py-1.5 text-sm">
          <span className="truncate font-medium text-amber-800" title="ค่านี้ไม่ตรงกับตัวเลือกที่มีอยู่">
            {value}
          </span>
          {!disabled && (
            <button
              type="button"
              onClick={() => {
                onChange('')
                setQuery('')
              }}
              className="shrink-0 text-xs text-amber-600 underline decoration-dotted hover:text-amber-800"
            >
              {clearLabel}
            </button>
          )}
        </div>
      ) : (
        <>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm disabled:bg-[#f5ede0] disabled:text-stone-400"
          />
          {focused && !disabled && (
            <div className="absolute z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
              {visibleOptions.length === 0 ? (
                <p className="p-2 text-xs text-stone-400">
                  {options.length === 0 ? emptyOptionsLabel : noMatchLabel}
                </p>
              ) : hasGroups ? (
                grouped.map(([groupName, opts]) => (
                  <div key={groupName || '_'}>
                    {groupName && (
                      <div className="sticky top-0 bg-[#f5ede0] px-3 py-1 text-[11px] font-semibold text-stone-500">
                        {groupName}
                      </div>
                    )}
                    {opts.map(renderOption)}
                  </div>
                ))
              ) : (
                visibleOptions.map(renderOption)
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
