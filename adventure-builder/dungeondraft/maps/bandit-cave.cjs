// Builds "Bandit Cave.dungeondraft_map" from cave-test.dungeondraft_map (Dungeondraft 1.2.0.1 template).
//   node adventure-builder/dungeondraft/maps/bandit-cave.cjs "D:/Dungeondraft Maps/cave-test.dungeondraft_map" <out.dungeondraft_map>
// Writes a scratch file: the user has since edited and saved the real map, so never copy this over it.
// Units: grid cells; 1 cell = 256 px. Cave/entrance bitmaps are (4W+3)x(4H+3) bits, LSB-first, row-major.
// See ../DUNGEONDRAFT-FORMAT.md for why each number is what it is.
const fs = require("fs");
const [tplPath, outPath] = process.argv.slice(2);
const m = JSON.parse(fs.readFileSync(tplPath, "utf8"));
const W = 40, H = 54, CELL = 256;
const FOOT = 41.5;   // mountain foot: rock above, snowy clearing below

/* ---------------- shapes (signed distance, <0 = open cave) ---------------- */
const ell = (cx, cy, rx, ry) => (x, y) => (Math.hypot((x - cx) / rx, (y - cy) / ry) - 1) * Math.min(rx, ry);
const segDist = (x, y, ax, ay, bx, by) => {
  const dx = bx - ax, dy = by - ay, t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(x - ax - t * dx, y - ay - t * dy);
};
const tube = (pts, r) => (x, y) => {
  let d = Infinity;
  for (let i = 0; i < pts.length - 1; i++) d = Math.min(d, segDist(x, y, ...pts[i], ...pts[i + 1]));
  return d - r;
};

// Value noise so the big chambers get ragged natural edges.
const hash = (i, j) => { let h = (i * 374761393 + j * 668265263) ^ 0x5bd1e995; h = (h ^ (h >>> 13)) * 1274126177; return ((h ^ (h >>> 16)) >>> 0) / 4294967295; };
const smooth = t => t * t * (3 - 2 * t);
const vnoise = (x, y) => {
  const i = Math.floor(x), j = Math.floor(y), fx = smooth(x - i), fy = smooth(y - j);
  const a = hash(i, j), b = hash(i + 1, j), c = hash(i, j + 1), d = hash(i + 1, j + 1);
  return (a + (b - a) * fx) * (1 - fy) + (c + (d - c) * fx) * fy;
};
const noise = (x, y) => (vnoise(x / 2.2, y / 2.2) - 0.5) * 0.8 + (vnoise(x / 0.9 + 50, y / 0.9) - 0.5) * 0.3;

const rough = [   // chambers: noisy edges
  ell(15.8, 15.6, 11.0, 6.8),          // 4 hall
  ell(11.5, 13.0, 4.5, 4.0),           //   hall west lobe
  ell(21.5, 18.5, 4.5, 3.5),           //   hall south-east lobe
  tube([[16.3, 21], [15.6, 27.5], [18.3, 32.5], [19.6, 42.6]], 2.0), // 1 entrance tunnel
  ell(19.8, 41.6, 3.6, 1.6),           //   cave mouth
  ell(23.8, 27.2, 3.0, 2.6),           // 2 guard room
  ell(8.6, 28.6, 2.8, 5.0),            // 6 prison
  ell(32.6, 15.6, 3.9, 5.8),           // 5 sleeping
  ell(6.2, 5.1, 4.4, 3.6),             // 8 leader
  ell(15.4, 4.4, 2.3, 2.2)             // 9 vault
];
// Passages narrower than ~3 cells vanish under Dungeondraft's cave-wall band, so door
// passages are 3 wide, the secret passage 2 and the Tiny crawl just wide enough to show.
const clean = [   // passages: exact width, no noise
  tube([[23.4, 24.6], [22.6, 21.6]], 1.5),             // 2 → 4 door passage
  tube([[8.7, 23.8], [9.4, 21.0]], 1.5),               // 6 → 4 door passage
  tube([[29.2, 15.4], [26.2, 15.4]], 1.5),             // 5 → 4 door passage
  tube([[7.2, 8.2], [8.6, 11.2]], 1.5),                // 8 → 4 door passage
  tube([[10.2, 5.0], [13.4, 4.8]], 1.0),               // 8 → 9 secret passage
  tube([[17.4, 36.6], [13.5, 37.4], [10.6, 35.8], [9.3, 33.4]], 0.8) // Tiny crawl 1 → 6
];
const open = (x, y) => {
  for (const f of clean) if (f(x, y) < 0) return true;
  const n = noise(x, y);
  for (const f of rough) if (f(x, y) + n < 0) return true;
  return false;
};

