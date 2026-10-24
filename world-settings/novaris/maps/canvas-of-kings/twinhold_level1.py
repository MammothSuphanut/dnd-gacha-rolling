"""Twinhold level 1 (gate & trade) — the frame of the city, left for the user to fill with the Plot tool:
cavern + rock, organic streets, the shaft plaza with its twin lifts, the inner gate in the south tunnel, and every city
block as an EMPTY Plot-tool district of the right kind for its quarter (user's call 2026-10-24: "you lay the roads,
I fill the town"). Nudge a plot in Canvas of Kings and it builds its houses.

    timeout 300 python world-settings/novaris/maps/canvas-of-kings/twinhold_level1.py          # Save/twinhold-level1-frame.mommap
    timeout 300 python world-settings/novaris/maps/canvas-of-kings/twinhold_level1.py preview  # + level1-plots.png

Quarters follow the approved plan (twinhold_city.py LEVELS[0] / twinhold-city-sketch.png). Feet throughout.
"""
import json
import math
import os
import random
import sys

from shapely import affinity
from shapely.geometry import LineString, Point, Polygon
from shapely.ops import unary_union

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(HERE))))
sys.path.insert(0, os.path.join(ROOT, "adventure-builder", "canvas-of-kings"))
from cok import Map, carve_rock, district_plot, floor, poly_walls, preset, road, variants  # noqa: E402
from cok_city import Noise, organic_radial, organic_ring, polar, street_area, widths_along  # noqa: E402

SAVE = "D:/Steam/steamapps/common/Canvas of Kings/Save"
FT = 0.075
rng = random.Random(9351)
CAVE_R, SHAFT_R, PLAZA_R = 760, 55, 150

# Plot-tool districts exactly as the app saved them in the user's sample (contents get dropped)
_sample = {p["filename"].split("/")[-1]: p for p in json.load(open(f"{SAVE}/test_districts.mommap", encoding="utf-8"))["paths"]}
PLOTS = {"merchants": _sample["papd_merchants.tscn"], "craftsmen": _sample["papd_craftmen.tscn"], "farmers": _sample["papd_farmers.tscn"]}

# Quarters (angle 0 = east, 90 = south; radius in ft) → plot kind; None = leave open ground
QUARTERS = [
    ("market", 0, 340, -180, 180, "merchants"),
    ("caravan yard", 340, 800, 60, 120, None),
    ("customs + Aeor vault", 340, 800, 20, 60, "merchants"),
    ("warehouses", 340, 800, 120, 175, "craftsmen"),
    ("inns", 340, 800, 175, 235, "merchants"),
    ("merchants' homes", 340, 800, -125, -60, "merchants"),
    ("antique dealers", 340, 800, -60, -10, "merchants"),
    ("gate barracks", 340, 800, -10, 20, "craftsmen"),
]
OUTSKIRTS_R = 640  # past this the blocks become farmers' cottages (sparser), except special quarters
LANDMARKS = [("Aeor vault", 470, 40, 70), ("customs house", 610, 75, 55), ("inner gate", 700, 90, 50)]  # (name, r, angle, keep-clear radius)


def quarter_at(x, z):
    r = math.hypot(x, z)
    a = math.degrees(math.atan2(z, x))
    for name, r0, r1, a0, a1, kind in QUARTERS:
        if r0 <= r < r1 and (a0 <= a < a1 or a0 <= a + 360 < a1 or a0 <= a - 360 < a1):
            if kind and r > OUTSKIRTS_R and name not in ("customs + Aeor vault", "gate barracks"):
                return name, "farmers"
            return name, kind
    return "?", "merchants"


# ------------------------------------------------------------------------------------------------------------------
# Streets: same organic layout as the wedge test
cave_noise = Noise(rng, (2, 3, 5, 7))
cave = Polygon([polar(CAVE_R * (1 + 0.07 * cave_noise(math.radians(a))), a) for a in range(0, 360, 3)]).buffer(0)
plaza_edge = organic_ring(PLAZA_R, rng, 8)
ring1 = organic_ring(330, rng, 24)
ring2 = organic_ring(545, rng, 30)
radial_angles = [-157, -118, -84, -52, -14, 28, 66, 112]
radials = [organic_radial(a + rng.uniform(-3, 3), PLAZA_R - 5, CAVE_R * 1.1, rng, drift=rng.uniform(4, 9)) for a in radial_angles]
streets = [(plaza_edge, widths_along(plaza_edge, 20, 26, rng)), (ring1, widths_along(ring1, 20, 26, rng)),
           (ring2, widths_along(ring2, 15, 19, rng))]
