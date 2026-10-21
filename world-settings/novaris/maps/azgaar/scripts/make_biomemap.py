"""Classify the occidentalavian Exandria map into Azgaar biome ids (red channel = biome id).

Azgaar ids: 0 marine, 1 hot desert, 2 cold desert, 3 savanna, 4 grassland, 5 tropical seasonal forest,
6 temperate deciduous forest, 7 tropical rainforest, 8 temperate rainforest, 9 taiga, 10 tundra,
11 glacier, 12 wetland; 13+ are Exandria biomes listed in CUSTOM (sidecar <out>.json).
"""
import json
import sys
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
import wildemount_ref as wref

src, heightmap, out, preview = sys.argv[1:5]
im = Image.open(src).convert("RGB")  # mid res 3240x2160
W, H = im.size
a = np.asarray(im).astype(float)
s = np.stack([ndi.gaussian_filter(a[..., i], 4) for i in range(3)], -1)  # wash out ink lines
R, G, B = s[..., 0], s[..., 1], s[..., 2]
lum = s.mean(-1)
sat = (s.max(-1) - s.min(-1)) / np.maximum(s.max(-1), 1)

hm = np.asarray(Image.open(heightmap).convert("L").resize((W, H), Image.NEAREST)).astype(float)
land = hm >= 52
# mountain score from the heightmap (same pipeline that made the relief)
mountain = hm >= 118  # mountain cores (heightmap peaks raised to 220 for Azgaar mountain icons)

# latitude bands (1080-preview coords) with a wobbly edge so they don't read as straight lines
rng = np.random.default_rng(7)
wobble = ndi.gaussian_filter(rng.standard_normal((H, W)), 60)
wobble = wobble / np.abs(wobble).max() * 45
y = np.broadcast_to(np.arange(H)[:, None] / H * 1080, (H, W)) + wobble
cls = np.full((H, W), -1, np.int16)
snow = (lum > 195) & (sat < 0.09)
# only real ice fields count (white city icons / lakes glare are small)
sl, sn = ndi.label(snow & land)
big = np.zeros(sn + 1, bool); big[1:] = ndi.sum(snow & land, sl, range(1, sn + 1)) > 4000
snow = big[sl]
near_snow = ndi.distance_transform_edt(~snow) < 70
north = (y < 235) | near_snow
south = y > 560
desert = (lum > 175) & (R - G > 15) & (G - B > 25)
savanna = (lum > 150) & (R - G > 10) & ~desert
brown_ink = (R - G > 8) & (lum <= 150)           # mountain ink / shading: no biome of its own
blight = (R - G > 55)
# forests are drawn as scattered tree icons, so judge by how many dark-green icon pixels are nearby
trees = ((a[..., 1] - a[..., 0]) > 4) & (a.mean(-1) < 120)
forest = (ndi.uniform_filter(trees.astype(np.float32), 31) > 0.17) & land & ~desert & ~blight
grass = ~forest & ~desert & ~savanna & ~brown_ink & ~blight

cls[grass] = np.where(north, 10, 4)[grass]
cls[savanna & ~forest] = 3
# conifers are drawn as dark blue-green trees, broadleaf woods as lighter yellow-green: dark woods are taiga
# even south of the northern band (Bysaes Tyl, Dunrock)
dark_wood = ndi.uniform_filter(a.mean(-1), 31) < 110
dark_wood[:, :int(W * 1225 / 1800)] = False; dark_wood[int(H * 330 / 1200):] = False  # reviewed so far: north Wildemount
cls[forest] = np.where(north | (dark_wood & ~south), 9, np.where(south, 7, 6))[forest]
cls[desert] = 1
cls[blight] = 2
cls[snow] = 11
cls[brown_ink & ~blight & ~forest] = -1
# mountain icons are grey/brown ink, not a biome: inherit from the nearest non-mountain pixel
cls[mountain & ~snow & ~forest] = -1  # forested mountains keep their forest
cls[~land] = -1
known = cls >= 0
idx = ndi.distance_transform_edt(~known, return_distances=False, return_indices=True)
cls = cls[idx[0], idx[1]]
cls[~land] = 0

