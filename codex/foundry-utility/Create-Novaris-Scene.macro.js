/**
 * Create Novaris Scene — world map scene from the Novaris v3 atlas.
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *
 * What it does:
 *   - Makes folder "Novaris Map" under "World Setting" (next to "Exandria+ Map") if missing.
 *   - Creates scene "Novaris" (or updates it if it already exists) with the atlas as background.
 *   - Image: world-settings/novaris/maps/azgaar/exports/novaris-v3-atlas-noscale-x10.png
 *     resized 18000×12000 → 16200×10800 WebP (GPU texture limit is 16384 px), copied to IMAGE.
 *   - Scale (canon rule 22, ×4): 1800 Azgaar units × 43.2 mi = 77,760 mi wide
 *     → 16200 px = 4.8 mi/px → one 20 px hex = 96 mi (4 days at Normal pace).
 *   - Generates the scene thumbnail. Does not activate the scene.
 */
(async () => {
  const IMAGE = "worlds/astral-nexus-constellation-protocol/World_Setting/Novaris/novaris-v3-atlas.webp";
  const SCENE_NAME = "Novaris";
  const FOLDER_NAME = "Novaris Map";
  const PARENT_FOLDER = "World Setting";
  const WIDTH = 16200, HEIGHT = 10800;
  const GRID = { type: CONST.GRID_TYPES.HEXODDR, size: 20, distance: 96, units: "Miles", alpha: 0.2 };

  if (!game.user.isGM) return ui.notifications.error("GM only.");

  const parent = game.folders.find(f => f.type === "Scene" && f.name === PARENT_FOLDER);
  let folder = game.folders.find(f => f.type === "Scene" && f.name === FOLDER_NAME);
  if (!folder) folder = await Folder.create({ name: FOLDER_NAME, type: "Scene", folder: parent?.id ?? null });

  const data = {
    name: SCENE_NAME,
    folder: folder.id,
    width: WIDTH,
    height: HEIGHT,
    padding: 0.25,
    grid: GRID,
    tokenVision: false,
    navigation: false
  };

  let scene = game.scenes.getName(SCENE_NAME);
  if (scene) await scene.update(data);
  else scene = await Scene.create(data);

  // v14 keeps the background on the scene's level (created automatically with the scene)
  await scene.initialLevel.update({ "background.src": IMAGE });

  try {
    const { thumb } = await scene.createThumbnail();
    await scene.update({ thumb });
  } catch (err) {
    console.warn("Novaris thumbnail skipped:", err);
  }

  ui.notifications.info(`Scene "${SCENE_NAME}" ready in "${FOLDER_NAME}".`);
  scene.sheet.render(true);
})();
