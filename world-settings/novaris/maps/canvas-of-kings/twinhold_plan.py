"""Twinhold levels 1-3 as Plot-tool plots: the frame (cavern, organic streets) and every piece of ground between the
streets cut into plots of the right kind for its quarter — plots share their edges (no gaps: the app's own roads
only join up where plots touch, user 2026-10-24), and no ground is left over.

    timeout 300 python world-settings/novaris/maps/canvas-of-kings/twinhold_plan.py sketch   # → twinhold-plots-sketch.png
    timeout 300 python world-settings/novaris/maps/canvas-of-kings/twinhold_plan.py build    # → Save/twinhold.mommap + check-level*.png

build writes all three levels into one map, a layer set per level (Ground / Buildings / Deco; levels 2-3 hidden).
Claude places only the frame — rock, streets, paving, the shaft wall, the twin lifts with a brazier each, the inner
gate in the level-1 tunnel; every plot is left empty for the user to Populate. Quarters follow the approved plan (twinhold-diarchy.md
"ผังแต่ละชั้น", twinhold_city.py LEVELS). Plot sizes stay inside what the app accepts (COK-FORMAT.md). Feet throughout.
"""
import math
import os
import random
import sys

from shapely.geometry import LineString, Point, Polygon
from shapely.ops import split, unary_union

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(HERE))))
sys.path.insert(0, os.path.join(ROOT, "adventure-builder", "canvas-of-kings"))
from cok import PLOT_TEMPLATES, Map, blob, carve_rock, district_plot, floor, poly_walls, preset, road, variants  # noqa: E402
from cok_city import Noise, long_axis, organic_radial, organic_ring, polar, street_area, widths_along  # noqa: E402

CAVE_R, SHAFT_R, WALK_R, PLAZA_R = 760, 55, 85, 150
RADIALS = [-157, -118, -84, -52, -14, 28, 66, 112]

# kind → (size the plots are cut down to, smallest worth its own plot) in sq ft. Same-kind ground between the same
# streets is ONE plot (user 2026-10-24); only kinds the app caps get cut: Campsite ("area too large" past ~5,000) and
# Market (never tried past ~6,500). If the app refuses a big district, cut just that one.
BIG = 10 ** 9
SIZES = {"merchants": (BIG, 9000), "craftsmen": (BIG, 12000), "farmers": (BIG, 15000), "cottages": (BIG, 6000),
         "market": (6000, 1500), "campsite": (4200, 1500), "field": (BIG, 6000), "lumberyard": (BIG, 8000),
         "castle": (17000, 500), "lake": (10 ** 9, 0), "paved": (10 ** 9, 0)}
NAMES = {"merchants": "District of Merchants", "craftsmen": "District of Craftsmen", "farmers": "District of Farmers",
         "cottages": "Cottages", "market": "Market", "campsite": "Campsite", "field": "Field", "lumberyard": "Logging camp",
         "castle": "Castle surface", "lake": "Lake", "paved": "ลานปูหิน (Plateau พื้นเรียบ)"}
COLS = {"merchants": (214, 128, 96), "craftsmen": (168, 120, 72), "farmers": (196, 196, 120), "cottages": (150, 110, 80),
        "market": (238, 192, 60), "campsite": (90, 160, 200), "field": (140, 190, 90), "lumberyard": (120, 150, 110),
        "castle": (125, 85, 155), "lake": (90, 140, 200), "paved": (228, 220, 200)}

