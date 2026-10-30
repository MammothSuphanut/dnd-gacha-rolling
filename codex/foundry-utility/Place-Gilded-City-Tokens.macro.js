/**
 * Place Gilded City Tokens — put each room's starting monsters on the Waterdeep player maps, next to the room's pin.
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   1. Build the data from the repo (once per change to the campaign .md files):
 *        python adventures/gilded-city-mad-depths/tools/build_token_data.py <creatures.json> "D:/FoundryVTT_Data/Data/assets/campaigns/gilded-city-mad-depths/journal"
 *   2. Macro Directory → Create Macro → Type: "Script" → paste this file → Execute (GM only).
 *   3. Tick the maps to fill (the scene you're viewing is ticked by default) → Place.
 *
 * What it does:
 *   - Reads gilded-city-tokens.json: for every room code ("6c", "Q5") the creatures the Thai EP says start there.
 *   - Uses the Plutonium actors in the "Creatures" folder (adventure stat blocks first, then 2024, then 2014).
 *   - Places them around the room's pin on the player map, cell by cell, never through a wall, never stacked.
 *   - Tokens are hidden from players. Named NPCs (Uktarl Krannoc …) get their name on a copy of the base stat block's token.
 *   Re-running a map first removes the tokens this macro placed there before (only those), then places again.
 *   Rooms without a pin on the map are skipped and listed in the console (F12).
 */
