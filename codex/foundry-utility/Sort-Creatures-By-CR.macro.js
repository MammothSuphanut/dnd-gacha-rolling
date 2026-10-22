/**
 * Sort Creatures by CR — rebuild each root folder into "<Root> › <Type> › <CR band>".
 * For Foundry VTT v14 + D&D 5e system 5.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *   3. A preview shows how many NPCs land in each Type › CR band, per root. Confirm to apply.
 *
 * What it does (per entry in ROOTS):
 *   - Every NPC anywhere under the root is filed by its creature type (read from the sheet,
 *     not from the folder it's in now), then into a CR band sub-folder.
 *   - allTypes:   every standard creature type (+ "Other") gets a folder, even with no NPCs yet.
 *   - Colors: each type folder gets the color of the same type under COLOR_FROM (fallback TYPE_COLORS),
 *     and its CR band folders share that color.
 *   - emptyBands: every split type gets all CR band folders, even empty ones.
 *   - splitMin:   types with fewer NPCs than this skip the CR sub-folders (0 = always split).
 *   - FILL_SOURCE: before leaving an old book folder (e.g. "Phandelver and Below: ..."),
 *     the folder name is written into the sheet's Source → Book field, if that field is empty.
 *     Folders starting with "_" (e.g. "_Core", "_Unsorted") are not treated as book names.
 *   - DELETE_EMPTY_FOLDERS: old folders left completely empty are removed.
 *     Folders that still hold anything are never touched. No actor is ever deleted.
 *   Re-running is safe: NPCs already in the right place just stay there.
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const ROOTS = [
    { name: "Creatures",                    allTypes: true,  emptyBands: true,  splitMin: 0 },
    { name: "Exandria+ Unique NPCs",        allTypes: true,  emptyBands: true,  splitMin: 0 },
    { name: "Forgotten Realms Unique NPCs", allTypes: true,  emptyBands: true,  splitMin: 0 }
  ];
  // Type folder colors are copied from COLOR_FROM's type folders; TYPE_COLORS fills any gap.
  // CR band folders take their type's color.
  const COLOR_FROM = "Creatures";
  const TYPE_COLORS = {
    Aberration: "#8a2be2", Beast: "#2e8b57", Celestial: "#ffd700", Construct: "#708090",
    Dragon: "#dc143c", Elemental: "#00ced1", Fey: "#ff69b4", Fiend: "#8b0000",
    Giant: "#a0522d", Humanoid: "#f4a460", Monstrosity: "#d2691e", Ooze: "#32cd32",
    Plant: "#228b22", Undead: "#4b0082", Other: "#696969"
  };
  const BANDS = [                      // [label, max CR inclusive]
    ["CR 0-4", 4],
    ["CR 5-10", 10],
    ["CR 11-16", 16],
    ["CR 17-20", 20],
    ["CR 21+", Infinity]
  ];
  const UNKNOWN_CR = "CR ?";
  const FILL_SOURCE = true;
  const DELETE_EMPTY_FOLDERS = true;

  try {
    if ( game.system.id !== "dnd5e" ) return ui.notifications.error("This macro requires the D&D 5e system.");
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    /* ------------------------------------------------------------------ */
    /*  Helpers                                                           */
    /* ------------------------------------------------------------------ */
    const esc = s => Handlebars.escapeExpression(s ?? "");
    const bandOrder = [...BANDS.map(b => b[0]), UNKNOWN_CR];
    const bandNames = new Set(bandOrder);

    const typeLabel = actor => {
      const t = actor.system.details?.type ?? {};
      if ( t.value === "custom" || !t.value ) return t.custom?.trim() || "Other";
      const cfg = CONFIG.DND5E.creatureTypes?.[t.value];
      const label = cfg?.label ?? cfg;
      return (typeof label === "string") ? game.i18n.localize(label) : t.value.capitalize();
    };
    const standardTypes = Object.keys(CONFIG.DND5E.creatureTypes ?? {})
      .map(value => typeLabel({ system: { details: { type: { value } } } }))
      .concat("Other");

    const bandOf = actor => {
      const cr = Number(actor.system.details?.cr);
      if ( (actor.system.details?.cr == null) || Number.isNaN(cr) ) return UNKNOWN_CR;
      return BANDS.find(([, max]) => cr <= max)[0];
    };

    const childFolders = parent => game.folders.filter(f => (f.type === "Actor") && (f.folder?.id === parent.id));

    const hex = c => (c == null) ? null : String(c.css ?? c).toLowerCase();
    const colorRoot = game.folders.find(f => (f.type === "Actor") && (f.name === COLOR_FROM) && !f.folder);
    const colorOf = type => {
      const src = colorRoot && childFolders(colorRoot).find(c => c.name.toLowerCase() === type.toLowerCase());
      const fallback = Object.entries(TYPE_COLORS).find(([k]) => k.toLowerCase() === type.toLowerCase())?.[1];
      return hex(src?.color) ?? fallback ?? null;
    };
    const ensureColor = async (folder, color) => {
      if ( color && (hex(folder.color) !== color) ) await folder.update({ color });
    };

    /* ------------------------------------------------------------------ */
    /*  Plan each root                                                    */
    /* ------------------------------------------------------------------ */
    const plans = [];
    const missing = [];
    for ( const cfg of ROOTS ) {
      const root = game.folders.find(f => (f.type === "Actor") && (f.name === cfg.name) && !f.folder);
      if ( !root ) { missing.push(cfg.name); continue; }

      const oldFolders = root.getSubfolders(true);
      const npcs = [root, ...oldFolders].flatMap(f => f.contents).filter(a => a.type === "npc");
      const typeNames = new Set(npcs.map(a => typeLabel(a).toLowerCase()));

      // Nearest folder name between the actor and the root that looks like a book (not a type/band/"_" folder)
      const bookOf = actor => {
        for ( let f = actor.folder; f && f.id !== root.id; f = f.folder ) {
          if ( typeNames.has(f.name.toLowerCase()) || bandNames.has(f.name) || f.name.startsWith("_") ) continue;
          return f.name;
        }
        return null;
      };

      const perType = new Map();
      for ( const a of npcs ) {
        const p = { actor: a, type: typeLabel(a), band: bandOf(a), book: (FILL_SOURCE && !a.system.source?.book) ? bookOf(a) : null };
        if ( !perType.has(p.type) ) perType.set(p.type, []);
        perType.get(p.type).push(p);
      }
      if ( cfg.allTypes ) for ( const label of standardTypes ) {
        if ( ![...perType.keys()].some(k => k.toLowerCase() === label.toLowerCase()) ) perType.set(label, []);
      }
      const splitTypes = new Set([...perType.entries()].filter(([, list]) => list.length >= cfg.splitMin).map(([t]) => t));
      for ( const [type, list] of perType ) if ( !splitTypes.has(type) ) list.forEach(p => p.band = null);

      plans.push({ cfg, root, oldFolders, perType, splitTypes, count: npcs.length });
    }
    if ( !plans.length ) return ui.notifications.error(`None of the root folders were found: ${missing.join(", ")}`);

    /* ------------------------------------------------------------------ */
    /*  Preview                                                           */
    /* ------------------------------------------------------------------ */
    const previewTable = ({ cfg, perType, splitTypes, count }) => {
      const rows = [...perType.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([type, list]) => {
        const cells = bandOrder.map(b => {
          const n = list.filter(p => p.band === b).length;
          return `<td style="text-align:center;${n ? "" : "opacity:.3"}">${n || "–"}</td>`;
        }).join("");
        const note = splitTypes.has(type) ? "" : ` <i style="opacity:.6">(no split)</i>`;
        return `<tr><td><b>${esc(type)}</b>${note}</td>${cells}<td style="text-align:center">${list.length}</td></tr>`;
      }).join("");
      const fills = [...perType.values()].flat().filter(p => p.book).length;
      return `
        <h3>${esc(cfg.name)} — ${count} NPCs</h3>
        <table>
          <thead><tr><th>Type</th>${bandOrder.map(b => `<th>${esc(b)}</th>`).join("")}<th>Total</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <p style="opacity:.75;font-size:.9em">
          ${cfg.emptyBands ? `All ${BANDS.length} CR folders under ${splitTypes.size} type(s), even empty ones.` : "Only CR folders with NPCs in them."}
          ${fills ? ` · Source → Book filled for ${fills} NPC(s).` : ""}
        </p>`;
    };

    const ok = await foundry.applications.api.DialogV2.confirm({
      window: { title: "Sort Creatures by CR" },
      position: { width: 760 },
      content: `
        <div style="max-height:65vh;overflow:auto">${plans.map(previewTable).join("")}</div>
        ${missing.length ? `<p style="color:#c55">Not found, skipped: ${esc(missing.join(", "))}</p>` : ""}
        <p>${DELETE_EMPTY_FOLDERS ? "Old folders left empty afterwards will be removed." : "Old folders are kept."}</p>`
    });
    if ( !ok ) return;

    /* ------------------------------------------------------------------ */
    /*  Apply each root                                                   */
    /* ------------------------------------------------------------------ */
    let moved = 0, bandCount = 0, filled = 0, removed = 0;
    for ( const { cfg, root, oldFolders, perType, splitTypes } of plans ) {
      const typeFolders = new Map();
      for ( const type of perType.keys() ) {
        let f = childFolders(root).find(c => c.name.toLowerCase() === type.toLowerCase());
        const color = colorOf(type);
        f ??= await Folder.implementation.create({ name: type, type: "Actor", folder: root.id, sorting: "m", color });
        // Manual sorting so the CR bands show in order instead of alphabetically ("CR 11" before "CR 5")
        if ( f.sorting !== "m" ) await f.update({ sorting: "m" });
        await ensureColor(f, color);
        typeFolders.set(type, f);
      }

      const bandFolders = new Map();
      const getBandFolder = async (type, band) => {
        const key = `${type}::${band}`;
        if ( bandFolders.has(key) ) return bandFolders.get(key);
        const parent = typeFolders.get(type);
        const color = hex(parent.color);
        let f = childFolders(parent).find(c => c.name === band);
        f ??= await Folder.implementation.create({
          name: band, type: "Actor", folder: parent.id, sorting: "a",
          color, sort: (bandOrder.indexOf(band) + 1) * 100000
        });
        await ensureColor(f, color);
        bandFolders.set(key, f);
        return f;
      };
      if ( cfg.emptyBands ) {
        for ( const type of splitTypes ) for ( const [band] of BANDS ) await getBandFolder(type, band);
      }

      const updates = [];
      for ( const p of [...perType.values()].flat() ) {
        const folder = p.band ? await getBandFolder(p.type, p.band) : typeFolders.get(p.type);
        const u = { _id: p.actor.id, folder: folder.id };
        if ( p.book ) { u["system.source.book"] = p.book; filled++; }
        updates.push(u);
      }
      if ( updates.length ) await Actor.implementation.updateDocuments(updates);
      moved += updates.length;
      bandCount += bandFolders.size;

      // Clean up empty old folders, deepest first
      if ( DELETE_EMPTY_FOLDERS ) {
        const keep = new Set([...typeFolders.values(), ...bandFolders.values()].map(f => f.id));
        const candidates = oldFolders.filter(f => !keep.has(f.id)).sort((a, b) => b.depth - a.depth);
        for ( const f of candidates ) {
          const live = game.folders.get(f.id);
          if ( !live || live.contents.length || childFolders(live).length ) continue;
          await live.delete();
          removed++;
        }
      }
    }

    ui.notifications.info(`Sorted ${moved} NPC(s) across ${plans.length} root folder(s) into ${bandCount} CR folder(s)`
      + (filled ? `, filled Source for ${filled}` : "")
      + (removed ? `, removed ${removed} empty folder(s)` : "") + ".");
  } catch ( err ) {
    console.error(err);
    ui.notifications.error(`Sort Creatures by CR failed: ${err.message}`);
  }
})();
