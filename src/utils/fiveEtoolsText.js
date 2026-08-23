// Renders 5etools' structured rules-text format (used across the project's
// bundled spell/class/race/item/feat JSON mirrors — see src/data/5etools) down
// to plain text, for embedding real SRD rules text into the "modern" PDF
// export. Not a full 5etools renderer (that's a much bigger surface — tables,
// homebrew-only tags, etc.) — just enough to read cleanly on a character sheet.

// Strips {@tag content|extra|extra} down to "content" (or a tag-specific
// shorthand), recursively (tags can nest, e.g. "{@dice 1d4 {@hit +2}}" isn't
// real 5etools output, but nested simple tags do occur).
export function stripTags(str) {
  if (typeof str !== 'string') return ''
  let prev
  let out = str
  // Iterate: a single pass can leave nested "{@..}" untouched if it was
  // inside another tag's trailing options; a few passes converges safely.
  for (let i = 0; i < 4; i++) {
    prev = out
    out = out.replace(/\{@(\w+)\s+([^{}]*?)\}/g, (_, tag, body) => {
      const parts = body.split('|')
      const display = parts[0]
      switch (tag) {
        case 'dice':
        case 'damage':
        case 'scaledamage':
        case 'scaledice':
          return parts[parts.length > 2 ? 2 : 0] || display
        case 'hit':
          return `+${display}`
        case 'chance':
          return `${display}%`
        case 'recharge':
          return `Recharge ${display || '6'}`
        default:
          // Nearly every other tag follows "{@tag displayText|source|...}" —
          // nothing after the first pipe is ever the display text, it's a
          // source/page qualifier (e.g. "XPHB"), so always keep parts[0].
          return display
      }
    })
    if (out === prev) break
  }
  // Any leftover/unrecognized {@...} (e.g. malformed) — just drop the braces.
  out = out.replace(/\{@\w+\s*/g, '').replace(/\}/g, '')
  return out
}

function renderNode(node, out) {
  if (node == null) return
  if (typeof node === 'string') {
    out.push(stripTags(node))
    return
  }
  if (Array.isArray(node)) {
    node.forEach((n) => renderNode(n, out))
    return
  }
  if (typeof node !== 'object') return

  switch (node.type) {
    case 'entries':
    case 'section':
    case 'inset':
    case 'insetReadaloud': {
      if (node.name) out.push(`__BOLD__${stripTags(node.name)}`)
      renderNode(node.entries, out)
      return
    }
    case 'list': {
      const items = node.items ?? []
      items.forEach((it) => {
        if (typeof it === 'string') out.push(`__BULLET__${stripTags(it)}`)
        else if (it && typeof it === 'object') {
          const label = it.name ? `${stripTags(it.name)}. ` : ''
          const sub = []
          renderNode(it.entries ?? it.entry, sub)
          out.push(`__BULLET__${label}${sub.join(' ')}`)
        }
      })
      return
    }
    case 'table': {
      if (node.caption) out.push(`__BOLD__${stripTags(node.caption)}`)
      const rows = node.rows ?? []
      rows.forEach((row) => {
        const cells = (Array.isArray(row) ? row : row.row ?? []).map((c) =>
          typeof c === 'string' ? stripTags(c) : stripTags(c?.entry ?? ''),
        )
        if (cells.length) out.push(`__BULLET__${cells.join(' — ')}`)
      })
      return
    }
    case 'quote': {
      renderNode(node.entries, out)
      if (node.by) out.push(`__ITALIC__— ${stripTags(node.by)}`)
      return
    }
    case 'entriesHigherLevel':
    case 'options':
      renderNode(node.entries, out)
      return
    case 'abilityDc':
    case 'abilityAttackMod':
    case 'abilityGeneric':
      // Auto-computed inline values we don't have the machinery to resolve —
      // skip rather than print a stub.
      return
    default:
      // Unknown block type: best-effort render its entries/entry if present.
      if (node.entries || node.entry) renderNode(node.entries ?? node.entry, out)
  }
}

// Converts a 5etools `entries` array (or a single entry) to a plain-text
// string with "\n\n" paragraph breaks and "• " bullets — ready for the
// Sheet.paragraph()/measureParagraphHeight() helpers in pdfDraw.js.
export function entriesToText(entries) {
  const lines = []
  renderNode(entries, lines)
  return lines
    .map((l) => {
      if (l.startsWith('__BULLET__')) return `• ${l.slice('__BULLET__'.length)}`
      if (l.startsWith('__BOLD__')) return l.slice('__BOLD__'.length)
      if (l.startsWith('__ITALIC__')) return l.slice('__ITALIC__'.length)
      return l
    })
    .filter(Boolean)
    .join('\n\n')
}

export function firstSentence(text, maxLen = 140) {
  const t = String(text ?? '').trim()
  if (t.length <= maxLen) return t
  return `${t.slice(0, maxLen).replace(/\s+\S*$/, '')}…`
}
