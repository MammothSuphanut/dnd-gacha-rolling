/**
 * Create Novaris Scenes — world + continent map scenes in a Novaris folder tree.
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *
 * Builds this tree in the Scenes sidebar (missing parts are created, existing ones reused):
 *   📁 Novaris
 *      🗺 Novaris                       world map
 *      🗺 Novaris (Player)              world map, place names left to the pins
 *      📁 <Continent>
 *         🗺 <Continent>                continent map
 *         🗺 <Continent> (Player)       continent map, place names left to the pins
 *         📁 <Region>                   empty — for the region's place maps later
 *   Foundry allows 4 folder levels; this uses 3, so a region folder can still take one sub-folder.
 *
 * Also: moves the old "Novaris" scene out of "Novaris Map" (scene settings kept), deletes the
 * "Novaris (Light)" scene and the "Novaris Map" folder once it is empty. Scenes are never activated.
 *
 * Images (world-settings/novaris/maps/azgaar/exports/, v3 map, WebP in DIR):
 *   World: novaris-v3-atlas-noscale-x10.png resized to 16200×10800 (×9 of the 1800×1200 Azgaar map).
 *   Continents: exported from Azgaar per region at ×18 or ×27 — 2–3× sharper than the world map.
 *   Player maps (*-player.webp): same exports with only country, continent, sea and mountain-range labels.
 * Scale (canon rule 22): 1 Azgaar unit = 43.2 mi, so mi/px = 43.2 / export scale.
 *   World ×9  → 4.8 mi/px → 35 px hex = 168 mi (7 days at Normal pace, 24 mi/day)
 *   ×18       → 2.4 mi/px → 20 px hex = 48 mi (2 days)
 *   ×27       → 1.6 mi/px → 30 px hex = 48 mi (2 days)
 */
(async () => {
  const DIR = "worlds/astral-nexus-constellation-protocol/World_Setting/Novaris";
  const ROOT = "Novaris";
  const WORLD = { name: "Novaris", image: `${DIR}/novaris-v3-atlas.webp`, width: 16200, height: 10800, gridSize: 35, distance: 168 };
  const CONTINENTS = [
    { name: "Aldenreich", image: `${DIR}/novaris-v3-aldenreich.webp`, width: 13590, height: 13734, gridSize: 20, distance: 48,
      regions: ["Costa Mosaica", "Dwendalian Empire", "Eiselcross", "Gråmark", "Ödland", "Witherstrand"] },
    { name: "Eldmere", image: `${DIR}/novaris-v3-eldmere.webp`, width: 14148, height: 5535, gridSize: 30, distance: 48,
      regions: ["Cinderteeth", "Eldwood", "Halo Peaks", "Mistholm", "Shellward Reach", "Wyrmhold Isles"] },
    { name: "Shenzhou", image: `${DIR}/novaris-v3-shenzhou.webp`, width: 10962, height: 11052, gridSize: 20, distance: 48,
      regions: ["Amanokado", "Jungwon"] },
    { name: "Suvarna", image: `${DIR}/novaris-v3-suvarna.webp`, width: 13482, height: 9018, gridSize: 20, distance: 48,
      regions: ["Dandaka", "Deshret", "Ehrvarn Highlands", "Himmapan Wilds", "Jarnfell", "Ulfdal"] },
    { name: "Voxaria", image: `${DIR}/novaris-v3-voxaria.webp`, width: 13149, height: 15849, gridSize: 30, distance: 48,
      regions: ["Blacktide Coast", "Crownshore", "Forgeheim", "Gloamwood", "Heartland", "Iron Authority", "The Verge", "Thunderspine"] }
  ];
  // Player copy of each map: same size and grid, only country/continent/sea/mountain-range labels baked in
  const PLAYER = def => ({ ...def, name: `${def.name} (Player)`, image: def.image.replace(".webp", "-player.webp") });
  const OLD_FOLDER = "Novaris Map";
  const OLD_SCENES = ["Novaris (Light)"];

  if (!game.user.isGM) return ui.notifications.error("GM only.");

  const findFolder = (name, parentId) =>
    game.folders.find(f => f.type === "Scene" && f.name === name && (f.folder?.id ?? null) === parentId);
  const ensureFolder = async (name, parentId = null) =>
    findFolder(name, parentId) ?? Folder.create({ name, type: "Scene", folder: parentId });

  const ensureScene = async (def, folderId) => {
    const data = {
      name: def.name,
      folder: folderId,
      width: def.width,
      height: def.height,
      padding: 0.25,
      grid: { type: CONST.GRID_TYPES.HEXODDR, size: def.gridSize, distance: def.distance, units: "Miles", alpha: 0.2 },
      tokenVision: false,
      navigation: false
    };
    // Match by name + image so a continent scene never takes over a same-named scene elsewhere
    let scene = game.scenes.find(s => s.name === def.name && s.initialLevel?.background?.src === def.image);
    if (scene) await scene.update(data);
    else scene = await Scene.create(data);

    // v14 keeps the background on the scene's level (created automatically with the scene)
    await scene.initialLevel.update({ "background.src": def.image });
    try {
      const { thumb } = await scene.createThumbnail();
      await scene.update({ thumb });
    } catch (err) {
      console.warn(`${def.name} thumbnail skipped:`, err);
    }
    return scene;
  };

  const root = await ensureFolder(ROOT);
  await ensureScene(WORLD, root.id);
  await ensureScene(PLAYER(WORLD), root.id);

  for (const continent of CONTINENTS) {
    const folder = await ensureFolder(continent.name, root.id);
    await ensureScene(continent, folder.id);
    await ensureScene(PLAYER(continent), folder.id);
    for (const region of continent.regions) await ensureFolder(region, folder.id);
  }

  for (const name of OLD_SCENES) await game.scenes.getName(name)?.delete();
  const old = game.folders.find(f => f.type === "Scene" && f.name === OLD_FOLDER);
  if (old && !old.contents.length && !old.getSubfolders().length) await old.delete();

  ui.notifications.info(`Novaris: world map + ${CONTINENTS.length} continents ready in "${ROOT}".`);
})();
