"""Twinhold level 1 — test wedge (north: market ring + merchants' quarter), built with the rules in
adventure-builder/canvas-of-kings/CITY-COMPOSITION.md (skill /build-city-map):
organic streets → blocks → alleys → houses fronting the street (ready-made huts + compound roofs in the core) →
people, carts, stalls and bunting on the streets → yards with a way in and a use → light only from fires.

    timeout 300 python world-settings/novaris/maps/canvas-of-kings/twinhold_wedge.py          # Save/twinhold-wedge-test.mommap
    timeout 300 python world-settings/novaris/maps/canvas-of-kings/twinhold_wedge.py preview  # + wedge-preview.png

Plan and districts: twinhold_city.py / twinhold-city-sketch.png. Feet throughout; FT converts to map units.
No trees (city inside the mountain).
"""
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
from cok import Map, bunting, carve_rock, citizen, floor, hut, poly_walls, road, roadside, roof, variants  # noqa: E402
from cok_city import Noise, organic_radial, organic_ring, polar, split_blocks, street_area, terrace, widths_along  # noqa: E402

SAVE = "D:/Steam/steamapps/common/Canvas of Kings/Save"
FT = 0.075
rng = random.Random(9351)

CAVE_R, SHAFT_R, PLAZA_R = 760, 55, 150
WEDGE = (-140, -40)  # degrees; north is -90


def in_wedge(x, z, pad=0):
    a = math.degrees(math.atan2(z, x))
    return WEDGE[0] - pad <= a <= WEDGE[1] + pad


def heading(dx, dz):  # Canvas of Kings rotation of something lying along (dx, dz)
    return -math.degrees(math.atan2(dz, dx))


# ------------------------------------------------------------------------------------------------------------------
# Streets (whole level, so the wedge sits in its real context): main ~23 ft, ring 2 ~17 ft, radials 17–23 ft
cave_noise = Noise(rng, (2, 3, 5, 7))
cave = Polygon([polar(CAVE_R * (1 + 0.07 * cave_noise(math.radians(a))), a) for a in range(0, 360, 3)]).buffer(0)
plaza_edge = organic_ring(PLAZA_R, rng, 8)
ring1 = organic_ring(330, rng, 24)
ring2 = organic_ring(545, rng, 30)
radial_angles = [-157, -118, -84, -52, -14, 28, 66, 112]  # uneven on purpose
radials = [organic_radial(a + rng.uniform(-3, 3), PLAZA_R - 5, CAVE_R * 1.1, rng, drift=rng.uniform(4, 9)) for a in radial_angles]
streets = [(plaza_edge, widths_along(plaza_edge, 20, 26, rng)), (ring1, widths_along(ring1, 20, 26, rng)),
           (ring2, widths_along(ring2, 15, 19, rng))]
for pts in radials:
    pts = [p for p in pts if cave.buffer(-25).contains(Point(p))]
    streets.append((pts, widths_along(pts, 16, 23, rng)))
street_poly = unary_union([street_area(p, w) for p, w in streets]).intersection(cave)
plaza = Polygon(plaza_edge).buffer(0)

wedge_poly = Polygon([(0, 0)] + [polar(CAVE_R * 1.3, a) for a in range(WEDGE[0], WEDGE[1] + 1, 2)])
city = cave.buffer(-6).intersection(wedge_poly).difference(plaza.buffer(6)).difference(street_poly.buffer(1))
blocks = [g for g in getattr(city, "geoms", [city]) if g.geom_type == "Polygon" and g.area > 600]
blocks, alleys = split_blocks(blocks, rng, max_area=22000, min_side=45, alley_w=10)
lanes = unary_union([street_poly] + list(alleys))

# ------------------------------------------------------------------------------------------------------------------
m = Map(f"{SAVE}/test01.mommap")
m.d["environment"].update({"light_color": "c9b48fff", "light_energy": 0.95, "ambient_color": "4a443cff", "ambient_brightness": 1.0,
                           "black_level": 0.0, "glow_light_alpha": 0.6, "glow_light_color": "ffa031ff", "cloud_threshold": 0.0,
                           "shadow_opactiy": 0.7, "objects_no_smoke": False})
GROUND, BUILD, DECO = (m.add_layer(f"Level 1 {p}") for p in ("Ground", "Buildings", "Deco"))
U = lambda x, z: (x * FT, z * FT)
counts = {k: 0 for k in ("huts", "roofs", "wings", "sheds", "people", "bunting", "carts", "stalls", "crates", "piles", "wells")}


def put(prefix, x, z, rot, scale=None, layer=DECO, y=0.0):
    fn = prefix if prefix.endswith(".tscn") else rng.choice(variants(prefix))
    return m.obj(fn, x * FT, z * FT, rot=rot, scale=rng.uniform(0.82, 0.9) if scale is None else scale, layer=layer, y=y)


