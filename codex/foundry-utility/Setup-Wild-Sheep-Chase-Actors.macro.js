/**
 * Setup Wild Sheep Chase Actors — tidy the Plutonium "Creatures" import of The Wild Sheep Chase and put the
 * defenders of Noke's tower on both Noke's Tower scenes.
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   Run after Setup-Wild-Sheep-Chase. Macro Directory → Create Macro → Type: "Script" → paste → Execute (GM only).
 *
 * What it does:
 *   1. Art: Plutonium gave Ahmed Noke, Guz, Hulking Figure, Ape (Greatsword) and Bed Dragon Wyrmling only a red
 *      name-plate image; they get a real portrait + token from the local asset library.
 *   2. Duplicates: Wolf and Gibbering Mouther in the WSC "Creatures" folder are copies of the Bestiary ones. Every
 *      @UUID link in every journal and every token on every scene is re-pointed to the Bestiary actor, then the copy
 *      is deleted.
 *   3. Tokens (hidden, for the GM to reveal): 3 Apes on the lawn by the garden platform, the Brown Bear in the
 *      outhouse, Ahmed Noke in the library & lab — on both maps. Guz's group meets the party in town and the Bed
 *      Dragon Wyrmling only appears mid-fight, so they are not placed.
 *   Re-running is safe: art is only replaced while it is still a name-plate, and only this macro's tokens
 *   (flag world.wscToken) are replaced.
 */
(async () => {
  const FACE = "assets/tokens/face-tokens";
  const XMM = "assets/srd5e/img/bestiary/tokens/XMM";
  const PLATE = "homebrew-img/main/img/WSC/"; // Plutonium's name-plate images live here
  const ART = {
    "Ahmed Noke": `${FACE}/Human_17.png`,
    "Guz": `${FACE}/Orc_2.png`,
    "Hulking Figure": `${XMM}/Brown Bear.webp`,
    "Ape (Greatsword)": `${XMM}/Ape.webp`,
    "Bed Dragon Wyrmling": `${XMM}/Gold Dragon Wyrmling.webp`
  };
  const DUPLICATES = ["Wolf", "Gibbering Mouther"];
  // [actor, x, y] — scene pixels, snapped to the grid cell they fall in
  const TOKENS = {
    "Noke's Tower Map": [
      ["Ape (Greatsword)", 2996, 1883], ["Ape (Greatsword)", 3039, 2097], ["Ape (Greatsword)", 3210, 2226],
      ["Brown Bear", 2190, 2220],
      ["Ahmed Noke", 2268, 1198]
    ],
    "Noke's Tower Map (Homebrew)": [
      ["Ape (Greatsword)", 6350, 2600], ["Ape (Greatsword)", 6650, 3000], ["Ape (Greatsword)", 7100, 2900],
      ["Brown Bear", 4210, 2810],
      ["Ahmed Noke", 4800, 1500]
    ]
  };

  if (!game.user.isGM) return ui.notifications.error("GM only.");

  const noke = game.actors.find(a => a.name === "Ahmed Noke" && a.flags?.plutonium?.source === "WSC");
  if (!noke) return ui.notifications.error("Ahmed Noke (WSC) not found — import The Wild Sheep Chase with Plutonium first.");
  const folder = noke.folder;
  const wsc = name => game.actors.find(a => a.name === name && a.folder === folder);

  // 1. Art
  let painted = 0;
  for (const [name, src] of Object.entries(ART)) {
    const a = wsc(name);
    if (!a || !a.img?.includes(PLATE)) continue;
    await a.update({ img: src, "prototypeToken.texture.src": src });
    painted++;
  }

  // 2. Duplicates → Bestiary copy
  const remap = {};
  for (const name of DUPLICATES) {
    const dup = wsc(name);
    const keep = game.actors.find(a => a.name === name && a.folder !== folder);
    if (dup && keep) remap[dup.id] = keep;
  }
  let relinked = 0;
  if (Object.keys(remap).length) {
    const ids = Object.keys(remap).join("|");
    const has = new RegExp(`Actor\\.(${ids})`);
    const re = new RegExp(`Actor\\.(${ids})`, "g");
    for (const j of game.journal) {
      const updates = j.pages.filter(p => p.text?.content && has.test(p.text.content)).map(p => ({
        _id: p.id, "text.content": p.text.content.replace(re, (_, id) => `Actor.${remap[id].id}`)
      }));
      if (updates.length) { await j.updateEmbeddedDocuments("JournalEntryPage", updates); relinked += updates.length; }
    }
    for (const s of game.scenes) {
      const updates = s.tokens.filter(t => remap[t.actorId]).map(t => ({ _id: t.id, actorId: remap[t.actorId].id }));
      if (updates.length) { await s.updateEmbeddedDocuments("Token", updates); relinked += updates.length; }
    }
    await Actor.deleteDocuments(Object.keys(remap));
  }

  // 3. Tokens
  let placed = 0;
  const missing = [];
  for (const [sceneName, list] of Object.entries(TOKENS)) {
    const scene = game.scenes.find(s => s.name === sceneName && s.flags?.plutonium?.source === "WSC");
    if (!scene) { missing.push(sceneName); continue; }
    const old = scene.tokens.filter(t => t.flags?.world?.wscToken).map(t => t.id);
    if (old.length) await scene.deleteEmbeddedDocuments("Token", old);
    const g = scene.grid.size;
    const docs = [];
    for (const [name, x, y] of list) {
      const a = wsc(name);
      if (!a) { missing.push(name); continue; }
      const t = await a.getTokenDocument({ x: Math.floor(x / g) * g, y: Math.floor(y / g) * g, hidden: true });
      docs.push(foundry.utils.mergeObject(t.toObject(), { flags: { world: { wscToken: true } } }));
    }
    if (docs.length) await scene.createEmbeddedDocuments("Token", docs);
    placed += docs.length;
  }

  ui.notifications.info(`Wild Sheep Chase actors: ${painted} portrait(s) set, ${Object.keys(remap).length} duplicate(s) removed `
    + `(${relinked} page/token link(s) moved), ${placed} token(s) placed`
    + (missing.length ? `; not found: ${[...new Set(missing)].join(", ")}` : "."));
})();
