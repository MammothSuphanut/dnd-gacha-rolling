"""Build Foundry data for a Novaris city with its own map scene: one scene (a Level per floor) + a page per place.

    python world-settings/novaris/tools/build_foundry_city.py twinhold

Writes Data/assets/world/novaris/<Continent>/<Region>/<City>/<city>.json, read by
codex/foundry-utility/Create-Novaris-City.macro.js. The map images (one per floor, exported from Canvas of Kings and
cropped to the frame by tools/crop_city_map.py) sit in the same folder.

Pages come from the city's lore file, section "## สถานที่ในเมือง": "### <floor>" groups, "#### <place>" = one page.
Pins: PLACES below gives each place its spot on the map (feet from the shaft centre, x east / z south — the same
frame as maps/canvas-of-kings/twinhold_plan.py) — a place with no spot gets a page but no pin.
"""
import json
import math
import os
import re
import sys

import markdown

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FOUNDRY_DATA = "D:/FoundryVTT_Data/Data"
DATA_DIR = "assets/world/novaris"  # relative to Foundry's Data folder


def polar(r, a):  # a in degrees, 0 = east, 90 = south (twinhold_plan.py)
    return round(math.cos(math.radians(a)) * r), round(math.sin(math.radians(a)) * r)


# Icon (Foundry core icons/svg) + tint per kind of place — the same set build_foundry_journal.py uses
ICON = {"gate": ("tower-flag", "#ff8a65"), "trade": ("coins", "#ffe082"), "vault": ("chest", "#ffd54f"),
        "camp": ("village", "#fff59d"), "store": ("barrel", "#bcaaa4"), "army": ("sword", "#ff8a65"),
        "inn": ("tankard", "#ffe082"), "hall": ("castle", "#ffd54f"), "temple": ("temple", "#ce93d8"),
        "home": ("house", "#fff59d"), "book": ("book", "#90caf9"), "plaza": ("obelisk", "#e0e0e0"),
        "forge": ("clockwork", "#ff7043"), "fire": ("fire", "#ff7043"), "farm": ("oak", "#81c784"),
        "water": ("waterfall", "#4fc3f7"), "mine": ("cave", "#b0bec5"), "lift": ("levels", "#ffffff")}

CITIES = {
    "twinhold": {
        "lore": "aldenreich/gramark/twinhold-diarchy.md",
        "entry": "aldenreich/gramark/twinhold-diarchy.md",  # journal entry key (build_foundry_journal.py)
        "folders": ["Novaris", "Aldenreich", "Gråmark", "Twinhold"],  # Scene + Journal folder path
        "dir": "Aldenreich/Gråmark/Twinhold",
        "scene": "Twinhold",
        # The map images cover x -800…775 / z -780…850 ft at 5 px/ft (grid 5 ft = 25 px, user 2026-10-24): 7,875 × 8,150 px — as far
        # as the Canvas of Kings export reaches (2026-10-24 export: x -805…778, z -781…856), so the gate tunnel south
        # of the cavern stays on the map past the inner gate; the lava pipe runs on past the west edge
        "frame": {"x0": -800, "z0": -780, "w_ft": 1575, "h_ft": 1630, "px_per_ft": 5, "grid_ft": 5},
        # Floors top to bottom; elevation in feet (a floor is 30 ft of rock + cavern)
        "levels": [{"name": "ชั้น 1 — ประตูและการค้า", "image": "twinhold-level1.webp", "bottom": 60, "top": None},
                   {"name": "ชั้น 2 — ปกครองและที่อยู่อาศัย", "image": "twinhold-level2.webp", "bottom": 30, "top": 60},
                   {"name": "ชั้น 3 — อุตสาหกรรมและเกษตร", "image": "twinhold-level3.webp", "bottom": 0, "top": 30}],
        # place → (spot in feet, kind) — from twinhold_plan.py LEVELS (quarters by middle angle/radius, landmarks at
        # their own r/a), the lifts at the shaft's north lip, the inner gate where the build set it (z 59.2 units)
        "places": {
            "ปล่องกลางและลิฟต์คู่": ((0, -75), "lift"),
            "หอประตูชั้นใน": ((0, 789), "gate"), "ด่านศุลกากร": (polar(620, 62), "trade"),
            "ห้องเก็บของเก่า Aeor": (polar(455, 40), "vault"), "ลานคาราวานและคอกสัตว์": (polar(450, 84), "camp"),
            "โกดังสินค้า": (polar(600, 135), "store"), "ค่ายทหารรักษาประตู": (polar(640, 5), "army"),
            "ตลาดหลัก": (polar(120, 45), "trade"), "โรงเตี๊ยมและที่พักคนต่างเมือง": (polar(580, 205), "inn"),
            "ร้านของเก่าและนายหน้า": (polar(500, 325), "trade"), "ย่านพ่อค้า": (polar(500, 268), "home"),
            "ลานพิธี": (polar(190, -84), "plaza"), "ห้องโถงดวาร์ฟ": (polar(245, -99), "hall"),
            "ห้องโถงเอลฟ์": (polar(245, -69), "hall"), "วิหารดวาร์ฟ": (polar(440, -93), "temple"),
            "วิหารเอลฟ์": (polar(440, -75), "temple"), "จวนผู้ปกครองดวาร์ฟ": (polar(430, 227), "hall"),
            "จวนผู้ปกครองเอลฟ์": (polar(430, 47), "hall"), "ย่านดวาร์ฟ": (polar(600, 180), "home"),
            "ย่านเอลฟ์": (polar(600, 0), "home"), "สภาช่างและหอสมุด": (polar(560, 90), "book"),
            "ย่านผสม": (polar(680, -90), "home"),
            "โรงตีเหล็กใหญ่": (polar(470, 185), "forge"), "ท่อลาวาและบ่อพักลาวา": ((-700, 0), "fire"),
            "สวนใต้ดิน": (polar(600, 0), "farm"), "ฟาร์มเห็ดและแปลงผัก": (polar(600, 90), "farm"),
            "อ่างเก็บน้ำ": (polar(650, 135), "water"), "บ้านคนงานและโรงอาหาร": (polar(600, -98), "home"),
            "โรงงานและโกดังวัตถุดิบ": (polar(240, 135), "store"), "ทางลงเหมืองลึก": (polar(600, 50), "mine"),
        },
        # Light sources (find_city_lights.py): the map the exports came from, lava light spacing, and extra spots —
        # (spot in feet, floor, kind): the great forge on level 3 burns like its lava
        "lights": {"map_file": "D:/Steam/steamapps/common/Canvas of Kings/Save/twinhold-atmos-deep.mommap",
                   "lava_step": 40, "spots": [(polar(470, 185), 3, "forge")]},
    },
}


