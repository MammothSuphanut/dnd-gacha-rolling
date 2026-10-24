/**
 * Create Novaris City — a city's map scene (one Level per floor) + a journal page per place, with a pin on the map
 * that opens that page. For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   1. Run Create-Novaris-Journal first (the city's journal entry must exist — this macro only adds to it).
 *   2. Build the data from the repo (once per change to the city's lore or map):
 *        python world-settings/novaris/tools/build_foundry_city.py twinhold
 *      It writes <city>.json next to the city's map images, in World_Setting/Novaris/<Continent>/<Region>/<City>/.
 *   3. Macro Directory → Create Macro → Type: "Script" → paste this file → set CITY below → Execute (GM only).
 *
 * What it does:
 *   - Scenes: 📁 Novaris › 📁 <Continent> › 📁 <Region> › 📁 <City> › 🗺 <City>, one Level per floor (top floor
 *     first), each with its own map image; square grid as in the data. Never activated.
 *     Visibility as the user set it (2026-10-24): token vision on, individual fog of war (black unexplored and
 *     explored colour), darkness 0.5 with global illumination on (threshold 1, so it never switches off).
 *   - Journal: the city's entry moves into 📁 Novaris › … › 📁 <City> (same names as the scene folders); one page per
 *     place after the overview page. GM only, like every Novaris entry.
 *   - Pins: one per place, on its floor's Level, opening its page. "Every floor" places get a pin on each Level.
 *   - Lights: an Ambient Light on its floor's Level for every lantern, fire, lava spot and forge in the data
 *     (find_city_lights.py), styled by kind (LIGHTS below).
 *   Re-running is safe: the scene and pages are matched by flags and updated, this city's pins and lights are rebuilt, the
 *   overview page is left to Create-Novaris-Journal. Edit lore in the repo, not in Foundry.
 */
