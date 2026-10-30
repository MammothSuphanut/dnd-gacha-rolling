/**
 * Localize 5etools Images — point every scene at local copies of the images Plutonium linked from cdn.5e.tools.
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   1. The images must already be in Data/assets/srd5e/img/ (same sub-path as on the CDN, URL-decoded:
 *      https://cdn.5e.tools/2024/img/adventure/WDH/Basement.webp → assets/srd5e/img/adventure/WDH/Basement.webp).
 *   2. Macro Directory → Create Macro → Type: "Script" → paste this file → Execute (GM only).
 *   3. Press F5 afterwards.
 *
 * Why: 141 map backgrounds (mostly the Waterdeep scenes) and a few token / item images were loaded from
 * cdn.5e.tools every time a scene opened, so the canvas stayed black until the CDN answered — on every client.
 *
 * What it does: in every scene (the scene itself, its levels, tiles, tokens incl. their actor deltas and items,
 * notes, etc.) any "https://cdn.5e.tools/2024/img/..." becomes "assets/srd5e/img/...". Re-running is harmless.
 */
(async () => {
  const CDN = /https:\/\/cdn\.5e\.tools\/2024\/img\/([^"\\]+)/g;
  const localize = obj => JSON.parse(JSON.stringify(obj).replace(CDN, (_, rest) => `assets/srd5e/img/${decodeURIComponent(rest)}`));

  try {
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");
    const embedded = Object.entries(Scene.metadata.embedded);   // [["Token", "tokens"], ["Level", "levels"], ...]
    let scenesChanged = 0, docsChanged = 0;

    for ( const scene of game.scenes ) {
      let touched = false;

      // Scene fields outside the embedded collections
      const own = scene.toObject();
      for ( const [, field] of embedded ) delete own[field];
      const ownDiff = foundry.utils.diffObject(own, localize(own));
      if ( !foundry.utils.isEmpty(ownDiff) ) { await scene.update(ownDiff); touched = true; }

      for ( const [name, field] of embedded ) {
        const updates = [];
        for ( const doc of scene[field] ?? [] ) {
          const src = doc.toObject();
          const diff = foundry.utils.diffObject(src, localize(src));
          if ( !foundry.utils.isEmpty(diff) ) updates.push({ _id: doc.id, ...diff });
        }
        if ( !updates.length ) continue;
        await scene.updateEmbeddedDocuments(name, updates, { render: false });
        docsChanged += updates.length;
        touched = true;
      }
      if ( touched ) scenesChanged++;
    }

    const msg = `Localize 5etools Images: ${scenesChanged} scenes, ${docsChanged} embedded documents now use assets/srd5e/img/. Press F5.`;
    console.log(msg);
    ui.notifications.info(msg, { permanent: true });
  } catch (err) {
    console.error(err);
    ui.notifications.error(`Localize 5etools Images failed: ${err.message}`);
  }
})();
