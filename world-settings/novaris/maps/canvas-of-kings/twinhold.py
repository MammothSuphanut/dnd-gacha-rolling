"""Twinhold (Aldenreich / Gråmark) — Canvas of Kings battle maps, one layer set per level.

    python world-settings/novaris/maps/canvas-of-kings/twinhold.py sketch   # PNG plan of Level 2 with a 5 ft grid
    python world-settings/novaris/maps/canvas-of-kings/twinhold.py forge    # .mommap of the Great Forge district only

Lore: world-settings/novaris/aldenreich/gramark/twinhold-diarchy.md — "ผังแต่ละชั้น" (approved 2026-10-24).
Plan is laid out in feet around the city's central shaft (✨ proposal: a round shaft with a spiral ramp joins every level,
each level is a ring road with districts carved off it). Scale from the user's building sample: 5 ft ≈ 0.35 map units.
No text labels on the map (user's call) — names only appear on the sketch.
"""
import json
import math
import os
import random
import sys

from shapely import affinity
from shapely.geometry import LineString, Point, Polygon, box
from shapely.ops import unary_union

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
sys.path.insert(0, os.path.join(ROOT, "adventure-builder", "canvas-of-kings"))
from cok import Map, blob, carve_rock, floor, poly_walls, variants  # noqa: E402

SAVE = "D:/Steam/steamapps/common/Canvas of Kings/Save"
SCRATCH = os.environ.get("COK_SKETCH_DIR", os.path.dirname(os.path.abspath(__file__)))
FT = 0.07  # map units per foot (5 ft square = 0.35)
rng = random.Random(935)  # current year in Novaris — fixed seed so reruns give the same map


# ------------------------------------------------------------------------------------------------------------------
# Geometry helpers (feet)
def circle(cx, cz, r, n=40):
    return [(cx + math.cos(2 * math.pi * k / n) * r, cz + math.sin(2 * math.pi * k / n) * r) for k in range(n)]


def cave(cx, cz, rx, rz, n=36, wobble=0.12):
    return Polygon(blob(cx, cz, rx, rz, rng, n=n, wobble=wobble)).buffer(0)


def tunnel(points, width, wobble=1.5):
    pts = []
    for (ax, az), (bx, bz) in zip(points, points[1:]):
        steps = max(1, int(math.hypot(bx - ax, bz - az) / 8))
        for k in range(steps):
            t = k / steps
            pts.append((ax + (bx - ax) * t + rng.uniform(-wobble, wobble), az + (bz - az) * t + rng.uniform(-wobble, wobble)))
    pts.append(points[-1])
    return LineString(pts).buffer(width / 2, cap_style=1, join_style=1)


def room(cx, cz, width, depth, facing_deg, skew=1.2):
    """A carved room: width along the wall it shares, depth away from it; corners nudged so it's not a perfect box."""
    a = math.radians(facing_deg)
    ux, uz = math.cos(a), math.sin(a)  # depth direction
    vx, vz = -uz, ux  # width direction
    pts = []
    for sw, sd in ((-1, -1), (1, -1), (1, 1), (-1, 1)):
        w, d = sw * width / 2 + rng.uniform(-skew, skew), sd * depth / 2 + (rng.uniform(-skew, skew) if sd > 0 else 0)
        pts.append((cx + vx * w + ux * d, cz + vz * w + uz * d))
    return pts


class Area:
    def __init__(self, name, pts=None, poly=None, kind="room", district=None, walls=True, paved=True):
        self.name, self.kind, self.district = name, kind, district
        self.pts = pts
        self.poly = poly if poly is not None else Polygon(pts)
        self.walls, self.paved = walls, paved
        self.doors = []  # (x, z, width_ft, with_door)
        self.furnish = None


AREAS, LINKS = [], []  # LINKS: tunnels/passages (shapely, feet), with district


def add(area):
    AREAS.append(area)
    return area


