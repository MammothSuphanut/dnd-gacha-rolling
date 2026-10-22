/**
 * Where Is This Actor Used? — list every place in the world that references one actor.
 * For Foundry VTT v14 + D&D 5e system 5.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Either select its token, or have its sheet be the last window you clicked, then Execute.
 *      (Nothing selected/open → you'll be asked for a name.)
 *   3. The result is whispered to you in chat, with clickable links.
 *
 * Checks: tokens on scenes, combats, journal pages, roll tables, macros,
 *         items/effects on other actors (e.g. a Summon activity), world items.
 * Also shows where the sheet came from (compendium source, auto-created by a summon).
 * Not checked: compendium contents.
 */
(async () => {
  try {
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    /* ------------------------------------------------------------------ */
    /*  Pick the actor                                                    */
    /* ------------------------------------------------------------------ */
    const fromWindow = ui.activeWindow?.document ?? ui.activeWindow?.object;
    let target = canvas.tokens?.controlled[0]?.actor
      ?? ((fromWindow?.documentName === "Actor") ? fromWindow : null);
    if ( target?.isToken ) target = game.actors.get(target.id) ?? target;   // unlinked token → its base actor

    if ( !target ) {
      const name = await foundry.applications.api.DialogV2.prompt({
        window: { title: "Where Is This Actor Used?" },
        content: `<input type="text" name="name" placeholder="Actor name" autofocus>`,
        ok: { callback: (event, button) => button.form.elements.name.value.trim() },
        rejectClose: false
      });
      if ( !name ) return;
      target = game.actors.find(a => a.name.toLowerCase() === name.toLowerCase());
      if ( !target ) return ui.notifications.error(`No world actor named "${name}".`);
    }

    const id = target.id;
    const hit = doc => JSON.stringify(doc.toObject()).includes(id);
    const link = doc => `@UUID[${doc.uuid}]{${doc.name ?? doc.id}}`;
    const found = [];

    /* ------------------------------------------------------------------ */
    /*  Search                                                            */
    /* ------------------------------------------------------------------ */
    for ( const scene of game.scenes ) {
      const n = scene.tokens.filter(t => t.actorId === id).length;
      if ( n ) found.push(`🗺️ Scene ${link(scene)} — ${n} token(s)`);
    }
    for ( const combat of game.combats ) {
      if ( combat.combatants.some(c => c.actorId === id) ) found.push(`⚔️ Combat in ${combat.scene ? link(combat.scene) : "(no scene)"}`);
    }
    for ( const entry of game.journal ) {
      for ( const page of entry.pages ) if ( hit(page) ) found.push(`📖 Journal ${link(entry)} › ${link(page)}`);
    }
    for ( const table of game.tables ) if ( hit(table) ) found.push(`🎲 Table ${link(table)}`);
    for ( const macro of game.macros ) if ( hit(macro) ) found.push(`📜 Macro ${link(macro)}`);
    for ( const item of game.items ) if ( hit(item) ) found.push(`🗡️ Item ${link(item)}`);
    for ( const actor of game.actors ) {
      if ( actor.id === id ) continue;
      for ( const item of actor.items ) if ( hit(item) ) found.push(`👤 ${link(actor)} › ${link(item)}`);
      for ( const effect of actor.effects ) if ( hit(effect) ) found.push(`👤 ${link(actor)} › effect ${effect.name}`);
    }

    /* ------------------------------------------------------------------ */
    /*  Provenance                                                        */
    /* ------------------------------------------------------------------ */
    const origin = [];
    const source = target._stats?.compendiumSource ?? target.flags?.core?.sourceId;
    if ( source ) origin.push(`Imported from @UUID[${source}]`);
    if ( target.getFlag("dnd5e", "summonedCopy") ) origin.push("Auto-created by a Summon activity (safe to move; it is re-imported if missing)");
    const created = target._stats?.createdTime;
    if ( created ) origin.push(`Created ${new Date(created).toLocaleString()}`);
    const book = target.system.source?.book;
    if ( book ) origin.push(`Source: ${book}${target.system.source.page ? ` p.${target.system.source.page}` : ""}`);

    /* ------------------------------------------------------------------ */
    /*  Output                                                            */
    /* ------------------------------------------------------------------ */
    const list = items => items.length ? `<ul>${items.map(i => `<li>${i}</li>`).join("")}</ul>` : "";
    await ChatMessage.create({
      whisper: [game.user.id],
      speaker: { alias: "Where Used" },
      content: `<h3>${link(target)}</h3>
        ${found.length ? `<p><b>Referenced in ${found.length} place(s):</b></p>${list(found)}` : `<p><b>❌ Not referenced anywhere in this world.</b></p>`}
        ${origin.length ? `<p><b>Origin</b></p>${list(origin)}` : ""}`
    });
  } catch ( err ) {
    console.error(err);
    ui.notifications.error(`Where Is This Actor Used failed: ${err.message}`);
  }
})();
