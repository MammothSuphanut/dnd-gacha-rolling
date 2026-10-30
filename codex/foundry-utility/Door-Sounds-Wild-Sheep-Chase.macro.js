/**
 * Door Sounds Wild Sheep Chase — give every door on both Noke's Tower scenes a door sound.
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use: Macro Directory → Create Macro → Type: "Script" → paste → Execute (GM only).
 *
 * What it does (the whole place is living oak and planks, so every sound is wood):
 *   - Locked doors (the central-platform door and the bedroom door) → "woodHeavy"
 *   - Doors between the rooms of the central platform              → "woodBasic"
 *   - Everything else (huts, outhouse, garden gate)                → "woodCreaky"
 *   Re-running just sets the same sounds again.
 */
(async () => {
  // central platform: centre + radius in scene pixels
  const PLATFORM = {
    "Noke's Tower Map": { x: 2012, y: 1049, r: 890 },
    "Noke's Tower Map (Homebrew)": { x: 4350, y: 1250, r: 1290 }
  };
  const { LOCKED } = CONST.WALL_DOOR_STATES;
  const { NONE } = CONST.WALL_DOOR_TYPES;

  if (!game.user.isGM) return ui.notifications.error("GM only.");

  let total = 0;
  const missing = [];
  for (const [name, p] of Object.entries(PLATFORM)) {
    const scene = game.scenes.find(s => s.name === name && s.flags?.plutonium?.source === "WSC");
    if (!scene) { missing.push(name); continue; }
    const updates = scene.walls.filter(w => w.door !== NONE).map(w => {
      const [x0, y0, x1, y1] = w.c;
      const inside = Math.hypot((x0 + x1) / 2 - p.x, (y0 + y1) / 2 - p.y) <= p.r;
      const doorSound = w.ds === LOCKED ? "woodHeavy" : inside ? "woodBasic" : "woodCreaky";
      return { _id: w.id, doorSound };
    });
    if (updates.length) await scene.updateEmbeddedDocuments("Wall", updates);
    total += updates.length;
  }
  ui.notifications.info(`Door sounds set on ${total} door(s)` + (missing.length ? `; scene not found: ${missing.join(", ")}` : "."));
})();
