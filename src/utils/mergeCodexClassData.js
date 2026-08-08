// Normalizes codex/General/class-subclass-index.md (every class/subclass, no
// tier info — parseClassSubclassIndex.js) into the shape CodexClassBrowser
// renders, with tier/note/analysisLink/axes placeholders that
// CodexClassBrowser fills in per class from that class's own
// *-subclass-scorecard-2024.md (parseSubclassScorecard.js) when one exists.
//
// Used to also merge in a second, separately-generated cross-class rollup
// doc (codex/General/00-sub-class-overview-tier-list-2024.md) for tier data —
// that doc was deleted in the 2026-08-07 scoring methodology rework and
// never regenerated (see 00-scorecard-methodology.md § การเขียน Overall
// Tier); tier now lives inline in each class's own scorecard file instead,
// so there's nothing left to merge here. Kept as its own module (rather than
// inlined into CodexClassBrowser) in case a second source ever needs
// merging back in.
export function mergeCodexClassData(indexResult) {
  return indexResult.classes.map((c) => ({
    ...c,
    subclasses: c.subclasses.map((s) => ({ ...s, tier: null, note: '', analysisLink: null })),
    analysisLink: null,
  }))
}
