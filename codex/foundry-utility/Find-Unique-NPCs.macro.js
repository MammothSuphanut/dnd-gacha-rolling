/**
 * Find Unique NPCs — score every NPC under SOURCE_FOLDER on how likely it is a unique, named
 * character (vs. a generic, reusable stat block), then move the ones you tick into a Unique NPCs folder.
 * For Foundry VTT v14 + D&D 5e system 5.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *   3. Review the list (highest score first, reasons shown), tick/untick, pick a destination, Move.
 *
 * It's a guess, not a verdict — always skim the list. Signals used:
 *   +3  token is linked (actorLink)                    → you already treated it as one specific being
 *   +2  name has a title/epithet ("Isus, the Oathless Monarch", "Vex 'the Knife'")
 *   +2  name appears in a journal page                 → it's part of a story
 *   +1  has legendary actions / +1 has lair actions    → boss-shaped
 *   +1  has a written biography
 *   -3  exact name exists in an Actor compendium       → usually a stock monster
 *         (but adventure compendiums also hold named NPCs — e.g. Sildar Hallwinter — check the reason)
 *   -3  auto-created by a Summon activity
 *
 * Moved NPCs go into  <destination> › _Unsorted  so you can file them by region afterwards.
 * Nothing is deleted.
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const SOURCE_FOLDER = "Creatures";
  const DEST_HINT = "Unique";          // top-level folders whose name contains this are offered as destinations
  const SUB_FOLDER = "_Unsorted";
  const PRESELECT_AT = 3;              // score ≥ this is ticked by default
  const MIN_NAME_LENGTH = 4;           // shorter names skip the journal text search

  try {
    if ( game.system.id !== "dnd5e" ) return ui.notifications.error("This macro requires the D&D 5e system.");
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    const root = game.folders.find(f => (f.type === "Actor") && (f.name === SOURCE_FOLDER) && !f.folder);
    if ( !root ) return ui.notifications.error(`Couldn't find a top-level Actor folder named "${SOURCE_FOLDER}".`);
    const npcs = [root, ...root.getSubfolders(true)].flatMap(f => f.contents).filter(a => a.type === "npc");
    if ( !npcs.length ) return ui.notifications.warn(`No NPCs found under "${SOURCE_FOLDER}".`);

    const destinations = game.folders.filter(f => (f.type === "Actor") && !f.folder && f.name.includes(DEST_HINT));

    /* ------------------------------------------------------------------ */
    /*  Lookups built once                                                */
    /* ------------------------------------------------------------------ */
    ui.notifications.info("Find Unique NPCs | indexing compendiums…");
    const compendiumNames = new Map();   // lowercase name → pack label
    for ( const pack of game.packs.filter(p => p.documentName === "Actor") ) {
      if ( destinations.some(d => pack.metadata.label.includes(d.name)) ) continue;
      const index = await pack.getIndex();
      for ( const e of index ) {
        const key = e.name.toLowerCase();
        if ( !compendiumNames.has(key) ) compendiumNames.set(key, pack.metadata.label);
      }
    }
    const journalText = game.journal.contents
      .flatMap(j => j.pages.contents.map(p => `${p.name} ${p.text?.content ?? ""}`))
      .join("\n").toLowerCase();

    /* ------------------------------------------------------------------ */
    /*  Score                                                             */
    /* ------------------------------------------------------------------ */
    const TITLE_RE = /,|\bthe\b|["'“”‘’].+["'“”‘’]/i;
    const scored = npcs.map(a => {
      let score = 0;
      const why = [];
      const add = (n, text) => { score += n; why.push(`${n > 0 ? "+" : ""}${n} ${text}`); };
      const sys = a.system;
      const name = a.name.toLowerCase();

      if ( a.prototypeToken.actorLink ) add(3, "linked token");
      if ( TITLE_RE.test(a.name) && !/\(.+\)$/.test(a.name) ) add(2, "title/epithet in name");
      if ( (a.name.length >= MIN_NAME_LENGTH) && journalText.includes(name) ) add(2, "named in a journal");
      if ( (sys.resources?.legact?.max ?? 0) > 0 ) add(1, "legendary actions");
      if ( sys.resources?.lair?.value ) add(1, "lair actions");
      const bio = (sys.details?.biography?.value ?? "").replace(/<[^>]*>/g, "").trim();
      if ( bio.length > 100 ) add(1, "has biography");
      if ( compendiumNames.has(name) ) add(-3, `stock name in "${compendiumNames.get(name)}"`);
      if ( a.getFlag("dnd5e", "summonedCopy") ) add(-3, "summoned copy");

      return { actor: a, score, why };
    }).sort((x, y) => (y.score - x.score) || x.actor.name.localeCompare(y.actor.name));

    /* ------------------------------------------------------------------ */
    /*  Dialog                                                            */
    /* ------------------------------------------------------------------ */
    const esc = s => Handlebars.escapeExpression(s ?? "");
    const folderPath = a => {
      const names = [];
      for ( let f = a.folder; f && f.id !== root.id; f = f.folder ) names.unshift(f.name);
      return names.join(" › ");
    };
    const rows = scored.map(({ actor, score, why }) => `<tr>
      <td><input type="checkbox" name="pick" value="${actor.id}" ${score >= PRESELECT_AT ? "checked" : ""}></td>
      <td style="text-align:center;font-weight:bold;color:${score >= PRESELECT_AT ? "#3a3" : score < 0 ? "#c55" : "inherit"}">${score}</td>
      <td>${esc(actor.name)}</td>
      <td style="opacity:.6;font-size:.85em">${esc(folderPath(actor))}</td>
      <td style="opacity:.75;font-size:.85em">${esc(why.join(" · "))}</td>
    </tr>`).join("");

    const destOptions = destinations.map(d => `<option value="${d.id}">${esc(d.name)}</option>`).join("")
      + `<option value="__new">➕ New folder: "Unique NPCs"</option>`;

    const result = await foundry.applications.api.DialogV2.wait({
      window: { title: "Find Unique NPCs" },
      position: { width: 960 },
      content: `
        <p>${npcs.length} NPCs scored · <b>${scored.filter(s => s.score >= PRESELECT_AT).length}</b> pre-ticked (score ≥ ${PRESELECT_AT}).</p>
        <div style="display:flex;gap:1em;align-items:center">
          <label>Move to <select name="dest">${destOptions}</select> › ${esc(SUB_FOLDER)}</label>
          <label><input type="checkbox" name="link" checked> Link their tokens (actorLink)</label>
        </div>
        <div style="max-height:60vh;overflow:auto;margin-top:.5em">
          <table><thead><tr><th></th><th>Score</th><th>NPC</th><th>Folder</th><th>Why</th></tr></thead>
          <tbody>${rows}</tbody></table>
        </div>`,
      buttons: [
        {
          action: "move", label: "Move ticked", icon: "fa-solid fa-user-tag",
          callback: (event, button) => ({
            ids: [...button.form.querySelectorAll("input[name=pick]:checked")].map(i => i.value),
            dest: button.form.elements.dest.value,
            link: button.form.elements.link.checked
          })
        },
        { action: "close", label: "Close", icon: "fa-solid fa-xmark", default: true }
      ],
      rejectClose: false
    });
    if ( !result?.ids?.length ) return;

    /* ------------------------------------------------------------------ */
    /*  Move                                                              */
    /* ------------------------------------------------------------------ */
    const top = (result.dest === "__new")
      ? await Folder.implementation.create({ name: "Unique NPCs", type: "Actor", sorting: "a" })
      : game.folders.get(result.dest);
    let sub = game.folders.find(f => (f.type === "Actor") && (f.name === SUB_FOLDER) && (f.folder?.id === top.id));
    sub ??= await Folder.implementation.create({ name: SUB_FOLDER, type: "Actor", folder: top.id, sorting: "a", color: top.color ?? null });

    await Actor.implementation.updateDocuments(result.ids.map(_id => ({
      _id, folder: sub.id, ...(result.link ? { "prototypeToken.actorLink": true } : {})
    })));
    ui.notifications.info(`Moved ${result.ids.length} NPC(s) into "${top.name} › ${SUB_FOLDER}".`);
  } catch ( err ) {
    console.error(err);
    ui.notifications.error(`Find Unique NPCs failed: ${err.message}`);
  }
})();