def hub_rooms(district, cx, cz, hub_r, specs, gap=1.0):
    """Rooms round a circular hub; each spec = (name, angle°, width, depth, furnish)."""
    out = []
    for name, ang, w, d, fn in specs:
        a = math.radians(ang)
        r = hub_r + gap + d / 2
        rm = add(Area(name, room(cx + math.cos(a) * r, cz + math.sin(a) * r, w, d, ang), district=district))
        rm.furnish = fn
        rm.facing = ang
        dx, dz = cx + math.cos(a) * (hub_r + gap / 2), cz + math.sin(a) * (hub_r + gap / 2)
        rm.doors.append((dx, dz, 5, True))
        rm.hub_door = (dx, dz)
        LINKS.append((box(dx - 2.5, dz - 2.5, dx + 2.5, dz + 2.5), district))
        out.append(rm)
    return out


# ------------------------------------------------------------------------------------------------------------------
# Level 2 plan (feet, centre of the city's shaft at 0,0; x east, z south)
SHAFT_R, RAMP_R, RING_R = 35, 50, 72
add(Area("ปล่องกลางเมือง (Shaft)", circle(0, 0, SHAFT_R), kind="shaft", district="core", walls=False, paved=False))
add(Area("ทางลาดเวียนขึ้นชั้น 1", poly=Polygon(circle(0, 0, RAMP_R)).difference(Polygon(circle(0, 0, SHAFT_R))), kind="ramp", district="core", walls=False))
ring = Polygon(blob(0, 0, RING_R, RING_R, rng, n=48, wobble=0.04)).buffer(0).difference(Polygon(circle(0, 0, RAMP_R)))
add(Area("ถนนวงแหวน (Forge Ring)", poly=ring, kind="street", district="core", walls=False))

# Great Forge: round hall round a lava basin, store rooms round the outside
FORGE_C, FORGE_R = (-150.0, -40.0), 40.0
forge_hall = add(Area("โรงตีเหล็กใหญ่", circle(*FORGE_C, FORGE_R, n=36), district="forge"))
forge_hall.furnish = "forge_hall"
forge_rooms = hub_rooms("forge", *FORGE_C, FORGE_R, [
    ("ห้องหัวหน้าคนงาน (โต๊ะคู่)", -60, 22, 16, "office"),
    ("คลังแร่", -100, 24, 18, "ore"),
    ("คลังถ่าน", -140, 22, 16, "coal"),
    ("ห้องพักช่าง", -22, 20, 16, "rest"),
    ("คลังงานสำเร็จ", 55, 24, 18, "goods"),
    ("ห้องชุบเหล็ก", 100, 22, 16, "quench"),
    ("ห้องเครื่องมือ", 140, 20, 16, "tools"),
])
pass_a = math.radians(17)
pass_door = (FORGE_C[0] + math.cos(pass_a) * FORGE_R, FORGE_C[1] + math.sin(pass_a) * FORGE_R)
forge_hall.doors.append((*pass_door, 12, False))
LINKS.append((tunnel([pass_door, (-90, -20), (-68, -16)], 14, wobble=0.8), "forge"))
lava_door = (FORGE_C[0] - FORGE_R, FORGE_C[1])
forge_hall.doors.append((*lava_door, 6, False))
lava_pool = add(Area("บ่อพักลาวา", poly=cave(-245, -52, 30, 25), kind="cave", district="forge", walls=False, paved=False))
lava_pool.furnish = "lava_pool"
LINKS.append((tunnel([(-216, -48), lava_door], 7, wobble=0.5), "forge"))
LINKS.append((tunnel([(-340, -75), (-300, -66), (-272, -58)], 9), "forge"))  # duct from Blackfell
for rm in forge_rooms:
    forge_hall.doors.append((*rm.hub_door, 5, False))  # the room's own door object covers both walls