# Each level: quarters (name, r0, r1, a0, a1, kind) — first match wins, angle 0 = east, 90 = south; the inner ring
# round the shaft; landmarks carved out first (name, r, a, along, across, kind); extra tunnels (name, from, to, width)
LEVELS = [
    {"name": "ชั้น 1 — ประตูและการค้า", "seed": 9351, "inner": "market",
     "quarters": [("ตลาดหลัก + ร้านค้า", 0, 340, -180, 180, "merchants"),
                  ("คอกสัตว์", 340, 560, 60, 76, "cottages"), ("ลานคาราวาน", 340, 560, 76, 104, "campsite"),
                  ("ทุ่งหญ้าคอก", 340, 560, 104, 120, "field"),
                  ("ย่านด่าน", 340, 800, 20, 92, "merchants"), ("โกดังสินค้า", 340, 800, 92, 175, "craftsmen"),
                  ("โรงเตี๊ยม/ที่พักคนต่างเมือง", 340, 800, 175, 235, "merchants"),
                  ("ย่านพ่อค้า (บ้าน)", 340, 640, 235, 300, "merchants"), ("ร้านของเก่าและนายหน้า", 340, 640, 300, 350, "merchants"),
                  ("ค่ายทหารรักษาประตู", 340, 800, -10, 20, "craftsmen"), ("ชานเมือง", 640, 800, -180, 180, "farmers")],
     "landmarks": [("ห้องเก็บของเก่า Aeor", 455, 40, 80, 70, "castle"), ("ค่ายทหาร", 640, 5, 100, 70, "castle")],
     "tunnels": [("อุโมงค์ขึ้นประตูภูเขา", (0, 540), (0, 1000), 24)]},
    {"name": "ชั้น 2 — ปกครองและที่อยู่อาศัย", "seed": 9461, "inner": "paved",
     "quarters": [("ลานพิธี", 0, 340, -150, -30, "paved"), ("วงในฝั่งดวาร์ฟ", 0, 340, 90, 210, "craftsmen"),
                  ("วงในฝั่งเอลฟ์", 0, 340, -30, 90, "merchants"),
                  ("ย่านดวาร์ฟ (บ้านเจาะผนัง)", 340, 800, 100, 260, "craftsmen"), ("ย่านเอลฟ์ (บ้านแสงเวท)", 340, 800, -80, 80, "merchants"),
                  ("สภาช่างและหอสมุด", 340, 800, 80, 100, "merchants"), ("วิหารคู่", 340, 540, -100, -80, "merchants"),
                  ("ย่านผสม", 340, 800, -180, 180, "farmers")],
     "landmarks": [("ห้องโถงดวาร์ฟ", 245, -99, 64, 80, "castle"), ("ห้องโถงเอลฟ์", 245, -69, 64, 80, "castle"),  # either side of the north street
                   ("วิหารดวาร์ฟ", 440, -93, 55, 55, "castle"), ("วิหารเอลฟ์", 440, -75, 55, 55, "castle"),
                   ("จวนผู้ปกครองดวาร์ฟ", 430, 227, 90, 70, "castle"), ("จวนผู้ปกครองเอลฟ์", 430, 47, 90, 70, "castle")],  # opposite, same distance
     "tunnels": []},
    {"name": "ชั้น 3 — อุตสาหกรรมและเกษตร", "seed": 9571, "inner": "lumberyard",
     "quarters": [("โรงงานและโกดังวัตถุดิบ", 0, 340, -180, 180, "craftsmen"),
                  ("ย่านโรงตีเหล็ก + ตรอกช่าง", 340, 800, 150, 225, "craftsmen"),
                  ("ห้องพักช่าง", 340, 800, 200, 225, "farmers"), ("บ้านคนงาน + โรงอาหาร", 340, 800, -135, -60, "farmers"),
                  ("ห้องพักช่าง", 340, 800, -160, -135, "farmers"), ("สวนใต้ดินของเอลฟ์", 340, 800, -40, 40, "field"),
                  ("ทางลงเหมืองลึก", 340, 800, 40, 60, "lumberyard"), ("ฟาร์มเห็ดและแปลงผัก", 340, 800, 60, 120, "field"),
                  ("อ่างเก็บน้ำ", 340, 800, 120, 150, "field"), ("ย่านช่าง", 340, 800, -180, 180, "craftsmen")],
     "landmarks": [("โรงตีเหล็กใหญ่", 470, 185, 130, 110, "castle"), ("บ่อพักลาวา", 660, 180, 90, 70, "lake"),
                   ("อ่างเก็บน้ำ", 650, 135, 150, 90, "lake")],
     "tunnels": [("ท่อลาวาจาก Blackfell", (-700, 0), (-1000, 6), 30)]},
]


# The lava the user drew on level 3 (a red Lake: the Blackfell pipe + the pool at its mouth, map units) — it replaces
# the "บ่อพักลาวา" landmark lake; they keep it in Level 3 Deco (user's twinhold save, 2026-10-24)
LAVA = [(-49.25, -2.14), (-46.53, -0.8), (-47.03, 1.4), (-49.23, 2.21), (-52.12, 1.04), (-54.95, 1.15), (-57.52, 1.68),
        (-71.28, 1.94), (-71.23, -1.2), (-57.44, -1.48), (-55.79, -1.06), (-53.03, -1.13)]
LAVA_SETTINGS = {"water_color": "d42a00ff", "is_individual": True}


def in_sector(x, z, r0, r1, a0, a1):
    r, a = math.hypot(x, z), math.degrees(math.atan2(z, x))
    return r0 <= r < r1 and (a - a0) % 360 < (a1 - a0) % 360 + (360 if a1 - a0 >= 360 else 0)


