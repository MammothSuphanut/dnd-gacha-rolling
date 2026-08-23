// Low-level drawing helpers shared by the "modern" (D&D Beyond-style) PDF
// character sheet builder in pdfModernExport.js. Nothing here knows about
// character data — it's just a thin, reusable layer over pdf-lib.
import { rgb } from 'pdf-lib'

export const PAGE_W = 612 // US Letter, points (8.5in * 72)
export const PAGE_H = 792 // 11in * 72
export const MARGIN = 30

// Palette echoing the app's own parchment/violet theme (see tailwind classes
// like #e2cfb3 / #f5ede0 / violet-700 used throughout the React UI) rather
// than attempting to reproduce D&D Beyond's exact proprietary art/frame —
// see the export summary for why.
export const INK = rgb(0.16, 0.14, 0.12)
export const MUTED = rgb(0.45, 0.42, 0.38)
export const FAINT = rgb(0.62, 0.58, 0.52)
export const BORDER = rgb(0.83, 0.75, 0.62) // #e2cfb3-ish
export const BORDER_STRONG = rgb(0.55, 0.47, 0.35)
export const ACCENT = rgb(0.427, 0.157, 0.851) // violet-700 #6d28d9
export const ACCENT_BG = rgb(0.961, 0.929, 0.878) // #f5ede0
export const WHITE = rgb(1, 1, 1)

export function roundedRectPath(w, h, r) {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2))
  if (rr === 0) return `M 0,0 L ${w},0 L ${w},${h} L 0,${h} Z`
  return [
    `M ${rr},0`,
    `L ${w - rr},0`,
    `Q ${w},0 ${w},${rr}`,
    `L ${w},${h - rr}`,
    `Q ${w},${h} ${w - rr},${h}`,
    `L ${rr},${h}`,
    `Q 0,${h} 0,${h - rr}`,
    `L 0,${rr}`,
    `Q 0,0 ${rr},0`,
    'Z',
  ].join(' ')
}

// Wraps a pdf-lib PDFDocument + embedded font with a page/cursor and a set
// of draw helpers. All box/text coordinates are top-left anchored (y grows
// downward, matching how the content is authored) and translated to PDF's
// bottom-left/y-up space internally.
export class Sheet {
  constructor(pdfDoc, font) {
    this.pdfDoc = pdfDoc
    this.font = font
    this.page = null
    this.y = MARGIN
    this.pageCount = 0
  }

  addPage() {
    this.page = this.pdfDoc.addPage([PAGE_W, PAGE_H])
    this.pageCount += 1
    this.y = MARGIN
    return this.page
  }

  // top-left-anchored y -> pdf-lib's bottom-left-anchored y for a page of height PAGE_H
  toPdfY(topY) {
    return PAGE_H - topY
  }

  // Ensures at least `h` points remain before the bottom margin; starts a
  // fresh page (running `onNewPage(sheet)` for a repeated banner/header) if not.
  ensure(h, onNewPage) {
    if (this.y + h > PAGE_H - MARGIN) {
      this.addPage()
      if (onNewPage) onNewPage(this)
    }
  }

  widthOf(text, size) {
    return this.font.widthOfTextAtSize(String(text ?? ''), size)
  }

  // Single line of text. x/y are top-left-space; y is the line's TOP.
  text(str, x, topY, { size = 8.5, color = INK, align = 'left', maxWidth, bold = false } = {}) {
    let s = String(str ?? '')
    if (maxWidth != null && this.widthOf(s, size) > maxWidth) {
      while (s.length > 1 && this.widthOf(`${s}…`, size) > maxWidth) s = s.slice(0, -1)
      s = `${s}…`
    }
    let drawX = x
    if (align === 'center') drawX = x - this.widthOf(s, size) / 2
    else if (align === 'right') drawX = x - this.widthOf(s, size)
    const baselineY = this.toPdfY(topY) - size * 0.8
    this.page.drawText(s, { x: drawX, y: baselineY, size, font: this.font, color })
    if (bold) this.page.drawText(s, { x: drawX + 0.4, y: baselineY, size, font: this.font, color })
    return s
  }

  wrapLines(str, width, size) {
    const raw = String(str ?? '')
    if (!raw) return []
    const words = raw.split(/\s+/).filter(Boolean)
    const lines = []
    let cur = ''
    for (const w of words) {
      const trial = cur ? `${cur} ${w}` : w
      if (cur && this.widthOf(trial, size) > width) {
        lines.push(cur)
        cur = w
      } else {
        cur = trial
      }
    }
    if (cur) lines.push(cur)
    return lines
  }

  // Splits on blank-line paragraph breaks, wraps each, returns a flat array
  // of { text, isParaEnd } lines (isParaEnd adds the paragraph gap after it).
  layoutParagraphs(str, width, size) {
    const paras = String(str ?? '').split(/\n+/).map((p) => p.trim()).filter(Boolean)
    const out = []
    paras.forEach((para, i) => {
      const lines = this.wrapLines(para, width, size)
      lines.forEach((line, j) => out.push({ text: line, isParaEnd: j === lines.length - 1 && i < paras.length - 1 }))
    })
    return out
  }

  measureParagraphHeight(str, width, { size = 8.5, lineHeight = 11, paraGap = 3 } = {}) {
    const lines = this.layoutParagraphs(str, width, size)
    return lines.reduce((h, l) => h + lineHeight + (l.isParaEnd ? paraGap : 0), 0)
  }