(async () => {
  const CITY = { key: "twinhold", path: "Aldenreich/Gråmark/Twinhold" };
  const DATA = `worlds/astral-nexus-constellation-protocol/World_Setting/Novaris/${CITY.path}/${CITY.key}.json`;
  const ICON_SIZE = 64, FONT_SIZE = 22;
  // Light per kind (radii in ft): house lanterns small and soft, open fires flicker, lava and the forge glow wide and red
  const LIGHTS = {
    lantern: { dim: 15, bright: 5, color: "#ffb050", alpha: 0.35, animation: { type: "torch", speed: 2, intensity: 2 } },
    fire: { dim: 30, bright: 10, color: "#ff9a3a", alpha: 0.45, animation: { type: "torch", speed: 3, intensity: 4 } },
    lava: { dim: 40, bright: 15, color: "#ff4a00", alpha: 0.5, animation: { type: "pulse", speed: 1, intensity: 3 } },
    forge: { dim: 50, bright: 20, color: "#ff7a1a", alpha: 0.5, animation: { type: "torch", speed: 2, intensity: 3 } }
  };
  const FLAG = "world"; // getFlag only accepts a registered scope; keys are prefixed instead

  if (!game.user.isGM) return ui.notifications.error("GM only.");
  const res = await fetch(DATA, { cache: "no-store" });
  if (!res.ok) return ui.notifications.error(`Missing ${DATA} — run build_foundry_city.py first.`);
  const data = await res.json();

  for (const lv of data.scene.levels) {
    const img = await fetch(lv.image, { method: "HEAD" });
    if (!img.ok) return ui.notifications.error(`Map image missing: ${lv.image}`);
  }
  const entry = game.journal.find(j => j.getFlag(FLAG, "novarisKey") === data.entry);
  if (!entry) return ui.notifications.error(`No journal entry for ${data.entry} — run Create-Novaris-Journal first.`);

  // Folders: the same path in Scenes and in Journal (4 levels — Foundry's limit)
  const ensurePath = async type => {
    let parent = null;
    for (const name of data.folders) {
      const found = game.folders.find(f => f.type === type && f.name === name && (f.folder?.id ?? null) === (parent?.id ?? null));
      parent = found ?? await Folder.create({ name, type, folder: parent?.id ?? null });
    }
    return parent;
  };
  const sceneFolder = await ensurePath("Scene");
  const journalFolder = await ensurePath("JournalEntry");

  // Scene: one Level per floor, matched by name so re-runs keep their ids (and the pins on them)
  const s = data.scene;
  const sceneData = {
    name: s.name, folder: sceneFolder.id, width: s.width, height: s.height, padding: 0.1,
    grid: { type: CONST.GRID_TYPES.SQUARE, size: s.gridSize, distance: s.distance, units: "ft", alpha: 0.15 },
    tokenVision: true, navigation: false,
    fog: { mode: CONST.FOG_EXPLORATION_MODES.INDIVIDUAL, colors: { unexplored: "#000000", explored: "#000000" } },
    environment: { darknessLevel: 0.5, globalLight: { enabled: true, darkness: { max: 1 } } },
    flags: { [FLAG]: { novarisCity: data.city } }
  };
  let scene = game.scenes.find(sc => sc.getFlag(FLAG, "novarisCity") === data.city);
  if (scene) await scene.update(sceneData);
  else scene = await Scene.create(sceneData);

  const levelIds = [];
  for (const [i, lv] of s.levels.entries()) {
    const levelData = { name: lv.name, elevation: { bottom: lv.bottom, top: lv.top }, background: { src: lv.image } };
    // a new scene comes with one empty Level: the first floor takes it
    let level = scene.levels.find(l => l.name === lv.name) ?? (i === 0 && scene.levels.size === 1 && !scene.firstLevel.background?.src ? scene.firstLevel : null);
    if (level) await level.update(levelData);
    else [level] = await scene.createEmbeddedDocuments("Level", [levelData]);
    levelIds.push(level.id);
  }
  await scene.update({ initialLevel: levelIds[0] });

  // Journal: move the entry into the city folder, one page per place after the overview
  await entry.update({ folder: journalFolder.id });
  const overview = entry.pages.find(p => !p.getFlag(FLAG, "novarisPlace"));
  if (overview) await overview.update({ sort: 0 });
  const pageIds = {};
  for (const p of data.pages) {
    const pageData = { name: p.name, type: "text", sort: p.sort * 100, text: { content: p.html },
                       flags: { [FLAG]: { novarisPlace: p.key } } };
    let page = entry.pages.find(pg => pg.getFlag(FLAG, "novarisPlace") === p.key);
    if (page) await page.update(pageData);
    else [page] = await entry.createEmbeddedDocuments("JournalEntryPage", [pageData]);
    pageIds[p.key] = page.id;
  }
  const known = new Set(data.pages.map(p => p.key));
  const stale = entry.pages.filter(pg => pg.getFlag(FLAG, "novarisPlace") && !known.has(pg.getFlag(FLAG, "novarisPlace")));
  if (stale.length) console.warn(`${s.name}: pages for places no longer in the lore (not deleted):`, stale.map(pg => pg.name));

  // Pins: rebuild this city's notes, each on its floor's Level
  const old = scene.notes.filter(n => n.getFlag(FLAG, "novarisCity") === data.city).map(n => n.id);
  if (old.length) await scene.deleteEmbeddedDocuments("Note", old);
  const d = scene.dimensions;
  const notes = data.pages.filter(p => p.pin).flatMap(p => p.levels.map(n => ({
    entryId: entry.id,
    pageId: pageIds[p.key],
    x: Math.round(d.sceneX + p.pin.x),
    y: Math.round(d.sceneY + p.pin.y),
    levels: [levelIds[n - 1]],
    elevation: s.levels[n - 1].bottom,
    texture: { src: p.icon, tint: p.tint },
    iconSize: ICON_SIZE,
    text: p.name,
    fontSize: FONT_SIZE,
    textAnchor: CONST.TEXT_ANCHOR_POINTS.BOTTOM,
    flags: { [FLAG]: { novarisCity: data.city, novarisPlace: p.key } }
  })));
  await scene.createEmbeddedDocuments("Note", notes);

  // Lights: rebuild this city's ambient lights, each on its floor's Level
  const oldLights = scene.lights.filter(l => l.getFlag(FLAG, "novarisCity") === data.city).map(l => l.id);
  if (oldLights.length) await scene.deleteEmbeddedDocuments("AmbientLight", oldLights);
  const lights = (data.lights ?? []).filter(l => LIGHTS[l.kind]).map(l => ({
    x: Math.round(d.sceneX + l.x),
    y: Math.round(d.sceneY + l.y),
    levels: [levelIds[l.level - 1]],
    elevation: s.levels[l.level - 1].bottom,
    config: LIGHTS[l.kind],
    flags: { [FLAG]: { novarisCity: data.city, novarisLight: l.kind } }
  }));
  for (let i = 0; i < lights.length; i += 200) await scene.createEmbeddedDocuments("AmbientLight", lights.slice(i, i + 200));

  try {
    const { thumb } = await scene.createThumbnail();
    await scene.update({ thumb });
  } catch (err) {
    console.warn(`${s.name} thumbnail skipped:`, err);
  }
  ui.notifications.info(`${s.name}: ${s.levels.length} floors, ${data.pages.length} place pages, ${notes.length} pins, ${lights.length} lights.`);
})();