(async () => {
  const DATA = "assets/campaigns/gilded-city-mad-depths/journal/gilded-city-tokens.json";
  const FLAG = "world";
  const MAX_RING = 14;                         // how far (in cells) from the pin a token may land

  try {
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    const res = await fetch(encodeURI(DATA), { cache: "no-store" });
    if ( !res.ok ) return ui.notifications.error(`Missing ${DATA} — run build_token_data.py first.`);
    const data = await res.json();

    const maps = Object.entries(data)
      .map(([key, m]) => ({ ...m, scene: game.scenes.find(s => s.getFlag(FLAG, "gcmdScene") === key) }))
      .filter(m => m.scene && m.rooms.length);
    if ( !maps.length ) return ui.notifications.warn("No Waterdeep maps found — run Setup-Gilded-City first.");

    /* ------------------------------------------------------------------ */
    /*  Pick maps                                                         */
    /* ------------------------------------------------------------------ */
    const esc = foundry.utils.escapeHTML;
    const count = m => m.rooms.reduce((n, r) => n + r.creatures.reduce((k, c) => k + c.count, 0), 0);
    const rows = maps.map((m, i) => `<label style="display:block">
        <input type="checkbox" name="m${i}" ${m.scene.id === canvas.scene?.id ? "checked" : ""}>
        ${esc(m.scene.name)} <span style="opacity:.6">— ${count(m)} token(s), ${m.rooms.length} room(s)</span></label>`).join("");
    const picked = await foundry.applications.api.DialogV2.prompt({
      window: { title: "Place Gilded City Tokens" },
      position: { width: 520 },
      content: `<p>Tokens this macro placed before on a ticked map are removed first. All new tokens are hidden.</p>
        <div style="max-height:420px;overflow:auto">${rows}</div>`,
      ok: { label: "Place", callback: (event, button) => maps.filter((m, i) => button.form.elements[`m${i}`].checked) },
      rejectClose: false
    });
    if ( !picked?.length ) return;

    /* ------------------------------------------------------------------ */
    /*  Geometry                                                          */
    /* ------------------------------------------------------------------ */
    const cross = (ax, ay, bx, by, cx, cy, dx, dy) => {
      const d = (bx - ax) * (dy - cy) - (by - ay) * (dx - cx);
      if ( d === 0 ) return false;
      const t = ((cx - ax) * (dy - cy) - (cy - ay) * (dx - cx)) / d;
      const u = ((cx - ax) * (by - ay) - (cy - ay) * (bx - ax)) / d;
      return t > 0 && t < 1 && u > 0 && u < 1;
    };
    const codeOf = s => s?.trim().match(/^([a-z]{0,2}\d+[a-z]?)(?=[.\s:]|$)/i)?.[1].toLowerCase() ?? null;

    const findActor = c => game.actors.get(c.actorId) ?? game.actors.find(a => a.name === c.actor);

    /* ------------------------------------------------------------------ */
    /*  Place                                                             */
    /* ------------------------------------------------------------------ */
    let placed = 0;
    const skipped = [];
    for ( const m of picked ) {
      const scene = m.scene;
      const g = scene.grid.size;
      const rect = scene.dimensions.sceneRect;
      const walls = scene.walls.filter(w => w.move && w.ds !== CONST.WALL_DOOR_STATES.OPEN).map(w => w.c);
      const blocked = (ax, ay, bx, by) => walls.some(c => cross(ax, ay, bx, by, c[0], c[1], c[2], c[3]));

      // A code can have several pins (Q2a and Q2b are both labelled "Q2"); creatures are shared out between them
      const pins = {};
      for ( const n of scene.notes ) { const code = codeOf(n.text); if ( code ) (pins[code] ??= []).push(n); }

      const old = scene.tokens.filter(t => t.getFlag(FLAG, "gcmdToken")).map(t => t.id);
      if ( old.length ) await scene.deleteEmbeddedDocuments("Token", old);

      const taken = new Set();
      const free = (col, row, w, h) => {
        for ( let i = 0; i < w; i++ ) for ( let j = 0; j < h; j++ ) if ( taken.has(`${col + i},${row + j}`) ) return false;
        return true;
      };
      const take = (col, row, w, h) => { for ( let i = 0; i < w; i++ ) for ( let j = 0; j < h; j++ ) taken.add(`${col + i},${row + j}`); };
      // Spiral out from the pin's cell; a spot counts if it's on the map, empty, and the pin can "see" its centre
      const spot = (pin, w, h) => {
        const pc = Math.floor(pin.x / g), pr = Math.floor(pin.y / g);
        for ( let ring = 0; ring <= MAX_RING; ring++ ) {
          for ( let dc = -ring; dc <= ring; dc++ ) for ( let dr = -ring; dr <= ring; dr++ ) {
            if ( Math.max(Math.abs(dc), Math.abs(dr)) !== ring ) continue;
            const col = pc + dc, row = pr + dr;
            const x = col * g, y = row * g, cx = x + (w * g) / 2, cy = y + (h * g) / 2;
            if ( x < rect.x || y < rect.y || x + w * g > rect.x + rect.width || y + h * g > rect.y + rect.height ) continue;
            if ( !free(col, row, w, h) || blocked(pin.x, pin.y, cx, cy) ) continue;
            take(col, row, w, h);
            return { x, y };
          }
        }
        return null;
      };

      const docs = [];
      for ( const room of m.rooms ) {
        const code = room.code.toLowerCase();
        const roomPins = pins[code] ?? pins[code.replace(/[a-z]$/, "")];
        if ( !roomPins ) { skipped.push(`${scene.name}: ${room.code} (no pin)`); continue; }
        let n = 0;
        for ( const c of room.creatures ) {
          const actor = findActor(c);
          if ( !actor ) { skipped.push(`${scene.name}: ${room.code} ${c.actor} (no actor)`); continue; }
          const { width: w = 1, height: h = 1 } = actor.prototypeToken;
          const tw = Math.max(1, Math.round(w)), th = Math.max(1, Math.round(h));
          for ( let i = 0; i < c.count; i++ ) {
            const at = spot(roomPins[n++ % roomPins.length], tw, th);
            if ( !at ) { skipped.push(`${scene.name}: ${room.code} ${c.actor} (no room near the pin)`); break; }
            const td = await actor.getTokenDocument({
              ...at, hidden: true,
              ...(c.name ? { name: c.name } : {}),
              flags: { [FLAG]: { gcmdToken: room.code } }
            });
            docs.push(td.toObject());
          }
        }
      }
      if ( docs.length ) await scene.createEmbeddedDocuments("Token", docs);
      placed += docs.length;
    }

    if ( skipped.length ) console.warn("Place Gilded City Tokens — skipped:", skipped);
    ui.notifications.info(`Place Gilded City Tokens: ${placed} hidden token(s) on ${picked.length} map(s)`
      + (skipped.length ? `, ${skipped.length} skipped (see console).` : "."));
  } catch ( err ) {
    console.error(err);
    ui.notifications.error(`Place Gilded City Tokens failed: ${err.message}`);
  }
})();