/* ---------------- bitmaps ---------------- */
const BW = 4 * W + 3, BH = 4 * H + 3;
const cave = new Uint8Array(Math.ceil(BW * BH / 8)), entrance = new Uint8Array(cave.length);
const setBit = (arr, i) => { arr[i >> 3] |= 1 << (i & 7); };
for (let j = 0; j < BH; j++) for (let i = 0; i < BW; i++) {
  const x = (i - 1) / 4, y = (j - 1) / 4;
  if (open(x, y)) setBit(cave, j * BW + i);
  // Mouth opens onto the clearing. The entrance flag has to cover the rock side of the edge too,
  // or Dungeondraft still draws a strip of cave wall along the end of the floor.
  if (y > FOOT - 0.6 && Math.abs(x - 19.8) < 7.5) setBit(entrance, j * BW + i);
}
const pool = (type, arr) => `${type}( ${Array.from(arr).join(", ")} )`;

/* ---------------- terrain splat: 1 rock, 2 frozen dirt (trail), 3 snow ---------------- */
// Trail from Palebank (north-west edge) winding south-east toward Twinhold, with a spur to the mouth.
const trail = tube([[-1, 45.5], [8, 47.5], [16, 47.0], [24, 48.8], [32, 51.0], [41, 52.5]], 1.3);
const spur = tube([[19.8, 42.6], [19.2, 45.0], [17.5, 47.2]], 0.8);
const SW = 4 * W, SH = 4 * H, splat = new Uint8Array(SW * SH * 4);
for (let j = 0; j < SH; j++) for (let i = 0; i < SW; i++) {
  const y = j / 4, x = i / 4, k = (j * SW + i) * 4;
  const foot = FOOT + noise(x * 1.3, 7) * 2.2;
  if (y < foot - 1.2) { splat[k] = 255; continue; }
  if (y < foot) { const t = (foot - y) / 1.2; splat[k] = Math.round(255 * t); splat[k + 2] = 255 - splat[k]; continue; } // snow dusting on the rock
  const n = noise(x * 2, y * 2);
  const onTrail = trail(x, y) + n * 0.6 < 0, onSpur = spur(x, y) + n * 0.6 < 0;
  if (onTrail) { splat[k + 1] = 170; splat[k + 2] = 85; }
  else if (onSpur) { splat[k + 1] = 90; splat[k + 2] = 165; }
  else splat[k + 2] = 255;
}

/* ---------------- objects ---------------- */
const P = {
  bc: "res://packs/LHSXqd1D/textures/objects/",
  fa: "res://packs/FA30DDXY/textures/objects/[FA] Asset Testing/",
  faDoor: "res://packs/FA30DDXY/textures/portals/",
  dnd: "res://packs/DnDgCORE/textures/objects/[DnD] ",
  cf: "res://packs/jCwF3Fwl/textures/objects/",
  fu: "res://packs/h8QTDPjN/textures/objects/",
  dw: "res://packs/4wr6VQOg/textures/objects/",
  iron: "res://packs/DnDgCORE/textures/portals/Metal/metal_door_double_01.webp"
};
let nextId = 0x10;
const nid = () => (nextId++).toString(16);
const objects = [], lights = [];
const obj = (tex, x, y, rot = 0, s = 1, layer = 100, mirror = false) => (objects.push({
  position: `Vector2( ${(x * CELL).toFixed(1)}, ${(y * CELL).toFixed(1)} )`, rotation: +(rot * Math.PI / 180).toFixed(6),
  scale: `Vector2( ${+s.toFixed(3)}, ${+s.toFixed(3)} )`, mirror, texture: tex, layer, shadow: true, node_id: nid()
}));
// Doors span wall to wall: passage width (3 cells) + a bit tucked under each wall edge.
// The 2MT "3x1" door textures draw 1.5 cells wide at scale 1, hence width / 1.5.
const DOOR_W = 3.6;
const door = (tex, x, y, rot, width = DOOR_W) => obj(P.dw + tex, x, y, rot, width / 1.5, 400);   // below the cave wall band, so the walls cover the door ends
const ironDoor = (x, y, rot) => door("Door - Square - Wood - Large - 3x1.webp", x, y, rot);   // reinforced plank door
const light = (x, y, range, color = "ffffad58", intensity = 1) => lights.push({
  position: `Vector2( ${(x * CELL).toFixed(1)}, ${(y * CELL).toFixed(1)} )`, rotation: 0, range, intensity, color,
  texture: "res://textures/lights/soft.png", shadows: true, node_id: nid()
});

