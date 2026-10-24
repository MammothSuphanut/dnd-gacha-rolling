"""Twinhold city map (Canvas of Kings, city scale like the user's test_city) — three round cavern levels stacked under the
mountain, joined by a central shaft with lifts and a spiral stair. One layer set per level; only one level shown at a time.

    python world-settings/novaris/maps/canvas-of-kings/twinhold_city.py sketch    # 3-panel plan, for approval first

Lore: world-settings/novaris/aldenreich/gramark/twinhold-diarchy.md ("ผังแต่ละชั้น").
Plan in feet, centre of the shaft at (0, 0), x east, z south (north = up on the sketch).
"""
import math
import os
import random

from shapely.geometry import LineString, Point, Polygon
from shapely.ops import unary_union

HERE = os.path.dirname(os.path.abspath(__file__))
rng = random.Random(935)

CAVE_R = 760  # each level's cavern radius
SHAFT_R = 55  # lift shaft
STAIR_R = 85  # spiral stair round the shaft
PLAZA_R = 150  # plaza round the shaft on every level
RINGS = (330, 540)  # ring roads
RADIALS = 8  # main streets out from the plaza


def blob(cx, cz, rx, rz, n=48, wobble=0.06):
    pts = []
    for k in range(n):
        a = 2 * math.pi * k / n
        f = 1 + rng.uniform(-wobble, wobble)
        pts.append((cx + math.cos(a) * rx * f, cz + math.sin(a) * rz * f))
    return Polygon(pts).buffer(0)


def sector(r0, r1, a0, a1, steps=24):
    """Ring sector between radii r0..r1 and compass angles a0..a1 (degrees, 0 = east, 90 = south)."""
    outer = [(math.cos(math.radians(a0 + (a1 - a0) * k / steps)) * r1, math.sin(math.radians(a0 + (a1 - a0) * k / steps)) * r1) for k in range(steps + 1)]
    inner = [(math.cos(math.radians(a1 - (a1 - a0) * k / steps)) * r0, math.sin(math.radians(a1 - (a1 - a0) * k / steps)) * r0) for k in range(steps + 1)]
    return Polygon(outer + inner)


def at(r, a):
    return math.cos(math.radians(a)) * r, math.sin(math.radians(a)) * r


# Compass in the sketch: north = up = angle -90, east = 0, south = 90, west = 180
N, NE, E, SE, S, SW, W, NW = -90, -45, 0, 45, 90, 135, 180, -135

