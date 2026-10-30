/**
 * Remove Duplicate Creatures — clean out the unused duplicate actors in the "Creatures" folder.
 * For Foundry VTT v14 + D&D 5e system 5.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *
 * The list below came from a scan of the world DB on 2026-10-28: each actor is a same-name copy
 * of another creature where the OTHER copy is the one the journals / scenes link to.
 *   MM   = 2014 Monster Manual copy, the 2024 (XMM) copy is the one in use
 *   WDMM = exact duplicate of a Waterdeep creature, the other copy is linked
 *
 * Before touching anything it re-checks every actor (scene tokens, combats, journals, tables,
 * macros, other actors/items, settings) and skips any that has become used since the scan.
 * You pick "Move to folder" (safe, check then delete the folder yourself) or "Delete".
 */
(async () => {
  const TRASH_FOLDER = "🗑 Duplicate Creatures";
  const CANDIDATES = [
    ["qnARodxYdN4OpKu8", "Adult Bronze Dragon", "MM"],
    ["n4NatMcSLEaEdDqg", "Animated Armor", "MM"],
    ["ilq95yNRnw3MaEMc", "Animated Ballista", "WDMM"],
    ["cu5MmvgBYVWFOriu", "Animated Staff", "WDMM"],
    ["qlRMhJhRE1TpjqG7", "Awakened Brown Bear", "WDMM"],
    ["1FkOau3k8YDPphWD", "Awakened Elk", "WDMM"],
    ["QWQIY0vqkWtLaCpY", "Barbed Devil", "MM"],
    ["rMQunltgQeq41YNI", "Black Bear", "MM"],
    ["5ii7VBIRT0XrGCbL", "Brown Bear", "MM"],
    ["pLQUWw9tlLUaRXy2", "Bulette", "MM"],
    ["MC0XrvTqyG7iu3ho", "Clay Golem", "MM"],
    ["BYGcfqSioHvHQFhy", "Cloud Giant", "MM"],
    ["gOQFlSzT2Qv6i1bS", "Efreeti", "MM"],
    ["bWeJJZMkD59BRdHP", "Fomorian", "MM"],
    ["B74yRxNxrmQXV07N", "Gelatinous Cube", "MM"],
    ["GlHFx3uRkBy89IyC", "Giant Badger", "MM"],
    ["GgDtjzUwpDRoFmIv", "Giant Flying Spider", "WDMM"],
    ["Mv24ANQWKEWLruCa", "Giant Rat", "MM"],
    ["ylXTquMP8eUjnwH7", "Giant Wasp", "MM"],
    ["RkWydr2HdqAClc8P", "Hell Hound", "MM"],
    ["e5bmFTuoujmgfoqt", "Hezrou", "MM"],
    ["NaQnoFMLejABTomC", "Left Hand of Manshoon", "WDMM"],
    ["2hbWfv1DprZ1nZsH", "Marilith", "MM"],
    ["QoFzHpMZZjNmHBXq", "Mastiff", "MM"],
    ["KjMcLHVDNyI0xtYO", "Mule", "MM"],
    ["YLE02p4iWYBqV66b", "Myconid Sprout", "MM"],
    ["hKdksKlGqHKgjLe8", "Nalfeshnee", "MM"],
    ["Exs1jMIUM6sZyCNs", "Ochre Jelly", "MM"],
    ["C3NB48Qg8oAGmBYP", "Phase Spider", "MM"],
    ["ADwgnH6X2PjPsYMF", "Play-by-Play Generator", "WDMM"],
    ["NbxlBeLOLyFaAys8", "Polar Bear", "MM"],
    ["ocZn3NypwwbP0yG9", "Slaad Tadpole", "MM"],
    ["H6uk7zjCv6bgrpno", "Stirge", "MM"],
    ["lidpOFgRLY9HxQth", "Swarm of Insects", "MM"],
    ["SnrmL33xzUD30qsu", "Swarm of Rats", "MM"],
    ["pH7xf5FQmdhqqaIT", "Vrock", "MM"],
    ["qINc8BjpNcZW0ZyX", "Water Weird", "MM"],
    ["gSlDWqqJZJ3Be4Xa", "Wight", "MM"],
    ["GOLvQnNNsFNbMOL5", "Worg", "MM"],
    ["nRJ8c5REt90kv377", "Yuan-ti Abomination", "MM"],
  ];

  try {
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    /* ------------------------------------------------------------------ */
    /*  Gather every place an actor id can be referenced                   */
    /* ------------------------------------------------------------------ */
    const sceneTokenIds = new Set();
    for ( const s of game.scenes ) for ( const t of s.tokens ) if ( t.actorId ) sceneTokenIds.add(t.actorId);
    for ( const c of game.combats ) for ( const cb of c.combatants ) if ( cb.actorId ) sceneTokenIds.add(cb.actorId);

    const texts = [];
    for ( const coll of [game.journal, game.tables, game.macros, game.items, game.cards, game.playlists] ) {
      for ( const d of coll ) texts.push(JSON.stringify(d.toObject()));
    }
    for ( const a of game.actors ) texts.push([a.id, JSON.stringify(a.toObject())]);
    for ( const s of game.settings.storage.get("world") ?? [] ) texts.push(JSON.stringify(s.toObject?.() ?? s));
    for ( const u of game.users ) if ( u.character ) sceneTokenIds.add(u.character.id);

    const isUsed = id => {
      if ( sceneTokenIds.has(id) ) return true;
      return texts.some(t => Array.isArray(t) ? (t[0] !== id && t[1].includes(id)) : t.includes(id));
    };

    /* ------------------------------------------------------------------ */
    /*  Re-check the list                                                  */
    /* ------------------------------------------------------------------ */
    const ready = [], skipped = [];
    for ( const [id, name, ed] of CANDIDATES ) {
      const a = game.actors.get(id);
      if ( !a ) continue;                                   // already gone
      if ( isUsed(id) ) skipped.push(`${name} (${ed})`);
      else ready.push({ a, name, ed });
    }
    if ( !ready.length ) {
      return ui.notifications.info(`Nothing to clean up.${skipped.length ? ` Skipped (now in use): ${skipped.join(", ")}` : ""}`);
    }

    const rows = ready.map(r => `<li>${r.name} <small>(${r.ed})</small></li>`).join("");
    const skipNote = skipped.length ? `<p><b>Skipped, now in use:</b> ${skipped.join(", ")}</p>` : "";
    const choice = await foundry.applications.api.DialogV2.wait({
      window: { title: "Remove Duplicate Creatures" },
      content: `<p>${ready.length} unused duplicate actors:</p><ul style="max-height:300px;overflow:auto">${rows}</ul>${skipNote}`,
      buttons: [
        { action: "move", label: `Move to "${TRASH_FOLDER}"`, default: true },
        { action: "delete", label: "Delete" },
        { action: "cancel", label: "Cancel" }
      ]
    });

    if ( choice === "move" ) {
      let folder = game.folders.find(f => (f.type === "Actor") && (f.name === TRASH_FOLDER) && !f.folder);
      folder ??= await Folder.create({ name: TRASH_FOLDER, type: "Actor", color: "#7a1f1f" });
      await Actor.updateDocuments(ready.map(r => ({ _id: r.a.id, folder: folder.id })));
      ui.notifications.info(`Moved ${ready.length} actors to "${TRASH_FOLDER}".`);
    } else if ( choice === "delete" ) {
      await Actor.deleteDocuments(ready.map(r => r.a.id));
      ui.notifications.info(`Deleted ${ready.length} duplicate actors.`);
    }
  } catch ( err ) {
    console.error(err);
    ui.notifications.error(`Remove Duplicate Creatures failed: ${err.message}`);
  }
})();
