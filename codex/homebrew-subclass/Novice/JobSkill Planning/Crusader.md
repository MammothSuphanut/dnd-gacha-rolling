# Crusader — Job Skills (6 of 8, pool still open)

> Drafted from user direction (2026-08-23), formatted to match the current [Knight.md](Knight.md) convention — **flat 1 mana at every Rank, no exceptions**. Pick **2** Job Skills at level 3 and **1** more at level 6 (3 of the pool below, total, across the whole path — see [Novice-Concept.md](../Concept/Novice-Concept.md#ระบบการเลือกอัพเกรด-job-skill-pick--upgrade-schedule) for the current pick/upgrade schedule). Every Job Skill you hold auto-upgrades in Rank together at levels 9 (→R2), 13 (→R3), and 17 (→R4).
>
> 🚧 **Pool size**: Knight's pool is 8 Job Skills; this file only has the **6** the user specified so far. User said to add the remaining 2 (candidates from the ROX Crusader kit: Shield Charge, Guard, Shield Boomerang) **later** — don't invent them yet.
>
> 🚧 **Primary Ability**: not yet stated by the user for Crusader. Defaulting to **Strength** (same as [Knight.md](../Concept/Knight.md), since both fork from Swordsman and Crusader's ROX kit is STR/VIT-based, not a casting stat like Charisma) — flag for confirmation. This also sets the Job Skill save DC (`8 + Proficiency Bonus + Primary Ability modifier`) used by Grand Judgment below.
>
> Casting Time follows the current [Extra Attack rule](../Concept/Novice-Concept.md#level-progression): a Job Skill marked **Action or 1 Attack** can fill one of your Extra Attack swings instead of a normal weapon attack (can't repeat the same-named Job Skill twice in one turn).

---

### INCREASE HP RECOVERY
*Job Skill*

**Casting Time:** Action or 1 Attack
**Range:** Self
**Mana Cost:** 1
**Duration:** 1 minute

You gain **3** hit points every 6 seconds that pass or at the start of your turn.

***Job Skill Upgrade.*** The amount regenerated increases at levels 9 (**4** HP), 13 (**5** HP), and 17 (**6** HP).

> 🚧 **Balance open**: this is Knight's Increase HP Recovery (2/3/4/5) bumped by a flat **+1** per Rank (3/4/5/6), per user's "same as Knight, +1 or +2 more." Bump to **+2** instead (4/5/6/7) if +1 reads as too small a distinction — user wants to discuss before locking either way.

---

### GRAND JUDGMENT
*Job Skill*

**Casting Time:** Action
**Range:** 60 feet
**Mana Cost:** 1
**Duration:** Instantaneous

You call down holy judgment on one creature you can see within range, and on every other creature within 15 feet of it. Each of those creatures must make a Dexterity saving throw against your Job Skill save DC, taking **2d6** Radiant damage on a failure, or half as much on a success.

***Job Skill Upgrade.*** The damage increases at levels 9 (**4d6**), 13 (**6d6**), and 17 (**8d6**).

---

### CROSS RAIN
*Job Skill*

**Casting Time:** Action
**Range:** 60 feet
**Mana Cost:** 1
**Duration:** 1 minute

You designate a 15-foot square you can see within range; it becomes holy ground for the duration. Whenever a creature starts its turn there, ends its turn there, or enters it for the first time on a turn, that creature triggers this Job Skill's effect — **no more than once per creature per turn**, even if it meets more than one of those conditions on the same turn.

If the triggering creature is an **undead or a fiend**, it automatically takes **2d6** Radiant damage — no choice, no saving throw. Otherwise, you may choose whether that creature regains **2d6** hit points (your choice each time, so you aren't forced to heal an enemy standing in the field).

***Job Skill Upgrade.*** The healing/damage die increases at levels 9 (**3d6**), 13 (**4d6**), and 17 (**5d6**).

---

### ULTIMATE SACRIFICE
*Job Skill*

**Casting Time:** Bonus Action
**Range:** 30 feet
**Mana Cost:** 1
**Duration:** Instantaneous

You tear into your own vitality: you lose hit points equal to **half your current hit points**, rounded down (minimum 1). Then, choose one — a creature you can see within range (including yourself) regains that many hit points, or a creature you can see within range takes that much Radiant damage.

***Job Skill Upgrade.*** You add a flat bonus on top of the hit points paid: **+1d6** at level 9, **+2d6** at level 13, **+3d6** at level 17.

> 🚧 **Draft**: the upgrade dice are a placeholder so this Job Skill has *some* Rank scaling (its core output already scales naturally with your growing HP pool) — open to cutting them if that reads as unnecessary bloat.

---

### DEVOTION
*Job Skill*

**Casting Time:** Bonus Action
**Range:** Self (30-foot aura)
**Mana Cost:** 1
**Duration:** 1 minute

You inspire those around you to fight harder. For the duration, you gain a **+2** bonus to attack rolls. Each ally within 30 feet of you *when you use this Job Skill* gains a **+1** bonus to attack rolls for the same duration.

***Job Skill Upgrade.*** Your own bonus increases at levels 9 (**+3**), 13 (**+4**), and 17 (**+5**) — the ally bonus stays exactly **1 less than yours** at every Rank (so **+2/+3/+4** at the same levels).

---

### LIFE VOW
*Job Skill*

**Casting Time:** Action
**Range:** 60 feet
**Mana Cost:** 1
**Duration:** 1 minute, or until the Vow ends

You spend hit points equal to **10%** of your Maximum hit points, rounded down (minimum 1), to forge a Vow with one enemy creature you can see within range — dragging your fate down into theirs. No saving throw; the bond can't be resisted. For the duration: whenever **you** take damage, the vowed creature takes the same amount and type of damage, and whenever the **vowed creature** takes damage (from any source, not just you), you take the same amount and type of damage back. You can end the Vow early as a Free Action; the target cannot.

***Job Skill Upgrade.*** Starting at level 9, the damage the Vow deals back to *you* is halved, rounded down (the damage it deals to the vowed creature is never reduced).

> ⚠️ **Balance flag**: as written, this scales with the *entire party's* damage against the vowed creature, not just yours — a focus-fired target could return a lot of damage to you very fast. Worth stress-testing before this goes live; the level-9 halving is a first pass at softening it, not a confirmed fix.

---

## Open items for next pass

- 2 more Job Skills needed to reach an 8-skill pool (parity with Knight) — candidates noted above, not yet drafted.
- Increase HP Recovery: confirm +1 vs +2 per Rank over Knight's baseline.
- Ultimate Sacrifice: confirm whether the upgrade dice stay or get cut.
- Life Vow: confirm the mutual full-damage-share is intended as-is, or needs a cap/one-way version.
- Primary Ability (Strength, defaulted) needs explicit confirmation.
