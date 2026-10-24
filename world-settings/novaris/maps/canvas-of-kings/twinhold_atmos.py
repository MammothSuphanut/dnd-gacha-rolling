"""Cave-metropolis atmosphere on top of the user's populated Twinhold (Save/twinhold.mommap → Save/twinhold-atmos-<theme>.mommap).

    timeout 300 python world-settings/novaris/maps/canvas-of-kings/twinhold_atmos.py   # → twinhold-atmos-forge/sepia/deep.mommap + atmos-level*.png

What the user picked (2026-10-24): a lit, hazy cave in three themes to compare, great rock columns holding up the roof + rubble at the
foot of the cavern wall, and forge smoke on level 3 (smoke over the great forge, its quarter's chimneys and the lava
pool; anvils by the forge, crates of ore by the mine descent). Nothing the user built is moved or removed — every
column, stone and puff is set where none of their houses, stalls, carts, people or plot roads stand, and off the
streets. The user's file is only read; the new one isn't written over if it's already there.
"""
import json
import math
import os
import random
import sys

from shapely.geometry import Point, Polygon
from shapely.ops import unary_union
from shapely.strtree import STRtree

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from twinhold_plan import CAVE_R, FT, LAVA, LEVELS, SAVE, plan  # noqa: E402
from cok import Map, blob, variants  # noqa: E402
from cok_city import street_area  # noqa: E402

SRC = f"{SAVE}/twinhold.mommap"

# Themes — only the Environment panel differs (Light tab + Weather tab + Black Level), after the colour-graded
# Workshop cities the user pointed at; each is written to its own file so they can be compared in the app.
# No clouds or wind under the mountain; fog values after the user's own indoor sample test_floor.
CAVE = {"cloud_threshold": 0.0, "wind_strength": 0.1, "snow_strength": 0.0, "fog_threshold": 0.4, "black_level": 1.0}
THEMES = {
    # firelit forge-city: warm low key light, near-black ambient, deep shadows, sooty brown haze, orange firelight
    "forge": {"light_color": "d89a5cff", "light_energy": 0.6, "ambient_color": "2e2620ff", "ambient_brightness": 0.8,
              "ambient_contrast": 1.15, "ambient_saturation": 0.9, "shadow_opactiy": 0.85, "fog_color": "3a302aff",
              "fog_density": 0.45, "smoke_color": "2a2522ff", "glow_light_alpha": 0.8, "glow_light_color": "ff8a2aff"},
    # ink-and-parchment: an old printed city map (Devana / "brother of Rome"), washed-out sepia, soft shadows
    "sepia": {"light_color": "e8d3a8ff", "light_energy": 0.9, "ambient_color": "6b5a40ff", "ambient_brightness": 1.0,
              "ambient_contrast": 1.25, "ambient_saturation": 0.35, "shadow_opactiy": 0.7, "fog_color": "8a7656ff",
              "fog_density": 0.3, "smoke_color": "3a3026ff", "glow_light_alpha": 0.5, "glow_light_color": "e0a050ff"},
    # the deep dark: cold blue cave light (the user's test_cave) so every hearth and the lava burn warm against it
    "deep": {"light_color": "bad4ebff", "light_energy": 0.45, "ambient_color": "1e3346ff", "ambient_brightness": 0.8,
             "ambient_contrast": 1.15, "ambient_saturation": 0.7, "shadow_opactiy": 0.8, "fog_color": "1c2a36ff",
             "fog_density": 0.5, "smoke_color": "20262bff", "glow_light_alpha": 0.9, "glow_light_color": "ffb050ff"},
}

OUTS = {k: f"{SAVE}/twinhold-atmos-{k}.mommap" for k in THEMES}

COLUMNS = 12           # per level
COLUMN_R = (16, 24)    # radius, ft
COLUMN_GAP = 170       # ft between columns
RUBBLE_STEP = 55       # ft along the wall between rubble heaps


def obstacles(d, layers):
    """Everything the user's plots built on this level (houses, stalls, carts, people…) and the plots' own roads, in feet."""
    pts, lines = [], []
    for p in d["paths"]:
        if p.get("assigned_map_layer_idx") not in layers:
            continue
        for o in p.get("area_objects", []):
            pts.append(Point(o["position_x"] / FT, o["position_z"] / FT))
        for s in p.get("sub_paths", []):
            q = [(m["x"] / FT, m["z"] / FT) for m in s["main_points"]]
            if len(q) >= 2:
                lines.append(street_area(q, [16] * (len(q) - 1)))
    for o in d["objects"]:
        if o.get("assigned_map_layer_idx") in layers:
            pts.append(Point(o["position_x"] / FT, o["position_z"] / FT))
    return pts, unary_union(lines) if lines else Polygon()


