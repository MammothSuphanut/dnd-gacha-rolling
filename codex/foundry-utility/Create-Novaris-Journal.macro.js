/**
 * Create Novaris Journal — GM-only lore journals + map pins from the Novaris place files.
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   1. Build the data from the repo (once per change to the .md files), for each continent
 *      (aldenreich, eldmere, shenzhou, suvarna, voxaria, seas):
 *        python world-settings/novaris/tools/build_foundry_journal.py aldenreich "D:/FoundryVTT_Data/Data/assets/world/novaris/journal"
 *   2. Macro Directory → Create Macro → Type: "Script" → paste this file → Execute (GM only).
 *
 * What it does, per continent in CONTINENTS:
 *   - Journal folders mirror the lore folders: 📁 Novaris › 📁 <Continent> › 📁 <Region> (› 📁 <Sub-region>).
 *   - One journal entry per .md file (overviews included), one text page each. Ownership: GM only,
 *     so players never see the entries or their pins.
 *   - Pins (map notes) on the world scene "Novaris" and on the continent scene, icon by place type,
 *     and the same pins on their "(Player)" copies.
 *     Country labels get an extra shield pin that opens the country's entry; the continent name opens
 *     the continent overview. Sea pins also go on each continent scene that shows them.
 *     Pins outside a scene's map area are skipped on that scene.
 *     Places with no position on the map get an entry but no pin (listed in the console).
 *   Re-running is safe: entries are matched by their file path (flag), their page is overwritten with
 *   the repo text, and this continent's pins are rebuilt. Edit lore in the repo, not in Foundry.
 */
