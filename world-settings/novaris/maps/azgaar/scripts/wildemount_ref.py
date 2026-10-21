"""The official Wildemount map (maps/wildemount/Wildemount.jpg) warped into Azgaar 1800x1200 coords.

The world map the heightmap comes from draws Wildemount loosely (purple woods over Savalirwood, scattered
Penumbra peaks, a tiny Rosohna blight), so make_biomemap.py reads forests and blight,
and make_heightmap.py / make_peaks.py the Xhorhas and Flotket ranges, for Wildemount from the official map instead. The warp is a thin-plate spline through the
towns in PINS (pixel on Wildemount.jpg scaled to 1800 px wide -> the town's x, y in exandria-burgs.json).

usage (preview): python scripts/wildemount_ref.py out.png
"""
import json
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
from scipy.interpolate import RBFInterpolator

Image.MAX_IMAGE_PIXELS = None
ROOT = Path(__file__).resolve().parent.parent
OFFICIAL = ROOT.parent / "wildemount/Wildemount.jpg"
BOX = (1000, 0, 1800, 800)  # Azgaar area covered (x0, y0, x1, y1)
EISEL = (1105, 0, 1465, 215)  # Eiselcross: keeps the world-map snow (DM choice), not read from here

# town dot on Wildemount.jpg resized to 1800 px wide
PINS = {
    "Palebank Village": (1074, 269), "Kravaraad": (1098, 302), "Cinderrest Sanctum": (1120, 314), "Uthodurn": (1107, 345),
    "Uraliss": (1148, 369), "Mythburrow": (1274, 292), "Ruins of Molaesmyr": (1013, 431), "Blooming Grove": (1002, 491),
    "Shadycreek Run": (988, 518), "Boroftkrah": (1124, 473), "Grimgolir": (1087.7, 580), "Hupperdook": (987.7, 617.7),
    "Urzin": (1150, 639), "Jigow": (1229, 622.7), "Bladegarden": (1072, 660), "Ashguard Garrison": (1096.7, 684),
    "Bazzoxan": (1282, 696.7), "Ghor Veles": (1383.7, 701), "Asarius": (1151.7, 746), "Deepriver Mining Camp": (1273.7, 755.7),
    "Rosohna": (1310.3, 772.7), "Talonstadt": (1055.3, 734.7), "Felderwin": (1006, 748.7), "Dumaran": (1263.3, 834),
    "Incanter's Rest": (1348.7, 843.3), "New Haxon": (1368.7, 895.7), "The Miskath Pit": (1340, 922.7),
    "Rotthold": (1326.7, 953.3), "Charis": (1151.3, 937.7), "Ruins of Draconia": (1096, 966.7), "Olc Skerry": (1371, 577.7),
    "Icehaven": (721.7, 516), "Rexxentrum": (888.7, 560), "Yrrosa": (797.7, 582.7), "Druvenlode": (886, 591),
    "Blumenthal": (904.7, 576.7), "Odessloe": (872.3, 543.3), "Ruins of Shattengrod": (791.7, 631),
    "Pride's Call": (732.3, 658.3), "Kamordah": (787.3, 712.3), "Vol'antim": (712, 719), "Gwardan": (548.7, 722.7),
    "Tussoa": (639.3, 792.7), "Port Damali": (630, 876), "Palma Flora": (615.3, 941), "Feolinn": (761.3, 930),
    "Port Zoon": (768.3, 986.7), "Deastok": (786, 771.7), "Herathis Mines": (822.3, 771.7), "Zadash": (903.3, 734.3),
    "Alfield": (923.7, 801), "Trostenwald": (916, 837.7), "Wuyun Gates": (888.7, 919.3), "Othe": (742.3, 832.3),
    "Berleben": (926.3, 666), "Bysaes Tyl": (832.7, 432.7), "Rastum Den": (873.3, 501),
    "Vergesson Sanatorium": (926.7, 484.3), "Syrinlya": (899.3, 211.7), "Balenpost": (810.3, 259),
    "Allowak's Sanctuary": (769, 202.3),
}


def _towns():
    h = ROOT / "heightmaps"
    t = {b["name"]: (b["x"], b["y"]) for b in json.load(open(h / "exandria-burgs.json", encoding="utf-8"))}
    t.update({s["capital"]: (s["x"], s["y"]) for s in json.load(open(h / "exandria-states.json", encoding="utf-8"))})
    return t