# Rock round the cavern, tunnel south
open_area = cave.union(LineString([polar(700, 90), polar(1000, 90)]).buffer(30))
R = CAVE_R * 1.25
carve_rock(m, affinity.scale(open_area, FT, FT, origin=(0, 0)), (-R * FT, -R * FT, R * FT, R * FT), rng, layer=GROUND,
           cell=6.0, base=3.0, tops=0.45, inset=1.2, top_max=3.0)

# Plaza paving (8 slices — plateaus can't have holes) and the shaft railing
for k in range(8):
    a0, a1 = k * 45, (k + 1) * 45
    sl = Polygon([polar(SHAFT_R + 30, a0 + (a1 - a0) * i / 8) for i in range(9)] +
                 [polar(PLAZA_R + 4, a1 - (a1 - a0) * i / 8) for i in range(9)]).intersection(plaza)
    if sl.geom_type == "Polygon":
        floor(m, [U(*p) for p in sl.exterior.coords], layer=GROUND)
poly_walls(m, [U(*polar(SHAFT_R, a)) for a in range(0, 360, 15)], layer=BUILD)

# Streets and alleys
for pts, ws in streets:
    if len(pts) >= 2:
        road(m, [U(*p) for p in pts], [w * FT for w in ws], layer=GROUND, style=18)
for al in alleys:
    for g in getattr(al, "geoms", [al]):
        if g.geom_type != "Polygon" or g.area < 50:
            continue
        mrr = list(g.minimum_rotated_rectangle.exterior.coords)
        e1 = math.hypot(mrr[1][0] - mrr[0][0], mrr[1][1] - mrr[0][1])
        e2 = math.hypot(mrr[2][0] - mrr[1][0], mrr[2][1] - mrr[1][1])
        if e1 >= e2:
            a_, b_ = ((mrr[0][0] + mrr[3][0]) / 2, (mrr[0][1] + mrr[3][1]) / 2), ((mrr[1][0] + mrr[2][0]) / 2, (mrr[1][1] + mrr[2][1]) / 2)
        else:
            a_, b_ = ((mrr[0][0] + mrr[1][0]) / 2, (mrr[0][1] + mrr[1][1]) / 2), ((mrr[2][0] + mrr[3][0]) / 2, (mrr[2][1] + mrr[3][1]) / 2)
        road(m, [U(*a_), U(*b_)], 10 * FT, layer=GROUND, style=23)

# ------------------------------------------------------------------------------------------------------------------
# Houses. Core (inside the inner ring): compound buildings of roofs, often with a wing at right angles, mixed with
# merchants' huts. Merchants' quarter: huts. Fewer and plainer towards the cavern wall (83% → 75% → 27% built).
fronts_all = []  # (front mid, road heading, outward normal, along, kind, radius) — where street life gathers


def keep_chance(r):
    return 1.0 if r < 330 else 0.95 if r < 540 else 0.6 if r < 640 else 0.35