def sector(r0, r1, a0, a1):
    a1 = a0 + ((a1 - a0) % 360 or 360)
    n = max(4, int((a1 - a0) / 2))
    return Polygon([polar(max(r0, 0.01), a0 + (a1 - a0) * i / n) for i in range(n + 1)] +
                   [polar(r1, a1 - (a1 - a0) * i / n) for i in range(n + 1)]).buffer(0)


def cut_down(poly, target, rng):
    """Split across the long side until every piece is ≤ target — straight-ish cuts, pieces share their edges."""
    if poly.area <= target:
        return [poly]
    (ex, ez), L, S = long_axis(poly)
    ux, uz = ex / L, ez / L
    n = math.ceil(poly.area / target)
    c = poly.centroid
    t = (0.5 if n % 2 == 0 else 1 / n * round(n / 2)) - 0.5 + rng.uniform(-0.06, 0.06)
    cx, cz = c.x + ux * L * t, c.y + uz * L * t
    skew = rng.uniform(-0.15, 0.15)
    nx, nz = -uz + ux * skew, ux + uz * skew
    parts = split(poly, LineString([(cx - nx * 2 * L, cz - nz * 2 * L), (cx + nx * 2 * L, cz + nz * 2 * L)]))
    parts = [g for g in parts.geoms if g.area > 1]
    if len(parts) < 2:
        return [poly]
    return [q for g in parts for q in cut_down(g, target, rng)]


def no_holes(poly):
    """Plots can't have holes (a landmark set inside a block makes one) — cut through each hole until none is left."""
    poly = Polygon(poly.exterior, [h for h in poly.interiors if Polygon(h).area > 200])  # pinholes are just rounding
    if not poly.interiors:
        return [poly]
    h = poly.interiors[0].centroid
    x0, z0, x1, z1 = poly.bounds
    parts = split(poly, LineString([(h.x, z0 - 1), (h.x, z1 + 1)]))
    return [q for g in parts.geoms if g.area > 1 for q in no_holes(g)]


def merge_small(pieces):
    """A piece smaller than its kind's minimum joins the neighbour it shares the longest edge with."""
    pieces = list(pieces)
    changed = True
    while changed:
        changed = False
        for i, (k, g) in enumerate(pieces):
            if g.area >= SIZES[k][1] or k in ("castle", "lake"):
                continue
            best, edge = None, 0.5
            for j, (k2, g2) in enumerate(pieces):
                if j != i and k2 not in ("castle", "lake"):
                    e = g.boundary.intersection(g2.boundary).length
                    if e > edge:
                        best, edge = j, e
            if best is not None:
                k2, g2 = pieces[best]
                merged = unary_union([g, g2])
                if merged.geom_type == "Polygon":
                    pieces[best] = (k2, merged)
                    pieces.pop(i)
                    changed = True
                    break
    return pieces


