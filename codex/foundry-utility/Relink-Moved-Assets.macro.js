/**
 * Relink Moved Assets — rewrite image paths after the 2026-10-25 reorganisation of
 *   worlds/astral-nexus-constellation-protocol/Campaigns/00 Gerneral Campaigns Data/assets/
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * Moved folders (old → new):
 *   assets/CampTokens/<file>  → assets/Camp/Camp Tokens/<file>
 *   assets/Nature/<file>      → assets/Nature/Nature Tokens/<file>
 *   assets/Trap/<file>        → assets/Dungeon/Trap Tokens/<file>
 *   (Market/ and Treasure/ did not move.)
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script", paste this file, Execute as GM.
 *   2. Pick "Preview" first: it only counts what would change and whispers a report.
 *   3. Run again and pick "Apply" to write the changes.
 *   4. Once Apply reports 0 left on a second Preview, the old folders can be deleted.
 *
 * Checks: every world collection (actors + their items/effects, scenes + tiles/tokens/notes/
 *         sounds/…, journal pages, items, macros, tables, playlists, cards, users, settings)
 *         and the world's own compendium packs. Handles both plain and %20-encoded paths.
 * Safe to run more than once — already-moved paths are not matched again.
 */
(async () => {
  try {
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    /* ------------------------------------------------------------------ */
    /*  Path rules                                                        */
    /* ------------------------------------------------------------------ */
    const MOVES = { "CampTokens": "Camp/Camp Tokens", "Nature": "Nature/Nature Tokens", "Trap": "Dungeon/Trap Tokens" };
    const ROOTS = ["00 Gerneral Campaigns Data/assets/", "00%20Gerneral%20Campaigns%20Data/assets/"];
    const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Only files sitting directly in the old folder match (no "/" after it), so the new
    // Nature/Nature Tokens/... paths are never touched again.
    const rules = [];
    for ( const root of ROOTS ) {
      const encoded = root.includes("%20");
      for ( const [from, to] of Object.entries(MOVES) ) {
        rules.push({
          re: new RegExp(`(${esc(root)})${esc(from)}/([^/"\\\\]+?\\.(?:png|webp|jpe?g))`, "gi"),
          to: encoded ? to.replaceAll(" ", "%20") : to
        });
      }
    }
    const rewrite = text => {
      let out = text;
      for ( const r of rules ) out = out.replace(r.re, (_m, root, file) => `${root}${r.to}/${file}`);
      return out;
    };

    /* ------------------------------------------------------------------ */
    /*  Mode                                                              */
    /* ------------------------------------------------------------------ */
    const apply = await foundry.applications.api.DialogV2.wait({
      window: { title: "Relink Moved Assets" },
      content: `<p>Rewrite paths for CampTokens/, Nature/, Trap/ → their new folders.</p>
                <p><b>Preview</b> only counts. <b>Apply</b> writes the changes.</p>`,
      buttons: [
        { action: "preview", label: "Preview", default: true, callback: () => false },
        { action: "apply", label: "Apply", callback: () => true }
      ],
      rejectClose: false
    });
    if ( apply === null || apply === undefined ) return;

    /* ------------------------------------------------------------------ */
    /*  Walk documents                                                    */
    /* ------------------------------------------------------------------ */
    const stats = { docs: 0, paths: 0, failed: 0 };
    const where = new Map();   // label → count

    const countHits = text => rules.reduce((n, r) => n + (text.match(r.re)?.length ?? 0), 0);

    // Returns the update for one document's own fields (embedded collections excluded).
    const changesFor = doc => {
      const src = doc.toObject();
      for ( const key of Object.keys(doc.collections ?? {}) ) delete src[key];
      const before = JSON.stringify(src);
      const n = countHits(before);
      if ( !n ) return null;
      const after = JSON.parse(rewrite(before));
      return { n, diff: foundry.utils.diffObject(src, after) };
    };

    const label = doc => {
      const top = doc.parent ? `${doc.parent.documentName} "${doc.parent.name ?? doc.parent.id}"` : null;
      if ( top ) return top;
      if ( doc.documentName === "Setting" ) return `Setting "${doc.key}"`;
      return `${doc.documentName} "${doc.name ?? doc.id}"${doc.pack ? ` [${doc.pack}]` : ""}`;
    };

    async function visit(doc) {
      const c = changesFor(doc);
      if ( c && !foundry.utils.isEmpty(c.diff) ) {
        stats.docs++; stats.paths += c.n;
        const key = label(doc);
        where.set(key, (where.get(key) ?? 0) + c.n);
        if ( apply ) {
          try { await doc.update(c.diff, { diff: false, render: false }); }
          catch ( err ) { stats.failed++; console.error("Relink failed for", doc.uuid, err); }
        }
      }
      for ( const coll of Object.values(doc.collections ?? {}) ) {
        for ( const child of coll ) await visit(child);
      }
    }

    ui.notifications.info(`Relink Moved Assets: ${apply ? "applying" : "previewing"}…`);
    for ( const collection of game.collections ) {
      for ( const doc of collection ) await visit(doc);
    }

    // World compendium packs only (module/system packs are not ours to edit).
    for ( const pack of game.packs.filter(p => p.metadata.packageType === "world") ) {
      const wasLocked = pack.locked;
      if ( apply && wasLocked ) await pack.configure({ locked: false });
      const docs = await pack.getDocuments();
      for ( const doc of docs ) await visit(doc);
      if ( apply && wasLocked ) await pack.configure({ locked: true });
    }

    /* ------------------------------------------------------------------ */
    /*  Report                                                            */
    /* ------------------------------------------------------------------ */
    const rows = [...where.entries()].sort((a, b) => b[1] - a[1])
      .map(([k, n]) => `<li>${foundry.utils.escapeHTML(k)} — ${n}</li>`).join("");
    const title = apply ? "✅ Relink applied" : "🔍 Relink preview (nothing written)";
    await ChatMessage.create({
      content: `<h3>${title}</h3>
        <p>${stats.paths} path(s) in ${stats.docs} document(s)${stats.failed ? `, <b>${stats.failed} failed</b> (see console F12)` : ""}.</p>
        ${rows ? `<ul>${rows}</ul>` : "<p>Nothing left to relink.</p>"}`,
      whisper: [game.user.id]
    });
    if ( apply ) ui.notifications.info("Relink done — press F5 to reload so tiles pick up the new paths.");
  } catch ( err ) {
    console.error(err);
    ui.notifications.error(`Relink Moved Assets failed: ${err.message}`);
  }
})();