// Outside — snowy pine clearing at the mountain foot, trail Palebank → Twinhold
const pine = (x, y, s = 1, rot = 0) => {
  obj(P.fa + "Pine_Shadow_A1_5x5.webp", x, y, 0, s, 100);   // shadow is baked toward one sun direction: never rotate it
  obj(P.fa + "Pine_Green_A1_4x4.webp", x, y, rot, s, 300);
  obj(P.dnd + "Ice/snow_scatter_01.webp", x, y, rot + 45, s * 1.2, 300);
};
for (const [x, y, s, r] of [
  [2.5, 43.5, 1.1, 0], [5.8, 42.6, 0.9, 70], [1.5, 50.5, 1.2, 140], [5.5, 52.5, 1.0, 200], [10.5, 52.8, 1.1, 30],
  [12.0, 43.4, 0.8, 110], [27.5, 43.6, 1.0, 250], [31.5, 42.8, 1.2, 10], [36.5, 44.5, 1.1, 300],
  [38.5, 48.0, 0.9, 80], [26.5, 53.0, 1.0, 160], [21.0, 52.6, 0.8, 220], [15.2, 51.0, 0.7, 90], [35.0, 47.6, 0.8, 40]
]) pine(x, y, s, r);
for (const [x, y, r] of [[8.5, 44.8, 0], [24.2, 44.6, 60], [29.5, 49.0, 120], [3.5, 47.0, 200], [13.5, 49.8, 300], [33.0, 53.0, 30]])
  obj(P.dnd + "Ice/snow_scatter_01.webp", x, y, r, 1.1);
for (const [x, y, r, s] of [[15.6, 41.8, 30, 1.3], [24.4, 41.6, 200, 1.2], [9.2, 41.8, 100, 1.0], [30.2, 41.4, 10, 1.4]])
  obj(P.fa + "Rock_Stone_Slate_A6_2x2.webp", x, y, r, s, 300);
