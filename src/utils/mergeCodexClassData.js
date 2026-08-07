// Joins the two datasets the old Codex landing page rendered as separate
// documents — codex/General/class-subclass-index.md (every class/subclass,
// no tier info) and codex/General/00-sub-class-overview-tier-list-2024.md
// (every *ranked* 2024 subclass, grouped by tier, no edition/book info) —
// into one flat dataset keyed by (class, subclass name). CodexClassBrowser
// reads the result and can group/sort it either way (by class or by tier)
// from a single table instead of two separate pages.
//
// Both source .md files keep being generated exactly as before (see
// character-builder/scripts/generate-*.cjs) — nothing here writes back to
// them, this only runs client-side against their already-parsed shape
// (parseClassSubclassIndex / parseSubclassTierOverview).
//
// Match key is case-insensitive/trimmed subclass name scoped to its class,
// since a subclass with no 2024 tier write-up yet (or a class outside the
// 28 with a tier-list file, e.g. Aura Knight / sidekicks) simply won't have
// a match — that's expected, not an error, and surfaces as tier: null.
function matchKey(className, subclassName) {
  return `${className.trim().toLowerCase()}::${subclassName.trim().toLowerCase()}`
}

export function mergeCodexClassData(indexResult, tierOverviewResult) {
  const tierByKey = new Map()
  for (const group of tierOverviewResult.groups) {
    for (const row of group.rows) {
      tierByKey.set(matchKey(row.className, row.name), {
        tier: group.tier,
        note: row.note,
        // The tier-overview's own Class column already links to the
        // per-class *-subclass-tier-list-2024.md doc (full write-up) —
        // reuse it verbatim as the "class analysis" link everywhere below.
        analysisLink: row.classLink,
      })
    }
  }

  return indexResult.classes.map((c) => {
    const subclasses = c.subclasses.map((s) => {
      const tierInfo = tierByKey.get(matchKey(c.name, s.name)) ?? null
      return {
        ...s,
        tier: tierInfo?.tier ?? null,
        note: tierInfo?.note ?? '',
        analysisLink: tierInfo?.analysisLink ?? null,
      }
    })
    // Every subclass under a class shares the same per-class analysis doc,
    // so the first hit (if any) also serves as the class-level link.
    const analysisLink = subclasses.find((s) => s.analysisLink)?.analysisLink ?? null
    return { ...c, subclasses, analysisLink }
  })
}
