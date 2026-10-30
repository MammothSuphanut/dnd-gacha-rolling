/**
 * Create Novaris Wonderdraft Continents — one scene per continent, cut from the Wonderdraft world map.
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *   Run Create-Novaris-Wonderdraft-Scene and Move-Novaris-Wonderdraft-Pins first: the pins are copied from
 *   "Novaris (Wonderdraft)".
 *
 * Each continent gets "<Continent> (Wonderdraft)" in its 📁 Novaris › 📁 <Continent> folder, next to the Azgaar scene
 * (which is left untouched). The image is a crop of novaris-1x-16k (the 16200×10800 export), so it is exactly
 * as sharp as the world map, and the grid is the world map's: hex 20 px = 24 mi = 1 day (canon rule 22).
 * box = the crop in world-map px; the continent name and the big country labels near it are inside the box.
 * Pins: every pin of "Novaris (Wonderdraft)" inside the box is copied (same journal links, icons and text).
 * Running it again refreshes the image, grid and copied pins; pins you add on a continent scene are kept.
 * The scenes are never activated.
 */
(async () => {
  const DIR = "assets/world/novaris/atlas";
  const ROOT_FOLDER = "Novaris";
  const WORLD = "Novaris (Wonderdraft)";
  const GRID = { type: CONST.GRID_TYPES.HEXODDR, size: 20, distance: 24, units: "Miles", alpha: 0.2 };
  const CONTINENTS = [
    { name: "Aldenreich", file: "aldenreich", box: [9285, 276, 16200, 7383] },
    { name: "Eldmere", file: "eldmere", box: [10090, 8502, 16200, 10587] },
    { name: "Shenzhou", file: "shenzhou", box: [3, 825, 6868, 6591] },
    { name: "Suvarna", file: "suvarna", box: [60, 6153, 7041, 10800] },
    { name: "Voxaria", file: "voxaria", box: [5206, 2040, 10353, 7563] }
  ];

  if (!game.user.isGM) return ui.notifications.error("GM only.");
  const world = game.scenes.getName(WORLD);
  if (!world) return ui.notifications.error(`Scene "${WORLD}" not found — run Create-Novaris-Wonderdraft-Scene first.`);
  const root = game.folders.find(f => f.type === "Scene" && f.name === ROOT_FOLDER && !f.folder);
  const ensureFolder = async (name, parentId) =>
    game.folders.find(f => f.type === "Scene" && f.name === name && (f.folder?.id ?? null) === parentId)
    ?? Folder.create({ name, type: "Scene", folder: parentId });

  const wd = world.dimensions;
  const report = [];
  for (const c of CONTINENTS) {
    const [x0, y0, x1, y1] = c.box;
    const name = `${c.name} (Wonderdraft)`, image = `${DIR}/novaris-wonderdraft-v2-${c.file}.webp`;
    const folder = await ensureFolder(c.name, root?.id ?? null);
    const data = { name, folder: folder.id, width: x1 - x0, height: y1 - y0, padding: 0.25, grid: GRID,
                   tokenVision: false, navigation: false };
    let scene = game.scenes.find(s => s.name === name);
    if (scene) await scene.update(data);
    else scene = await Scene.create(data);
    await scene.initialLevel.update({ "background.src": image });

    // pins: world-map px = note − world scene offset; continent scene = map px − box origin + its own offset
    const d = scene.dimensions;
    const old = scene.notes.filter(n => n.getFlag("world", "wdCopy")).map(n => n.id);
    if (old.length) await scene.deleteEmbeddedDocuments("Note", old);
    const notes = world.notes.map(n => n.toObject()).filter(n => {
      const mx = n.x - wd.sceneX, my = n.y - wd.sceneY;
      return mx >= x0 && mx <= x1 && my >= y0 && my <= y1;
    }).map(n => {
      delete n._id;
      n.x = n.x - wd.sceneX - x0 + d.sceneX; n.y = n.y - wd.sceneY - y0 + d.sceneY;
      n.flags = foundry.utils.mergeObject(n.flags ?? {}, { world: { wdCopy: true } });
      return n;
    });
    if (notes.length) await scene.createEmbeddedDocuments("Note", notes);
    try {
      const { thumb } = await scene.createThumbnail();
      await scene.update({ thumb });
    } catch (err) {
      console.warn(`${name} thumbnail skipped:`, err);
    }
    report.push(`${c.name} ${notes.length} pins`);
  }
  ui.notifications.info(`Wonderdraft continents ready: ${report.join(" · ")}.`);
})();
