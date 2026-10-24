"""Fill what the user left open on Twinhold level 1 with EMPTY Plot-tool plots — on top of their own saved file.

    timeout 300 python world-settings/novaris/maps/canvas-of-kings/twinhold_level1_fill.py          # → Save/twinhold-level1-plots.mommap
    timeout 300 python world-settings/novaris/maps/canvas-of-kings/twinhold_level1_fill.py preview  # + level1-plots-fill.png

Reads Save/twinhold-level1-filled.mommap (the user's latest save: their populated districts, plus things an older
version of this script placed by hand). Keeps everything of the user's, drops the hand-placed things (stalls, carts,
tents, people, roofs, pens, the walled vault yard), and lays plots on the open ground instead (user's rule
2026-10-24: every area is a plot, the user presses Populate Plot):

    market round the shaft → Market, in stretches with gaps at the streets and the lifts
    caravan yard           → Campsite in the middle, Cottages + Field at the sides as stables and paddock
    south warehouses       → District of Craftsmen     customs house → District of Merchants
    Aeor vault             → Castle surface (a solid raised stone block with towers — reads as the sealed vault)

The approach to the inner gate stays open ground. Rubble at the cavern wall stays (it's part of the rock).
Rules: adventure-builder/canvas-of-kings/CITY-COMPOSITION.md. Feet throughout (FT → map units).
"""
import json
import math
import os
import shutil
import sys

from shapely.geometry import LineString, Point, Polygon, box
from shapely.ops import unary_union

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(HERE))))
sys.path.insert(0, os.path.join(ROOT, "adventure-builder", "canvas-of-kings"))
from cok import Map, district_plot, preset, road  # noqa: E402

SAVE = "D:/Steam/steamapps/common/Canvas of Kings/Save"
SRC, OUT = f"{SAVE}/twinhold-level1-filled.mommap", f"{SAVE}/twinhold-level1-plots.mommap"
FRAME = f"{SAVE}/twinhold-level1.mommap"  # the user's save from before the hand-placed fill: what's theirs + the frame
FT = 0.075
SHAFT_R, PLAZA_R = 55, 150
U = lambda x, z: (x * FT, z * FT)
F = lambda v: v / FT

os.makedirs(f"{SAVE}/backup", exist_ok=True)
if not os.path.exists(f"{SAVE}/backup/twinhold-level1-filled.mommap"):
    shutil.copy2(SRC, f"{SAVE}/backup/twinhold-level1-filled.mommap")
src_bytes = open(SRC, "rb").read()

m = Map.__new__(Map)
m.d = json.loads(src_bytes.decode("utf-8"))
m.uid = m.d["info"].get("last_uid", 0) + 10
BUILD = {l["name"]: l["idx"] for l in m.d["layers"]["map_layers"]}["Level 1 Buildings"]

# Plot templates exactly as the app saved them
_cache = {}


def template(fn, src):
    if src not in _cache:
        _cache[src] = json.load(open(f"{SAVE}/{src}.mommap", encoding="utf-8"))["paths"]
    return next(p for p in _cache[src] if p["filename"].endswith("/" + fn))


PLOTS = {"merchants": template("papd_merchants.tscn", "test_districts"), "craftsmen": template("papd_craftmen.tscn", "test_districts"),
         "cottages": template("pap_cottages.tscn", "test_districts"), "market": template("pap_market.tscn", "test_city"),
         "campsite": template("pap_tent_camp.tscn", "test_city"), "field": template("pap_field.tscn", "test_city"),
         "castle": template("papl_wall.tscn", "test_city")}

# ------------------------------------------------------------------------------------------------------------------
# Drop what the old fill placed by hand: every object that isn't in the frame (keep the rubble at the wall), and its
# roofs / pen / vault wall (the frame had no such paths)
frame = json.load(open(FRAME, encoding="utf-8"))
frame_objs = [(o["filename"], o["position_x"], o["position_z"]) for o in frame["objects"]]
is_frame = lambda o: any(fn == o["filename"] and abs(x - o["position_x"]) < 0.3 and abs(z - o["position_z"]) < 0.3 for fn, x, z in frame_objs)
is_rubble = lambda o: "/wo_stone_" in o["filename"] or "/wo_stone_fragments_" in o["filename"]
HAND_PATHS = ("par_roof_", "pa_fence_1.tscn", "papl_wall.tscn")
before = len(m.d["objects"]), len(m.d["paths"])
m.d["objects"] = [o for o in m.d["objects"] if is_frame(o) or is_rubble(o)]
m.d["paths"] = [p for p in m.d["paths"] if not any(k in p["filename"] for k in HAND_PATHS)]
dropped = before[0] - len(m.d["objects"]), before[1] - len(m.d["paths"])

