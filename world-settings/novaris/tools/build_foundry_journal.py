"""Build Foundry journal data for one Novaris continent from the place .md files.

    python world-settings/novaris/tools/build_foundry_journal.py aldenreich <out_dir>

Writes <out_dir>/<continent>.json, read by codex/foundry-utility/Create-Novaris-Journal.macro.js.
Each .md file becomes one journal entry (overviews included); folders mirror the lore folders.
Pins come from maps/azgaar/places-v3.json (burgs + map labels exported from saves/novaris.map),
matched by name and limited to the continent's box on the Azgaar map.
"""
import glob
import json
import os
import re
import sys
import unicodedata

import markdown

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PLACES = os.path.join(ROOT, "maps", "azgaar", "places-v3.json")

# Azgaar map box of each continent (map units) — same boxes the continent maps were exported from
BOXES = {
    "aldenreich": (1045, 44, 1800, 807),
    "eldmere": (1275, 958, 1799, 1163),
    "shenzhou": (30, 105, 639, 719),
    "suvarna": (20, 697, 769, 1198),
    "voxaria": (650, 240, 1137, 827),
    "seas": (0, 0, 1800, 1200),  # seas touch several continents: the whole world map
}

# First match wins: (pattern on the "ประเภท" row, icon, tint)
ICONS = [
    (r"เมืองหลวง", "castle", "#ffd54f"),
    (r"ซาก|ร้าง|ล่ม|สนามรบเก่า", "ruins", "#bcaaa4"),
    (r"จุดตก", "explosion", "#ef5350"),
    (r"รังมังกร", "skull", "#ef5350"),
    (r"วิหาร|ศาลเจ้า|วัด|สุสาน", "temple", "#ce93d8"),
    (r"สถานบำบัด", "heal", "#a5d6a7"),
    (r"ป้อม|ฐานทัพ|ด่าน|ค่ายทหาร", "tower-flag", "#ff8a65"),
    (r"หมู่บ้าน|ชุมชน|นิคม|ฐานลอยน้ำ", "village", "#fff59d"),
    (r"เมือง|นคร", "city", "#ffe082"),
    (r"ตลาด|สี่แยก", "coins", "#ffe082"),
    (r"เหมือง|ถ้ำ|ใต้ดิน|หลุมยุบ", "cave", "#b0bec5"),
    (r"ภูเขาไฟ|ลาวา|ความร้อนใต้พิภพ", "fire", "#ff7043"),
    (r"เกาะ|คาบสมุทร|ชายฝั่ง", "anchor", "#81d4fa"),
    (r"ภูมิภาค", "obelisk", "#e0e0e0"),
    (r"เทือกเขา|สันเขา|ภูเขา|หุบเขา", "mountain", "#d7ccc8"),
    (r"ป่า", "oak", "#81c784"),
    (r"แม่น้ำ|อ่าว|ทะเล|ทะเลสาบ", "waterfall", "#4fc3f7"),
]
DEFAULT_ICON = ("stone-path", "#e0e0e0")

# Country labels on the map ("|" = line break) → the file that describes the country.
# These files already pin their capital or region, so the country label is an extra pin.
STATE_PINS = {
    "Lumenvael|Dynasty": "aldenreich/odland/lumenvael-dynasty.md",
    "Lagunara|Concord": "aldenreich/costa-mosaica/lagunara-concord.md",
    "Twinhold": "aldenreich/gramark/twinhold-diarchy.md",
    "Voxaria": "voxaria/_overview.md",
    "Akitsu|Shogunate": "shenzhou/mizuho/_overview.md",
    "Imperium|Solis": "suvarna/deshret/_overview.md",
    "Pancha|Sabha": "suvarna/himmapan-wilds/_overview.md",
    "Jyoti|Marga": "suvarna/dandaka/jyoti-marga.md",
    "Ehrvarn|Conquest": "suvarna/ehrvarn-highlands/_overview.md",
    "Varga|Republic": "suvarna/ulfdal/_overview.md",
}
STATE_ICON = ("holy-shield", "#ffd54f")


# Lore folders that hold places with no region yet: their files go straight into the continent folder
LOOSE = {"unspecified"}

# Folders with no _overview.md that get a display name instead of their folder name
FOLDER_NAMES = {"rivers": "แม่น้ำ"}


def folder_of(rel):
    folder = os.path.dirname(rel)
    return os.path.dirname(folder) if os.path.basename(folder) in LOOSE else folder


def norm(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]", "", s)


def title_of(text):
    return text.splitlines()[0].lstrip("# ").strip()


