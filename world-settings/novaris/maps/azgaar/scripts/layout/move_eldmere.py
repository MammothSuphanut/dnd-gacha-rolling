"""Move Eldmere in the source data (heightmap, biome map, labels, rivers, cultures) to the v3 layout.

Run once from maps/azgaar/: python scripts/layout/move_eldmere.py
The map itself (saves/novaris.map) was moved in Azgaar with the same shift.
"""
import json

import numpy as np
from PIL import Image
from scipy import ndimage

SHIFT = (55, 150)  # map px (1800x1200)
BOX = (1225, 810, 1745, 1015)  # Eldmere's islands, no other land inside
SHELF = 12  # map px of sea that moves with the islands
LABEL_MOVES = {"Eldmere": (-165, 75), "Stormwall": (-330, -50)}  # placed apart from the islands


def in_box(x, y):
    return BOX[0] < x < BOX[2] and BOX[1] < y < BOX[3]


def block_mask(land):
    """Eldmere land plus its shelf, as a boolean mask of the heightmap grid."""
    m = np.zeros_like(land)
    x0, y0, x1, y1 = BOX
    m[y0:y1, x0:x1] = land[y0:y1, x0:x1]
    return ndimage.binary_dilation(m, iterations=SHELF)


def move(arr, mask, dx, dy, fill):
    out = arr.copy()
    out[mask] = fill
    ys, xs = np.nonzero(mask)
    ny, nx = ys + dy, xs + dx
    ok = (ny >= 0) & (ny < arr.shape[0]) & (nx >= 0) & (nx < arr.shape[1])
    out[ny[ok], nx[ok]] = arr[ys[ok], xs[ok]]
    return out


def write_json(path, data):
    """Rewrite keeping the file's own layout: one-line files stay one line, the rest indent 1."""
    raw = open(path, "rb").read()
    nl = b"\r\n" if b"\r\n" in raw else b"\n"
    one_line = nl not in raw.rstrip()
    s = json.dumps(data, ensure_ascii=False) if one_line else json.dumps(data, indent=1, ensure_ascii=False)
    s = s.encode().replace(b"\n", nl)
    open(path, "wb").write(s + (nl if raw.endswith(nl) else b""))


def main():
    hm_img = Image.open("heightmaps/novaris.png")
    hm = np.asarray(hm_img.convert("L"))
    mask = block_mask(hm >= 51)
    ring = ndimage.binary_dilation(mask, iterations=10) & ~mask & (hm < 51)
    sea = int(np.percentile(hm[ring], 30))
    Image.fromarray(move(hm, mask, *SHIFT, sea)).convert(hm_img.mode).save("heightmaps/novaris.png")

    bm_img = Image.open("heightmaps/novaris-biomes.png")
    bm = np.asarray(bm_img)
    sx, sy = bm.shape[1] / hm.shape[1], bm.shape[0] / hm.shape[0]
    bmask = np.asarray(Image.fromarray(mask.astype(np.uint8) * 255).resize((bm.shape[1], bm.shape[0]), Image.NEAREST)) > 0
    sea_biome = np.median(bm[ndimage.binary_dilation(bmask, iterations=10) & ~bmask], axis=0).astype(bm.dtype)
    Image.fromarray(move(bm, bmask, round(SHIFT[0] * sx), round(SHIFT[1] * sy), sea_biome), bm_img.mode).save("heightmaps/novaris-biomes.png")

    labels = json.load(open("heightmaps/novaris-labels.json", encoding="utf-8"))
    for l in labels:
        d = LABEL_MOVES.get(l["text"]) or (SHIFT if in_box(l["x"], l["y"]) else None)
        if d:
            l["x"], l["y"] = round(l["x"] + d[0], 1), round(l["y"] + d[1], 1)
    write_json("heightmaps/novaris-labels.json", labels)

    rivers = json.load(open("heightmaps/novaris-rivers.json", encoding="utf-8"))
    for r in rivers:
        if all(in_box(*p) for p in r["points"]):
            r["points"] = [[round(x + SHIFT[0], 1), round(y + SHIFT[1], 1)] for x, y in r["points"]]
    write_json("heightmaps/novaris-rivers.json", rivers)

    cultures = json.load(open("heightmaps/novaris-cultures.json", encoding="utf-8"))
    for c in cultures:
        if c["name"] == "Eldmere":
            c["x"], c["y"] = round(c["x"] + SHIFT[0], 1), round(c["y"] + SHIFT[1], 1)
            c["region"] = [[1240.0, 950.0], [1802.8, 950.0], [1802.8, 1202.8], [1240.0, 1202.8]]
    write_json("heightmaps/novaris-cultures.json", cultures)
    print("sea height", sea, "sea biome", sea_biome)


main()