# The gate road: the tunnel road used to stop at the cavern edge, short of the outer ring (user: "the road breaks off")
GROUND = {l["name"]: l["idx"] for l in m.d["layers"]["map_layers"]}["Level 1 Ground"]
road(m, [U(x, z) for x, z in ((0, 538), (4, 570), (6, 610), (3, 655), (0, 700))], 24 * FT, layer=GROUND, style=18)


# ------------------------------------------------------------------------------------------------------------------
# Free ground (feet): cavern minus rock, the user's plots (and their own streets, some of which poke out), streets
segments = []  # (a, b, width) of every street, for the preview


def road_area(p):
    pts = [(F(q["x"]), F(q["z"])) for q in p["main_points"]]
    ws = p.get("lines_custom_scales") or [p.get("width", 1)]
    segs = [(a, b, F(w)) for (a, b), w in zip(zip(pts, pts[1:]), ws + [ws[-1]] * len(pts))]
    segments.extend(segs)
    return unary_union([LineString([a, b]).buffer(w / 2) for a, b, w in segs])


plots, roads, rocks = [], [], []
for p in m.d["paths"]:
    fn, pts = p["filename"], [(F(q["x"]), F(q["z"])) for q in p["main_points"]]
    if "/Plots/" in fn and "plateau" not in fn:
        plots.append(Polygon(pts).buffer(0))
        roads += [road_area(s) for s in p.get("sub_paths", []) if "road" in s["filename"] and len(s["main_points"]) > 1]
    elif "pa_road" in fn and len(pts) > 1:
        roads.append(road_area(p))
    elif "plateau" in fn and p.get("texture_type") != 2:
        rocks.append(Polygon(pts).buffer(0))
cave = box(-945, -945, 945, 945).difference(unary_union(rocks))
cave = next(g for g in cave.geoms if g.contains(Point(0, 0)))
free = cave.buffer(-8).difference(unary_union(plots).buffer(4)).difference(unary_union(roads).buffer(3))
free = free.difference(Point(0, 0).buffer(SHAFT_R + 10))  # the shaft and the walk round it
free = free.difference(unary_union([Point(F(o["position_x"]), F(o["position_z"])).buffer(8) for o in m.d["objects"]]))  # braziers, lifts, rubble
pieces = [g for g in getattr(free, "geoms", [free]) if g.geom_type == "Polygon" and g.area > 2000]


def polar(r, a):
    return math.cos(math.radians(a)) * r, math.sin(math.radians(a)) * r


def wedge(a0, a1, r0=0, r1=1200):
    steps = max(2, int(abs(a1 - a0) / 2))
    return Polygon([polar(r0, a0 + (a1 - a0) * i / steps) for i in range(steps + 1)] +
                   [polar(r1, a1 - (a1 - a0) * i / steps) for i in range(steps + 1)])


def piece_at(r, a):
    p = Point(polar(r, a))
    return min(pieces, key=lambda g: g.distance(p))


def ang(g):
    c = g.representative_point()
    return math.degrees(math.atan2(c.y, c.x))


laid = []  # (kind, polygon in feet)


def lay(kind, poly, quarter=None, min_area=1500):
    for g in getattr(poly, "geoms", [poly]):
        if g.geom_type != "Polygon" or g.area < min_area:
            continue
        g = g.simplify(2.0)
        settings = preset("cave", quarter) if quarter else None
        district_plot(m, PLOTS[kind], [U(*p) for p in g.exterior.coords], layer=BUILD, settings=settings)
        laid.append((kind, g))


