"""Find every light on a city's floors for Foundry: lantern glows in the Canvas of Kings exports + fires/lava from the map.

    python world-settings/novaris/tools/find_city_lights.py twinhold <floor1.png> <floor2.png> <floor3.png> [<cx> <cy> <px_per_ft>]

Writes <city>-lights.json next to <city>.json (build_foundry_city.py folds it in; Create-Novaris-City places them).
- Lanterns: the app lights its houses with lantern glows (orange halos at doors and corners) — found as warm blobs
  in each floor's export (red well above blue), glows closer than MERGE ft kept as one light.
- Fires: every campfire on the map (the plots' own and the braziers by the lifts), read from the .mommap.
- Lava / forge: the lava (the user's red Lake) and each city's extra spots (CITIES[city]["light_spots"]).
Pixels → feet as in crop_city_map.py (the shaft's centre and px/ft are found from the image unless given).
"""
import json
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage
from shapely.geometry import Point, Polygon

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_foundry_city import CITIES, DATA_DIR, WORLD  # noqa: E402
from crop_city_map import find_shaft  # noqa: E402

FT = 0.075     # map units per foot (adventure-builder/canvas-of-kings)
K = 4          # work on the export at 1/K size
WARM = 16      # red − blue that counts as lamplight (30 missed the fainter corner lamps)
MIN_AREA = 8   # px at 1/K size — smaller warm specks are texture, not a lamp
MERGE = 15     # ft
Image.MAX_IMAGE_PIXELS = None


def lanterns(path, cx, cy, s, skip):
    im = Image.open(path).convert("RGB")
    im = im.resize((im.width // K, im.height // K), Image.BILINEAR)
    a = np.asarray(im, dtype=float)
    warm = ndimage.gaussian_filter(a[..., 0] - a[..., 2], 1.5)
    lab, cnt = ndimage.label(warm > WARM)
    idx = range(1, cnt + 1)
    area = ndimage.sum(np.ones_like(warm), lab, idx)
    spots = [((px * K - cx) / s, (py * K - cy) / s, ar) for (py, px), ar in zip(ndimage.center_of_mass(warm, lab, idx), area)
             if ar >= MIN_AREA]
    kept = []
    for x, z, ar in sorted(spots, key=lambda p: -p[2]):  # brightest first; a fainter glow next to it is the same lamp
        if not skip.contains(Point(x, z)) and all((x - a) ** 2 + (z - b) ** 2 > MERGE ** 2 for a, b in kept):
            kept.append((x, z))
    return kept


def main():
    key, pngs = sys.argv[1], sys.argv[2:5]
    c = CITIES[key]
    cfg = c["lights"]
    d = json.load(open(cfg["map_file"], encoding="utf-8"))
    layer = {l["idx"]: l["name"] for l in d["layers"]["map_layers"]}
    floor = lambda o: next((n for n in range(1, len(c["levels"]) + 1)
                            if layer.get(o.get("assigned_map_layer_idx"), "").startswith(f"Level {n} ")), None)
    lava = [Polygon([(q["x"] / FT, q["z"] / FT) for q in p["main_points"]]) for p in d["paths"] if p.get("water_color")]
    skip = lava[0].buffer(10) if lava else Polygon()  # lava glows red — its lights are placed on purpose below
    if len(sys.argv) >= 8:
        cx, cy, s = map(float, sys.argv[5:8])
    else:
        cx, cy, s = find_shaft(Image.open(pngs[0]).convert("RGB"))
    out = []
    for n, png in enumerate(pngs, 1):
        found = lanterns(png, cx, cy, s, skip)
        out += [{"kind": "lantern", "level": n, "x": round(x), "z": round(z)} for x, z in found]
        print(f"floor {n}: {len(found)} lanterns")
    objs = [o for p in d["paths"] for o in p.get("area_objects", [])] + d["objects"]
    fires = [o for o in objs if "campfire" in o["filename"] and floor(o)]
    out += [{"kind": "fire", "level": floor(o), "x": round(o["position_x"] / FT), "z": round(o["position_z"] / FT)} for o in fires]
    print(f"fires: {len(fires)}")
    for p in d["paths"]:
        if p.get("water_color"):  # lava: a light every LAVA_STEP ft through its middle
            g = Polygon([(q["x"] / FT, q["z"] / FT) for q in p["main_points"]])
            x0, z0, x1, z1 = g.bounds
            pts = [(x, (z0 + z1) / 2) for x in np.arange(x0 + 15, x1, cfg["lava_step"])]
            pts = [pt for pt in pts if g.buffer(5).contains(Point(pt))]
            out += [{"kind": "lava", "level": floor(p), "x": round(x), "z": round(z)} for x, z in pts]
            print(f"lava: {len(pts)}")
    out += [{"kind": kind, "level": n, "x": x, "z": z} for (x, z), n, kind in cfg["spots"]]
    dst = os.path.join(WORLD, DATA_DIR, c["dir"], f"{key}-lights.json")
    json.dump(out, open(dst, "w", encoding="utf-8"))
    print(f"{dst}: {len(out)} lights")


if __name__ == "__main__":
    main()