LEVELS = [
    {
        "name": "ชั้น 1 (บนสุด) — ประตูและการค้า",
        "districts": [  # (name, r0, r1, a0, a1, colour, houses)
            ("ลานคาราวาน + คอกสัตว์", 360, 700, 60, 120, (205, 185, 140), False),
            ("ย่านด่าน", 360, 700, 20, 60, (200, 170, 170), True),
            ("โกดังสินค้า", 360, 700, 120, 175, (190, 180, 160), True),
            ("ตลาดหลัก + ร้านค้า", 160, 320, -180, 180, (225, 200, 150), True),
            ("โรงเตี๊ยมและที่พักคนต่างเมือง", 360, 700, 175, 235, (215, 190, 170), True),
            ("ค่ายทหารรักษาประตู", 360, 700, -10, 20, (180, 170, 170), True),
            ("ร้านของเก่าและนายหน้า", 360, 700, -60, -10, (210, 195, 175), True),
            ("ย่านพ่อค้า (บ้าน)", 360, 700, 235, 300, (215, 205, 185), True),
        ],
        "landmarks": [
            ("ห้องเก็บของเก่า Aeor", 470, 40, 90, 60),
            ("ด่านศุลกากร", 610, 75, 70, 40),
            ("หอประตูชั้นใน", 700, 90, 60, 50),
        ],
        "extra_tunnels": [("อุโมงค์ขึ้นประตูภูเขา (ผิวดิน)", [(at(700, 90)), at(900, 90)], 60)],
        "notes": "ทางเข้าเมืองจากประตูภูเขาอยู่ทิศใต้ · ของจาก Palebank ผ่านด่านก่อนเข้าตลาด",
    },
    {
        "name": "ชั้น 2 (กลาง) — ปกครองและที่อยู่อาศัย",
        "districts": [
            ("ลานพิธี", 160, 320, -150, -30, (230, 220, 190), False),
            ("ย่านดวาร์ฟ (บ้านเจาะผนัง)", 160, 700, 100, 260, (200, 175, 150), True),
            ("ย่านเอลฟ์ (บ้านแสงเวท ไม้เลื้อย)", 160, 700, -80, 80, (185, 205, 170), True),
            ("วิหารคู่", 360, 520, -100, -80, (220, 210, 230), False),
            ("สภาช่างและหอสมุด", 360, 700, 80, 100, (210, 200, 220), True),
            ("ย่านผสม (ดวาร์ฟ+เอลฟ์+มนุษย์)", 540, 700, -150, -100, (210, 200, 185), True),
        ],
        "landmarks": [
            ("ห้องโถงคู่ (บัลลังก์คู่)", 235, -90, 120, 90),
            ("วิหารดวาร์ฟ", 440, -100, 60, 50),
            ("วิหารเอลฟ์", 440, -80, 60, 50),
            ("จวนผู้ปกครองดวาร์ฟ", 400, 200, 80, 60),
            ("จวนผู้ปกครองเอลฟ์", 400, -20, 80, 60),
        ],
        "extra_tunnels": [],
        "notes": "ทุกอย่างมีคู่: ห้องโถงคู่หันหน้าเข้าลานพิธี · จวนผู้ปกครองอยู่คนละฝั่งระยะเท่ากัน · วิหารคู่ติดกัน",
    },
    {
        "name": "ชั้น 3 (ล่างสุด) — อุตสาหกรรมและเกษตร",
        "districts": [
            ("ย่านโรงตีเหล็ก + ตรอกช่าง", 160, 700, 150, 225, (195, 165, 140), True),
            ("บ้านคนงาน + โรงอาหาร", 360, 700, -135, -60, (205, 195, 180), True),
            ("สวนใต้ดินของเอลฟ์", 360, 720, -40, 40, (170, 205, 150), False),
            ("ฟาร์มเห็ดและแปลงผัก", 360, 720, 60, 120, (185, 200, 140), False),
            ("อ่างเก็บน้ำ", 400, 700, 120, 150, (160, 190, 215), False),
            ("ทางลงเหมืองลึก", 400, 700, 40, 60, (170, 160, 150), False),
            ("โรงงานและโกดังวัตถุดิบ", 160, 320, -180, 180, (205, 190, 170), True),
            ("ห้องพักช่าง", 360, 700, -160, -135, (205, 195, 180), True),
        ],
        "landmarks": [
            ("โรงตีเหล็กใหญ่", 470, 185, 150, 130),
            ("บ่อพักลาวา", 650, 180, 90, 70),
        ],
        "extra_tunnels": [("ท่อลาวาจาก Blackfell", [at(700, 180), at(900, 182)], 30)],
        "notes": "ลาวาเข้าจากตะวันตก → บ่อพัก → โรงตีเหล็กใหญ่ · ปล่องกลางลงไปเหมืองที่ลึกกว่านี้ไม่ได้ (ทางลงเหมืองแยกต่างหาก)",
    },
]


def level_shapes(lv):
    cave = blob(0, 0, CAVE_R, CAVE_R * 0.95)
    roads = [Polygon([at(PLAZA_R, a) for a in range(0, 360, 6)]).buffer(0).exterior.buffer(14)]
    for r in RINGS:
        roads.append(Polygon([at(r + rng.uniform(-6, 6), a) for a in range(0, 360, 4)]).exterior.buffer(13))
    for k in range(RADIALS):
        a = -90 + 360 / RADIALS * k + 22.5
        roads.append(LineString([at(PLAZA_R, a), at(CAVE_R - 40, a)]).buffer(12))
    return cave, unary_union(roads).intersection(cave)