# Market round the shaft: stretches of the ring between the street mouths, open on the north where the lifts are
plaza = piece_at(100, 0)
mouths = []
for p in m.d["paths"]:
    ends = p["main_points"][0], p["main_points"][-1]
    if "pa_road" in p["filename"] and math.dist((ends[0]["x"], ends[0]["z"]), (ends[1]["x"], ends[1]["z"])) > 1:  # not the ring roads
        for q in (p["main_points"][0], p["main_points"][-1]):
            r_ = math.hypot(F(q["x"]), F(q["z"]))
            if PLAZA_R - 25 < r_ < PLAZA_R + 40:
                mouths.append(math.degrees(math.atan2(q["z"], q["x"])))
blocked = lambda a: -125 <= (a + 180) % 360 - 180 <= -55 or any(abs((a - g + 180) % 360 - 180) < 6 for g in mouths)
start = -55  # walk the ring from the lifts' gap round to it again, collecting open arcs
runs, cur = [], None
for a in range(start, start + 361):
    if not blocked(a) and a < start + 360:
        cur = [a, a + 1] if cur is None else [cur[0], a + 1]
    elif cur:
        runs.append(cur)
        cur = None
ring = Point(0, 0).buffer(PLAZA_R - 12).difference(Point(0, 0).buffer(SHAFT_R + 32))
for a0, a1 in runs:
    span = a1 - a0
    if span < 18:
        continue
    n = max(1, round(span / 50))  # long arcs get an aisle every ~50°
    for k in range(n):
        s0, s1 = a0 + span * k / n + (2.5 if k else 0), a0 + span * (k + 1) / n - (2.5 if k < n - 1 else 0)
        lay("market", ring.intersection(wedge(s0, s1)).intersection(plaza), min_area=900)

# Caravan yard between the rings: stables (Cottages) | camp | paddock (Field), split by 14-ft lanes
yard = piece_at(430, 90)
ys =sorted(a for a in range(40, 140) if not yard.intersection(wedge(a, a + 1)).is_empty)
lo, hi = ys[0], ys[-1] + 1
third = (hi - lo) / 3
cuts = [lo + third, hi - third]
lane = unary_union([LineString([(0, 0), polar(1200, c)]).buffer(7) for c in cuts])
lay("cottages", yard.difference(lane).intersection(wedge(lo - 1, cuts[0])))
lay("field", yard.difference(lane).intersection(wedge(cuts[1], hi + 1)))
# Campsite: the app refuses big ones ("area too large" — the user's working camps are 3,200-5,100 sq ft), so the middle
# strip becomes a cluster of small camps, two per band outward, 8-ft lanes between
camp = yard.difference(lane).intersection(wedge(cuts[0], cuts[1]))
r_in, r_out = min(math.hypot(*p) for p in camp.exterior.coords), max(math.hypot(*p) for p in camp.exterior.coords)
rows = max(1, math.ceil(camp.area / 4500 / 2))  # two camps side by side per band
mid = unary_union([LineString([(0, 0), polar(1200, (cuts[0] + cuts[1]) / 2)]).buffer(4)])
for k in range(rows):
    r0, r1 = r_in + (r_out - r_in) * k / rows, r_in + (r_out - r_in) * (k + 1) / rows
    band = Point(0, 0).buffer(r1 - (4 if k < rows - 1 else 0), 128).difference(Point(0, 0).buffer(r0 + (4 if k else 0), 128))
    lay("campsite", camp.difference(mid).intersection(band), min_area=1200)

# South, out to the wall: customs house east of the gate road, warehouses either side, the gate approach left open
south = unary_union([g for g in pieces if math.hypot(*g.representative_point().coords[0]) > 560 and 25 < ang(g) < 150])  # the gate road splits it
approach = unary_union([box(-50, 560, 50, 1000), Point(polar(640, 90)).buffer(70)])
east, west = south.difference(approach).intersection(box(0, 0, 900, 1000)), south.difference(approach).intersection(box(-900, 0, 0, 1000))
customs = east.intersection(box(0, 0, 190, 1000))  # right by the gate road
lay("merchants", customs, "market")
lay("craftsmen", east.difference(box(0, 0, 204, 1000)), "workshops")  # 14-ft lane between customs and warehouses
lay("craftsmen", west, "workshops")