def main():
    for out in OUTS.values():
        if os.path.exists(out):
            sys.exit(f"{out} already exists — it may hold the user's work; move it away first")
    d = json.load(open(SRC, encoding="utf-8"))
    m = Map()
    m.d = d
    m.uid = d["info"]["last_uid"]
    layer = {l["name"]: l["idx"] for l in d["layers"]["map_layers"]}
    added = []
    for i, lv in enumerate(LEVELS):
        n = i + 1
        G, B, D = layer[f"Level {n} Ground"], layer[f"Level {n} Buildings"], layer[f"Level {n} Deco"]
        rng = random.Random(lv["seed"] + 101)
        res = plan(lv)
        cave = res["cave"]
        streets = unary_union([street_area(p, w) for p, w in res["streets"] if len(p) >= 2])
        objs, plot_roads = obstacles(d, {G, B, D})
        tree = STRtree(objs)
        blocked = unary_union([streets.buffer(4), plot_roads, Point(0, 0).buffer(170)])
        if n == 3:
            blocked = blocked.union(Polygon([(x / FT, z / FT) for x, z in LAVA]).buffer(10))

        def free(g, pad):
            return not g.intersects(blocked) and not tree.query(g.buffer(pad), predicate="intersects").size

        mine = {"columns": 0, "rubble": 0, "smoke": 0, "props": 0}
        # great columns: rock pillars from floor to roof, spread through the cavern where the ground is clear
        cols = []
        for _ in range(6000):
            if len(cols) >= COLUMNS:
                break
            a, r_ = rng.uniform(0, 360), CAVE_R * math.sqrt(rng.uniform(0.08, 0.8))
            x, z = r_ * math.cos(math.radians(a)), r_ * math.sin(math.radians(a))
            rad = rng.uniform(*COLUMN_R)
            g = Point(x, z).buffer(rad)
            if not cave.buffer(-60).contains(g) or any(math.hypot(x - cx, z - cz) < COLUMN_GAP for cx, cz, _ in cols) or not free(g, 4):
                continue
            cols.append((x, z, rad))
        for x, z, rad in cols:
            m.plateau([(px * FT, pz * FT) for px, pz in blob(x, z, rad, rad * rng.uniform(0.8, 1.0), rng, n=10, wobble=0.15)],
                      texture=1, edge=2, height=rng.uniform(4.2, 5.0), gradient=0.1, layer=G)
            m.plateau([(px * FT, pz * FT) for px, pz in blob(x, z, rad * 0.6, rad * 0.55, rng, n=8, wobble=0.2)],
                      texture=rng.choice((1, 1, 14)), edge=2, height=rng.uniform(5.5, 6.5), gradient=0.1, layer=G)
            added.append((n, "column", x, z, rad))
            mine["columns"] += 1
        # rubble where the wall meets the floor: a fallen rock or two, then stones and chips round it
        ring = cave.exterior
        for k in range(int(ring.length / RUBBLE_STEP)):
            if rng.random() < 0.25:
                continue
            p = ring.interpolate(k * RUBBLE_STEP + rng.uniform(-15, 15))
            c = cave.centroid
            dx, dz = c.x - p.x, c.y - p.y
            L = math.hypot(dx, dz) or 1
            x, z = p.x + dx / L * rng.uniform(10, 18), p.y + dz / L * rng.uniform(10, 18)
            if not free(Point(x, z).buffer(9), 3):
                continue
            if rng.random() < 0.5:
                rr = rng.uniform(5, 9)
                m.plateau([(px * FT, pz * FT) for px, pz in blob(x, z, rr, rr * 0.8, rng, n=7, wobble=0.3)],
                          texture=1, edge=2, height=rng.uniform(0.8, 2.0), gradient=0.1, layer=G)
            for _ in range(rng.randint(2, 5)):
                sx, sz = x + rng.uniform(-10, 10), z + rng.uniform(-10, 10)
                if free(Point(sx, sz).buffer(2), 1):
                    kind = "woDecos/wo_stone_fragments_" if rng.random() < 0.35 else "woDecos/wo_stone_"
                    m.obj(rng.choice(variants(kind)), sx * FT, sz * FT, rot=rng.uniform(0, 360), scale=rng.uniform(0.85, 1.35), layer=D)
            added.append((n, "rubble", x, z, 9))
            mine["rubble"] += 1
        if n == 3:
            def puff(x, z, s):
                m.obj("woDecos/wo_smoke_a.tscn", x * FT, z * FT, rot=rng.uniform(0, 360), scale=s, layer=D)
                added.append((n, "smoke", x, z, 6))
                mine["smoke"] += 1

            forge = [p for p in d["paths"] if p.get("assigned_map_layer_idx") == B and "papl_wall" in p["filename"]]
            if forge:  # the great forge: a raised Castle-surface block, smoke rising off it
                fg = Polygon([(q["x"] / FT, q["z"] / FT) for q in forge[0]["main_points"]])
                for _ in range(5):
                    c = fg.centroid
                    puff(c.x + rng.uniform(-35, 35), c.y + rng.uniform(-25, 25), rng.uniform(1.1, 1.5))
                for k in range(8):  # anvils at the forge's foot, just outside it
                    p = fg.exterior.interpolate(fg.exterior.length * (k + rng.random() * 0.5) / 8)
                    c = fg.centroid
                    dx, dz = p.x - c.x, p.y - c.y
                    L = math.hypot(dx, dz) or 1
                    x, z = p.x + dx / L * 6, p.y + dz / L * 6
                    if free(Point(x, z).buffer(2), 1):
                        m.obj(rng.choice(variants("woDecos/woDecosRooms/wo_anvil_")), x * FT, z * FT,
                              rot=math.degrees(-math.atan2(dz, dx)) + 90, scale=1.0, layer=D)
                        added.append((n, "prop", x, z, 3))
                        mine["props"] += 1
            for x, z in ((-640, -6), (-665, 8), (-700, 0), (-790, 0), (-880, 0)):  # off the lava pool and along the pipe
                puff(x + rng.uniform(-8, 8), z + rng.uniform(-6, 6), rng.uniform(0.9, 1.3))
            huts = [o for p in d["paths"] if p.get("assigned_map_layer_idx") == B and "craftmen" in p["filename"]
                    for o in p.get("area_objects", []) if "woHuts" in o["filename"]]
            smithy = [o for o in huts if (math.degrees(math.atan2(o["position_z"], o["position_x"])) - 150) % 360 < 75
                      and math.hypot(o["position_x"], o["position_z"]) / FT > 340]  # the smiths' quarter, 150-225°
            for o in rng.sample(smithy, min(18, len(smithy))):  # forge chimneys: smoke right over the workshop
                puff(o["position_x"] / FT + rng.uniform(-3, 3), o["position_z"] / FT + rng.uniform(-3, 3), rng.uniform(0.7, 1.0))
            mines = [p for p in d["paths"] if p.get("assigned_map_layer_idx") == B and "lumberyard" in p["filename"]
                     and 40 <= math.degrees(math.atan2(p["main_points"][0]["z"], p["main_points"][0]["x"])) <= 62]
            for p in mines:  # crates of ore stacked along the edge of the mine-descent yard
                g = Polygon([(q["x"] / FT, q["z"] / FT) for q in p["main_points"]])
                for k in range(10):
                    q = g.exterior.interpolate(g.exterior.length * rng.random())
                    c = g.centroid
                    dx, dz = c.x - q.x, c.y - q.y
                    L = math.hypot(dx, dz) or 1
                    x, z = q.x + dx / L * 5, q.y + dz / L * 5
                    if free(Point(x, z).buffer(2), 1):
                        m.obj(rng.choice(variants("woDecos/wo_crate_")), x * FT, z * FT, rot=math.degrees(-math.atan2(dz, dx)),
                              scale=rng.uniform(0.8, 0.95), layer=D)
                        added.append((n, "prop", x, z, 3))
                        mine["props"] += 1
        print(f"level {n}:", mine)
    for k, out in OUTS.items():  # same map, one file per theme
        d["environment"].update(CAVE, **THEMES[k])
        m.save(out)
    return d, added


