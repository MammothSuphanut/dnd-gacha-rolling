/**
 * Fix Gilded City Grids — make the Foundry grid on each Waterdeep player map match the squares drawn on the image.
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   1. Run Link-Gilded-City-Pins first (it rebuilds the player-map pins this macro then moves along).
 *   2. Macro Directory → Create Macro → Type: "Script" → paste this file → Execute (GM only).
 *   3. Run Place-Gilded-City-Tokens again afterwards.
 *
 * Why: Plutonium gave most WDH player maps a 50 px grid whatever the drawing (Xanathar Guild Hideout's squares are
 * ~64.4 px), Level 9 got 102 instead of 114, and on every map the grid lines sat part-way across the drawn squares.
 * gilded-city-player-grids.json holds, per map, the drawn 5-ft cell size and where its lines start (measured from the
 * image — tools/measure_player_grids.py).
 *
 * What it does, per map:
 *   - Grid size → the drawn cell rounded to whole pixels; the scene is resized by the same tiny factor so the
 *     rounding doesn't drift across the map.
 *   - The image is shifted (scene shift + a small padding) so the grid lines fall on the drawn lines.
 *   - Walls, pins, lights, sounds, tiles and tokens move and scale with the image, so they stay where they were drawn.
 *   - Tokens placed by Place-Gilded-City-Tokens are removed instead — place them again afterwards.
 *   Each map is fixed once (flagged); re-running skips it. Kolat Towers (diagonal drawn grid) and Trollskull Alley
 *   (street map) are not in the data and stay as they are.
 */
(async () => {
  const DATA = "assets/campaigns/gilded-city-mad-depths/journal/gilded-city-player-grids.json";
  const FLAG = "world";
  const PADDING = 0.05;                        // room for the shift, so no edge of the image is cut off

  try {
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");
    const res = await fetch(encodeURI(DATA), { cache: "no-store" });
    if ( !res.ok ) return ui.notifications.error(`Missing ${DATA}.`);
    const data = await res.json();

    const todo = Object.entries(data)
      .map(([key, m]) => ({ ...m, scene: game.scenes.find(s => s.getFlag(FLAG, "gcmdScene") === key) }))
      .filter(m => m.scene && !m.scene.getFlag(FLAG, "gcmdGridFixed"));
    if ( !todo.length ) return ui.notifications.info("Fix Gilded City Grids: every map is already fixed.");

    const esc = foundry.utils.escapeHTML;
    const rows = todo.map(m => `<li>${esc(m.scene.name)}: ${m.scene.grid.size} → ${Math.round(m.cell)} px</li>`).join("");
    const ok = await foundry.applications.api.DialogV2.confirm({
      window: { title: "Fix Gilded City Grids" },
      position: { width: 480 },
      content: `<p>Fix the grid on <b>${todo.length}</b> player map(s). Walls and pins move with the image.
        Tokens placed by Place-Gilded-City-Tokens are removed — place them again afterwards.</p>
        <div style="max-height:320px;overflow:auto"><ul>${rows}</ul></div>`
    });
    if ( !ok ) return;

    for ( const m of todo ) {
      const scene = m.scene;
      const G = Math.round(m.cell);
      const k = G / m.cell;
      const old = scene.dimensions;
      const width = Math.round(scene.width * k);
      const height = Math.round(scene.height * k);

      // Where the new scene rect starts: shift so (sceneX + drawn-line offset) lands on a grid line
      const probe = scene.clone();
      probe.updateSource({ width, height, padding: Math.max(scene.padding, PADDING), shiftX: 0, shiftY: 0, grid: { size: G } });
      const base = probe.getDimensions();
      const ox = m.ox * k, oy = m.oy * k;
      const shiftX = Math.round(((base.sceneX + ox) % G + G) % G);
      const shiftY = Math.round(((base.sceneY + oy) % G + G) % G);
      const sceneX = base.sceneX - shiftX, sceneY = base.sceneY - shiftY;

      // canvas point on the old scene → same spot on the image in the new scene
      const px = x => Math.round(sceneX + (x - old.sceneX) * k);
      const py = y => Math.round(sceneY + (y - old.sceneY) * k);

      const ours = scene.tokens.filter(t => t.getFlag(FLAG, "gcmdToken")).map(t => t.id);
      if ( ours.length ) await scene.deleteEmbeddedDocuments("Token", ours);

      await scene.update({
        width, height, padding: Math.max(scene.padding, PADDING), shiftX, shiftY, "grid.size": G,
        [`flags.${FLAG}.gcmdGridFixed`]: true
      });

      const walls = scene.walls.map(w => ({ _id: w.id, c: [px(w.c[0]), py(w.c[1]), px(w.c[2]), py(w.c[3])] }));
      const notes = scene.notes.map(n => ({ _id: n.id, x: px(n.x), y: py(n.y) }));
      const points = c => scene[c].map(d => ({ _id: d.id, x: px(d.x), y: py(d.y) }));
      const tiles = scene.tiles.map(t => ({ _id: t.id, x: px(t.x), y: py(t.y), width: Math.round(t.width * k), height: Math.round(t.height * k) }));
      if ( walls.length ) await scene.updateEmbeddedDocuments("Wall", walls);
      if ( notes.length ) await scene.updateEmbeddedDocuments("Note", notes);
      for ( const [c, type] of [["tokens", "Token"], ["lights", "AmbientLight"], ["sounds", "AmbientSound"]] ) {
        const u = points(c);
        if ( u.length ) await scene.updateEmbeddedDocuments(type, u, { animate: false });
      }
      if ( tiles.length ) await scene.updateEmbeddedDocuments("Tile", tiles);
    }

    ui.notifications.info(`Fix Gilded City Grids: ${todo.length} map(s) fixed. Run Place-Gilded-City-Tokens again.`);
  } catch ( err ) {
    console.error(err);
    ui.notifications.error(`Fix Gilded City Grids failed: ${err.message}`);
  }
})();
