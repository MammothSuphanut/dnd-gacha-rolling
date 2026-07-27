// "เท่าที่ตัวละครเลือกได้" (character-eligible) match mode for the Options
// page. Given a hypothetical character profile — class / subclass / species
// / background, each optional — decides whether an item would actually be
// pickable by that character.
//
// Two different directions of check, because the two kinds of item relate
// to a character oppositely:
//   - Spells are GRANTED: a spell counts if it's reachable through any one
//     of the profile's identity slots (class list, subclass expanded list,
//     species/background innate spells) — a union, not a strict match.
//   - Feats / class options / backgrounds are RESTRICTED via `prerequisite`:
//     an item is eligible unless everything about it is excluded by the
//     profile. We only evaluate the `race`, `background`, and (nested)
//     `class`/`subclass` conditions inside `prerequisite` — that's all a
//     4-field profile can express. Ability-score minimums, character level,
//     proficiencies, spellcasting, campaign restrictions, and free-text
//     conditions are left unchecked and never used to exclude an item, since
//     we have no data to judge them against; better to under-filter than to
//     hide something that might actually be legal.

function sameName(a, b) {
  return String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase()
}

export function isProfileEmpty(profile) {
  return !profile.className && !profile.subclassName && !profile.speciesName && !profile.backgroundName
}

export function isSpellEligibleForProfile(spell, profile) {
  if (isProfileEmpty(profile)) return true
  if (profile.className && spell.classes?.fromClassList?.some((c) => sameName(c.name, profile.className))) return true
  if (
    profile.subclassName &&
    spell.classes?.fromSubclass?.some(
      (s) => sameName(s.subclass?.name, profile.subclassName) || sameName(s.subclass?.shortName, profile.subclassName),
    )
  ) {
    return true
  }
  if (
    profile.speciesName &&
    spell.grantedBy?.species?.some((g) => sameName(g.name, profile.speciesName) || sameName(g.label, profile.speciesName))
  ) {
    return true
  }
  if (profile.backgroundName && spell.grantedBy?.background?.some((g) => sameName(g.name, profile.backgroundName))) {
    return true
  }
  return false
}

// One `prerequisite` alternative is a set of AND'd conditions; the array as
// a whole is OR'd (satisfying any one alternative is enough). A condition
// key we don't recognize never disqualifies the alternative — only a
// recognized key whose value contradicts the profile does.
function alternativeIsPossible(alt, profile) {
  if (alt.race && profile.speciesName) {
    const ok = alt.race.some((r) => sameName(r.name, profile.speciesName))
    if (!ok) return false
  }
  if (alt.background && profile.backgroundName) {
    const ok = alt.background.some((b) => sameName(b.name, profile.backgroundName))
    if (!ok) return false
  }
  if (alt.level?.class && profile.className) {
    if (!sameName(alt.level.class.name, profile.className)) return false
  }
  if (alt.level?.subclass && profile.subclassName) {
    if (!sameName(alt.level.subclass.name, profile.subclassName) && !sameName(alt.level.subclass.shortName, profile.subclassName)) {
      return false
    }
  }
  return true
}

export function isPrerequisiteEligibleForProfile(entry, profile) {
  if (isProfileEmpty(profile)) return true
  if (!Array.isArray(entry.prerequisite) || entry.prerequisite.length === 0) return true
  return entry.prerequisite.some((alt) => alternativeIsPossible(alt, profile))
}

// Dispatches by category id since spells (grant-based) and everything else
// (prerequisite-based) need opposite logic.
export function isEligibleForProfile(categoryId, entry, profile) {
  return categoryId === 'spell' ? isSpellEligibleForProfile(entry, profile) : isPrerequisiteEligibleForProfile(entry, profile)
}