def transforms():
    """(to_azgaar, to_official): thin-plate splines between 1800-wide official pixels and Azgaar coords"""
    towns = _towns()
    names = [n for n in PINS if n in towns]
    off = np.array([PINS[n] for n in names], float)
    az = np.array([towns[n] for n in names], float)
    return (RBFInterpolator(off, az, kernel="thin_plate_spline", smoothing=2.0),
            RBFInterpolator(az, off, kernel="thin_plate_spline", smoothing=2.0))


def warped(scale=3):
    """official map resampled over BOX at `scale` px per Azgaar px (RGB uint8)"""
    _, to_off = transforms()
    x0, y0, x1, y1 = BOX
    ys, xs = np.mgrid[y0:y1:1 / scale, x0:x1:1 / scale]
    src = Image.open(OFFICIAL).convert("RGB")
    k = src.width / 1800
    t = to_off(np.c_[xs.ravel(), ys.ravel()]) * k
    o = np.asarray(src)
    tx = np.clip(t[:, 0].round().astype(int), 0, o.shape[1] - 1)
    ty = np.clip(t[:, 1].round().astype(int), 0, o.shape[0] - 1)
    return o[ty, tx].reshape(xs.shape + (3,))


def classes(scale=3):
    """masks over BOX read from the official map's paint, smoothed over ~2 Azgaar px so lettering and
    tree icons blend into their area: forest (dark/olive green), meadow (light green lowland), blight (red)"""
    a = warped(scale).astype(float)
    s = np.stack([ndi.gaussian_filter(a[..., i], 2 * scale) for i in range(3)], -1)
    green = s[..., 1] - (s[..., 0] + s[..., 2]) / 2  # plains/tundra/badlands ~5, woods 10-30
    veg = green > 10
    # woods are packed with dark tree icons or painted olive (Savalirwood, Pearlbow, Lushgut); the light
    # blue-green lowlands (Menagerie Coast, Lotusden) only have scattered trees
    trees = ndi.uniform_filter((a.mean(-1) < 80).astype(float), 5 * scale)
    olive = (s[..., 0] - s[..., 2]) >= 25
    forest = veg & ((trees >= 0.4) | olive)
    meadow = veg & ~forest
    blight = ((a[..., 0] - a[..., 1]) > 70) & (a[..., 0] > 130)
    blight = ndi.binary_opening(ndi.binary_closing(blight, iterations=2 * scale), iterations=scale)
    return {"forest": forest & ~blight, "meadow": meadow & ~blight, "blight": blight}


def mountains(scale=3, dark=105):
    """share of dark-brown mountain ink around each pixel over BOX (0-1). Only meaningful where the ground is
    light: the Xhorhas ranges (Penumbra, Ebonglass) and the Flotket Alps / Mythburrow on the northern snowfield"""
    a = warped(scale).astype(float)
    s = np.stack([ndi.uniform_filter(a[..., i], 4 * scale) for i in range(3)], -1)
    green = s[..., 1] - (s[..., 0] + s[..., 2]) / 2
    ink = (s.mean(-1) < dark) & (green < 8)
    ink &= ~(((a[..., 0] - a[..., 1]) > 70) & (a[..., 0] > 130))  # not the red blight
    # light-faced ranges the ink rule misses, drawn by hand in Azgaar coords along the range's spine
    from PIL import ImageDraw
    img = Image.new("L", (ink.shape[1], ink.shape[0]))
    d = ImageDraw.Draw(img)
    for pts in RIDGES.values():
        d.line([((x - BOX[0]) * scale, (y - BOX[1]) * scale) for x, y in pts], fill=255, width=6 * scale)
    ridge = ndi.gaussian_filter((np.asarray(img) > 0).astype(float), scale)  # narrow peninsulas: keep the crest sharp
    mas = Image.new("L", img.size)
    dm = ImageDraw.Draw(mas)
    for pts in MASSIFS.values():
        dm.polygon([((x - BOX[0]) * scale, (y - BOX[1]) * scale) for x, y in pts], fill=255)
    # ragged edge, not the polygon's straight sides
    noise = ndi.gaussian_filter(np.random.default_rng(7).standard_normal(ink.shape), 2 * scale)
    noise /= np.abs(noise).max()
    mas = ndi.gaussian_filter(np.asarray(mas) / 255, 3 * scale) > 0.5 + 0.35 * noise
    ridge = np.maximum(ridge, ndi.gaussian_filter(mas.astype(float), scale))
    out = np.maximum(ndi.gaussian_filter(ink.astype(float), 2 * scale), ridge)
    cap = Image.new("L", (ink.shape[1], ink.shape[0]), 255)
    dc = ImageDraw.Draw(cap)
    for pts, v in CAPS.values():
        dc.polygon([((x - BOX[0]) * scale, (y - BOX[1]) * scale) for x, y in pts], fill=round(v * 255))
    cap = ndi.gaussian_filter(np.asarray(cap) / 255, 2 * scale)
    return np.minimum(out, cap)