def to_html(text):
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)  # repo links mean nothing inside Foundry
    return markdown.markdown(text, extensions=["tables"])


def pages_of(lore, n_levels):
    """(group heading, place name, body) for each "#### place" under "## สถานที่ในเมือง"."""
    m = re.search(r"^## สถานที่ในเมือง\b(.*?)(?=^## |\Z)", lore, re.M | re.S)
    if not m:
        sys.exit("no '## สถานที่ในเมือง' section in the lore file")
    out, levels = [], None
    for block in re.split(r"^(?=#{3,4} )", m.group(1), flags=re.M):
        head = block.splitlines()[0] if block.strip() else ""
        if head.startswith("### "):
            g = re.match(r"### ชั้น (\d+)", head)
            levels = [int(g.group(1))] if g else list(range(1, n_levels + 1))  # "ทุกชั้น" → every floor
        elif head.startswith("#### "):
            out.append((levels, head[5:].strip(), "\n".join(block.splitlines()[1:]).strip()))
    return out


def main():
    key = sys.argv[1]
    c = CITIES[key]
    lore = open(os.path.join(ROOT, c["lore"]), encoding="utf-8").read()
    f = c["frame"]
    k = f["px_per_ft"]
    pages, unpinned = [], []
    for i, (levels, name, body) in enumerate(pages_of(lore, len(c["levels"]))):
        spot, kind = c["places"].get(name, (None, None))
        icon, tint = ICON[kind] if kind else ICON["plaza"]
        if spot is None:
            unpinned.append(name)
        pages.append({"key": f"{c['entry']}#{name}", "name": name, "sort": i + 1, "html": to_html(body),
                      "levels": levels, "icon": f"icons/svg/{icon}.svg", "tint": tint,
                      # pixel on the map image; the macro adds the scene's padding offset
                      "pin": {"x": round((spot[0] - f["x0"]) * k), "y": round((spot[1] - f["z0"]) * k)} if spot else None})
    missing = set(c["places"]) - {p["name"] for p in pages}
    out_dir = os.path.join(FOUNDRY_DATA, DATA_DIR, c["dir"])
    os.makedirs(out_dir, exist_ok=True)
    img = f"{DATA_DIR}/{c['dir']}"
    w, h = round(f["w_ft"] * k), round(f["h_ft"] * k)
    found = os.path.join(out_dir, f"{key}-lights.json")  # find_city_lights.py
    lights = [{"kind": l["kind"], "level": l["level"], "x": round((l["x"] - f["x0"]) * k), "y": round((l["z"] - f["z0"]) * k)}
              for l in (json.load(open(found, encoding="utf-8")) if os.path.exists(found) else [])]
    lights = [l for l in lights if 0 <= l["x"] <= w and 0 <= l["y"] <= h]  # the lava pipe runs on off the map
    data = {"city": key, "entry": c["entry"], "folders": c["folders"],
            "scene": {"name": c["scene"], "width": w, "height": h, "gridSize": round(f["grid_ft"] * k),
                      "distance": f["grid_ft"],
                      "levels": [{**lv, "image": f"{img}/{lv['image']}"} for lv in c["levels"]]},
            "pages": pages, "lights": lights}
    out = os.path.join(out_dir, f"{key}.json")
    json.dump(data, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"{out}: {len(pages)} pages, {len(pages) - len(unpinned)} pinned, {len(lights)} lights")
    if not lights:
        print("  no lights yet — run find_city_lights.py")
    for name in unpinned:
        print("  no pin:", name)
    for name in sorted(missing):
        print("  spot for a place not in the lore:", name)
    for lv in c["levels"]:
        if not os.path.exists(os.path.join(out_dir, lv["image"])):
            print("  map image not there yet:", lv["image"])


if __name__ == "__main__":
    main()
