/**
 * Remove Exandria — clean the old Exandria leftovers out of the Novaris world.
 * For Foundry VTT v14 + D&D 5e system 5.x
 *
 * How to use:
 *   1. Make a world backup first (Setup → Backups). Deleted scenes cannot be undone.
 *   2. Macro Directory → Create Macro → Type: "Script"
 *   3. Paste this whole file, then Execute (GM only). It shows the full list and asks before doing anything.
 *
 * What it does:
 *   - MOVE: the Eiselcross scenes from "Aeorian Cataclysm / Base" (Act 1 places that are Novaris canon)
 *     into "Novaris / Aldenreich / Eiselcross / <place>".
 *   - DELETE: every other scene under "Aeorian Cataclysm / Base" (Wildemount places that don't exist in Novaris),
 *     the "Exandria+ Map" scene folder, and the "Random Encounters / Exandria" roll-table folder, with their folders.
 *
 * Image files on disk are never touched — only the Foundry documents.
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const EISELCROSS_FOLDER = "2QG7vjpNXH7CPqik";   // Scene folder: Novaris / Aldenreich / Eiselcross
  const MOVES = [                                  // [scene id, target subfolder under Eiselcross]
    ["7eb6DAwqLLGkJxqG", "Salsvault"],
    ["YzYwNzhmMTc5MGY5", "Aeor Crash Site"],       // Aeor Crash Site - Mini Hut
    ["toDGhmoOtwCsSAcK", "Aeor Crash Site"],       // Aeor Crash Site - Aeor Lab
    ["ylpdtUuNcEHsCoMn", "Fortress of the Dead Jarl"],
    ["0ePZFgcwvRDVUs4t", "Fortress of the Dead Jarl"], // Snowy Wolf Den
    ["MDFlMmYwMGZkNGE3", "Syrinlya"]
  ];
  const DELETE_FOLDERS = [                         // whole trees: subfolders + contents
    "Hj1zpOTSg29ekEpe",                            // Scene: Aeorian Cataclysm / Base
    "bm67WA8Ff7yk9AwS",                            // Scene: Exandria+ Map
    "4klEIY8v9HeGgWPF"                             // RollTable: Random Encounters / Exandria
  ];

  try {
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    const root = game.folders.get(EISELCROSS_FOLDER);
    if ( !root ) return ui.notifications.error("Eiselcross scene folder not found.");
    const moves = MOVES.map(([id, sub]) => [game.scenes.get(id), sub]).filter(([s]) => s);
    const moveIds = new Set(moves.map(([s]) => s.id));

    // Collect every folder + document under the delete roots (scenes being moved are excluded)
    const folders = [];
    const docs = [];
    const walk = (f, depth) => {
      folders.push([f, depth]);
      for ( const d of f.contents ) if ( !moveIds.has(d.id) ) docs.push(d);
      for ( const c of f.getSubfolders() ) walk(c, depth + 1);
    };
    for ( const id of DELETE_FOLDERS ) {
      const f = game.folders.get(id);
      if ( f ) walk(f, 0);
    }
    if ( !moves.length && !folders.length ) return ui.notifications.info("Nothing left to clean — already done.");

    const active = docs.find(d => d.active);
    if ( active ) return ui.notifications.error(`"${active.name}" is the active scene — activate another scene first.`);

    /* ------------------------------------------------------------------ */
    /*  Confirm                                                           */
    /* ------------------------------------------------------------------ */
    const esc = foundry.utils.escapeHTML;
    const moveList = moves.map(([s, sub]) => `<li>${esc(s.name)} → Eiselcross / ${esc(sub)}</li>`).join("");
    const docList = docs.map(d => `<li>[${d.documentName}] ${esc(d.name)}</li>`).join("");
    const ok = await foundry.applications.api.DialogV2.confirm({
      window: { title: "Remove Exandria" },
      position: { width: 520 },
      content: `<p><b>Move ${moves.length} scene(s):</b></p><ul>${moveList}</ul>
        <p><b>Delete ${docs.length} document(s) and ${folders.length} folder(s):</b></p>
        <div style="max-height:300px;overflow:auto"><ul>${docList}</ul></div>
        <p style="color:#c33"><b>Deleting cannot be undone.</b> Image files stay on disk.</p>`
    });
    if ( !ok ) return;

    /* ------------------------------------------------------------------ */
    /*  Move                                                              */
    /* ------------------------------------------------------------------ */
    const subfolders = {};
    for ( const [scene, sub] of moves ) {
      subfolders[sub] ??= root.getSubfolders().find(f => f.name === sub)
        ?? await Folder.create({ name: sub, type: "Scene", folder: root.id });
      await scene.update({ folder: subfolders[sub].id });
    }

    /* ------------------------------------------------------------------ */
    /*  Delete                                                            */
    /* ------------------------------------------------------------------ */
    const byType = Object.groupBy(docs, d => d.documentName);
    for ( const [type, list] of Object.entries(byType) ) {
      await getDocumentClass(type).deleteDocuments(list.map(d => d.id));
    }
    // Deepest folders first so nothing gets re-parented
    folders.sort((a, b) => b[1] - a[1]);
    await Folder.deleteDocuments(folders.map(([f]) => f.id));

    ui.notifications.info(`Remove Exandria: moved ${moves.length} scene(s), deleted ${docs.length} document(s) + ${folders.length} folder(s).`);
  } catch ( err ) {
    console.error(err);
    ui.notifications.error(`Remove Exandria failed: ${err.message}`);
  }
})();