obj(P.bc + "Bandit Cart 3.webp", 9.6, 46.6, 15);        // ambush bait left on the trail
obj(P.bc + "Crate 2.webp", 11.2, 47.8, 40);
obj(P.dnd + "Creature/[DnD] Crea - Corpse/skeleton_humanoid_lying_01.webp", 12.4, 46.2, 80);
// 1 Entrance tunnel — rubble, boulder hiding the Tiny crawl, iron gate where it meets the hall
obj(P.dnd + "Ice/snow_scatter_01.webp", 19.8, 40.8, 0, 1.4);
obj(P.fa + "Rock_Stone_Slate_A3_2x2.webp", 17.0, 36.6, 20, 1.1);
door("Door - Round - Bars - Large - 3x1.webp", 16.2, 23.4, 6, 4.8);   // tunnel is 4 wide
obj(P.dw + "Rubble E - 2x2.webp", 20.5, 33.8, 30);
obj(P.dw + "Rubble H.1 - 2x1.webp", 14.8, 24.8, 100);
obj(P.fa + "Pebble_Stone_Slate_A49_3x2.webp", 18.2, 31.0, 60);
// 2 Guard room — dark, horn for the alarm
obj(P.fa + "Table_Square_Wood_Light_E3_1x1.webp", 24.6, 27.6);
obj(P.fa + "Stool_Wood_Light_B_1x1.webp", 22.3, 27.2);
obj(P.bc + "Stool.webp", 22.5, 28.6, 40);
obj(P.fa + "Warhorn_Dark_Brass_A_1x1.webp", 24.6, 27.4, 30, 0.8);
obj(P.fa + "Shortbow_A_01_1x1.webp", 25.6, 26.4, 70);
obj(P.fa + "Barrel_Wood_Dark_D_1x1.webp", 25.9, 28.4);
ironDoor(23.0, 23.1, 345);                  // iron double door → hall
for (const y of [26.2, 27.4, 28.6]) obj(P.faDoor + "Window_Frame_Stone_Slate_A_1x1.webp", 19.3, y, 90, 0.8, 700); // arrow slits over the tunnel
// 4 Hall — firepit, loot, cart, pillars
obj(P.bc + "Camp Rug 1.webp", 15.8, 16.4, 10, 1, 100);
obj(P.bc + "Firepit.webp", 15.8, 16.2);
obj(P.bc + "Fallen Log Seat.webp", 13.6, 16.0, 90);
obj(P.bc + "Fallen Log Seat.webp", 18.0, 16.6, 95);
obj(P.bc + "Fallen Log Seat.webp", 15.8, 18.4, 0);
obj(P.bc + "Cooking Pot & Pan.webp", 16.6, 15.2);
obj(P.bc + "Makeshift Table.webp", 12.0, 12.4, 10);
obj(P.bc + "Chair 1.webp", 10.9, 12.2, 270);
obj(P.bc + "Chair 3.webp", 13.2, 12.8, 80);
obj(P.fa + "Playing_Cards_A5_1x1.webp", 12.1, 12.3, 0, 0.8);
obj(P.bc + "Bandit Cart 1.webp", 22.4, 18.4, 200);
obj(P.bc + "Crate 1.webp", 22.6, 11.8);
obj(P.bc + "Crate 3.webp", 23.6, 12.6, 20);
obj(P.bc + "Barrel 1.webp", 24.6, 11.8);
obj(P.bc + "Barrel 2.webp", 25.2, 13.0);
obj(P.bc + "Sacks.webp", 21.4, 12.4);
obj(P.bc + "Camp Storage.webp", 19.4, 10.6);
obj(P.bc + "Butchering Table.webp", 8.6, 15.8, 90);
obj(P.bc + "Hunters Skinning Rack.webp", 8.2, 18.2, 80);
obj(P.fa + "Firewood_Pile_Wood_Light_G_1x1.webp", 18.8, 19.2);
obj(P.fa + "Rock_Stone_Slate_A1_2x2.webp", 20.2, 13.4, 110, 1.3);
obj(P.fa + "Rock_Stone_Slate_A6_2x2.webp", 5.4, 13.8, 0, 1.4);
// Fallback line behind the tunnel gate: spike barricades and the cart as cover
obj(P.fa + "Barricade_Spike_Light_A1_2x2.webp", 13.4, 20.4, 340);
obj(P.fa + "Barricade_Spike_Light_A1_2x2.webp", 19.0, 20.6, 20);
obj(P.bc + "Crate 4.webp", 11.8, 19.6, 30);
// 5 Sleeping nook
ironDoor(27.7, 15.4, 90);
obj(P.bc + "Bedroll 1.webp", 31.4, 11.8, 80);
obj(P.bc + "Bedroll 2.webp", 33.8, 12.8, 100);
obj(P.bc + "Bedroll 3.webp", 31.0, 15.0, 85);
obj(P.bc + "Bedroll 4.webp", 34.2, 16.4, 95);
obj(P.bc + "Bedroll 1.webp", 31.6, 18.6, 75);
obj(P.bc + "Rolled Bedroll.webp", 34.0, 19.4, 20);
obj(P.bc + "Camping Backpack.webp", 35.0, 14.4);
obj(P.bc + "Clothesline.webp", 32.6, 21.0, 0, 0.9);
// 6 Prison — barred door, cages, remains at the crawl's end
door("Door - Square - Bars - Large - 3x1.webp", 9.05, 22.4, 14);
obj(P.dnd + "Furniture/[DnD] Furn - Animal/metal_cage_01.webp", 7.6, 26.6);
obj(P.dnd + "Furniture/[DnD] Furn - Animal/metal_cage_01.webp", 10.0, 28.4, 15);
obj(P.fa + "Cage_Wood_Light_B_3x2.webp", 8.4, 31.2, 90);
obj(P.fu + "Clutter - Bucket 1 - Dark.webp", 10.6, 25.4);
obj(P.dnd + "Creature/[DnD] Crea - Corpse/skeleton_humanoid_remains_01.webp", 9.6, 33.4, 140);
// 8 Leader's den — wardrobe hides the secret way to 9, trapped door
ironDoor(7.9, 9.7, 335);
obj(P.cf + "Decoration, bear skin, rug.webp", 5.8, 6.2, 10);
obj(P.cf + "Bed, medium, double.webp", 3.4, 4.2, 90);
obj(P.fa + "Desk_Rectangle_Wood_Light_B1_2x1.webp", 6.2, 2.8);
obj(P.fa + "Map_World_A_2x1.webp", 6.2, 2.8, 0, 0.6);
obj(P.fa + "Chair_Wood_Light_F_1x1.webp", 6.2, 3.8, 180);
obj(P.fa + "Chest_Wood_Light_C_1x1.webp", 3.4, 7.4);
obj(P.fa + "Wardrobe_Wood_Light_A1_2x1.webp", 10.3, 5.0, 90);
obj(P.fa + "Brazier_Orange_A_Lit_1x1.webp", 8.6, 7.8);
// 9 Vault
obj(P.cf + "Chest, classic, large, locked.webp", 15.6, 3.2);
obj(P.fu + "Chest 2 - Gold.webp", 16.6, 5.0, 30);
obj(P.fu + "Chest 1 - Steel.webp", 14.4, 5.8, 340);
obj(P.fu + "Clutter - Scales - Gold.webp", 16.8, 3.6);
obj(P.cf + "Sack, pile, kitchen.webp", 14.0, 3.4);

