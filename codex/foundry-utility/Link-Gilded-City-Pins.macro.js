/**
 * Link Gilded City Pins — point every room pin on the Waterdeep maps at the Thai journals instead of the English archive.
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   1. Run Setup-Gilded-City first (journals + scenes must exist).
 *   2. Mammoth Tweaks 1.5.0+ on, setting "Map pins: open at the room's heading" (on by default).
 *   3. Macro Directory → Create Macro → Type: "Script" → paste this file → Execute (GM only).
 *
 * What it does:
 *   1. Player maps: Plutonium put their room pins in the wrong place (converted from the DM map with a bad scale,
 *      some off the edge; several WDH player maps had none). The pins are rebuilt from the DM map's pins at the
 *      positions in gilded-city-player-pins.json (found by matching the two map images — tools/register_player_pins.py).
 *      Only Plutonium's pins and pins this macro made are replaced; pins you placed yourself stay.
 *   2. Every pin ("6d. Sleeping Quarters") is matched to a heading in the Thai journals by room code (6d, Q12, B9a…)
 *      or by its full text, looking in the scene's own EP journal first, then the rest of that Act. Matched pins open
 *      the Thai page scrolled to that room. Unmatched pins keep the English archive and are listed in the console (F12).
 *   Re-running is safe.
 */