for pts in radials:
    pts = [p for p in pts if cave.buffer(-25).contains(Point(p))]
    streets.append((pts, widths_along(pts, 16, 23, rng)))
tunnel = [polar(r_, 90) for r_ in range(680, 1001, 20)]
streets.append((tunnel, [24] * (len(tunnel) - 1)))
street_poly = unary_union([street_area(p, w) for p, w in streets]).intersection(cave)
plaza = Polygon(plaza_edge).buffer(0)
reserved = unary_union([Point(polar(r_, a)).buffer(rad) for _, r_, a, rad in LANDMARKS])

# radials stop short of the wall as roads, but still cut the blocks all the way out (else the outer ring is one block)
cuts = unary_union([street_poly.buffer(3)] + [LineString(r_).buffer(12) for r_ in radials])
city = cave.buffer(-8).difference(plaza.buffer(8)).difference(cuts).difference(reserved)
blocks = [g for g in getattr(city, "geoms", [city]) if g.geom_type == "Polygon" and g.area > 900]

# ------------------------------------------------------------------------------------------------------------------
m = Map(f"{SAVE}/test01.mommap")
m.d["environment"].update({"light_color": "c9b48fff", "light_energy": 0.95, "ambient_color": "4a443cff", "ambient_brightness": 1.0,
                           "black_level": 0.0, "glow_light_alpha": 0.6, "glow_light_color": "ffa031ff", "cloud_threshold": 0.0,
                           "shadow_opactiy": 0.7, "objects_no_smoke": False})
layers = {}
for k in (1, 2, 3):
    for part in ("Ground", "Buildings", "Deco"):
        layers[k, part] = m.add_layer(f"Level {k} {part}", k == 1)
GROUND, BUILD, DECO = (layers[1, p] for p in ("Ground", "Buildings", "Deco"))
U = lambda x, z: (x * FT, z * FT)


def put(prefix, x, z, rot, scale=0.85, layer=DECO):
    return m.obj(rng.choice(variants(prefix)), x * FT, z * FT, rot=rot, scale=scale, layer=layer)


open_area = cave.union(LineString([polar(700, 90), polar(1000, 90)]).buffer(30))
R = CAVE_R * 1.25
carve_rock(m, affinity.scale(open_area, FT, FT, origin=(0, 0)), (-R * FT, -R * FT, R * FT, R * FT), rng, layer=GROUND,
           cell=6.0, base=3.0, tops=0.45, inset=1.2, top_max=3.0)
for k in range(8):  # plaza paving in slices (plateaus can't have holes)
    a0, a1 = k * 45, (k + 1) * 45
    sl = Polygon([polar(SHAFT_R + 30, a0 + (a1 - a0) * i / 8) for i in range(9)] +
                 [polar(PLAZA_R + 4, a1 - (a1 - a0) * i / 8) for i in range(9)]).intersection(plaza)
    if sl.geom_type == "Polygon":
        floor(m, [U(*p) for p in sl.exterior.coords], layer=GROUND)
poly_walls(m, [U(*polar(SHAFT_R, a)) for a in range(0, 360, 15)], layer=BUILD)
for pts, ws in streets:
    if len(pts) >= 2:
        road(m, [U(*p) for p in pts], [w * FT for w in ws], layer=GROUND, style=18)

# Twin lifts with a brazier each; braziers where every street enters the plaza
for sx in (-24, 24):
    put("woDecos/wo_crane_", sx, -SHAFT_R + 6, rot=90, scale=1.4)
    put("woDecos/wo_campfire_", sx + (10 if sx > 0 else -10), -SHAFT_R - 12, rot=0, scale=0.8)
