"""Build an Azgaar-compatible grayscale heightmap from the occidentalavian Exandria map.

Azgaar: red channel / 255 -> lightness; < 0.2 = water. So land must be >= 52.
"""
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi
import aldenreich_ref as wref

src, out, preview = sys.argv[1], sys.argv[2], sys.argv[3]
im = Image.open(src).convert("RGB")  # 3240x2160 (2x the 1620 preview)
W, H = im.size
a = np.asarray(im).astype(np.int16)
R, G, B = a[..., 0], a[..., 1], a[..., 2]

# --- land / water ---------------------------------------------------------
# ocean is light and cool (B >= R); every land colour (green, brown, tan, warm snow) is warm
mx0 = a.max(-1)
ocean = ((B - R) >= -3) & (mx0 > 150)
land = ~ocean
warm = land.copy()
# snow / ice: near-white and brighter than any ocean pixel (~222)
satw = (a.max(-1) - a.min(-1)) / np.maximum(a.max(-1), 1)
land |= (a.max(-1) > 226) & (satw < 0.07)
# Shattered Teeth sits under a cloud/mist overlay: there only saturated colour counts as land
mxf = a.max(-1).astype(float); satf = (mxf - a.min(-1)) / np.maximum(mxf, 1)
k0 = W / 1620
st = np.zeros_like(land); st[int(700*k0):int(1000*k0), int(1062.5*k0):int(1632.5*k0)] = True
land &= ~st | (satf > 0.22)
# cartouches / legend boxes (coords in 1620x1080 preview space)
k = W / 1620
ka = W / 1800
boxes = [
    (0, 0, 300, 55), (0, 975, 195, 1080), (1512.5, 945, 1620, 1080), (735, 750, 910, 855),
    (130, 228, 230, 262), (592, 234, 712, 268), (997.5, 188, 1147.5, 222),
    (528, 802, 637, 836), (1157.5, 916, 1347.5, 954),
    (0, 55, 160, 125), (1582.5, 80, 1620, 120),
    # sea labels drawn in land-coloured ink, and paper noise along the frame
    (1067.5, 428, 1094.5, 495), (1070.5, 571, 1142.5, 595),
    (1352.5, 0, 1620, 65), (0, 110, 60, 150), (0, 880, 75, 975),
]
for x0, y0, x1, y1 in boxes:
    land[int(y0 * k):int(y1 * k), int(x0 * k):int(x1 * k)] = False
m = int(10 * k)  # frame border
land[:m] = land[-m:] = False
land[:, :m] = land[:, -m:] = False

