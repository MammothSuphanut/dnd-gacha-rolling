// Strips a "### Name" / "## Name" heading down to the bare subclass name so
// it can be matched against class-subclass-index.md's canonical name.
// Shared by parseSubclassScorecard.js (the old whole-career tier system) and
// parseSubclassLevelOverlay.js (the level-indexed system) — both read
// headings decorated the same three ways, applied in a loop since either
// can re-expose the other (e.g. "Name (Source) — blurb" needs the blurb
// gone before the parenthetical becomes trailing):
//  - a trailing "— role/flavor blurb" (e.g. Alchemist's file)
//  - one or more trailing "(Source [icons])" parentheticals — usually just
//    one, but Grim Hollow's "Plague Doctor (Wizard) (GrimHollowPG24)" needs
//    a second pass to disambiguate from another class's own Plague Doctor.
//    Paren-stripping runs before blurb-stripping each pass: several Captain
//    subclasses (borrowed from Vagabond) put their own "— " inside the
//    parenthetical itself, e.g. "Gourmand (ValdaSpire24Extras, ยืมจาก
//    Vagabond — Quick Snack ...)" — blurb-stripping first would truncate
//    mid-parenthetical and leave a dangling "(".
//  - a trailing standalone emoji marker, either with no parens at all
//    (Sacred Knight's old-system "### Throne of Doom and Slaughter 🗡️"
//    Path-prerequisite flags) or trailing the parenthetical instead of
//    living inside it (the level-indexed system's own convention, e.g.
//    Wizard's "## School of Conjuration (PHB) 🕰️" — the old system instead
//    writes the same marker as "(PHB 🕰️)", inside the parens)
const PAREN_SUFFIX_RE = /\s*\([^)]*\)\s*$/
// Covers the main emoji planes plus the variation-selector-16 and ZWJ
// codepoints emoji sequences use.
const EMOJI_SUFFIX_RE = /(?:[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}][\u{FE0F}\u{200D}]?)+\s*$/u

export function stripHeadingDecoration(raw) {
  let name = raw.trim()
  let prev
  do {
    prev = name
    name = name.replace(PAREN_SUFFIX_RE, '').trim()
    name = name.replace(/\s+—.*$/, '').trim()
    name = name.replace(EMOJI_SUFFIX_RE, '').trim()
  } while (name !== prev)
  return name
}