def plan(lv):
    rng = random.Random(lv["seed"])
    cave_noise = Noise(rng, (2, 3, 5, 7))
    cave = Polygon([polar(CAVE_R * (1 + 0.07 * cave_noise(math.radians(a))), a) for a in range(0, 360, 3)]).buffer(0)
    inside = cave.buffer(-8)
    plaza_edge = organic_ring(PLAZA_R, rng, 8)
    ring1, ring2 = organic_ring(330, rng, 24), organic_ring(545, rng, 30)
    streets = [(plaza_edge, widths_along(plaza_edge, 20, 26, rng)), (ring1, widths_along(ring1, 20, 26, rng)),
               (ring2, widths_along(ring2, 15, 19, rng))]
    for a in RADIALS:  # all the way to the wall now, so no strip of ground is left between blocks
        pts = organic_radial(a + rng.uniform(-3, 3), PLAZA_R - 5, CAVE_R * 1.15, rng, drift=rng.uniform(4, 9))
        pts = [p for p in pts if cave.contains(Point(p))]
        streets.append((pts, widths_along(pts, 16, 23, rng)))
    for a in RADIALS[::2]:  # spokes through the inner ring to the walk round the shaft
        pts = [polar(r_, a) for r_ in range(WALK_R - 5, PLAZA_R + 1, 13)]
        streets.append((pts, [14] * (len(pts) - 1)))
    for name, a, b, w in lv["tunnels"]:
        pts = [(a[0] + (b[0] - a[0]) * i / 20, a[1] + (b[1] - a[1]) * i / 20) for i in range(21)]
        streets.append((pts, [w] * 20))
    street_poly = unary_union([street_area(p, w) for p, w in streets])
    tunnels = unary_union([LineString([a, b]).buffer(w / 2 + 6) for _, a, b, w in lv["tunnels"]]) if lv["tunnels"] else Polygon()

    ground = inside.difference(street_poly).difference(Point(0, 0).buffer(WALK_R, 64))
    marks = []
    for name, r_, a, along, across, kind in lv["landmarks"]:
        x, z = polar(r_, a)
        if kind == "lake":
            g = Polygon(blob(x, z, along / 2, across / 2, rng, n=11, wobble=0.18))
        else:  # long side along the ring, facing the shaft
            t = math.radians(a + 90)
            ux, uz, nx, nz = math.cos(t), math.sin(t), math.cos(math.radians(a)), math.sin(math.radians(a))
            g = Polygon([(x + ux * su * along / 2 + nx * sn * across / 2, z + uz * su * along / 2 + nz * sn * across / 2)
                         for su, sn in ((-1, -1), (1, -1), (1, 1), (-1, 1))])
        g = g.intersection(ground)
        if not g.is_empty:
            g = max(getattr(g, "geoms", [g]), key=lambda h: h.area)
            marks.append((name, kind, g))
    ground = ground.difference(unary_union([g for *_, g in marks]))

    plots = [(k, g) for _, k, g in marks]
    for block in getattr(ground, "geoms", [ground]):
        if block.geom_type != "Polygon" or block.area < 300:
            continue
        pieces = []
        c = block.representative_point()
        if math.hypot(c.x, c.y) < PLAZA_R:
            pieces.append((lv["inner"], block))
        else:  # cut the block where quarters meet, each part its quarter's kind
            left = block
            for name, r0, r1, a0, a1, kind in lv["quarters"]:
                part = left.intersection(sector(r0, r1, a0, a1))
                left = left.difference(sector(r0, r1, a0, a1))
                for g in getattr(part, "geoms", [part]):
                    if g.geom_type == "Polygon" and g.area > 1:
                        pieces.append((kind, g))
            for g in getattr(left, "geoms", [left]):
                if g.geom_type == "Polygon" and g.area > 1:
                    pieces.append((lv["quarters"][-1][5], g))
        joined = []  # same kind side by side (two quarters of one kind meeting) → one piece
        for k in {k for k, _ in pieces}:
            u = unary_union([g.buffer(0.01) for kk, g in pieces if kk == k]).buffer(-0.01)
            joined += [(k, g) for g in getattr(u, "geoms", [u]) if g.geom_type == "Polygon" and g.area > 1]
        for k, g in merge_small(joined):
            plots += [(k, q) for h in no_holes(g) for q in cut_down(h, SIZES[k][0], rng)]
    plots = [(k, q) for k, g in merge_small(plots) for q in no_holes(g)]
    return {"cave": cave, "streets": streets, "plots": plots, "marks": marks, "tunnels": tunnels}


SAVE = "D:/Steam/steamapps/common/Canvas of Kings/Save"
FT = 0.075
DISTRICT_PRESET = {"merchants": "residential", "craftsmen": "workshops", "farmers": "outskirts"}