# remove text / grid-line speckles, fill lakes-as-noise inside land
# sea labels: red-brown lettering + pale halo. Drop them where the surroundings are mostly sea
# (names printed on land stay, the solid red Rosohna blight is too dense to count as lettering)
lum0 = a.mean(-1)
ink = ((R - G) > 25) & ((G - B) < 22) & (lum0 < 150)
ink &= ndi.uniform_filter(ink.astype(np.float32), 9) < 0.6
label = ndi.binary_dilation(ink, iterations=4)
sea_around = ndi.uniform_filter(ocean.astype(np.float32), 25) > 0.35
land &= ~(label & sea_around)
raw = land.copy()
land = ndi.binary_opening(raw, iterations=2)  # kills hairline ink, keeps narrow peninsulas
land = ndi.binary_closing(land, iterations=1)  # small: wider closing fuses islands across straits
# thin parts (gone after a stronger opening) survive only if painted like land: green or light fill.
# Sea labels (CLOVIS CONCORD, MENAGERIE COAST...) are brown ink, so they drop out here
core = ndi.binary_dilation(ndi.binary_opening(raw, iterations=4), iterations=4) & land
lum_s = ndi.uniform_filter(a.mean(-1).astype(float), 5)
green_s = ndi.uniform_filter((G - R).astype(float), 5)
land = core | (land & ~core & ((green_s > 3) | (lum_s > 125)))
lab, n = ndi.label(land)
sizes = ndi.sum(land, lab, range(1, n + 1))
keep = np.zeros(n + 1, bool)
warm_n = ndi.sum(warm & land, lab, range(1, n + 1))
keep[1:] = (sizes >= 40) & (warm_n >= 0.5 * sizes)   # drop white sea-glare blobs with no real land colour
land = keep[lab]
# Shattered Teeth islets: rocks of a few px are lost to the opening above and, smaller than an Azgaar cell
# (~2.7 px), would sink anyway. Put each back as a disc ~1.5 cells wide
rl, rn_ = ndi.label(raw & st & ~land)
rsize = ndi.sum(raw, rl, range(1, rn_ + 1))
rsat = ndi.mean(satf, rl, range(1, rn_ + 1))
rgreen = ndi.mean((G - R).astype(float), rl, range(1, rn_ + 1))  # green rock, not red-brown lettering (FOOL'S CURTAIN)
islet = np.zeros(rn_ + 1, bool); islet[1:] = (rsize >= 4) & (rsize < 400) & (rsat > 0.2) & (rgreen > 0)
islets = islet[rl] & ~ndi.binary_dilation(land, iterations=round(2 * ka))  # not the fringe of a kept island
islets = ndi.binary_dilation(islets, iterations=round(1.5 * ka))
print("teeth islets", int(ndi.label(islets)[1]))
land |= islets
# fill enclosed holes (dark ink / small lakes) inside land
holes = ndi.binary_fill_holes(land) & ~land
hl, hn = ndi.label(holes)
hs = ndi.sum(holes, hl, range(1, hn + 1))
# keep a hole as a lake only if it is actually blue water; fill everything else (misty forest, ink, snow seams)
blue = ndi.mean((B - R).astype(float), hl, range(1, hn + 1))
fill = np.zeros(hn + 1, bool); fill[1:] = ~((blue > 4) & (hs > 80))
land |= fill[hl]

# hand fixes from the grid review (scripts/grid_compare.py), Azgaar 1800x1200 coords: (x0, y0, x1, y1)
SEA_FIX = [
    (1469, 22, 1536, 124),   # E1: two paper-noise islets in the Frigid Depths north of Palebank
    (1448, 134, 1465, 160),  # E1: "Kaltsel" lettering east of the island
    (1437, 134, 1448, 145),  # E1: "Kaltsel" lettering north of the island
    (1250, 153, 1296, 176),  # E1: "EISELCROSS"
    (1251, 140, 1269, 147),  # E1: "Gelier"
    (1288, 143, 1297, 152), (1297, 154, 1310, 163),  # E1: "Schneescel"
    (1320, 177, 1349, 189),  # E1: "Frostbogen"
    (1384, 195, 1406, 203),  # E1: "Taergoss"
    (1376, 108, 1386, 115),  # E1: "Salsvault"
    (1391, 52, 1401, 72), (1381, 50, 1395, 59),  # E1: "Dampfkan"
    (1237, 58, 1257, 69),    # M1: "Biessel"
    (1293, 165, 1303, 176),  # M2: tail of "Schneescel"
]
LAND_FIX = []
for x0, y0, x1, y1 in SEA_FIX:
    land[int(y0 * ka):int(y1 * ka), int(x0 * ka):int(x1 * ka)] = False
for x0, y0, x1, y1 in LAND_FIX:
    land[int(y0 * ka):int(y1 * ka), int(x0 * ka):int(x1 * ka)] = True

# Wildemount lakes: the world map draws them several times wider than the Wildemount map does
# (Copia Lake, Sorrowseep Waters, Feverguff Lake, Kaltenloch ...): keep only the inner half of each
wl, wn = ndi.label(~land)
wsize = ndi.sum(np.ones_like(land), wl, range(1, wn + 1))
wcen = np.array(ndi.center_of_mass(~land, wl, range(1, wn + 1))) / ka
wild_lake = np.zeros(wn + 1, bool)
wild_lake[1:] = (wsize < 0.002 * land.size) & (wcen[:, 1] > 1220) & (wcen[:, 0] > 215) & (wcen[:, 0] < 720)
lake_px = wild_lake[wl]
depth = ndi.distance_transform_edt(lake_px)
deepest = np.zeros(wn + 1); deepest[1:] = ndi.maximum(depth, wl, range(1, wn + 1))
land |= lake_px & (depth < 0.5 * deepest[wl])

