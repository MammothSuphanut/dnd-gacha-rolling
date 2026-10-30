"""Extra Foundry data for a Dungeondraft battle map imported with Universal Battlemap Importer (dd-import).

Usage:
    python world-settings/novaris/tools/build_foundry_battlemap.py bandit-cave

dd-import brings in the image, cave walls and lights from the .dd2vtt. It cannot know about doors drawn as
objects, so this reads the saved .dungeondraft_map for the door / arrow-slit objects and writes <key>.json into
Data/assets/world/novaris/<path>/. Add-Battlemap-Extras.macro.js then adds the doors, secret door and slits to the
imported scene, styles its lights and sets the scene's vision.
"""
import json
import math
import re
import sys
from pathlib import Path

NOVARIS_DIR = Path("D:/FoundryVTT_Data/Data/assets/world/novaris")

MAPS = {
    "bandit-cave": {
        "name": "Bandit Cave",
        "path": "Aldenreich/Gråmark/Bandit Cave",
        "dd2vtt": "D:/Dungeondraft Maps/Bandit Cave.dd2vtt",
        "ddmap": "D:/Dungeondraft Maps/Bandit Cave.dungeondraft_map",
        "darkness": 0.7,
        # Doors that start locked, by nearest door object to this cell: leader's den, prison
        "locked": [(7.9, 9.7), (9.5, 20.6)],
        # Secret door across the 8 → 9 passage (cells), hidden behind the wardrobe
        "secret": [(11.8, 3.3), (11.8, 6.5)],
        "secret_sound": "slidingWood",
        # Door pictures that sit where the passage has already widened: the Foundry door goes to the narrow
        # point instead (cells). Prison bars were moved up into the hall mouth; the passage narrows at y 22.
        "move_door": [((9.5, 20.6), [(7.3, 22.0), (10.9, 22.0)])],
    }
}

# 2MT "3x1" door textures draw 1.5 cells wide at scale 1 (Dungeondraft shows these packs at half size)
DOOR_KINDS = [
    (re.compile(r"Door - Square - Wood"), {"kind": "door", "sound": "woodHeavy"}),
    (re.compile(r"Door - Square - Bars"), {"kind": "bars", "sound": "jailHeavy"}),
    (re.compile(r"Door - Round - Bars"), {"kind": "bars", "sound": "jail"}),
]
SLIT = re.compile(r"Window_Frame_Stone")


def vec(s):
    """'Vector2( 5751.19, 5392.88 )' → (5751.19, 5392.88)"""
    x, y = s[s.index("(") + 1:s.rindex(")")].split(",")
    return float(x), float(y)


def ray_hit(p, u, a, b):
    """Distance along unit ray p+t·u to segment a-b (t ≥ 0), or None."""
    ex, ey = b[0] - a[0], b[1] - a[1]
    d = u[0] * ey - u[1] * ex
    if abs(d) < 1e-12:
        return None
    t = ((a[0] - p[0]) * ey - (a[1] - p[1]) * ex) / d
    s = ((a[0] - p[0]) * u[1] - (a[1] - p[1]) * u[0]) / d
    return t if t >= 0 and 0 <= s <= 1 else None


def light_kind(l):
    """Style by the colour the map was built with: warm orange fires, pale gold lanterns, cold white daylight."""
    col = l["color"][2:]
    if col == "e8eef8":
        return "daylight"
    if col == "ffad58":
        return "fire" if l["range"] >= 5 else "brazier"
    return "lantern"


def main(key):
    cfg = MAPS[key]
    vtt = json.loads(Path(cfg["dd2vtt"]).read_text(encoding="utf-8"))
    dd = json.loads(Path(cfg["ddmap"]).read_text(encoding="utf-8"))
    ppg = vtt["resolution"]["pixels_per_grid"]

    doors, slits = [], []
    for o in dd["world"]["levels"]["0"]["objects"]:
        tex = o["texture"]
        x, y = (v / 256 for v in vec(o["position"]))
        rot = o["rotation"]
        if SLIT.search(tex):
            # the slit looks along its local y axis, across the rock between tunnel and guard room
            dx, dy = -math.sin(rot), math.cos(rot)
            slits.append({"a": (x - dx * 3, y - dy * 3), "b": (x + dx * 3, y + dy * 3)})
            continue
        for pat, info in DOOR_KINDS:
            if pat.search(tex):
                half = 1.5 * vec(o["scale"])[0] / 2
                c, s = math.cos(rot), math.sin(rot)
                locked = any(math.dist((x, y), p) < 2.0 for p in cfg["locked"])
                a, b = (x - c * half, y - s * half), (x + c * half, y + s * half)
                for near, seg in cfg.get("move_door", []):
                    if math.dist((x, y), near) < 2.0:
                        a, b = seg
                doors.append({**info, "locked": locked, "a": a, "b": b})
    doors.append({"kind": "secret", "sound": cfg["secret_sound"], "locked": False,
                  "a": cfg["secret"][0], "b": cfg["secret"][1]})

    # The exported cave edge runs deeper in the rock than the drawn wall band, so a door that looks wall-to-wall
    # still ends short of it. Stretch each end outward (up to REACH cells) to the first edge it meets.
    edges = [((p["x"], p["y"]), (q["x"], q["y"])) for poly in vtt["line_of_sight"] for p, q in zip(poly, poly[1:])]
    REACH = 3.0
    def crosses(p, q):
        u = ((q[0] - p[0]) / math.dist(p, q), (q[1] - p[1]) / math.dist(p, q))
        return any((h := ray_hit(p, u, a, b)) is not None and h <= math.dist(p, q) for a, b in edges)

    for d in doors:
        mid = ((d["a"][0] + d["b"][0]) / 2, (d["a"][1] + d["b"][1]) / 2)
        for end, other in (("a", "b"), ("b", "a")):
            p, o = d[end], d[other]
            if crosses(mid, p):
                continue  # this end already reaches into the rock
            ln = math.dist(p, o)
            ux, uy = (p[0] - o[0]) / ln, (p[1] - o[1]) / ln
            best = None
            for a, b in edges:
                hit = ray_hit(p, (ux, uy), a, b)
                if hit is not None and hit <= REACH and (best is None or hit < best):
                    best = hit
            if best is None:
                print(f"WARNING: {d['kind']} door end {p} reaches no cave edge within {REACH} cells")
            else:
                d[end] = (p[0] + ux * (best + 0.05), p[1] + uy * (best + 0.05))
        if not (crosses(mid, d["a"]) and crosses(mid, d["b"])):
            print(f"WARNING: {d['kind']} door {d['a']}-{d['b']} does not reach rock on both sides")

    px = lambda p: [round(p[0] * ppg), round(p[1] * ppg)]
    data = {
        "key": key,
        "sceneName": cfg["name"],
        "ppg": ppg,
        "darkness": cfg["darkness"],
        "doors": [{**d, "c": px(d["a"]) + px(d["b"])} for d in doors],
        "slits": [{"c": px(s["a"]) + px(s["b"])} for s in slits],
        # dd-import creates these lights; the macro finds each by position and gives it a style
        "lights": [{"kind": light_kind(l), "x": round(l["position"]["x"] * ppg), "y": round(l["position"]["y"] * ppg),
                    "range": l["range"]} for l in vtt["lights"]],
    }
    for d in data["doors"]:
        del d["a"], d["b"]
    out_dir = NOVARIS_DIR / cfg["path"]
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / f"{key}.json").write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{key}: {len(doors)} doors, {len(slits)} slits -> {out_dir / (key + '.json')}")


if __name__ == "__main__":
    main(sys.argv[1])