# Aeor vault: a Castle surface block in the middle of its open spot, a forecourt round it
spot = piece_at(470, 40)
vault = spot.buffer(-12)
vault = max(getattr(vault, "geoms", [vault]), key=lambda g: g.area).simplify(6.0)
lay("castle", vault, min_area=800)

m.d["info"]["last_uid"] = m.uid
m.save(OUT)

# ------------------------------------------------------------------------------------------------------------------
# Check: the user's source file is untouched, and every path of theirs is in the output unchanged
assert open(SRC, "rb").read() == src_bytes, "source file changed!"
src = json.loads(src_bytes.decode("utf-8"))
out = json.load(open(OUT, encoding="utf-8"))
dump = lambda p: json.dumps(p, sort_keys=True)
out_paths = {dump(p) for p in out["paths"]}
theirs = [p for p in src["paths"] if not any(k in p["filename"] for k in HAND_PATHS)]
missing = [p["filename"] for p in theirs if dump(p) not in out_paths]
assert not missing, f"user paths changed: {missing[:5]}"
tally = {}
for k, g in laid:
    tally[k] = tally.get(k, 0) + 1
print("wrote", OUT, "| dropped hand-placed:", dropped[0], "objects,", dropped[1], "paths | kept", len(theirs), "user paths unchanged",
      "| new plots:", tally, "| area (sq ft):", {k: round(sum(g.area for kk, g in laid if kk == k)) for k in tally})

if len(sys.argv) > 1 and sys.argv[1] == "preview":
    from PIL import Image, ImageDraw, ImageFont

    S = 0.6
    W = int(2 * 900 * S)
    im = Image.new("RGB", (W, int(W * 1.05)), (70, 70, 70))
    dr = ImageDraw.Draw(im)
    T = lambda x, z: (W / 2 + x * S, W / 2 + z * S)
    font = ImageFont.truetype("C:/Windows/Fonts/tahoma.ttf", 14)

    def P(g, **kw):
        for h in getattr(g, "geoms", [g]):
            if h.geom_type == "Polygon":
                dr.polygon([T(*p) for p in h.exterior.coords], **kw)

    P(cave, fill=(225, 215, 185))
    for g in plots:
        P(g, fill=(150, 150, 150), outline=(90, 90, 90))
    for a, b, w in segments:
        dr.line([T(*a), T(*b)], fill=(190, 170, 135), width=max(1, int(w * S)))
    cols = {"market": (235, 190, 60), "campsite": (90, 160, 200), "cottages": (150, 110, 80), "field": (140, 190, 90),
            "merchants": (215, 120, 90), "craftsmen": (170, 120, 70), "castle": (120, 80, 150)}
    for k, g in laid:
        P(g, fill=cols[k], outline=(30, 30, 30))
    for o in out["objects"]:
        x, y = T(F(o["position_x"]), F(o["position_z"]))
        dr.ellipse((x - 2, y - 2, x + 2, y + 2), fill=(255, 140, 0) if "campfire" in o["filename"] else (40, 40, 40))
    names = {"market": "Market (ตลาด)", "campsite": "Campsite (ลานคาราวาน)", "cottages": "Cottages (คอก/คนเลี้ยงสัตว์)", "field": "Field (ทุ่งหญ้าคอก)",
             "merchants": "District of Merchants (ด่านศุลกากร)", "craftsmen": "District of Craftsmen (โกดัง)", "castle": "Castle surface (ห้อง Aeor)"}
    y = 8
    for k in cols:
        dr.rectangle([8, y, 26, y + 14], fill=cols[k])
        dr.text((32, y - 1), names[k], fill=(255, 255, 255), font=font)
        y += 20
    dr.rectangle([8, y, 26, y + 14], fill=(150, 150, 150))
    dr.text((32, y - 1), "แปลงที่คุณเติมแล้ว (ไม่แตะ)", fill=(255, 255, 255), font=font)
    dr.line([(W - 140, W * 1.02), (W - 140 + 200 * S, W * 1.02)], fill=(255, 255, 255), width=3)
    dr.text((W - 140, W * 1.02 + 4), "200 ฟุต", fill=(255, 255, 255), font=font)
    im.save(os.path.join(HERE, "level1-plots-fill.png"))
    print("wrote", os.path.join(HERE, "level1-plots-fill.png"))