def houses_in(area, roads, rng_):
    """Rows of small houses facing the streets, like the user's test_city (houses ≈ 25-40 ft)."""
    out = []
    usable = area.difference(roads.buffer(4))
    for r in range(170, 760, 34):
        ring = Polygon([at(r, a) for a in range(0, 360, 2)]).exterior
        for k in range(int(ring.length / 34)):
            p = ring.interpolate(k * 34 + rng_.uniform(-4, 4))
            a = math.degrees(math.atan2(p.y, p.x))
            w, d = rng_.uniform(22, 34), rng_.uniform(18, 28)
            ta, ra = math.radians(a + 90), math.radians(a)
            pts = [(p.x + math.cos(ta) * sw * w / 2 + math.cos(ra) * sd * d / 2, p.y + math.sin(ta) * sw * w / 2 + math.sin(ra) * sd * d / 2)
                   for sw, sd in ((-1, -1), (1, -1), (1, 1), (-1, 1))]
            h = Polygon(pts)
            if usable.contains(h) and rng_.random() < 0.82:
                out.append(h)
    return out


def sketch(path):
    from PIL import Image, ImageDraw, ImageFont

    S = 0.42
    P = int(2 * (CAVE_R + 220) * S)
    im = Image.new("RGB", (P * 3, P + 120), (52, 50, 48))
    font = ImageFont.truetype("C:/Windows/Fonts/tahoma.ttf", 12)
    bold = ImageFont.truetype("C:/Windows/Fonts/tahomabd.ttf", 15)
    title = ImageFont.truetype("C:/Windows/Fonts/tahomabd.ttf", 18)
    dr = ImageDraw.Draw(im)
    for i, lv in enumerate(LEVELS):
        ox, oz = i * P + P / 2, P / 2 + 30
        T = lambda x, z: (ox + x * S, oz + z * S)
        poly = lambda g, **kw: dr.polygon([T(*p) for p in g.exterior.coords], **kw)
        cave, roads = level_shapes(lv)
        for name, pts, w in lv["extra_tunnels"]:
            poly(LineString(pts).buffer(w / 2), fill=(120, 105, 90))
        poly(cave, fill=(120, 112, 100), outline=(20, 20, 20))
        district_areas = []
        for name, r0, r1, a0, a1, col, has_houses in lv["districts"]:
            area = sector(r0, r1, a0, a1).intersection(cave)
            for g in getattr(area, "geoms", [area]):
                poly(g, fill=col)
            district_areas.append((name, area, has_houses))
        dr.ellipse([T(-PLAZA_R, -PLAZA_R), T(PLAZA_R, PLAZA_R)], fill=(225, 215, 190))  # plaza round the shaft
        for r in RINGS:
            dr.ellipse([T(-r, -r), T(r, r)], outline=(235, 228, 205), width=int(26 * S))
        for k in range(RADIALS):
            a = -90 + 360 / RADIALS * k + 22.5
            dr.line([T(*at(PLAZA_R, a)), T(*at(CAVE_R - 40, a))], fill=(235, 228, 205), width=int(24 * S))
        for name, area, has_houses in district_areas:
            if has_houses:
                for h in houses_in(area, roads, rng):
                    poly(h, fill=(150, 95, 70), outline=(70, 40, 30))
        for name, r, a, w, d in lv["landmarks"]:
            x, z = at(r, a)
            ra = math.radians(a)
            pts = [(x + math.cos(ra + math.pi / 2) * sw * w / 2 + math.cos(ra) * sd * d / 2, z + math.sin(ra + math.pi / 2) * sw * w / 2 + math.sin(ra) * sd * d / 2)
                   for sw, sd in ((-1, -1), (1, -1), (1, 1), (-1, 1))]
            dr.polygon([T(*p) for p in pts], fill=(90, 60, 110), outline=(255, 255, 255))
        # central shaft: lifts + spiral stair
        dr.ellipse([T(-STAIR_R, -STAIR_R), T(STAIR_R, STAIR_R)], fill=(170, 160, 140), outline=(20, 20, 20), width=2)
        dr.ellipse([T(-SHAFT_R, -SHAFT_R), T(SHAFT_R, SHAFT_R)], fill=(15, 15, 18))
        for sx in (-22, 22):
            dr.rectangle([T(sx - 12, -12), T(sx + 12, 12)], fill=(200, 160, 60))
        # labels
        for name, area, _ in district_areas:
            c = area.representative_point()
            x, y = T(c.x, c.y)
            tw = dr.textlength(name, font=font)
            dr.rectangle([x - tw / 2 - 3, y - 8, x + tw / 2 + 3, y + 8], fill=(255, 255, 255))
            dr.text((x - tw / 2, y - 8), name, fill=(0, 0, 0), font=font)
        for name, r, a, w, d in lv["landmarks"]:
            x, y = T(*at(r, a))
            tw = dr.textlength(name, font=bold)
            dr.rectangle([x - tw / 2 - 3, y - 10, x + tw / 2 + 3, y + 10], fill=(255, 235, 150))
            dr.text((x - tw / 2, y - 9), name, fill=(0, 0, 0), font=bold)
        for name, pts, w in lv["extra_tunnels"]:
            x, y = T(*pts[-1])
            tw = dr.textlength(name, font=font)
            dr.text((min(max(x - tw / 2, i * P + 4), (i + 1) * P - tw - 4), y - 22), name, fill=(255, 220, 160), font=font)
        x, y = T(0, 0)
        dr.text((x - 52, y + STAIR_R * S + 4), "ปล่องกลาง: ลิฟต์คู่ + บันไดเวียน", fill=(255, 230, 120), font=font)
        dr.text((i * P + 12, 6), lv["name"], fill=(255, 255, 255), font=title)
        dr.text((i * P + 12, P + 40), lv["notes"], fill=(220, 220, 220), font=font)
        for k in range(0, 501, 100):  # scale bar 500 ft
            pass
        x0, y0 = i * P + 12, P + 70
        dr.line([(x0, y0), (x0 + 500 * S, y0)], fill=(255, 255, 255), width=3)
        dr.text((x0, y0 + 6), "500 ฟุต", fill=(255, 255, 255), font=font)
    dr.text((12, P + 95), "ภาพร่าง — แต่ละชั้นเป็นโพรงวงกลม ~1,500 ฟุต ซ้อนกันใต้ภูเขา · กล่องสีน้ำตาลเล็ก = บ้าน (คร่าว ๆ) · กล่องม่วง = อาคารสำคัญ · ทิศเหนืออยู่บน",
            fill=(200, 200, 200), font=font)
    im.save(path)
    print("wrote", path)