(async () => {
  const DATA = "assets/campaigns/gilded-city-mad-depths/journal/gilded-city.json";
  const PLAYER_PINS = "assets/campaigns/gilded-city-mad-depths/journal/gilded-city-player-pins.json";
  const FLAG = "world";
  const ANCHOR_FLAG = "mammoth-tweaks";

  try {
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    const res = await fetch(encodeURI(DATA), { cache: "no-store" });
    if ( !res.ok ) return ui.notifications.error(`Missing ${DATA} — run the build script first.`);
    const data = await res.json();
    const pinRes = await fetch(encodeURI(PLAYER_PINS), { cache: "no-store" });
    const playerPins = pinRes.ok ? await pinRes.json() : {};

    const findEntry = key => game.journal.find(j => j.getFlag(FLAG, "gcmdJournal") === key);
    const norm = s => (s ?? "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
    const codeOf = s => s?.trim().match(/^([a-z]{0,2}\d+[a-z]?)(?=[.\s:]|$)/i)?.[1].toLowerCase() ?? null;

    // Every heading a pin can land on: the page itself (its "##" title) and each heading inside it
    const targetsOf = entry => entry.pages.contents
      .filter(p => p.type === "text")
      .sort((a, b) => a.sort - b.sort)
      .flatMap(page => [
        { entry, page, slug: null, text: page.name },
        ...Object.values(page.toc ?? {}).map(h => ({ entry, page, slug: h.slug, text: h.text }))
      ]);

    // Candidate journals for a scene: its own EP first, then the other EPs of the Act, then the CH briefs
    const candidates = s => {
      const own = s.journal ? findEntry(s.journal) : null;
      const act = data.journals.filter(j => j.act === s.act && j.key !== s.journal);
      const rank = j => /\/EP/.test(j.key) ? 0 : /\/CH/.test(j.key) ? 1 : 2;
      const rest = act.sort((a, b) => rank(a) - rank(b) || a.sort - b.sort).map(j => findEntry(j.key));
      return [own, ...rest].filter(Boolean);
    };

    // Best first: same code + same room name anywhere in the Act → same code in the scene's own EP
    // → same text anywhere → the location's own section (rooms the Thai text doesn't list one by one)
    const match = (targets, ownId, text, sceneName) => {
      const code = codeOf(text);
      const full = norm(text);
      const name = norm(text.replace(/^[^.]*\.\s*/, ""));
      return (code && name && targets.find(t => codeOf(t.text) === code && norm(t.text).includes(name)))
        ?? (code && targets.find(t => t.entry.id === ownId && codeOf(t.text) === code))
        ?? targets.find(t => norm(t.text) === full)
        ?? targets.find(t => full.length > 3 && norm(t.text).includes(full))
        ?? targets.find(t => norm(t.text).includes(norm(sceneName.replace(/ \(DM\)$/, ""))));
    };

    /* ------------------------------------------------------------------ */
    /*  1. Rebuild player-map pins from the DM map's pins                 */
    /* ------------------------------------------------------------------ */
    const rebuilds = [];
    for ( const [key, m] of Object.entries(playerPins) ) {
      const scene = game.scenes.find(x => x.getFlag(FLAG, "gcmdScene") === key);
      const dm = scene && game.scenes.find(x => x.name === `${scene.name} (DM)` && x.folder?.folder?.id === scene.folder?.id);
      // After Fix-Gilded-City-Grids the map is resized/shifted and the stored positions no longer apply
      if ( !scene || !dm || scene.getFlag(FLAG, "gcmdGridFixed") ) continue;
      const pool = dm.notes.contents;                        // DM pin per text, used up in order for repeated texts
      const k = scene.grid.size / dm.grid.size;              // keep pins the same size relative to the map's squares
      const docs = m.pins.map(p => {
        const i = pool.findIndex(n => n.text === p.text);
        if ( i < 0 ) return null;
        const src = pool.splice(i, 1)[0].toObject();
        delete src._id;
        return foundry.utils.mergeObject(src, {
          x: p.x, y: p.y,
          iconSize: Math.max(16, Math.round(src.iconSize * k)),
          fontSize: Math.max(12, Math.round(src.fontSize * k)),
          flags: { [FLAG]: { gcmdPin: true } }
        });
      }).filter(Boolean);
      const old = scene.notes.filter(n => n.flags?.plutonium || n.getFlag(FLAG, "gcmdPin")).map(n => n.id);
      rebuilds.push({ scene, docs, old });
    }

    const ok = await foundry.applications.api.DialogV2.confirm({
      window: { title: "Link Gilded City Pins" },
      content: `<p>Rebuild the room pins on <b>${rebuilds.length}</b> player map(s) at their corrected positions
        (${rebuilds.reduce((n, r) => n + r.docs.length, 0)} pins), then link every Waterdeep pin to the Thai journals.</p>
        <p>Pins you placed yourself are not touched.</p>`
    });
    if ( !ok ) return;

    for ( const { scene, docs, old } of rebuilds ) {
      if ( old.length ) await scene.deleteEmbeddedDocuments("Note", old);
      if ( docs.length ) await scene.createEmbeddedDocuments("Note", docs);
    }

    /* ------------------------------------------------------------------ */
    /*  2. Link every pin to its Thai heading                             */
    /* ------------------------------------------------------------------ */
    const plan = [];
    const unmatched = [];
    for ( const s of data.scenes ) {
      const scene = game.scenes.find(x => x.getFlag(FLAG, "gcmdScene") === `${s.source}|${s.original}`);
      if ( !scene || !scene.notes.size ) continue;
      const journals = candidates(s);
      const targets = journals.flatMap(targetsOf);
      const ownId = s.journal ? journals[0]?.id : null;
      const updates = [];
      for ( const note of scene.notes ) {
        const t = match(targets, ownId, note.text, scene.name);
        if ( !t ) { unmatched.push(`${scene.name}: ${note.text}`); continue; }
        updates.push({
          _id: note.id,
          entryId: t.entry.id,
          pageId: t.page.id,
          [`flags.${ANCHOR_FLAG}.anchor`]: t.slug,
          "flags.plutonium.journalPageHeaderAnchor": null
        });
      }
      if ( updates.length ) plan.push([scene, updates]);
    }

    const total = plan.reduce((n, [, u]) => n + u.length, 0);
    for ( const [scene, updates] of plan ) await scene.updateEmbeddedDocuments("Note", updates);
    if ( unmatched.length ) console.warn("Link Gilded City Pins — no Thai heading found:", unmatched);
    ui.notifications.info(`Link Gilded City Pins: rebuilt pins on ${rebuilds.length} player map(s); `
      + `${total} pin(s) now open the Thai journals` + (unmatched.length ? `, ${unmatched.length} unmatched (see console).` : "."));
  } catch ( err ) {
    console.error(err);
    ui.notifications.error(`Link Gilded City Pins failed: ${err.message}`);
  }
})();
