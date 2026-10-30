/**
 * Archive Campaign Scenes — copy each campaign's scene folder into its own Scene compendium (nothing is deleted).
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   1. Run Localize-5etools-Images first, so the archived scenes point at local map files.
 *   2. Macro Directory → Create Macro → Type: "Script" → paste this file → Execute (GM only).
 *   3. Compendium Packs tab → one "<Campaign> — Scenes" pack per campaign below. Check them before deleting anything.
 *
 * What it does, per campaign folder in CAMPAIGNS:
 *   - Renames the old Waterdeep folder names (scenes + journals) to "Waterdeep: Dragon Heist & Dungeon of the Mad Mage".
 *   - Creates a world Scene compendium (or reuses it on a re-run), named like the folder.
 *   - Rebuilds the sub-folders inside it (Act / EP …). A folder deeper than the pack allows goes into its
 *     deepest allowed ancestor.
 *   - Copies every scene with its walls, lights, notes, tokens, tiles, levels, flags and thumbnail, keeping the
 *     scene's ID — so when a scene is imported back with "Keep Document IDs", links like @UUID[Scene.xxx] and
 *     its explored fog still work.
 *   - Scenes already in the pack (same ID) are updated, so re-running after changes refreshes the archive.
 *   The world scenes are left untouched.
 */
(async () => {
  const CAMPAIGNS = [
    "Waterdeep: Dragon Heist & Dungeon of the Mad Mage",
    "Phandelver and Below: The Shattered Obelisk",
    "Frozen Sick: The Plague Covenant",
    "Echoes of the Heroes"
  ];
  // Scene and journal folders renamed first (same names as Setup-Gilded-City uses)
  const RENAMES = {
    "Gilded City & Mad Depths": "Waterdeep: Dragon Heist & Dungeon of the Mad Mage",
    "Gilded City, Mad Depths": "Waterdeep: Dragon Heist & Dungeon of the Mad Mage",
    "Waterdeep: Heist & Dungeon": "Waterdeep: Dragon Heist & Dungeon of the Mad Mage"
  };
  const CHUNK = 5;                              // scenes per write; Waterdeep maps carry thousands of walls each

  const slug = name => "scenes-" + name.slugify({ strict: true }).slice(0, 40);

  try {
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");
    const report = [];

    for ( const folder of game.folders.filter(f => ["Scene", "JournalEntry"].includes(f.type) && RENAMES[f.name]) ) {
      const name = RENAMES[folder.name];
      const taken = game.folders.some(f => f.type === folder.type && f.name === name && f.folder?.id === folder.folder?.id);
      if ( !taken ) await folder.update({ name });
    }

    for ( const name of CAMPAIGNS ) {
      const root = game.folders.find(f => f.type === "Scene" && f.name === name && !f.folder);
      if ( !root ) { report.push(`${name}: folder not found, skipped`); continue; }

      // Pack
      const packName = slug(name);
      let pack = game.packs.get(`world.${packName}`);
      if ( !pack ) {
        pack = await foundry.documents.collections.CompendiumCollection.createCompendium({
          type: "Scene", label: `${name} — Scenes`, name: packName, packageType: "world"
        });
      }
      if ( pack.locked ) await pack.configure({ locked: false });
      await pack.getIndex();

      // Folders: same IDs as in the world, the campaign folder itself becomes the pack root
      const packFolderOf = new Map([[root.id, null]]);
      const folderData = [];
      const walk = (folder, packParent, depth) => {
        for ( const child of folder.getSubfolders() ) {
          if ( depth + 1 > pack.maxFolderDepth ) { packFolderOf.set(child.id, packParent); walk(child, packParent, depth); continue; }
          packFolderOf.set(child.id, child.id);
          folderData.push({ _id: child.id, name: child.name, type: "Scene", color: child.color, sorting: child.sorting,
            sort: child.sort, folder: packParent });
          walk(child, child.id, depth + 1);
        }
      };
      walk(root, null, 0);
      const newFolders = folderData.filter(f => !pack.folders.has(f._id));
      if ( newFolders.length ) await Folder.implementation.createDocuments(newFolders, { pack: pack.collection, keepId: true });

      // Scenes
      const scenes = game.scenes.filter(s => packFolderOf.has(s.folder?.id));
      let created = 0, updated = 0;
      for ( let i = 0; i < scenes.length; i += CHUNK ) {
        const toCreate = [], toUpdate = [];
        for ( const scene of scenes.slice(i, i + CHUNK) ) {
          // clearOwnership would also strip each drawing's author, and a drawing without one is dropped
          const data = scene.toCompendium(pack, { keepId: true, clearSort: false, clearOwnership: false });
          data.folder = packFolderOf.get(scene.folder.id);
          (pack.index.has(scene.id) ? toUpdate : toCreate).push(data);
        }
        if ( toCreate.length ) await Scene.implementation.createDocuments(toCreate, { pack: pack.collection, keepId: true });
        if ( toUpdate.length ) await Scene.implementation.updateDocuments(toUpdate, { pack: pack.collection, diff: false, recursive: false });
        created += toCreate.length; updated += toUpdate.length;
        const done = Math.min(i + CHUNK, scenes.length);
        foundry.applications.ui.SceneNavigation.displayProgressBar({ label: `${name}: ${done}/${scenes.length}`,
          pct: Math.round(done / scenes.length * 100) });
      }
      report.push(`${name}: ${scenes.length} scenes (${created} new, ${updated} updated), ${folderData.length} folders → ${pack.collection}`);
    }

    const msg = `Archive Campaign Scenes — nothing was deleted.\n${report.join("\n")}`;
    console.log(msg);
    ui.notifications.info(report.join(" | "), { permanent: true });
  } catch (err) {
    console.error(err);
    ui.notifications.error(`Archive Campaign Scenes failed: ${err.message}`);
  }
})();
