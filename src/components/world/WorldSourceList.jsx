// A consistent "แหล่งที่มา" section for any card/category modal — renders
// nothing at all when there are no sources, rather than an empty heading.
export default function WorldSourceList({ sources }) {
  if (!sources || sources.length === 0) return null

  return (
    <div className="mt-4 border-t border-[#e2cfb3] pt-3">
      <p className="font-cinzel mb-1.5 text-xs font-semibold uppercase tracking-wide text-stone-400">แหล่งที่มา</p>
      <ul className="space-y-1">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-violet-700 underline decoration-dotted underline-offset-2 hover:text-violet-900"
            >
              {source.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
