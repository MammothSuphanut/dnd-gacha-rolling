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
mountain = hm >= 95

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
cls[forest] = np.where(north, 9, np.where(south, 7, 6))[forest]
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
    {"id": 14, "name": "Greying Wildlands", "color": "#6f6680", "habitability": 6},
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
xhorhas = box(1300, 255, 1610, 525) & (xs > 1340)
open_ground = np.isin(cls, [2, 3, 4, 10])  # not forest, snow or desert
brown = ((R - G) > 4) & ((R - B) > 25) & (lum < 200)
cls[xhorhas & land & open_ground & brown] = 13
# Greying Wildlands: the dark purple-grey woods south of the ice, traced by darkness, then smoothed
grey = box(1255, 190, 1375, 295) & land & (cls != 11) & (lum < 150)
grey = ndi.gaussian_filter(grey.astype(np.float32), 8) > 0.5
cls[grey & land & (cls != 11)] = 14
cls[ndi.binary_dilation(xhorhas & land & ((R - G) > 45), iterations=3) & land] = 15

# Eiselcross is all ice and tundra: the pale sun-washed patches on the source read as savanna/grassland
eisel = box(1080, 36, 1287, 185) & land
cls[eisel & np.isin(cls, [1, 2, 3, 4, 5, 6, 7, 8, 12])] = 10

# lava flow across Foren (Eiselcross), traced from the source map; points in 1800x1200 Azgaar coords
LAVA = [(1326, 70), (1323, 79), (1317, 89), (1313, 102), (1317, 111), (1324, 122), (1334, 133), (1338, 140),
        (1347, 151), (1360, 162), (1372, 168), (1380, 172)]
lava = Image.new("L", (W, H), 0)
ImageDraw.Draw(lava).line([(x * W / 1800, y * H / 1200) for x, y in LAVA], fill=1, width=int(round(4 * W / 1800)), joint="curve")
cls[(np.asarray(lava) > 0) & land] = 16

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
