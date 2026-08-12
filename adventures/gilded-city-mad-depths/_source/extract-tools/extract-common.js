// Reusable HTML->plaintext extraction helpers for pulling content out of the
// FoundryVTT JournalEntry JSON dumps in adventures/gilded-city-mad-depths/_source/.
//
// Usage pattern (run from a scratchpad working directory via `node`):
//
//   const fs = require('fs');
//   const { clean, headingIndex, imageIndex } = require('D:/dnd-gacha-rolling/adventures/gilded-city-mad-depths/_source/extract-tools/extract-common.js');
//
//   const wdmm = JSON.parse(fs.readFileSync('D:/dnd-gacha-rolling/adventures/gilded-city-mad-depths/_source/waterdeep-dungeon-of-the-mad-mage.json', 'utf8'));
//   const page = wdmm.pages.find(p => p.name === 'Level 4: Twisted Caverns');
//   const html = page.text.content;
//   fs.writeFileSync('l4_wdmm_raw.html', html);
//   fs.writeFileSync('l4_wdmm_headings.json', JSON.stringify(headingIndex(html), null, 1));
//   fs.writeFileSync('l4_wdmm_images.json', JSON.stringify(imageIndex(html), null, 1));
//
// Then slice the raw HTML by heading offsets (see slice_l3.js / slice_skullport_wdmm.js
// in prior sessions' scratchpad history for the slicing pattern — find two heading
// offsets via headingIndex, html.slice(startOffset, endOffset), then clean() the chunk)
// and Read the resulting .txt files chunk by chunk before writing the EP markdown.
//
// Source page name reference (WDMM = official book, WDMMC = fan Companion):
//   WDMM  pages: 'Level 1: Dungeon Level' ... 'Level 23: Mad Wizard's Lair', 'Skullport',
//                'App. A: Dungeon Denizens', 'App. B: Elder Runes Deck', 'App. C: Secrets Deck',
//                'App. D: Dungeon Key'
//   WDMMC pages: 'Level I: The Dungeon Level' ... 'Level XXIII: Mad Wizard's Lair', 'Skullport',
//                'Halaster's Game' (ch. 2), 'App. A: Magic Items', 'App. B: Bestiary', 'App. C: Effects'
//   (WDMM uses Arabic numerals, WDMMC uses Roman numerals for level names — match by content/position,
//   not string equality, when iterating levels programmatically.)

const fs = require('fs');

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&lsquo;/g, '\u2018')
    .replace(/&rdquo;/g, '\u201d')
    .replace(/&ldquo;/g, '\u201c')
    .replace(/&mdash;/g, '\u2014')
    .replace(/&ndash;/g, '\u2013')
    .replace(/&hellip;/g, '\u2026');
}

function clean(html) {
  let s = html;
  // tables
  s = s.replace(/<table[^>]*>/gi, '\n[TABLE START]\n');
  s = s.replace(/<\/table>/gi, '\n[TABLE END]\n');
  s = s.replace(/<tr[^>]*>/gi, '\n[ROW]');
  s = s.replace(/<\/tr>/gi, '');
  s = s.replace(/<t[dh][^>]*>/gi, '|');
  s = s.replace(/<\/t[dh]>/gi, '');
  // headings
  s = s.replace(/<h1[^>]*>/gi, '\n# ');
  s = s.replace(/<\/h1>/gi, '\n');
  s = s.replace(/<h2[^>]*>/gi, '\n## ');
  s = s.replace(/<\/h2>/gi, '\n');
  s = s.replace(/<h3[^>]*>/gi, '\n### ');
  s = s.replace(/<\/h3>/gi, '\n');
  s = s.replace(/<h4[^>]*>/gi, '\n#### ');
  s = s.replace(/<\/h4>/gi, '\n');
  // lists
  s = s.replace(/<li[^>]*>/gi, '\n- ');
  s = s.replace(/<\/li>/gi, '');
  s = s.replace(/<\/?[uo]l[^>]*>/gi, '\n');
  // paragraphs / breaks
  s = s.replace(/<p[^>]*>/gi, '\n');
  s = s.replace(/<\/p>/gi, '\n');
  s = s.replace(/<br\s*\/?>/gi, '\n');
  // bold/italic
  s = s.replace(/<\/?(strong|b)[^>]*>/gi, '**');
  s = s.replace(/<\/?(em|i)[^>]*>/gi, '*');
  // images
  s = s.replace(/<img[^>]*>/gi, '[IMG]');
  // strip remaining tags
  s = s.replace(/<[^>]+>/g, '');
  s = decodeEntities(s);
  // collapse whitespace
  s = s.replace(/[ \t]+/g, ' ');
  s = s.replace(/\n{3,}/g, '\n\n');
  s = s.split('\n').map(l => l.trim()).join('\n');
  s = s.replace(/\n{3,}/g, '\n\n');
  return s.trim();
}

function headingIndex(html) {
  const re = /<h([1-4])[^>]*>(.*?)<\/h\1>/gis;
  const out = [];
  let m;
  while ((m = re.exec(html))) {
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    out.push({ level: +m[1], text, offset: m.index });
  }
  return out;
}

function imageIndex(html) {
  const re = /<img[^>]*>/gi;
  const out = [];
  let m;
  while ((m = re.exec(html))) {
    const tag = m[0];
    const src = (tag.match(/src="([^"]*)"/) || [])[1] || '';
    const alt = (tag.match(/alt="([^"]*)"/) || [])[1] || '';
    const title = (tag.match(/title="([^"]*)"/) || [])[1] || '';
    out.push({ offset: m.index, src, alt, title });
  }
  return out;
}

module.exports = { clean, headingIndex, imageIndex, decodeEntities };
