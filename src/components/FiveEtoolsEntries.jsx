// Renders 5etools' "entries" markup format (nested blocks + {@tag ...}
// inline text) as JSX. Covers the block/tag types that actually show up in
// our normalized data; anything unrecognized falls back to plain text so we
// never crash on unfamiliar homebrew content.

import { buildFiveEtoolsConditionLink, buildFiveEtoolsVariantRuleLink } from '../utils/spellFormat'

const ATK_LABELS = {
  mw: 'Melee Weapon Attack:',
  rw: 'Ranged Weapon Attack:',
  'mw,rw': 'Melee or Ranged Weapon Attack:',
  ms: 'Melee Spell Attack:',
  rs: 'Ranged Spell Attack:',
}

function parseTag(raw) {
  // raw is the content between {@tagname and the matching }
  const spaceIdx = raw.indexOf(' ')
  const tag = spaceIdx === -1 ? raw : raw.slice(0, spaceIdx)
  const content = spaceIdx === -1 ? '' : raw.slice(spaceIdx + 1)
  const parts = content.split('|')
  return { tag, parts }
}

// `onSpellClick` is optional — callers that don't care about interactive
// {@spell ...} references (most of them) just render it as static styled
// text like every other reference tag, same as before.
function renderTag(tag, parts, key, onSpellClick) {
  const text = parts[0] ?? ''
  switch (tag) {
    case 'b':
    case 'bold':
      return <strong key={key}>{renderInline(text)}</strong>
    case 'i':
    case 'italic':
      return <em key={key}>{renderInline(text)}</em>
    case 'u':
    case 'underline':
      return <span key={key} className="underline">{renderInline(text)}</span>
    case 's':
    case 'strike':
      return <span key={key} className="line-through">{renderInline(text)}</span>
    case 'hit':
      return <strong key={key} className="text-violet-700">{Number(text) >= 0 ? `+${text}` : text}</strong>
    case 'h':
      return <strong key={key}>Hit: </strong>
    case 'dc':
      return <strong key={key} className="text-violet-700">DC {text}</strong>
    case 'atk': {
      const label = ATK_LABELS[parts.join(',')] || ATK_LABELS[text] || `${text} Attack:`
      return <strong key={key}>{label}</strong>
    }
    case 'damage':
    case 'dice':
    case 'scaledamage':
    case 'scaledice':
      return <strong key={key} className="text-red-700">{text}</strong>
    case 'recharge':
      return <span key={key} className="italic text-stone-500">{text ? `(Recharge ${text}–6)` : '(Recharge 6)'}</span>
    case 'condition':
    case 'status':
    case 'disease':
      return (
        <a
          key={key}
          href={buildFiveEtoolsConditionLink({ name: parts[0], source: parts[1] })}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-amber-700 underline decoration-dotted hover:text-amber-800"
        >
          {text}
        </a>
      )
    case 'variantrule':
      return (
        <a
          key={key}
          href={buildFiveEtoolsVariantRuleLink({ name: parts[0], source: parts[1] })}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-emerald-700 underline decoration-dotted hover:text-emerald-800"
        >
          {text}
        </a>
      )
    case 'spell':
      if (onSpellClick) {
        return (
          <button
            key={key}
            type="button"
            onClick={() => onSpellClick({ name: parts[0], source: parts[1] })}
            className="font-medium text-emerald-700 underline decoration-dotted hover:text-emerald-800"
          >
            {text}
          </button>
        )
      }
      return <span key={key} className="font-medium text-stone-800 underline decoration-dotted decoration-stone-400">{text}</span>
    case 'item':
    case 'creature':
    case 'action':
    case 'skill':
    case 'sense':
    case 'feat':
    case 'background':
    case 'race':
    case 'class':
    case 'subclass':
    case 'classFeature':
    case 'subclassFeature':
    case 'optfeature':
    case 'hazard':
    case 'deity':
    case 'deck':
    case 'object':
    case 'book':
    case 'table':
    case 'quickref':
    case 'filter':
    case 'itemMastery':
    case 'itemProperty':
      return <span key={key} className="font-medium text-stone-800 underline decoration-dotted decoration-stone-400">{text}</span>
    case 'note':
      return <span key={key} className="text-xs italic text-stone-500">{text}</span>
    default:
      return <span key={key}>{text}</span>
  }
}

// Splits a plain string on {@tag ...} tokens (non-nested) and returns an
// array of strings / JSX nodes.
function renderInline(str, onSpellClick) {
  if (typeof str !== 'string') return str
  const out = []
  let i = 0
  let key = 0
  while (i < str.length) {
    const start = str.indexOf('{@', i)
    if (start === -1) {
      out.push(str.slice(i))
      break
    }
    if (start > i) out.push(str.slice(i, start))
    const end = str.indexOf('}', start)
    if (end === -1) {
      out.push(str.slice(start))
      break
    }
    const { tag, parts } = parseTag(str.slice(start + 2, end))
    out.push(renderTag(tag, parts, key++, onSpellClick))
    i = end + 1
  }
  return out
}

function Prose({ children, onSpellClick }) {
  return <p className="text-sm leading-relaxed text-stone-700">{renderInline(children, onSpellClick)}</p>
}

