/**
 * Set Tier of Being — give every PC and NPC a "<Tier> Being" feature with the current Tier Gap rule
 * (+5 per tier of difference on d20 Tests and AC, cosmology-and-tier-of-being.md "Tier Gap").
 * For Foundry VTT v14 + D&D 5e system 5.x / 6.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *   3. A preview lists what each actor gets. Confirm to apply.
 *
 * What it does:
 *   - Tier = the actor's existing tier (its "<Tier> Being" feature, then "Tier of Being: <Tier>" in any
 *     feature's description, then flags.world.tierOfBeing). With none, it comes from the level/CR cap:
 *     PC level / NPC CR ≤10 Mortal, ≤20 Ascendant, ≤30 Divine, ≤40 Sovereign, above that Law.
 *     To change someone's tier later, rename their feature (e.g. "Ascendant Being") and run this again.
 *   - No tier feature yet: adds "<Tier> Being".
 *   - Feature made by a macro (this one or Add-Legendary-Reserve): rewrites its whole text.
 *   - Hand-written feature (Isus, Buyer, Smugmug, ...): only its "Tier Gap:" paragraph is replaced,
 *     the rest of the text (Definition etc.) is kept.
 *   - Stores the tier in flags.world.tierOfBeing.
 *   - Skips SKIP_FOLDERS (and their sub-folders) and Item Piles.
 *   The +5 itself is added by the Mammoth Tweaks module ("Tier of Being: add Tier Gap bonus automatically").
 *   Tokens already placed on scenes as unlinked copies don't change; drag them in again.
 *   Re-running is safe: actors already up to date are skipped.
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const SKIP_FOLDERS = ["Travel Pace Token"];
  const ACTOR_TYPES = ["character", "npc"];
  const TIERS = [                              // [name, max level/CR inclusive, stage]
    ["Mortal", 10, "Void"],
    ["Ascendant", 20, "Premise"],
    ["Divine", 30, "Definition"],
    ["Sovereign", 40, "Name"],
    ["Law", Infinity, "Genesis"]
  ];
  const FLAG = "tierTrait";                    // flags.world.tierTrait on items this macro wrote
  const RESERVE_FLAG = "legendaryReserve";     // tier items made by Add-Legendary-Reserve
  const TIER_FLAG = "tierOfBeing";

  try {
    if ( game.system.id !== "dnd5e" ) return ui.notifications.error("This macro requires the D&D 5e system.");
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    /* ------------------------------------------------------------------ */
    /*  Helpers                                                           */
    /* ------------------------------------------------------------------ */
    const esc = s => foundry.utils.escapeHTML(String(s));
    const names = TIERS.map(t => t[0]);
    const NAME_RE = new RegExp(`^(${names.join("|")}) Being$`, "i");
    const DESC_RE = new RegExp(`Tier of Being:\\s*(${names.join("|")})`, "i");
    const GAP_RE = /<p><em>Tier Gap:<\/em>[\s\S]*?<\/p>/i;
    const norm = s => names.find(n => n.toLowerCase() === s?.toLowerCase());

    const skipIds = new Set();
    for ( const f of game.folders.filter(f => (f.type === "Actor") && SKIP_FOLDERS.includes(f.name)) ) {
      skipIds.add(f.id);
      for ( const sub of f.getSubfolders(true) ) skipIds.add(sub.id);
    }
    const isPile = a => !!a.getFlag("item-piles", "data")?.enabled;
    const actors = game.actors.filter(a => ACTOR_TYPES.includes(a.type) && !skipIds.has(a.folder?.id) && !isPile(a));

    const tierItem = a => a.items.find(i => NAME_RE.test(i.name))
      ?? a.items.find(i => DESC_RE.test(i.system.description?.value ?? ""));
    const isMacroItem = i => !!(i.getFlag("world", FLAG) || i.getFlag("world", RESERVE_FLAG));
    const capTier = a => {
      const n = a.type === "character" ? (a.system.details?.level ?? 0) : (a.system.details?.cr ?? 0);
      return TIERS.find(t => n <= t[1])[0];
    };
    const tierOf = a => {
      const item = tierItem(a);
      return norm(item?.name.match(NAME_RE)?.[1])
        ?? norm(item?.system.description?.value?.match(DESC_RE)?.[1])
        ?? norm(a.getFlag("world", TIER_FLAG))
        ?? capTier(a);
    };

    const gapText = (name, tier) => {
      const i = names.indexOf(tier);
      if ( i === 0 ) return `<p><em>Tier Gap:</em> Mortal is the lowest tier. A creature above ${name} gains +5 per tier of difference `
        + `to every d20 Test that involves ${name} and +5 AC per tier against ${name}'s attacks `
        + `(Ascendant +5, Divine +10, Sovereign +15, Law +20). ${name}'s other rolls are unchanged.</p>`;
      const below = names.slice(0, i).reverse().map((n, k) => `${n} +${(k + 1) * 5}`).join(", ");
      return `<p><em>Tier Gap:</em> For each tier ${name} is above another creature, it gains +5 to every d20 Test that involves `
        + `that creature (its attack rolls against it, its saving throws against its effects, and contested checks with it) `
        + `and +5 AC against that creature's attacks (${below}). The lower creature's other rolls are unchanged.</p>`;
    };
    const fullText = (name, tier) => {
      const stage = TIERS.find(t => t[0] === tier)[2];
      const nature = {
        Mortal: `${name}'s body and soul are still separate.`,
        Ascendant: `${name}'s body and soul are fused into a single will. It doesn't age and can't die of old age.`,
        Divine: `${name} exists through its own Definition, not its body. It doesn't age and can't die of old age.`,
        Sovereign: `${name} bears a Name and is limitless within it. It doesn't age and can't die of old age.`,
        Law: `${name} is a law of the world itself. It doesn't age and can't die of old age.`
      }[tier];
      const todo = { Divine: "Domain", Sovereign: "Name + Signature Move", Law: "Global Passive" }[tier];
      return `<p><strong>Tier of Being: ${tier} (${stage}).</strong> ${nature}</p>${gapText(name, tier)}`
        + (todo ? `<p><em>DM:</em> this tier also has a ${todo} (NPC-Design-system.md §3). Not designed yet.</p>` : "");
    };

    /* ------------------------------------------------------------------ */
    /*  Plan                                                              */
    /* ------------------------------------------------------------------ */
    const plans = [];
    for ( const a of actors.sort((x, y) => x.type.localeCompare(y.type) || x.name.localeCompare(y.name)) ) {
      const tier = tierOf(a);
      const name = esc(a.name);
      const item = tierItem(a);
      const desc = item?.system.description?.value ?? "";
      let action, newDesc;
      if ( !item ) [action, newDesc] = ["add", fullText(name, tier)];
      else if ( isMacroItem(item) ) [action, newDesc] = ["rewrite", fullText(name, tier)];
      else if ( GAP_RE.test(desc) ) [action, newDesc] = ["gap only", desc.replace(GAP_RE, gapText(name, tier))];
      else [action, newDesc] = ["gap added", desc + gapText(name, tier)];
      const sameText = item && (newDesc === desc) && (item.name === `${tier} Being` || !isMacroItem(item));
      if ( sameText && (a.getFlag("world", TIER_FLAG) === tier) && (!item || !item.getFlag("world", RESERVE_FLAG)) ) continue;
      plans.push({ a, tier, item, action, newDesc });
    }
    if ( !plans.length ) return ui.notifications.info("Every PC and NPC already has an up-to-date Tier of Being feature.");

    const count = t => plans.filter(p => p.tier === t).length;
    const row = p => `<tr><td>${esc(p.a.name)}</td><td>${p.a.type === "character" ? "PC" : "NPC"}</td>`
      + `<td>${p.tier}</td><td>${p.action}</td></tr>`;
    const ok = await foundry.applications.api.DialogV2.confirm({
      window: { title: "Set Tier of Being" },
      position: { width: 620 },
      content: `
        <p><strong>${plans.length}</strong> actors: ${names.filter(count).map(t => `${t} ${count(t)}`).join(" · ")}</p>
        <p>add = new feature · rewrite = macro-made text replaced · gap only = hand-written text kept, Tier Gap paragraph replaced</p>
        <div style="max-height:50vh;overflow:auto"><table>
          <tr><th>Actor</th><th>Type</th><th>Tier</th><th>Change</th></tr>
          ${plans.map(row).join("")}
        </table></div>`
    });
    if ( !ok ) return;

    /* ------------------------------------------------------------------ */
    /*  Apply                                                             */
    /* ------------------------------------------------------------------ */
    for ( const p of plans ) {
      if ( p.action === "add" ) {
        await p.a.createEmbeddedDocuments("Item", [{
          name: `${p.tier} Being`,
          type: "feat",
          img: "icons/magic/symbols/star-solid-gold.webp",
          flags: { world: { [FLAG]: true } },
          system: {
            type: { value: p.a.type === "character" ? "" : "monster", subtype: "" },
            description: { value: p.newDesc }
          }
        }]);
      } else {
        const update = { "system.description.value": p.newDesc };
        if ( isMacroItem(p.item) ) Object.assign(update, { name: `${p.tier} Being`, [`flags.world.${FLAG}`]: true });
        await p.item.update(update);
        // So removing the Legendary Reserve later keeps the tier feature
        if ( p.item.getFlag("world", RESERVE_FLAG) ) await p.item.unsetFlag("world", RESERVE_FLAG);
      }
      await p.a.setFlag("world", TIER_FLAG, p.tier);
    }
    ui.notifications.info(`Tier of Being set on ${plans.length} actors.`);
  } catch ( err ) {
    console.error(err);
    ui.notifications.error(`Set Tier of Being failed: ${err.message}`);
  }
})();