# ------------------------------------------------------------------------------------------------------------------
# Building a level into Canvas of Kings
SAVE = "D:/Steam/steamapps/common/Canvas of Kings/Save"
FT = 0.075  # map units per foot — test_city's houses (ridge ~2.3 units) are ~30 ft long


def build_level(n):
    import sys

    sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(HERE)))), "adventure-builder", "canvas-of-kings"))
    from shapely import affinity

    from cok import Map, carve_rock, floor, poly_walls, road, roof, variants

    rb = random.Random(935 + n)
    lv = LEVELS[n - 1]
    m = Map(f"{SAVE}/test01.mommap")
    m.d["environment"].update({"light_color": "b8a890ff", "light_energy": 0.8, "ambient_color": "3d3b38ff", "ambient_brightness": 1.0,
                               "black_level": 0.0, "glow_light_alpha": 0.8, "glow_light_color": "ffa031ff", "cloud_threshold": 0.0,
                               "shadow_opactiy": 0.75, "snow_strength": 0.0})
    layers = {}
    for k, level in enumerate(LEVELS, start=1):
        for part in ("Ground", "Buildings", "Deco"):
            layers[k, part] = m.add_layer(f"Level {k} {part}", k == n)
    GROUND, BUILD, DECO = (layers[n, p] for p in ("Ground", "Buildings", "Deco"))
    u = lambda x, z: (x * FT, z * FT)

    def put(prefix, x, z, rot=None, scale=None, layer=DECO):
        return m.obj(rb.choice(variants(prefix)), x * FT, z * FT, rot=rb.uniform(0, 360) if rot is None else rot + rb.uniform(-5, 5),
                     scale=rb.uniform(0.9, 1.1) if scale is None else scale, layer=layer)

    def house(poly, kind="tiles"):
        p = list(poly.exterior.coords)[:4]
        a = ((p[0][0] + p[3][0]) / 2, (p[0][1] + p[3][1]) / 2)
        b = ((p[1][0] + p[2][0]) / 2, (p[1][1] + p[2][1]) / 2)
        half = math.hypot(p[3][0] - p[0][0], p[3][1] - p[0][1]) / 2
        roof(m, u(*a), u(*b), half * FT, kind=kind, variant=rb.randint(0, 1), layer=BUILD)

    def big_building(x, z, w, d, ang, kind="tiles"):
        ra = math.radians(ang)
        tx, tz = math.cos(ra + math.pi / 2), math.sin(ra + math.pi / 2)
        roof(m, u(x - tx * w / 2, z - tz * w / 2), u(x + tx * w / 2, z + tz * w / 2), d / 2 * FT, kind=kind, variant=rb.randint(0, 1), layer=BUILD)

    # --- the cavern and its rock -------------------------------------------------------------------------------
    cave, roads = level_shapes(lv)
    open_ft = unary_union([cave] + [LineString(pts).buffer(w / 2) for _, pts, w in lv["extra_tunnels"]])
    R = CAVE_R + 160
    n_rock = carve_rock(m, affinity.scale(open_ft, FT, FT, origin=(0, 0)), (-R * FT, -R * FT, R * FT, R * FT), rb, layer=GROUND,
                        cell=6.0, base=3.0, tops=0.45, inset=1.2, top_max=3.0)
    for name, pts, w in lv["extra_tunnels"]:  # mark where the tunnel leaves the map
        for k in range(6):
            x, z = pts[0][0] + (pts[1][0] - pts[0][0]) * k / 6, pts[0][1] + (pts[1][1] - pts[0][1]) * k / 6
            put("woDecos/wo_glow_light_", x, z, scale=1.2)

    # --- plaza round the shaft (paved, in 8 pieces since plateaus can't have holes), shaft, lifts ----------------
    for k in range(8):
        g = sector(STAIR_R, PLAZA_R, k * 45, (k + 1) * 45, steps=8)
        floor(m, [u(x, z) for x, z in g.exterior.coords], layer=GROUND)
    poly_walls(m, [u(*at(SHAFT_R, a)) for a in range(0, 360, 15)], layer=BUILD)  # railing round the open shaft
    for sx in (-22, 22):  # the twin lifts
        put("woDecos/wo_crane_", sx, 0, rot=90 if sx < 0 else -90, scale=1.6)
    for a in range(0, 360, 30):
        put("woDecos/wo_glow_light_", *at(STAIR_R - 10, a), scale=1.0)

    # --- streets -------------------------------------------------------------------------------------------------
    for r in (PLAZA_R,) + RINGS:
        pts = [u(*at(r, a)) for a in range(0, 361, 5)]
        road(m, pts, 26 * FT, layer=GROUND)
    for k in range(RADIALS):
        a = -90 + 360 / RADIALS * k + 22.5
        road(m, [u(*at(PLAZA_R, a)), u(*at(CAVE_R - 40, a))], 24 * FT, layer=GROUND)
        for r in range(PLAZA_R + 40, CAVE_R - 60, 70):  # street lamps
            x, z = at(r, a + 2.5)
            put("woDecos/wo_glow_light_", x, z, scale=1.0)
    for r in RINGS:
        for a in range(0, 360, 12):
            put("woDecos/wo_glow_light_", *at(r + 18, a), scale=1.0)

    # --- districts -----------------------------------------------------------------------------------------------
    for name, r0, r1, a0, a1, col, has_houses in lv["districts"]:
        area = sector(r0, r1, a0, a1).intersection(cave)
        if has_houses:
            kind = "wooden" if ("โกดัง" in name or "ค่าย" in name) else "tiles"
            for h in houses_in(area, roads, rb):
                house(h, kind)
                if rb.random() < 0.25:  # goods out front
                    c = h.centroid
                    put(rb.choice(["woDecos/wo_crate_", "woDecos/wo_goods_", "woDecos/woDecosRooms/wo_straw_stuff_"]),
                        c.x + rb.uniform(-12, 12), c.y + rb.uniform(-12, 12))
        if "คาราวาน" in name:  # caravan yard: open ground with wagons, beasts, tents, troughs; stables on the edge
            pts = []
            for _ in range(4000):
                if len(pts) >= 70:
                    break
                x, z = rb.uniform(-400, 400), rb.uniform(300, 760)
                if area.buffer(-15).contains(Point(x, z)) and not roads.buffer(8).contains(Point(x, z)) and all(math.hypot(x - a, z - b) > 22 for a, b in pts):
                    pts.append((x, z))
            for i, (x, z) in enumerate(pts):
                put(["woUnits/wo_ox_cart_", "woUnits/wo_horse_cart_", "woUnits/wo_ox_", "woUnits/wo_horse_", "woBuildings/wo_tent_",
                     "woDecos/woDecosRooms/wo_straw_stuff_", "woDecos/wo_crate_", "woDecos/woDecosRooms/wo_water_source_"][i % 8], x, z)
            for a in range(64, 118, 7):
                big_building(*at(680, a), 60, 26, a, kind="wooden")
        if "ตลาด" in name:  # stalls along the plaza edge and the inner ring
            for a in range(0, 360, 6):
                for r in (PLAZA_R + 26, RINGS[0] - 26):
                    x, z = at(r + rb.uniform(-4, 4), a + rb.uniform(-1.5, 1.5))
                    if not roads.buffer(6).contains(Point(x, z)):
                        put("woBuildings/wo_market_stall_", x, z, rot=-a - 90 if r < 200 else -a + 90, scale=1.0)

    # --- landmarks -------------------------------------------------------------------------------------------------
    for name, r, a, w, d in lv["landmarks"]:
        x, z = at(r, a)
        big_building(x, z, w, d, a)
        if "Aeor" in name:  # the vault sits inside its own walled yard, guards' towers at the corners
            ra = math.radians(a)
            yard = []
            for sw, sd in ((-1, -1), (1, -1), (1, 1), (-1, 1)):
                yard.append(u(x + math.cos(ra + math.pi / 2) * sw * (w / 2 + 25) + math.cos(ra) * sd * (d / 2 + 25),
                              z + math.sin(ra + math.pi / 2) * sw * (w / 2 + 25) + math.sin(ra) * sd * (d / 2 + 25)))
            m.path("Plots/PlotsLands/papl_wall.tscn", yard, closed=True, layer=BUILD, height=None)
            p = m.d["paths"][-1]
            for o in p["points_objects"]:
                o["filename"] = "res://Source/World/WorldObjects/woPathObjects/wo_wall_stone_tower_d.tscn"
                o["object_type"] = 105
        if "หอประตู" in name:  # stone wall across the tunnel, the gate in the middle
            for x0, x1 in ((-34, -10), (10, 34)):
                m.path("Paths/pa_stone_wall_3.tscn", [u(x0, 790), u(x1, 790)], line_fn="woPathObjects/wo_wall_stone_a.tscn", layer=BUILD)
                for o in m.d["paths"][-1]["points_objects"]:
                    o["filename"] = "res://Source/World/WorldObjects/woPathObjects/wo_wall_stone_tower_c.tscn"
                    o["object_type"] = 32
            m.obj("woPathObjects/wo_wall_stone_tower_c_gate_b.tscn", 0.0, 790 * FT, rot=0, layer=BUILD)
        if "ศุลกากร" in name:
            for k in range(14):
                put(rb.choice(["woDecos/wo_crate_", "woDecos/woDecosRooms/wo_crate_single_", "woDecos/wo_goods_"]), x + rb.uniform(-50, 50), z + rb.uniform(-40, 40))
            for k in range(4):
                put("woDecos/woDecosRooms/wo_table3_", x - 30 + k * 20, z - 35, rot=-a)

    # rubble where the floor meets the cavern wall
    edge = cave.exterior
    for k in range(int(edge.length / 14)):
        p = edge.interpolate(k * 14 + rb.uniform(0, 8))
        put("woDecos/wo_stone_" if rb.random() < 0.6 else "woDecos/wo_stone_fragments_", p.x, p.y, scale=rb.uniform(1.0, 2.2))

    m.d["info"].update({"camera_pos_x": 0.0, "camera_pos_z": 0.0, "camera_zoom": 90.0})
    out = f"{SAVE}/twinhold.mommap"
    m.save(out)
    print("wrote", out, "-", len(m.d["objects"]), "objects,", len(m.d["paths"]), "paths (", n_rock, "rock,",
          sum("par_roof" in p["filename"] for p in m.d["paths"]), "houses )")


if __name__ == "__main__":
    import sys

    what = sys.argv[1] if len(sys.argv) > 1 else "sketch"
    if what == "sketch":
        sketch(os.path.join(HERE, "twinhold-city-sketch.png"))
    else:
        build_level(int(what))