function EntryList({ items, depth, onSpellClick }) {
  return (
    <ul className="ml-4 list-disc space-y-1 text-sm leading-relaxed text-stone-700">
      {items.map((item, i) => (
        <li key={i}>
          {typeof item === 'string' ? (
            renderInline(item, onSpellClick)
          ) : item?.name && item.entry != null ? (
            // "list-hang-notitle" style (common in Background write-ups):
            // `name` already carries its own trailing colon ("Feat:"), and
            // the text lives in the singular `entry` field, not `entries` —
            // a name-only space separator here, not ". ", or it reads "Feat:.".
            <>
              <strong>{renderInline(item.name, onSpellClick)} </strong>
              {typeof item.entry === 'string' ? (
                renderInline(item.entry, onSpellClick)
              ) : (
                <Entries entries={item.entry} depth={depth + 1} inline onSpellClick={onSpellClick} />
              )}
            </>
          ) : item?.name ? (
            <>
              <strong>{renderInline(item.name, onSpellClick)}. </strong>
              <Entries entries={item.entries} depth={depth + 1} inline onSpellClick={onSpellClick} />
            </>
          ) : (
            <Entries entries={item} depth={depth + 1} inline onSpellClick={onSpellClick} />
          )}
        </li>
      ))}
    </ul>
  )
}

function EntryTable({ node, onSpellClick }) {
  const rows = node.rows || []
  const cols = node.colLabels || []
  return (
    <div className="overflow-x-auto">
      <table className="my-1 w-full border-collapse text-sm">
        {node.caption && (
          <caption className="mb-1 text-left text-xs font-medium text-stone-500">{node.caption}</caption>
        )}
        {cols.length > 0 && (
          <thead>
            <tr className="border-b border-[#e2cfb3]">
              {cols.map((c, i) => (
                <th key={i} className="px-2 py-1 text-left font-semibold text-stone-700">
                  {renderInline(String(c), onSpellClick)}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-[#f0e5d0]">
              {(Array.isArray(row) ? row : row.row || []).map((cell, ci) => (
                <td key={ci} className="px-2 py-1 align-top text-stone-700">
                  <Entries
                    entries={typeof cell === 'object' && cell?.entries ? cell.entries : cell}
                    depth={1}
                    inline
                    onSpellClick={onSpellClick}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// refClassFeature/refSubclassFeature/refFeat/refOptionalfeature carry the
// referenced name as a pipe-string in a type-specific key; we don't expand
// the reference (would require cross-category joins), just show its name.
const REF_KEYS = {
  refClassFeature: 'classFeature',
  refSubclassFeature: 'subclassFeature',
  refFeat: 'feat',
  refOptionalfeature: 'optionalfeature',
}

function EntryBlock({ node, depth, onSpellClick }) {
  if (node == null) return null
  if (typeof node === 'string') return <Prose onSpellClick={onSpellClick}>{node}</Prose>
  if (Array.isArray(node)) return <Entries entries={node} depth={depth} onSpellClick={onSpellClick} />

  if (REF_KEYS[node.type]) {
    const name = String(node[REF_KEYS[node.type]] || '').split('|')[0]
    return (
      <p className="text-sm">
        <span className="font-medium text-stone-800 underline decoration-dotted decoration-stone-400">{name}</span>
      </p>
    )
  }

  switch (node.type) {
    case 'list':
      return <EntryList items={node.items || []} depth={depth} onSpellClick={onSpellClick} />
    case 'table':
      return <EntryTable node={node} onSpellClick={onSpellClick} />
    case 'options':
      return (
        <div className="text-sm">
          {node.count && <p className="mb-1 italic text-stone-500">Choose {node.count}:</p>}
          <EntryList items={node.entries || []} depth={depth} onSpellClick={onSpellClick} />
        </div>
      )
    case 'quote':
      return (
        <blockquote className="border-l-2 border-violet-300 pl-3 text-sm italic text-stone-600">
          <Entries entries={node.entries} depth={depth + 1} inline onSpellClick={onSpellClick} />
          {node.by && <div className="mt-1 not-italic text-xs text-stone-400">— {node.by}</div>}
        </blockquote>
      )
    case 'inset':
    case 'insetReadaloud':
    case 'variant':
    case 'variantInner':
      return (
        <div className="rounded-md border border-[#e2cfb3] bg-[#f5ede0] p-3">
          {node.name && <div className="mb-1 text-sm font-semibold text-stone-800">{renderInline(node.name, onSpellClick)}</div>}
          <Entries entries={node.entries} depth={depth + 1} onSpellClick={onSpellClick} />
        </div>
      )
    case 'entries':
    case 'section':
    default: {
      const HeadingTag = depth === 0 ? 'h4' : depth === 1 ? 'h5' : 'h6'
      return (
        <div className="space-y-1.5">
          {node.name && (
            <HeadingTag className="text-sm font-semibold text-stone-800">{renderInline(node.name, onSpellClick)}</HeadingTag>
          )}
          <Entries entries={node.entries} depth={depth + 1} onSpellClick={onSpellClick} />
        </div>
      )
    }
  }
}

export default function Entries({ entries, depth = 0, inline = false, onSpellClick }) {
  if (entries == null) return null
  if (typeof entries === 'string') {
    return inline ? <>{renderInline(entries, onSpellClick)}</> : <Prose onSpellClick={onSpellClick}>{entries}</Prose>
  }
  if (!Array.isArray(entries)) {
    return <EntryBlock node={entries} depth={depth} onSpellClick={onSpellClick} />
  }
  return (
    <div className="space-y-1.5">
      {entries.map((e, i) => (
        <EntryBlock key={i} node={e} depth={depth} onSpellClick={onSpellClick} />
      ))}
    </div>
  )
}

export { renderInline }