# --- elevation ------------------------------------------------------------
mx = a.max(-1).astype(float)
mn = a.min(-1).astype(float)
val = mx / 255
sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1), 0)
lum = a.mean(-1).astype(float)
# mountain icons: grey/brown (low G-B, not green) and darker than plains/desert
mtn = ((G - B) < 28) & ((R - G) > -8) & (lum < 150) & land
# the Greying Wildlands' purple woods are dark and not green: a whole patch that dark is forest, not mountain shading
dark_patch = ndi.uniform_filter(lum, 15) < 100
dark_patch[:int(211 * ka)] = False; dark_patch[int(328 * ka):] = False  # Greying Wildlands box only
dark_patch[:, :int(1420 * ka)] = False; dark_patch[:, int(1553 * ka):] = False
mtn &= ~(dark_patch & (ndi.uniform_filter((B - G).astype(float), 15) > -15) & (ndi.uniform_filter((G - R).astype(float), 15) < 0))
snow = ((sat < 0.10) & (val > 0.84) & land)
mount = ndi.gaussian_filter(mtn.astype(float), 4 * k) * 1.5 + ndi.gaussian_filter(snow.astype(float), 4 * k) * 0.5
# north Wildemount (grid review E1): grey mountain icons with light faces are too bright for the ink rule above.
# A mountain patch is busy (high local contrast), not dark like the purple woods, and not green like conifers
nw = np.zeros_like(land); nw[int(200 * ka):int(330 * ka), int(1355 * ka):int(1800 * ka)] = True
L15 = ndi.uniform_filter(lum, 15)
SD15 = np.sqrt(np.maximum(ndi.uniform_filter(lum ** 2, 15) - L15 ** 2, 0))
shade = ndi.uniform_filter((lum < 130).astype(float), 15) > 0.15  # icons carry dark shading; lake shores and snow texture don't
busy = (SD15 > 30) & (L15 > 105) & shade & (ndi.uniform_filter((G - R).astype(float), 15) < 8) & land & nw
mount = np.maximum(mount, ndi.gaussian_filter(busy.astype(float), 3 * k) * 1.3 * nw)
# Eiselcross: thin grey hatching on white snow is too faint for the rule above, but the islands are
# mountains nearly everywhere on the source map. Count dark ink away from the coastline outline
eisel = np.zeros_like(land); eisel[int(30 * ka):int(215 * ka), int(1235 * ka):int(1425 * ka)] = True
eisel_box = eisel.copy()
# the same faint hatching marks the snowy peaks of Crystalsands / Flotket Alps / Rime Plains (white background only)
snowfield = np.zeros_like(land); snowfield[int(120 * ka):int(270 * ka), int(1445 * ka):int(1800 * ka)] = True  # same box as make_peaks.py
eisel |= snowfield & (ndi.uniform_filter(lum, 41) > 185)
text = ndi.binary_dilation((lum < 70) | ((R - B) > 40), iterations=4)  # black lettering and the tan lava line are not hatching
hatch = (lum < 170) & (sat < 0.25) & ~text & ndi.binary_erosion(land, iterations=6) & eisel
# Wildemount ranges from the official map (scripts/aldenreich_ref.py): the world map barely hatches the Flotket
# Alps / Mythburrow, and scatters the Xhorhas peaks over the Barbed Fields instead of the Penumbra arc
ref_mtn = wref.to_grid(wref.mountains(), (W, H))
# snowfield: only the official ranges (Crystalsands and Rime Plains are flat there)
snow_zone = snowfield & ~eisel_box
hatch = np.where(snow_zone, (ref_mtn > 0.3) & ndi.binary_erosion(land, iterations=6), hatch)
xh = ndi.gaussian_filter(wref.box_mask((W, H), (1570, 365, 1800, 620)).astype(float), 8 * ka)  # feathered edge
# Xhorhas: the Barbed Fields basin is dotted with dark rocks, so only the darkest ink counts as the Penumbra arc
xh_mtn = np.clip(wref.to_grid(wref.mountains(dark=88), (W, H)) * 1.4, 0, 1)
mount = mount * (1 - xh) + xh_mtn * xh
# elsewhere in Wildemount only the official ranges count (Ashkeeper, Dunrock, Silberquel, Cyrios, Hearthstar): the
# world map scatters peaks over the Rime Plains, the Barbed Fields and Bromkiln Hills
lab_, n_ = ndi.label(land)
cen = np.array(ndi.center_of_mass(land, lab_, range(1, n_ + 1))) / ka
wm_ids = np.zeros(n_ + 1, bool); wm_ids[1:] = (cen[:, 1] > 1039) & (cen[:, 0] < 800)
mount = np.where(wm_ids[lab_], np.clip(ref_mtn * 2.5, 0, 1) * (1 - xh) + xh_mtn * xh, mount)  # ink share 0.35+ = peak
# on these snowfields the hatching alone decides: no hills from snow glare or stray tree icons
# peak or flat, nothing in between: a soft edge would ring every range with hill icons the source doesn't draw
mount = np.where(eisel, (ndi.gaussian_filter(hatch.astype(float), 4 * k) * 30 > 0.75).astype(float), mount)
mount = np.clip(mount, 0, 1)