# Smiths' Lane: a curving alley north-west of the ring, small shops on both sides
lane_pts = [(-30, -64), (-42, -120), (-24, -175), (20, -212), (60, -225)]
lane = LineString(lane_pts)
LINKS.append((lane.buffer(6, cap_style=1, join_style=1), "lane"))
shop_no = 0
for k in range(12):
    for side in (-1, 1):
        t = 16 + k * 22 + (11 if side > 0 else 0)
        if t > lane.length - 12:
            continue
        p, q = lane.interpolate(t), lane.interpolate(t + 1)
        dx, dz = q.x - p.x, q.y - p.y
        L = math.hypot(dx, dz)
        nx, nz = -dz / L * side, dx / L * side
        depth, width = rng.uniform(16, 22), rng.uniform(15, 19)
        pts = room(p.x + nx * (7 + depth / 2), p.y + nz * (7 + depth / 2), width, depth, math.degrees(math.atan2(nz, nx)))
        if any(Polygon(pts).buffer(1.5).intersects(a.poly) for a in AREAS) or Polygon(pts).intersects(lane.buffer(6.5)):
            continue  # inside of the curve: no room, leave the rock
        shop_no += 1
        rm = add(Area(f"ร้าน {'ด' if shop_no % 2 else 'อ'}{shop_no}", pts, district="lane"))
        rm.furnish = "shop"
        rm.doors.append((p.x + nx * 7, p.y + nz * 7, 4, True))
        LINKS.append((box(p.x + nx * 6.5 - 2, p.y + nz * 6.5 - 2, p.x + nx * 6.5 + 2, p.y + nz * 6.5 + 2), "lane"))

# Workers' quarter: rooms round a small plaza north-east of the ring
PLAZA = (115, -150, 26)
add(Area("ลานย่านคนงาน", circle(*PLAZA, n=28), kind="street", district="quarter", walls=False))
hub_rooms("quarter", *PLAZA, [
    ("โรงอาหาร", -90, 36, 28, "canteen"),
    ("ห้องนอนคนงาน 1", -30, 18, 24, "bunks"),
    ("ห้องนอนคนงาน 2", 20, 18, 24, "bunks"),
    ("ห้องนอนคนงาน 3", 70, 18, 24, "bunks"),
    ("ห้องนอนคนงาน 4", 160, 18, 24, "bunks"),
    ("ห้องน้ำ", -150, 16, 16, "wash"),
    ("ห้องเก็บของ", 125, 16, 16, "store"),
], gap=1.0)
LINKS.append((tunnel([(48, -55), (80, -100), (100, -128)], 12), "quarter"))

# Natural caverns
for name, poly, district, link, width in (
    ("สวนใต้ดินของเอลฟ์", cave(195, 15, 72, 56, n=48), "garden", [(70, 6), (100, 10), (128, 12)], 16),
    ("ฟาร์มเห็ดและแปลงผัก", cave(40, 190, 62, 46, n=44), "farm", [(12, 70), (22, 110), (32, 146)], 12),
    ("อ่างเก็บน้ำ", cave(-145, 150, 42, 34), "cistern", [(-48, 52), (-85, 90), (-112, 124)], 10),
    ("ทางลงเหมืองลึก", cave(185, 175, 32, 26), "mine", [(52, 52), (100, 100), (160, 160)], 10),
):
    add(Area(name, poly=poly, kind="cave", district=district, walls=False, paved=False))
    LINKS.append((tunnel(link, width), district))

LEVEL_BOUNDS = (-345, -285, 285, 245)


