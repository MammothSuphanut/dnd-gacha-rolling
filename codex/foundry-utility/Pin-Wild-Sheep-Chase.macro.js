/**
 * Pin Wild Sheep Chase — numbered map pins on both Plutonium "Noke's Tower" scenes, opening the Thai journal.
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   1. Run Setup-Wild-Sheep-Chase first (creates "The Wild Sheep Chase (TH)").
 *   2. Macro Directory → Create Macro → Type: "Script" → paste this file → Execute (GM only).
 *
 * What it does:
 *   Places numbered pins on "Noke's Tower Map" and "Noke's Tower Map (Homebrew)": the path in, garden platform,
 *   door, the three rooms of the central platform, Noke's bedroom, the huts and the outhouse. Double-clicking a pin
 *   opens the Thai journal's "The House in the Woods" page at the sub-heading for that spot (Approach, The Compound,
 *   Central Platform, Noke's Bedroom, Huts) via Mammoth Tweaks "Map pins: open at the room's heading".
 *   Re-running replaces only its own pins (flag world.wscPin); pins you place yourself are left alone.
 */
(async () => {
  const ANCHOR_FLAG = "mammoth-tweaks";
  // [label, heading, x, y] — scene pixels
  const PINS = {
    "Noke's Tower Map": [
      ["Path to Noke's Tower", "Approach", 1010, 2310],
      ["Garden Platform (lowest, 10 ft)", "The Compound", 3300, 1880],
      ["Central Platform Door (locked)", "Central Platform", 2800, 1560],
      ["Library & Lab", "Central Platform", 2400, 1070],
      ["Sitting Room", "Central Platform", 1625, 1455],
      ["Dining Room / Kitchen", "Central Platform", 1605, 705],
      ["Noke's Bedroom (top, 30 ft)", "Noke's Bedroom", 1180, 2030],
      ["Hut", "Huts", 460, 2030],
      ["Hut", "Huts", 460, 2600],
      ["Outhouse", "The Compound", 2300, 2310]
    ],
    "Noke's Tower Map (Homebrew)": [
      ["Path to Noke's Tower", "Approach", 4600, 4600],
      ["Garden Platform (lowest, 10 ft)", "The Compound", 6800, 2650],
      ["Central Platform Door (locked)", "Central Platform", 5370, 1980],
      ["Library & Lab", "Central Platform", 5000, 1250],
      ["Sitting Room", "Central Platform", 3850, 1750],
      ["Dining Room / Kitchen", "Central Platform", 3700, 850],
      ["Noke's Bedroom (top, 30 ft)", "Noke's Bedroom", 2450, 2500],
      ["Hut", "Huts", 900, 3600],
      ["Hut (storeroom)", "Huts", 900, 4300],
      ["Outhouse", "The Compound", 4400, 3000]
    ]
  };

  if (!game.user.isGM) return ui.notifications.error("GM only.");

  const entry = game.journal.find(j => j.flags?.world?.wscThai);
  if (!entry) return ui.notifications.error("Thai journal not found — run Setup-Wild-Sheep-Chase first.");
  const page = entry.pages.find(p => p.flags?.world?.wscPage === "the-house-in-the-woods");
  if (!page) return ui.notifications.error("Page \"The House in the Woods\" not found — re-run Setup-Wild-Sheep-Chase.");
  const slugOf = heading => Object.entries(page.toc ?? {}).find(([, t]) => t.text.trim() === heading)?.[0] ?? null;

  let placed = 0;
  const missing = [];
  for (const [sceneName, pins] of Object.entries(PINS)) {
    const scene = game.scenes.find(s => s.name === sceneName && s.flags?.plutonium?.source === "WSC");
    if (!scene) { missing.push(sceneName); continue; }
    const old = scene.notes.filter(n => n.flags?.world?.wscPin).map(n => n.id);
    if (old.length) await scene.deleteEmbeddedDocuments("Note", old);
    const docs = pins.map(([label, heading, x, y], i) => ({
      x, y,
      text: `${i + 1}. ${label}`,
      entryId: entry.id,
      pageId: page.id,
      texture: { src: `assets/srd5e/puck/${i + 1}.webp` },
      iconSize: Math.round(scene.grid.size * 0.6),
      fontSize: Math.max(24, Math.round(scene.grid.size * 0.2)),
      textAnchor: CONST.TEXT_ANCHOR_POINTS.BOTTOM,
      flags: { world: { wscPin: true }, [ANCHOR_FLAG]: { anchor: slugOf(heading) } }
    }));
    await scene.createEmbeddedDocuments("Note", docs);
    placed += docs.length;
  }
  ui.notifications.info(`Pin Wild Sheep Chase: placed ${placed} pin(s)` + (missing.length ? `; scene not found: ${missing.join(", ")}` : "."));
})();