(async () => {
  const DATA_DIR = "assets/world/novaris/journal";
  const IMG_DIR = "assets/world/novaris/atlas";
  // "seas" spans the whole world, so it has no continent scene of its own (see the pin loop)
  const CONTINENTS = ["aldenreich", "eldmere", "shenzhou", "suvarna", "voxaria", "seas"];
  const ROOT_FOLDER = "Novaris";
  // Scenes the pins go on: image = background that identifies the scene, box = Azgaar map area it shows.
  // Icon/font sizes follow each image's scale (world ×9, continents ×18 or ×27) so pins look the same size.
  const WORLD_SCENE = { name: "Novaris", image: `${IMG_DIR}/novaris-v3-atlas.webp`, box: [0, 0, 1800, 1200], iconSize: 32, fontSize: 14 };
  const CONTINENT_SCENES = {
    aldenreich: { name: "Aldenreich", image: `${IMG_DIR}/novaris-v3-aldenreich.webp`, box: [1045, 44, 1800, 807], iconSize: 48, fontSize: 20 },
    eldmere: { name: "Eldmere", image: `${IMG_DIR}/novaris-v3-eldmere.webp`, box: [1275, 958, 1799, 1163], iconSize: 72, fontSize: 30 },
    shenzhou: { name: "Shenzhou", image: `${IMG_DIR}/novaris-v3-shenzhou.webp`, box: [30, 105, 639, 719], iconSize: 48, fontSize: 20 },
    suvarna: { name: "Suvarna", image: `${IMG_DIR}/novaris-v3-suvarna.webp`, box: [20, 697, 769, 1198], iconSize: 48, fontSize: 20 },
    voxaria: { name: "Voxaria", image: `${IMG_DIR}/novaris-v3-voxaria.webp`, box: [650, 240, 1137, 827], iconSize: 72, fontSize: 30 }
  };
  // Player copy of each scene (Create-Novaris-Scene) gets the same pins
  const PLAYER = def => ({ ...def, name: `${def.name} (Player)`, image: def.image.replace(".webp", "-player.webp") });
  const FLAG = "world"; // getFlag only accepts a registered scope; keys are prefixed instead

  if (!game.user.isGM) return ui.notifications.error("GM only.");

  const findFolder = (name, parentId) =>
    game.folders.find(f => f.type === "JournalEntry" && f.name === name && (f.folder?.id ?? null) === parentId);
  const ensureFolder = async (name, parentId = null) =>
    findFolder(name, parentId) ?? Folder.create({ name, type: "JournalEntry", folder: parentId });
  const findScene = def => game.scenes.find(s => s.name === def.name && s.initialLevel?.background?.src === def.image);

  const root = await ensureFolder(ROOT_FOLDER);

  for (const continent of CONTINENTS) {
    const res = await fetch(`${DATA_DIR}/${continent}.json`, { cache: "no-store" });
    if (!res.ok) { ui.notifications.error(`Missing ${DATA_DIR}/${continent}.json — run the build script first.`); continue; }
    const data = await res.json();

    // Folders (parents come before children in the data)
    const folderIds = {};
    for (const f of data.folders) {
      const parentId = f.parent ? folderIds[f.parent] : root.id;
      folderIds[f.key] = (await ensureFolder(f.name, parentId)).id;
    }

    // Entries
    const entryIds = {};
    for (const e of data.entries) {
      let entry = game.journal.find(j => j.getFlag(FLAG, "novarisKey") === e.key);
      const base = {
        name: e.name,
        folder: folderIds[e.folder],
        ownership: { default: CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE },
        flags: { [FLAG]: { novarisKey: e.key, novarisContinent: continent } }
      };
      if (!entry) {
        entry = await JournalEntry.create({ ...base, pages: [{ name: e.name, type: "text", text: { content: e.html } }] });
      } else {
        await entry.update(base);
        // the overview page — a city's place pages (Create-Novaris-City) are left alone
        const page = entry.pages.find(p => !p.getFlag(FLAG, "novarisPlace")) ?? null;
        if (page) await page.update({ name: e.name, "text.content": e.html });
        else await entry.createEmbeddedDocuments("JournalEntryPage", [{ name: e.name, type: "text", text: { content: e.html } }]);
      }
      entryIds[e.key] = entry.id;
    }

    const known = new Set(data.entries.map(e => e.key));
    const orphans = game.journal.filter(j => j.getFlag(FLAG, "novarisContinent") === continent && !known.has(j.getFlag(FLAG, "novarisKey")));
    if (orphans.length) console.warn(`Novaris ${continent}: entries whose .md file is gone (not deleted):`, orphans.map(j => j.name));

    // Pins: rebuild this continent's notes on each scene
    // Seas lie between continents: their pins go on every continent scene that shows them
    const scenes = continent === "seas" ? Object.values(CONTINENT_SCENES) : [CONTINENT_SCENES[continent]];
    for (const def of [WORLD_SCENE, ...scenes].filter(Boolean).flatMap(d => [d, PLAYER(d)])) {
      const scene = findScene(def);
      if (!scene) { ui.notifications.warn(`Scene "${def.name}" not found — pins skipped.`); continue; }
      const old = scene.notes.filter(n => n.getFlag(FLAG, "novarisContinent") === continent).map(n => n.id);
      if (old.length) await scene.deleteEmbeddedDocuments("Note", old);

      const d = scene.dimensions;
      const [x0, y0, x1, y1] = def.box;
      const sx = d.sceneWidth / (x1 - x0), sy = d.sceneHeight / (y1 - y0);
      // Each entry: its own pin, plus extra pins (country labels) that open the same entry
      const notes = data.entries.flatMap(e => [
        e.pin && { ...e.pin, text: e.name, icon: e.icon, tint: e.tint },
        ...(e.extraPins ?? []).map(p => ({ ...p, text: p.name }))
      ].filter(p => p && p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1).map(p => ({
        entryId: entryIds[e.key],
        x: Math.round(d.sceneX + (p.x - x0) * sx),
        y: Math.round(d.sceneY + (p.y - y0) * sy),
        texture: { src: p.icon, tint: p.tint },
        iconSize: def.iconSize,
        text: p.text,
        fontSize: def.fontSize,
        textAnchor: CONST.TEXT_ANCHOR_POINTS.BOTTOM,
        flags: { [FLAG]: { novarisKey: e.key, novarisContinent: continent } }
      })));
      await scene.createEmbeddedDocuments("Note", notes);
    }

    const unpinned = data.entries.filter(e => !e.pin).map(e => e.name);
    console.log(`Novaris ${continent}: ${data.entries.length} entries, ${data.entries.length - unpinned.length} pinned. No pin:`, unpinned);
    ui.notifications.info(`Novaris ${continent}: ${data.entries.length} journal entries, ${data.entries.length - unpinned.length} pins.`);
  }
})();
