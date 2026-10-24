"""Rough top-down render of a .mommap (roofs, roads, rock, props) — for checking a generated map against the user's
test_city before handing it over. Colours are only a guide, not what Canvas of Kings draws.

    python preview.py <map.mommap> <centre_x> <centre_z> <size_units> <out.png>
"""
import json
import math
import sys

from PIL import Image, ImageDraw


def render(path, cx, cz, size, out, px=12):
    c = json.load(open(path, encoding="utf-8"))
    x0, z0 = cx - size / 2, cz - size / 2
    im = Image.new("RGB", (int(size * px), int(size * px)), (225, 215, 185))
    dr = ImageDraw.Draw(im)
    T = lambda x, z: ((x - x0) * px, (z - z0) * px)
    near = lambda p: any(x0 - 20 < q["x"] < x0 + size + 20 and z0 - 20 < q["z"] < z0 + size + 20 for q in p["main_points"])

    def rank(p):
        fn = p["filename"].split("/")[-1]
        return 0 if fn.startswith("pap") else 1 if "road" in fn else 3 if "roof" in fn else 2

    for p in sorted(c["paths"], key=rank):
        if not near(p):
            continue
        fn = p["filename"].split("/")[-1]
        pts = [T(q["x"], q["z"]) for q in p["main_points"]]
        if "plateau" in fn:
            h = p.get("height_changing_position_y") or 0
            dr.polygon(pts, fill=(200, 190, 160) if p.get("texture_type") == 2 else tuple(max(30, int(130 - h * 12)) for _ in range(3)), outline=(60, 60, 60))
        elif p.get("is_closed"):
            dr.polygon(pts, fill=(160, 170, 140), outline=(60, 60, 60))
        elif "road" in fn:
            ws = p.get("lines_custom_scales") or [p.get("width", 1)]
            for (a, b), w in zip(zip(pts, pts[1:]), ws + [ws[-1]] * len(pts)):
                dr.line([a, b], fill=(180, 150, 110), width=max(2, int(w * px)))
        elif "hedge" in fn:
            dr.line(pts, fill=(60, 120, 50), width=5)
        elif "fence" in fn or "wall" in fn:
            dr.line(pts, fill=(70, 70, 70), width=4)
        elif "river" in fn:
            dr.line(pts, fill=(100, 140, 190), width=14)
        elif "par_roof" in fn:
            hw = p["lines_custom_scales"][0] if p["lines_custom_scales"] else 0.7
            for a, b in zip(p["main_points"], p["main_points"][1:]):
                dx, dz = b["x"] - a["x"], b["z"] - a["z"]
                L = math.hypot(dx, dz) or 1
                nx, nz = -dz / L * hw, dx / L * hw
                q = [(a["x"] + nx, a["z"] + nz), (b["x"] + nx, b["z"] + nz), (b["x"] - nx, b["z"] - nz), (a["x"] - nx, a["z"] - nz)]
                dr.polygon([T(*x) for x in q], fill=(170, 85, 60) if "tiles" in fn else (130, 95, 60), outline=(60, 30, 20))
    for o in c["objects"]:
        if not (x0 < o["position_x"] < x0 + size and z0 < o["position_z"] < z0 + size):
            continue
        x, z = T(o["position_x"], o["position_z"])
        fn = o["filename"]
        if "woHuts" in fn:  # ready-made house: ~20 × 16 ft box (cottages smaller), turned like the object
            w, d = (1.1, 0.9) if "cottage" in fn else (1.5, 1.2)
            w, d = w * o.get("scale_x", 1), d * o.get("scale_x", 1)
            a = math.radians(-o.get("rotation_y", 0))
            ca, sa = math.cos(a), math.sin(a)
            box = [(o["position_x"] + ca * sx * w / 2 - sa * sz * d / 2, o["position_z"] + sa * sx * w / 2 + ca * sz * d / 2)
                   for sx, sz in ((-1, -1), (1, -1), (1, 1), (-1, 1))]
            dr.polygon([T(*p) for p in box], fill=(150, 110, 80) if "cottage" in fn else (185, 95, 70) if "tiles" in fn else (140, 100, 60),
                       outline=(60, 30, 20))
            continue
        col = (40, 110, 40) if "tree" in fn else (255, 140, 0) if ("glow" in fn or "camp" in fn or "fire" in fn) else (120, 120, 120) if "stone" in fn \
            else (230, 200, 60) if "stall" in fn else (80, 80, 200)
        r = 5 if ("tree" in fn or "glow" in fn or "camp" in fn) else 3 if "stall" in fn else 2
        dr.ellipse((x - r, z - r, x + r, z + r), fill=col)
    im.save(out)
    print("wrote", out)
    return im


if __name__ == "__main__":
    render(sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), float(sys.argv[4]), sys.argv[5])
