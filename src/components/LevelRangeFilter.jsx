// Two plain <select> dropdowns ("from"/"to") standing in for a range slider
// — same filtering result (items within [min, max]) without needing to hand-
// roll a draggable dual-handle widget. `options` is the sorted list of
// numeric values actually present in the data (e.g. [0,1,2,...,9]).
export default function LevelRangeFilter({ label, options, min, max, optionLabel, onChange }) {
  const active = min != null || max != null
  return (
    <div className="flex items-center gap-1.5">
      <select
        value={min ?? ''}
        onChange={(e) => onChange({ min: e.target.value === '' ? null : Number(e.target.value), max })}
        className={`w-full rounded-md border px-2 py-2 text-sm ${
          active ? 'border-violet-400 bg-violet-50 font-medium text-violet-800' : 'border-gray-300'
        }`}
      >
        <option value="">{label} จาก</option>
        {options.map((v) => (
          <option key={v} value={v}>
            {optionLabel(String(v))}
          </option>
        ))}
      </select>
      <span className="shrink-0 text-stone-400">–</span>
      <select
        value={max ?? ''}
        onChange={(e) => onChange({ min, max: e.target.value === '' ? null : Number(e.target.value) })}
        className={`w-full rounded-md border px-2 py-2 text-sm ${
          active ? 'border-violet-400 bg-violet-50 font-medium text-violet-800' : 'border-gray-300'
        }`}
      >
        <option value="">ถึง</option>
        {options.map((v) => (
          <option key={v} value={v}>
            {optionLabel(String(v))}
          </option>
        ))}
      </select>
    </div>
  )
}