if __name__ == "__main__":
    d, added = main()
    print("wrote", ", ".join(OUTS.values()), "| paths", len(d["paths"]), "objects", len(d["objects"]))
    from PIL import ImageDraw
    from preview import render

    S = CAVE_R * 2.3 * FT
    for n in (1, 2, 3):
        keep = {l["idx"] for l in d["layers"]["map_layers"] if l["name"].startswith(f"Level {n} ")}
        one = dict(d, paths=[p for p in d["paths"] if p.get("assigned_map_layer_idx") in keep],
                   objects=[o for o in d["objects"] if o.get("assigned_map_layer_idx") in keep] +
                           [o for p in d["paths"] if p.get("assigned_map_layer_idx") in keep for o in p.get("area_objects", [])])
        tmp = os.path.join(HERE, f"_atmos{n}.mommap")
        json.dump(one, open(tmp, "w", encoding="utf-8"))
        px = 7
        im = render(tmp, 0, 0, S, os.path.join(HERE, f"atmos-level{n}.png"), px=px)
        os.remove(tmp)
        dr = ImageDraw.Draw(im)
        col = {"column": (230, 40, 40), "rubble": (40, 200, 230), "smoke": (60, 60, 60), "prop": (250, 220, 0)}
        for lv, kind, x, z, rad in added:
            if lv == n:
                X, Z = (x * FT + S / 2) * px, (z * FT + S / 2) * px
                rr = max(4, rad * FT * px)
                dr.ellipse((X - rr, Z - rr, X + rr, Z + rr), outline=col[kind], width=3)
        im.save(os.path.join(HERE, f"atmos-level{n}.png"))
