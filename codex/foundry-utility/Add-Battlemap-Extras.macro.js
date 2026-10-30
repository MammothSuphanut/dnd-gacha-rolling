/**
 * Add Battlemap Extras — finish a Dungeondraft map imported with Universal Battlemap Importer (dd-import):
 * doors with sounds, a secret door, arrow-slit windows, styled lights and the scene's vision.
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * Why: the Dungeondraft maps here draw their doors as objects, which the .dd2vtt export does not carry,
 * and dd-import gives every light the same plain look.
 *
 * How to use:
 *   1. Import the .dd2vtt with Universal Battlemap Importer (Scenes tab). Scene name must match the data's
 *      sceneName ("Bandit Cave"); leave "custom pixels per grid" off.
 *   2. Build the data from the repo (once per map change):
 *        python world-settings/novaris/tools/build_foundry_battlemap.py bandit-cave
 *      It writes <key>.json into Data/assets/world/novaris/<Continent>/<Region>/<Map>/.
 *   3. Macro Directory → Create Macro → Type: "Script" → paste this file → set MAP below → Execute (GM only).
 *
 * What it does:
 *   - Doors: wood doors block sight and light; barred doors and gates are see-through. Each has a door sound;
 *     some start locked (from the data). The secret door is only visible to the GM until found.
 *   - Arrow slits: the cave-wall pieces they cross become windows (see and shoot through, no walking).
 *   - Lights: fires flicker (torch), braziers burn (flame), lanterns glow softly, daylight is cold and steady.
 *   - Scene: token vision on, individual black fog, darkness from the data, global illumination off.
 *   Re-running is safe: the doors it added before are replaced, lights are restyled again.
 */
(async () => {
  const MAP = { key: "bandit-cave", path: "Aldenreich/Gråmark/Bandit Cave" };
  const DATA = `assets/world/novaris/${MAP.path}/${MAP.key}.json`;
  const FLAG = "world";
  // Light per kind (radii in ft)
  const LIGHTS = {
    fire: { dim: 35, bright: 15, color: "#ff9a3a", alpha: 0.45, animation: { type: "torch", speed: 3, intensity: 4 } },
    brazier: { dim: 20, bright: 10, color: "#ff8a2a", alpha: 0.45, animation: { type: "flame", speed: 3, intensity: 3 } },
    lantern: { dim: 12, bright: 5, color: "#ffd08a", alpha: 0.3, animation: { type: "torch", speed: 1, intensity: 1 } },
    daylight: { color: "#dfe8f5", alpha: 0.15, animation: { type: null } }
  };

  if (!game.user.isGM) return ui.notifications.error("GM only.");
  const res = await fetch(DATA, { cache: "no-store" });
  if (!res.ok) return ui.notifications.error(`Missing ${DATA} — run build_foundry_battlemap.py first.`);
  const data = await res.json();
  const scene = game.scenes.find(s => s.name === data.sceneName);
  if (!scene) return ui.notifications.error(`No scene named "${data.sceneName}" — import the .dd2vtt with Universal Battlemap Importer first.`);

  const d = scene.dimensions;
  const k = scene.grid.size / data.ppg;
  const X = x => Math.round(d.sceneX + x * k), Y = y => Math.round(d.sceneY + y * k);
  const levels = [...(scene.walls.contents[0]?.levels ?? [scene.firstLevel?.id].filter(Boolean))];
  const S = CONST.EDGE_SENSE_TYPES, M = CONST.WALL_MOVEMENT_TYPES;

  await scene.update({
    tokenVision: true,
    fog: { mode: CONST.FOG_EXPLORATION_MODES.INDIVIDUAL, colors: { unexplored: "#000000", explored: "#000000" } },
    environment: { darknessLevel: data.darkness, globalLight: { enabled: false } }
  });

  // Doors: replace the ones this macro added before
  const old = scene.walls.filter(w => w.getFlag(FLAG, "battlemapExtra") === data.key).map(w => w.id);
  if (old.length) await scene.deleteEmbeddedDocuments("Wall", old);
  const doors = data.doors.map(dr => {
    const seeThrough = dr.kind === "bars";
    return {
      c: [X(dr.c[0]), Y(dr.c[1]), X(dr.c[2]), Y(dr.c[3])],
      levels,
      move: M.NORMAL,
      sight: seeThrough ? S.NONE : S.NORMAL,
      light: seeThrough ? S.NONE : S.NORMAL,
      sound: seeThrough ? S.NONE : S.NORMAL,
      door: dr.kind === "secret" ? CONST.WALL_DOOR_TYPES.SECRET : CONST.WALL_DOOR_TYPES.DOOR,
      ds: dr.locked ? CONST.WALL_DOOR_STATES.LOCKED : CONST.WALL_DOOR_STATES.CLOSED,
      doorSound: dr.sound,
      flags: { [FLAG]: { battlemapExtra: data.key, battlemapDoor: dr.kind } }
    };
  });
  await scene.createEmbeddedDocuments("Wall", doors);

  // Arrow slits: cave-wall pieces crossed by a slit (and their neighbours within half a cell) become windows
  const hits = (a, b, c, e) => {
    const den = (b.x - a.x) * (e.y - c.y) - (b.y - a.y) * (e.x - c.x);
    if (!den) return null;
    const t = ((c.x - a.x) * (e.y - c.y) - (c.y - a.y) * (e.x - c.x)) / den;
    const u = ((c.x - a.x) * (b.y - a.y) - (c.y - a.y) * (b.x - a.x)) / den;
    return t >= 0 && t <= 1 && u >= 0 && u <= 1 ? { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) } : null;
  };
  const windowIds = new Set();
  const caveWalls = scene.walls.filter(w => !w.door && !w.getFlag(FLAG, "battlemapExtra"));
  for (const sl of data.slits ?? []) {
    const a = { x: X(sl.c[0]), y: Y(sl.c[1]) }, b = { x: X(sl.c[2]), y: Y(sl.c[3]) };
    for (const w of caveWalls) {
      const p = hits(a, b, { x: w.c[0], y: w.c[1] }, { x: w.c[2], y: w.c[3] });
      if (!p) continue;
      for (const n of caveWalls) {
        const mx = (n.c[0] + n.c[2]) / 2, my = (n.c[1] + n.c[3]) / 2;
        if (Math.hypot(mx - p.x, my - p.y) < scene.grid.size / 2) windowIds.add(n.id);
      }
    }
  }
  if (windowIds.size) await scene.updateEmbeddedDocuments("Wall", [...windowIds].map(_id => ({
    _id, sight: S.NONE, light: S.NONE, sound: S.NONE, move: M.NORMAL
  })));

  // Lights: match each imported light to the data by position, then style it
  const updates = [];
  for (const light of scene.lights) {
    const src = data.lights.find(l => Math.hypot(X(l.x) - light.x, Y(l.y) - light.y) < scene.grid.size);
    if (!src || !LIGHTS[src.kind]) continue;
    const style = { ...LIGHTS[src.kind] };
    if (src.kind === "daylight") Object.assign(style, { dim: src.range * scene.grid.distance, bright: src.range * scene.grid.distance * 0.75 });
    updates.push({ _id: light.id, config: style, flags: { [FLAG]: { battlemapLight: src.kind } } });
  }
  if (updates.length) await scene.updateEmbeddedDocuments("AmbientLight", updates);

  const count = kind => data.doors.filter(dr => dr.kind === kind).length;
  ui.notifications.info(`${scene.name}: ${count("door")} doors, ${count("bars")} barred doors, ${count("secret")} secret, `
    + `${windowIds.size} window pieces, ${updates.length}/${scene.lights.size} lights styled.`);
})();
