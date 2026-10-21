"""Find the individual snowy-mountain icons drawn on the source map's snowfields, so Azgaar can put one
relief icon on each instead of filling the range by rule (grid review M1: "fewer, and where the source has them").

usage: python scripts/make_peaks.py mid.png heightmaps/exandria.png heightmaps/exandria-peaks.json [preview.png]
Output: {"zones": [[x0, y0, x1, y1], ...], "peaks": [[x, y, size], ...]} in Azgaar 1800x1200 coords;
x, y = the centre of the icon. Azgaar drops its own icons on glacier cells inside a zone.
"""
import json
import sys
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
import wildemount_ref as wref

src, heightmap, out = sys.argv[1:4]
a = np.asarray(Image.open(src).convert("RGB")).astype(float)  # 3240x2160
H, W = a.shape[:2]
ka = W / 1800
R, G, B = a[..., 0], a[..., 1], a[..., 2]
lum = a.mean(-1)
sat = (a.max(-1) - a.min(-1)) / np.maximum(a.max(-1), 1)

DX, DY = 0, 1  # icon centre vs. hatch centre, Azgaar px
SPACING = 6  # Azgaar px between icons in a range
MIN_DENS = 0.06  # stroke share that counts as a drawn range
ZONES = [
    (1235, 30, 1425, 215),   # Eiselcross
    (1445, 120, 1800, 270),  # Crystalsands, Flotket Alps, Rime Plains
]
zone = np.zeros((H, W), bool)
for x0, y0, x1, y1 in ZONES:
    zone[int(y0 * ka):int(y1 * ka), int(x0 * ka):int(x1 * ka)] = True
white = ndi.uniform_filter(lum, 41) > 185  # snow background only, not the woods below
land = np.asarray(Image.open(heightmap).convert("L").resize((W, H), Image.NEAREST)) >= 51
inland = ndi.binary_erosion(land, iterations=int(4 * ka))  # the coastline is dark ink too
text = ndi.binary_dilation((lum < 70) | ((R - B) > 40), iterations=4)  # lettering, lava line
hatch = (lum < 185) & (sat < 0.25) & ~text & zone & white & inland

# grid review M1: fill every hatched area of the source with evenly spaced icons (a range, not a few tips).
# The hatched area: stroke density smoothed over about one icon, then icons on a jittered grid inside it
dens = ndi.gaussian_filter(hatch.astype(float), 2 * ka)
ranges = dens > MIN_DENS
# Flotket Alps / Mythburrow: the world map hatches the whole snowfield; the official Wildemount map has one range
north = np.zeros((H, W), bool); north[int(120 * ka):int(270 * ka), int(1445 * ka):int(1800 * ka)] = True
ranges = np.where(north, (wref.to_grid(wref.mountains(), (W, H)) > 0.3) & inland, ranges)  # official ranges only
rng = np.random.default_rng(3)
peaks = []
for gy in np.arange(0, H / ka, SPACING * 0.8):
    for gx in np.arange(0, W / ka, SPACING):
        x = gx + (SPACING / 2 if int(gy / (SPACING * 0.8)) % 2 else 0) + rng.uniform(-1, 1)  # staggered rows
        y = gy + rng.uniform(-0.8, 0.8)
        px, py = int(x * ka), int(y * ka)
        if not (0 <= px < W and 0 <= py < H) or not ranges[py, px]:
            continue
        s = float(np.clip(6 + 30 * dens[py, px], 7, 11))  # denser hatching, bigger peak
        peaks.append([round(x + DX, 1), round(y + DY, 1), round(s, 1)])

# hand removals from the grid review: any generated peak within 1.5 px of one of these goes
REMOVE = [
    (1300.4, 83.3), (1302.9, 86.9), (1309.8, 87.1), (1318.0, 92.7),  # M1: south shore of Foren's west arm
]
peaks = [p for p in peaks if all((p[0] - x) ** 2 + (p[1] - y) ** 2 > 1.5 ** 2 for x, y in REMOVE)]

json.dump({"zones": [list(z) for z in ZONES], "peaks": peaks}, open(out, "w"), indent=1)
print(len(peaks), "peaks")

if len(sys.argv) > 4:  # preview: the source with a red mark on each icon's centre
    im = Image.open(src).convert("RGB")
    d = ImageDraw.Draw(im)
    for x, y, s in peaks:
        d.ellipse([x * ka - 4, y * ka - 4, x * ka + 4, y * ka + 4], outline=(255, 0, 0), width=2)
        d.line([x * ka - s * ka / 2, y * ka, x * ka + s * ka / 2, y * ka], fill=(255, 0, 0), width=2)
    im.save(sys.argv[4])
