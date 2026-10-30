/**
 * Create General Scenes — reusable mood scenes (no grid, no walls) for narration and roleplay in any campaign.
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use: Macro Directory → Create Macro → Type: "Script" → paste → Execute (GM only).
 *
 * What it does:
 *   Creates every scene in SCENES under 📁 General Scenes › <folder>, sized to its image, gridless, with token vision
 *   and fog off so players just see the picture. Images live in assets/scenes/<theme>/ (see FOUNDRY-STORAGE.md).
 *   Re-running skips scenes that already exist (matched by image path) — add a new line to SCENES and run again.
 */
(async () => {
  const ROOT = "General Scenes";
  // [scene name, sub-folder, image path, width, height]
  const SCENES = [
    ["Cozy Tavern (Afternoon)", "Tavern", "assets/scenes/Tavern/Cozy Tavern - Afternoon.jpg", 1376, 768]
  ];

  if (!game.user.isGM) return ui.notifications.error("GM only.");

  const folderOf = async (name, parent = null) =>
    game.folders.find(f => f.type === "Scene" && f.name === name && (f.folder?.id ?? null) === parent)
    ?? Folder.create({ name, type: "Scene", folder: parent });
  const root = await folderOf(ROOT);

  const have = new Set(game.scenes.map(s => s.initialLevel?.background?.src).filter(Boolean));
  const created = [];
  for (const [name, sub, src, width, height] of SCENES) {
    if (have.has(src)) continue;
    const folder = await folderOf(sub, root.id);
    const scene = await Scene.create({
      name, folder: folder.id, width, height, padding: 0,
      grid: { type: CONST.GRID_TYPES.GRIDLESS },
      tokenVision: false,
      fog: { exploration: false },
      environment: { globalLight: { enabled: true } },
      navigation: false
    });
    // v14 keeps the background on the scene's level (created automatically with the scene)
    await scene.initialLevel.update({ "background.src": src });
    try {
      const { thumb } = await scene.createThumbnail();
      await scene.update({ thumb });
    } catch (err) {
      console.warn(`${name} thumbnail skipped:`, err);
    }
    created.push(name);
  }
  ui.notifications.info(created.length ? `Created: ${created.join(", ")}` : "All general scenes already exist.");
})();
