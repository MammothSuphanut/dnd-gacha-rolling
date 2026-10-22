/**
 * Find Unused NPCs — report which NPC sheets are referenced anywhere in the world, and which aren't.
 * For Foundry VTT v14 + D&D 5e system 5.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *
 * An NPC counts as "used" if its id shows up in any of:
 *   - Scenes        (a token of it is placed on a map)
 *   - Combats       (it's a combatant in a saved encounter)
 *   - Journals      (@UUID / content links, embedded actor links)
 *   - Roll Tables   (a result points at it)
 *   - Macros        (the code references its id/UUID)
 *   - Other actors / items (e.g. a Summon activity profile, like Isus → Shadow Revenant)
 * "Mentioned only" = no id reference, but its name appears in a journal or macro text.
 * "Unused" = nothing at all.
 *
 * The report lets you tick NPCs and move them into an UNUSED_FOLDER. Nothing is ever deleted.
 *
 * Not checked: compendiums, Adventure documents, and anything that only lives in your session notes.
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const SCOPE_FOLDER = null;           // null = every NPC; or a top-level folder name, e.g. "Creatures"
  const ACTOR_TYPES = ["npc"];
  const UNUSED_FOLDER = "🗃 Unused";
  const MIN_NAME_LENGTH = 4;           // shorter names are too noisy for the "mentioned" text search

  try {
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    /* ------------------------------------------------------------------ */
    /*  Which NPCs to check                                               */
    /* ------------------------------------------------------------------ */
    let npcs = game.actors.filter(a => ACTOR_TYPES.includes(a.type));
    if ( SCOPE_FOLDER ) {
      const root = game.folders.find(f => (f.type === "Actor") && (f.name === SCOPE_FOLDER) && !f.folder);
      if ( !root ) return ui.notifications.error(`Couldn't find a top-level Actor folder named "${SCOPE_FOLDER}".`);
      const ids = new Set([root, ...root.getSubfolders(true)].map(f => f.id));
      npcs = npcs.filter(a => ids.has(a.folder?.id));
    }
    npcs = npcs.filter(a => a.folder?.name !== UNUSED_FOLDER);
    if ( !npcs.length ) return ui.notifications.warn("No NPCs to check.");

    const npcIds = new Set(npcs.map(a => a.id));
    const refs = new Map(npcs.map(a => [a.id, new Set()]));      // id → Set of "Scene: Foo"
    const mentions = new Map(npcs.map(a => [a.id, new Set()]));

    /* ------------------------------------------------------------------ */
    /*  Scan every world document once for 16-char document ids           */
    /* ------------------------------------------------------------------ */
    const ID_RE = /(?<![A-Za-z0-9])[A-Za-z0-9]{16}(?![A-Za-z0-9])/g;
    const sources = [
      ["Scene", game.scenes],
      ["Combat", game.combats],
      ["Journal", game.journal],
      ["Table", game.tables],
      ["Macro", game.macros],
      ["Actor", game.actors],
      ["Item", game.items]
    ];
    const textSources = [];   // [label, lowercase plain text] for name mentions

    for ( const [kind, collection] of sources ) {
      for ( const doc of collection ) {
        if ( doc.id === this?.id ) continue;                     // this macro itself
        const json = JSON.stringify(doc.toObject());
        const label = `${kind}: ${doc.name ?? doc.id}`;
        for ( const [id] of json.matchAll(ID_RE) ) {
          if ( !npcIds.has(id) ) continue;
          if ( (kind === "Actor") && (doc.id === id) ) continue;  // an actor's own _id
          refs.get(id).add(label);
        }
        if ( (kind === "Journal") || (kind === "Macro") ) textSources.push([label, json.toLowerCase()]);
      }
    }

    for ( const a of npcs ) {
      if ( refs.get(a.id).size || (a.name.length < MIN_NAME_LENGTH) ) continue;
      const needle = a.name.toLowerCase();
      for ( const [label, text] of textSources ) if ( text.includes(needle) ) mentions.get(a.id).add(label);
    }

    /* ------------------------------------------------------------------ */
    /*  Report                                                            */
    /* ------------------------------------------------------------------ */
    const esc = s => Handlebars.escapeExpression(s ?? "");
    const folderPath = a => {
      const names = [];
      for ( let f = a.folder; f; f = f.folder ) names.unshift(f.name);
      return names.join(" › ") || "(root)";
    };
    const byName = (a, b) => a.name.localeCompare(b.name);
    const used = npcs.filter(a => refs.get(a.id).size).sort(byName);
    const mentioned = npcs.filter(a => !refs.get(a.id).size && mentions.get(a.id).size).sort(byName);
    const unused = npcs.filter(a => !refs.get(a.id).size && !mentions.get(a.id).size).sort(byName);

    const row = (a, where, checked) => `<tr>
      <td><input type="checkbox" name="pick" value="${a.id}" ${checked ? "checked" : ""}></td>
      <td>${esc(a.name)}</td>
      <td style="opacity:.7">${esc(folderPath(a))}</td>
      <td style="opacity:.7;font-size:.85em">${esc([...where].join(", "))}</td>
    </tr>`;
    const section = (title, list, getWhere, checked) => list.length ? `
      <h3>${title} (${list.length})</h3>
      <table><tbody>${list.map(a => row(a, getWhere(a), checked)).join("")}</tbody></table>` : "";

    const content = `
      <p>Checked ${npcs.length} NPCs · <b>${unused.length}</b> unused · ${mentioned.length} mentioned only · ${used.length} used</p>
      <p style="opacity:.7">Ticked NPCs get moved into the folder <b>${esc(UNUSED_FOLDER)}</b>. Nothing is deleted.</p>
      <div style="max-height:60vh;overflow:auto">
        ${section("❌ Unused", unused, () => [], true)}
        ${section("💬 Mentioned only (name in text, no link)", mentioned, a => mentions.get(a.id), false)}
        <details><summary><b>✅ Used (${used.length})</b></summary>
          ${section("", used, a => refs.get(a.id), false)}
        </details>
      </div>`;

    console.log("Find Unused NPCs |", {
      unused: unused.map(a => a.name),
      mentionedOnly: Object.fromEntries(mentioned.map(a => [a.name, [...mentions.get(a.id)]])),
      used: Object.fromEntries(used.map(a => [a.name, [...refs.get(a.id)]]))
    });

    const picked = await foundry.applications.api.DialogV2.wait({
      window: { title: "Find Unused NPCs" },
      position: { width: 820 },
      content,
      buttons: [
        {
          action: "move", label: `Move ticked to "${UNUSED_FOLDER}"`, icon: "fa-solid fa-box-archive",
          callback: (event, button) => [...button.form.querySelectorAll("input[name=pick]:checked")].map(i => i.value)
        },
        { action: "close", label: "Close", icon: "fa-solid fa-xmark", default: true }
      ],
      rejectClose: false
    });
    if ( !Array.isArray(picked) || !picked.length ) return;

    let folder = game.folders.find(f => (f.type === "Actor") && (f.name === UNUSED_FOLDER) && !f.folder);
    folder ??= await Folder.implementation.create({ name: UNUSED_FOLDER, type: "Actor", sorting: "a", color: "#555555" });
    await Actor.implementation.updateDocuments(picked.map(_id => ({ _id, folder: folder.id })));
    ui.notifications.info(`Moved ${picked.length} NPC(s) into "${UNUSED_FOLDER}".`);
  } catch ( err ) {
    console.error(err);
    ui.notifications.error(`Find Unused NPCs failed: ${err.message}`);
  }
})();