# majority vote in a small window to remove speckle
ids = np.arange(13)
votes = np.stack([ndi.uniform_filter((cls == i).astype(np.float32), 15) for i in ids])
cls = ids[votes.argmax(0)].astype(np.uint8)
cls[~land] = 0
cls[land & (cls == 0)] = 4

# --- Exandria-specific biomes (ids 13+, defined in CUSTOM and written to <out>.json for Azgaar) ---
CUSTOM = [
    {"id": 13, "name": "Xhorhas Badlands", "color": "#a08660", "habitability": 15},
    {"id": 14, "name": "Greying Wildlands", "color": "#6f6680", "habitability": 6,
     "iconsDensity": 150, "icons": {"conifer": 3, "deciduous": 1}},  # dense purple-and-green woods
    {"id": 15, "name": "Rosohna Blight", "color": "#8e2b2b", "habitability": 2},
    {"id": 16, "name": "Lava Flow", "color": "#e0561b", "habitability": 0, "noIce": True},
]
k = W / 1620  # boxes in 1620x1080 preview coords


def box(x0, y0, x1, y1):
    m = np.zeros((H, W), bool)
    m[int(y0 * k):int(y1 * k), int(x0 * k):int(x1 * k)] = True
    return m


# Xhorhas: east of the Ashkeeper ridge; the cut line wobbles so it doesn't read as a ruler line
xs = np.broadcast_to(np.arange(W)[None, :] / k, (H, W)) + wobble * 0.9
xhorhas = box(1322.5, 255, 1620, 525) & (xs > 1362.5)
open_ground = np.isin(cls, [2, 3, 4, 10])  # not forest, snow or desert
brown = ((R - G) > 4) & ((R - B) > 25) & (lum < 200)
cls[xhorhas & land & open_ground & brown] = 13
# (biome 14 "Greying Wildlands" purple woods is no longer painted: the official Wildemount map shows
# Savalirwood / Pearlbow there as green forest — see the Wildemount override below)
# grid review E1: snow white like the world map (DM choice) — Crystalsands keeps its ice; Palebank's beige label ink
# read as savanna, and the north half of Bysaes Tyl plus the islets west of it are snow on the source too
cls[box(1309.5, 126, 1372.5, 200) & land & np.isin(cls, [2, 3, 4, 10])] = 11
cls[box(1234.5, 205, 1284.5, 228) & land & np.isin(cls, [2, 3, 4, 10])] = 11
cls[box(1172.5, 228, 1234.5, 262) & land & np.isin(cls, [2, 3, 4, 10])] = 11
# ...but only Crystalsands: east and south of it (Flotket Alps, Uthodurn, Rime Plains) the Wildemount map is
# tundra, not an ice sheet. Crystalsands = the peninsula west of the Palebank -> Flotket Alps ridge
cs = Image.new("L", (W, H), 0)
ImageDraw.Draw(cs).polygon([(x * W / 1800, y * H / 1200) for x, y in
                            [(1445, 120), (1528, 120), (1530, 182), (1503, 206), (1495, 230), (1503, 252), (1445, 252)]], fill=1)
cs = np.asarray(cs) > 0
cols = np.clip(np.arange(W)[None, :] + (wobble * 0.15).astype(int), 0, W - 1)  # wobbly edge, not straight segments
cs = np.take_along_axis(cs, cols, 1)
north_main = box(1309.5, 126, 1552.5, 270) & land & ~cs

