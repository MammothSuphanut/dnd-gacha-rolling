/**
 * Create Novaris (Wonderdraft) — copy of the "Novaris" world scene on the Wonderdraft v2 map.
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *
 * The old "Novaris" scene (Azgaar atlas) is left untouched. The copy keeps its folder, size, padding,
 * initial view and every map pin, and swaps the background — both maps are 16200×10800 in the same
 * layout, so the pins land on the same places. Its grid is set to canon rule 22: hex 20 px = 24 mi (1 day).
 * Running it again refreshes the copy's background and settings from the old scene, but leaves
 * the copy's pins alone (pins added on the new map are kept). The scene is never activated.
 *
 * Image: novaris-world-v2 (Wonderdraft) blown up to 16200×10800 with
 *   world-settings/novaris/tools/wonderdraft/export_16k.py, exported at 1x, saved as WebP q92.
 */
(async () => {
  const DIR = "assets/world/novaris/atlas";
  const SOURCE = { name: "Novaris", image: `${DIR}/novaris-v3-atlas.webp` };
  const COPY = { name: "Novaris (Wonderdraft)", image: `${DIR}/novaris-wonderdraft-v2.webp` };
  const GRID = { size: 20, distance: 24, units: "Miles" };   // 1.2 mi/px, 1 hex = 1 day at Normal pace

  if (!game.user.isGM) return ui.notifications.error("GM only.");

  const findScene = def => game.scenes.find(s => s.name === def.name && s.initialLevel?.background?.src === def.image);
  const source = findScene(SOURCE);
  if (!source) return ui.notifications.error(`Scene "${SOURCE.name}" with ${SOURCE.image} not found.`);

  let scene = findScene(COPY);
  if (scene) {
    const { folder, width, height, padding, initial, tokenVision, navigation } = source.toObject();
    await scene.update({ folder, width, height, padding, initial, tokenVision, navigation });
  } else {
    // clone carries the levels and pins over with their ids, so pins stay tied to the level
    scene = await source.clone({ name: COPY.name, active: false, navigation: false }, { save: true });
  }

  await scene.update({ "grid.size": GRID.size, "grid.distance": GRID.distance, "grid.units": GRID.units });

  // v14 keeps the background on the scene's level
  await scene.initialLevel.update({ "background.src": COPY.image });
  try {
    const { thumb } = await scene.createThumbnail();
    await scene.update({ thumb });
  } catch (err) {
    console.warn(`${COPY.name} thumbnail skipped:`, err);
  }

  ui.notifications.info(`"${COPY.name}" ready with ${scene.notes.size} pins (old "${SOURCE.name}" untouched).`);
})();
