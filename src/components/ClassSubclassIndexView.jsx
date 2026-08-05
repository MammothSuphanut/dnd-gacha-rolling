import { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { buildComponents, LINK_CLASS, slugifyHeading } from './AdventureMarkdownView'
import { parseClassSubclassIndex } from '../utils/parseClassSubclassIndex'

const CELL_CLASS = 'border border-[#e2cfb3] px-2 py-1 align-top text-stone-700'

function toggled(set, value) {
  const next = new Set(set)
  if (next.has(value)) next.delete(value)
  else next.add(value)
  return next
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
        active
          ? 'border-violet-400 bg-violet-100 text-violet-800'
          : 'border-[#e2cfb3] bg-white text-stone-600 hover:bg-[#f5ede0]'
      }`}
    >
      {children}
    </button>
  )
}

function FilterRow({ label, options, selected, onToggle, extra }) {
  if (options.length === 0) return null
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-xs font-semibold text-stone-500">{label}:</span>
      {extra}
      {options.map((option) => (
        <FilterChip key={option} active={selected.has(option)} onClick={() => onToggle(option)}>
          {option}
        </FilterChip>
      ))}
    </div>
  )
}

const BOOK_SCOPE_OPTIONS = [
  { value: 'both', label: 'ทั้งคู่' },
  { value: 'class', label: 'Class' },
  { value: 'subclass', label: 'Subclass' },
]

// Single-select segmented control for whether the Book chips (below) should
// match against the class itself (its own chassis book), each subclass row,
// or either — plain single-select, unlike the multi-select FilterChip row it
// sits next to.
function BookScopeToggle({ value, onChange }) {
  return (
    <div className="flex items-center overflow-hidden rounded-full border border-[#e2cfb3] bg-white text-[11px]">
      {BOOK_SCOPE_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-2 py-1 font-medium transition-colors ${
            value === opt.value ? 'bg-violet-100 text-violet-800' : 'text-stone-500 hover:bg-[#f5ede0]'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// Interactive replacement for rendering codex/General/class-subclass-index.md
// as plain markdown — that file is 500+ rows across 31 classes, too long to
// scroll through by hand, so this parses it (see parseClassSubclassIndex.js)
// and adds search + edition/book/class filters instead. The intro blockquote
// above the table of contents still renders as regular markdown (via the
// same buildComponents as every other doc) so its links/formatting stay
// identical; only the "## สารบัญ class" TOC and the per-class tables below it
// are replaced, since the class filter chips now serve the TOC's old job.
export default function ClassSubclassIndexView({ content, basePath }) {
  const { header, classes } = useMemo(() => parseClassSubclassIndex(content), [content])

  const editionOptions = useMemo(
    () => [...new Set(classes.flatMap((c) => c.subclasses.map((s) => s.edition)))].sort(),
    [classes]
  )
  const bookOptions = useMemo(
    () =>
      [
        ...new Set([
          ...classes.flatMap((c) => c.subclasses.map((s) => s.book)),
          ...classes.flatMap((c) => c.books || []),
        ]),
      ].sort((a, b) => a.localeCompare(b)),
    [classes]
  )
  const classOptions = useMemo(() => classes.map((c) => c.name), [classes])

  const [search, setSearch] = useState('')
  const [editions, setEditions] = useState(new Set())
  const [books, setBooks] = useState(new Set())
  const [bookScope, setBookScope] = useState('both') // 'both' | 'class' | 'subclass'
  const [selectedClasses, setSelectedClasses] = useState(new Set())

  const query = search.trim().toLowerCase()
  const hasActiveFacetFilter = query !== '' || editions.size > 0 || books.size > 0
  const hasAnyFilter = hasActiveFacetFilter || selectedClasses.size > 0

  // Book filter can match the class's own chassis book, each subclass row's
  // book, or both — bookScope picks which side(s) the `books` selection is
  // actually compared against.
  const bookAppliesToClass = books.size > 0 && bookScope !== 'subclass'
  const bookAppliesToSub = books.size > 0 && bookScope !== 'class'

  const visibleClasses = useMemo(() => {
    return classes
      .filter((c) => selectedClasses.size === 0 || selectedClasses.has(c.name))
      .map((c) => {
        const classNameMatches = query !== '' && c.name.toLowerCase().includes(query)
        const classBookMatches = !bookAppliesToClass || (c.books || []).some((b) => books.has(b))
        const filteredSubs = c.subclasses.filter((s) => {
          if (editions.size && !editions.has(s.edition)) return false
          if (bookAppliesToSub && !books.has(s.book)) return false
          if (query !== '' && !classNameMatches && !s.name.toLowerCase().includes(query)) return false
          return true
        })
        return { ...c, filteredSubs, classBookMatches, classNameMatches }
      })
      .filter((c) => {
        if (!hasActiveFacetFilter) return true
        // Scope = 'class' means the Book chips must be satisfied by the
        // class's own chassis book, full stop — independent of whatever
        // survives at the subclass level below. Without this upfront gate,
        // a class with any subclass surviving edition/search would show
        // regardless of its own book (bookAppliesToSub is false in this
        // scope, so filteredSubs never excludes it either).
        if (bookAppliesToClass && bookScope === 'class' && !c.classBookMatches) return false
        if (c.subclasses.length === 0) {
          // No subclass rows to fall back on — only the class's own name
          // (search) or its own book can keep it visible; edition has no
          // meaning for a class with no subclasses.
          if (editions.size > 0) return false
          if (query !== '' && !c.classNameMatches) return false
          if (books.size > 0) {
            // Scope is subclass-only: there's no subclass row left to
            // match, so a book filter can never be satisfied here.
            if (!bookAppliesToClass) return false
            // Scope includes 'class' (or 'both'): fall back to whether the
            // class's own chassis book matches.
            if (!c.classBookMatches) return false
          }
          return true
        }
        if (c.filteredSubs.length > 0) return true
        // No subclass row survived — still show the class if it matched the
        // book filter at the class level and no other filter (edition/search)
        // is active to demand a matching row too.
        return bookAppliesToClass && c.classBookMatches && editions.size === 0 && query === ''
      })
  }, [classes, selectedClasses, editions, books, query, hasActiveFacetFilter, bookAppliesToClass, bookAppliesToSub, bookScope])

  const totalShown = visibleClasses.reduce((sum, c) => sum + c.filteredSubs.length, 0)
  const totalAll = classes.reduce((sum, c) => sum + c.subclasses.length, 0)

  function clearFilters() {
    setSearch('')
    setEditions(new Set())
    setBooks(new Set())
    setBookScope('both')
    setSelectedClasses(new Set())
  }

  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={buildComponents(basePath)}>
        {header}
      </ReactMarkdown>

      <div className="mb-6 flex flex-col gap-2.5 rounded-lg border border-[#e2cfb3] bg-[#f5ede0]/60 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาชื่อ subclass หรือ class..."
            className="w-full max-w-xs rounded-md border border-[#e2cfb3] bg-white px-3 py-1.5 text-sm text-stone-700 placeholder:text-stone-400 focus:border-violet-400 focus:outline-none"
          />
          <span className="text-xs text-stone-500">
            แสดง {totalShown} จาก {totalAll} subclass
          </span>
          {hasAnyFilter && (
            <button type="button" onClick={clearFilters} className="text-xs text-violet-700 underline">
              ล้างตัวกรอง
            </button>
          )}
        </div>

        <FilterRow label="Edition" options={editionOptions} selected={editions} onToggle={(v) => setEditions(toggled(editions, v))} />
        <FilterRow
          label="Book"
          options={bookOptions}
          selected={books}
          onToggle={(v) => setBooks(toggled(books, v))}
          extra={<BookScopeToggle value={bookScope} onChange={setBookScope} />}
        />
        <FilterRow
          label="Class"
          options={classOptions}
          selected={selectedClasses}
          onToggle={(v) => setSelectedClasses(toggled(selectedClasses, v))}
        />
      </div>

      {visibleClasses.length === 0 && <p className="text-sm text-stone-400">ไม่พบ subclass ที่ตรงกับตัวกรอง</p>}

      {visibleClasses.map((c) => (
        <section key={c.name} className="mb-6">
          <h2 id={slugifyHeading(c.name)} className="font-cinzel mt-2 mb-2 text-lg font-bold text-stone-800">
            {c.link ? (
              <a href={c.link} target="_blank" rel="noreferrer" className={LINK_CLASS}>
                {c.name}
              </a>
            ) : (
              c.name
            )}
          </h2>
          {c.summary && <p className="mb-2 text-sm italic text-stone-500">{c.summary}</p>}
          {c.subclasses.length === 0 ? (
            <p className="mb-3 text-sm italic text-stone-400">(ไม่มี subclass ในข้อมูล local ที่ mirror ไว้)</p>
          ) : c.filteredSubs.length === 0 ? (
            <p className="mb-3 text-sm italic text-stone-400">(ไม่มี subclass ที่ตรงกับตัวกรอง — แสดง class นี้เพราะตัว class เองตรงกับ Book ที่เลือก)</p>
          ) : (
            <div className="mb-3 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-[#f5ede0] text-left">
                  <tr>
                    <th className={`${CELL_CLASS} font-semibold`}>Subclass</th>
                    <th className={`${CELL_CLASS} font-semibold`}>Edition</th>
                    <th className={`${CELL_CLASS} font-semibold`}>Source</th>
                    <th className={`${CELL_CLASS} font-semibold`}>Book</th>
                  </tr>
                </thead>
                <tbody>
                  {c.filteredSubs.map((s, i) => (
                    <tr key={`${s.name}-${s.edition}-${i}`}>
                      <td className={CELL_CLASS}>
                        {s.link ? (
                          <a href={s.link} target="_blank" rel="noreferrer" className={LINK_CLASS}>
                            {s.name}
                          </a>
                        ) : (
                          s.name
                        )}
                      </td>
                      <td className={CELL_CLASS}>{s.edition}</td>
                      <td className={CELL_CLASS}>{s.source}</td>
                      <td className={CELL_CLASS}>{s.book}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}
    </div>
  )
}
