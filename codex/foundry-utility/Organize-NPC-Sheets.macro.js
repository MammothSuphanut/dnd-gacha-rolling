/**
 * Organize NPC Sheets — move NPCs from the old "Creatures › Type › Campaign" folders
 * into the Bestiary (generic, by creature type) / Dramatis Personae (unique, by region) layout.
 * For Foundry VTT v14 + D&D 5e system 5.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *   3. A dialog lists every NPC under SOURCE_FOLDER. For each one pick:
 *        Bestiary  → filed under  Bestiary › <creature type>
 *        Personae  → filed under  Dramatis Personae › <Region> › <Place>
 *        Skip      → left untouched
 *      Region is typed as a path with "/" (e.g. "Wildemount/Aeorian Ruins").
 *      The default guess: linked token (actorLink) = Personae, otherwise Bestiary;
 *      default region = the NPC's old campaign folder name, so it's easy to spot what to rename.
 *
 * TARGET:
 *   "world"      → just moves the actors into new world folders (safe, undo = move back).
 *   "compendium" → copies them into two world compendiums (created if missing).
 *                  Originals are only deleted if DELETE_ORIGINALS = true.
 *                  ⚠ Deleting breaks linked tokens already placed on scenes and any
 *                    macro that looks the actor up in game.actors (e.g. Isus.macro.js).
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const SOURCE_FOLDER = "Creatures";
  const TARGET = "world";            // "world" | "compendium"
  const DELETE_ORIGINALS = false;    // compendium mode only
  const SKIP_DUPLICATES = true;      // skip if a same-named actor already sits in the destination folder
  const BESTIARY = "Bestiary";
  const PERSONAE = "Dramatis Personae";
  const WORLD_PREFIX = "Exandria+";  // compendium labels become "Exandria+ Bestiary" etc.

  try {
    if ( game.system.id !== "dnd5e" ) return ui.notifications.error("This macro requires the D&D 5e system.");
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    const root = game.folders.find(f => (f.type === "Actor") && (f.name === SOURCE_FOLDER) && !f.folder);
    if ( !root ) return ui.notifications.error(`Couldn't find a top-level Actor folder named "${SOURCE_FOLDER}".`);

    /* ------------------------------------------------------------------ */
    /*  Helpers                                                           */
    /* ------------------------------------------------------------------ */
    const esc = s => Handlebars.escapeExpression(s ?? "");
    const MAX_DEPTH = CONST.FOLDER_MAX_DEPTH ?? 4;

    const typeLabel = actor => {
      const t = actor.system.details?.type ?? {};
      if ( t.value === "custom" || !t.value ) return t.custom?.trim() || "Other";
      const cfg = CONFIG.DND5E.creatureTypes?.[t.value];
      const label = cfg?.label ?? cfg;
      return (typeof label === "string") ? game.i18n.localize(label) : t.value.capitalize();
    };

    // Path of folder names below the source root, e.g. ["Undead", "Aeorian Cataclysm"]
    const oldPath = actor => {
      const names = [];
      for ( let f = actor.folder; f && f.id !== root.id; f = f.folder ) names.unshift(f.name);
      return names;
    };

    const npcs = [root, ...root.getSubfolders(true)]
      .flatMap(f => f.contents)
      .filter(a => a.type === "npc")
      .sort((a, b) => a.name.localeCompare(b.name));
    if ( !npcs.length ) return ui.notifications.warn(`No NPCs found under "${SOURCE_FOLDER}".`);

    /* ------------------------------------------------------------------ */
    /*  Dialog                                                            */
    /* ------------------------------------------------------------------ */
    const rows = npcs.map(a => {
      const path = oldPath(a);
      const unique = a.prototypeToken.actorLink;
      const region = path.length > 1 ? path.at(-1) : "";
      return `<tr>
        <td><img src="${esc(a.img)}" width="28" height="28" style="border:none;vertical-align:middle"> ${esc(a.name)}</td>
        <td style="opacity:.7">${esc(path.join(" › "))}</td>
        <td><select name="dest-${a.id}">
          <option value="bestiary" ${unique ? "" : "selected"}>Bestiary (${esc(typeLabel(a))})</option>
          <option value="personae" ${unique ? "selected" : ""}>Personae</option>
          <option value="skip">Skip</option>
        </select></td>
        <td><input type="text" name="region-${a.id}" value="${esc(region)}" placeholder="Region/Place"></td>
      </tr>`;
    }).join("");

    const content = `
      <p>${npcs.length} NPCs under <b>${esc(SOURCE_FOLDER)}</b> · target: <b>${TARGET}</b>
      ${TARGET === "compendium" && DELETE_ORIGINALS ? ` · <b style="color:#c33">originals will be DELETED</b>` : ""}</p>
      <p style="opacity:.7">Region is only used for Personae. Use "/" for sub-folders, e.g. <code>Wildemount/Aeorian Ruins</code>.</p>
      <div style="max-height:60vh;overflow:auto">
        <table><thead><tr><th>NPC</th><th>Old folder</th><th>Destination</th><th>Region</th></tr></thead>
        <tbody>${rows}</tbody></table>
      </div>`;

    const choices = await foundry.applications.api.DialogV2.wait({
      window: { title: "Organize NPC Sheets" },
      position: { width: 900 },
      content,
      buttons: [
        {
          action: "go", label: "Move", icon: "fa-solid fa-folder-tree", default: true,
          callback: (event, button) => {
            const form = button.form.elements;
            return npcs.map(a => ({
              actor: a,
              dest: form[`dest-${a.id}`].value,
              region: form[`region-${a.id}`].value
            }));
          }
        },
        { action: "cancel", label: "Cancel", icon: "fa-solid fa-xmark" }
      ],
      rejectClose: false
    });
    if ( !Array.isArray(choices) ) return;

    /* ------------------------------------------------------------------ */
    /*  Destination (world folders or compendium packs)                   */
    /* ------------------------------------------------------------------ */
    const getPack = async label => {
      const full = `${WORLD_PREFIX} ${label}`.trim();
      let pack = game.packs.find(p => (p.documentName === "Actor") && (p.metadata.label === full));
      if ( !pack ) pack = await foundry.documents.collections.CompendiumCollection.createCompendium({ label: full, type: "Actor" });
      if ( pack.locked ) await pack.configure({ locked: false });
      await pack.getIndex({ fields: ["folder"] });
      return pack;
    };
    const packs = TARGET === "compendium"
      ? { bestiary: await getPack(BESTIARY), personae: await getPack(PERSONAE) }
      : null;

    // Find-or-create a folder chain; returns the deepest folder id (or null at the root).
    const ensureFolders = async (names, pack) => {
      let parent = null;
      for ( const name of names.slice(0, MAX_DEPTH) ) {
        const pool = pack ? pack.folders : game.folders.filter(f => f.type === "Actor");
        let folder = pool.find(f => (f.name === name) && ((f.folder?.id ?? null) === parent));
        if ( !folder ) {
          folder = await Folder.implementation.create(
            { name, type: "Actor", folder: parent, sorting: "a" },
            pack ? { pack: pack.collection } : {}
          );
        }
        parent = folder.id;
      }
      return parent;
    };

    const alreadyThere = (name, folderId, pack) => pack
      ? pack.index.some(i => (i.name === name) && ((i.folder ?? null) === folderId))
      : game.actors.some(a => (a.name === name) && ((a.folder?.id ?? null) === folderId));

    /* ------------------------------------------------------------------ */
    /*  Move                                                              */
    /* ------------------------------------------------------------------ */
    const done = [], skipped = [];
    for ( const { actor, dest, region } of choices ) {
      if ( dest === "skip" ) continue;
      const regionPath = region.split("/").map(s => s.trim()).filter(Boolean);
      const names = dest === "bestiary"
        ? [BESTIARY, typeLabel(actor)]
        : [PERSONAE, ...(regionPath.length ? regionPath : ["_Unsorted"])];
      const pack = packs?.[dest] ?? null;
      // In a compendium the pack itself is the top level, so drop the Bestiary/Personae folder.
      const folderId = await ensureFolders(pack ? names.slice(1) : names, pack);

      if ( SKIP_DUPLICATES && alreadyThere(actor.name, folderId, pack) && (pack || actor.folder?.id !== folderId) ) {
        skipped.push(actor.name);
        continue;
      }

      if ( !pack ) {
        await actor.update({ folder: folderId });
      } else {
        const data = actor.toCompendium(pack);
        data.folder = folderId;
        await Actor.implementation.create(data, { pack: pack.collection });
        if ( DELETE_ORIGINALS ) await actor.delete();
      }
      done.push(actor.name);
    }

    if ( packs ) for ( const p of Object.values(packs) ) await p.configure({ locked: true });

    const msg = `Moved ${done.length} NPC(s)` + (skipped.length ? `, skipped ${skipped.length} duplicate(s)` : "") + ".";
    ui.notifications.info(msg);
    console.log("Organize NPC Sheets |", { moved: done, skippedDuplicates: skipped });
  } catch ( err ) {
    console.error(err);
    ui.notifications.error(`Organize NPC Sheets failed: ${err.message}`);
  }
})();