def build(out):
    from shapely import affinity
    from shapely.geometry import box

    m = Map()
    m.d["environment"].update({"light_color": "c9b48fff", "light_energy": 0.95, "ambient_color": "4a443cff", "ambient_brightness": 1.0,
                               "black_level": 0.0, "glow_light_alpha": 0.6, "glow_light_color": "ffa031ff", "cloud_threshold": 0.0,
                               "shadow_opactiy": 0.7, "objects_no_smoke": False})
    U = lambda x, z: (x * FT, z * FT)
    counts = []
    for i, lv in enumerate(LEVELS):
        G, B, D = (m.add_layer(f"Level {i + 1} {part}", i == 0) for part in ("Ground", "Buildings", "Deco"))
        res = plan(lv)
        rng = random.Random(lv["seed"] + 7)
        cave = res["cave"]
        open_area = cave.union(res["tunnels"])
        R = CAVE_R * 1.25
        carve_rock(m, affinity.scale(open_area, FT, FT, origin=(0, 0)), (-R * FT, -R * FT, R * FT, R * FT), rng, layer=G,
                   cell=6.0, base=3.0, tops=0.45, inset=1.2, top_max=3.0)
        for k in range(8):  # the walk round the shaft, paved in slices (plateaus can't have holes)
            a0, a1 = k * 45, (k + 1) * 45
            sl = Polygon([polar(SHAFT_R, a0 + (a1 - a0) * j / 8) for j in range(9)] + [polar(WALK_R + 4, a1 - (a1 - a0) * j / 8) for j in range(9)])
            floor(m, [U(*p) for p in sl.exterior.coords], layer=G)
        poly_walls(m, [U(*polar(SHAFT_R, a)) for a in range(0, 360, 15)], layer=B)
        for pts, ws in res["streets"]:
            if len(pts) >= 2:
                road(m, [U(*p) for p in pts], [w * FT for w in ws], layer=G, style=18 if ws[0] >= 15 else 19)
        for sx in (-24, 24):  # the twin lifts (dwarf / elf) at the shaft, a brazier by each
            m.obj(rng.choice(variants("woDecos/wo_crane_")), sx * FT, (-SHAFT_R + 6) * FT, rot=90, scale=1.4, layer=D)
            m.obj(rng.choice(variants("woDecos/wo_campfire_")), (sx + (10 if sx > 0 else -10)) * FT, (-SHAFT_R - 12) * FT, scale=0.8, layer=D)
        if i == 0:  # inner gate across the tunnel, just past where it leaves the cavern
            edge = max(z for x, z in cave.exterior.coords if abs(x) < 30)
            gz = edge + 30
            for x0, x1 in ((-34, -10), (10, 34)):
                p = m.path("Paths/pa_stone_wall_3.tscn", [U(x0, gz), U(x1, gz)], line_fn="woPathObjects/wo_wall_stone_a.tscn", layer=B)
                for o in p["points_objects"]:
                    o["filename"] = "res://Source/World/WorldObjects/woPathObjects/wo_wall_stone_tower_c.tscn"
                    o["object_type"] = 32
            m.obj("woPathObjects/wo_wall_stone_tower_c_gate_b.tscn", 0.0, gz * FT, rot=0, layer=B)
        tally = {}
        lava = Polygon([(x / FT, z / FT) for x, z in LAVA]) if i == 2 else None
        if lava:
            district_plot(m, PLOT_TEMPLATES["lake"], LAVA, layer=D, settings=LAVA_SETTINGS)
        for k, g in res["plots"]:
            if lava and k == "lake" and g.intersects(lava):
                continue  # the lava pool stands where this landmark lake was
            pts = [U(*p) for p in g.simplify(1.0).exterior.coords]
            if k == "paved":
                floor(m, pts, layer=G)
            else:
                quarter = "market" if (i == 0 and k == "merchants" and math.hypot(*g.representative_point().coords[0]) < 340) else DISTRICT_PRESET.get(k)
                district_plot(m, PLOT_TEMPLATES[k], pts, layer=B, settings=preset("cave", quarter) if quarter else None)
            tally[k] = tally.get(k, 0) + 1
        counts.append(tally)
    m.d["info"].update({"camera_pos_x": 0.0, "camera_pos_z": 0.0, "camera_zoom": 90.0})
    m.save(out)
    return m, counts


if __name__ == "__main__" and len(sys.argv) > 1 and sys.argv[1] == "build":
    import json

    OUT = f"{SAVE}/twinhold.mommap"
    if os.path.exists(OUT):
        sys.exit(f"{OUT} already exists — it may hold the user's work; move it away first")
    m, counts = build(OUT)
    d = json.load(open(OUT, encoding="utf-8"))
    print("wrote", OUT, "| paths", len(d["paths"]), "objects", len(d["objects"]))
    for i, c in enumerate(counts):
        print(f"  level {i + 1}:", c)
    sys.path.insert(0, HERE)
    from preview import render

    for i in range(3):  # one check image per level: only that level's layers
        keep = {l["idx"] for l in d["layers"]["map_layers"] if l["name"].startswith(f"Level {i + 1} ")}
        one = dict(d, paths=[p for p in d["paths"] if p.get("assigned_map_layer_idx") in keep],
                   objects=[o for o in d["objects"] if o.get("assigned_map_layer_idx") in keep])
        tmp = os.path.join(HERE, f"_level{i + 1}.mommap")
        json.dump(one, open(tmp, "w", encoding="utf-8"))
        render(tmp, 0, 10, 140, os.path.join(HERE, f"check-level{i + 1}.png"), px=7)
        os.remove(tmp)