# --- widen the strait between Tal'Dorei and Wildemount ----------------------
# every landmass whose centroid is east of CUT (Wildemount, Eiselcross, Menagerie islands,
# Shattered Teeth) moves GAP px east on a wider canvas
CUT, GAP = int(935 * k), 0  # set GAP > 0 to widen the strait
lab, n = ndi.label(land)
cx = np.array(ndi.center_of_mass(land, lab, range(1, n + 1)))[:, 1] if n else np.array([])
east_ids = np.zeros(n + 1, bool); east_ids[1:] = cx > CUT
east = east_ids[lab]
W2 = W + GAP
land2 = np.zeros((H, W2), bool); mount2 = np.zeros((H, W2))
land2[:, :W] |= land & ~east; mount2[:, :W] += np.where(east, 0, mount)
land2[:, GAP:] |= land & east; mount2[:, GAP:] += np.where(east, mount, 0)
land, mount, W = land2, mount2, W2
# straits narrower than ~2 Azgaar cells: Azgaar averages ~2.7 px per cell, so a strait at the
# shallow-coast height (50) between two shores turns into land. These get deep water instead.
strait = ndi.binary_closing(land, iterations=round(3 * ka)) & ~land

dist_land = ndi.distance_transform_edt(land)
dist_sea = ndi.distance_transform_edt(~land)

h = np.zeros((H, W), float)
inland = np.clip(dist_land / (40 * k), 0, 1)
h[land] = 57 + 10 * inland[land] + 200 * np.clip(mount[land] - 0.2, 0, 1) ** 1.2  # peaks reach Azgaar 71+ (mountain icons)
sea_depth = np.clip(dist_sea / (60 * k), 0, 1)
# shallow water right at the coast sits just under the land threshold (51) so Azgaar's cell
# averaging keeps narrow land and islets instead of drowning them
h[~land] = 50 - 40 * sea_depth[~land]
h = ndi.gaussian_filter(h, 1.5 * k)
h[land] = np.maximum(h[land], 57)
h[~land] = np.minimum(h[~land], 50)
h[strait] = np.minimum(h[strait], 20)
h = np.clip(h, 0, 255).astype(np.uint8)

img = Image.fromarray(h, "L").resize((round(1200 * W / H), 1200), Image.BOX)
# snowfields: snap what the blur and resize left between flat (< 128) and peak (>= 181) so no hill icons ring the ranges
snapzone = np.asarray(Image.fromarray(eisel.astype(np.uint8) * 255).resize(img.size, Image.BOX)) > 0
ha = np.asarray(img).copy()
mid = snapzone & (ha >= 128) & (ha < 181)
ha[mid] = np.where(ha[mid] >= 160, 181, 120)
img = Image.fromarray(ha, "L")
img.save(out)
img.resize((round(1080 * W / H), 1080)).save(preview)
print("size", img.size)
print("land fraction", land.mean().round(3), "components", int(keep.sum()))