for pts, _ in streets[3:-1]:
    g = math.degrees(math.atan2(pts[0][1], pts[0][0]))
    for side in (-4, 4):
        put("woDecos/wo_campfire_", *polar(PLAZA_R + 8, g + side), rot=rng.uniform(0, 360), scale=0.8)

# Inner gate across the tunnel
for x0, x1 in ((-34, -10), (10, 34)):
    m.path("Paths/pa_stone_wall_3.tscn", [U(x0, 790), U(x1, 790)], line_fn="woPathObjects/wo_wall_stone_a.tscn", layer=BUILD)
    for o in m.d["paths"][-1]["points_objects"]:
        o["filename"] = "res://Source/World/WorldObjects/woPathObjects/wo_wall_stone_tower_c.tscn"
        o["object_type"] = 32
m.obj("woPathObjects/wo_wall_stone_tower_c_gate_b.tscn", 0.0, 790 * FT, rot=0, layer=BUILD)

# ------------------------------------------------------------------------------------------------------------------
# Every block an empty district of its quarter's kind
tally = {}
plan = []
for b in blocks:
    c = b.representative_point()
    q, kind = quarter_at(c.x, c.y)
    tally[kind or "open"] = tally.get(kind or "open", 0) + 1
    plan.append((b, q, kind))
    if kind:
        pts = list(b.simplify(2.0).exterior.coords)
        quarter = "market" if q == "market" else "outskirts" if kind == "farmers" else "workshops" if kind == "craftsmen" else "residential"
        district_plot(m, PLOTS[kind], [U(*p) for p in pts], layer=BUILD, settings=preset("cave", quarter))

m.d["info"].update({"camera_pos_x": 0.0, "camera_pos_z": 0.0, "camera_zoom": 90.0})
OUT = f"{SAVE}/twinhold-level1-frame.mommap"  # never twinhold-level1.mommap: that one is the user's populated save
m.save(OUT)
print("wrote", OUT, "-", len(blocks), "blocks:", tally, "| open spots kept clear:", [n for n, *_ in LANDMARKS])

if len(sys.argv) > 1 and sys.argv[1] == "preview":
    from PIL import Image, ImageDraw, ImageFont

    S = 0.6
    W = int(2 * (CAVE_R + 100) * S)
    im = Image.new("RGB", (W, W), (90, 86, 80))
    dr = ImageDraw.Draw(im)
    T = lambda x, z: (W / 2 + x * S, W / 2 + z * S)
    font = ImageFont.truetype("C:/Windows/Fonts/tahoma.ttf", 13)
    dr.polygon([T(*p) for p in cave.exterior.coords], fill=(225, 215, 185))
    cols = {"merchants": (215, 150, 110), "craftsmen": (170, 130, 90), "farmers": (190, 200, 140), None: (235, 228, 205)}
    for b, q, kind in plan:
        dr.polygon([T(*p) for p in b.exterior.coords], fill=cols[kind], outline=(60, 50, 40))
    for pts, ws in streets:
        for (a, b2), w in zip(zip(pts, pts[1:]), ws):
            dr.line([T(*a), T(*b2)], fill=(190, 165, 125), width=max(2, int(w * S)))
    dr.polygon([T(*p) for p in plaza.exterior.coords], fill=(205, 195, 170))
    for n, r_, a, rad in LANDMARKS:
        x, z = polar(r_, a)
        dr.ellipse([T(x - rad, z - rad), T(x + rad, z + rad)], outline=(120, 40, 120), width=3)
        dr.text(T(x - rad, z - 8), n, fill=(90, 20, 90), font=font)
    y = 8
    for kind, label in (("merchants", "District of Merchants"), ("craftsmen", "District of Craftsmen"), ("farmers", "District of Farmers"),
                        (None, "เว้นว่าง (ลานคาราวาน)")):
        dr.rectangle([8, y, 26, y + 14], fill=cols[kind])
        dr.text((32, y), label, fill=(255, 255, 255), font=font)
        y += 20
    im.save(os.path.join(HERE, "level1-plots.png"))
    print("wrote", os.path.join(HERE, "level1-plots.png"))