if __name__ == "__main__" and len(sys.argv) > 1 and sys.argv[1] == "sketch":
    from PIL import Image, ImageDraw, ImageFont

    S, P = 0.56, 1040
    font = ImageFont.truetype("C:/Windows/Fonts/tahoma.ttf", 15)
    small = ImageFont.truetype("C:/Windows/Fonts/tahoma.ttf", 12)
    bold = ImageFont.truetype("C:/Windows/Fonts/tahomabd.ttf", 22)
    im = Image.new("RGB", (P * 3, P + 210), (52, 50, 48))
    dr = ImageDraw.Draw(im)
    used = set()
    for i, lv in enumerate(LEVELS):
        res = plan(lv)
        ox, oz = i * P + P / 2, P / 2 + 30
        T = lambda x, z: (ox + x * S, oz + z * S)

        def poly(g, **kw):
            for h in getattr(g, "geoms", [g]):
                if h.geom_type == "Polygon" and not h.is_empty:
                    dr.polygon([T(*p) for p in h.exterior.coords], **kw)

        poly(res["tunnels"].intersection(Point(0, 0).buffer(P / 2 / S - 10)), fill=(110, 100, 88))
        poly(res["cave"], fill=(110, 100, 88), outline=(20, 20, 20))
        for pts, ws in res["streets"]:
            for (a, b), w in zip(zip(pts, pts[1:]), ws):
                dr.line([T(*a), T(*b)], fill=(205, 185, 150), width=max(2, int(w * S)))
        dr.ellipse([T(-WALK_R, -WALK_R), T(WALK_R, WALK_R)], fill=(228, 220, 200))
        tally = {}
        for k, g in sorted(res["plots"], key=lambda kg: kg[0] in ("castle", "lake")):  # landmarks on top
            poly(g, fill=COLS[k], outline=(40, 32, 26))
            used.add(k)
            tally[k] = tally.get(k, 0) + 1
        dr.ellipse([T(-SHAFT_R, -SHAFT_R), T(SHAFT_R, SHAFT_R)], fill=(15, 15, 18))
        for sx in (-22, 22):
            dr.rectangle([T(sx - 10, -10), T(sx + 10, 10)], fill=(200, 160, 60))
        for name, a0, b0, w in lv["tunnels"]:
            x, y = T(*b0)
            dr.text((x - 60, y - 18) if b0[1] > 0 else (ox - P / 2 + 12, y + 14), name, fill=(255, 255, 255), font=small)
        for name, kind, g in res["marks"]:
            c = g.representative_point()
            x, y = T(c.x, c.y)
            tw = dr.textlength(name, font=small)
            dr.rectangle([x - tw / 2 - 3, y - 8, x + tw / 2 + 3, y + 8], fill=(255, 240, 170))
            dr.text((x - tw / 2, y - 8), name, fill=(0, 0, 0), font=small)
        dr.text((ox - P / 2 + 16, 8), lv["name"], fill=(255, 255, 255), font=bold)
        sizes = [g.area for _, g in res["plots"]]
        over = [(k, round(g.area)) for k, g in res["plots"] if g.area > SIZES[k][0] * 1.02]
        print(lv["name"], "| plots", len(sizes), tally, "| over size:", over)
        dr.text((ox - P / 2 + 16, oz + CAVE_R * S + 40), f"{len(sizes)} แปลง · " + " · ".join(f"{NAMES[k].split(' (')[0]} {n}" for k, n in tally.items()),
                fill=(230, 230, 230), font=small)
    x, y = 16, P + 110
    for k in COLS:
        if k in used:
            dr.rectangle([x, y, x + 18, y + 16], fill=COLS[k], outline=(0, 0, 0))
            dr.text((x + 24, y - 1), NAMES[k], fill=(255, 255, 255), font=font)
            x += 34 + dr.textlength(NAMES[k], font=font)
            if x > P * 3 - 300:
                x, y = 16, y + 26
    dr.text((16, P + 175), "เส้นขอบดำ = ขอบแปลง (แปลงติดกันพอดี ไม่เว้นช่อง) · ถนนสีครีม = โครงเมือง · วงครีมรอบปล่อง = ทางเดินรอบปล่อง+ลิฟต์คู่",
            fill=(200, 200, 200), font=font)
    bx = P * 3 - 200
    dr.line([(bx, P + 180), (bx + 200 * S, P + 180)], fill=(255, 255, 255), width=3)
    dr.text((bx, P + 186), "200 ฟุต", fill=(255, 255, 255), font=small)
    out = os.path.join(HERE, "twinhold-plots-sketch.png")
    im.save(out)
    print("wrote", out)
