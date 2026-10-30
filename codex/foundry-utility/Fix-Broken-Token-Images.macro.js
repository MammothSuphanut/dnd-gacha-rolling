/**
 * Fix Broken Token Images — repoint placed tokens whose image file no longer exists
 * to their actor's current prototype token image.
 * For Foundry VTT v14 + D&D 5e system 5.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *
 * Found 2026-10-27 by scanning the world DB:
 *   - Oxton on 4 "W" scenes → assets/characters/Oxton/Oxton token.png (file gone)
 *   - Stalin chan on Tundra View → worlds/novaris/imported-from-worldA/... (file gone)
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const TOKENS = [                                 // [scene id, token id]
    ["3ngviqe4S9xzwY4o", "F1nB1WeN1yuqBOsL"],      // Palebank Village Tavern W — Oxton
    ["BtmltxFc39oa5o9W", "sai7iUP5VzgE9m0c"],      // Remohaz Ship W — Oxton
    ["mcURJDuk546gynpk", "QzczFBvr2RrxiGTq"],      // Palebank Village W — Oxton
    ["tFRuSl8InIAYShlL", "PcsDGVkmkg0lUyT6"],      // Wolf Den W — Oxton
    ["VfTeMg7PmZxWBQE8", "fhGa4ACC9RrXTFyR"]       // Tundra View — Stalin chan
  ];

  try {
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    const fixed = [];
    for ( const [sceneId, tokenId] of TOKENS ) {
      const scene = game.scenes.get(sceneId);
      const token = scene?.tokens.get(tokenId);
      if ( !token ) { console.warn(`Fix Broken Token Images: token ${sceneId}.${tokenId} not found`); continue; }
      const src = token.actor?.prototypeToken.texture.src;
      if ( !src ) { console.warn(`Fix Broken Token Images: ${token.name} has no actor image`); continue; }
      if ( token.texture.src === src ) continue;
      await token.update({ "texture.src": src });
      fixed.push(`${scene.name} — ${token.name}`);
    }

    console.log("Fix Broken Token Images:", fixed);
    ui.notifications.info(`Fix Broken Token Images: fixed ${fixed.length} token(s).`);
  } catch ( err ) {
    console.error(err);
    ui.notifications.error(`Fix Broken Token Images failed: ${err.message}`);
  }
})();