RIDGES = {
    "Hearthstar Peaks": [(1229, 503), (1231, 523), (1234, 543)],
}
# whole light-faced massifs the ink rule only catches on their shaded flanks, outlined in Azgaar coords
MASSIFS = {
    # Palebank -> Kravaraad -> Cinderrest Sanctum -> Uthodurn: one solid block on the official map (all three sit inside it)
    "Uthodurn massif": [(1535, 180), (1545, 176.7), (1561.7, 180), (1576.7, 185), (1585, 196.7), (1578.3, 206.7),
                        (1565, 216.7), (1551.7, 226.7), (1535, 230), (1518.3, 230), (1501.7, 223.3), (1498.3, 206.7),
                        (1511.7, 203.3), (1525, 196.7), (1530, 186.7)],
    # light tan peaks with little dark ink: Mt. Mentiri / Vol'antim down past Othe to the Wuyun Gorge
    "Cyrios Mountains": [(1285, 400), (1325, 393), (1355, 403), (1372, 417), (1355, 437), (1345, 450), (1332, 463),
                         (1355, 467), (1378, 480), (1392, 507), (1412, 527), (1432, 547), (1432, 580), (1405, 580),
                         (1388, 547), (1368, 523), (1345, 507), (1318, 503), (1302, 490), (1288, 480), (1285, 457),
                         (1292, 437), (1282, 417)],
    "Copia west range": [(1240, 395), (1275, 398), (1281, 430), (1275, 462), (1250, 470), (1237, 440)],  # Dolithil Mine
}
# areas the ink rule over-reads (shading, rock dots), capped at a share of mountain: (polygon, cap 0-1)
CAPS = {
    "Barbed Fields": ([(1625, 410), (1665, 404), (1677, 425), (1673, 455), (1665, 470), (1650, 472), (1630, 462),
                       (1622, 437)], 0.0),  # Rosohna's basin, dotted with rocks
    "Bromkiln Hills": ([(1365, 402), (1425, 400), (1430, 500), (1395, 500), (1370, 472), (1353, 458), (1375, 425)],
                       0.25),  # hatched hills and the Deastok plain, not peaks (make_heightmap boosts ink x2.5)
    "XHORHAS lettering": ([(1565, 354), (1619, 354), (1619, 370), (1565, 370)], 0.0),
}


def to_grid(mask, size, scale=3):
    """paste a BOX mask (bool or float) into a full-map array of `size` (W, H) covering 1800x1200"""
    W, H = size
    x0, y0, x1, y1 = BOX
    k = W / 1800
    out = np.zeros((H, W), float)
    img = Image.fromarray(mask.astype(np.float32), "F").resize((round((x1 - x0) * k), round((y1 - y0) * k)), Image.BILINEAR)
    out[round(y0 * k):round(y0 * k) + img.height, round(x0 * k):round(x0 * k) + img.width] = np.asarray(img)
    return out


def box_mask(size, box):
    W, H = size
    k = W / 1800
    m = np.zeros((H, W), bool)
    m[int(box[1] * k):int(box[3] * k), int(box[0] * k):int(box[2] * k)] = True
    return m


if __name__ == "__main__":
    import sys
    c = classes()
    w = warped().copy()
    w[c["forest"]] = (w[c["forest"]] * 0.4 + np.array([0, 160, 0]) * 0.6).astype(np.uint8)
    w[c["meadow"]] = (w[c["meadow"]] * 0.4 + np.array([170, 230, 90]) * 0.6).astype(np.uint8)
    w[c["blight"]] = (255, 0, 0)
    Image.fromarray(w).save(sys.argv[1])
