/**
 * Add Legendary Reserve — give every world NPC Legendary Actions + Legendary Resistance by Tier of Being,
 * as a DM-optional reserve (NPC-Design-system.md §3 "Legendary สำรอง").
 * For Foundry VTT v14 + D&D 5e system 5.x / 6.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *   3. A preview lists what each NPC gets. Confirm to apply.
 *
 * What it does:
 *   - Tier = flags.world.tierOfBeing (set by Set-Tier-Of-Being.macro.js), else from CR (the tier caps):
 *     CR ≤10 Mortal 3/2, ≤20 Ascendant 4/3, ≤30 Divine 5/4, ≤40 Sovereign 6/5, above that Law 7/6
 *     (Legendary Actions / Legendary Resistance). The "<Tier> Being" feature itself comes from
 *     Set-Tier-Of-Being.macro.js.
 *   - ONLY_TIERS limits the run to some tiers (e.g. ["Law"] to try it on one tier first).
 *   - RAISE_EXISTING = false: only NPCs missing LA or LR (0 on the sheet) are touched, and only the
 *     missing counter is set. NPCs that already have both are skipped entirely.
 *   - RAISE_EXISTING = true: each counter keeps the higher value: tier 4/3 on a sheet with 3/4
 *     becomes 4/4. A sheet that's higher on both (e.g. a hand-built boss) isn't touched.
 *   - Adds generic reserve items only where the sheet has none of its own:
 *     "Legendary Resistance (Reserve)" and two legendary actions, "Reserve: Strike"
 *     (one attack, once per round) and "Reserve: Shift" (move half Speed, no OAs).
 *     HP is NOT lowered: the reserve doesn't count toward CR. Use it only when a fight needs it.
 *   - Skips SKIP_FOLDERS (and their sub-folders) and Item Piles.
 *   - MODE "remove" deletes every item it added and puts each counter back to its old value.
 *   Tokens already placed on scenes as unlinked copies don't change; drag them in again.
 *   Re-running is safe: anything already at its tier value is left alone.
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const MODE = "add";                          // "add" | "remove"
  const SKIP_FOLDERS = ["Travel Pace Token"];
  const RAISE_EXISTING = true;               // false = only NPCs with no LA or no LR yet (0 on the sheet);
                                               // true = also raise counters below their tier value
  const ONLY_TIERS = [];         // [] = every tier; e.g. ["Law"] to try one tier first
  const TIERS = [                              // [name, max CR inclusive, Legendary Actions, Legendary Resistance]
    ["Mortal", 10, 3, 2],
    ["Ascendant", 20, 4, 3],
    ["Divine", 30, 5, 4],
    ["Sovereign", 40, 6, 5],
    ["Law", Infinity, 7, 6]
  ];
  const FLAG = "legendaryReserve";             // flags.world.legendaryReserve on items (and actor: which counters it set)
  const TIER_FLAG = "tierOfBeing";             // flags.world.tierOfBeing on the actor = tier name (read only)

  try {
    if ( game.system.id !== "dnd5e" ) return ui.notifications.error("This macro requires the D&D 5e system.");
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    /* ------------------------------------------------------------------ */
    /*  Helpers                                                           */
    /* ------------------------------------------------------------------ */
    const rid = () => foundry.utils.randomID();
    const esc = s => foundry.utils.escapeHTML(String(s));
    const LEGACT = { type: "attribute", target: "resources.legact.value", value: "1" };
    const LEGRES = { type: "attribute", target: "resources.legres.value", value: "1" };
    const act = (type, data = {}) => ({ _id: rid(), type, ...data });
    const feat = (name, img, desc, activities) => ({
      name,
      type: "feat",
      img,
      flags: { world: { [FLAG]: true } },
      system: {
        type: { value: "monster", subtype: "" },
        description: { value: desc },
        activities: Object.fromEntries(activities.map((a, i) => [a._id, { sort: (i + 1) * 100000, ...a }]))
      }
    });

    const skipIds = new Set();
    for ( const f of game.folders.filter(f => (f.type === "Actor") && SKIP_FOLDERS.includes(f.name)) ) {
      skipIds.add(f.id);
      for ( const sub of f.getSubfolders(true) ) skipIds.add(sub.id);
    }
    const isPile = a => !!a.getFlag("item-piles", "data")?.enabled;
    const npcs = game.actors.filter(a => (a.type === "npc") && !skipIds.has(a.folder?.id) && !isPile(a));

    const tierOf = a => TIERS.find(t => t[0] === a.getFlag("world", TIER_FLAG))
      ?? TIERS.find(t => (a.system.details?.cr ?? 0) <= t[1]);
    const hasLegendaryItem = a => a.items.some(i => !!i.system.activities?.some?.(x => x.activation?.type === "legendary"));
    const hasResistItem = a => a.items.some(i => /legendary resistance/i.test(i.name));
    const hasReserve = a => !!a.getFlag("world", FLAG) || a.items.some(i => i.getFlag("world", FLAG));
    // Old value of a counter before this macro raised it (older runs stored `true` = was 0).
    const prevMax = v => (v === true ? 0 : v);

    /* ------------------------------------------------------------------ */
    /*  Remove                                                            */
    /* ------------------------------------------------------------------ */
    if ( MODE === "remove" ) {
      const targets = npcs.filter(hasReserve);
      const ok = await foundry.applications.api.DialogV2.confirm({
        window: { title: "Remove Legendary Reserve" },
        content: `<p>Remove the reserve items from <strong>${targets.length}</strong> NPCs?</p>`
      });
      if ( !ok ) return;
      for ( const a of targets ) {
        const set = a.getFlag("world", FLAG) ?? {};
        const update = {};
        if ( prevMax(set.legact) != null ) update["system.resources.legact.max"] = prevMax(set.legact);
        if ( prevMax(set.legres) != null ) update["system.resources.legres.max"] = prevMax(set.legres);
        await a.deleteEmbeddedDocuments("Item", a.items.filter(i => i.getFlag("world", FLAG)).map(i => i.id));
        await a.update(update);
        await a.unsetFlag("world", FLAG);
      }
      return ui.notifications.info(`Legendary Reserve removed from ${targets.length} NPCs.`);
    }

    /* ------------------------------------------------------------------ */
    /*  Plan                                                              */
    /* ------------------------------------------------------------------ */
    const plans = [];
    for ( const a of npcs.sort((x, y) => x.name.localeCompare(y.name)) ) {
      const cr = a.system.details?.cr;
      const [tier, , la, lr] = tierOf(a);
      if ( ONLY_TIERS.length && !ONLY_TIERS.includes(tier) ) continue;
      const res = a.system.resources ?? {};
      const curLA = res.legact?.max ?? 0;
      const curLR = res.legres?.max ?? 0;
      if ( !RAISE_EXISTING && curLA && curLR ) continue;   // already has both: leave the whole NPC for a later run
      const raiseLA = RAISE_EXISTING ? curLA < la : !curLA; // keep the higher of sheet vs tier
      const raiseLR = RAISE_EXISTING ? curLR < lr : !curLR;
      const addLA = !curLA && !hasLegendaryItem(a);        // reserve items only where the sheet has none
      const addLR = !curLR && !hasResistItem(a);
      if ( raiseLA || raiseLR ) plans.push({ a, cr, tier, la, lr, curLA, curLR, raiseLA, raiseLR, addLA, addLR });
    }
    if ( !plans.length ) return ui.notifications.info("Every NPC already has its Legendary Actions and Resistance.");

    const cell = (raise, cur, val) => (!raise ? "—" : cur ? `${cur} → <strong>${val}</strong>` : val);
    const row = p => `<tr><td>${esc(p.a.name)}</td><td>${p.cr ?? "—"}</td><td>${p.tier}</td>`
      + `<td>${cell(p.raiseLA, p.curLA, p.la)}</td><td>${cell(p.raiseLR, p.curLR, p.lr)}</td></tr>`;
    const ok = await foundry.applications.api.DialogV2.confirm({
      window: { title: "Add Legendary Reserve" },
      position: { width: 620 },
      content: `
        <p><strong>${plans.length}</strong> NPCs${ONLY_TIERS.length ? ` (${ONLY_TIERS.join(", ")} only)` : ""} get more Legendary uses.
        "—" = already as high as its tier, left alone; "3 → <strong>4</strong>" = raised to the tier value, its own items kept.</p>
        <div style="max-height:50vh;overflow:auto"><table>
          <tr><th>NPC</th><th>CR</th><th>Tier</th><th>Leg. Actions</th><th>Leg. Resist</th></tr>
          ${plans.map(row).join("")}
        </table></div>`
    });
    if ( !ok ) return;

    /* ------------------------------------------------------------------ */
    /*  Apply                                                             */
    /* ------------------------------------------------------------------ */
    const note = "<p><em>Reserve (DM option):</em> not counted in this creature's CR. Use it only when the fight needs more push, "
      + "e.g. a smaller encounter, a big party, or players who think this one is a pushover.</p>";
    for ( const p of plans ) {
      const items = [];
      if ( p.addLR ) items.push(feat(`Legendary Resistance (${p.lr}/Day, Reserve)`, "icons/magic/symbols/star-solid-gold.webp",
        `<p>If ${esc(p.a.name)} fails a saving throw, it can choose to succeed instead. In its lair it has ${p.lr + 1} uses.</p>${note}`,
        [act("utility", {
          activation: { type: "special", value: null, override: false, condition: "fails a saving throw" },
          consumption: { spellSlot: true, targets: [LEGRES] }
        })]));
      if ( p.addLA ) items.push(
        feat("Reserve: Strike", "icons/skills/melee/strike-sword-slashing-red.webp",
          `<p>${esc(p.a.name)} makes one attack it could make with its Attack or Multiattack action. Only once per round.</p>${note}`,
          [act("utility", {
            activation: { type: "legendary", value: 1, override: false, condition: "Once per round" },
            consumption: { spellSlot: true, targets: [LEGACT] }
          })]),
        feat("Reserve: Shift", "icons/magic/movement/trail-streak-zigzag-yellow.webp",
          `<p>${esc(p.a.name)} moves up to half its Speed without provoking Opportunity Attacks.</p>${note}`,
          [act("utility", {
            activation: { type: "legendary", value: 1, override: false, condition: "" },
            consumption: { spellSlot: true, targets: [LEGACT] }
          })]));
      if ( items.length ) await p.a.createEmbeddedDocuments("Item", items);
      // Remember each counter's first old value so MODE "remove" can put it back.
      const set = { ...(p.a.getFlag("world", FLAG) ?? {}) };
      const update = {};
      if ( p.raiseLA ) {
        set.legact ??= p.curLA;
        Object.assign(update, { "system.resources.legact.max": p.la, "system.resources.legact.spent": 0 });
      }
      if ( p.raiseLR ) {
        set.legres ??= p.curLR;
        Object.assign(update, { "system.resources.legres.max": p.lr, "system.resources.legres.spent": 0 });
      }
      update[`flags.world.${FLAG}`] = set;
      await p.a.update(update);
    }
    ui.notifications.info(`Legendary Reserve added to ${plans.length} NPCs.`);
  } catch ( err ) {
    console.error(err);
    ui.notifications.error(`Add Legendary Reserve failed: ${err.message}`);
  }
})();
