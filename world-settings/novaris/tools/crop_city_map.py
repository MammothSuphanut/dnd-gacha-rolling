"""Turn a floor exported from Canvas of Kings into the city scene's map image: crop/pad to the city's frame and resize.

    python world-settings/novaris/tools/crop_city_map.py twinhold 1 <export.png> [<cx> <cy> <px_per_ft>]

Where the export sits on the map is found from the image itself: the shaft (a fence ring of SHAFT_R ft round the map's
origin) is searched for, giving its centre pixel and the export's px/ft — or pass them to skip the search. The image
is cut to the city's frame (build_foundry_city.py CITIES[city]["frame"], feet) and saved as WebP next to <city>.json,
named as the data expects (levels[n-1].image). Ground outside the export is filled black.
2026-10-24 Twinhold exports (13473×13932): shaft at (6850, 6644), 8.51 px/ft — the same on all three floors.
"""
import os
import sys

import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_foundry_city import CITIES, DATA_DIR, WORLD  # noqa: E402

SHAFT_R = 55  # ft (maps/canvas-of-kings/twinhold_plan.py)
Image.MAX_IMAGE_PIXELS = None


def find_shaft(im, k=4):
    """Centre pixel and px/ft of the darkest ring near the image centre — the shaft's wall."""
    g = 255 - np.asarray(im.convert("L").resize((im.width // k, im.height // k), Image.BILINEAR), dtype=float)
    ang = np.linspace(0, 2 * np.pi, 240, endpoint=False)

    def score(cx, cy, r):
        return g[(cy + r * np.sin(ang)).round().astype(int), (cx + r * np.cos(ang)).round().astype(int)].mean()

    h, w = g.shape
    best = max((score(cx, cy, r), cx, cy, r) for r in np.arange(w * 0.02, w * 0.06, 1.0)
               for cx in np.arange(w * 0.4, w * 0.6, 2) for cy in np.arange(h * 0.4, h * 0.6, 2))
    _, cx, cy, r = best
    best = max((score(x, y, rr), x, y, rr) for rr in np.arange(r - 1.5, r + 1.6, 0.25)
               for x in np.arange(cx - 2, cx + 2.1, 0.5) for y in np.arange(cy - 2, cy + 2.1, 0.5))
    _, cx, cy, r = best
    return cx * k, cy * k, r * k / SHAFT_R


def main():
    key, n, src = sys.argv[1], int(sys.argv[2]), sys.argv[3]
    c = CITIES[key]
    f = c["frame"]
    im = Image.open(src).convert("RGB")
    cx, cy, s = map(float, sys.argv[4:7]) if len(sys.argv) >= 7 else find_shaft(im)
    box = (round(cx + f["x0"] * s), round(cy + f["z0"] * s),
           round(cx + (f["x0"] + f["w_ft"]) * s), round(cy + (f["z0"] + f["h_ft"]) * s))
    canvas = Image.new("RGB", (box[2] - box[0], box[3] - box[1]), (0, 0, 0))
    canvas.paste(im, (-box[0], -box[1]))
    size = (round(f["w_ft"] * f["px_per_ft"]), round(f["h_ft"] * f["px_per_ft"]))
    out = canvas.resize(size, Image.LANCZOS)
    dst = os.path.join(WORLD, DATA_DIR, c["dir"], c["levels"][n - 1]["image"])
    out.save(dst, "WEBP", quality=88, method=6)
    print(f"{dst}: {size[0]}×{size[1]} · shaft at ({cx:.0f}, {cy:.0f}), {s:.2f} px/ft in the export")


if __name__ == "__main__":
    main()
