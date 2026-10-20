"""Build an Azgaar-compatible grayscale heightmap from the occidentalavian Exandria map.

Azgaar: red channel / 255 -> lightness; < 0.2 = water. So land must be >= 52.
"""
import sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi

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
st = np.zeros_like(land); st[int(700*k0):int(1000*k0), int(1040*k0):int(1610*k0)] = True
land &= ~st | (satf > 0.22)
# cartouches / legend boxes (coords in 1620x1080 preview space)
k = W / 1620
boxes = [
    (0, 0, 300, 55), (0, 975, 195, 1080), (1490, 945, 1620, 1080), (735, 750, 910, 855),
    (130, 228, 230, 262), (592, 234, 712, 268), (975, 188, 1125, 222),
    (528, 802, 637, 836), (1135, 916, 1325, 954),
    (0, 55, 160, 125), (1560, 80, 1620, 120),
    # sea labels drawn in land-coloured ink, and paper noise along the frame
    (1045, 428, 1072, 495), (1048, 571, 1120, 595),
    (1330, 0, 1620, 65), (0, 110, 60, 150), (0, 880, 75, 975),
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
# fill enclosed holes (dark ink / small lakes) inside land
holes = ndi.binary_fill_holes(land) & ~land
hl, hn = ndi.label(holes)
hs = ndi.sum(holes, hl, range(1, hn + 1))
# keep a hole as a lake only if it is actually blue water; fill everything else (misty forest, ink, snow seams)
blue = ndi.mean((B - R).astype(float), hl, range(1, hn + 1))
fill = np.zeros(hn + 1, bool); fill[1:] = ~((blue > 4) & (hs > 80))
land |= fill[hl]

# --- elevation ------------------------------------------------------------
mx = a.max(-1).astype(float)
mn = a.min(-1).astype(float)
val = mx / 255
sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1), 0)
lum = a.mean(-1).astype(float)
# mountain icons: grey/brown (low G-B, not green) and darker than plains/desert
mtn = ((G - B) < 28) & ((R - G) > -8) & (lum < 150) & land
snow = ((sat < 0.10) & (val > 0.84) & land)
mount = ndi.gaussian_filter(mtn.astype(float), 4 * k) * 1.5 + ndi.gaussian_filter(snow.astype(float), 4 * k) * 0.5
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
h = np.clip(h, 0, 255).astype(np.uint8)

img = Image.fromarray(h, "L").resize((round(1200 * W / H), 1200), Image.BOX)
img.save(out)
img.resize((round(1080 * W / H), 1080)).save(preview)
print("size", img.size)
print("land fraction", land.mean().round(3), "components", int(keep.sum()))