for b in blocks:
    c = b.centroid
    core = math.hypot(c.x, c.y) < 330
    houses, fronts, passages = terrace(b, rng, width=(20, 34) if core else (19, 25), depth=(16, 24), streets=lanes)
    variant = rng.randint(0, 1)
    built = []
    for h, (p0, p1, d) in zip(houses, fronts):
        w = math.hypot(p1[0] - p0[0], p1[1] - p0[1])
        ux, uz = (p1[0] - p0[0]) / w, (p1[1] - p0[1]) / w
        q = list(h.exterior.coords)
        nx, nz = (q[3][0] - q[0][0]) / d, (q[3][1] - q[0][1]) / d  # into the block
        mx, mz = (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2
        r_here = math.hypot(mx, mz)
        if rng.random() > keep_chance(r_here):
            continue
        road_rot = heading(ux, uz)
        if core and rng.random() < 0.55:  # compound building of roofs
            cx, cz = mx + nx * d / 2, mz + nz * d / 2
            v = variant if rng.random() < 0.8 else 1 - variant
            chim = (rng.uniform(0.2, 0.8), rng.randint(0, 1)) if rng.random() < 0.55 else None
            hgt = rng.uniform(-0.5, 0.5) if rng.random() < 0.6 else 0.0
            roof(m, U(cx - ux * w / 2, cz - uz * w / 2), U(cx + ux * w / 2, cz + uz * w / 2), d / 2 * FT, variant=v, layer=BUILD,
                 chimney=chim, height=hgt)
            counts["roofs"] += 1
            if rng.random() < 0.4 and w > 18:  # wing at right angles off the back
                ww = rng.uniform(12, min(18, w - 4))
                off = rng.choice((-1, 1)) * (w / 2 - ww / 2)
                wl = rng.uniform(12, 20)
                bx, bz = cx + ux * off + nx * d / 2, cz + uz * off + nz * d / 2
                wing = Polygon([(bx - ux * ww / 2, bz - uz * ww / 2), (bx + ux * ww / 2, bz + uz * ww / 2),
                                (bx + ux * ww / 2 + nx * wl, bz + uz * ww / 2 + nz * wl), (bx - ux * ww / 2 + nx * wl, bz - uz * ww / 2 + nz * wl)])
                if b.buffer(-1).contains(wing) and not any(wing.buffer(-0.5).intersects(o) for o in built):
                    roof(m, U(bx - nx * 3, bz - nz * 3), U(bx + nx * wl, bz + nz * wl), ww / 2 * FT, variant=v, layer=BUILD, height=hgt)
                    built.append(wing)
                    counts["wings"] += 1
            kind = "core"
        else:  # ready-made house, front on the street
            hx, hz = mx + nx * 10, mz + nz * 10
            hut(m, "cottage" if r_here > 640 else "merchant", hx * FT, hz * FT, road_rot, rng, layer=BUILD)
            counts["huts"] += 1
            kind = "hut"
        built.append(h)
        fronts_all.append(((mx, mz), road_rot, (-nx, -nz), (ux, uz), kind, r_here))
        if rng.random() < 0.15:  # firewood behind the house
            bxp, bzp = mx + nx * (d + 4), mz + nz * (d + 4)
            if b.buffer(-1).contains(Point(bxp, bzp)):
                put("woDecos/wo_wood_pile_", bxp, bzp, rot=road_rot + rng.uniform(-8, 8))
                counts["piles"] += 1

    # the way into the yard
    for out_pt, in_pt in passages:
        road(m, [U(*out_pt), U(*in_pt)], 8 * FT, layer=GROUND, style=23)

    # a storehouse in the middle of big yards, crates along its side (wells stand in the squares, not here)
    taken = unary_union(built) if built else None
    yard = b.difference(taken.buffer(1.0)) if taken else b
    for g in getattr(yard, "geoms", [yard]):
        if g.geom_type != "Polygon" or g.area < 3500 or rng.random() > 0.6:
            continue
        core_g = g.buffer(-7)
        if core_g.is_empty:
            continue
        spot = core_g.representative_point()
        ang = rng.uniform(0, 180)
        L_, D_ = rng.uniform(26, 38), rng.uniform(14, 18)
        ux2, uz2 = math.cos(math.radians(ang)), math.sin(math.radians(ang))
        barn = Polygon([(spot.x + ux2 * sx * L_ / 2 - uz2 * sd * D_ / 2, spot.y + uz2 * sx * L_ / 2 + ux2 * sd * D_ / 2)
                        for sx, sd in ((-1, -1), (1, -1), (1, 1), (-1, 1))])
        if g.buffer(-4).contains(barn):
            roof(m, U(spot.x - ux2 * L_ / 2, spot.y - uz2 * L_ / 2), U(spot.x + ux2 * L_ / 2, spot.y + uz2 * L_ / 2), D_ / 2 * FT,
                 kind="wooden", variant=rng.randint(0, 1), layer=BUILD)
            counts["sheds"] += 1
            for k in range(rng.randint(2, 4)):
                put("woDecos/wo_crate_", spot.x + ux2 * (k * 3.2 - 5) - uz2 * (D_ / 2 + 3), spot.y + uz2 * (k * 3.2 - 5) + ux2 * (D_ / 2 + 3),
                    rot=heading(ux2, uz2) + rng.uniform(-6, 6))
                counts["crates"] += 1

# ------------------------------------------------------------------------------------------------------------------
# Street life in front of the houses: stalls by merchants' doors, carts and crates at the road edge
for (mx, mz), road_rot, (ox, oz), (ux, uz), kind, r_here in fronts_all:
    if r_here > 640:
        continue
    roll = rng.random()
    if roll < 0.18:
        put("woBuildings/wo_market_stall_", mx + ox * 4, mz + oz * 4, rot=road_rot + rng.choice((0, 180)) + rng.uniform(-5, 5))
        counts["stalls"] += 1
    elif roll < 0.30:
        roadside(m, "woUnits/wo_horse_cart_" if rng.random() < 0.6 else "woUnits/wo_hand_cart_", (mx + ox * 5) * FT, (mz + oz * 5) * FT,
                 road_rot, rng, layer=DECO)
        counts["carts"] += 1
    elif roll < 0.42:
        for k in range(rng.randint(2, 3)):
            put("woDecos/wo_crate_", mx + ox * 2.5 + ux * (k * 3 - 3), mz + oz * 2.5 + uz * (k * 3 - 3), rot=road_rot + rng.uniform(-8, 8))
            counts["crates"] += 1

# People on the streets, about one every 30–60 ft; bunting across the busy streets near the market
for pts, ws in streets:
    if len(pts) < 2:
        continue
    line = LineString(pts)
    s = rng.uniform(0, 30)
    while s < line.length:
        p, q = line.interpolate(s), line.interpolate(min(line.length, s + 1))
        if in_wedge(p.x, p.y) and cave.contains(p):
            rr = heading(q.x - p.x, q.y - p.y)
            nx, nz = -(q.y - p.y), (q.x - p.x)
            Ln = math.hypot(nx, nz) or 1
            side = rng.uniform(-6, 6)
            citizen(m, (p.x + nx / Ln * side) * FT, (p.y + nz / Ln * side) * FT, rr, rng, layer=DECO)
            counts["people"] += 1
            if math.hypot(p.x, p.y) < 470 and rng.random() < 0.12:
                bunting(m, p.x * FT, p.y * FT, rr, rng, layer=DECO)
                counts["bunting"] += 1
        s += rng.uniform(30, 60)

# Wells stand in the street where ways meet: at each radial × ring crossing inside the wedge, off to one side
for pts, _ in streets[3:]:
    if len(pts) < 2:
        continue
    line = LineString(pts)
    for ring_pts in (ring1, ring2):
        x = line.intersection(LineString(ring_pts))
        for g in getattr(x, "geoms", [x]):
            if g.geom_type == "Point" and in_wedge(g.x, g.y) and rng.random() < 0.7:
                a = math.atan2(g.y, g.x) + rng.choice((-1, 1)) * 0.05
                put("woBuildings/wo_well_", g.x + math.cos(a) * 16, g.y + math.sin(a) * 16, rot=rng.uniform(0, 360), scale=1.0)
                counts["wells"] += 1

# ------------------------------------------------------------------------------------------------------------------
# Market: a double row of stalls round the plaza with an aisle between, gaps where the streets come in
street_gaps = [math.degrees(math.atan2(p[0][1], p[0][0])) for p, _ in streets[3:] if p]
for r_, facing in ((PLAZA_R - 22, 0), (PLAZA_R - 46, 180)):
    a = WEDGE[0]
    while a < WEDGE[1]:
        if not any(abs((a - g + 180) % 360 - 180) < 7 for g in street_gaps):
            x, z = polar(r_, a)
            put("woBuildings/wo_market_stall_", x, z, rot=-a - 90 + facing)
            if rng.random() < 0.35:
                bx, bz = polar(r_ + (7 if facing == 0 else -7), a + rng.uniform(-1, 1))
                put("woDecos/wo_crate_" if rng.random() < 0.5 else "woDecos/wo_goods_", bx, bz, rot=-a + rng.uniform(-10, 10))
        a += rng.uniform(4.2, 5.2)
for _ in range(30):  # shoppers in the aisle
    a = rng.uniform(*WEDGE)
    citizen(m, *[v * FT for v in polar(PLAZA_R - 34 + rng.uniform(-4, 4), a)], -a, rng, layer=DECO)
    counts["people"] += 1

# Braziers where the streets enter the plaza and at the twin lifts — the only light besides chimneys
for g in street_gaps:
    if in_wedge(*polar(PLAZA_R, g), pad=5):
        for side in (-8, 8):
            put("woDecos/wo_campfire_", *polar(PLAZA_R + 6, g + side * 0.5), rot=rng.uniform(0, 360), scale=0.8)
for sx in (-24, 24):
    put("woDecos/wo_crane_", sx, -SHAFT_R + 6, rot=90, scale=1.4)
    put("woDecos/wo_campfire_", sx + (10 if sx > 0 else -10), -SHAFT_R - 12, rot=0, scale=0.8)

# Rubble heaped in a few places at the foot of the cavern wall
edge = cave.exterior
for _ in range(9):
    p = edge.interpolate(rng.uniform(0, edge.length))
    if not in_wedge(p.x, p.y, pad=10):
        continue
    for k in range(rng.randint(4, 8)):
        put("woDecos/wo_stone_" if k % 3 else "woDecos/wo_stone_fragments_", p.x + rng.uniform(-10, 10), p.y + rng.uniform(-10, 10),
            rot=rng.uniform(0, 360), scale=rng.uniform(0.9, 2.0))

m.d["info"].update({"camera_pos_x": 0.0, "camera_pos_z": -380 * FT, "camera_zoom": 45.0})
OUT = f"{SAVE}/twinhold-wedge-test.mommap"
m.save(OUT)
print("wrote", OUT, "-", ", ".join(f"{v} {k}" for k, v in counts.items()), "|", len(blocks), "blocks,", len(alleys), "alleys")

if len(sys.argv) > 1 and sys.argv[1] == "preview":
    sys.path.insert(0, HERE)
    from preview import render

    render(OUT, 0, -420 * FT, 75, os.path.join(HERE, "wedge-preview.png"))