// Lights: ambient is dark, so only lit spots read
light(15.8, 16.2, 6, "ffffad58", 1);            // firepit
light(12.0, 12.4, 2.5, "ffeccd8b", 0.7);        // card table lantern glow
light(8.6, 7.8, 4, "ffffad58", 0.9);            // leader brazier
light(32.6, 15.6, 2.5, "ffeccd8b", 0.5);        // sleeping embers
light(19.8, 41.0, 6, "ffe8eef8", 0.8);          // daylight spilling into the mouth
for (const x of [6, 20, 34]) light(x, 48.5, 12, "ffe8eef8", 1);   // overcast winter daylight outside

/* ---------------- assemble ---------------- */
const L = m.world.levels["0"];
m.world.width = W; m.world.height = H;
L.environment = { baked_lighting: true, ambient_light: "ff2a2d33" };
L.tiles.cells = pool("PoolIntArray", new Array(W * H).fill(-1));
L.tiles.colors = new Array(W * H).fill("ffffffff");
L.cave.bitmap = pool("PoolByteArray", cave);
L.cave.entrance_bitmap = pool("PoolByteArray", entrance);
L.cave.texture = "res://packs/H0qJGoEK/textures/caves/Dark - Cave Wall 1/floor.webp";
L.cave.ground_color = "ffffffff"; L.cave.wall_color = "ffffffff";
Object.assign(L.terrain, {
  enabled: true, smooth_blending: true,
  texture_1: "res://packs/FA30DDXY/textures/terrain/Rock_Ground_02_A.png",
  texture_2: "res://packs/FA30DDXY/textures/terrain/Dirt_B_01.webp",
  texture_3: "res://packs/DnDgCORE/textures/terrain/snow_flats.webp",
  texture_4: "res://packs/FA30DDXY/textures/terrain/Cave_Floor_A.webp",
  splat: pool("PoolByteArray", splat)
});
L.objects = objects; L.lights = lights;
m.world.next_node_id = nextId.toString(16);
m.header.editor_state.camera_position = `Vector2( ${W * CELL / 2}, ${H * CELL / 2} )`;
m.header.editor_state.camera_zoom = 1;
fs.writeFileSync(outPath, JSON.stringify(m, null, "\t"));

// ASCII preview (1 char = half a cell) for a quick sanity check
let out = "";
for (let y = 0; y < H; y += 0.5) { let r = ""; for (let x = 0; x < W; x += 0.5) r += open(x, y) ? "." : "#"; out += r + "\n"; }
fs.writeFileSync(outPath + ".txt", out);
console.log("objects", objects.length, "lights", lights.length, "cave bytes", cave.length);
