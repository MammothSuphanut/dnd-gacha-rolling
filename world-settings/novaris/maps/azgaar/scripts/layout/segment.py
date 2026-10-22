"""Split the Novaris land mask (Azgaar heightmap, 1800x1200) into continents."""
import json
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

HM = sys.argv[1]
OUT = sys.argv[2]

# continent seed boxes (map px): x0, y0, x1, y1
BOXES = {
    "shenzhou": [(90, 100, 640, 705)],
    "voxaria": [(690, 240, 1065, 770)],
    "aldenreich": [(1060, 30, 1800, 700), (1080, 540, 1320, 800)],
    "suvarna": [(0, 730, 800, 1200)],
    "eldmere": [(1215, 790, 1760, 1030)],
}
FIXED_NEAR = [(1122, 812)]  # Syngorn's island stays put


def box_dist(cx, cy, b):
    x0, y0, x1, y1 = b
    dx = max(x0 - cx, 0, cx - x1)
    dy = max(y0 - cy, 0, cy - y1)
    return (dx * dx + dy * dy) ** 0.5


def main():
    hm = np.asarray(Image.open(HM).convert("L"), dtype=np.uint8)
    land = hm >= 51
    lab, n = ndimage.label(land)
    owner = np.zeros(n + 1, dtype=np.int8)
    names = list(BOXES)
    cents = ndimage.center_of_mass(land, lab, range(1, n + 1))
    for i, (cy, cx) in enumerate(cents, start=1):
        if any(abs(cx - fx) < 15 and abs(cy - fy) < 15 for fx, fy in FIXED_NEAR):
            owner[i] = -1
            continue
        d = [min(box_dist(cx, cy, b) for b in BOXES[k]) for k in names]
        k = int(np.argmin(d))
        owner[i] = k + 1 if d[k] < 60 else -1
    cont = owner[lab]
    cont[~land] = 0
    np.save(OUT + "/continents.npy", cont)
    json.dump(names, open(OUT + "/names.json", "w"))
    pal = np.array([[30, 40, 80], [220, 80, 80], [80, 200, 90], [90, 120, 230], [230, 200, 60], [180, 90, 220]], dtype=np.uint8)
    img = pal[np.where(cont < 0, 0, cont)]
    img[cont == -1] = [255, 255, 255]
    Image.fromarray(img).save(OUT + "/segments.png")
    for k, name in enumerate(names, start=1):
        ys, xs = np.nonzero(cont == k)
        print(name, len(xs), "bbox", xs.min(), ys.min(), xs.max(), ys.max())
    print("fixed", int((cont == -1).sum()))


main()