  // Draws wrapped paragraph text starting at (x, this.y), advancing this.y as it goes.
  // Auto page-breaks per-line via `ensure`/`onNewPage` when given.
  paragraph(str, x, width, { size = 8.5, lineHeight = 11, color = INK, paraGap = 3, onNewPage } = {}) {
    const lines = this.layoutParagraphs(str, width, size)
    for (const l of lines) {
      this.ensure(lineHeight, onNewPage)
      this.text(l.text, x, this.y, { size, color })
      this.y += lineHeight + (l.isParaEnd ? paraGap : 0)
    }
  }

  box(x, topY, w, h, { radius = 6, stroke = BORDER, lineWidth = 1, fill } = {}) {
    this.page.drawSvgPath(roundedRectPath(w, h, radius), {
      x,
      y: this.toPdfY(topY),
      borderColor: stroke,
      borderWidth: lineWidth,
      color: fill,
    })
  }

  circle(cx, topCy, r, { stroke = BORDER_STRONG, lineWidth = 1.2, fill } = {}) {
    this.page.drawCircle({
      x: cx,
      y: this.toPdfY(topCy),
      size: r,
      borderColor: stroke,
      borderWidth: lineWidth,
      color: fill,
    })
  }

  line(x1, topY1, x2, topY2, { color = BORDER, width = 1, dash } = {}) {
    this.page.drawLine({
      start: { x: x1, y: this.toPdfY(topY1) },
      end: { x: x2, y: this.toPdfY(topY2) },
      thickness: width,
      color,
      dashArray: dash,
    })
  }

  // A labelled value box: small uppercase muted label above a bold value,
  // inside a rounded border — the "ARMOR CLASS" / "SPEED" style tiles.
  statTile(x, topY, w, h, label, value, { labelSize = 6.2, valueSize = 15 } = {}) {
    this.box(x, topY, w, h, { radius: 5 })
    this.text(label.toUpperCase(), x + w / 2, topY + 5, { size: labelSize, color: MUTED, align: 'center' })
    this.text(String(value ?? '—'), x + w / 2, topY + h / 2 - valueSize / 2 + 2, {
      size: valueSize,
      color: INK,
      align: 'center',
      bold: true,
    })
  }

  // A titled box: rounded border with an uppercase label sitting on the top
  // edge (the "WEAPONS & DAMAGE" / "CLASS FEATURES" style section boxes).
  // Returns the y just inside the box, below the title, ready to draw content.
  titledBox(x, topY, w, h, title) {
    this.box(x, topY, w, h, { radius: 6 })
    if (title) {
      const label = title.toUpperCase()
      const size = 7
      const tw = this.widthOf(label, size) + 8
      this.page.drawRectangle({
        x: x + 10,
        y: this.toPdfY(topY) - 3.5,
        width: tw,
        height: 7,
        color: ACCENT_BG,
      })
      this.text(label, x + 14, topY - 3.4, { size, color: ACCENT, bold: true })
    }
    return topY + (title ? 14 : 6)
  }

  // Small uppercase kicker used to open a subsection within a page (lighter
  // than a full banner() — no rule, just a label with tight spacing below).
  subheading(title, { size = 9.5 } = {}) {
    this.ensure(size + 6)
    this.text(title.toUpperCase(), MARGIN, this.y, { size, color: ACCENT, bold: true })
    this.y += size + 6
  }

  // Draws a run of differently-styled segments — [{ text, bold, color, size }]
  // — word-wrapped together as one flowing line/paragraph, the way a "Label:
  // value, value, value" stat-block line reads. Advances this.y.
  richWrap(segments, x, width, { size = 8.5, lineHeight = 11.5, onNewPage } = {}) {
    const tokens = []
    for (const seg of segments) {
      const words = String(seg.text ?? '').split(' ').filter((w) => w !== '')
      for (const w of words) {
        tokens.push({ text: `${w} `, color: seg.color ?? INK, bold: !!seg.bold, size: seg.size ?? size })
      }
    }
    let line = []
    let lineWidth = 0
    const lines = []
    for (const tok of tokens) {
      const tw = this.widthOf(tok.text, tok.size)
      if (lineWidth + tw > width && line.length > 0) {
        lines.push(line)
        line = []
        lineWidth = 0
      }
      line.push(tok)
      lineWidth += tw
    }
    if (line.length > 0) lines.push(line)
    for (const ln of lines) {
      this.ensure(lineHeight, onNewPage)
      let cx = x
      for (const tok of ln) {
        this.text(tok.text, cx, this.y, { size: tok.size, color: tok.color, bold: tok.bold })
        cx += this.widthOf(tok.text, tok.size)
      }
      this.y += lineHeight
    }
  }

  // Stamps "name · page N/M" in the bottom margin of every page — call once
  // after all content is drawn, since the total page count isn't known until then.
  addFooters(label) {
    const pages = this.pdfDoc.getPages()
    pages.forEach((p, i) => {
      p.drawText(`${label}  ·  ${i + 1}/${pages.length}`, {
        x: MARGIN,
        y: MARGIN - 16,
        size: 7,
        font: this.font,
        color: FAINT,
      })
    })
  }

  // A full-width chapter banner, echoing the example's "◄ SPELLS &
  // SPELLCASTING ►" horizontal rule-with-title used at the top of each
  // major section of the sheet.
  banner(title) {
    this.ensure(26)
    const y = this.y + 8
    this.line(MARGIN, y, PAGE_W - MARGIN, y, { color: ACCENT, width: 1.4 })
    const label = title.toUpperCase()
    const size = 12.5
    const tw = this.widthOf(label, size)
    const cx = PAGE_W / 2
    this.page.drawRectangle({
      x: cx - tw / 2 - 8,
      y: this.toPdfY(y) - 5,
      width: tw + 16,
      height: 10,
      color: WHITE,
    })
    this.text(label, cx, y - 4.5, { size, color: ACCENT, align: 'center', bold: true })
    this.y = y + 14
  }
}