def place_type(text):
    m = re.search(r"^\|\s*ประเภท\s*\|\s*(.+?)\s*\|\s*$", text, re.M)
    return m.group(1) if m else ""


def icon_for(kind):
    for pattern, icon, tint in ICONS:
        if re.search(pattern, kind):
            return icon, tint
    return DEFAULT_ICON


def to_html(text):
    body = "\n".join(text.splitlines()[1:])  # the H1 is the entry name
    body = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", body)  # repo links mean nothing inside Foundry
    return markdown.markdown(body, extensions=["tables"])


def main():
    continent, out_dir = sys.argv[1], sys.argv[2]
    x0, y0, x1, y1 = BOXES[continent]
    all_places = json.load(open(PLACES, encoding="utf-8"))["places"]
    places = [p for p in all_places if x0 <= p["x"] <= x1 and y0 <= p["y"] <= y1]
    # The continent's own name label (may sit just outside its box, e.g. Eldmere) pins the continent overview
    continent_pin = next((p for p in all_places if p["type"] == "added" and p["name"] == continent.capitalize()), None)
    states = {p["name"]: p for p in places if p["type"] == "state"}
    # burgs win over labels of the same name
    by_name = {}
    for p in sorted(places, key=lambda p: p["type"] != "burg"):
        # Voxaria cities carry their Sector on the map: "Lumen City (S00)"
        by_name.setdefault(norm(re.sub(r"\s*\(S\d+\)$", "", p["name"])), p)

    def find_pin(title):
        # "Iron Authority และ Riftwild" → try the whole title, then its first name
        first = re.split(r"\s+และ\s+|\s*·\s*", title)[0]
        return find_one(title) or (find_one(first) if first != title else None)

    def find_one(title):
        key = norm(title)
        if key in by_name:
            return by_name[key]
        hits = [p for k, p in by_name.items() if len(key) >= 4 and k.startswith(key)]
        return hits[0] if len(hits) == 1 else None

    base = os.path.join(ROOT, continent)
    folders, entries, unpinned = [], [], []
    for d in sorted(glob.glob(os.path.join(base, "**", ""), recursive=True)):
        rel = os.path.relpath(d, ROOT).replace("\\", "/").rstrip("/")
        if os.path.basename(rel) in LOOSE:
            continue
        overview = os.path.join(d, "_overview.md")
        name = title_of(open(overview, encoding="utf-8").read()) if os.path.exists(overview) else FOLDER_NAMES.get(os.path.basename(rel), os.path.basename(rel))
        parent = os.path.dirname(rel) if rel != continent else None
        folders.append({"key": rel, "name": re.sub(r"\s*\(.*\)$", "", name), "parent": parent})

    for f in sorted(glob.glob(os.path.join(base, "**", "*.md"), recursive=True)):
        rel = os.path.relpath(f, ROOT).replace("\\", "/")
        text = open(f, encoding="utf-8").read()
        title = title_of(text)
        is_overview = rel.endswith("/_overview.md")
        kind = place_type(text)
        icon, tint = ("book", "#ffffff") if is_overview else icon_for(kind)
        is_continent = rel == f"{continent}/_overview.md"
        pin = continent_pin if is_continent else find_pin(re.sub(r"\s*\(.*\)$", "", re.sub(r"^Sector \d+:\s*", "", title)))
        if pin is None and not is_continent:
            unpinned.append(rel)
        entries.append({
            "key": rel,
            "name": title,
            "folder": folder_of(rel),
            "sort": 0 if is_overview else 1,
            "type": kind,
            "html": to_html(text),
            "icon": f"icons/svg/{icon}.svg",
            "tint": tint,
            "pin": {"x": pin["x"], "y": pin["y"], "name": pin["name"]} if pin else None,
            "extraPins": [{"x": s["x"], "y": s["y"], "name": s["name"].replace("|", " "),
                           "icon": f"icons/svg/{STATE_ICON[0]}.svg", "tint": STATE_ICON[1]}
                          for label, key in STATE_PINS.items() if key == rel and (s := states.get(label))],
        })

    os.makedirs(out_dir, exist_ok=True)
    out = os.path.join(out_dir, f"{continent}.json")
    json.dump({"continent": continent, "folders": folders, "entries": entries},
              open(out, "w", encoding="utf-8"), ensure_ascii=False)
    print(f"{out}: {len(folders)} folders, {len(entries)} entries, {sum(1 for e in entries if e['pin'])} pinned, "
          f"{sum(len(e['extraPins']) for e in entries)} country pins")
    for rel in unpinned:
        print("  no pin:", rel)


if __name__ == "__main__":
    main()