# ------------------------------------------------------------------------------------------------------------------
def sketch(path):
    from PIL import Image, ImageDraw, ImageFont
    S = 2.0  # px per foot
    x0, z0, x1, z1 = LEVEL_BOUNDS
    W, H = int((x1 - x0) * S), int((z1 - z0) * S)
    im = Image.new("RGB", (W, H + 60), (70, 66, 62))
    dr = ImageDraw.Draw(im)
    T = lambda x, z: ((x - x0) * S, (z - z0) * S)
    font = ImageFont.truetype("C:/Windows/Fonts/tahoma.ttf", 13)
    big = ImageFont.truetype("C:/Windows/Fonts/tahomabd.ttf", 16)
    open_area = unary_union([a.poly for a in AREAS] + [l for l, _ in LINKS])
    for g in getattr(open_area, "geoms", [open_area]):
        dr.polygon([T(*p) for p in g.exterior.coords], fill=(214, 204, 180))
        for hole in g.interiors:
            dr.polygon([T(*p) for p in hole.coords], fill=(70, 66, 62))
    colors = {"room": (226, 214, 186), "street": (205, 190, 160), "ramp": (190, 178, 150), "cave": (196, 214, 170), "shaft": (25, 25, 30)}
    for a in sorted(AREAS, key=lambda a: -Polygon(a.poly.exterior).area if a.poly.geom_type == "Polygon" else 0):  # big first, so the shaft ends up on top
        for g in getattr(a.poly, "geoms", [a.poly]):
            dr.polygon([T(*p) for p in g.exterior.coords], fill=colors[a.kind], outline=(40, 35, 30) if a.walls else None)
    for x in range(int(x0) // 5 * 5, int(x1), 5):  # 5 ft grid, bold every 50 ft
        dr.line([T(x, z0), T(x, z1)], fill=(150, 140, 120) if x % 50 else (110, 100, 85), width=1)
    for z in range(int(z0) // 5 * 5, int(z1), 5):
        dr.line([T(x0, z), T(x1, z)], fill=(150, 140, 120) if z % 50 else (110, 100, 85), width=1)
    for a in AREAS:
        if a.walls:
            dr.line([T(*p) for p in a.poly.exterior.coords], fill=(30, 25, 20), width=3)
        for d in a.doors:
            dr.ellipse([T(d[0] - 2.2, d[1] - 2.2), T(d[0] + 2.2, d[1] + 2.2)], fill=(150, 80, 30))
    for a in AREAS:
        c = {"ramp": Point(0, -42), "shaft": Point(0, 0)}.get(a.kind, Point(0, 61) if a.name.startswith("ถนนวงแหวน") else a.poly.representative_point())
        x, y = T(c.x, c.y)
        f = big if a.kind in ("cave", "street", "shaft") or a.name == "โรงตีเหล็กใหญ่" else font
        if a.kind == "shaft":
            f = big
        tw = dr.textlength(a.name, font=f)
        dr.rectangle([x - tw / 2 - 3, y - 9, x + tw / 2 + 3, y + 9], fill=(255, 255, 255))
        dr.text((x - tw / 2, y - 8), a.name, fill=(0, 0, 0), font=f)
    dr.text((10, H + 8), "Twinhold — ใต้ดินชั้น 2 (ภาพร่างผัง)  ·  ตารางเล็ก = 5 ฟุต, เส้นเข้ม = 50 ฟุต  ·  จุดส้ม = ประตู  ·  พื้นที่สีเขียว = ถ้ำธรรมชาติ",
            fill=(255, 255, 255), font=big)
    dr.text((10, H + 32), f"ขนาดทั้งชั้น ~{x1 - x0}×{z1 - z0} ฟุต · ในแอป 5 ฟุต = {5 * FT:.2f} หน่วย", fill=(230, 230, 230), font=font)
    im.save(path)
    print("wrote", path)


# ------------------------------------------------------------------------------------------------------------------
def build(district_names, bounds, out):
    m = Map(f"{SAVE}/test01.mommap")
    m.d["environment"].update({"light_color": "b3a38cff", "light_energy": 0.75, "ambient_color": "3b3936ff", "ambient_brightness": 1.0,
                               "black_level": 0.0, "glow_light_alpha": 0.8, "glow_light_color": "ffa031ff", "cloud_threshold": 0.0,
                               "shadow_opactiy": 0.75})
    layers = {}
    for level, visible in (("Surface", False), ("Level 1", False), ("Level 2", True)):
        for part in ("Floor", "Walls", "Deco"):
            layers[level, part] = m.add_layer(f"{level} {part}", visible)
    FLOOR, WALLS, DECO = (layers["Level 2", p] for p in ("Floor", "Walls", "Deco"))
    f = lambda pts: [(x * FT, z * FT) for x, z in pts]

    def put(prefix, x, z, rot=None, scale=None, y=0.0, jitter=0.0):
        return m.obj(rng.choice(variants(prefix)), (x + rng.uniform(-jitter, jitter)) * FT, (z + rng.uniform(-jitter, jitter)) * FT,
                     rot=rng.uniform(0, 360) if rot is None else rot + rng.uniform(-4, 4),
                     scale=rng.uniform(0.9, 1.1) if scale is None else scale, y=y, layer=DECO)

    def smoke(x, z, y=1.0):
        m.obj("woDecos/wo_smoke_a.tscn", x * FT, z * FT, y=y, layer=DECO)

    areas = [a for a in AREAS if a.district in district_names]
    links = [l for l, d in LINKS if d in district_names]
    clip = box(*bounds)
    open_area = unary_union([a.poly for a in areas] + links).intersection(clip)
    rock_open = affinity.scale(open_area, FT, FT, origin=(0, 0))
    bx0, bz0, bx1, bz1 = bounds
    n_rock = carve_rock(m, rock_open, (bx0 * FT, bz0 * FT, bx1 * FT, bz1 * FT), rng, layer=WALLS, cell=0.9, base=1.4,
                        tops=0.4, inset=0.18, top_max=0.45)

    for a in areas:
        if a.paved:
            for g in getattr(a.poly, "geoms", [a.poly]):
                floor(m, f(list(g.exterior.coords)), layer=FLOOR)
        if a.walls:
            poly_walls(m, f(list(a.poly.exterior.coords)), doors=[(x * FT, z * FT, w * FT, obj) for x, z, w, obj in a.doors],
                       layer=WALLS, door_layer=DECO, rng=rng)
    for l in links:  # paved passages between carved rooms
        for g in getattr(l.intersection(clip), "geoms", [l.intersection(clip)]):
            if g.geom_type == "Polygon" and g.area > 30:
                floor(m, f(list(g.exterior.coords)), layer=FLOOR)

    # --- furnishing -------------------------------------------------------------------------------------------
    def along_wall(a, spacing, inset, prefix, skip_near=(), scale=None):
        ring = a.poly.exterior
        n = int(ring.length / spacing)
        c = a.poly.centroid
        for k in range(n):
            p = ring.interpolate(k * spacing + spacing / 2)
            if any(math.hypot(p.x - dx, p.y - dz) < 5 for dx, dz, *_ in a.doors) or any(math.hypot(p.x - sx, p.y - sz) < r for sx, sz, r in skip_near):
                continue
            vx, vz = c.x - p.x, c.y - p.y
            L = math.hypot(vx, vz)
            put(prefix, p.x + vx / L * inset, p.y + vz / L * inset, rot=math.degrees(math.atan2(-vz, vx)) - 90, scale=scale)

    def local(a, u_, v_):
        """Point in a room's own frame: u_ across (−1..1 of width), v_ depth (0 = door wall, 1 = back wall)."""
        pts = a.pts
        door_mid = ((pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2)
        back_mid = ((pts[2][0] + pts[3][0]) / 2, (pts[2][1] + pts[3][1]) / 2)
        half = ((pts[1][0] - pts[0][0]) / 2, (pts[1][1] - pts[0][1]) / 2)
        x = door_mid[0] + (back_mid[0] - door_mid[0]) * v_ + half[0] * u_ * 0.85
        z = door_mid[1] + (back_mid[1] - door_mid[1]) * v_ + half[1] * u_ * 0.85
        return x, z

    def facing_rot(a, inward=True):
        ang = a.facing if hasattr(a, "facing") else 0
        return -(ang + (0 if inward else 180)) + 90

    for a in areas:
        kind = a.furnish
        if kind == "forge_hall":
            cx, cz = FORGE_C
            for _ in range(70):  # lava basin
                r, t = 9 * math.sqrt(rng.random()), rng.uniform(0, 2 * math.pi)
                put("woDecos/wo_campfire_", cx + math.cos(t) * r, cz + math.sin(t) * r, scale=rng.uniform(0.7, 1.0))
            for k in range(26):  # stone kerb round the basin
                t = 2 * math.pi * k / 26
                put("woDecos/wo_stone_", cx + math.cos(t) * 10.5, cz + math.sin(t) * 10.5, scale=0.5)
            x = FORGE_C[0] - FORGE_R
            while x < cx - 10:  # channel from the duct to the basin
                put("woDecos/wo_campfire_", x, cz, scale=0.7, jitter=0.4)
                x += 1.6
            put("woDecos/wo_glow_light_", cx, cz, scale=1.0)
            smoke(cx, cz, 1.4)
            for i, ang in enumerate((-35, -75, -115, -155, 35, 75, 115, 155)):  # 4 dwarf forges north, 4 elf forges south
                t = math.radians(ang)
                ox, oz = math.cos(t), math.sin(t)
                hx, hz = cx + ox * 17, cz + oz * 17
                rot_in = -math.degrees(math.atan2(-oz, -ox)) + 90
                put("woDecos/woDecosRooms/wo_fireplace_", hx, hz, rot=rot_in + 180, scale=1.0)
                smoke(hx, hz, 1.1)
                put("woDecos/woDecosRooms/wo_anvil_", cx + ox * 23, cz + oz * 23, rot=rot_in + 90)
                put("woDecos/woDecosRooms/wo_water_source_", cx + ox * 20 - oz * 5, cz + oz * 20 + ox * 5, rot=rot_in, scale=0.8)
                put("woDecos/woDecosRooms/wo_straw_stuff_", cx + ox * 20 + oz * 5, cz + oz * 20 - ox * 5, scale=0.7)
                put("woDecos/wo_tool_", cx + ox * 26 + oz * 3, cz + oz * 26 - ox * 3, scale=0.8)
                put("woDecos/woDecosRooms/wo_metal_goods_", cx + ox * 26 - oz * 3, cz + oz * 26 + ox * 3)
            for k in range(12):  # pillars
                t = math.radians(15 + 30 * k)
                m.obj("woPathObjects/wo_pillar_a.tscn", (cx + math.cos(t) * 32) * FT, (cz + math.sin(t) * 32) * FT, layer=DECO)
            along_wall(a, 4.5, 2.2, "woDecos/woDecosRooms/wo_metal_goods_", skip_near=[(*lava_door, 7), (*pass_door, 9)])
            for t in (60, 150, 240, 330):
                put("woDecos/wo_glow_light_", cx + math.cos(math.radians(t)) * 28, cz + math.sin(math.radians(t)) * 28, scale=1.0)
        elif kind == "lava_pool":
            c = a.poly.centroid
            inner = a.poly.buffer(-7)
            for _ in range(220):
                x, z = rng.uniform(*inner.bounds[0::2]), rng.uniform(*inner.bounds[1::2])
                if inner.contains(Point(x, z)):
                    put("woDecos/wo_campfire_", x, z, scale=rng.uniform(0.7, 1.0))
            for k in range(4):
                put("woDecos/wo_glow_light_", c.x + rng.uniform(-12, 12), c.y + rng.uniform(-9, 9), scale=1.0)
                smoke(c.x + rng.uniform(-12, 12), c.y + rng.uniform(-9, 9), 1.5)
            x = -340
            while x < -272:  # duct from Blackfell
                put("woDecos/wo_campfire_", x, -75 + (x + 340) / 68 * 17, scale=0.7, jitter=0.6)
                x += 1.8
            x = -216
            while x < FORGE_C[0] - FORGE_R:
                put("woDecos/wo_campfire_", x, -48 + (x + 216) / 26 * 8, scale=0.7, jitter=0.4)
                x += 1.6
        elif kind == "office":
            for u_ in (-0.45, 0.45):  # two desks of equal size: one dwarf, one elf
                x, z = local(a, u_, 0.55)
                put("woDecos/woDecosRooms/wo_table2_", x, z, rot=facing_rot(a), scale=1.0)
                x, z = local(a, u_, 0.75)
                put("woDecos/woDecosRooms/wo_chair_", x, z, rot=facing_rot(a) + 180)
                x, z = local(a, u_ * 1.1, 0.95)
                put("woDecos/woDecosRooms/wo_cabinet_", x, z, rot=facing_rot(a) + 180)
            x, z = local(a, 0, 0.35)
            put("woDecos/woDecosRooms/wo_carpet_", x, z, rot=facing_rot(a), scale=1.0)
        elif kind == "ore":
            for i in range(12):
                x, z = local(a, -0.8 + (i % 4) * 0.53, 0.35 + (i // 4) * 0.25)
                put("woDecos/wo_crate_" if i % 3 else "woDecos/wo_stone_fragments_", x, z)
            x, z = local(a, 0.6, 0.15)
            put("woUnits/wo_hand_cart_", x, z, rot=facing_rot(a))
        elif kind == "coal":
            for i in range(10):
                x, z = local(a, rng.uniform(-0.9, 0.9), rng.uniform(0.3, 0.95))
                put(rng.choice(["woDecos/woDecosRooms/wo_straw_stuff_", "woDecos/wo_goods_", "woDecos/wo_wood_pile_"]), x, z)
        elif kind == "rest":
            for u_ in (-0.8, 0.8):
                for v_ in (0.45, 0.85):
                    x, z = local(a, u_, v_)
                    put("woDecos/woDecosRooms/wo_bed_", x, z, rot=facing_rot(a) + 90, scale=1.0)
            x, z = local(a, 0, 0.6)
            put("woDecos/woDecosRooms/wo_table2_", x, z, rot=facing_rot(a), scale=1.0)
            for u_ in (-0.25, 0.25):
                x, z = local(a, u_, 0.6)
                put("woDecos/woDecosRooms/wo_chair_", x, z)
        elif kind == "goods":
            along_wall(a, 3.5, 1.6, "woDecos/woDecosRooms/wo_metal_goods_")
            for u_ in (-0.4, 0.4):
                x, z = local(a, u_, 0.55)
                put("woDecos/woDecosRooms/wo_cabinet_", x, z, rot=facing_rot(a))
        elif kind == "quench":
            for i in range(6):
                x, z = local(a, -0.75 + (i % 3) * 0.75, 0.45 + (i // 3) * 0.4)
                put("woDecos/woDecosRooms/wo_water_source_", x, z, rot=facing_rot(a))
            x, z = local(a, 0.85, 0.2)
            put("woDecos/woDecosRooms/wo_device_", x, z)
        elif kind == "tools":
            for u_ in (-0.5, 0.5):
                x, z = local(a, u_, 0.6)
                put("woDecos/woDecosRooms/wo_table3_", x, z, rot=facing_rot(a), scale=1.0)
                put("woDecos/wo_tool_", x, z, scale=0.8)
            along_wall(a, 4.0, 1.5, "woDecos/woDecosRooms/wo_cabinet_")
            x, z = local(a, 0, 0.9)
            put("woDecos/woDecosRooms/wo_device_", x, z)

    # rubble on the floor of every natural cave and tunnel
    for a in areas:
        if a.kind == "cave":
            ring = a.poly.exterior
            for k in range(int(ring.length / 3)):
                p = ring.interpolate(k * 3 + rng.uniform(0, 2))
                put("woDecos/wo_stone_" if rng.random() < 0.5 else "woDecos/wo_stone_fragments_", p.x, p.y, scale=rng.uniform(0.4, 0.9))

    cx, cz = (bounds[0] + bounds[2]) / 2, (bounds[1] + bounds[3]) / 2
    m.d["info"].update({"camera_pos_x": cx * FT, "camera_pos_z": cz * FT, "camera_zoom": 18.0})
    m.save(out)
    print("wrote", out, "-", len(m.d["objects"]), "objects,", len(m.d["paths"]), "paths (", n_rock, "rock )")


if __name__ == "__main__":
    what = sys.argv[1] if len(sys.argv) > 1 else "sketch"
    if what == "sketch":
        sketch(os.path.join(SCRATCH, "twinhold-level2-sketch.png"))
    elif what == "forge":
        build({"forge"}, (-345, -125, -60, 45), f"{SAVE}/twinhold-forge-test.mommap")