# --- Wildemount from the official continent map (scripts/wildemount_ref.py) ---
# forests, open land and the Rosohna blight follow Wildemount.jpg; snow/ice and Xhorhas badlands stay as above
ka = W / 1800
lab, n = ndi.label(land)
cent = np.array(ndi.center_of_mass(land, lab, range(1, n + 1))) / ka if n else np.zeros((0, 2))
wm_ids = np.zeros(n + 1, bool)
wm_ids[1:] = (cent[:, 1] > 1039) & (cent[:, 0] < 800)  # Wildemount + Menagerie islands, not Tal'Dorei / Shattered Teeth
wm = wm_ids[lab] & ~wref.box_mask((W, H), wref.EISEL)
ref = {k_: wref.to_grid(v, (W, H)) > 0.5 for k_, v in wref.classes().items()}
woods = [5, 6, 7, 8, 9]
yy = np.broadcast_to(np.arange(H)[:, None] / ka, (H, W))
quoraska = wref.box_mask((W, H), (1345, 560, 1455, 660))  # Quoraska Jungle: the only tropical wood in Wildemount
cls[wm & np.isin(cls, woods + [14]) & ~ref["forest"]] = 4  # world-map woods the official map leaves open
cls[wm & (cls == 1)] = 4  # no hot desert this far north (Far Hharom)
f = wm & ref["forest"] & (cls != 11)
# whole woods take one type (no straight seam through a forest): north woods taiga, Quoraska tropical
fl, fn = ndi.label(f)
fy = np.array(ndi.center_of_mass(f, fl, range(1, fn + 1)))[:, 0] / ka if fn else np.zeros(0)
in_q = ndi.mean(quoraska, fl, range(1, fn + 1)) if fn else np.zeros(0)
ftype = np.full(fn + 1, 8, np.int16)  # temperate rainforest: dark green like the official map's woods
ftype[1:][fy < 330] = 9
ftype[1:][np.asarray(in_q) > 0.5] = 7
cls[f] = ftype[fl[f]]
cls[wm & ref["meadow"] & np.isin(cls, woods + [1, 2, 3, 10, 13])] = 4
# Quoraska Jungle covers the whole southern peninsula on the official map, but our coastline there is the
# world map's, so the warped forest misses half of it: fill the peninsula south of a wobbly line instead
xx = np.broadcast_to(np.arange(W)[None, :] / ka, (H, W))
peninsula = (yy + wobble / 45 * 8 > 598) & (xx > 1375) & (xx < 1495)
cls[wm & peninsula & np.isin(cls, [1, 3, 4, 5, 6, 9, 10, 13])] = 7
cls[wm & (cls == 15)] = 13
cls[wm & ref["blight"]] = 15
# Xhorhas badlands only east of the Dunrock -> Ashkeeper crest (the world map's brown spills onto the Empire side
# at Grimgolir and Yarbel), and not on Far Hharom, which the official map paints like the plains
crest_y = [330, 340, 345, 370, 395, 420, 445, 500, 530, 580, 720]  # north of the gulch shore is Rime Plains
crest_x = [1800, 1555, 1550, 1550, 1547, 1535, 1520, 1528, 1537, 1545, 1545]
west_of_crest = xx + wobble * 0.1 < np.interp(yy, crest_y, crest_x)
cls[wm & (cls == 13) & west_of_crest] = 4
cls[wm & (cls == 13) & wref.box_mask((W, H), (1680, 285, 1790, 375))] = 4

cls[north_main & wm & (cls == 11)] = 10

# Eiselcross is all ice: the pale sun-washed patches on the source read as savanna/grassland/tundra
eisel = box(1102.5, 36, 1309.5, 185) & land
cls[eisel & np.isin(cls, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12])] = 11

# the lava flow across Foren is no longer a biome band: Azgaar draws it as a thin line from heightmaps/exandria-lava.json

out_img = Image.fromarray(cls, "L").resize((1620, 1080), Image.NEAREST)
out_img.save(out)
pal = {0: (70, 110, 171), 1: (251, 231, 159), 2: (181, 184, 135), 3: (210, 208, 130), 4: (200, 214, 143),
       5: (182, 217, 93), 6: (41, 188, 86), 7: (125, 203, 53), 8: (64, 156, 67), 9: (75, 107, 50),
       10: (150, 120, 75), 11: (213, 231, 235), 12: (11, 145, 49)}
pal.update({b["id"]: tuple(int(b["color"][i:i + 2], 16) for i in (1, 3, 5)) for b in CUSTOM})
c = np.asarray(out_img)
rgb = np.zeros(c.shape + (3,), np.uint8)
for k, v in pal.items():
    rgb[c == k] = v
Image.fromarray(rgb).save(preview)
with open(out.rsplit(".", 1)[0] + ".json", "w", encoding="utf-8") as f:
    json.dump(CUSTOM, f, indent=2)
print({int(k): int((c == k).sum()) for k in np.unique(c)})
